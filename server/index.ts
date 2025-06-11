import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
    name: "TaskManager",
    version: "1.0.0",
});

const tasks = new Map();
let taskIdCounter = 1;

server.tool(
    "createTask",
    "Create a new task with a title and optional description",
    {
        title: z.string().describe("The title of the task"),
    },
    async ({ title }) => {
        const taskId = taskIdCounter++;
        const task = {
            id: taskId,
            title,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        tasks.set(taskId, task);

        return {
            content: [
                {
                    type: "text",
                    text: `Task successfully created!\n\nID: ${task.id}\nTitle: ${task.title}\nStatus: ${task.status}\nCreated: ${task.createdAt}`,
                },
            ],
        };
    }
);

server.tool("listTasks", "Lists all existing tasks", async () => {
    const taskArr = Array.from(tasks.values());
    return { content: [{ type: "text", text: JSON.stringify(taskArr) }] };
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch((error) => {
    console.error("Server startup failed:", error);
    process.exit(1);
});

process.on("SIGINT", () => {
    console.error("Received SIGINT, shutting down gracefully...");
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.error("Received SIGTERM, shutting down gracefully...");
    process.exit(0);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled rejection at:", promise, "reason:", reason);
    process.exit(1);
});
