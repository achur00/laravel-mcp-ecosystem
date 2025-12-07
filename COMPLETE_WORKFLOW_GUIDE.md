# Complete Laravel MCP Ecosystem Workflow Guide

This guide documents the exact workflow for setting up and using the complete Laravel MCP ecosystem with all servers working together.

## Prerequisites
- XAMPP with MySQL running on port 3306
- Node.js and npm installed
- PHP and Composer installed
- VS Code with MCP extension

## 1. MCP Server Setup and Configuration

### 1.1 Laravel Artisan MCP Server
**Purpose**: Create Laravel projects and run Artisan commands
**Location**: `laravel-artisan-mcp-server/`

```bash
cd laravel-artisan-mcp-server
npm install
npm run build
```

**Key Commands**:
- `mcp_laravel-artis_set_laravel_project` - Set project path
- `mcp_laravel-artis_make_controller` - Generate controllers
- `mcp_laravel-artis_make_model` - Generate models
- `mcp_laravel-artis_artisan_command` - Run any Artisan command

### 1.2 PHP Composer MCP Server
**Purpose**: Manage PHP dependencies and packages
**Location**: `php-composer-mcp-server/`

```bash
cd php-composer-mcp-server
npm install
npm run build
```

**Key Commands**:
- `mcp_php-composer_set_project_path` - Set project path
- `mcp_php-composer_composer_install` - Install dependencies
- `mcp_php-composer_composer_require` - Add packages
- `mcp_php-composer_composer_update` - Update dependencies

### 1.3 Database MCP Server
**Purpose**: Connect to databases and execute SQL queries
**Location**: `database-mcp-server/`

```bash
cd database-mcp-server
npm install
npm run build
```

**Key Commands**:
- `mcp_database_connect_database` - Connect to database
- `mcp_database_execute_query` - Execute SQL queries

### 1.4 Laravel Auth MCP Server
**Purpose**: Handle user authentication, registration, and JWT tokens
**Location**: `laravel-auth-mcp-server/`

**Setup**:
```bash
cd laravel-auth-mcp-server
npm install
# Create .env file with database configuration
echo "DB_HOST=localhost" > .env
echo "DB_PORT=3306" >> .env
echo "DB_USERNAME=root" >> .env
echo "DB_PASSWORD=" >> .env
echo "DB_DATABASE=auth_app_test" >> .env
echo "JWT_SECRET=your-256-bit-secret" >> .env
npm run build
```

**Key Commands**:
- `mcp_laravel-auth_register-user` - Register new users
- `mcp_laravel-auth_authenticate-user` - Login users
- `mcp_laravel-auth_generate-jwt-token` - Generate JWT tokens
- `mcp_laravel-auth_get-user-profile` - Get user details
- `mcp_laravel-auth_hash-password` - Hash passwords
- `mcp_laravel-auth_verify-password` - Verify passwords

## 2. VS Code MCP Configuration

Create `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "laravel-artisan": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "laravel-artisan-mcp-server"
    },
    "php-composer": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "php-composer-mcp-server"
    },
    "database": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "database-mcp-server"
    },
    "laravel-auth": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "laravel-auth-mcp-server"
    }
  }
}
```

## 3. Complete Laravel Authentication Project Workflow

### Phase 1: Project Creation
```bash
# 1. Create new Laravel project using Artisan MCP Server
mcp_laravel-artis_artisan_command:
  project: "main"
  command: "create-project"
  arguments: ["laravel/laravel", "auth-app"]

# 2. Set up Composer project
mcp_php-composer_set_project_path:
  name: "auth-app"
  path: "C:/path/to/workspace/apps/auth-app"
```

### Phase 2: Package Installation
```bash
# 1. Install Laravel Sanctum for API authentication
mcp_php-composer_composer_require:
  project: "auth-app"
  package: "laravel/sanctum"

# 2. Install Laravel UI for authentication scaffolding
mcp_php-composer_composer_require:
  project: "auth-app"
  package: "laravel/ui"
```

### Phase 3: Database Setup
```bash
# 1. Connect to MySQL database
mcp_database_connect_database:
  name: "auth_app_test"
  type: "mysql"
  host: "localhost"
  port: 3306
  username: "root"
  password: ""
  database: "auth_app_test"

# 2. Create database if not exists
mcp_database_execute_query:
  connection: "auth_app_test"
  query: "CREATE DATABASE IF NOT EXISTS auth_app_test"

# 3. Update Laravel .env file with database settings
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=auth_app_test
DB_USERNAME=root
DB_PASSWORD=
```

