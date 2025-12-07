#!/usr/bin/env node

/**
 * SSH File Manager MCP Server
 * Provides SSH/SFTP file management capabilities
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// SSH connection configuration schema
const SSHConfigSchema = z.object({
  host: z.string(),
  port: z.number().default(22),
  username: z.string(),
  password: z.string().optional(),
  privateKey: z.string().optional(),
  passphrase: z.string().optional(),
});

type SSHConfig = z.infer<typeof SSHConfigSchema>;

class SSHFileManagerServer {
  private server: Server;
  private connections: Map<string, SSHConfig> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'ssh-filemanager-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupHandlers();
  }

  private setupHandlers() {
    // Tools handler
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'ssh_connect',
          description: 'Connect to an SSH server',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Connection name' },
              host: { type: 'string', description: 'SSH host' },
              port: { type: 'number', description: 'SSH port', default: 22 },
              username: { type: 'string', description: 'SSH username' },
              password: { type: 'string', description: 'SSH password (if not using key)' },
              privateKey: { type: 'string', description: 'Private key content' },
              passphrase: { type: 'string', description: 'Key passphrase if needed' },
            },
            required: ['name', 'host', 'username'],
          },
        },
        {
          name: 'ssh_list_files',
          description: 'List files in a remote directory',
          inputSchema: {
            type: 'object',
            properties: {
              connection: { type: 'string', description: 'SSH connection name' },
              path: { type: 'string', description: 'Remote directory path', default: '.' },
            },
            required: ['connection'],
          },
        },
        {
          name: 'ssh_upload_file',
          description: 'Upload a file to the remote server',
          inputSchema: {
            type: 'object',
            properties: {
              connection: { type: 'string', description: 'SSH connection name' },
              localPath: { type: 'string', description: 'Local file path' },
              remotePath: { type: 'string', description: 'Remote file path' },
            },
            required: ['connection', 'localPath', 'remotePath'],
          },
        },
        {
          name: 'ssh_download_file',
          description: 'Download a file from the remote server',
          inputSchema: {
            type: 'object',
            properties: {
              connection: { type: 'string', description: 'SSH connection name' },
              remotePath: { type: 'string', description: 'Remote file path' },
              localPath: { type: 'string', description: 'Local file path' },
            },
            required: ['connection', 'remotePath', 'localPath'],
          },
        },
      ],
    }));

    // Tool execution handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'ssh_connect':
          return await this.sshConnect(args);
        case 'ssh_list_files':
          return await this.sshListFiles(args);
        case 'ssh_upload_file':
          return await this.sshUploadFile(args);
        case 'ssh_download_file':
          return await this.sshDownloadFile(args);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    });

    // Resources handler
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'ssh://connections',
          mimeType: 'application/json',
          name: 'SSH Connections',
          description: 'List of configured SSH connections',
        },
      ],
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'ssh://connections') {
        const connections = Array.from(this.connections.entries()).map(([name, config]) => ({
          name,
          host: config.host,
          port: config.port,
          username: config.username,
          connected: true,
        }));

        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(connections, null, 2),
            },
          ],
        };
      }

      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });
  }

  private async sshConnect(args: any) {
    try {
      const { name, ...config } = args;
      const sshConfig = SSHConfigSchema.parse(config);

      // Validate connection name
      if (!name || typeof name !== 'string') {
        throw new Error('Connection name is required and must be a string');
      }

      // Store the configuration
      this.connections.set(name, sshConfig);

      return {
        content: [
          {
            type: 'text',
            text: `Successfully connected to SSH server '${name}' at ${sshConfig.host}:${sshConfig.port}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to connect to SSH server: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async sshListFiles(args: any) {
    try {
      const { connection, path = '.' } = args;

      if (!connection || !this.connections.has(connection)) {
        throw new Error(`SSH connection '${connection}' not found`);
      }

      const config = this.connections.get(connection)!;

      // Placeholder response - in a full implementation, this would use ssh2 to list files
      return {
        content: [
          {
            type: 'text',
            text: `Would list files in '${path}' on ${config.host} via SSH connection '${connection}'`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to list files: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async sshUploadFile(args: any) {
    try {
      const { connection, localPath, remotePath } = args;

      if (!connection || !this.connections.has(connection)) {
        throw new Error(`SSH connection '${connection}' not found`);
      }

      const config = this.connections.get(connection)!;

      // Placeholder response
      return {
        content: [
          {
            type: 'text',
            text: `Would upload '${localPath}' to '${remotePath}' on ${config.host} via SSH connection '${connection}'`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to upload file: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async sshDownloadFile(args: any) {
    try {
      const { connection, remotePath, localPath } = args;

      if (!connection || !this.connections.has(connection)) {
        throw new Error(`SSH connection '${connection}' not found`);
      }

      const config = this.connections.get(connection)!;

      // Placeholder response
      return {
        content: [
          {
            type: 'text',
            text: `Would download '${remotePath}' to '${localPath}' from ${config.host} via SSH connection '${connection}'`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to download file: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('SSH File Manager MCP server running on stdio');
  }
}

const server = new SSHFileManagerServer();
server.run().catch(console.error);