# PHP Composer MCP Server Manual

## Overview
The PHP Composer MCP Server provides comprehensive PHP package management and dependency handling capabilities through the Model Context Protocol. This server automates Composer operations, manages dependencies, handles version constraints, and optimizes PHP project configurations.

## Features
- ✅ Complete Composer package management
- ✅ Dependency resolution and conflict detection
- ✅ Semantic versioning and constraint management
- ✅ Autoloader optimization (PSR-4, classmap)
- ✅ Security vulnerability scanning
- ✅ Performance optimization for production
- ✅ Custom repository management

## Installation and Setup

### Prerequisites
- Node.js 18+
- PHP 8.1+ with required extensions
- Composer 2.4+ installed globally
- Git for version control
- PHP project with composer.json

### Installation Steps

1. **Install Dependencies**
```bash
cd php-composer-mcp-server
npm install
```

2. **Environment Configuration**
Create a `.env` file in the project root:
```env
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
COMPOSER_DISABLE_XDEBUG_WARN=true

# Repository Settings
PACKAGIST_URL=https://packagist.org
PRIVATE_REPO_TOKEN=your-private-repo-token

# Security Settings
AUDIT_ENABLED=true
AUDIT_FORMAT=json
MIN_STABILITY=stable
```

3. **Verify Composer Installation**
```bash
# Check Composer version
composer --version

# Verify configuration
composer config --list

# Check platform requirements
composer check-platform-reqs
```

4. **Build and Start**
```bash
npm run build
npm start
```

## API Reference

### Package Management

#### install-package
Install PHP package via Composer with specified constraints.

**Parameters:**
- `packageName` (string, required): Package name (e.g., 'monolog/monolog')
- `version` (string, optional): Version constraint (e.g., '^3.0')
- `dev` (boolean, optional): Install as development dependency
- `preferStable` (boolean, optional): Prefer stable releases
- `optimizeAutoloader` (boolean, optional): Optimize autoloader after install

**Example:**
```json
{
  "packageName": "laravel/sanctum",
  "version": "^3.0",
  "dev": false,
  "preferStable": true,
  "optimizeAutoloader": true
}
```

**Response:**
```json
{
  "success": true,
  "package": {
    "name": "laravel/sanctum",
    "version": "3.3.2",
    "description": "Laravel Sanctum provides API token authentication",
    "type": "library",
    "license": ["MIT"],
    "installedPath": "vendor/laravel/sanctum"
  },
  "dependencies": [
    "illuminate/contracts (^10.0)",
    "illuminate/database (^10.0)",
    "illuminate/http (^10.0)"
  ],
  "autoloadGenerated": true,
  "executionTime": "15.2s"
}
```

#### update-package
Update specific package or all packages to latest compatible versions.

**Parameters:**
- `packageName` (string, optional): Specific package to update (omit for all)
- `constraint` (string, optional): New version constraint
- `withDependencies` (boolean, optional): Update dependencies too
- `dryRun` (boolean, optional): Show what would be updated without executing

**Response:**
```json
{
  "success": true,
  "updated": [
    {
      "package": "symfony/console",
      "from": "6.3.0",
      "to": "6.3.8",
      "reason": "Security update"
    },
    {
      "package": "monolog/monolog", 
      "from": "3.4.0",
      "to": "3.5.0",
      "reason": "Feature update"
    }
  ],
  "unchanged": ["laravel/framework"],
  "warnings": [],
  "executionTime": "45.6s"
}
```

#### remove-package
Remove package and its dependencies from the project.

**Parameters:**
- `packageName` (string, required): Package name to remove
- `updateLock` (boolean, optional): Update composer.lock file
- `optimizeAutoloader` (boolean, optional): Optimize autoloader after removal

**Response:**
```json
{
  "success": true,
  "removed": {
    "package": "doctrine/dbal",
    "version": "3.7.2",
    "removedDependencies": [
      "doctrine/cache",
      "doctrine/event-manager"
    ]
  },
  "autoloadOptimized": true,
  "diskSpaceFreed": "15.2MB"
}
```

#### search-packages
Search Packagist for packages matching query.

