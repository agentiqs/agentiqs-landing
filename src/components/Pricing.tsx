
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Github, Mail } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-ai-blue mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started for free with our open-source library, or upgrade to our hosted solution for enterprise features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Open Source */}
          <Card className="border-2 border-gray-200 hover:border-ai-electric/30 transition-colors">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-ai-blue">Open Source</CardTitle>
              <CardDescription className="text-lg">Perfect for individuals and small teams</CardDescription>
              <div className="text-4xl font-bold text-ai-electric mt-4">Free</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Full mcp-kit Python library</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>MCP server mocking</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>OAS3/REST support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Community support</span>
                </div>
              </div>
              <Button 
                className="w-full bg-ai-gradient hover:opacity-90 text-white mt-6"
                onClick={() => window.open('https://github.com/agentiqs/mcp-kit', '_blank')}
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
                  <span>Managed infrastructure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Premium support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-ai-electric" />
                  <span>Custom integrations</span>
                </div>
              </div>
              <Button 
                className="w-full bg-ai-electric hover:bg-ai-electric/90 text-white mt-6"
                onClick={() => window.location.href = 'mailto:sales@agentiqs.ai?subject=Hosted mcp-kit Inquiry'}
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
