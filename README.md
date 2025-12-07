# Laravel Authentication System with Hosting Management - MCP Server Architecture

A comprehensive Model Context Protocol (MCP) server ecosystem for building a complete Laravel authentication system with domain/hosting subscription management and SSH-based file management.

## Environment Analysis

**✅ Your Environment is Ready:**
- PHP 8.2.12 (CLI) with Zend Engine v4.2.12
- Composer 2.7.4 for PHP dependency management
- Node.js 20.13.1 with npm 10.5.2 for MCP server development
- Windows PowerShell 5.1 environment
- XAMPP stack detected for local development

## MCP Server Architecture

Based on the official MCP documentation and best practices from https://modelcontextprotocol.io/docs/develop/build-server, here are the six specialized MCP servers needed for your Laravel application:

### 1. 📧 Laravel Authentication MCP Server (`laravel-auth-mcp-server`)
**Purpose**: Complete user authentication and authorization system

**Key Features:**
- User registration, login, logout with session management
- JWT token generation, validation, and refresh
- Password hashing using bcrypt (Laravel compatible)
- Role-based access control (RBAC) system
- User profile management (CRUD operations)
- Laravel Sanctum/Passport integration
- Security features: rate limiting, CSRF protection

**Tools Provided:**
- `register-user`, `authenticate-user`, `logout-user`
- `generate-jwt-token`, `validate-jwt-token`, `refresh-token`
- `hash-password`, `verify-password`
- `assign-user-role`, `check-user-permission`
- `create-user-profile`, `update-user-profile`, `get-user-profile`

### 2. 🗄️ Database Management MCP Server (`database-mcp-server`)
**Purpose**: Comprehensive database operations and schema management

**Key Features:**
- Multi-database support (MySQL, PostgreSQL, SQLite)
- Laravel migration management (create, run, rollback)
- Schema operations (tables, columns, indexes, foreign keys)
- Raw query execution with safety validation
- Database backup and restore capabilities
- Connection pooling and management

**Tools Provided:**
- `connect-database`, `test-connection`, `switch-database`
- `create-migration`, `run-migrations`, `rollback-migration`
- `create-table`, `alter-table`, `drop-table`, `describe-table`
- `execute-query`, `insert-data`, `update-data`, `select-data`
- `backup-database`, `restore-database`, `optimize-tables`

### 3. 🔐 SSH File Manager MCP Server (`ssh-filemanager-mcp-server`)
**Purpose**: Secure remote file management via SSH/SFTP with graphical interface support

**Key Features:**
- SSH connection management with key-based authentication
- SFTP file operations (upload, download, browse, edit)
- Remote directory navigation and management
- File permissions and ownership management
- Archive operations (create/extract ZIP/TAR files)
- Terminal command execution on remote servers

**Tools Provided:**
- `connect-ssh`, `disconnect-ssh`, `test-ssh-connection`
- `list-files`, `upload-file`, `download-file`, `read-file-content`
- `create-directory`, `delete-file`, `move-file`, `copy-file`
- `change-permissions`, `change-owner`, `get-file-info`
- `create-archive`, `extract-archive`, `execute-command`

### 4. 🌐 Domain/Hosting Management MCP Server (`hosting-management-mcp-server`)
**Purpose**: Complete domain and hosting subscription management system

**Key Features:**
- Domain registration, renewal, and management
- DNS record management (A, CNAME, MX, TXT records)
- SSL certificate monitoring and management
- Hosting subscription tracking with billing integration
- Multi-provider API integration (Namecheap, GoDaddy, Cloudflare)
- Expiration monitoring and automatic renewal alerts

**Tools Provided:**
- `register-domain`, `check-domain-availability`, `renew-domain`
- `create-dns-record`, `update-dns-record`, `list-dns-records`
- `generate-ssl-certificate`, `install-ssl-certificate`, `check-ssl-status`
- `create-hosting-subscription`, `list-hosting-subscriptions`, `get-subscription-usage`
- `setup-domain-monitoring`, `get-renewal-dates`, `send-expiration-alerts`

### 5. ⚡ Laravel Artisan MCP Server (`laravel-artisan-mcp-server`)
**Purpose**: Complete Laravel CLI and code generation automation

**Key Features:**
- Full Artisan command execution and management
- Code generation (controllers, models, middleware, requests)
- Migration and seeder management
- Cache management (config, route, view caching)
- Queue worker management and job handling
- Testing integration with PHPUnit

**Tools Provided:**
- `make-controller`, `make-model`, `make-middleware`, `make-migration`
- `run-migrations`, `rollback-migrations`, `seed-database`
- `cache-clear`, `config-cache`, `route-cache`, `view-cache`
- `queue-work`, `queue-restart`, `run-tests`, `serve-application`
- `optimize-application`, `key-generate`, `storage-link`

