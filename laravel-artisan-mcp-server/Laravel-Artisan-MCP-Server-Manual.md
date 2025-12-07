# Laravel Artisan MCP Server Manual

## Overview
The Laravel Artisan MCP Server provides comprehensive Laravel CLI command execution and project management capabilities through the Model Context Protocol. This server automates Laravel development tasks, code generation, and project maintenance operations.

## Features
- ✅ Complete Artisan command execution
- ✅ Automated code generation (controllers, models, migrations)
- ✅ Database migration management
- ✅ Cache and configuration management
- ✅ Queue worker management
- ✅ Testing framework integration
- ✅ Laravel project scaffolding

## Installation and Setup

### Prerequisites
- Node.js 18+
- PHP 8.1+ with required extensions
- Composer for dependency management
- Laravel 10+ framework
- Database system (MySQL/PostgreSQL/SQLite)

### Installation Steps

1. **Install Dependencies**
```bash
cd laravel-artisan-mcp-server
npm install
```

2. **Environment Configuration**
Create a `.env` file in the project root:
```env
# Laravel Project Configuration
LARAVEL_PROJECT_PATH=/path/to/your/laravel/project
PHP_EXECUTABLE_PATH=php
COMPOSER_EXECUTABLE_PATH=composer

# Development Settings
DEFAULT_TEST_SUITE=Feature
ARTISAN_TIMEOUT=300000
AUTO_OPTIMIZE_ON_DEPLOY=true

# Database Configuration (for migrations)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=your_password

# Queue Configuration
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Cache Configuration
CACHE_DRIVER=redis
SESSION_DRIVER=redis
```

3. **Laravel Project Verification**
Ensure your Laravel project is properly set up:
```bash
# Navigate to Laravel project
cd /path/to/your/laravel/project

# Verify Laravel installation
php artisan --version

# Check configuration
php artisan config:show

# Test database connection
php artisan migrate:status
```

4. **Build and Start**
```bash
npm run build
npm start
```

## API Reference

### Project Management

#### create-laravel-project
Create new Laravel application with specified configuration.

**Parameters:**
- `projectName` (string, required): Project directory name
- `projectPath` (string, required): Full path for project creation
- `laravelVersion` (string, optional): Laravel version (default: latest)
- `authScaffolding` (boolean, optional): Include authentication scaffolding
- `databaseType` (string, optional): Database type ('mysql', 'postgresql', 'sqlite')

**Response:**
```json
{
  "success": true,
  "projectPath": "/var/www/my-laravel-app",
  "laravelVersion": "10.x",
  "features": {
    "authentication": true,
    "database": "mysql",
    "queue": "redis",
    "cache": "redis"
  },
  "nextSteps": [
    "cd /var/www/my-laravel-app",
    "php artisan key:generate",
    "php artisan migrate"
  ]
}
```

#### optimize-application
Optimize Laravel application for production deployment.

**Parameters:**
- `environment` (string, required): Target environment ('production', 'staging')
- `clearCaches` (boolean, optional): Clear existing caches first

**Response:**
```json
{
  "success": true,
  "optimizations": {
    "configCached": true,
    "routesCached": true,
    "viewsCached": true,
    "composerOptimized": true,
    "autoloadOptimized": true
  },
  "performance": {
    "beforeOptimization": "250ms",
    "afterOptimization": "95ms",
    "improvement": "62%"
  }
}
```

### Code Generation

#### make-controller
Generate new controller with specified options.

**Parameters:**
- `name` (string, required): Controller name (e.g., 'UserController')
- `type` (string, required): Controller type ('resource', 'api', 'invokable', 'plain')
- `model` (string, optional): Associated model name
- `requests` (boolean, optional): Generate form request classes
- `middleware` (array, optional): Middleware to apply

**Example:**
```json
{
  "name": "UserController",
  "type": "resource",
  "model": "User",
  "requests": true,
  "middleware": ["auth", "verified"]
}
```

**Response:**
```json
{
  "success": true,
  "controller": {
    "name": "UserController",
    "path": "app/Http/Controllers/UserController.php",
    "type": "resource",
    "methods": [
      "index", "create", "store", 
      "show", "edit", "update", "destroy"
    ],
    "associatedFiles": [
      "app/Http/Requests/StoreUserRequest.php",
      "app/Http/Requests/UpdateUserRequest.php"
    ]
  },
  "routeSuggestion": "Route::resource('users', UserController::class);"
}
```

#### make-model
Generate Eloquent model with relationships and additional features.

