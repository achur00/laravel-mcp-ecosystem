# SSH File Manager MCP Server Manual

## Overview
The SSH File Manager MCP Server provides secure remote file management capabilities through SSH/SFTP connections. This server enables graphical file management, remote command execution, and secure file transfers for hosting environments and server administration.

## Features
- ✅ SSH key-based and password authentication
- ✅ SFTP file operations (upload, download, browse)
- ✅ Remote directory navigation and management
- ✅ File permissions and ownership management
- ✅ Archive operations (ZIP, TAR, GZ)
- ✅ Remote command execution
- ✅ Bulk file operations with progress tracking
- ✅ Secure session management

## Installation and Setup

### Prerequisites
- Node.js 18+
- SSH access to remote servers
- SSH keys or password authentication
- Remote server with SSH daemon running

### Installation Steps

1. **Install Dependencies**
```bash
cd ssh-filemanager-mcp-server
npm install
```

2. **Environment Configuration**
Create a `.env` file in the project root:
```env
# SSH Configuration
SSH_DEFAULT_HOST=your-server.com
SSH_DEFAULT_PORT=22
SSH_DEFAULT_USERNAME=your-username

# Authentication (choose one method)
SSH_PRIVATE_KEY_PATH=/home/user/.ssh/id_rsa
# SSH_PASSWORD=your-password

# Transfer Settings
UPLOAD_MAX_SIZE=100MB
DOWNLOAD_CHUNK_SIZE=1MB
TRANSFER_TIMEOUT=300000
CONNECTION_TIMEOUT=30000

# Security Settings
VERIFY_HOST_KEY=true
KEEP_ALIVE_INTERVAL=30000
```

3. **SSH Key Setup (Recommended)**
```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/server_key

# Copy public key to server
ssh-copy-id -i ~/.ssh/server_key.pub user@server.com

# Set proper permissions
chmod 600 ~/.ssh/server_key
chmod 644 ~/.ssh/server_key.pub
```

4. **Build and Start**
```bash
npm run build
npm start
```

## API Reference

### Connection Management

#### connect-ssh
Establish SSH connection to remote server.

**Parameters:**
- `host` (string, required): Server hostname or IP
- `port` (number, optional): SSH port (default: 22)
- `username` (string, required): SSH username
- `password` (string, optional): SSH password
- `privateKey` (string, optional): Path to private key file
- `passphrase` (string, optional): Private key passphrase

**Response:**
```json
{
  "success": true,
  "connectionId": "conn_1701942600",
  "serverInfo": {
    "host": "example.com",
    "port": 22,
    "username": "user",
    "serverVersion": "OpenSSH_8.9p1"
  },
  "message": "SSH connection established successfully"
}
```

#### disconnect-ssh
Close SSH connection safely.

**Parameters:**
- `connectionId` (string, required): Connection identifier

#### test-ssh-connection
Test SSH connectivity and authentication.

**Response:**
```json
{
  "success": true,
  "latency": "45ms",
  "authentication": "key-based",
  "serverFingerprint": "SHA256:abc123...",
  "supportedFeatures": ["sftp", "scp", "port-forwarding"]
}
```

### File Operations

#### list-files
List files and directories in remote path.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `path` (string, optional): Remote path (default: home directory)
- `showHidden` (boolean, optional): Show hidden files
- `recursive` (boolean, optional): Recursive listing

**Response:**
```json
{
  "success": true,
  "path": "/home/user/public_html",
  "files": [
    {
      "name": "index.html",
      "type": "file",
      "size": 2048,
      "permissions": "rw-r--r--",
      "owner": "user",
      "group": "www-data",
      "modified": "2025-12-07T10:30:00Z"
    },
    {
      "name": "assets",
      "type": "directory",
      "permissions": "rwxr-xr-x",
      "owner": "user",
      "group": "www-data",
      "modified": "2025-12-06T15:45:00Z"
    }
  ],
  "totalFiles": 15,
  "totalSize": "25.6MB"
}
```

