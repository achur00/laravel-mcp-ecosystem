# Laravel Applications Directory

This directory contains all your Laravel applications that will be managed by the MCP servers.

## Recommended Structure

```
apps/
├── my-laravel-app/           # Main Laravel application
├── api-service/              # API microservice
├── admin-panel/              # Admin dashboard
├── e-commerce-site/          # E-commerce application
└── blog-platform/            # Blog/CMS application
```

## Creating a New Laravel Application

### Method 1: Using Composer (Recommended)
```bash
cd apps
composer create-project laravel/laravel my-laravel-app
cd my-laravel-app
php artisan key:generate
```

### Method 2: Using Laravel Installer
```bash
# Install Laravel installer globally (if not already installed)
composer global require laravel/installer

# Create new Laravel application
cd apps
laravel new my-laravel-app
cd my-laravel-app
```

## Quick Setup for New Laravel App

### 1. Environment Configuration
After creating your Laravel app, update the `.env` file:

```env
APP_NAME="My Laravel App"
APP_ENV=local
APP_KEY=base64:your_generated_key_here
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 2. Database Setup
```bash
# Create database (run in MySQL)
CREATE DATABASE laravel_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Run Laravel migrations
php artisan migrate
```

### 3. Development Server
```bash
# Start development server
php artisan serve

# Or specify custom port
php artisan serve --port=8001
```

## Integration with MCP Servers

Once your Laravel application is created, the MCP servers can manage it:

### Laravel Artisan MCP Server
- Generate controllers, models, migrations
- Run Artisan commands
- Manage Laravel project structure

### Database MCP Server
- Execute database migrations
- Run database queries
- Manage database connections

### PHP Composer MCP Server
- Install Laravel packages
- Update dependencies
- Manage composer.json

### SSH FileManager MCP Server
- Deploy to remote servers
- Manage remote files
- Upload/download files

### Laravel Auth MCP Server
- Manage user authentication
- Handle user registration/login
- Manage user roles and permissions

## Common Laravel Packages to Install

```bash
# Authentication (Laravel Breeze)
composer require laravel/breeze --dev
php artisan breeze:install

# API Authentication (Laravel Sanctum)
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Database Seeding (Faker)
composer require fakerphp/faker --dev

# IDE Helper (for better IDE support)
composer require --dev barryvdh/laravel-ide-helper

# Debug Bar (for development)
composer require --dev barryvdh/laravel-debugbar
```

## Example MCP Commands

Once your MCP servers are connected, you can use Claude to:

### Create a New Laravel Project
```
"Use the PHP Composer MCP server to create a new Laravel project called 'blog-platform' in the apps directory"
```

### Generate Laravel Components
```
"Use the Laravel Artisan MCP server to create a new controller called PostController with resource methods for the blog-platform project"
```

### Manage Database
```
"Use the Database MCP server to create a new migration for a posts table in the blog-platform project"
```

### Deploy Application
```
"Use the SSH FileManager MCP server to deploy the blog-platform application to the production server"
```

## Project Structure Best Practices

### Large Applications
For large applications, consider organizing by domain:

```
apps/my-laravel-app/
├── app/
│   ├── Http/Controllers/
│   │   ├── Auth/
│   │   ├── Admin/
│   │   └── Api/
│   ├── Models/
│   │   ├── User/
│   │   ├── Product/
│   │   └── Order/
│   └── Services/
├── resources/views/
│   ├── auth/
│   ├── admin/
│   └── frontend/
└── routes/
    ├── web.php
    ├── api.php
    └── admin.php
```

### Multiple Applications
When managing multiple applications:

1. **Use consistent naming**: `my-app`, `my-api`, `my-admin`
2. **Separate databases**: Each app should have its own database
3. **Shared packages**: Use composer workspaces for shared packages
4. **Environment separation**: Use different `.env` files for different environments

## Tips for MCP Integration

### 1. Path Management
- Always use relative paths from the MCP workspace root
- Set the `LARAVEL_APP_PATH` environment variable in MCP servers

### 2. Database Connections
- Use the Database MCP server for all database operations
- Configure connection pools for better performance

### 3. File Management
- Use the SSH FileManager for remote deployments
- Keep local and remote file structures synchronized

### 4. Package Management
- Use the PHP Composer MCP server for all package operations
- Keep composer.lock files in version control

## Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   # Fix Laravel directory permissions
   chmod -R 775 storage bootstrap/cache
   ```

2. **Database Connection Failed**
   - Check database credentials
   - Ensure MySQL service is running
   - Verify database exists

3. **Composer Memory Limit**
   ```bash
   # Increase PHP memory limit
   php -d memory_limit=-1 /usr/local/bin/composer install
   ```

4. **Artisan Commands Not Working**
   - Ensure you're in the Laravel project root
   - Check PHP version compatibility
   - Verify `.env` file exists and is properly configured

---

**Note**: This directory is specifically designed to work with the MCP servers in this workspace. All paths and configurations in the MCP servers assume Laravel applications are located here.