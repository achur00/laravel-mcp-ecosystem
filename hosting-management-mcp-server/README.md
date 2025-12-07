# Hosting Management MCP Server

A Model Context Protocol (MCP) server that provides comprehensive domain and hosting subscription management capabilities.

## Features

- **Domain Management**: Register, renew, and manage domain names
- **Hosting Subscriptions**: Track hosting plans, renewals, and usage
- **DNS Management**: Configure DNS records and nameservers
- **SSL Certificate Management**: Monitor and manage SSL certificates
- **Billing Integration**: Track subscription costs and renewal dates
- **Monitoring & Alerts**: Domain/hosting expiration notifications
- **Multi-Provider Support**: Integration with multiple hosting providers

## Available Tools

### Domain Management
- `register-domain` - Register new domain names
- `check-domain-availability` - Check if domain is available
- `get-domain-info` - Get detailed domain information
- `renew-domain` - Renew domain subscription
- `transfer-domain` - Initiate domain transfer
- `update-domain-contacts` - Update domain contact information

### DNS Management
- `list-dns-records` - List all DNS records for domain
- `create-dns-record` - Add new DNS record
- `update-dns-record` - Modify existing DNS record
- `delete-dns-record` - Remove DNS record
- `set-nameservers` - Update domain nameservers
- `verify-dns-propagation` - Check DNS propagation status

### Hosting Subscriptions
- `create-hosting-subscription` - Add new hosting subscription
- `list-hosting-subscriptions` - Get all hosting subscriptions
- `update-hosting-subscription` - Modify subscription details
- `cancel-hosting-subscription` - Cancel hosting subscription
- `get-subscription-usage` - Check resource usage
- `upgrade-hosting-plan` - Upgrade to higher plan

### SSL Certificate Management
- `list-ssl-certificates` - Get all SSL certificates
- `generate-ssl-certificate` - Create new SSL certificate
- `install-ssl-certificate` - Install SSL on domain
- `renew-ssl-certificate` - Renew expiring certificate
- `check-ssl-status` - Verify SSL certificate status
- `get-ssl-expiration` - Get SSL expiration dates

### Billing & Subscriptions
- `get-billing-info` - Retrieve billing information
- `list-invoices` - Get all invoices
- `get-subscription-costs` - Calculate subscription costs
- `set-auto-renewal` - Configure auto-renewal settings
- `get-renewal-dates` - Check all renewal dates
- `update-payment-method` - Update billing information

### Monitoring & Alerts
- `setup-domain-monitoring` - Monitor domain expiration
- `setup-hosting-alerts` - Set up hosting alerts
- `check-uptime-status` - Monitor website uptime
- `get-performance-metrics` - Get hosting performance data
- `send-expiration-alerts` - Send renewal notifications

## Resources

- `hosting://docs/domain-setup` - Domain configuration guide
- `hosting://docs/dns-management` - DNS management documentation
- `hosting://docs/ssl-setup` - SSL certificate setup guide
- `hosting://schemas/subscription` - Subscription data schemas

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Configure API credentials:
```bash
# Domain Registrar APIs
NAMECHEAP_API_KEY=your-namecheap-key
GODADDY_API_KEY=your-godaddy-key
CLOUDFLARE_API_TOKEN=your-cloudflare-token

# Hosting Provider APIs
CPANEL_API_TOKEN=your-cpanel-token
WHCMS_API_KEY=your-whcms-key
DIGITALOCEAN_API_KEY=your-do-key

# Notification Settings
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_USERNAME=your-email
EMAIL_PASSWORD=your-password

# Monitoring Settings
UPTIME_CHECK_INTERVAL=300000
SSL_CHECK_INTERVAL=86400000
DOMAIN_EXPIRY_ALERT_DAYS=30
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

## Provider Integration

### Supported Domain Registrars
- **Namecheap**: Full API integration
- **GoDaddy**: Domain and DNS management
- **Cloudflare**: DNS and domain management
- **Google Domains**: Basic domain operations
- **Name.com**: Domain registration and DNS

### Supported Hosting Providers
- **cPanel/WHM**: Full hosting management
- **DigitalOcean**: Droplet and domain management
- **AWS Route53**: DNS management
- **Vultr**: VPS and DNS management
- **Linode**: Cloud hosting management

### SSL Certificate Providers
- **Let's Encrypt**: Free SSL certificates
- **Comodo**: Commercial SSL certificates
- **DigiCert**: Enterprise SSL solutions
- **Cloudflare**: SSL proxy and certificates

## Dashboard Integration

Perfect for creating hosting management dashboards:
- **Subscription Overview**: Visual subscription status
- **Renewal Calendar**: Upcoming renewals and expirations
- **Usage Monitoring**: Resource usage across all services
- **Cost Analysis**: Billing and cost tracking
- **Performance Metrics**: Uptime and performance monitoring

## Subscription Types Supported

### Domain Subscriptions
- Domain registration renewals
- DNS hosting subscriptions
- Domain privacy protection
- Email forwarding services

### Hosting Subscriptions
- Shared hosting plans
- VPS/Cloud hosting
- Dedicated servers
- CDN services
- Backup storage
- SSL certificates

### Additional Services
- Email hosting
- Database hosting
- Static site hosting
- Object storage
- Load balancer services

## Notification & Alert System

### Automatic Alerts
- Domain expiration warnings (30, 15, 7 days)
- SSL certificate expiration alerts
- Hosting subscription renewals
- Resource usage thresholds
- Uptime/downtime notifications

### Alert Channels
- Email notifications
- SMS alerts (via Twilio)
- Slack/Discord webhooks
- Dashboard notifications
- Calendar reminders

## Security Features

- **API Key Management**: Secure credential storage
- **Access Control**: Role-based permissions
- **Audit Logging**: Track all management actions
- **Encryption**: Encrypt sensitive configuration data
- **Rate Limiting**: Prevent API abuse
- **Backup**: Configuration backup and restore

## Usage with Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "hosting-management": {
      "command": "node",
      "args": ["path/to/hosting-management-mcp-server/dist/index.js"]
    }
  }
}
```

## Common Use Cases

1. **Multi-Domain Management**: Manage portfolios of domains
2. **Client Hosting**: Manage hosting for multiple clients
3. **Subscription Tracking**: Track all hosting-related subscriptions
4. **Renewal Management**: Automate renewal processes
5. **Cost Optimization**: Monitor and optimize hosting costs
6. **Performance Monitoring**: Track hosting performance metrics
7. **Compliance**: Maintain domain and hosting compliance
8. **Migration Planning**: Plan hosting migrations and upgrades