**Parameters:**
- `query` (string, required): Search query
- `type` (string, optional): Package type filter
- `limit` (number, optional): Maximum results (default: 20)
- `tags` (array, optional): Filter by tags

**Response:**
```json
{
  "success": true,
  "query": "laravel authentication",
  "results": [
    {
      "name": "laravel/sanctum",
      "description": "Laravel Sanctum provides API token authentication",
      "downloads": 50000000,
      "favers": 2500,
      "repository": "https://github.com/laravel/sanctum",
      "versions": {
        "latest": "3.3.2",
        "stable": "3.3.2"
      }
    },
    {
      "name": "laravel/passport",
      "description": "Laravel Passport provides OAuth2 server support",
      "downloads": 25000000,
      "favers": 3200,
      "repository": "https://github.com/laravel/passport"
    }
  ],
  "total": 156
}
```

### Dependency Analysis

#### show-dependencies
Display project dependency tree with version information.

**Parameters:**
- `format` (string, optional): Output format ('tree', 'json', 'table')
- `depth` (number, optional): Maximum dependency depth
- `installed` (boolean, optional): Show only installed packages

**Response:**
```json
{
  "success": true,
  "rootPackage": {
    "name": "my-company/laravel-app",
    "version": "1.0.0",
    "type": "project"
  },
  "dependencies": {
    "laravel/framework": {
      "version": "10.32.1",
      "description": "The Laravel Framework",
      "dependencies": {
        "illuminate/auth": "^10.0",
        "illuminate/broadcasting": "^10.0",
        "illuminate/bus": "^10.0"
      }
    },
    "monolog/monolog": {
      "version": "3.5.0",
      "description": "Sends your logs to files, sockets, inboxes",
      "dependencies": {
        "psr/log": "^1.0.1 || ^2.0 || ^3.0"
      }
    }
  },
  "totalPackages": 245,
  "directDependencies": 15,
  "devDependencies": 8
}
```

#### check-outdated
Check for outdated packages and available updates.

**Parameters:**
- `direct` (boolean, optional): Check only direct dependencies
- `strict` (boolean, optional): Use strict version comparison
- `format` (string, optional): Output format

**Response:**
```json
{
  "success": true,
  "outdated": [
    {
      "package": "symfony/console",
      "currentVersion": "6.3.0",
      "latestVersion": "6.3.8",
      "updateType": "patch",
      "security": true,
      "changelog": "https://github.com/symfony/console/releases"
    },
    {
      "package": "phpunit/phpunit",
      "currentVersion": "10.4.0",
      "latestVersion": "10.5.0",
      "updateType": "minor",
      "security": false
    }
  ],
  "upToDate": ["laravel/framework", "monolog/monolog"],
  "securityUpdates": 1,
  "totalOutdated": 2
}
```

#### analyze-dependencies
Perform comprehensive dependency analysis including conflicts and suggestions.

**Response:**
```json
{
  "success": true,
  "analysis": {
    "summary": {
      "totalPackages": 245,
      "directDependencies": 15,
      "devDependencies": 8,
      "conflicts": 0,
      "duplicates": 2,
      "abandoned": 1
    },
    "conflicts": [],
    "duplicates": [
      {
        "package": "psr/log",
        "versions": ["1.1.4", "2.0.0"],
        "requiredBy": ["monolog/monolog", "laravel/framework"]
      }
    ],
    "abandoned": [
      {
        "package": "doctrine/dbal",
        "replacement": "doctrine/orm",
        "reason": "Package has been abandoned"
      }
    ],
    "suggestions": [
      {
        "package": "ext-redis",
        "reason": "Required for Redis cache functionality"
      }
    ]
  }
}
```

### Version Management

#### update-constraint
Update package version constraints in composer.json.

**Parameters:**
- `packageName` (string, required): Package to update
- `constraint` (string, required): New version constraint
- `updateLock` (boolean, optional): Update composer.lock

**Example:**
```json
{
  "packageName": "laravel/framework",
  "constraint": "^10.0",
  "updateLock": true
}
```

**Response:**
```json
{
  "success": true,
  "package": "laravel/framework",
  "oldConstraint": "^9.0",
  "newConstraint": "^10.0",
  "constraintType": "caret",
  "allowedVersions": [
    "10.0.0", "10.32.1", "10.99.99"
  ],
  "recommendedVersion": "10.32.1"
}
```

