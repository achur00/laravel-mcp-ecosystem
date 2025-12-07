<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Laravel Artisan MCP Server Project

This project is a Model Context Protocol (MCP) server built with TypeScript for comprehensive Laravel Artisan command execution and project management.

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

This Laravel Artisan MCP Server provides:

### Tools Available
- `create-laravel-project` - Create new Laravel application
- `make-controller` - Generate controllers with various options
- `make-model` - Generate Eloquent models with relationships
- `make-migration` - Create database migrations
- `run-migrations` - Execute database migrations
- `rollback-migrations` - Rollback database migrations
- `make-middleware` - Generate HTTP middleware
- `make-request` - Generate form request validation
- `cache-clear` - Clear application cache
- `route-cache` - Cache application routes
- `serve-application` - Start development server
- `run-tests` - Execute PHPUnit tests
- `queue-work` - Start queue workers

### Resources
- `artisan://docs/commands` - Complete Artisan command reference
- `artisan://docs/code-generation` - Code generation patterns
- `artisan://docs/best-practices` - Laravel development best practices

### Build Commands
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with auto-reload
- `npm start` - Start the MCP server

### MCP Configuration
```json
{
  "servers": {
    "laravel-artisan": {
      "type": "stdio",
      "command": "node", 
      "args": ["dist/index.js"]
    }
  }
}
```

### Environment Variables
```bash
# Laravel Configuration
LARAVEL_PROJECT_PATH=/path/to/laravel/project
PHP_EXECUTABLE_PATH=php
COMPOSER_EXECUTABLE_PATH=composer

# Development Settings
DEFAULT_TEST_SUITE=Feature
ARTISAN_TIMEOUT=300000
AUTO_OPTIMIZE_ON_DEPLOY=true
```

## References
- MCP SDK Documentation: https://github.com/modelcontextprotocol
- Laravel Documentation: https://laravel.com/docs
- Artisan Console: https://laravel.com/docs/artisan
- Implementation Guide: https://modelcontextprotocol.io/llms-full.txt

## Project Structure
```
├── src/
│   ├── index.ts          # Main MCP server
│   ├── artisan-executor.ts # Artisan command execution
│   ├── code-generator.ts # Code generation utilities
│   └── project-manager.ts # Laravel project management
├── dist/                 # Compiled JavaScript output
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project configuration
├── README.md             # Project documentation
└── Laravel-Artisan-MCP-Server-Manual.md # Detailed manual
```

## Supported Artisan Commands

### Make Commands (Code Generation)
- `make:controller` - Controllers with CRUD operations
- `make:model` - Models with relationships and factories
- `make:middleware` - HTTP middleware classes
- `make:migration` - Database migrations
- `make:seeder` - Database seeders
- `make:factory` - Model factories
- `make:request` - Form request validation
- `make:resource` - API resources
- `make:command` - Custom Artisan commands
- `make:job` - Queue jobs
- `make:mail` - Mailable classes
- `make:notification` - Notifications

### Database Commands
- `migrate` - Run pending migrations
- `migrate:rollback` - Rollback migrations
- `migrate:refresh` - Rollback and re-run
- `migrate:fresh` - Drop tables and re-migrate
- `db:seed` - Run database seeders

### Cache Commands
- `cache:clear` - Clear application cache
- `config:cache` - Cache configuration
- `route:cache` - Cache routes
- `view:cache` - Cache Blade templates

## Laravel Integration Features
- Follows Laravel naming conventions and PSR-4 standards
- Generates code with proper namespaces and imports
- Supports Laravel 10+ features and patterns
- Integrates with Laravel's testing framework
- Compatible with Laravel Sanctum/Passport authentication

Streamlines Laravel development by automating repetitive tasks and providing intelligent code generation through the MCP protocol.