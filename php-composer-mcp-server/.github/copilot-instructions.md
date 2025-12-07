<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# PHP Composer MCP Server Project

This project is a Model Context Protocol (MCP) server built with TypeScript for comprehensive PHP Composer package management and dependency handling.

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

This PHP Composer MCP Server provides:

### Tools Available
- `install-package` - Install PHP packages via Composer
- `update-package` - Update packages to latest versions
- `remove-package` - Remove packages and dependencies
- `require-package` - Add package to requirements
- `search-packages` - Search Packagist for packages
- `show-dependencies` - Display dependency tree
- `check-outdated` - Check for outdated packages
- `validate-composer` - Validate composer.json file
- `dump-autoload` - Regenerate autoloader files
- `optimize-autoloader` - Optimize for production
- `audit-security` - Check security vulnerabilities
- `check-platform-requirements` - Verify platform dependencies

### Resources
- `composer://docs/getting-started` - Composer basics and setup
- `composer://docs/version-constraints` - Semantic versioning guide
- `composer://docs/autoloading` - Autoloading configuration reference

### Build Commands
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with auto-reload
- `npm start` - Start the MCP server

### MCP Configuration
```json
{
  "servers": {
    "php-composer": {
      "type": "stdio",
      "command": "node", 
      "args": ["dist/index.js"]
    }
  }
}
```

### Environment Variables
```bash
# Composer Configuration
COMPOSER_EXECUTABLE_PATH=composer
PHP_EXECUTABLE_PATH=php
PROJECT_ROOT_PATH=/path/to/php/project

# Cache Settings
COMPOSER_CACHE_DIR=~/.composer/cache
COMPOSER_HOME=~/.composer

# Performance Settings
COMPOSER_MEMORY_LIMIT=2G
COMPOSER_PROCESS_TIMEOUT=600
```

## References
- MCP SDK Documentation: https://github.com/modelcontextprotocol
- Composer Documentation: https://getcomposer.org/doc/
- Packagist: https://packagist.org/
- Semantic Versioning: https://semver.org/
- Implementation Guide: https://modelcontextprotocol.io/llms-full.txt

## Project Structure
```
├── src/
│   ├── index.ts              # Main MCP server
│   ├── package-manager.ts    # Package installation/removal
│   ├── dependency-analyzer.ts # Dependency analysis
│   ├── autoload-manager.ts   # Autoload configuration
│   └── security-auditor.ts   # Security vulnerability checking
├── dist/                     # Compiled JavaScript output
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project configuration
├── README.md                 # Project documentation
└── PHP-Composer-MCP-Server-Manual.md # Detailed manual
```

## Key Composer Operations

### Package Management
- Installation with version constraints
- Dependency resolution and conflict detection
- Development vs production dependencies
- Package searching and information retrieval

### Version Constraints
```
^2.0    # Compatible with 2.0.0, but not 3.0.0
~2.1    # Compatible with 2.1.0, but not 2.2.0
>=2.0   # Any version 2.0.0 or higher
```

### Autoloading Strategies
- **PSR-4**: Modern namespace-to-directory mapping
- **PSR-0**: Legacy autoloading standard
- **Classmap**: Direct class-to-file mapping
- **Files**: Include specific files

## Security Features
- Vulnerability scanning with security advisory database
- Package integrity verification with checksums
- License compatibility checking
- Repository authenticity validation

## Performance Optimization
- Autoloader optimization levels
- Dependency caching strategies
- Platform package configuration
- Memory and timeout management

## Laravel Integration
- Laravel package management (Sanctum, Horizon, Telescope)
- Framework version updates and compatibility
- Service provider registration automation
- Laravel-specific package recommendations

## Common Package Categories
- **Authentication**: Laravel Sanctum, Passport
- **API Development**: Laravel Cors, API Resources
- **Development Tools**: Laravel Debugbar, Telescope
- **Testing**: Pest PHP, Mockery, PHPUnit
- **Utilities**: Spatie packages, Carbon, Intervention Image

Provides enterprise-grade PHP dependency management through MCP, making package operations seamless in AI-assisted development workflows.