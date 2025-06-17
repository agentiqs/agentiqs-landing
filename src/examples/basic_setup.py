from mcp_kit import ProxyMCP


async def main():
    # Create proxy from configuration
    proxy = ProxyMCP.from_config("proxy_config.yaml")

    # Use with MCP client session adapter
    async with proxy.client_session_adapter() as session:
        tools = await session.list_tools()
        result = await session.call_tool("getPetById", {"petId": "777"})
        print(result.content[0].text)


if __name__ == "__main__":
    import asyncio

    asyncio.run(main())