### Phase 4: Laravel Configuration
```bash
# 1. Generate application key
php artisan key:generate

# 2. Run database migrations
php artisan migrate

# 3. Publish Sanctum migrations
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### Phase 5: Authentication Testing
```bash
# 1. Register a new user (without role - Laravel default)
mcp_laravel-auth_register-user:
  name: "John Doe"
  email: "john@example.com"
  password: "password123"

# 2. Authenticate user
mcp_laravel-auth_authenticate-user:
  email: "john@example.com"
  password: "password123"

# 3. Generate JWT token
mcp_laravel-auth_generate-jwt-token:
  userId: 1

# 4. Get user profile
mcp_laravel-auth_get-user-profile:
  userId: 1
```

## 4. Common Issues and Solutions

### Issue 1: Database Connection Errors
**Problem**: `ER_BAD_DB_ERROR` when starting Laravel Auth MCP Server
**Solution**: Ensure .env file is in the correct directory and MCP server runs from that directory

### Issue 2: Missing Vendor Dependencies
**Problem**: `autoload.php not found` errors
**Solution**: Run `composer install` in the Laravel project directory

### Issue 3: Role Column Missing
**Problem**: `Unknown column 'role'` error
**Solution**: Laravel's default users table doesn't have a role column. Either:
- Remove role parameter from registration
- Create migration to add role column
- Use Laravel packages like Spatie Permission

### Issue 4: JWT Token Issues
**Problem**: JWT token generation fails
**Solution**: Ensure JWT_SECRET is set in Laravel Auth MCP Server .env file

## 5. Environment Variables

### Laravel Auth MCP Server (.env)
```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=auth_app_test
JWT_SECRET=your-super-secret-jwt-key-here-must-be-256-bits
```

### Laravel Application (.env)
```
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:generated-key-here
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=auth_app_test
DB_USERNAME=root
DB_PASSWORD=
```

## 6. Success Criteria - FINAL RESULTS ✅

**ALL OBJECTIVES ACHIEVED!**

1. ✅ Create Laravel projects via MCP (auth-app created successfully)
2. ✅ Install packages via MCP (Sanctum and UI installed)
3. ✅ Connect to database via MCP (auth_app_test database connected)
4. ✅ Execute SQL queries via MCP (database operations working)
5. ✅ Create migrations via MCP (add_role_to_users_table migration created)
6. ✅ Run migrations via MCP (role column added successfully)
7. ✅ Register users via MCP (User ID: 5 created: unique789@example.com)
8. ✅ Authenticate users via MCP (admin@authapp.com login successful)
9. ✅ Generate JWT tokens via MCP (Multiple tokens generated successfully)
10. ✅ Manage user profiles via MCP (Profile retrieval working)
11. ✅ Password hashing/verification via MCP (bcrypt working perfectly)
12. ✅ JWT token validation via MCP (Token verification working)

## 7. Final Authentication Test Results

**Test Admin User**:
- 👤 **User ID**: 1
- 📧 **Email**: admin@authapp.com
- 👥 **Role**: admin
- 🔐 **Authentication**: ✅ Successful
- 🎟️ **JWT Token**: ✅ Generated & Validated
- 📋 **Profile**: ✅ Retrieved Successfully

**Latest JWT Token**: 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2NTEwNDE4MCwiZXhwIjoxNzY1MTkwNTgwfQ.fGVmmfdxi-st4sVfCozNOjot8q02rVxf012MEEoYhq8
```

**Password Hash Test**:
- ✅ Hash Generation: Working
- ✅ Password Verification: Working
- ✅ bcrypt Compatibility: Confirmed

## 8. Complete MCP Ecosystem Status

**All 4 MCP Servers Fully Operational**:
- ✅ **Laravel Artisan MCP Server**: Command execution fixed, real operations
- ✅ **PHP Composer MCP Server**: Package management working
- ✅ **Database MCP Server**: MySQL operations successful  
- ✅ **Laravel Auth MCP Server**: Full authentication flow operational

**Major Technical Fixes Implemented**:
1. **Laravel Artisan Server**: Fixed command simulation → real execution
2. **Laravel Auth Server**: Fixed ES module imports for bcryptjs & jsonwebtoken
3. **Database Configuration**: Proper environment variable loading
4. **Migration System**: Role column successfully added

**Development Workflow Proven**: 
Complete Laravel application with authentication built entirely through MCP servers!

## 7. Next Steps

After basic authentication is working:
- Add role-based access control
- Implement API endpoints
- Set up frontend authentication
- Configure email verification
- Add password reset functionality
- Implement user permissions system

---
**Note**: This workflow was tested and verified on December 7, 2025, with all MCP servers working together in a complete Laravel authentication ecosystem.