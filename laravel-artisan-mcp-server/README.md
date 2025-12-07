# Laravel Artisan MCP Server

A Model Context Protocol (MCP) server that provides comprehensive Laravel Artisan command execution and project management capabilities.

## Features

- **Artisan Command Execution**: Run any Laravel Artisan command
- **Code Generation**: Generate controllers, models, migrations, and more
- **Migration Management**: Create, run, and rollback database migrations
- **Cache Management**: Clear and manage Laravel caches
- **Route Management**: List and analyze application routes
- **Configuration Management**: Manage Laravel configuration
- **Package Management**: Install and manage Laravel packages
- **Testing Integration**: Run PHPUnit tests and generate coverage

## Available Tools

### Project Management
- `create-laravel-project` - Create new Laravel application
- `install-laravel-package` - Install Laravel packages via Composer
- `publish-vendor-assets` - Publish vendor package assets
- `clear-all-caches` - Clear all Laravel caches
- `optimize-application` - Optimize Laravel for production

### Code Generation
- `make-controller` - Generate new controller
- `make-model` - Generate new Eloquent model
- `make-middleware` - Generate new middleware
- `make-request` - Generate form request validation
- `make-resource` - Generate API resource
- `make-seeder` - Generate database seeder
- `make-factory` - Generate model factory
- `make-command` - Generate Artisan command

### Database Management
- `make-migration` - Create database migration
- `run-migrations` - Execute database migrations
- `rollback-migrations` - Rollback database migrations
- `migrate-fresh` - Drop all tables and re-run migrations
- `seed-database` - Run database seeders
- `migrate-status` - Show migration status

### Cache Management
- `cache-clear` - Clear application cache
- `config-cache` - Cache configuration files
- `route-cache` - Cache application routes
- `view-cache` - Cache Blade templates
- `event-cache` - Cache application events

### Route & Configuration
- `list-routes` - Display all application routes
- `route-list-filtered` - Filter routes by name/method
- `config-show` - Show configuration values
- `env-show` - Show environment configuration
- `key-generate` - Generate application key

### Queue Management
- `queue-work` - Start queue worker
- `queue-restart` - Restart queue workers
- `queue-failed` - List failed queue jobs
- `queue-retry` - Retry failed queue jobs
- `queue-flush` - Delete all failed queue jobs

### Testing & Development
- `run-tests` - Execute PHPUnit tests
- `run-tests-with-coverage` - Run tests with coverage report
- `serve-application` - Start development server
- `tinker-execute` - Execute PHP code in Tinker
- `dump-autoload` - Regenerate autoload files

## Resources

- `artisan://docs/commands` - Complete Artisan command reference
- `artisan://docs/code-generation` - Code generation patterns and examples
- `artisan://docs/best-practices` - Laravel development best practices

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Configure Laravel project paths:
```bash
# Laravel Configuration
LARAVEL_PROJECT_PATH=/path/to/your/laravel/project
PHP_EXECUTABLE_PATH=php
COMPOSER_EXECUTABLE_PATH=composer

# Development Settings
DEFAULT_TEST_SUITE=Feature
ARTISAN_TIMEOUT=300000
AUTO_OPTIMIZE_ON_DEPLOY=true
```

4. Run the server:
```bash
npm start
```

## Development

Start the server in development mode with auto-reload:
```bash
npm run dev
```

## Artisan Command Support

### Supported Commands Categories

#### Make Commands (Code Generation)
- `make:controller` - Controllers with various options
- `make:model` - Eloquent models with relationships
- `make:middleware` - HTTP middleware
- `make:migration` - Database migrations
- `make:seeder` - Database seeders
- `make:factory` - Model factories
- `make:request` - Form request validation
- `make:resource` - API resources
- `make:command` - Custom Artisan commands
- `make:job` - Queue jobs
- `make:listener` - Event listeners
- `make:mail` - Mailable classes
- `make:notification` - Notifications
- `make:policy` - Authorization policies