#### upload-file
Upload file to remote server via SFTP.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `localPath` (string, required): Local file path
- `remotePath` (string, required): Remote destination path
- `overwrite` (boolean, optional): Overwrite existing files
- `preserveTimestamp` (boolean, optional): Preserve file timestamps

**Response:**
```json
{
  "success": true,
  "uploadedFile": "/remote/path/file.txt",
  "size": "1.2MB",
  "duration": "2.5s",
  "speed": "480KB/s",
  "checksum": "sha256:abc123..."
}
```

#### download-file
Download file from remote server.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `remotePath` (string, required): Remote file path
- `localPath` (string, required): Local destination path
- `resumeDownload` (boolean, optional): Resume interrupted download

#### create-directory
Create new directory on remote server.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `path` (string, required): Directory path to create
- `recursive` (boolean, optional): Create parent directories
- `permissions` (string, optional): Directory permissions (e.g., "755")

#### delete-file
Delete file or directory on remote server.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `path` (string, required): Path to delete
- `recursive` (boolean, optional): Recursive delete for directories
- `force` (boolean, optional): Force delete without confirmation

#### move-file
Move or rename files and directories.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `sourcePath` (string, required): Current file/directory path
- `destinationPath` (string, required): New file/directory path
- `overwrite` (boolean, optional): Overwrite destination if exists

### File Content Management

#### read-file-content
Read remote file content.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `filePath` (string, required): Remote file path
- `encoding` (string, optional): File encoding (default: 'utf8')
- `maxSize` (number, optional): Maximum file size to read

**Response:**
```json
{
  "success": true,
  "content": "<!DOCTYPE html>\\n<html>\\n<head>...",
  "encoding": "utf8",
  "size": 2048,
  "mimeType": "text/html"
}
```

#### write-file-content
Write content to remote file.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `filePath` (string, required): Remote file path
- `content` (string, required): File content to write
- `encoding` (string, optional): Content encoding
- `backup` (boolean, optional): Create backup before writing

#### search-in-files
Search for text patterns in remote files.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `searchPath` (string, required): Path to search in
- `pattern` (string, required): Search pattern/regex
- `filePattern` (string, optional): File pattern filter
- `caseSensitive` (boolean, optional): Case-sensitive search
- `recursive` (boolean, optional): Recursive search

### Permissions & Security

#### change-permissions
Modify file or directory permissions.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `path` (string, required): File/directory path
- `permissions` (string, required): New permissions (e.g., "644", "755")
- `recursive` (boolean, optional): Apply recursively

**Example:**
```json
{
  "connectionId": "conn_1701942600",
  "path": "/var/www/html/uploads",
  "permissions": "755",
  "recursive": true
}
```

#### change-owner
Change file ownership.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `path` (string, required): File/directory path
- `owner` (string, required): New owner username
- `group` (string, optional): New group name
- `recursive` (boolean, optional): Apply recursively

#### get-file-info
Get detailed file information.

**Response:**
```json
{
  "success": true,
  "fileInfo": {
    "path": "/home/user/file.txt",
    "type": "regular file",
    "size": 2048,
    "permissions": {
      "octal": "644",
      "symbolic": "-rw-r--r--",
      "owner": {"read": true, "write": true, "execute": false},
      "group": {"read": true, "write": false, "execute": false},
      "others": {"read": true, "write": false, "execute": false}
    },
    "ownership": {"user": "webuser", "group": "www-data"},
    "timestamps": {
      "accessed": "2025-12-07T10:30:00Z",
      "modified": "2025-12-07T09:15:00Z",
      "changed": "2025-12-07T09:15:00Z"
    },
    "checksum": {"md5": "abc123...", "sha256": "def456..."}
  }
}
```

### Archive Operations

