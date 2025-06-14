
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Github, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero-gradient overflow-hidden pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-ai-electric rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-ai-neon rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-ai-purple rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Agentiqs<span className="text-ai-electric">.ai</span>
            </h1>
            <div className="w-24 h-1 bg-ai-gradient mx-auto rounded-full"></div>
          </div>
          
          {/* Main headline */}
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-200 mb-6 leading-tight">
            Optimize Your AI Agents with
            <span className="block text-ai-neon mt-2">Next-Generation Tooling</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            We're pioneering the future of AI Agent optimization. Start with our open-source Python library 
            for mocking MCP servers, featuring comprehensive OAS3/REST support for seamless development.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-ai-gradient hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
              onClick={() => window.open('https://github.com/agentiqs/mcp-kit', '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              mcp-kit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              className="bg-ai-electric hover:bg-ai-electric/90 text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
              onClick={() => window.location.href = 'mailto:sales@agentiqs.ai?subject=Hosted mcp-kit Inquiry'}
            >
              <Mail className="mr-2 h-5 w-5" />
              Get hosted mcp-kit
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-ai-electric text-ai-electric hover:bg-ai-electric hover:text-white px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300"
              onClick={() => window.open('https://github.com/agentiqs/mcp-kit', '_blank')}
            >
              <Code2 className="mr-2 h-5 w-5" />
              Documentation
            </Button>
          </div>
          
          {/* Tech badges */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              Python
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              MCP Servers
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              OAS3/REST
            </span>
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/20">
              Open Source
            </span>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - enhanced visibility */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-ai-electric rounded-full flex justify-center bg-black/20 backdrop-blur-sm">
          <div className="w-1 h-3 bg-ai-electric rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
