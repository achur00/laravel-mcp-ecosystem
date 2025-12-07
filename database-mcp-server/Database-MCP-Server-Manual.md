# Database Management MCP Server Manual

## Overview
The Database Management MCP Server provides comprehensive database operations, schema management, and Laravel migration support through the Model Context Protocol. This server handles multiple database systems and integrates seamlessly with Laravel applications.

## Features
- ✅ Multi-database support (MySQL, PostgreSQL, SQLite)
- ✅ Laravel migration management
- ✅ Schema operations (tables, columns, indexes)
- ✅ Raw query execution with safety validation
- ✅ Database backup and restore
- ✅ Connection pooling and management
- ✅ Performance optimization tools

## Installation and Setup

### Prerequisites
- Node.js 18+
- Database systems (MySQL 8.0+, PostgreSQL 12+, or SQLite 3+)
- Laravel application (optional but recommended)

### Installation Steps

1. **Install Dependencies**
```bash
cd database-mcp-server
npm install
```

2. **Environment Configuration**
Create a `.env` file in the project root:
```env
# Primary Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=your_password

# Backup Configuration
BACKUP_PATH=./backups
BACKUP_RETENTION_DAYS=30
BACKUP_COMPRESSION=true

# Performance Settings
DB_POOL_MIN=2
DB_POOL_MAX=10
DB_TIMEOUT=30000
```

3. **Database Permissions**
Ensure database user has necessary permissions:
```sql
-- MySQL
GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost';
GRANT FILE ON *.* TO 'username'@'localhost'; -- For backups

-- PostgreSQL
GRANT ALL PRIVILEGES ON DATABASE database_name TO username;
```

4. **Build and Start**
```bash
npm run build
npm start
```

## API Reference

### Connection Management

#### connect-database
Establish connection to database server.

**Parameters:**
- `host` (string, required): Database host
- `port` (number, required): Database port
- `database` (string, required): Database name
- `username` (string, required): Database username
- `password` (string, required): Database password
- `type` (string, required): Database type ('mysql', 'postgresql', 'sqlite')

#### test-connection
Test database connectivity and return connection status.

**Response:**
```json
{
  "success": true,
  "message": "Database connection successful",
  "serverInfo": {
    "version": "8.0.35-MySQL Community Server",
    "host": "localhost:3306"
  }
}
```

### Schema Operations

#### create-table
Create new database table with columns and constraints.

**Parameters:**
- `tableName` (string, required): Name of table to create
- `columns` (array, required): Column definitions
- `primaryKey` (string, optional): Primary key column
- `foreignKeys` (array, optional): Foreign key constraints
- `indexes` (array, optional): Index definitions

**Example:**
```json
{
  "tableName": "products",
  "columns": [
    {"name": "id", "type": "INT", "autoIncrement": true},
    {"name": "name", "type": "VARCHAR(255)", "nullable": false},
    {"name": "price", "type": "DECIMAL(10,2)", "nullable": false},
    {"name": "category_id", "type": "INT", "nullable": true}
  ],
  "primaryKey": "id",
  "foreignKeys": [
    {"column": "category_id", "references": "categories(id)"}
  ],
  "indexes": [
    {"name": "idx_name", "columns": ["name"]},
    {"name": "idx_price", "columns": ["price"], "type": "INDEX"}
  ]
}
```

#### alter-table
Modify existing table structure.

**Parameters:**
- `tableName` (string, required): Table to modify
- `operation` (string, required): 'ADD_COLUMN', 'DROP_COLUMN', 'MODIFY_COLUMN', 'ADD_INDEX', 'DROP_INDEX'
- `columnDefinition` (object, optional): Column details for add/modify operations
- `columnName` (string, optional): Column name for drop operations
- `indexDefinition` (object, optional): Index details for index operations

#### describe-table
Get detailed information about table structure.

