import React, { useState } from 'react';
import { 
  Layout, Box, CircuitBoard, Database, Cloud, Shield,
  Globe, Layers, Settings, Zap, Users, Bot, GitBranch,
  Network, MessageSquare
} from 'lucide-react';

const ArchitectureVisualization = () => {
  const [activeLayer, setActiveLayer] = useState(null);

  const architectureLayers = [
    {
      id: 'presentation',
      name: 'User Interface',
      icon: Layout,
      description: 'Intuitive interfaces for all user types',
      components: ['Dashboard', 'Visual Builder', 'Analytics'],
      color: 'bg-blue-500'
    },
    {
      id: 'integration',
      name: 'Integration Layer',
      icon: Network,
      description: 'Unified API and connector management',
      components: ['API Gateway', 'Connectors', 'Auth Service'],
      color: 'bg-purple-500'
    },
    {
      id: 'core',
      name: 'Core Services',
      icon: CircuitBoard,
      description: 'Essential platform capabilities',
      components: ['Data Transform', 'Workflow Engine', 'Events'],
      color: 'bg-indigo-500'
    },
    {
      id: 'data',
      name: 'Data Layer',
      icon: Database,
      description: 'Secure data management and storage',
      components: ['Cache', 'Storage', 'Analytics'],
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-8">Platform Architecture</h2>
      
      <div className="space-y-8">
        {architectureLayers.map((layer, index) => (
          <div 
            key={layer.id}
            className="relative"
            onMouseEnter={() => setActiveLayer(layer.id)}
            onMouseLeave={() => setActiveLayer(null)}
          >
            {/* Connection Lines */}
            {index < architectureLayers.length - 1 && (
              <div 
                className="absolute left-1/2 h-8 w-px bg-gray-200 -bottom-8"
                style={{
                  opacity: activeLayer === layer.id ? 1 : 0.5,
                  transition: 'opacity 0.3s'
                }}
              />
            )}

            {/* Layer Card */}
            <div className={`
              p-6 rounded-lg border-2 transition-all
              ${activeLayer === layer.id ? 'border-purple-500 shadow-md' : 'border-gray-200'}
            `}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${layer.color}`}>
                  <layer.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{layer.name}</h3>
                  <p className="text-gray-600 text-sm">{layer.description}</p>
                </div>
              </div>

              {/* Components Grid */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {layer.components.map((component, idx) => (
                  <div 
                    key={idx}
                    className={`
                      p-3 rounded-lg border text-center
                      ${activeLayer === layer.id ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}
                    `}
                  >
                    <span className="text-sm font-medium">{component}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: Cloud, text: 'Cloud Native' },
            { icon: Shield, text: 'Enterprise Security' },
            { icon: Zap, text: 'Real-time Capable' },
            { icon: Users, text: 'Multi-tenant' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <item.icon className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchitectureVisualization;
