
from agentiqs import MCPMock, scenario

# Create complex scenarios
@scenario("weather_service")
def weather_scenario():
    mcp = MCPMock()
    mcp.add_tool("current_weather", 
                returns={"temp": 25, "condition": "sunny"})
    mcp.add_tool("forecast", 
                returns={"next_3_days": ["sunny", "rainy", "cloudy"]})
    return mcp

# Test with dynamic responses
mcp = weather_scenario()
agent = WeatherAgent(mcp_server=mcp)
response = agent.get_weekly_forecast()

assert "sunny" in response.today
