import React, { useState } from 'react';
import { 
  Box, 
  Code,
  Cloud,
  Database,
  Shield,
  Activity
} from 'lucide-react';

const InteractiveLandscape = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredTool, setHoveredTool] = useState(null);

  const categories = {
    development: {
      title: 'CX Development Studio',
      tools: [
        { id: 'vscode', name: 'Visual Studio Code', icon: Code },
        { id: 'webstorm', name: 'WebStorm', icon: Code },
        { id: 'eclipse', name: 'Eclipse', icon: Code },
        { id: 'cloudide', name: 'Cloud IDE', icon: Cloud }
      ]
    },
    connect: {
      title: 'cXonnect Hub',
      tools: [
        { id: 'ccaas', name: 'CCaaS Integration', icon: Cloud },
        { id: 'cpaas', name: 'CPaaS Services', icon: Cloud },
        { id: 'marketplace', name: 'Marketplace', icon: Box },
        { id: 'api', name: 'API Gateway', icon: Activity }
      ]
    },
    compute: {
      title: 'Compute Resources',
      tools: [
        { id: 'kubernetes', name: 'Kubernetes', icon: Cloud },
        { id: 'docker', name: 'Docker', icon: Box },
        { id: 'serverless', name: 'Serverless', icon: Cloud }
      ]
    },
    data: {
      title: 'Data Services',
      tools: [
        { id: 'timedb', name: 'Time Series DB', icon: Database },
        { id: 'docstore', name: 'Document Store', icon: Database },
        { id: 'cache', name: 'Cache', icon: Database },
        { id: 'queue', name: 'Message Queue', icon: Database }
      ]
    },
    security: {
      title: 'Security & Compliance',
      tools: [
        { id: 'iam', name: 'IAM', icon: Shield },
        { id: 'encryption', name: 'Encryption', icon: Shield },
        { id: 'threat', name: 'Threat Detection', icon: Shield },
        { id: 'compliance', name: 'Compliance', icon: Shield }
      ]
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Platform Landscape</h1>
        <p className="text-gray-600">
          Explore our comprehensive platform capabilities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categories).map(([key, category]) => (
          <div 
            key={key}
            className={`p-6 rounded-lg border-2 transition-all
              ${activeCategory === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
              hover:border-blue-300 cursor-pointer`}
            onClick={() => setActiveCategory(key)}
            onMouseEnter={() => setActiveCategory(key)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <h2 className="text-xl font-bold mb-4">{category.title}</h2>
            <div className="grid grid-cols-2 gap-4">
              {category.tools.map(tool => {
                const IconComponent = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className={`flex items-center gap-2 p-2 rounded
                      ${hoveredTool === tool.id ? 'bg-blue-100' : 'hover:bg-gray-100'}
                      transition-all`}
                    onMouseEnter={() => setHoveredTool(tool.id)}
                    onMouseLeave={() => setHoveredTool(null)}
                  >
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Data Flow Legend */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="font-bold mb-4">Data Flow Legend</h3>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Control Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Data Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Event Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Security Flow</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-gray-600">
        Powered by cXentral® | cXonnect Hub™ | © 2024 cXentral. All rights reserved.
      </div>
    </div>
  );
};

export default InteractiveLandscape;
