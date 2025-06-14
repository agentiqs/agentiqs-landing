
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-ai-blue text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Agentiqs<span className="text-ai-electric">.ai</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Pioneering the future of AI Agent optimization with open-source tools and cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-ai-electric transition-colors duration-300">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-ai-electric transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-ai-electric transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-ai-electric transition-colors duration-300">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Product links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Python Library</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Examples</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">API Reference</a></li>
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Agentiqs.ai. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors duration-300">License</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
