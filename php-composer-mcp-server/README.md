# PHP Composer MCP Server

A Model Context Protocol (MCP) server that provides comprehensive PHP Composer package management and dependency handling capabilities.

## Features

- **Package Management**: Install, update, and remove PHP packages
- **Dependency Resolution**: Analyze and resolve package dependencies
- **Version Management**: Handle semantic versioning and constraints
- **Autoload Management**: Configure PSR-4 and classmap autoloading
- **Security Analysis**: Check for package vulnerabilities
- **Performance Optimization**: Optimize composer.json and autoloader
- **Repository Management**: Manage custom package repositories

## Available Tools

### Package Operations
- `install-package` - Install PHP package via Composer
- `update-package` - Update specific package to latest version
- `remove-package` - Remove package from project
- `require-package` - Add package to composer.json requirements
- `require-dev-package` - Add package to dev dependencies
- `search-packages` - Search Packagist for packages

### Dependency Management
- `show-dependencies` - Display all project dependencies
- `check-outdated` - Check for outdated packages
- `validate-composer` - Validate composer.json file
- `show-package-info` - Get detailed package information
- `analyze-dependencies` - Analyze dependency tree
- `check-conflicts` - Detect package conflicts

### Version & Constraint Management
- `update-constraint` - Update package version constraints
- `check-version-compatibility` - Verify version compatibility
- `suggest-constraints` - Suggest optimal version constraints
- `lock-dependencies` - Create/update composer.lock
- `show-installed-versions` - List all installed package versions

### Autoloading
- `dump-autoload` - Regenerate autoloader files
- `optimize-autoloader` - Optimize autoloader for production
- `configure-autoload` - Set up PSR-4 autoloading
- `validate-autoload` - Verify autoload configuration
- `generate-classmap` - Generate classmap for faster loading

### Security & Quality
- `audit-security` - Check for security vulnerabilities
- `check-platform-requirements` - Verify platform dependencies
- `validate-packages` - Validate package integrity
- `analyze-licenses` - Check package licenses
- `check-abandoned-packages` - Find abandoned packages

### Project Management
- `init-composer-project` - Initialize new Composer project
- `create-package` - Create new PHP package structure
- `configure-repositories` - Set up custom repositories
- `manage-scripts` - Configure Composer scripts
- `set-minimum-stability` - Configure stability requirements

### Performance & Optimization
- `optimize-for-production` - Optimize for production deployment
- `configure-caching` - Set up Composer caching
- `analyze-performance` - Analyze dependency loading performance
- `minimize-dependencies` - Remove unused dependencies
- `configure-platform` - Set platform package versions

## Resources

- `composer://docs/getting-started` - Composer basics and setup guide
- `composer://docs/version-constraints` - Semantic versioning guide
- `composer://docs/autoloading` - Autoloading configuration reference

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Configure Composer settings:
```bash
# Composer Configuration
COMPOSER_EXECUTABLE_PATH=composer
PHP_EXECUTABLE_PATH=php
PROJECT_ROOT_PATH=/path/to/your/php/project

# Cache Settings
COMPOSER_CACHE_DIR=~/.composer/cache
COMPOSER_HOME=~/.composer

# Performance Settings
COMPOSER_MEMORY_LIMIT=2G
COMPOSER_PROCESS_TIMEOUT=600
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

## Composer Command Support

### Package Installation Commands
- `composer install` - Install dependencies from lock file
- `composer require` - Add new package dependency
- `composer require --dev` - Add development dependency
- `composer update` - Update all dependencies
- `composer remove` - Remove package and dependencies

### Information Commands
- `composer show` - List installed packages
- `composer show <package>` - Show package details
- `composer outdated` - Show outdated packages
- `composer depends` - Show package dependencies
- `composer prohibits` - Show what prevents installation

### Autoload Commands
- `composer dump-autoload` - Regenerate autoloader
- `composer dump-autoload --optimize` - Optimize for production
- `composer dump-autoload --classmap-authoritative` - Use only classmap

### Validation Commands
- `composer validate` - Validate composer.json
- `composer audit` - Check for security vulnerabilities
- `composer check-platform-reqs` - Verify platform requirements

## Package Management Features

### Version Constraint Handling
```json
{
  "require": {
    "monolog/monolog": "^3.0",
    "symfony/console": "~6.0",
    "laravel/framework": "^10.0"
  }
}
```

### Development vs Production Dependencies
- **require**: Production dependencies
- **require-dev**: Development-only dependencies
- **suggest**: Optional packages that enhance functionality

### Autoloading Configuration
```json
{
  "autoload": {
    "psr-4": {
      "App\\": "src/",
      "Database\\": "database/"
    },
    "classmap": ["database/migrations"],
    "files": ["helpers/functions.php"]
  }
}
```

## Security Features

### Vulnerability Scanning
- Integration with security advisory databases
- Automated security audit reports
- Notification of package vulnerabilities
- Recommendations for secure alternatives

### Package Verification
- Checksum verification for packages
- Digital signature validation
- Repository integrity checks
- License compatibility verification

## Performance Optimization

### Autoloader Optimization
- **Level 1**: Basic optimization with `--optimize`
- **Level 2**: Authoritative classmap with `--classmap-authoritative`
- **Level 3**: APCu cache with `--apcu-autoloader`

### Dependency Management
- Remove unused dependencies
- Optimize version constraints
- Use specific versions for stability
- Configure platform packages

## Laravel Integration

Perfect for Laravel development:
- Laravel package management
- Framework version updates
- Laravel-specific packages (Sanctum, Horizon, etc.)
- Custom package development
- Service provider registration

### Common Laravel Packages
- **Authentication**: laravel/sanctum, laravel/passport
- **API**: laravel/horizon, barryvdh/laravel-cors
- **Development**: barryvdh/laravel-debugbar, laravel/telescope
- **Testing**: pestphp/pest, mockery/mockery
- **Utilities**: spatie/laravel-permission, intervention/image

## Repository Management

### Private Repositories
```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://repo.packagist.com/your-org/"
    },
    {
      "type": "vcs",
      "url": "https://github.com/your-org/private-package"
    }
  ]
}
```

### Custom Package Sources
- Private Packagist repositories
- GitHub/GitLab private repositories
- SVN repositories
- Local path repositories

## Script Management

### Pre/Post Hooks
```json
{
  "scripts": {
    "pre-install-cmd": ["php artisan down"],
    "post-install-cmd": ["php artisan up"],
    "post-update-cmd": ["php artisan optimize"]
  }
}
```

## Usage with Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "php-composer": {
      "command": "node",
      "args": ["path/to/php-composer-mcp-server/dist/index.js"]
    }
  }
}
```

## Common Workflows

### 1. New Laravel Project Setup
```
1. Initialize Composer project
2. Install Laravel framework
3. Add common Laravel packages
4. Configure autoloading
5. Optimize for development
```

### 2. Package Development
```
1. Create package structure
2. Configure autoloading
3. Add development dependencies
4. Set up testing framework
5. Configure CI/CD scripts
```

### 3. Production Deployment
```
1. Optimize autoloader
2. Remove dev dependencies
3. Audit security vulnerabilities
4. Lock dependency versions
5. Configure production optimizations
```

This server provides complete Composer functionality through MCP, making PHP dependency management seamless in AI-assisted development workflows.