#### check-version-compatibility
Verify package version compatibility with project requirements.

**Parameters:**
- `packages` (array, required): Packages to check compatibility
- `phpVersion` (string, optional): Target PHP version

**Response:**
```json
{
  "success": true,
  "compatibility": {
    "php": {
      "required": "^8.1",
      "current": "8.2.12",
      "compatible": true
    },
    "packages": [
      {
        "name": "laravel/framework",
        "version": "10.32.1",
        "phpCompatible": true,
        "extensionRequirements": ["openssl", "pdo", "mbstring"],
        "conflicts": []
      }
    ]
  },
  "issues": [],
  "recommendations": [
    "Consider updating to PHP 8.3 for better performance"
  ]
}
```

### Autoloading Management

#### dump-autoload
Regenerate autoloader files with optimization options.

**Parameters:**
- `optimize` (boolean, optional): Generate optimized autoloader
- `classmap-authoritative` (boolean, optional): Use authoritative classmap
- `apcu` (boolean, optional): Enable APCu cache
- `dev` (boolean, optional): Include development autoload

**Response:**
```json
{
  "success": true,
  "autoload": {
    "generated": true,
    "optimized": true,
    "classmap": {
      "files": 2456,
      "classes": 3890,
      "size": "15.2MB"
    },
    "psr4": {
      "namespaces": 45,
      "directories": 67
    },
    "files": ["helpers/functions.php"]
  },
  "performanceImprovement": "35%",
  "generationTime": "2.1s"
}
```

#### configure-autoload
Configure PSR-4 autoloading in composer.json.

**Parameters:**
- `namespace` (string, required): Namespace to configure
- `directory` (string, required): Directory path
- `dev` (boolean, optional): Development autoload section

**Example:**
```json
{
  "namespace": "App\\Services\\",
  "directory": "app/Services/",
  "dev": false
}
```

**Response:**
```json
{
  "success": true,
  "autoload": {
    "psr-4": {
      "App\\": "app/",
      "App\\Services\\": "app/Services/",
      "Database\\Factories\\": "database/factories/",
      "Database\\Seeders\\": "database/seeders/"
    }
  },
  "autoloadGenerated": true
}
```

### Security & Quality

#### audit-security
Check for security vulnerabilities in dependencies.

**Parameters:**
- `format` (string, optional): Output format ('json', 'table')
- `locked` (boolean, optional): Check only locked versions

**Response:**
```json
{
  "success": true,
  "audit": {
    "advisories": [
      {
        "package": "symfony/http-kernel",
        "version": "5.4.15",
        "advisory": "CVE-2023-46735",
        "severity": "medium",
        "description": "Possible session fixation vulnerability",
        "solution": "Update to version 5.4.31 or higher",
        "reference": "https://symfony.com/cve-2023-46735"
      }
    ],
    "vulnerablePackages": 1,
    "totalAdvisories": 1,
    "riskLevel": "medium"
  },
  "recommendations": [
    "Update symfony/http-kernel to ^6.0 for latest security patches"
  ]
}
```

#### check-platform-requirements
Verify platform dependencies (PHP version, extensions).

**Response:**
```json
{
  "success": true,
  "platform": {
    "php": {
      "required": "^8.1",
      "current": "8.2.12",
      "compatible": true
    },
    "extensions": {
      "required": [
        "openssl", "pdo", "mbstring", "tokenizer", 
        "xml", "ctype", "json", "bcmath"
      ],
      "missing": [],
      "optional": [
        "redis", "imagick", "gd"
      ],
      "recommended": [
        "Install redis extension for better cache performance",
        "Install imagick extension for image processing"
      ]
    }
  }
}
```

#### validate-packages
Validate package integrity and composer.json syntax.

**Response:**
```json
{
  "success": true,
  "validation": {
    "composerJson": {
      "valid": true,
      "warnings": [
        "Package name should be lowercase"
      ],
      "errors": []
    },
    "lockFile": {
      "valid": true,
      "upToDate": true,
      "lastUpdate": "2025-12-07T10:30:00Z"
    },
    "packages": {
      "verified": 245,
      "corrupted": 0,
      "issues": []
    }
  }
}
```

