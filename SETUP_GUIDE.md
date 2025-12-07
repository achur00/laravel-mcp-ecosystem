# MCP Laravel Ecosystem Setup Guide

## Overview
This guide will help you set up a complete Laravel development ecosystem using Model Context Protocol (MCP) servers. The setup includes 6 specialized MCP servers that provide comprehensive Laravel development capabilities.

## 📁 Project Structure

Your workspace should be organized as follows:

```
MCP-workspace/
├── apps/                              # Your Laravel applications
│   ├── my-laravel-app/               # Your main Laravel project
│   ├── api-service/                  # Additional Laravel services
│   └── admin-panel/                  # Other Laravel projects
├── laravel-auth-mcp-server/          # Authentication & user management
├── database-mcp-server/              # Database operations & migrations
├── ssh-filemanager-mcp-server/       # Remote file management
├── hosting-management-mcp-server/    # Domain & hosting management
├── laravel-artisan-mcp-server/       # Laravel CLI automation
├── php-composer-mcp-server/          # PHP package management
└── README.md                         # This file
```

## 🚀 Quick Start

### 1. Create Apps Directory
```bash
# Navigate to your MCP workspace
cd "c:\Users\okunade.y\OneDrive - NLIP Nigeria\Documents\MCP-workspace"

# Create apps directory for Laravel applications
mkdir apps
cd apps

# Create your first Laravel application
composer create-project laravel/laravel my-laravel-app
```

### 2. Environment Configuration

Each MCP server needs environment configuration. Create `.env` files in each server directory:

#### Laravel Auth MCP Server
```bash
cd ../laravel-auth-mcp-server
```

Create `.env` file:
```env
# Database Configuration
AUTH_DB_HOST=localhost
AUTH_DB_PORT=3306
AUTH_DB_DATABASE=laravel_auth
AUTH_DB_USERNAME=root
AUTH_DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRY=24h

# Security Settings
BCRYPT_ROUNDS=12
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=15

# Laravel App Path (update to your actual path)
LARAVEL_APP_PATH=../apps/my-laravel-app
```

#### Database MCP Server
```bash
cd ../database-mcp-server
```

Create `.env` file:
```env
# Primary Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=your_password

# PostgreSQL Configuration (optional)
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=laravel_app_pg
PG_USERNAME=postgres
PG_PASSWORD=your_pg_password

# SQLite Configuration
SQLITE_DATABASE=../apps/my-laravel-app/database/database.sqlite

# Backup Configuration
BACKUP_PATH=./backups
BACKUP_RETENTION_DAYS=30
BACKUP_COMPRESSION=true

# Performance Settings
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_TIMEOUT=30000
```

#### SSH FileManager MCP Server
```bash
cd ../ssh-filemanager-mcp-server
```

Create `.env` file:
```env
# Default SSH Configuration
DEFAULT_SSH_PORT=22
SSH_TIMEOUT=30000
SSH_KEEPALIVE_INTERVAL=10000

# File Transfer Settings
UPLOAD_CHUNK_SIZE=64KB
DOWNLOAD_CHUNK_SIZE=64KB
MAX_CONCURRENT_TRANSFERS=5

# Security Settings
ALLOWED_EXTENSIONS=php,js,css,html,json,md,txt,sql,xml,yml,yaml
MAX_FILE_SIZE=100MB
```

#### Hosting Management MCP Server
```bash
cd ../hosting-management-mcp-server
```

Create `.env` file:
```env
# Namecheap API Configuration
NAMECHEAP_API_USER=your_username
NAMECHEAP_API_KEY=your_api_key
NAMECHEAP_USERNAME=your_username
NAMECHEAP_SANDBOX=true

# GoDaddy API Configuration
GODADDY_API_KEY=your_godaddy_key
GODADDY_API_SECRET=your_godaddy_secret
GODADDY_SANDBOX=true

# Cloudflare API Configuration
CLOUDFLARE_API_TOKEN=your_cloudflare_token
CLOUDFLARE_ZONE_ID=your_zone_id

# SSL Certificate Settings
SSL_CHECK_INTERVAL=24h
SSL_ALERT_DAYS_BEFORE_EXPIRY=30
```

#### Laravel Artisan MCP Server
```bash
cd ../laravel-artisan-mcp-server
```

Create `.env` file:
```env
# Default Laravel Project Path
DEFAULT_LARAVEL_PATH=../apps/my-laravel-app

# PHP Configuration
PHP_EXECUTABLE=php
PHP_MEMORY_LIMIT=512M
PHP_MAX_EXECUTION_TIME=300

# Artisan Settings
ARTISAN_TIMEOUT=120000
CONCURRENT_COMMANDS=3
```

#### PHP Composer MCP Server
```bash
cd ../php-composer-mcp-server
```

Create `.env` file:
```env
# Composer Configuration
COMPOSER_EXECUTABLE=composer
COMPOSER_MEMORY_LIMIT=2G
COMPOSER_TIMEOUT=300000

# Default Project Path
DEFAULT_PROJECT_PATH=../apps/my-laravel-app

# Performance Settings
COMPOSER_PARALLEL_DOWNLOADS=6
COMPOSER_CACHE_ENABLED=true
COMPOSER_OPTIMIZE_AUTOLOADER=true
```

## 🔌 MCP Client Configuration

### Claude Desktop Configuration

Add the following to your Claude Desktop configuration file:

**Location**: `%APPDATA%\Claude\claude_desktop_config.json` (Windows)