**Response:**
```json
{
  "tableName": "users",
  "columns": [
    {
      "name": "id",
      "type": "INT",
      "nullable": false,
      "key": "PRI",
      "default": null,
      "extra": "auto_increment"
    },
    {
      "name": "email",
      "type": "VARCHAR(255)",
      "nullable": false,
      "key": "UNI",
      "default": null
    }
  ],
  "indexes": [
    {"name": "PRIMARY", "columns": ["id"], "unique": true},
    {"name": "email_unique", "columns": ["email"], "unique": true}
  ]
}
```

### Migration Management

#### create-migration
Generate Laravel migration file.

**Parameters:**
- `name` (string, required): Migration name
- `table` (string, optional): Table name for table migrations
- `type` (string, required): 'create', 'table', 'drop'

**Response:**
```json
{
  "success": true,
  "migrationFile": "2025_12_07_103000_create_products_table.php",
  "path": "/database/migrations/2025_12_07_103000_create_products_table.php"
}
```

#### run-migrations
Execute pending database migrations.

**Parameters:**
- `step` (number, optional): Number of migrations to run
- `force` (boolean, optional): Force run in production

**Response:**
```json
{
  "success": true,
  "migrationsRun": [
    "2025_12_07_103000_create_products_table",
    "2025_12_07_104500_add_category_to_products"
  ],
  "message": "Migrations completed successfully"
}
```

#### rollback-migration
Rollback database migrations.

**Parameters:**
- `step` (number, optional): Number of migrations to rollback (default: 1)
- `force` (boolean, optional): Force rollback in production

### Data Operations

#### execute-query
Execute raw SQL queries with safety validation.

**Parameters:**
- `query` (string, required): SQL query to execute
- `parameters` (array, optional): Query parameters for prepared statements
- `readOnly` (boolean, optional): Whether query is read-only (default: auto-detect)

**Example:**
```json
{
  "query": "SELECT * FROM users WHERE role = ? AND created_at > ?",
  "parameters": ["admin", "2025-01-01"],
  "readOnly": true
}
```

**Response:**
```json
{
  "success": true,
  "rows": [
    {"id": 1, "name": "John", "email": "john@example.com", "role": "admin"},
    {"id": 2, "name": "Jane", "email": "jane@example.com", "role": "admin"}
  ],
  "rowCount": 2,
  "executionTime": "0.025s"
}
```

#### insert-data
Insert new records into table.

**Parameters:**
- `table` (string, required): Target table name
- `data` (object or array, required): Data to insert
- `onDuplicate` (string, optional): Action on duplicate key ('IGNORE', 'UPDATE')

#### update-data
Update existing records.

**Parameters:**
- `table` (string, required): Target table name
- `data` (object, required): Data to update
- `where` (object, required): WHERE conditions
- `limit` (number, optional): Maximum rows to update

#### select-data
Query and retrieve data with advanced options.

**Parameters:**
- `table` (string, required): Table to query
- `columns` (array, optional): Columns to select (default: all)
- `where` (object, optional): WHERE conditions
- `orderBy` (array, optional): ORDER BY clauses
- `limit` (number, optional): LIMIT clause
- `offset` (number, optional): OFFSET clause
- `joins` (array, optional): JOIN clauses

### Database Maintenance

#### backup-database
Create database backup.

**Parameters:**
- `format` (string, required): 'sql', 'json', or 'custom'
- `compression` (boolean, optional): Compress backup file
- `tables` (array, optional): Specific tables to backup (default: all)

**Response:**
```json
{
  "success": true,
  "backupFile": "laravel_app_2025-12-07_10-30-00.sql.gz",
  "path": "./backups/laravel_app_2025-12-07_10-30-00.sql.gz",
  "size": "2.5MB",
  "tables": 15,
  "records": 50000
}
```

#### restore-database
Restore database from backup file.

**Parameters:**
- `backupFile` (string, required): Path to backup file
- `overwrite` (boolean, optional): Overwrite existing data
- `targetDatabase` (string, optional): Different database name

