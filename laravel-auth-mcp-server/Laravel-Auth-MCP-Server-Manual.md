# Laravel Authentication MCP Server Manual

## Overview
The Laravel Authentication MCP Server provides comprehensive user authentication and authorization capabilities for Laravel applications through the Model Context Protocol. This server handles user registration, login, JWT token management, and role-based access control.

## Features
- ✅ User registration with validation
- ✅ User authentication and login
- ✅ JWT token generation and validation
- ✅ Password hashing (bcrypt compatible with Laravel)
- ✅ Role-based access control (RBAC)
- ✅ User profile management
- ✅ Session management
- ✅ Security features (rate limiting, input validation)

## Installation and Setup

### Prerequisites
- Node.js 18+ 
- PHP 8.2+
- MySQL/PostgreSQL/SQLite database
- Laravel application

### Installation Steps

1. **Install Dependencies**
```bash
cd laravel-auth-mcp-server
npm install
```

2. **Environment Configuration**
Create a `.env` file in the project root:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name  # e.g., arkuzcreo for existing Laravel projects
DB_USERNAME=root
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES_IN=24h

# Laravel Configuration
LARAVEL_APP_PATH=C:\path\to\your\laravel\app
```

**Important Notes:**
- The server automatically loads environment variables from `.env` file
- Ensure the `DB_DATABASE` matches your actual database name
- For XAMPP users, typically `DB_PASSWORD` is empty
- Use forward slashes or double backslashes in Windows paths

3. **Database Setup**
Ensure your database has a users table with the following structure:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

4. **Build and Start**
```bash
npm run build
npm start
```

## API Reference

### Authentication Tools

#### register-user
Register a new user account with email and password.

**Parameters:**
- `name` (string, required): Full name of the user
- `email` (string, required): Valid email address
- `password` (string, required): Password (minimum 8 characters)
- `role` (string, optional): User role (default: 'user')

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "created_at": "2025-12-07T10:30:00Z",
    "updated_at": "2025-12-07T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "User registered successfully"
}
```

#### authenticate-user
Authenticate user login credentials.

**Parameters:**
- `email` (string, required): User email address
- `password` (string, required): User password

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Authentication successful"
}
```

### User Management Tools

#### update-user-profile
Update user profile information.

**Parameters:**
- `userId` (number, required): User ID to update
- `name` (string, optional): Updated name
- `email` (string, optional): Updated email address
- `password` (string, optional): New password (will be hashed)

#### get-user-profile
Retrieve user profile by ID.

**Parameters:**
- `userId` (number, required): User ID to retrieve

### Token Management Tools

#### generate-jwt-token
Generate JWT authentication token for user.

**Parameters:**
- `userId` (number, required): User ID for token generation
- `expiresIn` (string, optional): Token expiration (default: '24h')

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### validate-jwt-token
Validate JWT token and return user information.

**Parameters:**
- `token` (string, required): JWT token to validate

**Response:**
```json
{
  "valid": true,
  "payload": {
    "userId": 1,
    "iat": 1701942600
  },
  "message": "Token is valid"
}
```

### Security Tools

#### hash-password
Generate secure password hash using bcrypt.

**Parameters:**
- `password` (string, required): Plain text password to hash

**Response:**
```json
{
  "hash": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewSWFOIK1DV6F5Y2"
}
```

#### verify-password
Verify password against bcrypt hash.

**Parameters:**
- `password` (string, required): Plain text password
- `hash` (string, required): Bcrypt hash to verify against

**Response:**
```json
{
  "valid": true
}
```

### Role Management Tools

#### assign-user-role
Assign role to user for role-based access control.

**Parameters:**
- `userId` (number, required): User ID
- `role` (string, required): Role name to assign

**Common Roles:**
- `admin`: Full system access
- `moderator`: Limited administrative access
- `user`: Standard user access
- `guest`: Read-only access

## Laravel Integration

### Laravel Sanctum Integration

1. **Install Laravel Sanctum**
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

2. **Add Sanctum Middleware**
In `app/Http/Kernel.php`:
```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

3. **Configure Authentication**
In `config/auth.php`:
```php
'guards' => [
    'api' => [
        'driver' => 'sanctum',
        'provider' => 'users',
    ],
],
```

### Using with Laravel Routes
```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
```

## Security Best Practices

### Password Security
- Minimum 8 characters required
- Uses bcrypt hashing with salt rounds = 12
- Compatible with Laravel's Hash facade
- Prevents timing attacks during verification

### JWT Security
- Use strong, random secret keys (minimum 32 characters)
- Set appropriate expiration times
- Implement token refresh mechanism
- Store tokens securely on client side

### Database Security
- Uses parameterized queries to prevent SQL injection
- Input validation with Zod schemas
- Password fields excluded from responses
- Proper error handling without information leakage

### Rate Limiting
Implement rate limiting for authentication endpoints:
```php
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});
```

## Error Handling

### Common Error Responses

**Invalid Credentials:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Validation Error:**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

**Token Error:**
```json
{
  "valid": false,
  "message": "Token has expired"
}
```

