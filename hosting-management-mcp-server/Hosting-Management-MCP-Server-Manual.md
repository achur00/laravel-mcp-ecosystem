# Hosting Management MCP Server Manual

## Overview
The Hosting Management MCP Server provides comprehensive domain and hosting subscription management capabilities through the Model Context Protocol. This server manages domain registrations, DNS records, SSL certificates, and hosting subscriptions with automated monitoring and renewal alerts.

## Features
- ✅ Domain registration and management
- ✅ DNS record management (A, CNAME, MX, TXT, etc.)
- ✅ SSL certificate lifecycle management
- ✅ Hosting subscription tracking and billing
- ✅ Multi-provider API integration
- ✅ Automated expiration monitoring and alerts
- ✅ Performance and uptime monitoring

## Installation and Setup

### Prerequisites
- Node.js 18+
- API credentials for domain registrars and hosting providers
- SMTP server for notifications
- Database for subscription tracking

### Installation Steps

1. **Install Dependencies**
```bash
cd hosting-management-mcp-server
npm install
```

2. **Environment Configuration**
Create a `.env` file in the project root:
```env
# Domain Registrar APIs
NAMECHEAP_API_KEY=your-namecheap-api-key
NAMECHEAP_API_USER=your-namecheap-username
NAMECHEAP_SANDBOX=false

GODADDY_API_KEY=your-godaddy-api-key
GODADDY_API_SECRET=your-godaddy-api-secret
GODADDY_SANDBOX=false

CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
CLOUDFLARE_ZONE_ID=your-zone-id

# Hosting Provider APIs
CPANEL_API_TOKEN=your-cpanel-api-token
CPANEL_HOST=your-cpanel-host.com
CPANEL_USERNAME=your-cpanel-username

DIGITALOCEAN_API_KEY=your-digitalocean-api-key

# Notification Settings
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_USERNAME=notifications@yourdomain.com
EMAIL_PASSWORD=your-email-password

SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Monitoring Settings
UPTIME_CHECK_INTERVAL=300000  # 5 minutes
SSL_CHECK_INTERVAL=86400000   # 24 hours
DOMAIN_EXPIRY_ALERT_DAYS=30
SSL_EXPIRY_ALERT_DAYS=30

# Database Configuration
SUBSCRIPTION_DB_HOST=localhost
SUBSCRIPTION_DB_PORT=3306
SUBSCRIPTION_DB_NAME=hosting_management
SUBSCRIPTION_DB_USER=root
SUBSCRIPTION_DB_PASS=your_password
```

3. **Database Setup**
```sql
CREATE DATABASE hosting_management;

CREATE TABLE domains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_name VARCHAR(255) UNIQUE NOT NULL,
    registrar VARCHAR(100) NOT NULL,
    registration_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    auto_renewal BOOLEAN DEFAULT FALSE,
    nameservers JSON,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE hosting_subscriptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT,
    provider VARCHAR(100) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    billing_cycle ENUM('monthly', 'yearly') NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    next_billing_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    resources JSON,
    FOREIGN KEY (domain_id) REFERENCES domains(id)
);

CREATE TABLE ssl_certificates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    domain_id INT,
    provider VARCHAR(100) NOT NULL,
    certificate_type VARCHAR(50) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    auto_renewal BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'active',
    FOREIGN KEY (domain_id) REFERENCES domains(id)
);
```

4. **Build and Start**
```bash
npm run build
npm start
```

## API Reference

### Domain Management

#### register-domain
Register a new domain name with specified registrar.

**Parameters:**
- `domainName` (string, required): Domain name to register
- `registrar` (string, required): Registrar service ('namecheap', 'godaddy', 'cloudflare')
- `period` (number, optional): Registration period in years (default: 1)
- `autoRenew` (boolean, optional): Enable auto-renewal
- `nameservers` (array, optional): Custom nameservers
- `contacts` (object, required): Registrant contact information

**Response:**
```json
{
  "success": true,
  "domain": "example.com",
  "registrar": "namecheap",
  "registrationDate": "2025-12-07",
  "expiryDate": "2026-12-07",
  "transactionId": "TXN123456789",
  "cost": 12.99,
  "autoRenew": true,
  "nameservers": ["ns1.namecheap.com", "ns2.namecheap.com"]
}
```

#### check-domain-availability
Check if domain name is available for registration.

**Parameters:**
- `domainName` (string, required): Domain name to check
- `registrar` (string, optional): Specific registrar to check with

**Response:**
```json
{
  "domain": "example.com",
  "available": false,
  "reason": "Domain is already registered",
  "suggestions": [
    "example.net",
    "example.org", 
    "example.info"
  ],
  "pricing": {
    "registration": 12.99,
    "renewal": 14.99,
    "transfer": 12.99
  }
}
```

