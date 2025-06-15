
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "./CodeBlock";
import { codeExamples } from "../utils/codeExamples";

const Examples = () => {
  return (
    <section id="examples" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-ai-blue mb-6">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore practical examples of how mcp-kit simplifies AI agent development. 
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-ai-blue rounded-lg shadow-2xl overflow-hidden">
            <Tabs defaultValue="basic" className="w-full">
              <div className="flex items-center justify-between px-6 pt-4 pb-2">
                <TabsList className="bg-ai-blue/50 border border-white/20">
                  <TabsTrigger value="basic" className="text-white data-[state=active]:bg-ai-electric data-[state=active]:text-white">
                    {codeExamples.basic.title}
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-ai-electric data-[state=active]:text-white">
                    {codeExamples.advanced.title}
                  </TabsTrigger>
                  <TabsTrigger value="testing" className="text-white data-[state=active]:bg-ai-electric data-[state=active]:text-white">
                    {codeExamples.testing.title}
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
                  <CodeBlock 
                    code={example.code}
                    language="python"
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Examples;