### Repository Management

#### configure-repositories
Set up custom package repositories.

**Parameters:**
- `repositories` (array, required): Repository configurations
- `type` (string, required): Repository type ('composer', 'vcs', 'path')

**Example:**
```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://repo.packagist.com/my-org/",
      "name": "private-repo"
    },
    {
      "type": "vcs",
      "url": "https://github.com/my-org/private-package",
      "name": "private-vcs"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "repositories": {
    "configured": [
      {
        "name": "private-repo",
        "type": "composer",
        "url": "https://repo.packagist.com/my-org/",
        "priority": 100
      }
    ],
    "default": "packagist.org"
  },
  "packagesAvailable": 1250
}
```

### Project Management

#### init-composer-project
Initialize new Composer project with configuration.

**Parameters:**
- `projectName` (string, required): Project name
- `projectType` (string, required): Project type ('library', 'project')
- `namespace` (string, required): Root namespace
- `description` (string, optional): Project description
- `license` (string, optional): License type
- `minimumStability` (string, optional): Minimum stability

**Response:**
```json
{
  "success": true,
  "project": {
    "name": "my-company/awesome-package",
    "type": "library",
    "description": "An awesome PHP package",
    "license": "MIT",
    "autoload": {
      "psr-4": {
        "MyCompany\\AwesomePackage\\": "src/"
      }
    },
    "require": {
      "php": "^8.1"
    }
  },
  "files": [
    "composer.json",
    "src/.gitkeep",
    "tests/.gitkeep"
  ]
}
```

## Laravel Integration

### Laravel Package Management
```javascript
// Install Laravel-specific packages
const installLaravelPackages = async () => {
  const packages = [
    {name: 'laravel/sanctum', version: '^3.0'},
    {name: 'laravel/horizon', version: '^5.0'},
    {name: 'spatie/laravel-permission', version: '^5.0'}
  ];
  
  for (const pkg of packages) {
    await installPackage({
      packageName: pkg.name,
      version: pkg.version,
      optimizeAutoloader: true
    });
  }
  
  // Publish vendor assets
  await publishVendorAssets();
};

// Common Laravel packages
const commonLaravelPackages = {
  authentication: ['laravel/sanctum', 'laravel/passport'],
  api: ['laravel/cors', 'spatie/laravel-query-builder'],
  development: ['barryvdh/laravel-debugbar', 'laravel/telescope'],
  testing: ['pestphp/pest', 'pestphp/pest-plugin-laravel'],
  utilities: ['spatie/laravel-permission', 'intervention/image']
};
```

### Autoloader Configuration for Laravel
```javascript
// Configure Laravel autoloading
await configureAutoload({
  namespaces: {
    'App\\': 'app/',
    'Database\\Factories\\': 'database/factories/',
    'Database\\Seeders\\': 'database/seeders/'
  },
  classmap: ['database/migrations'],
  files: ['app/helpers.php']
});
```

## Performance Optimization

### Production Optimization
```javascript
const optimizeForProduction = async () => {
  // Remove development dependencies
  await installPackages({
    dev: false,
    noScripts: false
  });
  
  // Optimize autoloader
  await dumpAutoload({
    optimize: true,
    classmap-authoritative: true,
    apcu: true
  });
  
  // Clear cache
  await composerClearCache();
  
  return {
    sizeBefore: '250MB',
    sizeAfter: '180MB', 
    improvement: '28% reduction',
    autoloadPerformance: '60% faster'
  };
};
```

### Cache Management
```javascript
// Configure Composer cache
const optimizeCache = async () => {
  await setComposerConfig({
    'cache-dir': '/tmp/composer-cache',
    'cache-ttl': 86400,
    'cache-files-ttl': 86400
  });
  
  return await getCacheStatus();
};
```

## Dependency Strategies