**Parameters:**
- `name` (string, required): Model name (e.g., 'User')
- `migration` (boolean, optional): Create migration file
- `factory` (boolean, optional): Create model factory
- `seeder` (boolean, optional): Create seeder class
- `controller` (boolean, optional): Create resource controller
- `relationships` (array, optional): Model relationships to include

**Example:**
```json
{
  "name": "Product",
  "migration": true,
  "factory": true,
  "seeder": true,
  "controller": true,
  "relationships": [
    {
      "type": "belongsTo",
      "model": "Category",
      "foreignKey": "category_id"
    },
    {
      "type": "hasMany", 
      "model": "Review",
      "localKey": "id"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "model": {
    "name": "Product",
    "path": "app/Models/Product.php",
    "relationships": ["category", "reviews"],
    "fillable": ["name", "description", "price", "category_id"],
    "casts": ["price" => "decimal:2"],
    "dates": ["created_at", "updated_at"]
  },
  "generatedFiles": [
    "database/migrations/2025_12_07_103000_create_products_table.php",
    "database/factories/ProductFactory.php",
    "database/seeders/ProductSeeder.php",
    "app/Http/Controllers/ProductController.php"
  ]
}
```

#### make-migration
Create database migration with table structure.

**Parameters:**
- `name` (string, required): Migration name
- `table` (string, optional): Table name for table migrations
- `create` (string, optional): Table name for create migrations
- `columns` (array, optional): Column definitions
- `indexes` (array, optional): Index definitions
- `foreignKeys` (array, optional): Foreign key constraints

**Example:**
```json
{
  "name": "create_products_table",
  "create": "products",
  "columns": [
    {"name": "id", "type": "id"},
    {"name": "name", "type": "string", "length": 255},
    {"name": "slug", "type": "string", "unique": true},
    {"name": "description", "type": "text", "nullable": true},
    {"name": "price", "type": "decimal", "precision": 10, "scale": 2},
    {"name": "category_id", "type": "foreignId", "constrained": true},
    {"name": "timestamps", "type": "timestamps"}
  ],
  "indexes": [
    {"columns": ["name"], "type": "index"},
    {"columns": ["slug"], "type": "unique"}
  ]
}
```

### Database Management

#### run-migrations
Execute database migrations with options.

**Parameters:**
- `step` (number, optional): Number of migrations to run
- `force` (boolean, optional): Force run in production
- `seed` (boolean, optional): Run seeders after migration
- `pretend` (boolean, optional): Show SQL without executing

**Response:**
```json
{
  "success": true,
  "migrationsRun": [
    "2025_12_07_103000_create_products_table",
    "2025_12_07_104500_add_category_to_products"
  ],
  "executionTime": "1.25s",
  "sqlQueries": [
    "CREATE TABLE `products` (`id` bigint unsigned NOT NULL AUTO_INCREMENT...)",
    "ALTER TABLE `products` ADD `category_id` bigint unsigned..."
  ],
  "seeded": true
}
```

#### rollback-migrations
Rollback database migrations safely.

**Parameters:**
- `step` (number, optional): Number of migrations to rollback
- `force` (boolean, optional): Force rollback in production
- `pretend` (boolean, optional): Show SQL without executing

**Response:**
```json
{
  "success": true,
  "migrationsRolledBack": [
    "2025_12_07_104500_add_category_to_products"
  ],
  "executionTime": "0.85s",
  "tablesDropped": [],
  "columnsDropped": ["category_id"]
}
```

#### seed-database
Run database seeders to populate test data.

**Parameters:**
- `class` (string, optional): Specific seeder class
- `force` (boolean, optional): Force seed in production

**Response:**
```json
{
  "success": true,
  "seedersRun": [
    "UserSeeder",
    "CategorySeeder", 
    "ProductSeeder"
  ],
  "recordsCreated": {
    "users": 10,
    "categories": 5,
    "products": 50
  },
  "executionTime": "2.1s"
}
```

### Cache Management

#### cache-clear
Clear application cache with specific options.

**Parameters:**
- `cacheType` (string, optional): Specific cache ('config', 'route', 'view', 'event')
- `tags` (array, optional): Specific cache tags to clear

**Response:**
```json
{
  "success": true,
  "clearedCaches": [
    "application",
    "config",
    "route",
    "view", 
    "compiled"
  ],
  "sizeBefore": "125.6MB",
  "sizeAfter": "0MB",
  "executionTime": "0.45s"
}
```