#### create-archive
Create ZIP or TAR archives from files/directories.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `sourcePaths` (array, required): Files/directories to archive
- `archivePath` (string, required): Output archive path
- `format` (string, required): Archive format ('zip', 'tar', 'tar.gz')
- `compression` (string, optional): Compression level (0-9)

**Response:**
```json
{
  "success": true,
  "archiveFile": "/backups/website_backup_2025-12-07.tar.gz",
  "originalSize": "150.5MB",
  "compressedSize": "45.2MB",
  "compressionRatio": "70%",
  "filesArchived": 1247
}
```

#### extract-archive
Extract archive files.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `archivePath` (string, required): Archive file path
- `extractPath` (string, required): Extraction destination
- `overwrite` (boolean, optional): Overwrite existing files
- `preservePaths` (boolean, optional): Preserve directory structure

### Terminal Operations

#### execute-command
Execute shell commands on remote server.

**Parameters:**
- `connectionId` (string, required): Active connection ID
- `command` (string, required): Command to execute
- `workingDirectory` (string, optional): Working directory
- `timeout` (number, optional): Command timeout in seconds
- `environment` (object, optional): Environment variables

**Response:**
```json
{
  "success": true,
  "command": "ls -la /var/www/html",
  "exitCode": 0,
  "stdout": "total 24\\ndrwxr-xr-x 3 www-data www-data 4096 Dec  7 10:30 .\\n...",
  "stderr": "",
  "executionTime": "0.125s",
  "workingDirectory": "/var/www/html"
}
```

#### get-system-info
Get remote system information.

**Response:**
```json
{
  "success": true,
  "systemInfo": {
    "hostname": "web-server-01",
    "os": "Ubuntu 22.04.3 LTS",
    "kernel": "5.15.0-91-generic",
    "architecture": "x86_64",
    "uptime": "15 days, 3:45:12",
    "loadAverage": [0.15, 0.25, 0.30],
    "memory": {
      "total": "8GB",
      "used": "3.2GB",
      "free": "4.8GB",
      "cached": "2.1GB"
    },
    "storage": [
      {
        "filesystem": "/dev/sda1",
        "size": "50GB",
        "used": "15GB",
        "available": "35GB",
        "mountPoint": "/"
      }
    ]
  }
}
```

## Security Features

### Authentication Methods
1. **SSH Key Authentication (Recommended)**
   - RSA, ECDSA, Ed25519 key support
   - Passphrase-protected keys
   - Multiple key support

2. **Password Authentication**
   - Encrypted password transmission
   - Optional for development environments
   - Not recommended for production

### Connection Security
- Host key fingerprint verification
- Man-in-the-middle attack prevention
- Connection encryption (AES, ChaCha20)
- Session timeout management

### Access Control
- User-based file access restrictions
- Command execution limitations
- Path traversal prevention
- File operation auditing

## Performance Optimization

### Transfer Optimization
```env
# Optimize for different scenarios
DOWNLOAD_CHUNK_SIZE=1MB      # Large files
UPLOAD_BUFFER_SIZE=64KB      # Small files
CONCURRENT_TRANSFERS=3       # Parallel transfers
COMPRESSION_LEVEL=6          # Balance speed/size
```

### Connection Management
- Connection pooling for multiple operations
- Keep-alive to prevent timeouts
- Automatic reconnection on disconnect
- Connection sharing across operations

### Caching Strategies
- Directory listing cache
- File metadata cache
- Command output cache
- Connection state cache

## Laravel Integration

