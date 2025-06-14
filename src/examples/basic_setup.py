
from agentiqs import MCPMock, RESTMock

# Mock MCP server
mcp = MCPMock()
mcp.add_tool("weather", returns={"temp": 22})

# Mock REST API
api = RESTMock()
api.get("/users/1", returns={"id": 1, "name": "Alice"})

# Test your AI agent
agent = MyAgent(mcp_server=mcp, api_client=api)
result = agent.process("What's the weather?")

assert "22" in result.response
