import { runMcpServer as startServer } from "@uishelf/mcp";

export async function runMcpServer() {
  await startServer(process.cwd());
}
