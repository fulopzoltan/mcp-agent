To build the project run `pnpm build`

After you have downloaded Claude Desktop (or any LLM that supports tooling), in the claude_desktop_config.json you need to link your server like this
```
{
    "mcpServers": {
        "taskManager": { 
            "command": "/Users/zoltanfulop/.nvm/versions/node/v22.14.0/bin/node", // this is a path to node, with the "which node" command you can find it
            "args": ["/Users/zoltanfulop/Documents/projects/mcp-agent/dist/index.js"] // this is the path to the built server
        }
    }
}
```
