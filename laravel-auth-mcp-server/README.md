# Laravel Authentication MCP Server

A Model Context Protocol (MCP) server that provides Laravel authentication and user management capabilities.

## Features

- **User Authentication**: Register, login, logout, and session management
- **Password Management**: Password hashing, validation, and reset functionality
- **JWT Token Management**: Generate, validate, and refresh JWT tokens
- **User Profile Management**: Create, read, update, and delete user profiles
- **Role-Based Access Control**: Manage user roles and permissions
- **Laravel Integration**: Seamless integration with Laravel authentication system

## Available Tools

### Authentication Tools
- `register-user` - Register a new user account
- `authenticate-user` - Authenticate user login credentials
- `logout-user` - Handle user logout and session cleanup
- `refresh-token` - Refresh authentication tokens

### User Management Tools
- `create-user-profile` - Create detailed user profiles
- `update-user-profile` - Update user information
- `get-user-profile` - Retrieve user profile data
- `delete-user-account` - Safely delete user accounts

### Security Tools
- `hash-password` - Generate secure password hashes
- `verify-password` - Verify password against hash
- `generate-jwt-token` - Create JWT authentication tokens
- `validate-jwt-token` - Validate JWT token authenticity

### Role & Permission Management
- `assign-user-role` - Assign roles to users
- `check-user-permission` - Verify user permissions
- `list-user-roles` - Get all user roles
- `create-permission` - Create new permissions

## Resources

- `auth://docs/laravel-setup` - Laravel authentication setup guide
- `auth://docs/jwt-integration` - JWT integration documentation
- `auth://schemas/user` - User model schema definitions

## Installation

1. Install dependencies:
```bash
npm install
```

2. **Configure Environment Variables**:
Create a `.env` file in the project root with the following variables:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRY=24h

# Security Settings
BCRYPT_ROUNDS=12
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=15

# Laravel App Path
LARAVEL_APP_PATH=C:\path\to\your\laravel\app
```

**Important**: Ensure your database exists and has a `users` table with the following structure:
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NULL,
    updated_at TIMESTAMP NULL DEFAULT NULL
);
```

3. Build the server:
```bash
npm run build
```

4. Run the server:
```bash
npm start
```

## Troubleshooting

### Common Issues

#### Error: "Unknown database"
**Problem**: Server shows `ER_BAD_DB_ERROR` with errno 1049
**Solution**: 
1. Ensure your database exists in MySQL/XAMPP
2. Verify the `DB_DATABASE` value in `.env` matches your actual database name
3. Check that your MySQL server is running

#### Error: "Cannot find module"
**Problem**: TypeScript compilation or module loading errors
**Solution**:
```bash
npm install
npm run build
```

#### Environment Variables Not Loading
**Problem**: Server uses default values instead of `.env` values
**Solution**: The server now includes automatic `.env` loading. Ensure your `.env` file is in the project root.

#### Environment Variables Not Loading
**Problem**: Server uses default values instead of .env values
**Solution**: The server now includes automatic `.env` loading. Ensure your `.env` file is in the project root.

#### Database Connection Timing Issues
**Problem**: `ER_BAD_DB_ERROR` even with correct database credentials
**Solution**: The server now uses lazy database initialization to ensure environment variables are loaded before connection attempts.

## Version History

### v1.0.1 - December 2025
**Major Fixes:**
- ✅ **Fixed database connection timing issue**: Implemented lazy initialization to prevent connection attempts before environment variables are loaded
- ✅ **Added automatic .env loading**: Server now automatically loads environment variables from .env file
- ✅ **Fixed JWT TypeScript compilation**: Resolved type casting issues in JWT token generation
- ✅ **Enhanced error handling**: Better error messages and debugging information

**Technical Changes:**
- Modified `DatabaseService` constructor to use lazy initialization
- Added `dotenv` dependency for automatic environment loading
- Improved JWT function type safety
- Enhanced documentation and troubleshooting guides

### Development

Start the server in development mode with auto-reload:
```bash
npm run dev
```

## Configuration

The server can be configured through environment variables or a config file. See the installation section for required environment variables.

## Laravel Integration

This MCP server is designed to work alongside Laravel applications. It can:
- Connect directly to Laravel databases
- Use Laravel's password hashing algorithms
- Generate tokens compatible with Laravel Sanctum/Passport
- Follow Laravel naming conventions and patterns

## Security Features

- Bcrypt password hashing
- JWT token-based authentication
- SQL injection prevention
- Input validation and sanitization
- Rate limiting support
- Secure session management

## Usage with Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "laravel-auth": {
      "command": "node",
      "args": ["path/to/laravel-auth-mcp-server/dist/index.js"]
    }
  }
}
```