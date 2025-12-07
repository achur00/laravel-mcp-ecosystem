#!/usr/bin/env node

/**
 * PHP Composer MCP Server
 * Provides PHP package management and Composer operations
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

class PHPComposerServer {
  private server: Server;
  private projects: Map<string, string> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'php-composer-mcp-server',
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
          name: 'set_project_path',
          description: 'Set the path to a PHP/Composer project',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Project name identifier' },
              path: { type: 'string', description: 'Path to project root with composer.json' },
            },
            required: ['name', 'path'],
          },
        },
        {
          name: 'composer_install',
          description: 'Install project dependencies',
          inputSchema: {
            type: 'object',
            properties: {
              project: { type: 'string', description: 'Project name' },
              dev: { type: 'boolean', description: 'Install dev dependencies', default: true },
              optimize: { type: 'boolean', description: 'Optimize autoloader', default: false },
            },
            required: ['project'],
          },
        },
        {
          name: 'composer_require',
          description: 'Add a new package dependency',
          inputSchema: {
            type: 'object',
            properties: {
              project: { type: 'string', description: 'Project name' },
              package: { type: 'string', description: 'Package name (e.g., vendor/package)' },
              version: { type: 'string', description: 'Package version constraint', default: '^*' },
              dev: { type: 'boolean', description: 'Add as dev dependency', default: false },
            },
            required: ['project', 'package'],
          },
        },
        {
          name: 'composer_update',
          description: 'Update project dependencies',
          inputSchema: {
            type: 'object',
            properties: {
              project: { type: 'string', description: 'Project name' },
              package: { type: 'string', description: 'Specific package to update (optional)' },
              dryRun: { type: 'boolean', description: 'Show what would be updated', default: false },
            },
            required: ['project'],
          },
        },
        {
          name: 'composer_remove',
          description: 'Remove a package dependency',
          inputSchema: {
            type: 'object',
            properties: {
              project: { type: 'string', description: 'Project name' },
              package: { type: 'string', description: 'Package name to remove' },
              dev: { type: 'boolean', description: 'Remove from dev dependencies', default: false },
            },
            required: ['project', 'package'],
          },
        },
      ],
    }));

    // Tool execution handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'set_project_path':
          return await this.setProjectPath(args);
        case 'composer_install':
          return await this.composerInstall(args);
        case 'composer_require':
          return await this.composerRequire(args);
        case 'composer_update':
          return await this.composerUpdate(args);
        case 'composer_remove':
          return await this.composerRemove(args);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    });

    // Resources handler
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'composer://projects',
          mimeType: 'application/json',
          name: 'Composer Projects',
          description: 'List of configured PHP/Composer projects',
        },
      ],
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'composer://projects') {
        const projects = Array.from(this.projects.entries()).map(([name, path]) => ({
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

  private async setProjectPath(args: any) {
    try {
      const { name, path } = args;

      if (!name || typeof name !== 'string') {
        throw new Error('Project name is required and must be a string');
      }

      if (!path || typeof path !== 'string') {
        throw new Error('Project path is required and must be a string');
      }

      // Store the project configuration
      this.projects.set(name, path);

      return {
        content: [
          {
            type: 'text',
            text: `PHP/Composer project '${name}' configured with path: ${path}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to set project path: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async composerInstall(args: any) {
    try {
      const { project, dev = true, optimize = false } = args;

      if (!project || !this.projects.has(project)) {
        throw new Error(`Project '${project}' not found`);
      }

      const projectPath = this.projects.get(project)!;
      let command = 'composer install';
      if (!dev) command += ' --no-dev';
      if (optimize) command += ' --optimize-autoloader';

      return {
        content: [
          {
            type: 'text',
            text: `Would execute in '${projectPath}': ${command}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to install dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async composerRequire(args: any) {
    try {
      const { project, package: packageName, version = '^*', dev = false } = args;

      if (!project || !this.projects.has(project)) {
        throw new Error(`Project '${project}' not found`);
      }

      const projectPath = this.projects.get(project)!;
      const versionConstraint = version === '^*' ? '' : `:${version}`;
      let command = `composer require ${packageName}${versionConstraint}`;
      if (dev) command += ' --dev';

      return {
        content: [
          {
            type: 'text',
            text: `Would execute in '${projectPath}': ${command}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to require package: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async composerUpdate(args: any) {
    try {
      const { project, package: packageName, dryRun = false } = args;

      if (!project || !this.projects.has(project)) {
        throw new Error(`Project '${project}' not found`);
      }

      const projectPath = this.projects.get(project)!;
      let command = 'composer update';
      if (packageName) command += ` ${packageName}`;
      if (dryRun) command += ' --dry-run';

      return {
        content: [
          {
            type: 'text',
            text: `Would execute in '${projectPath}': ${command}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to update dependencies: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async composerRemove(args: any) {
    try {
      const { project, package: packageName, dev = false } = args;

      if (!project || !this.projects.has(project)) {
        throw new Error(`Project '${project}' not found`);
      }

      const projectPath = this.projects.get(project)!;
      let command = `composer remove ${packageName}`;
      if (dev) command += ' --dev';

      return {
        content: [
          {
            type: 'text',
            text: `Would execute in '${projectPath}': ${command}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to remove package: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('PHP Composer MCP server running on stdio');
  }
}

const server = new PHPComposerServer();
server.run().catch(console.error);