```json
{
  "mcpServers": {
    "laravel-auth": {
      "command": "node",
      "args": [
        "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/laravel-auth-mcp-server/dist/index.js"
      ]
    },
    "database": {
      "command": "node",
      "args": [
        "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/database-mcp-server/dist/index.js"
      ]
    },
    "ssh-filemanager": {
      "command": "node",
      "args": [
        "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/ssh-filemanager-mcp-server/dist/index.js"
      ]
    },
    "hosting-management": {
      "command": "node",
      "args": [
        "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/hosting-management-mcp-server/dist/index.js"
      ]
    },
    "laravel-artisan": {
      "command": "node",
      "args": [
        "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/laravel-artisan-mcp-server/dist/index.js"
      ]
    },
    "php-composer": {
      "command": "node",
      "args": [
        "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/php-composer-mcp-server/dist/index.js"
      ]
    }
  }
}
```

### Other MCP Clients

For other MCP clients (like VS Code extensions or custom implementations), use the following connection details:

```yaml
servers:
  - name: laravel-auth
    type: stdio
    command: node
    args: ["path/to/laravel-auth-mcp-server/dist/index.js"]
  
  - name: database
    type: stdio
    command: node
    args: ["path/to/database-mcp-server/dist/index.js"]
  
  - name: ssh-filemanager
    type: stdio
    command: node
    args: ["path/to/ssh-filemanager-mcp-server/dist/index.js"]
  
  - name: hosting-management
    type: stdio
    command: node
    args: ["path/to/hosting-management-mcp-server/dist/index.js"]
  
  - name: laravel-artisan
    type: stdio
    command: node
    args: ["path/to/laravel-artisan-mcp-server/dist/index.js"]
  
  - name: php-composer
    type: stdio
    command: node
    args: ["path/to/php-composer-mcp-server/dist/index.js"]
```

## 🔗 Laravel Application Integration

### 1. Update Laravel Configuration

In your Laravel application (`apps/my-laravel-app`), update the database configuration:

**File**: `config/database.php`
```php
'connections' => [
    'mysql' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '3306'),
        'database' => env('DB_DATABASE', 'laravel_app'),
        'username' => env('DB_USERNAME', 'root'),
        'password' => env('DB_PASSWORD', ''),
        'unix_socket' => env('DB_SOCKET', ''),
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
        'prefix' => '',
        'prefix_indexes' => true,
        'strict' => true,
        'engine' => null,
        'options' => extension_loaded('pdo_mysql') ? array_filter([
            PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
        ]) : [],
    ],
],
```

### 2. Laravel Environment Configuration

**File**: `apps/my-laravel-app/.env`
```env
APP_NAME="My Laravel App"
APP_ENV=local
APP_KEY=base64:your_generated_app_key
APP_DEBUG=true
APP_URL=http://localhost

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=your_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="${APP_NAME}"
VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="${PUSHER_HOST}"
VITE_PUSHER_PORT="${PUSHER_PORT}"
VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"
```

## 🎯 Usage Examples

### Using Laravel Auth MCP Server
```
Ask Claude: "Create a new user with email john@example.com and password securepass123 using the Laravel auth server"
```

### Using Database MCP Server
```
Ask Claude: "Connect to the MySQL database and show me all tables in the laravel_app database"
```

### Using SSH FileManager MCP Server
```
Ask Claude: "Connect to my production server via SSH and upload the latest build files"
```

### Using Hosting Management MCP Server
```
Ask Claude: "Check the DNS records for my domain example.com and renew the SSL certificate"
```

### Using Laravel Artisan MCP Server
```
Ask Claude: "Generate a new controller called ProductController with resource methods in my Laravel app"
```

### Using PHP Composer MCP Server
```
Ask Claude: "Add the Laravel Sanctum package to my project and update all dependencies"
```

## 🔧 Development Workflow

### 1. Start Development Server
```bash
# In your Laravel application
cd apps/my-laravel-app
php artisan serve
```

### 2. Watch MCP Servers (for development)
Each MCP server can be run in watch mode for development:
```bash
cd laravel-auth-mcp-server
npm run dev
```

### 3. Build All Servers
```bash
# Build all servers at once
npm run build --workspaces
```

## 🚨 Troubleshooting

### Common Issues

1. **MCP Server Not Found**
   - Ensure all servers are built (`npm run build` in each directory)
   - Check file paths in Claude Desktop configuration
   - Verify Node.js is installed and accessible

2. **Database Connection Failed**
   - Check database credentials in `.env` files
   - Ensure MySQL/PostgreSQL is running
   - Verify database exists

3. **SSH Connection Issues**
   - Check SSH credentials and host accessibility
   - Verify firewall settings
   - Test SSH connection manually first

4. **Permission Errors**
   - Ensure proper file permissions
   - Run VS Code/Claude Desktop as administrator if needed
   - Check antivirus software interference

### Logs and Debugging

Each MCP server logs to stderr. To see logs:
```bash
# View logs in real-time
node dist/index.js 2>server.log
```

## 📚 Next Steps

1. **Implement Full Features**: Complete the MCP server implementations with full functionality
2. **Add Authentication**: Implement proper authentication mechanisms
3. **Add Error Handling**: Enhance error handling and validation
4. **Performance Optimization**: Optimize database queries and file operations
5. **Testing**: Add comprehensive test suites
6. **Documentation**: Create API documentation for each server

## 🤝 Support

For issues and questions:
- Check the individual server documentation
- Review the troubleshooting section
- Check MCP server logs for specific error messages

---

**Note**: This setup guide assumes Windows environment. Adjust paths and commands for other operating systems as needed.