#### get-domain-info
Get detailed information about registered domain.

**Parameters:**
- `domainName` (string, required): Domain name to lookup

**Response:**
```json
{
  "success": true,
  "domainInfo": {
    "domain": "example.com",
    "registrar": "namecheap",
    "status": "active",
    "registrationDate": "2025-12-07T00:00:00Z",
    "expiryDate": "2026-12-07T23:59:59Z",
    "daysUntilExpiry": 365,
    "autoRenew": true,
    "locked": true,
    "nameservers": ["ns1.namecheap.com", "ns2.namecheap.com"],
    "contacts": {
      "registrant": {...},
      "admin": {...},
      "tech": {...},
      "billing": {...}
    }
  }
}
```

### DNS Management

#### create-dns-record
Add new DNS record to domain.

**Parameters:**
- `domain` (string, required): Domain name
- `type` (string, required): Record type ('A', 'CNAME', 'MX', 'TXT', 'AAAA', 'NS')
- `name` (string, required): Record name/subdomain
- `value` (string, required): Record value
- `ttl` (number, optional): Time to live (default: 3600)
- `priority` (number, optional): Priority for MX records

**Example:**
```json
{
  "domain": "example.com",
  "type": "A",
  "name": "www",
  "value": "192.168.1.100",
  "ttl": 3600
}
```

**Response:**
```json
{
  "success": true,
  "record": {
    "id": "dns_123456",
    "domain": "example.com",
    "type": "A",
    "name": "www.example.com",
    "value": "192.168.1.100",
    "ttl": 3600,
    "status": "active"
  },
  "propagationTime": "15-30 minutes"
}
```

#### list-dns-records
List all DNS records for domain.

**Response:**
```json
{
  "success": true,
  "domain": "example.com",
  "records": [
    {
      "id": "dns_123456",
      "type": "A",
      "name": "@",
      "value": "192.168.1.100",
      "ttl": 3600
    },
    {
      "id": "dns_123457", 
      "type": "CNAME",
      "name": "www",
      "value": "example.com",
      "ttl": 3600
    },
    {
      "id": "dns_123458",
      "type": "MX",
      "name": "@",
      "value": "mail.example.com",
      "priority": 10,
      "ttl": 3600
    }
  ],
  "totalRecords": 3
}
```

#### verify-dns-propagation
Check DNS propagation status globally.

**Parameters:**
- `domain` (string, required): Domain to check
- `recordType` (string, required): Record type to verify
- `expectedValue` (string, required): Expected record value

**Response:**
```json
{
  "success": true,
  "domain": "example.com",
  "recordType": "A",
  "expectedValue": "192.168.1.100",
  "propagationStatus": {
    "global": "partial",
    "percentage": 75,
    "servers": [
      {
        "server": "8.8.8.8",
        "location": "Google DNS",
        "status": "propagated",
        "value": "192.168.1.100",
        "responseTime": "45ms"
      },
      {
        "server": "1.1.1.1",
        "location": "Cloudflare DNS", 
        "status": "not_propagated",
        "value": "old_value",
        "responseTime": "32ms"
      }
    ]
  },
  "estimatedFullPropagation": "2-4 hours"
}
```

### SSL Certificate Management

#### generate-ssl-certificate
Generate new SSL certificate for domain.

**Parameters:**
- `domain` (string, required): Domain name for certificate
- `subdomains` (array, optional): Additional subdomains
- `provider` (string, required): SSL provider ('letsencrypt', 'comodo', 'digicert')
- `validationType` (string, required): Validation method ('http', 'dns', 'email')
- `certificateType` (string, optional): Certificate type ('dv', 'ov', 'ev')

**Response:**
```json
{
  "success": true,
  "certificate": {
    "id": "ssl_123456",
    "domain": "example.com",
    "subdomains": ["www.example.com", "api.example.com"],
    "provider": "letsencrypt",
    "issueDate": "2025-12-07T10:30:00Z",
    "expiryDate": "2026-03-07T10:30:00Z",
    "status": "issued",
    "serialNumber": "ABC123456789",
    "fingerprint": "SHA256:abc123..."
  },
  "installationInstructions": "..."
}
```

#### check-ssl-status
Check SSL certificate status and validity.

**Parameters:**
- `domain` (string, required): Domain to check SSL status

**Response:**
```json
{
  "success": true,
  "domain": "example.com",
  "sslStatus": {
    "valid": true,
    "issuer": "Let's Encrypt Authority X3",
    "subject": "CN=example.com",
    "issueDate": "2025-12-07T10:30:00Z",
    "expiryDate": "2026-03-07T10:30:00Z",
    "daysUntilExpiry": 90,
    "certificateChain": "valid",
    "signatureAlgorithm": "SHA256-RSA",
    "keySize": 2048,
    "subjectAlternativeNames": ["example.com", "www.example.com"]
  },
  "securityScore": "A+",
  "vulnerabilities": []
}
```

