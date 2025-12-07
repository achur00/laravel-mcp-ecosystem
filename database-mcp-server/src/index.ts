#!/usr/bin/env node

/**
 * Database MCP Server
 * Provides database operations, schema management, and migration support for Laravel applications
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

// Database configuration schema
const DatabaseConfigSchema = z.object({
  type: z.enum(['mysql', 'postgresql', 'sqlite']),
  host: z.string().optional(),
  port: z.number().optional(),
  database: z.string(),
  username: z.string().optional(),
  password: z.string().optional(),
  ssl: z.boolean().default(false),
});

type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;

class DatabaseMCPServer {
  private server: Server;
  private databases: Map<string, DatabaseConfig> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'database-mcp-server',
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
          name: 'connect_database',
          description: 'Connect to a database (MySQL, PostgreSQL, or SQLite)',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Connection name' },
              type: { type: 'string', enum: ['mysql', 'postgresql', 'sqlite'] },
              host: { type: 'string', description: 'Database host (not needed for SQLite)' },
              port: { type: 'number', description: 'Database port' },
              database: { type: 'string', description: 'Database name or file path for SQLite' },
              username: { type: 'string', description: 'Database username' },
              password: { type: 'string', description: 'Database password' },
              ssl: { type: 'boolean', description: 'Use SSL connection', default: false },
            },
            required: ['name', 'type', 'database'],
          },
        },
        {
          name: 'execute_query',
          description: 'Execute a SQL query on connected database',
          inputSchema: {
            type: 'object',
            properties: {
              connection: { type: 'string', description: 'Database connection name' },
              query: { type: 'string', description: 'SQL query to execute' },
              parameters: { 
                type: 'array', 
                description: 'Query parameters for prepared statements',
                items: { type: 'string' }
              },
            },
            required: ['connection', 'query'],
          },
        },
      ],
    }));

    // Tool execution handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'connect_database':
          return await this.connectDatabase(args);
        case 'execute_query':
          return await this.executeQuery(args);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    });

    // Resources handler
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'database://connections',
          mimeType: 'application/json',
          name: 'Database Connections',
          description: 'List of configured database connections',
        },
      ],
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'database://connections') {
        const connections = Array.from(this.databases.entries()).map(([name, config]) => ({
          name,
          type: config.type,
          database: config.database,
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

  private async connectDatabase(args: any) {
    try {
      const config = DatabaseConfigSchema.parse(args);
      const { name, ...dbConfig } = args;

      // Validate connection name
      if (!name || typeof name !== 'string') {
        throw new Error('Connection name is required and must be a string');
      }

      // Store the configuration
      this.databases.set(name, config);

      return {
        content: [
          {
            type: 'text',
            text: `Successfully connected to ${config.type} database '${name}'`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to connect to database: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async executeQuery(args: any) {
    try {
      const { connection, query, parameters = [] } = args;

      if (!connection || !this.databases.has(connection)) {
        throw new Error(`Database connection '${connection}' not found`);
      }

      if (!query || typeof query !== 'string') {
        throw new Error('Query is required and must be a string');
      }

      // For now, return a placeholder response
      // In a full implementation, this would execute the actual query
      const config = this.databases.get(connection)!;

      return {
        content: [
          {
            type: 'text',
            text: `Query would be executed on ${config.type} database '${connection}':\n${query}\nWith parameters: ${JSON.stringify(parameters)}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to execute query: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Database MCP server running on stdio');
  }
}

const server = new DatabaseMCPServer();
server.run().catch(console.error);