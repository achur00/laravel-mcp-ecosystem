<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Hosting Management MCP Server Project

This project is a Model Context Protocol (MCP) server built with TypeScript for comprehensive domain and hosting subscription management.

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

This Hosting Management MCP Server provides:

### Tools Available
- `register-domain` - Register new domain names
- `check-domain-availability` - Check domain availability
- `get-domain-info` - Get detailed domain information
- `renew-domain` - Renew domain subscriptions
- `create-dns-record` - Add DNS records (A, CNAME, MX, TXT)
- `update-dns-record` - Modify existing DNS records
- `list-ssl-certificates` - Manage SSL certificates
- `generate-ssl-certificate` - Create new SSL certificates
- `create-hosting-subscription` - Add hosting subscriptions
- `get-subscription-usage` - Monitor resource usage
- `setup-domain-monitoring` - Monitor domain expiration
- `get-renewal-dates` - Check renewal schedules

### Resources
- `hosting://docs/domain-setup` - Domain configuration guide
- `hosting://docs/dns-management` - DNS management documentation
- `hosting://docs/ssl-setup` - SSL certificate setup guide
- `hosting://schemas/subscription` - Subscription data schemas

### Build Commands
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with auto-reload
- `npm start` - Start the MCP server

### MCP Configuration
```json
{
  "servers": {
    "hosting-management": {
      "type": "stdio",
      "command": "node", 
      "args": ["dist/index.js"]
    }
  }
}
```

### Environment Variables
```bash
# Domain Registrar APIs
NAMECHEAP_API_KEY=your-namecheap-key
GODADDY_API_KEY=your-godaddy-key
CLOUDFLARE_API_TOKEN=your-cloudflare-token

# Hosting Provider APIs
CPANEL_API_TOKEN=your-cpanel-token
DIGITALOCEAN_API_KEY=your-do-key

# Notification Settings
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_USERNAME=your-email
EMAIL_PASSWORD=your-password
```

## References
- MCP SDK Documentation: https://github.com/modelcontextprotocol
- Namecheap API: https://www.namecheap.com/support/api/
- GoDaddy API: https://developer.godaddy.com/
- Cloudflare API: https://developers.cloudflare.com/api/
- Implementation Guide: https://modelcontextprotocol.io/llms-full.txt

## Project Structure
```
├── src/
│   ├── index.ts              # Main MCP server
│   ├── domain-manager.ts     # Domain registration and management
│   ├── dns-manager.ts        # DNS record management
│   ├── ssl-manager.ts        # SSL certificate management
│   ├── subscription-manager.ts # Hosting subscription tracking
│   └── notification-service.ts # Alert and notification system
├── dist/                     # Compiled JavaScript output
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project configuration
├── README.md                 # Project documentation
└── Hosting-Management-MCP-Server-Manual.md # Detailed manual
```

## Supported Providers

### Domain Registrars
- Namecheap (Full API integration)
- GoDaddy (Domain and DNS management)
- Cloudflare (DNS and domain management)
- Google Domains (Basic operations)
- Name.com (Registration and DNS)

### Hosting Providers
- cPanel/WHM (Full hosting management)
- DigitalOcean (Droplet and domain management)
- AWS Route53 (DNS management)
- Vultr (VPS and DNS management)
- Linode (Cloud hosting management)

### SSL Providers
- Let's Encrypt (Free certificates)
- Comodo (Commercial certificates)
- DigiCert (Enterprise solutions)
- Cloudflare (SSL proxy and certificates)

## Key Features
- Multi-provider domain and hosting management
- Automated renewal monitoring and alerts
- SSL certificate lifecycle management
- DNS propagation verification
- Subscription cost tracking and optimization
- Performance and uptime monitoring

Perfect for managing multiple domains and hosting subscriptions in a centralized dashboard with comprehensive automation and monitoring capabilities.