### Hosting Subscriptions

#### create-hosting-subscription
Add new hosting subscription to tracking system.

**Parameters:**
- `domain` (string, required): Associated domain
- `provider` (string, required): Hosting provider name
- `planName` (string, required): Hosting plan name
- `billingCycle` (string, required): 'monthly' or 'yearly'
- `cost` (number, required): Subscription cost
- `nextBillingDate` (string, required): Next billing date (YYYY-MM-DD)
- `resources` (object, optional): Resource allocations

**Example:**
```json
{
  "domain": "example.com",
  "provider": "DigitalOcean",
  "planName": "Basic Droplet",
  "billingCycle": "monthly",
  "cost": 25.00,
  "nextBillingDate": "2026-01-07",
  "resources": {
    "cpu": "1 vCPU",
    "memory": "1 GB",
    "storage": "25 GB SSD",
    "transfer": "1 TB"
  }
}
```

#### get-subscription-usage
Monitor hosting resource usage and limits.

**Parameters:**
- `subscriptionId` (number, required): Subscription ID

**Response:**
```json
{
  "success": true,
  "subscription": {
    "id": 1,
    "domain": "example.com",
    "provider": "DigitalOcean",
    "planName": "Basic Droplet"
  },
  "usage": {
    "cpu": {"used": 45, "limit": 100, "unit": "percent"},
    "memory": {"used": 512, "limit": 1024, "unit": "MB"},
    "storage": {"used": 15.5, "limit": 25, "unit": "GB"},
    "bandwidth": {"used": 250, "limit": 1000, "unit": "GB"},
    "databases": {"used": 2, "limit": 5, "unit": "count"}
  },
  "alerts": [
    {
      "type": "warning",
      "message": "Storage usage above 60%",
      "usage": 62
    }
  ]
}
```

### Monitoring & Alerts

#### setup-domain-monitoring
Configure monitoring for domain expiration and SSL certificates.

**Parameters:**
- `domain` (string, required): Domain to monitor
- `alerts` (object, required): Alert configuration
- `checks` (array, required): Monitoring checks to enable

**Example:**
```json
{
  "domain": "example.com",
  "alerts": {
    "email": ["admin@example.com"],
    "slack": ["#hosting-alerts"],
    "domainExpiry": [30, 15, 7, 1],
    "sslExpiry": [30, 15, 7, 1]
  },
  "checks": ["domain_expiry", "ssl_expiry", "dns_health", "uptime"]
}
```

#### get-renewal-dates
Get all upcoming renewal dates for domains and services.

**Response:**
```json
{
  "success": true,
  "renewals": [
    {
      "type": "domain",
      "item": "example.com",
      "provider": "namecheap",
      "renewalDate": "2026-12-07",
      "daysUntilRenewal": 365,
      "cost": 14.99,
      "autoRenewal": true,
      "status": "active"
    },
    {
      "type": "ssl",
      "item": "SSL Certificate for example.com",
      "provider": "letsencrypt", 
      "renewalDate": "2026-03-07",
      "daysUntilRenewal": 90,
      "cost": 0,
      "autoRenewal": true,
      "status": "active"
    },
    {
      "type": "hosting",
      "item": "Basic Droplet - example.com",
      "provider": "DigitalOcean",
      "renewalDate": "2026-01-07",
      "daysUntilRenewal": 31,
      "cost": 25.00,
      "autoRenewal": false,
      "status": "active"
    }
  ],
  "totalUpcomingCost": 289.97,
  "nextRenewal": "2026-01-07"
}
```

## Provider Integration

### Namecheap Integration
```javascript
// Domain operations
const namecheap = new NamecheapAPI({
  apiKey: process.env.NAMECHEAP_API_KEY,
  apiUser: process.env.NAMECHEAP_API_USER,
  sandbox: process.env.NAMECHEAP_SANDBOX === 'true'
});

// Register domain
await namecheap.domains.create({
  domainName: 'example.com',
  years: 1,
  contacts: {...}
});

// Manage DNS
await namecheap.dns.setHosts({
  domain: 'example.com',
  hosts: [
    {type: 'A', name: '@', value: '192.168.1.100'},
    {type: 'CNAME', name: 'www', value: 'example.com'}
  ]
});
```

### Cloudflare Integration
```javascript
// DNS management
const cloudflare = new CloudflareAPI({
  token: process.env.CLOUDFLARE_API_TOKEN
});

// Create DNS record
await cloudflare.dnsRecords.add({
  zoneId: process.env.CLOUDFLARE_ZONE_ID,
  type: 'A',
  name: 'api',
  content: '192.168.1.101',
  ttl: 3600
});

// SSL certificate management
await cloudflare.ssl.verification({
  zoneId: process.env.CLOUDFLARE_ZONE_ID
});
```