#### optimize-caches
Create optimized cache files for production.

**Response:**
```json
{
  "success": true,
  "optimizedCaches": {
    "config": {
      "cached": true,
      "files": 15,
      "size": "2.1MB"
    },
    "routes": {
      "cached": true, 
      "routes": 45,
      "size": "1.8MB"
    },
    "views": {
      "cached": true,
      "templates": 32,
      "size": "5.2MB"
    }
  },
  "performanceImprovement": "45%"
}
```

### Queue Management

#### queue-work
Start queue worker with specified configuration.

**Parameters:**
- `queue` (string, optional): Queue name to process
- `connection` (string, optional): Queue connection
- `timeout` (number, optional): Worker timeout in seconds
- `memory` (number, optional): Memory limit in MB
- `sleep` (number, optional): Sleep time when no jobs
- `tries` (number, optional): Number of retry attempts

**Response:**
```json
{
  "success": true,
  "worker": {
    "id": "worker_123456",
    "queue": "default",
    "connection": "redis",
    "timeout": 60,
    "memory": 512,
    "status": "running"
  },
  "jobsProcessed": 0,
  "nextJob": null,
  "startedAt": "2025-12-07T10:30:00Z"
}
```

#### queue-restart
Restart all queue workers gracefully.

**Response:**
```json
{
  "success": true,
  "restartedWorkers": 3,
  "jobsInQueue": {
    "default": 5,
    "emails": 12,
    "processing": 2
  },
  "restartTime": "2025-12-07T10:35:00Z"
}
```

### Testing Integration

#### run-tests
Execute PHPUnit tests with coverage reporting.

**Parameters:**
- `testsuite` (string, optional): Specific test suite ('Unit', 'Feature')
- `filter` (string, optional): Test filter pattern
- `coverage` (boolean, optional): Generate coverage report
- `parallel` (boolean, optional): Run tests in parallel

**Response:**
```json
{
  "success": true,
  "results": {
    "tests": 45,
    "assertions": 128,
    "failures": 0,
    "errors": 0,
    "skipped": 2,
    "executionTime": "15.42s"
  },
  "coverage": {
    "lines": 85.2,
    "functions": 78.9,
    "classes": 92.1,
    "files": 90.5
  },
  "slowTests": [
    {"name": "Feature\\AuthTest::test_user_can_register", "time": "2.15s"}
  ]
}
```

### Development Tools

#### serve-application
Start Laravel development server.

**Parameters:**
- `host` (string, optional): Server host (default: 'localhost')
- `port` (number, optional): Server port (default: 8000)
- `public` (boolean, optional): Make server publicly accessible

**Response:**
```json
{
  "success": true,
  "server": {
    "url": "http://localhost:8000",
    "host": "localhost",
    "port": 8000,
    "environment": "local",
    "debug": true,
    "startedAt": "2025-12-07T10:30:00Z"
  },
  "routes": {
    "web": 15,
    "api": 8
  }
}
```

#### tinker-execute
Execute PHP code in Laravel Tinker REPL.

**Parameters:**
- `code` (string, required): PHP code to execute
- `timeout` (number, optional): Execution timeout

**Example:**
```json
{
  "code": "User::count()"
}
```

**Response:**
```json
{
  "success": true,
  "code": "User::count()",
  "output": "15",
  "executionTime": "0.125s",
  "memoryUsage": "2.1MB"
}
```

## Laravel Integration Patterns

### MVC Pattern Generation
```javascript
// Complete MVC structure for a resource
const generateMVC = async (resourceName) => {
  // 1. Create migration
  await makeMigration({
    name: `create_${resourceName.toLowerCase()}s_table`,
    create: `${resourceName.toLowerCase()}s`,
    columns: [...] 
  });
  
  // 2. Create model with relationships
  await makeModel({
    name: resourceName,
    migration: false, // Already created
    factory: true,
    seeder: true,
    controller: true,
    relationships: [...]
  });
  
  // 3. Create form requests
  await makeRequest({
    name: `Store${resourceName}Request`
  });
  
  // 4. Create API resource
  await makeResource({
    name: `${resourceName}Resource`
  });
  
  // 5. Run migration
  await runMigrations();
  
  // 6. Seed data
  await seedDatabase({
    class: `${resourceName}Seeder`
  });
};
```

