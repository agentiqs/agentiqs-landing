
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Server, Zap, Shield, Cog, Rocket } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Server className="h-8 w-8 text-ai-electric" />,
      title: "MCP Server Mocking",
      description: "Mock Model Context Protocol servers with ease, enabling rapid development and testing of AI agents without external dependencies."
    },
    {
      icon: <Code className="h-8 w-8 text-ai-neon" />,
      title: "OAS3/REST Support",
      description: "Comprehensive OpenAPI Specification 3.0 and REST API mocking capabilities for complete API simulation and testing."
    },
    {
      icon: <Zap className="h-8 w-8 text-ai-purple" />,
      title: "Lightning Fast",
      description: "Optimized Python library designed for performance, allowing you to iterate quickly on AI agent development and testing."
    },
    {
      icon: <Shield className="h-8 w-8 text-ai-electric" />,
      title: "Type Safe",
      description: "Full TypeScript-style type hints and validation ensuring your mocked services behave predictably and catch errors early."
    },
    {
      icon: <Cog className="h-8 w-8 text-ai-neon" />,
      title: "Highly Configurable",
      description: "Flexible configuration options to match your specific use case, from simple mocks to complex behavioral simulations."
    },
    {
      icon: <Rocket className="h-8 w-8 text-ai-purple" />,
      title: "Production Ready",
      description: "Battle-tested in production environments, with comprehensive documentation and community support for enterprise use."
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-ai-gradient rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-ai-gradient rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ai-blue mb-6">
            Powerful Features for AI Development
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our open-source Python library provides everything you need to mock, test, and optimize your AI agents efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 hover:border-ai-electric/30"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gray-50 rounded-full group-hover:bg-ai-electric/10 transition-colors duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-ai-blue group-hover:text-ai-electric transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
