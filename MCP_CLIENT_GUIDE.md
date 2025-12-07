# MCP Client Connection Guide

## Overview
This guide provides detailed instructions for connecting your MCP servers to various Model Context Protocol (MCP) clients, including Claude Desktop, VS Code extensions, and custom implementations.

## 🖥️ Claude Desktop Configuration

### Windows Configuration

**Configuration File Location**: 
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Full Path**: 
```
C:\Users\[Your Username]\AppData\Roaming\Claude\claude_desktop_config.json
```

### Step-by-Step Setup

1. **Open Configuration File**
   ```bash
   # Option 1: Use notepad
   notepad "%APPDATA%\Claude\claude_desktop_config.json"
   
   # Option 2: Use VS Code
   code "%APPDATA%\Claude\claude_desktop_config.json"
   ```

2. **Add MCP Server Configuration**
   Replace the entire content with this configuration:

   ```json
   {
     "mcpServers": {
       "laravel-auth": {
         "command": "node",
         "args": [
           "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/laravel-auth-mcp-server/dist/index.js"
         ],
         "env": {
           "NODE_ENV": "production"
         }
       },
       "database": {
         "command": "node",
         "args": [
           "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/database-mcp-server/dist/index.js"
         ],
         "env": {
           "NODE_ENV": "production"
         }
       },
       "ssh-filemanager": {
         "command": "node",
         "args": [
           "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/ssh-filemanager-mcp-server/dist/index.js"
         ],
         "env": {
           "NODE_ENV": "production"
         }
       },
       "hosting-management": {
         "command": "node",
         "args": [
           "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/hosting-management-mcp-server/dist/index.js"
         ],
         "env": {
           "NODE_ENV": "production"
         }
       },
       "laravel-artisan": {
         "command": "node",
         "args": [
           "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/laravel-artisan-mcp-server/dist/index.js"
         ],
         "env": {
           "NODE_ENV": "production"
         }
       },
       "php-composer": {
         "command": "node",
         "args": [
           "C:/Users/okunade.y/OneDrive - NLIP Nigeria/Documents/MCP-workspace/php-composer-mcp-server/dist/index.js"
         ],
         "env": {
           "NODE_ENV": "production"
         }
       }
     }
   }
   ```

3. **Save and Restart Claude Desktop**
   - Save the file (Ctrl+S)
   - Completely close Claude Desktop
   - Restart Claude Desktop
   - The MCP servers should now be available

### Verification

After restarting Claude Desktop, you should see the MCP servers connected. You can test by asking:

```
"List all available MCP tools"
```

or

```
"Show me the Laravel Artisan tools available"
```

## 🔌 VS Code MCP Extension

### Installation

1. **Install MCP Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Model Context Protocol" or "MCP"
   - Install the official MCP extension

2. **Configure Workspace**
   Create `.vscode/mcp.json` in your workspace root:

   ```json
   {
     "servers": {
       "laravel-auth-mcp-server": {
         "type": "stdio",
         "command": "node",
         "args": ["./laravel-auth-mcp-server/dist/index.js"],
         "env": {
           "NODE_ENV": "development"
         }
       },
       "database-mcp-server": {
         "type": "stdio",
         "command": "node",
         "args": ["./database-mcp-server/dist/index.js"],
         "env": {
           "NODE_ENV": "development"
         }
       },
       "ssh-filemanager-mcp-server": {
         "type": "stdio",
         "command": "node",
         "args": ["./ssh-filemanager-mcp-server/dist/index.js"],
         "env": {
           "NODE_ENV": "development"
         }
       },
       "hosting-management-mcp-server": {
         "type": "stdio",
         "command": "node",
         "args": ["./hosting-management-mcp-server/dist/index.js"],
         "env": {
           "NODE_ENV": "development"
         }
       },
       "laravel-artisan-mcp-server": {
         "type": "stdio",
         "command": "node",
         "args": ["./laravel-artisan-mcp-server/dist/index.js"],
         "env": {
           "NODE_ENV": "development"
         }
       },
       "php-composer-mcp-server": {
         "type": "stdio",
         "command": "node",
         "args": ["./php-composer-mcp-server/dist/index.js"],
         "env": {
           "NODE_ENV": "development"
         }
       }
     }
   }
   ```

### VS Code Tasks Integration

Each server already has VS Code tasks configured. You can:

