
import pytest
from agentiqs import MCPMock, test_suite

class TestWeatherAgent:
    def setup_method(self):
        self.mcp = MCPMock()
        self.agent = WeatherAgent(mcp_server=self.mcp)
    
    @test_suite.scenario("sunny_day")
    def test_sunny_weather_response(self):
        self.mcp.add_tool("weather", 
                         returns={"temp": 28, "sunny": True})
        
        result = self.agent.process("Is it sunny?")
        assert "yes" in result.lower()
    
    def test_error_handling(self):
        self.mcp.add_tool("weather", raises=TimeoutError)
        result = self.agent.process("What's the weather?")
        assert "unavailable" in result.lower()
