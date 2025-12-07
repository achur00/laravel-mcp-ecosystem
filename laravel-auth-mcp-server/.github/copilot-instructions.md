<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Laravel Authentication MCP Server Project

This project is a Model Context Protocol (MCP) server built with TypeScript for Laravel authentication and user management.

## Project Setup Progress

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements
- [x] Scaffold the Project  
- [x] Customize the Project
- [x] Install Required Extensions
- [x] Compile the Project
- [x] Create and Run Task
- [x] Launch the Project
- [x] Ensure Documentation is Complete

## Project Overview

This Laravel Authentication MCP Server provides:

### Tools Available
- `register-user` - Register new user account with validation
- `authenticate-user` - Authenticate user login credentials
- `update-user-profile` - Update user profile information
- `get-user-profile` - Retrieve user profile by ID
- `generate-jwt-token` - Generate JWT authentication tokens
- `validate-jwt-token` - Validate JWT token authenticity
- `assign-user-role` - Assign roles to users for RBAC
- `hash-password` - Generate secure bcrypt password hashes
- `verify-password` - Verify password against hash

### Resources
- `auth://docs/laravel-setup` - Laravel authentication setup guide
- `auth://docs/jwt-integration` - JWT integration documentation
- `auth://schemas/user` - User model schema definitions

### Build Commands
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with auto-reload
- `npm start` - Start the MCP server

### MCP Configuration
```json
{
  "servers": {
    "laravel-auth": {
      "type": "stdio",
      "command": "node", 
      "args": ["dist/index.js"]
    }
  }
}
```

### Environment Variables
```bash
# Database configuration
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=

# JWT configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h
```

## References
- MCP SDK Documentation: https://github.com/modelcontextprotocol
- Laravel Authentication: https://laravel.com/docs/authentication
- Laravel Sanctum: https://laravel.com/docs/sanctum
- Implementation Guide: https://modelcontextprotocol.io/llms-full.txt

## Project Structure
```
├── src/
│   ├── index.ts          # Main MCP server
│   ├── auth.ts           # Authentication service
│   └── database.ts       # Database connection and operations
├── dist/                 # Compiled JavaScript output
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project configuration
├── README.md             # Project documentation
└── Laravel-Auth-MCP-Server-Manual.md # Detailed manual
```

## Security Features
- Bcrypt password hashing compatible with Laravel
- JWT token-based authentication
- SQL injection prevention with parameterized queries
- Input validation using Zod schemas
- Role-based access control (RBAC)

The project integrates seamlessly with Laravel applications and follows Laravel's authentication patterns and security best practices.