1. **Build Servers**: Ctrl+Shift+P → "Tasks: Run Task" → "Build [Server Name]"
2. **Start Servers**: Ctrl+Shift+P → "Tasks: Run Task" → "Start [Server Name]"
3. **Watch Mode**: Ctrl+Shift+P → "Tasks: Run Task" → "Watch [Server Name]"

## 🔧 Custom MCP Client Integration

### Node.js Client Example

```javascript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

async function connectToMCPServer(serverName, scriptPath) {
  // Start the MCP server process
  const serverProcess = spawn('node', [scriptPath], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: process.cwd(),
  });

  // Create transport
  const transport = new StdioClientTransport({
    stdin: serverProcess.stdin,
    stdout: serverProcess.stdout,
  });

  // Create client
  const client = new Client(
    {
      name: `${serverName}-client`,
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  // Connect
  await client.connect(transport);
  
  return { client, serverProcess };
}

// Usage example
async function main() {
  try {
    const { client } = await connectToMCPServer(
      'laravel-auth',
      './laravel-auth-mcp-server/dist/index.js'
    );

    // List available tools
    const tools = await client.request(
      { method: 'tools/list' },
      {}
    );
    
    console.log('Available tools:', tools);

    // Call a tool
    const result = await client.request(
      {
        method: 'tools/call',
        params: {
          name: 'create_user',
          arguments: {
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User'
          }
        }
      },
      {}
    );
    
    console.log('Result:', result);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

### Python Client Example

```python
import asyncio
import json
from pathlib import Path
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def connect_to_mcp_server():
    server_params = StdioServerParameters(
        command="node",
        args=["./laravel-auth-mcp-server/dist/index.js"]
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # Initialize the connection
            await session.initialize()
            
            # List available tools
            tools = await session.list_tools()
            print(f"Available tools: {tools}")
            
            # Call a tool
            result = await session.call_tool(
                "create_user",
                {
                    "email": "test@example.com",
                    "password": "password123", 
                    "name": "Test User"
                }
            )
            print(f"Result: {result}")

if __name__ == "__main__":
    asyncio.run(connect_to_mcp_server())
```

## 🌐 Web Interface Integration

### HTTP Proxy Server

Create a simple HTTP-to-MCP proxy for web interfaces:

```javascript
// http-mcp-proxy.js
import express from 'express';
import cors from 'cors';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { spawn } from 'child_process';

const app = express();
app.use(cors());
app.use(express.json());

const mcpServers = new Map();

// Initialize MCP servers
async function initializeMCPServers() {
  const servers = [
    { name: 'laravel-auth', path: './laravel-auth-mcp-server/dist/index.js' },
    { name: 'database', path: './database-mcp-server/dist/index.js' },
    { name: 'ssh-filemanager', path: './ssh-filemanager-mcp-server/dist/index.js' },
    { name: 'hosting-management', path: './hosting-management-mcp-server/dist/index.js' },
    { name: 'laravel-artisan', path: './laravel-artisan-mcp-server/dist/index.js' },
    { name: 'php-composer', path: './php-composer-mcp-server/dist/index.js' },
  ];

  for (const server of servers) {
    try {
      const serverProcess = spawn('node', [server.path], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      const transport = new StdioClientTransport({
        stdin: serverProcess.stdin,
        stdout: serverProcess.stdout,
      });

      const client = new Client(
        { name: `${server.name}-proxy-client`, version: '1.0.0' },
        { capabilities: {} }
      );

      await client.connect(transport);
      mcpServers.set(server.name, { client, process: serverProcess });
      
      console.log(`✓ Connected to ${server.name}`);
    } catch (error) {
      console.error(`✗ Failed to connect to ${server.name}:`, error);
    }
  }
}

// API endpoints
app.get('/api/servers', (req, res) => {
  const servers = Array.from(mcpServers.keys());
  res.json({ servers });
});

app.get('/api/servers/:server/tools', async (req, res) => {
  try {
    const server = mcpServers.get(req.params.server);
    if (!server) {
      return res.status(404).json({ error: 'Server not found' });
    }

    const tools = await server.client.request({ method: 'tools/list' }, {});
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/servers/:server/tools/:tool', async (req, res) => {
  try {
    const server = mcpServers.get(req.params.server);
    if (!server) {
      return res.status(404).json({ error: 'Server not found' });
    }

    const result = await server.client.request(
      {
        method: 'tools/call',
        params: {
          name: req.params.tool,
          arguments: req.body
        }
      },
      {}
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`HTTP-MCP Proxy running on port ${PORT}`);
  await initializeMCPServers();
  console.log('All MCP servers initialized');
});
```

## 🔍 Testing and Debugging

### Test MCP Server Connections

Create a test script to verify all servers are working:

```javascript
// test-mcp-connections.js
import { spawn } from 'child_process';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const servers = [
  { name: 'Laravel Auth', path: './laravel-auth-mcp-server/dist/index.js' },
  { name: 'Database', path: './database-mcp-server/dist/index.js' },
  { name: 'SSH FileManager', path: './ssh-filemanager-mcp-server/dist/index.js' },
  { name: 'Hosting Management', path: './hosting-management-mcp-server/dist/index.js' },
  { name: 'Laravel Artisan', path: './laravel-artisan-mcp-server/dist/index.js' },
  { name: 'PHP Composer', path: './php-composer-mcp-server/dist/index.js' },
];

async function testServer(name, path) {
  try {
    console.log(`Testing ${name}...`);
    
    const serverProcess = spawn('node', [path], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    const transport = new StdioClientTransport({
      stdin: serverProcess.stdin,
      stdout: serverProcess.stdout,
    });

    const client = new Client(
      { name: `test-client`, version: '1.0.0' },
      { capabilities: {} }
    );

    await client.connect(transport);
    
    // Test tools list
    const tools = await client.request({ method: 'tools/list' }, {});
    console.log(`✓ ${name}: ${tools.tools?.length || 0} tools available`);
    
    // Test resources list  
    const resources = await client.request({ method: 'resources/list' }, {});
    console.log(`✓ ${name}: ${resources.resources?.length || 0} resources available`);
    
    serverProcess.kill();
    return true;
  } catch (error) {
    console.error(`✗ ${name}: ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('Testing MCP Server Connections...\n');
  
  let passed = 0;
  for (const server of servers) {
    const success = await testServer(server.name, server.path);
    if (success) passed++;
    console.log(''); // Empty line
  }
  
  console.log(`\nTest Results: ${passed}/${servers.length} servers passed`);
  
  if (passed === servers.length) {
    console.log('🎉 All MCP servers are working correctly!');
  } else {
    console.log('⚠️  Some MCP servers have issues. Check the logs above.');
  }
}

runTests().catch(console.error);
```

### Run the test:
```bash
node test-mcp-connections.js
```

## 🚨 Troubleshooting

### Common Connection Issues

1. **Server Not Found**
   ```bash
   # Verify server exists and is built
   ls -la laravel-auth-mcp-server/dist/index.js
   
   # Rebuild if necessary
   cd laravel-auth-mcp-server && npm run build
   ```

2. **Permission Denied**
   ```bash
   # On Linux/Mac
   chmod +x laravel-auth-mcp-server/dist/index.js
   
   # On Windows, run as Administrator
   ```

3. **Node.js Not Found**
   ```bash
   # Verify Node.js installation
   node --version
   
   # Update PATH if necessary
   ```

4. **Port Already in Use**
   ```bash
   # Find and kill process using port
   netstat -ano | findstr :3000
   taskkill /PID <process_id> /F
   ```

### Debug Mode

Enable debug logging in MCP servers by setting environment variable:

```bash
# For Windows
set DEBUG=mcp:*
node laravel-auth-mcp-server/dist/index.js

# For Linux/Mac
DEBUG=mcp:* node laravel-auth-mcp-server/dist/index.js
```

### Logs Location

Check logs in these locations:
- **Claude Desktop**: `%APPDATA%\Claude\logs\`
- **MCP Servers**: stderr output (redirect to file for persistence)
- **VS Code**: Output panel → "Model Context Protocol"

## 📋 Configuration Checklist

Before connecting to MCP clients, ensure:

- [ ] All MCP servers are built (`npm run build` in each directory)
- [ ] Node.js is installed and accessible
- [ ] Environment files (`.env`) are configured
- [ ] Database connections are working
- [ ] File paths in client configurations are correct
- [ ] Firewalls/antivirus are not blocking Node.js processes
- [ ] All required dependencies are installed

---

**Note**: Replace the file paths in the configurations with your actual workspace path. The examples use the default workspace location for this setup.