### API Development Workflow
```javascript
const generateAPI = async (resources) => {
  for (const resource of resources) {
    // Generate API controller
    await makeController({
      name: `${resource}Controller`,
      type: 'api',
      model: resource,
      requests: true
    });
    
    // Generate API resources
    await makeResource({
      name: `${resource}Resource`,
      collection: true
    });
    
    // Generate API tests
    await makeTest({
      name: `${resource}ApiTest`,
      type: 'feature'
    });
  }
  
  // Generate API routes
  await generateApiRoutes(resources);
};
```

### Database Migration Workflow
```javascript
const migrationWorkflow = async () => {
  // Check current status
  const status = await migrationStatus();
  
  // Run pending migrations
  if (status.pending.length > 0) {
    await runMigrations();
  }
  
  // Seed fresh data in development
  if (process.env.APP_ENV === 'local') {
    await seedDatabase();
  }
  
  // Optimize for production
  if (process.env.APP_ENV === 'production') {
    await optimizeApplication();
  }
};
```

## Advanced Features

### Custom Artisan Commands
```javascript
// Generate custom command
await makeCommand({
  name: 'ProcessPayments',
  signature: 'payments:process {--queue=default}',
  description: 'Process pending payments'
});

// Execute custom command
await executeArtisan({
  command: 'payments:process',
  options: ['--queue=emails']
});
```

### Scheduled Task Management
```javascript
// Generate scheduled task
await makeCommand({
  name: 'BackupDatabase',
  signature: 'backup:database',
  description: 'Create database backup',
  schedule: 'daily'
});

// List scheduled tasks
await listSchedule();

// Run scheduler
await runSchedule();
```

### Package Development
```javascript
// Generate package structure
await makePackage({
  name: 'my-company/awesome-package',
  namespace: 'MyCompany\\AwesomePackage',
  serviceProvider: true,
  config: true,
  migrations: true
});
```

## Performance Optimization

### Production Optimization Checklist
```javascript
const optimizeForProduction = async () => {
  // Clear all caches
  await cacheClear();
  
  // Optimize configuration
  await configCache();
  
  // Cache routes
  await routeCache();
  
  // Cache views
  await viewCache();
  
  // Optimize Composer autoloader
  await composerOptimize();
  
  // Generate optimized bootstrap files
  await optimizeBootstrap();
  
  return {
    status: 'optimized',
    improvements: {
      bootTime: '60% faster',
      memoryUsage: '25% reduced',
      responseTime: '40% improved'
    }
  };
};
```

### Cache Strategy Implementation
```javascript
// Implement multi-layer caching
await implementCaching({
  config: {
    driver: 'redis',
    prefix: 'laravel_cache'
  },
  session: {
    driver: 'redis',
    lifetime: 120
  },
  queue: {
    driver: 'redis',
    connection: 'default'
  }
});
```

## Error Handling & Debugging

### Common Error Scenarios

**Migration Failed:**
```json
{
  "success": false,
  "error": "MIGRATION_FAILED",
  "message": "SQLSTATE[42S01]: Base table or view already exists",
  "details": {
    "migration": "2025_12_07_103000_create_users_table",
    "sql": "CREATE TABLE `users`...",
    "errorCode": "42S01"
  }
}
```

**Code Generation Failed:**
```json
{
  "success": false,
  "error": "CODE_GENERATION_FAILED", 
  "message": "Controller already exists",
  "details": {
    "type": "controller",
    "name": "UserController",
    "path": "app/Http/Controllers/UserController.php"
  }
}
```

**Queue Worker Failed:**
```json
{
  "success": false,
  "error": "QUEUE_WORKER_FAILED",
  "message": "Worker process terminated unexpectedly",
  "details": {
    "workerId": "worker_123456",
    "exitCode": 1,
    "lastJob": "App\\Jobs\\ProcessPayment",
    "memoryUsage": "512MB"
  }
}
```

## Monitoring & Maintenance

### Application Health Checks
```javascript
const healthCheck = async () => {
  return {
    database: await checkDatabaseConnection(),
    cache: await checkCacheConnection(),
    queue: await checkQueueConnection(),
    storage: await checkStoragePermissions(),
    dependencies: await checkComposerDependencies()
  };
};
```

### Performance Monitoring
```javascript
const getPerformanceMetrics = async () => {
  return {
    responseTime: await getAverageResponseTime(),
    memoryUsage: await getCurrentMemoryUsage(),
    queryCount: await getQueryCount(),
    cacheHitRate: await getCacheHitRate(),
    queueLength: await getQueueLength()
  };
};
```

This manual provides comprehensive guidance for Laravel development automation through the MCP protocol, streamlining development workflows and ensuring best practices.