# SSH File Manager MCP Server

A Model Context Protocol (MCP) server that provides SSH-based file management capabilities for remote server administration.

## Features

- **SSH Connection Management**: Secure connections to remote servers
- **SFTP File Operations**: Upload, download, and manage files via SFTP
- **Directory Navigation**: Browse remote directory structures
- **File Permissions**: Manage file and directory permissions
- **Archive Operations**: Create and extract ZIP/TAR archives
- **Terminal Commands**: Execute remote commands via SSH
- **File Transfer**: Bulk file upload/download with progress tracking
- **Security**: Key-based and password authentication support

## Available Tools

### Connection Management
- `connect-ssh` - Establish SSH connection to remote server
- `disconnect-ssh` - Close SSH connection
- `test-ssh-connection` - Test SSH connectivity
- `list-ssh-connections` - List active SSH connections

### File Operations
- `list-files` - List files and directories
- `upload-file` - Upload file to remote server
- `download-file` - Download file from remote server
- `create-directory` - Create new directory
- `delete-file` - Delete file or directory
- `move-file` - Move/rename files and directories
- `copy-file` - Copy files and directories

### File Content Management
- `read-file-content` - Read remote file content
- `write-file-content` - Write content to remote file
- `edit-file` - Edit remote file content
- `search-in-files` - Search for text in files

### Permissions & Security
- `change-permissions` - Modify file/directory permissions
- `change-owner` - Change file ownership
- `get-file-info` - Get detailed file information
- `check-disk-usage` - Check disk space usage

### Archive Operations
- `create-archive` - Create ZIP/TAR archives
- `extract-archive` - Extract archive files
- `compress-directory` - Compress entire directories
- `backup-files` - Create backup archives

### Terminal Operations
- `execute-command` - Execute shell commands remotely
- `get-system-info` - Get remote system information
- `monitor-processes` - Monitor running processes
- `manage-services` - Start/stop system services

## Resources

- `ssh://docs/connection-setup` - SSH connection configuration guide
- `ssh://docs/key-management` - SSH key management documentation
- `ssh://docs/security-best-practices` - Security best practices guide

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Configure SSH credentials:
```bash
# SSH configuration
SSH_DEFAULT_HOST=your-server.com
SSH_DEFAULT_PORT=22
SSH_DEFAULT_USERNAME=your-username

# Authentication (choose one)
SSH_PRIVATE_KEY_PATH=/path/to/your/private/key
SSH_PASSWORD=your-password

# File transfer settings
UPLOAD_MAX_SIZE=100MB
DOWNLOAD_CHUNK_SIZE=1MB
TRANSFER_TIMEOUT=300000
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

## SSH Configuration

### Key-Based Authentication (Recommended)
```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/server_key

# Copy public key to server
ssh-copy-id -i ~/.ssh/server_key.pub user@server.com
```

### Password Authentication
For development environments, password authentication is supported but not recommended for production.

## Security Features

- **Encrypted Connections**: All data transfer via SSH encryption
- **Key Authentication**: Support for RSA, ECDSA, and Ed25519 keys
- **Connection Validation**: Verify host fingerprints
- **Session Management**: Secure session handling and cleanup
- **Access Control**: User-based access restrictions
- **Audit Logging**: Track all file operations and commands

## File Operations Support

### Supported File Types
- Text files (PHP, JS, CSS, HTML, etc.)
- Images (JPEG, PNG, GIF, WebP)
- Documents (PDF, DOC, XLS)
- Archives (ZIP, TAR, GZ)
- Configuration files (JSON, YAML, INI)

### Transfer Features
- Resume interrupted transfers
- Progress tracking for large files
- Batch operations for multiple files
- Automatic compression for transfers
- Integrity verification (checksums)

## Integration with Hosting Services

Perfect for managing:
- **Web Hosting**: cPanel, DirectAdmin, Plesk
- **VPS/Cloud**: DigitalOcean, AWS, Vultr, Linode
- **Dedicated Servers**: Any Linux-based hosting
- **Domain Management**: DNS file management
- **SSL Certificates**: Certificate file handling

## Usage with Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "ssh-filemanager": {
      "command": "node",
      "args": ["path/to/ssh-filemanager-mcp-server/dist/index.js"]
    }
  }
}
```

## Common Use Cases

1. **Laravel Deployment**: Upload and manage Laravel application files
2. **Configuration Management**: Edit server configuration files
3. **Backup Management**: Create and manage backup archives
4. **Log Analysis**: Read and analyze server log files
5. **Database Management**: Access database dump files
6. **SSL Management**: Upload and manage SSL certificates
7. **Static Assets**: Manage CSS, JS, and image files
8. **Environment Setup**: Configure development environments