### 6. 📦 PHP Composer MCP Server (`php-composer-mcp-server`)
**Purpose**: Advanced PHP dependency and package management

**Key Features:**
- Package installation, updating, and removal
- Dependency resolution and conflict detection
- Semantic versioning and constraint management
- Autoloader optimization (PSR-4, classmap)
- Security vulnerability scanning
- Custom repository management

**Tools Provided:**
- `install-package`, `update-package`, `remove-package`, `search-packages`
- `show-dependencies`, `check-outdated`, `analyze-dependencies`
- `dump-autoload`, `optimize-autoloader`, `configure-autoload`
- `audit-security`, `check-platform-requirements`, `validate-composer`
- `init-composer-project`, `configure-repositories`

## Integration Architecture

### Data Flow Between Servers
```
Laravel App Dashboard
       ↓
[Auth Server] ← → [Database Server] ← → [Artisan Server]
       ↓                                       ↓
[Hosting Server] ← → [SSH File Manager] ← → [Composer Server]
```

### Dashboard Features
1. **Authentication Panel**: Login/logout, user management, role assignment
2. **Subscription Dashboard**: Domain and hosting service overview with renewal dates
3. **File Manager Interface**: SSH-authenticated remote file browser with upload/download
4. **Database Console**: Query execution, migration management, backup/restore
5. **Development Tools**: Artisan commands, package management, code generation

## Best Practices Implementation

### 1. Official MCP Server Standards
- Each server follows the official MCP SDK structure
- Proper error handling with structured error responses
- Resource-based documentation and schema definitions
- Input validation using Zod schemas
- TypeScript implementation for type safety

### 2. Security Best Practices
- JWT authentication with secure key management
- SSH key-based authentication for file operations
- SQL injection prevention with parameterized queries
- Input sanitization and validation
- Rate limiting and request throttling

### 3. Laravel Integration Standards
- Compatible with Laravel 10+ framework structure
- Uses Laravel naming conventions and patterns
- Supports Laravel Sanctum for API authentication
- Follows Laravel database migration patterns
- Integrates with Laravel's caching system

### 4. Development Workflow
- Each MCP server is independently deployable
- Modular architecture allows selective usage
- Development and production configurations
- Comprehensive logging and error tracking
- Automated testing integration

## Next Steps

1. **Installation**: Install dependencies for each MCP server using `npm install`
2. **Configuration**: Set up environment variables for database, SSH, and API credentials
3. **Build**: Compile TypeScript using `npm run build` for each server
4. **Integration**: Configure Claude Desktop to use all MCP servers
5. **Testing**: Verify each server functionality independently
6. **Dashboard Development**: Build Laravel frontend that utilizes all MCP servers

This architecture provides a complete, production-ready foundation for your Laravel authentication system with comprehensive hosting management capabilities, all following MCP best practices and official documentation standards.

## Claude Desktop Configuration

```json
{
  "mcpServers": {
    "laravel-auth": {
      "command": "node",
      "args": ["./laravel-auth-mcp-server/dist/index.js"]
    },
    "database": {
      "command": "node", 
      "args": ["./database-mcp-server/dist/index.js"]
    },
    "ssh-filemanager": {
      "command": "node",
      "args": ["./ssh-filemanager-mcp-server/dist/index.js"]
    },
    "hosting-management": {
      "command": "node",
      "args": ["./hosting-management-mcp-server/dist/index.js"]
    },
    "laravel-artisan": {
      "command": "node",
      "args": ["./laravel-artisan-mcp-server/dist/index.js"]
    },
    "php-composer": {
      "command": "node",
      "args": ["./php-composer-mcp-server/dist/index.js"]
    }
  }
}
```

## Recent Updates

### Laravel Auth MCP Server v1.0.1 (December 2025)
**Major Fix**: Resolved database connection timing issue that was preventing server startup.

**Problem**: The server was attempting database connections before environment variables were loaded, causing `ER_BAD_DB_ERROR` failures.

**Solution**: Implemented lazy database initialization in the `DatabaseService` constructor to ensure proper timing.

**Changes**:
- ✅ Fixed database connection timing with lazy initialization
- ✅ Added automatic `.env` file loading with dotenv
- ✅ Resolved JWT TypeScript compilation errors
- ✅ Enhanced error handling and documentation

The Laravel Auth MCP Server is now fully operational and ready for production use.

## Quick Start

1. **Build all servers**: Run `npm run build` in each server directory
2. **Configure environment**: Update `.env` files with your database settings
3. **Test connections**: Verify database connectivity before server startup  
4. **Use centralized config**: All servers are configured in `.vscode/mcp.json` for easy management

See the individual server documentation for detailed setup instructions.