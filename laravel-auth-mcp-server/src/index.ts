#!/usr/bin/env node

import 'dotenv/config';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as z from 'zod';
import { AuthService } from './auth.js';
import { DatabaseService } from './database.js';

/**
 * Laravel Authentication MCP Server
 * 
 * This server provides Model Context Protocol tools for Laravel authentication:
 * - User registration and login
 * - Password management and hashing
 * - JWT token generation and validation
 * - Role and permission management
 */

// Initialize services
const dbService = new DatabaseService();
const authService = new AuthService(dbService);

// Input schemas
const RegisterUserSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.string().optional().default('user')
});

const AuthenticateUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const UpdateProfileSchema = z.object({
  userId: z.number(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional()
});

const AssignRoleSchema = z.object({
  userId: z.number(),
  role: z.string()
});

const GenerateTokenSchema = z.object({
  userId: z.number(),
  expiresIn: z.string().optional().default('24h')
});

const ValidateTokenSchema = z.object({
  token: z.string()
});

// Create server instance
const server = new Server(
  {
    name: 'laravel-auth-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'register-user',
        description: 'Register a new user account with email and password',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Full name of the user' },
            email: { type: 'string', description: 'Email address' },
            password: { type: 'string', description: 'Password (min 8 characters)' },
            role: { type: 'string', description: 'User role (default: user)', default: 'user' }
          },
          required: ['name', 'email', 'password']
        }
      },
      {
        name: 'authenticate-user',
        description: 'Authenticate user login credentials',
        inputSchema: {
          type: 'object',
          properties: {
            email: { type: 'string', description: 'Email address' },
            password: { type: 'string', description: 'Password' }
          },
          required: ['email', 'password']
        }
      },
      {
        name: 'update-user-profile',
        description: 'Update user profile information',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' },
            name: { type: 'string', description: 'Updated name' },
            email: { type: 'string', description: 'Updated email' },
            password: { type: 'string', description: 'New password' }
          },
          required: ['userId']
        }
      },
      {
        name: 'get-user-profile',
        description: 'Retrieve user profile by ID',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' }
          },
          required: ['userId']
        }
      },
      {
        name: 'generate-jwt-token',
        description: 'Generate JWT authentication token for user',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' },
            expiresIn: { type: 'string', description: 'Token expiration (e.g., 24h)', default: '24h' }
          },
          required: ['userId']
        }
      },
      {
        name: 'validate-jwt-token',
        description: 'Validate JWT token and return user info',
        inputSchema: {
          type: 'object',
          properties: {
            token: { type: 'string', description: 'JWT token to validate' }
          },
          required: ['token']
        }
      },
      {
        name: 'assign-user-role',
        description: 'Assign role to user',
        inputSchema: {
          type: 'object',
          properties: {
            userId: { type: 'number', description: 'User ID' },
            role: { type: 'string', description: 'Role name' }
          },
          required: ['userId', 'role']
        }
      },
      {
        name: 'hash-password',
        description: 'Generate secure password hash',
        inputSchema: {
          type: 'object',
          properties: {
            password: { type: 'string', description: 'Plain text password' }
          },
          required: ['password']
        }
      },
      {
        name: 'verify-password',
        description: 'Verify password against hash',
        inputSchema: {
          type: 'object',
          properties: {
            password: { type: 'string', description: 'Plain text password' },
            hash: { type: 'string', description: 'Password hash to verify against' }
          },
          required: ['password', 'hash']
        }
      }
    ]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'register-user': {
        const { name: userName, email, password, role } = RegisterUserSchema.parse(args);
        const result = await authService.registerUser(userName, email, password, role);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'authenticate-user': {
        const { email, password } = AuthenticateUserSchema.parse(args);
        const result = await authService.authenticateUser(email, password);
        return {
          content: [
            {
              type: 'text', 
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'update-user-profile': {
        const validatedArgs = UpdateProfileSchema.parse(args);
        const result = await authService.updateUserProfile(validatedArgs);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'get-user-profile': {
        const { userId } = z.object({ userId: z.number() }).parse(args);
        const result = await authService.getUserProfile(userId);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'generate-jwt-token': {
        const { userId, expiresIn } = GenerateTokenSchema.parse(args);
        const result = await authService.generateJWT(userId, expiresIn);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ token: result }, null, 2)
            }
          ]
        };
      }

      case 'validate-jwt-token': {
        const { token } = ValidateTokenSchema.parse(args);
        const result = await authService.validateJWT(token);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'assign-user-role': {
        const { userId, role } = AssignRoleSchema.parse(args);
        const result = await authService.assignUserRole(userId, role);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'hash-password': {
        const { password } = z.object({ password: z.string() }).parse(args);
        const result = await authService.hashPassword(password);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ hash: result }, null, 2)
            }
          ]
        };
      }

      case 'verify-password': {
        const { password, hash } = z.object({
          password: z.string(),
          hash: z.string()
        }).parse(args);
        const result = await authService.verifyPassword(password, hash);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ valid: result }, null, 2)
            }
          ]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`
        }
      ],
      isError: true
    };
  }
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'auth://docs/laravel-setup',
        mimeType: 'text/markdown',
        name: 'Laravel Authentication Setup Guide'
      },
      {
        uri: 'auth://docs/jwt-integration',
        mimeType: 'text/markdown',
        name: 'JWT Integration Documentation'
      },
      {
        uri: 'auth://schemas/user',
        mimeType: 'application/json',
        name: 'User Model Schema'
      }
    ]
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  switch (uri) {
    case 'auth://docs/laravel-setup':
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text: `# Laravel Authentication Setup

## Installation Steps

1. Install Laravel Sanctum:
\`\`\`bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
php artisan migrate
\`\`\`

2. Configure authentication in config/auth.php
3. Add Sanctum middleware to api routes
4. Configure CORS for frontend integration

## Database Migrations

The system expects these user table columns:
- id (primary key)
- name (string)
- email (string, unique)
- password (string, hashed)
- role (string, default 'user')
- created_at (timestamp)
- updated_at (timestamp)
`
          }
        ]
      };

    case 'auth://docs/jwt-integration':
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text: `# JWT Integration Guide

## Setup
1. Install JWT library: npm install jsonwebtoken
2. Configure JWT_SECRET in environment
3. Set token expiration times

## Usage
- Generate tokens on successful login
- Include tokens in Authorization header
- Validate tokens on protected routes

## Best Practices
- Use secure, random JWT secrets
- Set appropriate expiration times
- Implement token refresh mechanism
- Store tokens securely on client
`
          }
        ]
      };

    case 'auth://schemas/user':
      return {
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify({
              User: {
                id: 'number',
                name: 'string',
                email: 'string',
                password: 'string (hashed)',
                role: 'string',
                created_at: 'timestamp',
                updated_at: 'timestamp'
              }
            }, null, 2)
          }
        ]
      };

    default:
      throw new Error(`Resource not found: ${uri}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Laravel Auth MCP Server running on stdio');
}

main().catch(console.error);