# Database Management MCP Server

A Model Context Protocol (MCP) server that provides comprehensive database management capabilities for Laravel applications.

## Features

- **Multi-Database Support**: MySQL, PostgreSQL, SQLite compatibility
- **Schema Management**: Create, alter, and drop tables and columns
- **Migration Management**: Run, rollback, and create database migrations
- **Query Execution**: Execute raw SQL queries with safety validation
- **Data Operations**: Insert, update, delete, and select operations
- **Database Backup**: Create and restore database backups
- **Connection Management**: Multiple database connection handling

## Available Tools

### Connection Management
- `connect-database` - Establish database connection
- `test-connection` - Test database connectivity
- `list-databases` - List all available databases
- `switch-database` - Switch to different database

### Schema Operations
- `create-table` - Create new database table
- `alter-table` - Modify existing table structure
- `drop-table` - Delete table and all data
- `describe-table` - Get table structure and columns
- `list-tables` - List all tables in database

### Migration Management
- `create-migration` - Generate new migration file
- `run-migrations` - Execute pending migrations
- `rollback-migration` - Rollback last migration
- `migration-status` - Check migration status

### Data Operations
- `execute-query` - Run raw SQL queries safely
- `insert-data` - Insert new records
- `update-data` - Update existing records
- `delete-data` - Delete records with conditions
- `select-data` - Query and retrieve data

### Database Maintenance
- `backup-database` - Create database backup
- `restore-database` - Restore from backup file
- `optimize-tables` - Optimize database performance
- `check-integrity` - Verify database integrity

## Resources

- `db://docs/laravel-migrations` - Laravel migration guide
- `db://docs/query-builder` - Database query builder documentation
- `db://schemas/tables` - Current database schema information

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Configure environment variables:
```bash
# Database configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=root
DB_PASSWORD=

# Backup configuration
BACKUP_PATH=./backups
BACKUP_RETENTION_DAYS=30
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

## Database Support

### MySQL
- Full DDL and DML operations
- InnoDB and MyISAM engine support
- Foreign key constraints
- Index management

### PostgreSQL
- Advanced data types support
- JSONB operations
- Full-text search capabilities
- Custom functions and procedures

### SQLite
- Lightweight operations
- File-based database support
- Perfect for development and testing

## Laravel Integration

This server integrates seamlessly with Laravel's database features:
- Uses Laravel migration file format
- Supports Eloquent model generation
- Compatible with Laravel's schema builder
- Follows Laravel naming conventions

## Security Features

- SQL injection prevention
- Query validation and sanitization
- Connection encryption support
- Backup encryption capabilities
- Access control and permissions

## Usage with Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "database": {
      "command": "node",
      "args": ["path/to/database-mcp-server/dist/index.js"]
    }
  }
}
```