### Version Constraint Best Practices
```javascript
// Semantic versioning examples
const versionConstraints = {
  exact: '1.2.3',           // Exact version
  caret: '^1.2.3',         // Compatible (>=1.2.3, <2.0.0)
  tilde: '~1.2.3',         // Patch level (>=1.2.3, <1.3.0)
  wildcard: '1.2.*',       // Wildcard patch
  range: '>=1.0,<2.0',     // Version range
  stability: '1.0@beta'     // Specific stability
};

// Constraint recommendations
const getConstraintRecommendation = (packageType) => {
  switch (packageType) {
    case 'framework':
      return '^'; // Allow minor updates
    case 'security':
      return '~'; // Patch updates only
    case 'development':
      return '*'; // Latest version
    default:
      return '^'; // Default caret constraint
  }
};
```

### Dependency Resolution
```javascript
// Resolve dependency conflicts
const resolveDependencyConflict = async (conflict) => {
  const strategies = {
    updateConstraints: async () => {
      // Update version constraints to resolve conflict
      await updateConstraint({
        packageName: conflict.package,
        constraint: conflict.suggestedConstraint
      });
    },
    
    useAlternativePackage: async () => {
      // Replace with compatible alternative
      await removePackage({packageName: conflict.package});
      await installPackage({
        packageName: conflict.alternative,
        version: conflict.alternativeVersion
      });
    },
    
    forkAndPatch: async () => {
      // Fork package and apply patches
      await addRepository({
        type: 'vcs',
        url: conflict.forkedRepository
      });
    }
  };
  
  return await strategies[conflict.resolution]();
};
```

## Security Best Practices

### Security Audit Workflow
```javascript
const securityWorkflow = async () => {
  // 1. Audit current dependencies
  const audit = await auditSecurity();
  
  // 2. Update vulnerable packages
  for (const advisory of audit.advisories) {
    if (advisory.severity === 'high' || advisory.severity === 'critical') {
      await updatePackage({
        packageName: advisory.package,
        constraint: advisory.fixedIn
      });
    }
  }
  
  // 3. Validate updates
  await validatePackages();
  
  // 4. Generate security report
  return await generateSecurityReport();
};
```

### Package Verification
```javascript
// Verify package authenticity
const verifyPackages = async () => {
  const verification = {
    checksums: await verifyChecksums(),
    signatures: await verifySignatures(),
    sources: await verifyPackageSources()
  };
  
  return verification;
};
```

## Error Handling & Troubleshooting

### Common Error Scenarios

**Dependency Conflict:**
```json
{
  "success": false,
  "error": "DEPENDENCY_CONFLICT",
  "message": "Your requirements could not be resolved to an installable set of packages",
  "details": {
    "conflicts": [
      {
        "package1": "laravel/framework ^10.0",
        "package2": "symfony/console ^5.0",
        "reason": "laravel/framework requires symfony/console ^6.0"
      }
    ]
  },
  "solutions": [
    "Update symfony/console to ^6.0",
    "Downgrade laravel/framework to ^9.0"
  ]
}
```

**Memory Limit Exceeded:**
```json
{
  "success": false,
  "error": "MEMORY_LIMIT_EXCEEDED",
  "message": "Composer ran out of memory",
  "details": {
    "currentLimit": "256MB",
    "recommendedLimit": "2GB"
  },
  "solution": "Increase COMPOSER_MEMORY_LIMIT to 2G"
}
```

**Package Not Found:**
```json
{
  "success": false,
  "error": "PACKAGE_NOT_FOUND",
  "message": "Package 'vendor/package' not found",
  "details": {
    "packageName": "vendor/package",
    "repositories": ["packagist.org"],
    "suggestions": ["vendor/similar-package"]
  }
}
```

### Troubleshooting Tools
```javascript
// Diagnose Composer issues
const diagnoseIssues = async () => {
  return {
    composerVersion: await getComposerVersion(),
    phpVersion: await getPhpVersion(),
    memoryLimit: await getMemoryLimit(),
    extensions: await getLoadedExtensions(),
    permissions: await checkPermissions(),
    connectivity: await testConnectivity()
  };
};

// Clear all Composer caches
const clearAllCaches = async () => {
  await composerClearCache();
  await clearAutoloadCache();
  await clearPackageCache();
};
```

This manual provides comprehensive guidance for PHP package management through Composer via the MCP protocol, enabling sophisticated dependency management in Laravel and other PHP applications.