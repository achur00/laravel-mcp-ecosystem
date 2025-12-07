# 🚀 Complete React + Tailwind CSS v4 Setup Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Step-by-Step Setup](#step-by-step-setup)
- [Problems Encountered & Solutions](#problems-encountered--solutions)
- [Configuration Files Explained](#configuration-files-explained)
- [Development Workflow](#development-workflow)
- [Optimized Prompt Directive](#optimized-prompt-directive)
- [Best Practices](#best-practices)
- [References & Further Reading](#references--further-reading)

---

## 🎯 Overview

This guide documents the complete setup process for React with Tailwind CSS v4, including all problems encountered during development and their solutions. This setup uses:

- **React 18** with Vite 7.2.6
- **Tailwind CSS v4.1.17** (latest version)
- **Node.js 24.11.1** (via Docker for compatibility)
- **PostCSS** with @tailwindcss/postcss plugin
- **@tailwindcss/forms** plugin for enhanced form styling

## ✅ Prerequisites

### System Requirements
- **Docker Desktop** (for Node.js version management)
- **Windows PowerShell 5.1+** or any terminal
- **VS Code** (recommended editor)

### Version Compatibility
- **Node.js**: ≥20.19.0 or ≥22.12.0 (required by Vite 7.2.6)
- **npm**: Latest version
- **Tailwind CSS**: v4.x (new CSS-first approach)

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css              # 🎨 Main CSS with Tailwind directives
├── dist/                      # Build output (generated)
├── node_modules/             # Dependencies (generated)
├── .gitignore
├── Dockerfile                # Docker configuration
├── eslint.config.js          # ESLint configuration
├── index.html               # Main HTML template
├── package.json             # Project dependencies
├── package-lock.json        # Lock file (generated)
├── postcss.config.js        # 🔧 PostCSS configuration
├── tailwind.config.js       # 🎨 Tailwind configuration
├── vite.config.js           # ⚡ Vite configuration
└── README.md
```

---

## 🔧 Step-by-Step Setup

### Step 1: Initial Project Setup

```bash
# Create React project with Vite
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### Step 2: Install Tailwind CSS v4 Dependencies

**⚠️ IMPORTANT: Use Docker for Node.js 24**

```powershell
# Navigate to frontend directory
Set-Location "path/to/your/frontend"

# Install Tailwind CSS v4 and required plugins
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/postcss
```

### Step 3: Configure PostCSS

Create `postcss.config.js`:

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Step 4: Configure Tailwind CSS v4

Create `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    '@tailwindcss/forms',
  ],
}
```

### Step 5: Setup CSS with v4 Syntax

Update `src/index.css`:

```css
@import "tailwindcss";

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@theme {
  --color-primary-50: #eef2ff;
  --color-primary-100: #e0e7ff;
  --color-primary-200: #c7d2fe;
  --color-primary-300: #a5b4fc;
  --color-primary-400: #818cf8;
  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
  --color-primary-700: #4338ca;
  --color-primary-800: #3730a3;
  --color-primary-900: #312e81;
  
  --shadow-auth: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  
  --animate-fade-in: fadeIn 0.5s ease-in-out;
  --animate-slide-up: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideUp {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@layer base {
  body {
    @apply bg-gray-50 text-gray-900 font-sans;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-secondary {
    @apply bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
  
  .form-input {
    @apply block w-full px-3 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200;
  }
  
  .card-elevated {
    @apply bg-white rounded-xl shadow-card border border-gray-100;
  }
  
  .gradient-bg {
    @apply bg-gradient-to-br from-primary-50 via-blue-50 to-indigo-100;
  }
}
```

### Step 6: Development Commands

```powershell
# Development server
docker run --rm -v "${PWD}:/app" -w /app -p 5173:5173 node:24-alpine npm run dev -- --host

# Build for production
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm run build

# Install new packages
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install package-name
```

---

## 🚨 Problems Encountered & Solutions

### Problem 1: Node.js Version Incompatibility

**Error:**
```
npm WARN EBADENGINE Unsupported engine {
  package: '@vitejs/plugin-react@5.1.1',
  required: { node: '^20.19.0 || >=22.12.0' },
  current: { node: 'v20.13.1', npm: '10.5.2' }
}
```

**Solution:**
Use Docker with Node.js 24 for all npm commands:
```bash
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install
```

**Explanation:** Newer Vite and React plugin versions require Node.js ≥20.19.0, but many systems have older versions.

---

### Problem 2: Docker Daemon Not Running

**Error:**
```
error during connect: this error may indicate that the docker daemon is not running: Post "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.24/images/create?fromImage=node&tag=24-alpine": open //./pipe/docker_engine: The system cannot find the file specified.
```

**Solution:**
1. Start Docker Desktop:
   ```powershell
   Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
   ```
2. Wait for Docker Desktop to fully initialize
3. Verify Docker is running:
   ```bash
   docker info
   ```

**Explanation:** Docker Desktop GUI must be running, not just the daemon process.

---

### Problem 3: PostCSS Plugin Configuration Error

**Error:**
```
[vite:css] [postcss] It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package
```

**Solution:**
1. Install the correct plugin:
   ```bash
   npm install -D @tailwindcss/postcss
   ```

2. Update `postcss.config.js`:
   ```javascript
   export default {
     plugins: {
       '@tailwindcss/postcss': {},  // ✅ Correct
       autoprefixer: {},
     },
   }
   ```

**Explanation:** Tailwind CSS v4 moved PostCSS integration to a separate package.

---

### Problem 4: Unknown Utility Class Error

**Error:**
```
Error: Cannot apply unknown utility class `bg-primary-600`
```

**Solution:**
Use the new `@theme` directive in CSS instead of config-based approach:

```css
@theme {
  --color-primary-600: #4f46e5;  /* Define colors here */
}
```

**Explanation:** Tailwind CSS v4 uses a CSS-first approach for custom properties.

---

### Problem 5: Invalid CSS Import Syntax

**Error:**
```
Error: Cannot apply unknown utility class `border-border`
```

**Solution:**
1. Update CSS import syntax:
   ```css
   @import "tailwindcss";  /* ✅ v4 syntax */
   ```

2. Remove invalid classes:
   ```css
   /* ❌ Remove this */
   * {
     @apply border-border;
   }
   ```

**Explanation:** Tailwind CSS v4 changed import syntax and some utility classes.

---

## 📝 Configuration Files Explained

### `package.json` Dependencies

```json
{
  "devDependencies": {
    "tailwindcss": "^4.1.17",           // Main Tailwind CSS package
    "@tailwindcss/forms": "^0.5.10",    // Form styling plugin
    "@tailwindcss/postcss": "^4.1.17",  // PostCSS integration
    "postcss": "^8.5.6",                // CSS processor
    "autoprefixer": "^10.4.22",         // CSS vendor prefixing
    "vite": "^7.2.6",                   // Build tool
    "@vitejs/plugin-react": "^5.1.1"    // React integration
  }
}
```

### `vite.config.js` Explained

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],                    // Enable React support
  server: {
    host: true,                          // Allow external connections
    port: 5173                           // Default Vite port
  }
})
```

### `tailwind.config.js` v4 Format

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                      // Scan HTML files
    "./src/**/*.{js,ts,jsx,tsx}",       // Scan all JS/React files
  ],
  plugins: [
    '@tailwindcss/forms',               // Form styling plugin
  ],
  // Note: theme config moved to CSS @theme directive
}
```

---

## 🔄 Development Workflow

### Daily Development

```powershell
# 1. Navigate to project
Set-Location "path/to/frontend"

# 2. Start development server
docker run --rm -v "${PWD}:/app" -w /app -p 5173:5173 node:24-alpine npm run dev -- --host

# 3. Open in browser: http://localhost:5173/
```

### Installing New Packages

```powershell
# Install production dependency
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install package-name

# Install development dependency
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install -D package-name
```

### Building for Production

```powershell
# Create production build
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm run build

# Preview production build
docker run --rm -v "${PWD}:/app" -w /app -p 4173:4173 node:24-alpine npm run preview
```

---

## 🎯 Optimized Prompt Directive

### For AI Assistants

```
PROMPT: Set up React with Tailwind CSS v4 for production-ready development

REQUIREMENTS:
1. Use React 18 + Vite 7.x
2. Use Tailwind CSS v4.x (latest version with @theme directive)
3. Use Docker with Node.js 24 for all npm commands
4. Include @tailwindcss/forms plugin
5. Set up custom color palette using CSS custom properties
6. Configure PostCSS with @tailwindcss/postcss plugin
7. Create reusable component classes in @layer components
8. Ensure full compatibility with modern build tools

CRITICAL REQUIREMENTS:
- NEVER use system Node.js if version < 20.19.0
- ALWAYS use @tailwindcss/postcss plugin for v4
- ALWAYS use @import "tailwindcss" syntax (not @tailwind directives)
- ALWAYS define custom colors in @theme directive
- ALWAYS test with Docker commands before system commands
- Include form styling, animations, and custom shadows
- Set up development server with --host flag for external access

EXPECTED OUTPUT:
- Complete file structure
- All configuration files with v4 syntax
- Docker-based development workflow
- Custom design system with primary colors
- Error-free build and development processes
```

### Quick Setup Command

```powershell
# One-command setup (run after creating Vite project)
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine sh -c "npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/postcss && npm run build"
```

---

## ✨ Best Practices

### 1. Version Management
- ✅ Always use Docker for Node.js version consistency
- ✅ Pin specific versions in package.json
- ✅ Use package-lock.json for reproducible builds

### 2. Tailwind CSS v4 Patterns
- ✅ Define custom properties in @theme directive
- ✅ Use @layer components for reusable classes
- ✅ Prefer CSS custom properties over config-based colors
- ✅ Use semantic naming for color scales (50-900)

### 3. Development Workflow
- ✅ Use --host flag for external access
- ✅ Test builds regularly during development
- ✅ Use component-based CSS organization
- ✅ Include proper TypeScript types if using TS

### 4. Performance Optimization
- ✅ Use purging with proper content paths
- ✅ Optimize custom properties for production
- ✅ Minimize CSS bundle size with layer organization
- ✅ Use CDN for Google Fonts or self-host

---

## 📚 References & Further Reading

### Official Documentation
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [Vite Configuration Guide](https://vitejs.dev/config/)
- [React Documentation](https://react.dev/)
- [PostCSS Plugin Documentation](https://postcss.org/)

### Tailwind CSS v4 Migration
- [@theme directive usage](https://tailwindcss.com/docs/v4-beta#theme-configuration)
- [CSS custom properties approach](https://tailwindcss.com/docs/v4-beta#css-variables)
- [Plugin system changes](https://tailwindcss.com/docs/v4-beta#plugins)

### Docker & Node.js
- [Docker Desktop for Windows](https://docs.docker.com/desktop/windows/)
- [Node.js version compatibility](https://nodejs.org/en/download/)
- [npm Docker workflows](https://docs.docker.com/language/nodejs/)

### Design System Resources
- [Tailwind UI Components](https://tailwindui.com/)
- [Headless UI for React](https://headlessui.com/)
- [Color palette generators](https://coolors.co/)

### Build Tools & Development
- [Vite plugin ecosystem](https://vitejs.dev/plugins/)
- [ESLint + Tailwind CSS](https://github.com/francoismassart/eslint-plugin-tailwindcss)
- [Prettier + Tailwind CSS](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

---

## 🎉 Conclusion

This guide provides a complete, production-ready setup for React with Tailwind CSS v4. The Docker-based approach ensures consistency across all development environments, while the v4 configuration uses the latest CSS-first approach for maximum flexibility and performance.

**Key Success Factors:**
1. ✅ Use Docker for Node.js version management
2. ✅ Follow v4 syntax for all configurations
3. ✅ Use @theme directive for custom properties
4. ✅ Test frequently during setup process
5. ✅ Keep dependencies up to date

For additional support or advanced configurations, refer to the official documentation links provided above.

---

*Last Updated: December 7, 2025*
*Tailwind CSS Version: v4.1.17*
*Node.js Version: v24.11.1*
*Vite Version: v7.2.6*