### Deployment Workflow
```javascript
// Example deployment script using MCP server
const deployLaravel = async () => {
  // 1. Connect to production server
  await connectSSH({
    host: 'production.server.com',
    username: 'deploy',
    privateKey: '/keys/deploy_key'
  });
  
  // 2. Upload Laravel application
  await uploadFile({
    localPath: './dist/laravel-app.tar.gz',
    remotePath: '/tmp/laravel-app.tar.gz'
  });
  
  // 3. Extract and deploy
  await executeCommand({
    command: 'cd /var/www && tar -xzf /tmp/laravel-app.tar.gz'
  });
  
  // 4. Set permissions
  await changePermissions({
    path: '/var/www/laravel/storage',
    permissions: '775',
    recursive: true
  });
  
  // 5. Run Laravel commands
  await executeCommand({
    command: 'cd /var/www/laravel && php artisan migrate --force'
  });
};
```

### File Management Scenarios

**Configuration Management:**
```javascript
// Update Laravel environment configuration
await readFileContent({
  filePath: '/var/www/laravel/.env'
});

await writeFileContent({
  filePath: '/var/www/laravel/.env',
  content: updatedEnvConfig,
  backup: true
});
```

**Log File Analysis:**
```javascript
// Read Laravel logs
await readFileContent({
  filePath: '/var/www/laravel/storage/logs/laravel.log',
  maxSize: 10485760 // 10MB
});

// Search for errors
await searchInFiles({
  searchPath: '/var/www/laravel/storage/logs',
  pattern: 'ERROR|CRITICAL',
  filePattern: '*.log'
});
```

## Hosting Provider Integration

### cPanel Integration
```javascript
// Access cPanel file manager equivalent
await listFiles({
  path: '/public_html',
  showHidden: true
});

// Manage domains
await changePermissions({
  path: '/public_html/subdomain',
  permissions: '755'
});
```

### VPS/Cloud Server Management
```javascript
// System monitoring
const systemInfo = await getSystemInfo();

// Service management
await executeCommand({
  command: 'systemctl status nginx'
});

// Log monitoring
await executeCommand({
  command: 'tail -f /var/log/nginx/access.log'
});
```

## Error Handling

### Common Error Scenarios

**Connection Failed:**
```json
{
  "success": false,
  "error": "SSH_CONNECTION_FAILED",
  "message": "Connection refused",
  "details": {
    "host": "server.com",
    "port": 22,
    "reason": "Network unreachable"
  }
}
```

**Authentication Failed:**
```json
{
  "success": false,
  "error": "SSH_AUTH_FAILED",
  "message": "Authentication failed",
  "details": {
    "method": "privatekey",
    "keyPath": "/path/to/key",
    "reason": "Invalid key or passphrase"
  }
}
```

**File Operation Failed:**
```json
{
  "success": false,
  "error": "SFTP_OPERATION_FAILED",
  "message": "Permission denied",
  "details": {
    "operation": "upload",
    "remotePath": "/protected/file.txt",
    "permissions": "644",
    "owner": "root"
  }
}
```

## Monitoring and Logging

### Connection Monitoring
- Active connection tracking
- Connection duration logging
- Authentication attempt logging
- Failed connection alerts

### File Operation Auditing
- All file operations logged
- User activity tracking
- Permission change logging
- Security event monitoring

### Performance Metrics
- Transfer speeds and times
- Connection latency monitoring
- Command execution times
- Error rate tracking

## Troubleshooting

### SSH Connection Issues
1. **Verify SSH daemon is running**
   ```bash
   systemctl status sshd
   ```

2. **Check SSH configuration**
   ```bash
   sudo sshd -T | grep -E 'port|pubkey|password'
   ```

3. **Test connection manually**
   ```bash
   ssh -v user@server.com
   ```

### File Transfer Problems
1. **Check disk space**
   ```bash
   df -h
   ```

2. **Verify permissions**
   ```bash
   ls -la /path/to/directory
   ```

3. **Test SFTP manually**
   ```bash
   sftp user@server.com
   ```

### Performance Issues
1. **Monitor network latency**
2. **Adjust chunk sizes for transfers**
3. **Use compression for large files**
4. **Check server load and resources**

This manual provides comprehensive guidance for secure file management and server administration through SSH/SFTP connections via the MCP protocol.