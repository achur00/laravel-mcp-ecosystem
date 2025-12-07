#!/usr/bin/env node

/**
 * Hosting Management MCP Server
 * Provides domain registration, DNS management, and hosting provider integration
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

// Domain configuration schema
const DomainConfigSchema = z.object({
  domain: z.string(),
  provider: z.enum(['namecheap', 'godaddy', 'cloudflare']),
  apiKey: z.string(),
  apiSecret: z.string().optional(),
});

type DomainConfig = z.infer<typeof DomainConfigSchema>;

class HostingManagementServer {
  private server: Server;
  private domains: Map<string, DomainConfig> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'hosting-management-mcp-server',
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
          name: 'register_domain',
          description: 'Register a new domain',
          inputSchema: {
            type: 'object',
            properties: {
              domain: { type: 'string', description: 'Domain name to register' },
              provider: { type: 'string', enum: ['namecheap', 'godaddy', 'cloudflare'] },
              apiKey: { type: 'string', description: 'API key for the provider' },
              apiSecret: { type: 'string', description: 'API secret for the provider' },
              years: { type: 'number', description: 'Registration period in years', default: 1 },
            },
            required: ['domain', 'provider', 'apiKey'],
          },
        },
        {
          name: 'check_domain_status',
          description: 'Check domain registration status and expiry',
          inputSchema: {
            type: 'object',
            properties: {
              domain: { type: 'string', description: 'Domain name to check' },
            },
            required: ['domain'],
          },
        },
        {
          name: 'manage_dns_record',
          description: 'Add, update, or delete DNS records',
          inputSchema: {
            type: 'object',
            properties: {
              domain: { type: 'string', description: 'Domain name' },
              action: { type: 'string', enum: ['create', 'update', 'delete'] },
              recordType: { type: 'string', enum: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'] },
              name: { type: 'string', description: 'Record name/subdomain' },
              value: { type: 'string', description: 'Record value' },
              ttl: { type: 'number', description: 'Time to live in seconds', default: 3600 },
            },
            required: ['domain', 'action', 'recordType', 'name', 'value'],
          },
        },
      ],
    }));

    // Tool execution handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'register_domain':
          return await this.registerDomain(args);
        case 'check_domain_status':
          return await this.checkDomainStatus(args);
        case 'manage_dns_record':
          return await this.manageDNSRecord(args);
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }
    });

    // Resources handler
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: [
        {
          uri: 'domains://registered',
          mimeType: 'application/json',
          name: 'Registered Domains',
          description: 'List of managed domains',
        },
      ],
    }));

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      if (uri === 'domains://registered') {
        const domains = Array.from(this.domains.entries()).map(([domain, config]) => ({
          domain,
          provider: config.provider,
          managed: true,
        }));

        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(domains, null, 2),
            },
          ],
        };
      }

      throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    });
  }

  private async registerDomain(args: any) {
    try {
      const { domain, provider, apiKey, apiSecret, years = 1 } = args;
      const config = DomainConfigSchema.parse({ domain, provider, apiKey, apiSecret });

      // Store domain configuration
      this.domains.set(domain, config);

      return {
        content: [
          {
            type: 'text',
            text: `Would register domain '${domain}' with ${provider} for ${years} year(s)`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to register domain: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async checkDomainStatus(args: any) {
    try {
      const { domain } = args;

      if (!domain || typeof domain !== 'string') {
        throw new Error('Domain is required and must be a string');
      }

      return {
        content: [
          {
            type: 'text',
            text: `Would check status for domain '${domain}'`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to check domain status: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private async manageDNSRecord(args: any) {
    try {
      const { domain, action, recordType, name, value, ttl = 3600 } = args;

      if (!this.domains.has(domain)) {
        throw new Error(`Domain '${domain}' not found in managed domains`);
      }

      return {
        content: [
          {
            type: 'text',
            text: `Would ${action} ${recordType} record '${name}' with value '${value}' (TTL: ${ttl}) for domain '${domain}'`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Failed to manage DNS record: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Hosting Management MCP server running on stdio');
  }
}

const server = new HostingManagementServer();
server.run().catch(console.error);