
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Github, Mail } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ai-blue mb-6">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started for free with our open-source library, or upgrade to our hosted solution for enterprise features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Open Source */}
          <Card className="border-2 border-gray-200 hover:border-ai-electric/30 transition-colors">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-ai-blue">Open Source: Free Forever</CardTitle>
              <CardDescription className="text-lg">Perfect for individuals and small teams</CardDescription>
              <div className="text-4xl font-bold text-ai-electric mt-4">Free</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Full mcp-kit Python SDK</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Full mcp-kit TypeScript SDK <span className="text-sm text-gray-600">(coming soon)</span></span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>MCP server mocking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>OAS3/REST support</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-ai-electric mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block mb-2">Adapters for all major MCP & Agent SDKs:</span>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <a href="https://github.com/modelcontextprotocol/python-sdk" target="_blank" rel="noopener noreferrer" className="text-ai-electric hover:underline">
                          MCP Python SDK
                        </a> (Server, FastMCP & ClientSession)
                      </div>
                      <div>
                        <a href="https://github.com/jlowin/fastmcp" target="_blank" rel="noopener noreferrer" className="text-ai-electric hover:underline">
                          FastMCP 2.0
                        </a>
                      </div>
                      <div>
                        <a href="https://github.com/openai/openai-agents-python" target="_blank" rel="noopener noreferrer" className="text-ai-electric hover:underline">
                          OpenAI Agents
                        </a>
                      </div>
                      <div>
                        <a href="https://github.com/langchain-ai/langgraph" target="_blank" rel="noopener noreferrer" className="text-ai-electric hover:underline">
                          LangGraph
                        </a>
                      </div>
                      <div>
                        <a href="https://github.com/run-llama/llama_index" target="_blank" rel="noopener noreferrer" className="text-ai-electric hover:underline">
                          LlamaIndex
                        </a>
                      </div>
                      <div>
                        <a href="https://github.com/crewAIInc/crewAI" target="_blank" rel="noopener noreferrer" className="text-ai-electric hover:underline">
                          CrewAI
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Community support</span>
                </div>
              </div>
              <Button 
                className="w-full bg-ai-gradient hover:opacity-90 text-white mt-6"
                onClick={() => window.open('https://github.com/agentiqs/mcp-kit-python', '_blank')}
              >
                <Github className="mr-2 h-4 w-4" />
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Hosted Solution */}
          <Card className="border-2 border-ai-electric bg-gradient-to-br from-white to-ai-electric/5">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-ai-blue">Hosted Solution</CardTitle>
              <CardDescription className="text-lg">Enterprise-ready with premium features</CardDescription>
              <div className="text-4xl font-bold text-ai-electric mt-4">Contact Us</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Everything in Open Source</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Managed cloud infrastructure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>24/7 premium support & SLA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Custom integrations & SDKs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Advanced analytics & monitoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Enterprise security & compliance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Multi-tenant isolation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Auto-scaling & load balancing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Private cloud deployment options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Training & onboarding sessions</span>
                </div>
              </div>
              <Button 
                className="w-full bg-ai-electric hover:bg-ai-electric/90 text-white mt-6"
                onClick={() => window.open('mailto:sales@agentiqs.ai?subject=Hosted mcp-kit Inquiry', '_blank', 'rel=noopener noreferrer')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
