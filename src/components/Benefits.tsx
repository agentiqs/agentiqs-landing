import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, ArrowRight, Sparkles, Mail } from "lucide-react";

const Benefits = () => {
  const benefits = [
    "Reduce development time by 70% with instant mocking",
    "Test AI agents without external API dependencies", 
    "Validate agent behavior in isolated environments",
    "Scale testing across multiple scenarios seamlessly",
    "Integrate with existing Python development workflows",
    "Access comprehensive documentation and examples"
  ];

  const codeExamples = {
    basic: {
      title: "Basic Setup",
      code: `from agentiqs import MCPMock, RESTMock

# Mock MCP server
mcp = MCPMock()
mcp.add_tool("weather", returns={"temp": 22})

# Mock REST API
api = RESTMock()
api.get("/users/1", returns={"id": 1, "name": "Alice"})

# Test your AI agent
agent = MyAgent(mcp_server=mcp, api_client=api)
result = agent.process("What's the weather?")

assert "22" in result.response`
    },
    advanced: {
      title: "Advanced Mocking",
      code: `from agentiqs import MCPMock, scenario

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

assert "sunny" in response.today`
    },
    testing: {
      title: "Testing Framework",
      code: `import pytest
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
        assert "unavailable" in result.lower()`
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-ai-electric/20 rounded-full animate-float"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-ai-purple/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-ai-neon/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <Sparkles className="h-6 w-6 text-ai-electric mr-2" />
                <span className="text-ai-electric font-semibold">Why Choose Agentiqs.ai</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-ai-blue mb-6 leading-tight">
                Accelerate Your AI Agent Development
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Stop waiting for external services and start building. Our mocking library empowers developers 
                to create, test, and optimize AI agents in controlled environments.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-ai-electric mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-ai-gradient hover:opacity-90 text-white px-8 py-6 rounded-full font-semibold"
                onClick={() => window.open('https://github.com/agentiqs/mcp-kit', '_blank')}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                className="bg-ai-electric hover:bg-ai-electric/90 text-white px-8 py-6 rounded-full font-semibold"
                onClick={() => window.location.href = 'mailto:sales@agentiqs.ai?subject=Hosted mcp-kit Inquiry'}
              >
                <Mail className="mr-2 h-5 w-5" />
                Get hosted mcp-kit
              </Button>
            </div>
          </div>
          
          {/* Right side - Tabbed code examples */}
          <div className="relative">
            <div className="bg-ai-blue rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
              <Tabs defaultValue="basic" className="w-full">
                <div className="flex items-center justify-between px-6 pt-4 pb-2">
                  <TabsList className="bg-ai-blue/50 border border-white/20">
                    <TabsTrigger value="basic" className="text-white data-[state=active]:bg-ai-electric data-[state=active]:text-white">
                      Basic
                    </TabsTrigger>
                    <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-ai-electric data-[state=active]:text-white">
                      Advanced
                    </TabsTrigger>
                    <TabsTrigger value="testing" className="text-white data-[state=active]:bg-ai-electric data-[state=active]:text-white">
                      Testing
                    </TabsTrigger>
                  </TabsList>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {Object.entries(codeExamples).map(([key, example]) => (
                  <TabsContent key={key} value={key} className="px-6 pb-6 mt-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-ai-neon font-mono text-sm">{example.title.toLowerCase().replace(' ', '_')}.py</span>
                    </div>
                    <pre className="text-gray-300 font-mono text-sm leading-relaxed overflow-x-auto">
                      {example.code}
                    </pre>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            {/* Floating element */}
            <div className="absolute -top-4 -right-4 bg-ai-gradient p-4 rounded-full shadow-lg animate-glow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
