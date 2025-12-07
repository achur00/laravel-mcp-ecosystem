# MCP Configuration Guide

## Terminology Clarification

### Correct MCP Terms:
- **MCP Server**: The service that provides tools/resources (e.g., `laravel-auth-mcp-server`)
- **MCP Client**: The application that connects to servers (e.g., VS Code MCP extension, Claude Desktop)
- **Tools**: Functions/capabilities that MCP servers provide (e.g., `register-user`, `authenticate-user`)
- **Resources**: Data sources that MCP servers expose (e.g., documentation, files)

### Architecture Flow:
```
MCP Client (VS Code/Claude Desktop)
    ↓ connects to
MCP Servers (your 7 servers)  
    ↓ provide
Tools & Resources (authentication, database, etc.)
```

## Centralized Configuration

You now have a **root-level MCP configuration** at:
```
MCP-workspace/.vscode/mcp.json
```

This single file manages **ALL 7 MCP servers** instead of having separate configs in each server directory.

### Configuration Benefits:
✅ **Single Point of Management** - All servers configured in one place
✅ **Easier Maintenance** - Update all servers from one location  
✅ **Consistent Environment** - Same settings across all servers
✅ **VS Code Integration** - Works with VS Code MCP extension
✅ **Development Ready** - All servers set to development mode

## Your MCP Ecosystem

### Available MCP Servers & Their Tools:

#### 1. **Laravel Auth MCP Server**
- `register-user` - Create new user accounts
- `authenticate-user` - Login with credentials
- `generate-jwt-token` - Create JWT tokens
- `validate-jwt-token` - Verify token validity
- `hash-password` - Secure password hashing
- `update-user-profile` - Modify user information

#### 2. **Database MCP Server**  
- Database operations & migrations
- Multi-database support (MySQL, PostgreSQL, SQLite)
- Backup and restore functionality

#### 3. **Laravel Artisan MCP Server**
- `create-laravel-project` - Create new Laravel apps
- Laravel CLI command execution
- Code generation (controllers, models, migrations)
- Testing framework integration

#### 4. **PHP Composer MCP Server**
- `install-package` - Install PHP packages
- Dependency management
- Autoloader optimization
- Security vulnerability scanning

#### 5. **SSH FileManager MCP Server**
- Remote file management
- Secure file transfers
- SSH connection handling

#### 6. **Hosting Management MCP Server**
- Domain management (Namecheap, GoDaddy)
- SSL certificate monitoring
- Cloudflare integration

#### 7. **TypeSpec MCP Server**
- `compile-typespec` - Compile TypeSpec to OpenAPI
- `validate-typespec` - Validate TypeSpec syntax
- `create-api-spec` - Store API specifications
- API documentation generation

## How to Use

### In VS Code:
1. Open your MCP-workspace folder
2. The VS Code MCP extension automatically loads all servers from `.vscode/mcp.json`
3. Use MCP tools through VS Code commands or chat interface

### In Claude Desktop:
Create this configuration in `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "laravel-auth": {
      "command": "node",
      "args": ["C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/laravel-auth-mcp-server/dist/index.js"]
    },
    "database": {
      "command": "node",
      "args": ["C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/database-mcp-server/dist/index.js"]
    },
    "laravel-artisan": {
      "command": "node", 
      "args": ["C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/laravel-artisan-mcp-server/dist/index.js"]
    },
    "php-composer": {
      "command": "node",
      "args": ["C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/php-composer-mcp-server/dist/index.js"]
    },
    "ssh-filemanager": {
      "command": "node",
      "args": ["C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/ssh-filemanager-mcp-server/dist/index.js"]
    },
    "hosting-management": {
      "command": "node",
      "args": ["C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/hosting-management-mcp-server/dist/index.js"]
    },
    "typespec": {
      "command": "node",
      "args": ["C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/typespec-mcp-server/dist/index.js"]
    }
  }
}
```

## Building All Servers

To ensure all servers are ready:
```bash
# Build all servers
cd laravel-auth-mcp-server && npm run build
cd ../database-mcp-server && npm run build  
cd ../laravel-artisan-mcp-server && npm run build
cd ../php-composer-mcp-server && npm run build
cd ../ssh-filemanager-mcp-server && npm run build
cd ../hosting-management-mcp-server && npm run build
cd ../typespec-mcp-server && npm run build
```

## Server Status

All servers are configured to run in **development mode** for easier debugging and development.

## Next Steps

1. **Build all servers** using the commands above
2. **Test VS Code integration** - Open workspace and verify MCP extension loads all servers
3. **Configure environment variables** - Ensure all `.env` files are properly set
4. **Test Claude Desktop** - Add configuration and test server connections

Your MCP ecosystem is now centrally managed and ready for development! 🚀

## Recent Fixes & Updates

### Laravel Auth MCP Server v1.0.1
**Issues Resolved**:
- ✅ **Database Connection Timing Error**: Fixed premature database connection attempts
- ✅ **Database Connection Error (ER_BAD_DB_ERROR)**: Fixed environment variable loading
- ✅ **TypeScript Compilation Errors**: Resolved JWT function type issues  
- ✅ **Environment Variable Loading**: Added automatic .env file loading

**Changes Made**:
1. **Implemented lazy database initialization**: Prevents connection attempts before env vars are loaded
2. **Added dotenv dependency**: Automatically loads .env variables
3. **Fixed JWT type casting**: Proper TypeScript types for JWT operations
4. **Enhanced error handling**: Better error messages and debugging
5. **Updated documentation**: Complete troubleshooting guide added

**Root Cause Fixed**:
The main issue was that the `DatabaseService` constructor called `initializeConnection()` synchronously, attempting database connection before environment variables were loaded. This has been fixed with lazy initialization.

**Dependencies Added**:
- `dotenv`: For automatic environment variable loading

### Configuration Notes

#### Database Setup
- Ensure your database exists before starting the server
- The `DB_DATABASE` value in `.env` must match your actual database name
- For XAMPP users: typically `DB_PASSWORD` should be empty
- For existing Laravel projects: use your project's database name

#### Environment Variables
- All servers now automatically load `.env` files
- Place `.env` files in each server's root directory
- Use absolute paths for file/directory references in Windows

#### Troubleshooting Quick Reference
```bash
# Check if database exists
C:\xampp\mysql\bin\mysql.exe -u root -e "SHOW DATABASES;"

# Check if MySQL is running  
netstat -an | findstr :3306

# Rebuild server after changes
npm run build

# Test server startup
node dist/index.js
```