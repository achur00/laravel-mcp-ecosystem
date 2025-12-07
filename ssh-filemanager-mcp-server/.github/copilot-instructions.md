<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SSH File Manager MCP Server Project

This project is a Model Context Protocol (MCP) server built with TypeScript for SSH-based remote file management with graphical interface support.

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

This SSH File Manager MCP Server provides:

### Tools Available
- `connect-ssh` - Establish secure SSH connections
- `disconnect-ssh` - Close SSH connections safely
- `list-files` - Browse remote directory structures
- `upload-file` - Upload files to remote server via SFTP
- `download-file` - Download files from remote server
- `create-directory` - Create new remote directories
- `delete-file` - Delete remote files and directories
- `move-file` - Move/rename remote files
- `read-file-content` - Read remote file contents
- `change-permissions` - Modify file permissions
- `execute-command` - Run commands on remote server
- `create-archive` - Create ZIP/TAR archives
- `extract-archive` - Extract archive files

### Resources
- `ssh://docs/connection-setup` - SSH connection configuration guide
- `ssh://docs/key-management` - SSH key management documentation
- `ssh://docs/security-best-practices` - Security best practices guide

### Build Commands
- `npm run build` - Compile TypeScript to JavaScript
- `npm run dev` - Run in development mode with auto-reload
- `npm start` - Start the MCP server

### MCP Configuration
```json
{
  "servers": {
    "ssh-filemanager": {
      "type": "stdio",
      "command": "node", 
      "args": ["dist/index.js"]
    }
  }
}
```

### Environment Variables
```bash
# SSH configuration
SSH_DEFAULT_HOST=your-server.com
SSH_DEFAULT_PORT=22
SSH_DEFAULT_USERNAME=your-username
SSH_PRIVATE_KEY_PATH=/path/to/private/key

# Transfer settings
UPLOAD_MAX_SIZE=100MB
DOWNLOAD_CHUNK_SIZE=1MB
TRANSFER_TIMEOUT=300000
```

## References
- MCP SDK Documentation: https://github.com/modelcontextprotocol
- SSH2 Library: https://github.com/mscdex/ssh2
- SFTP Client: https://github.com/jyu213/ssh2-sftp-client
- Implementation Guide: https://modelcontextprotocol.io/llms-full.txt

## Project Structure
```
├── src/
│   ├── index.ts          # Main MCP server
│   ├── ssh-manager.ts    # SSH connection management
│   ├── file-operations.ts # SFTP file operations
│   └── archive-utils.ts  # Archive creation/extraction
├── dist/                 # Compiled JavaScript output
├── tsconfig.json         # TypeScript configuration
├── package.json          # Project configuration
├── README.md             # Project documentation
└── SSH-FileManager-MCP-Server-Manual.md # Detailed manual
```

## Security Features
- SSH key-based authentication (RSA, ECDSA, Ed25519)
- Host fingerprint verification
- Encrypted file transfers via SFTP
- Session management and cleanup
- Access control and audit logging

## Supported Operations
- File upload/download with resume capability
- Directory navigation and management
- File permissions and ownership changes
- Archive operations (ZIP, TAR, GZ)
- Remote command execution
- Bulk file operations

Perfect for managing Laravel applications on remote servers, handling deployments, and managing hosting environments securely.