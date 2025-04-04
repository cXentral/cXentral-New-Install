import React from 'react';
import { ArrowRight, Shield, Zap, Users, Box } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* Main Content */}
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
                Unify Your CX Stack
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-xl">
              Connect and orchestrate your customer experience tools in minutes, not months. 
              Build seamless integrations with enterprise-grade security.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-rose-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button className="px-6 py-3 text-gray-600 rounded-lg font-medium border hover:bg-gray-50 transition-colors">
                View Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Enterprise-grade Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">Real-time Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-600">500+ Enterprise Users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-rose-100 rounded-2xl opacity-50" />
              
              {/* Integration Blocks */}
              <div className="relative grid grid-cols-2 gap-4 p-8">
                {[
                  { name: 'CRM Systems', count: '15+ Integrations' },
                  { name: 'Analytics Tools', count: '10+ Connectors' },
                  { name: 'Support Platforms', count: '12+ Solutions' },
                  { name: 'Communication Apps', count: '8+ Platforms' }
                ].map((block, index) => (
                  <div 
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Box className="w-6 h-6 text-purple-600 mb-2" />
                    <h3 className="font-medium mb-1">{block.name}</h3>
                    <p className="text-sm text-gray-600">{block.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
