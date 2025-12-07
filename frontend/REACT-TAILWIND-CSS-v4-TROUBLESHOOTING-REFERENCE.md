# 🚀 React + Tailwind CSS v4 - Quick Reference & Troubleshooting

## 🎯 Optimized AI Prompt Directive

```
CONTEXT: Set up React with Tailwind CSS v4 for modern web development

REQUIREMENTS:
1. React 18 + Vite 7.x with TypeScript support
2. Tailwind CSS v4.x using @theme directive approach
3. Docker workflow with Node.js 24 for version compatibility
4. @tailwindcss/forms plugin for enhanced form styling
5. Custom design system with primary color palette
6. PostCSS configuration with @tailwindcss/postcss
7. Component-based CSS architecture with @layer directives
8. Hot reload development server with external access
9. Production-ready build configuration

CRITICAL CONSTRAINTS:
- MUST use Docker for Node.js if system version < 20.19.0
- MUST use @tailwindcss/postcss plugin (not direct tailwindcss)
- MUST use @import "tailwindcss" syntax (v4 requirement)
- MUST define custom colors in @theme directive (not config file)
- MUST include --host flag for development server
- MUST verify Docker Desktop is running before starting
- MUST use proper PowerShell syntax for Windows paths

EXPECTED DELIVERABLES:
✅ Complete project structure with all config files
✅ Custom design system with 50-900 color scales
✅ Docker-based development workflow commands
✅ Error handling for common Node.js version issues
✅ Reusable component classes (buttons, forms, cards)
✅ Production build optimization
✅ Documentation with troubleshooting guide

OUTPUT FORMAT: Provide step-by-step commands, complete file contents, and troubleshooting solutions for each potential error.
```

---

## ⚡ Quick Setup Commands

### Complete Setup (Copy & Paste)

```powershell
# 1. Create React project
npm create vite@latest my-app -- --template react
cd my-app

# 2. Install dependencies with Docker
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/postcss

# 3. Create config files (see full guide for file contents)
# - postcss.config.js
# - tailwind.config.js  
# - Update src/index.css

# 4. Start development
docker run --rm -v "${PWD}:/app" -w /app -p 5173:5173 node:24-alpine npm run dev -- --host
```

---

## 🚨 Emergency Troubleshooting

### Docker Issues
```powershell
# Check Docker status
docker --version
docker info

# Start Docker Desktop
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"

# Kill stuck containers
docker stop $(docker ps -q)
docker system prune -f
```

### Node.js Version Issues
```powershell
# Check system Node version
node --version

# Always use Docker for npm commands if < 20.19.0
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine node --version
```

### Tailwind CSS v4 Errors
```powershell
# Reinstall correct packages
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm uninstall tailwindcss
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install -D tailwindcss@latest @tailwindcss/postcss

# Verify installation
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm list tailwindcss
```

### Build Errors
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules, package-lock.json
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm install

# Test build
docker run --rm -v "${PWD}:/app" -w /app node:24-alpine npm run build
```

---

## 📁 Essential File Templates

### `postcss.config.js`
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: ['@tailwindcss/forms'],
}
```

### `src/index.css` (Essential Parts)
```css
@import "tailwindcss";

@theme {
  --color-primary-600: #4f46e5;
  --color-primary-700: #4338ca;
  /* Add more colors as needed */
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg;
  }
}
```

---

## 🔍 Verification Checklist

### ✅ Setup Complete When:
- [ ] Docker Desktop running successfully
- [ ] Node.js 24 accessible via Docker
- [ ] All Tailwind packages installed without warnings
- [ ] Development server starts without errors
- [ ] Custom colors (bg-primary-600) work in browser
- [ ] Build process completes successfully
- [ ] Hot reload works for CSS changes

### ⚠️ Common Warning Signs:
- EBADENGINE errors → Use Docker
- "unknown utility class" → Check @theme directive
- PostCSS plugin errors → Verify @tailwindcss/postcss
- Build failures → Check file paths and syntax

---

## 📞 Support Resources

### When Things Go Wrong:
1. **Check this guide first** - Most issues are documented here
2. **Verify Docker setup** - 90% of issues are Node.js version related
3. **Check official docs** - Tailwind CSS v4 is still evolving
4. **Clear and reinstall** - Sometimes the fastest solution

### Key Documentation Links:
- [Tailwind CSS v4 Beta Docs](https://tailwindcss.com/docs/v4-beta)
- [Vite Configuration](https://vitejs.dev/config/)
- [Docker Node.js Guide](https://docs.docker.com/language/nodejs/)

---

*Quick Reference Version 1.0 - December 7, 2025*