### DigitalOcean Integration
```javascript
// Droplet and domain management
const digitalocean = new DigitalOceanAPI({
  token: process.env.DIGITALOCEAN_API_KEY
});

// Domain management
await digitalocean.domains.create({
  name: 'example.com',
  ipAddress: '192.168.1.100'
});

// Monitor resource usage
const usage = await digitalocean.droplets.getUsage(dropletId);
```

## Dashboard Integration

### Subscription Overview Widget
```javascript
const getDashboardData = async () => {
  const renewals = await getRenewalDates();
  const usage = await getResourceUsage();
  const alerts = await getActiveAlerts();
  
  return {
    upcomingRenewals: renewals.filter(r => r.daysUntilRenewal <= 30),
    resourceAlerts: usage.filter(u => u.usage > 80),
    securityAlerts: alerts.filter(a => a.type === 'security'),
    monthlyCosts: calculateMonthlyCosts(renewals),
    domains: {
      total: await getDomainCount(),
      expiringSoon: renewals.filter(r => r.type === 'domain' && r.daysUntilRenewal <= 30).length,
      sslExpiring: renewals.filter(r => r.type === 'ssl' && r.daysUntilRenewal <= 30).length
    }
  };
};
```

### Renewal Calendar
```javascript
const getCalendarEvents = async () => {
  const renewals = await getRenewalDates();
  
  return renewals.map(renewal => ({
    title: `${renewal.item} Renewal`,
    date: renewal.renewalDate,
    type: renewal.type,
    cost: renewal.cost,
    provider: renewal.provider,
    autoRenewal: renewal.autoRenewal,
    urgency: renewal.daysUntilRenewal <= 7 ? 'high' : 
             renewal.daysUntilRenewal <= 30 ? 'medium' : 'low'
  }));
};
```

## Automation & Workflows

### Automatic Renewal Management
```javascript
// Check for upcoming renewals daily
const checkRenewals = async () => {
  const renewals = await getRenewalDates();
  
  for (const renewal of renewals) {
    if (renewal.autoRenewal && renewal.daysUntilRenewal <= 7) {
      try {
        await renewService(renewal);
        await sendNotification(`Successfully renewed ${renewal.item}`);
      } catch (error) {
        await sendAlert(`Failed to renew ${renewal.item}: ${error.message}`);
      }
    }
  }
};
```

### SSL Certificate Auto-Renewal
```javascript
// Let's Encrypt auto-renewal
const renewSSLCertificates = async () => {
  const expiring = await getExpiring SSLCertificates();
  
  for (const cert of expiring) {
    if (cert.provider === 'letsencrypt' && cert.daysUntilExpiry <= 30) {
      await generateSSLCertificate({
        domain: cert.domain,
        provider: 'letsencrypt',
        validationType: 'http'
      });
    }
  }
};
```

## Security & Compliance

### API Security
- API credentials encrypted at rest
- Rate limiting for all external API calls
- Request/response logging for audit trails
- Webhook signature verification

### Data Protection
- Sensitive contact information encrypted
- PCI DSS compliance for payment data
- GDPR compliance for EU domains
- Regular security assessments

### Access Control
- Role-based access to domain management
- API key rotation policies
- Multi-factor authentication for critical operations
- Audit logging for all administrative actions

## Error Handling & Monitoring

### Common Error Scenarios

**Domain Registration Failed:**
```json
{
  "success": false,
  "error": "DOMAIN_REGISTRATION_FAILED", 
  "message": "Domain is already registered",
  "details": {
    "domain": "example.com",
    "registrar": "namecheap",
    "errorCode": "ERR_DOMAIN_TAKEN"
  }
}
```

**DNS Propagation Delayed:**
```json
{
  "success": false,
  "error": "DNS_PROPAGATION_TIMEOUT",
  "message": "DNS changes not propagated within expected timeframe",
  "details": {
    "domain": "example.com",
    "record": "A www",
    "expectedValue": "192.168.1.100",
    "propagationPercentage": 45
  }
}
```

**SSL Generation Failed:**
```json
{
  "success": false,
  "error": "SSL_GENERATION_FAILED",
  "message": "Domain validation failed",
  "details": {
    "domain": "example.com",
    "provider": "letsencrypt",
    "validationType": "http",
    "validationError": "Unable to verify domain ownership"
  }
}
```

This manual provides comprehensive guidance for managing domains, hosting subscriptions, and SSL certificates through a unified MCP interface, perfect for creating hosting management dashboards and automation workflows.