#### Database Commands
- `migrate` - Run migrations
- `migrate:rollback` - Rollback migrations
- `migrate:reset` - Rollback all migrations
- `migrate:refresh` - Rollback and re-run migrations
- `migrate:fresh` - Drop tables and re-run migrations
- `migrate:status` - Show migration status
- `db:seed` - Run database seeders

#### Cache Commands
- `cache:clear` - Clear application cache
- `config:clear` - Clear config cache
- `config:cache` - Cache config files
- `route:clear` - Clear route cache
- `route:cache` - Cache routes
- `view:clear` - Clear view cache
- `view:cache` - Cache views

#### Development Commands
- `serve` - Start development server
- `tinker` - Interact with application
- `test` - Run tests
- `queue:work` - Start queue worker
- `storage:link` - Create symbolic storage link

## Laravel Project Structure

The server automatically detects Laravel project structure:
```
laravel-project/
├── app/
│   ├── Http/Controllers/
│   ├── Models/
│   ├── Middleware/
│   └── ...
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
├── routes/
├── resources/
├── config/
├── artisan
└── composer.json
```

## Code Generation Templates

### Controller Templates
- Resource controllers with CRUD operations
- API controllers with proper responses
- Controller with middleware assignments
- Invokable controllers for single actions

### Model Templates
- Eloquent models with relationships
- Models with custom attributes and mutators
- Models with soft deletes
- Pivot models for many-to-many relationships

### Migration Templates
- Create table migrations
- Modify table migrations
- Foreign key constraints
- Index definitions

## Best Practices Integration

### Following Laravel Conventions
- PSR-4 autoloading standards
- Laravel naming conventions
- Proper namespace organization
- RESTful resource naming

### Security Features
- CSRF protection setup
- Input validation generation
- Authentication scaffolding
- Authorization policy creation

### Performance Optimization
- Query optimization suggestions
- Eager loading recommendations
- Cache implementation guidance
- Database indexing advice

## Usage with Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "laravel-artisan": {
      "command": "node",
      "args": ["path/to/laravel-artisan-mcp-server/dist/index.js"]
    }
  }
}
```

## Common Workflows

### 1. New Feature Development
```
1. Generate migration for database changes
2. Create model with relationships
3. Generate controller with resource methods
4. Create form request for validation
5. Generate API resource for responses
6. Run migrations and seed data
```

### 2. API Development
```
1. Create API controller
2. Generate API resources
3. Set up API routes
4. Configure authentication
5. Test API endpoints
```

## Recent Updates and Fixes

### December 7, 2025 - Command Execution Fix
**Issue**: The Laravel Artisan MCP Server was only simulating commands with "Would execute" messages instead of actually executing them.

**Root Cause**: Missing `child_process` import and implementation of actual command execution using `execSync`.

**Solution**: 
1. Added `import { execSync } from 'child_process'` to enable command execution
2. Updated `executeArtisanCommand()`, `makeController()`, and `makeModel()` functions to:
   - Actually execute commands using `execSync` with proper working directory
   - Return real command output instead of simulation messages
   - Handle errors properly with stderr output

**Changes Made**:
- Added `child_process` import for command execution
- Replaced "Would execute" simulation with actual `execSync()` calls
- Updated all command execution functions to use real execution
- Improved error handling to include stderr output
- Maintained proper working directory context for Laravel projects

**Testing**: Verified with migration creation command that now properly executes and creates migration files.

**Files Modified**:
- `src/index.ts` - Added execSync import and updated execution functions

This fix ensures all MCP server commands now work as intended rather than just simulating execution.
3. Set up middleware for authentication
4. Create request validation classes
5. Generate API documentation
```

### 3. Testing Workflow
```
1. Generate test classes
2. Create database factories
3. Set up test data seeders
4. Run tests with coverage
5. Generate test reports
```

This server streamlines Laravel development by providing easy access to all Artisan commands through the MCP protocol, making it perfect for automated development workflows and AI-assisted coding.