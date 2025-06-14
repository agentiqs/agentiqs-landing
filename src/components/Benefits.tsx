
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Mail } from "lucide-react";

const Benefits = () => {
  const benefits = [
    "Reduce development time by 70% with instant mocking",
    "Test AI agents without external API dependencies", 
    "Validate agent behavior in isolated environments",
    "Scale testing across multiple scenarios seamlessly",
    "with the most popular Python Agent SDKs",
  ];

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
              <h2 className="text-4xl md:text-5xl font-bold text-ai-blue mb-6 leading-tight">
                Why Choose Agentiqs.ai
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
          
          {/* Right side - Visual or additional content */}
          <div className="relative">
            <div className="bg-ai-blue rounded-lg shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to accelerate your development?</h3>
              <p className="text-ai-neon mb-6">
                Join a growing number of developers who are already using mcp-kit to streamline their AI agent workflows.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-ai-electric" />
                  <span>2-minute setup</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-ai-electric" />
                  <span>Zero configuration required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-ai-electric" />
                  <span>Production-ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