## Performance Considerations

### Database Optimization
- Index on email column for faster lookups
- Connection pooling for multiple requests
- Prepared statements for security and performance

### Caching Strategies
- Cache user roles and permissions
- Implement session caching
- Use Redis for token blacklisting

## Testing

### Unit Tests
Create test cases for:
- User registration validation
- Password hashing and verification
- JWT token generation and validation
- Role assignment and checking

### Integration Tests
- Database connection and operations
- Laravel authentication flow
- API endpoint responses

## Monitoring and Logging

### Security Events to Log
- Failed login attempts
- Password changes
- Role modifications
- Token generation and validation

### Performance Metrics
- Authentication response times
- Database query performance
- Token validation speed

## Troubleshooting

### Common Issues

#### Error: "Unknown database" (ER_BAD_DB_ERROR, errno: 1049)
**Symptoms**: Server fails to start with database connection error
**Causes**:
- Database specified in `DB_DATABASE` doesn't exist
- Environment variables not loading properly
- MySQL/Database server not running

**Solutions**:
1. **Verify database exists**:
   ```bash
   # For XAMPP users
   C:\xampp\mysql\bin\mysql.exe -u root -e "SHOW DATABASES;"
   
   # For standard MySQL
   mysql -u root -p -e "SHOW DATABASES;"
   ```

2. **Check .env configuration**:
   - Ensure `DB_DATABASE` matches your actual database name
   - For existing Laravel projects, use your project's database name
   - Verify other database credentials are correct

3. **Verify MySQL is running**:
   ```bash
   netstat -an | findstr :3306  # Windows
   netstat -an | grep :3306     # Linux/Mac
   ```

#### Error: "Cannot find module" or TypeScript compilation errors
**Symptoms**: Build failures or import errors
**Solutions**:
```bash
# Clean install
rm -rf node_modules dist
npm install
npm run build

# For TypeScript errors
npm install --save-dev @types/node typescript
```

#### Environment Variables Not Loading
**Symptoms**: Server uses default values instead of .env values
**Solution**: The server now automatically loads .env files. Ensure:
- `.env` file is in the project root directory
- File contains valid KEY=value pairs
- No syntax errors in the .env file

#### JWT Token Issues
**Solutions**:
- Verify JWT_SECRET is at least 32 characters long
- Check token expiration time (JWT_EXPIRES_IN)
- Ensure proper token format in Authorization header

### Development Tips

**Enable Debug Logging**:
```bash
NODE_ENV=development npm start
```

**Test Database Connection**:
```bash
# Test with a simple connection
node -e "
const mysql = require('mysql2/promise');
mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_db_name'
}).then(() => console.log('✅ Database connection successful'))
  .catch(err => console.error('❌ Database connection failed:', err));
"
```

### Recent Fixes Applied

#### Version 1.0.1 Updates
- ✅ **Added automatic .env loading**: Server now loads environment variables automatically
- ✅ **Fixed database connection timing**: Implemented lazy initialization to prevent premature connection attempts
- ✅ **Fixed JWT type errors**: Resolved TypeScript compilation issues with JWT signing
- ✅ **Enhanced error handling**: Better error messages for database connection issues
- ✅ **Improved documentation**: Added troubleshooting guide and setup instructions

#### Technical Implementation Details

**Database Lazy Initialization**:
The `DatabaseService` constructor was modified to prevent immediate database connection attempts:
```typescript
// Previous implementation (caused timing issues)
constructor() {
    this.initializeConnection(); // Executed before env vars loaded
}

// Current implementation (lazy initialization)
constructor() {
    // Connection established when first database operation is needed
}
```

This ensures environment variables are fully loaded before any database operations occur.

#### Dependencies Added
- `dotenv`: For automatic environment variable loading
- Enhanced TypeScript support for JWT operations

**Password Verification Failed**
- Confirm bcrypt compatibility
- Check salt rounds configuration
- Verify password encoding

## Recent Updates and Fixes

### December 7, 2025 - bcrypt Import and ES Module Fix

**Issue**: `bcrypt.hash is not a function` error when registering users.

**Root Cause**: Incorrect bcrypt import syntax for ES modules and potential caching issues in VS Code MCP server.

**Solutions Attempted**:
1. Updated import from `import * as bcrypt from 'bcryptjs'` to `import bcrypt from 'bcryptjs'`
2. Changed to named imports: `import { hash, compare } from 'bcryptjs'`
3. Updated function calls to use named imports directly

**Current Status**: Issue may require VS Code MCP server restart to clear cache.

**Workaround**: 
- Temporarily modify VS Code MCP configuration to force server restart
- Ensure all bcrypt calls use the named import functions
- Consider using Node.js crypto module as alternative

**Files Modified**:
- `src/auth.ts` - Updated bcrypt imports and function calls
- Fixed `hashPassword()` and `verifyPassword()` methods

**Note**: This fix is part of making the complete MCP ecosystem work seamlessly together.

This manual provides comprehensive guidance for implementing and maintaining the Laravel Authentication MCP Server in production environments.