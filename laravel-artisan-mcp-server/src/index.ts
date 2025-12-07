#!/usr/bin/env node

/**
 * Laravel Artisan MCP Server
 * Provides Laravel CLI command automation and code generation
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
import { execSync } from 'child_process';

class LaravelArtisanServer {
  private server: Server;
  private laravelPaths: Map<string, string> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'laravel-artisan-mcp-server',
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
          name: 'set_laravel_project',
          description: 'Set the path to a Laravel project',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Project name identifier' },
              path: { type: 'string', description: 'Path to Laravel project root' },
            },
            required: ['name', 'path'],
          },
        },
        {
          name: 'artisan_command',
          description: 'Execute an Artisan command',
          inputSchema: {
            type: 'object',
            properties: {
              project: { type: 'string', description: 'Laravel project name' },
              command: { type: 'string', description: 'Artisan command to execute' },
              arguments: { 
                type: 'array', 
                description: 'Command arguments',
                items: { type: 'string' }
              },
            },
            required: ['project', 'command'],
          },
        },
        {
          name: 'make_controller',
          description: 'Generate a new controller',
          inputSchema: {
            type: 'object',
            properties: {
              project: { type: 'string', description: 'Laravel project name' },
              name: { type: 'string', description: 'Controller name' },
              resource: { type: 'boolean', description: 'Create resource controller', default: false },
              api: { type: 'boolean', description: 'Create API resource controller', default: false },
            },
            required: ['project', 'name'],
          },
        },
        {
          name: 'make_model',
          description: 'Generate a new Eloquent model',
          inputSchema: {
            type: 'object',
            properties: {
              project: { type: 'string', description: 'Laravel project name' },
              name: { type: 'string', description: 'Model name' },
              migration: { type: 'boolean', description: 'Create migration file', default: false },
              factory: { type: 'boolean', description: 'Create factory file', default: false },
              controller: { type: 'boolean', description: 'Create controller', default: false },
            },
            required: ['project', 'name'],
          },
        },
      ],
    }));

    // Tool execution handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'set_laravel_project':
          return await this.setLaravelProject(args);
        case 'artisan_command':
          return await this.executeArtisanCommand(args);
        case 'make_controller':
          return await this.makeController(args);
        case 'make_model':
          return await this.makeModel(args);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    });

    // Resources handler
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'laravel://projects',
          mimeType: 'application/json',
          name: 'Laravel Projects',
          description: 'List of configured Laravel projects',
        },
      ],
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'laravel://projects') {
        const projects = Array.from(this.laravelPaths.entries()).map(([name, path]) => ({
          name,
          path,
          configured: true,
        }));

        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(projects, null, 2),
            },
          ],
        };
      }

      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });
  }

  private async setLaravelProject(args: any) {
    try {
      const { name, path } = args;

      if (!name || typeof name !== 'string') {
        throw new Error('Project name is required and must be a string');
      }

      if (!path || typeof path !== 'string') {
        throw new Error('Project path is required and must be a string');
      }

      // Store the project configuration
      this.laravelPaths.set(name, path);

      return {
        content: [
          {
            type: 'text',
            text: `Laravel project '${name}' configured with path: ${path}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to set Laravel project: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async executeArtisanCommand(args: any) {
    try {
      const { project, command, arguments: commandArgs = [] } = args;

      if (!project || !this.laravelPaths.has(project)) {
        throw new Error(`Laravel project '${project}' not found`);
      }

      const projectPath = this.laravelPaths.get(project)!;
      const fullCommand = `php artisan ${command} ${commandArgs.join(' ')}`.trim();

      // Actually execute the command
      const result = execSync(fullCommand, { 
        cwd: projectPath, 
        encoding: 'utf8',
        stdio: 'pipe'
      });

      return {
        content: [
          {
            type: 'text',
            text: `Executed in '${projectPath}': ${fullCommand}\n\nOutput:\n${result}`,
          },
        ],
      };
    } catch (error: any) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to execute Artisan command: ${error.message || 'Unknown error'}\n${error.stderr || ''}`
      );
    }
  }

  private async makeController(args: any) {
    try {
      const { project, name, resource = false, api = false } = args;

      if (!project || !this.laravelPaths.has(project)) {
        throw new Error(`Laravel project '${project}' not found`);
      }

      let command = `php artisan make:controller ${name}`;
      if (resource) command += ' --resource';
      if (api) command += ' --api';

      const projectPath = this.laravelPaths.get(project)!;

      // Actually execute the command
      const result = execSync(command, { 
        cwd: projectPath, 
        encoding: 'utf8',
        stdio: 'pipe'
      });

      return {
        content: [
          {
            type: 'text',
            text: `Executed in '${projectPath}': ${command}\n\nOutput:\n${result}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to make controller: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async makeModel(args: any) {
    try {
      const { project, name, migration = false, factory = false, controller = false } = args;

      if (!project || !this.laravelPaths.has(project)) {
        throw new Error(`Laravel project '${project}' not found`);
      }

      let command = `php artisan make:model ${name}`;
      if (migration) command += ' --migration';
      if (factory) command += ' --factory';
      if (controller) command += ' --controller';

      const projectPath = this.laravelPaths.get(project)!;

      // Actually execute the command
      const result = execSync(command, { 
        cwd: projectPath, 
        encoding: 'utf8',
        stdio: 'pipe'
      });

      return {
        content: [
          {
            type: 'text',
            text: `Executed in '${projectPath}': ${command}\n\nOutput:\n${result}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to make model: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Laravel Artisan MCP server running on stdio');
  }
}

const server = new LaravelArtisanServer();
server.run().catch(console.error);