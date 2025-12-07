<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Database Management MCP Server Project

This project is a Model Context Protocol (MCP) server built with TypeScript for comprehensive database management and Laravel integration.

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

This Database Management MCP Server provides:

### Tools Available
- `connect-database` - Establish database connections (MySQL/PostgreSQL/SQLite)
- `test-connection` - Test database connectivity
- `create-migration` - Generate Laravel migration files
- `run-migrations` - Execute pending database migrations
- `rollback-migration` - Rollback migrations safely
- `create-table` - Create new database tables with schema
- `alter-table` - Modify existing table structures
- `execute-query` - Run raw SQL queries with safety validation
- `backup-database` - Create database backups
- `restore-database` - Restore from backup files

### Resources
- `db://docs/laravel-migrations` - Laravel migration guide
- `db://docs/query-builder` - Database query builder documentation
- `db://schemas/tables` - Current database schema information

### Build Commands
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with auto-reload
- `npm start` - Start the MCP server

### MCP Configuration
```json
{
  "servers": {
    "database": {
      "type": "stdio",
      "command": "node", 
      "args": ["dist/index.js"]
    }
  }
}
```

### Environment Variables
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

## References
- MCP SDK Documentation: https://github.com/modelcontextprotocol
- Laravel Migrations: https://laravel.com/docs/migrations
- Laravel Schema Builder: https://laravel.com/docs/schema
- Implementation Guide: https://modelcontextprotocol.io/llms-full.txt

## Project Structure
```
├── src/
│   ├── index.ts          # Main MCP server
│   ├── database.ts       # Database connection management
│   ├── migration.ts      # Migration operations
│   └── backup.ts         # Backup and restore operations
├── dist/                 # Compiled JavaScript output
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project configuration
├── README.md             # Project documentation
└── Database-MCP-Server-Manual.md # Detailed manual
```

## Supported Databases
- **MySQL**: Full DDL/DML operations with InnoDB support
- **PostgreSQL**: Advanced features including JSONB and full-text search
- **SQLite**: Lightweight operations for development and testing

## Security Features
- SQL injection prevention with parameterized queries
- Connection encryption support
- Query validation and sanitization
- Backup encryption capabilities
- Access control and permissions

## Laravel Integration
- Compatible with Laravel migration format
- Supports Eloquent model generation
- Follows Laravel schema builder patterns
- Uses Laravel naming conventions

The project provides enterprise-grade database management capabilities through the MCP protocol, perfect for Laravel application development and maintenance.