#### optimize-tables
Optimize database performance.

**Parameters:**
- `operation` (string, required): 'ANALYZE', 'OPTIMIZE', 'REPAIR'
- `tables` (array, optional): Specific tables (default: all)

## Laravel Integration

### Migration File Structure
Generated migration files follow Laravel conventions:

```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->foreignId('category_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
```

### Database Configuration
Integrate with Laravel's database configuration:

```php
// config/database.php
'connections' => [
    'mysql' => [
        'driver' => 'mysql',
        'host' => env('DB_HOST', '127.0.0.1'),
        'port' => env('DB_PORT', '3306'),
        'database' => env('DB_DATABASE', 'forge'),
        'username' => env('DB_USERNAME', 'forge'),
        'password' => env('DB_PASSWORD', ''),
        'charset' => 'utf8mb4',
        'collation' => 'utf8mb4_unicode_ci',
    ],
],
```

## Database-Specific Features

### MySQL Features
- InnoDB and MyISAM engine support
- Full-text search indexes
- JSON column support
- Foreign key constraints with cascading

### PostgreSQL Features
- JSONB operations
- Array data types
- Custom functions and procedures
- Advanced indexing (GIN, GiST)

### SQLite Features
- File-based database perfect for development
- In-memory databases for testing
- Foreign key support (when enabled)
- Full-text search with FTS modules

## Security Best Practices

### Query Security
- All queries use parameterized statements
- Input validation and sanitization
- SQL injection prevention
- Query whitelist for dangerous operations

### Connection Security
- SSL/TLS encryption support
- Connection timeouts
- User permission validation
- Audit logging for all operations

### Backup Security
- Encrypted backup files
- Secure backup storage locations
- Access control for backup operations
- Retention policy enforcement

## Performance Optimization

### Connection Pooling
```env
DB_POOL_MIN=2          # Minimum connections
DB_POOL_MAX=10         # Maximum connections
DB_POOL_IDLE=30000     # Idle timeout (ms)
DB_POOL_ACQUIRE=60000  # Acquire timeout (ms)
```

### Query Optimization
- Query execution time monitoring
- Slow query logging
- Index usage analysis
- Query plan examination

### Caching Strategies
- Connection caching
- Query result caching
- Schema metadata caching
- Prepared statement caching

## Monitoring and Alerts

### Performance Metrics
- Query execution times
- Connection pool status
- Database size and growth
- Index usage statistics

### Health Checks
- Database connectivity
- Replication status (if applicable)
- Disk space monitoring
- Lock detection

## Error Handling

### Common Error Scenarios

**Connection Failed:**
```json
{
  "success": false,
  "error": "CONNECTION_FAILED",
  "message": "Unable to connect to database",
  "details": {
    "host": "localhost",
    "port": 3306,
    "code": "ECONNREFUSED"
  }
}
```

**SQL Error:**
```json
{
  "success": false,
  "error": "SQL_ERROR",
  "message": "Table 'users' doesn't exist",
  "query": "SELECT * FROM users",
  "sqlState": "42S02"
}
```

**Migration Error:**
```json
{
  "success": false,
  "error": "MIGRATION_FAILED",
  "message": "Migration file not found",
  "migration": "2025_12_07_103000_create_products_table"
}
```

## Troubleshooting

### Common Issues

**Backup Fails**
- Check file system permissions
- Verify backup directory exists
- Ensure sufficient disk space
- Validate compression settings

**Migration Rollback Issues**
- Check migration file syntax
- Verify rollback method exists
- Ensure foreign key constraints allow rollback
- Check for data dependencies

**Performance Problems**
- Analyze slow queries
- Check index usage
- Monitor connection pool
- Review query patterns

This manual provides comprehensive guidance for database operations through the MCP protocol, ensuring reliable and secure database management for Laravel applications.