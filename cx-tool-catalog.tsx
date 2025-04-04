import React, { useState } from 'react';
import { 
  Phone, MessageSquare, BarChart, Database, 
  Users, Brain, Cloud, Layout, Radio,
  Activity, Heart, Shield, Zap
} from 'lucide-react';

const CXPlatformCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);

  const categories = [
    {
      id: 'channels',
      name: 'Communication Channels',
      icon: Radio,
      description: 'Customer interaction touchpoints',
      tools: [
        {
          id: 'ccaas',
          name: 'Contact Center Solutions',
          type: 'CCaaS',
          capabilities: [
            'Omnichannel routing',
            'Agent workspace',
            'Quality management',
            'Workforce optimization'
          ],
          integrations: ['CPaaS', 'CDP', 'Analytics'],
          vendors: ['Genesys', 'NICE CXone', 'Five9']
        },
        {
          id: 'cpaas',
          name: 'Communication Platform',
          type: 'CPaaS',
          capabilities: [
            'Voice services',
            'SMS/MMS',
            'Video',
            'Chat capabilities'
          ],
          integrations: ['CCaaS', 'CDP', 'Analytics'],
          vendors: ['Twilio', 'Vonage', 'MessageBird']
        }
      ]
    },
    {
      id: 'data',
      name: 'Customer Data Management',
      icon: Database,
      description: 'Unified customer data platform',
      tools: [
        {
          id: 'cdp',
          name: 'Customer Data Platform',
          type: 'CDP',
          capabilities: [
            'Customer profile unification',
            'Segment management',
            'Journey orchestration',
            'Real-time activation'
          ],
          integrations: ['Analytics', 'CCaaS', 'Marketing'],
          vendors: ['Segment', 'Twilio Segment', 'Adobe Real-time CDP']
        }
      ]
    },
    {
      id: 'analytics',
      name: 'Analytics & Intelligence',
      icon: BarChart,
      description: 'Customer insights and analysis',
      tools: [
        {
          id: 'cx-analytics',
          name: 'CX Analytics Platform',
          type: 'Analytics',
          capabilities: [
            'Journey analytics',
            'Sentiment analysis',
            'Predictive analytics',
            'Performance monitoring'
          ],
          integrations: ['CDP', 'CCaaS', 'VoC'],
          vendors: ['Qualtrics', 'Medallia', 'NICE Nexidia']
        },
        {
          id: 'real-time-analytics',
          name: 'Real-time Analytics',
          type: 'Real-time',
          capabilities: [
            'Live sentiment analysis',
            'Real-time decisioning',
            'Interaction analytics',
            'Agent assistance'
          ],
          integrations: ['CCaaS', 'CDP'],
          vendors: ['NICE Enlighten', 'Clarabridge', 'CallMiner']
        }
      ]
    },
    {
      id: 'experience',
      name: 'Experience Management',
      icon: Heart,
      description: 'Voice of Customer & Experience',
      tools: [
        {
          id: 'voc',
          name: 'Voice of Customer',
          type: 'VoC',
          capabilities: [
            'Survey management',
            'Feedback collection',
            'Response analysis',
            'Action management'
          ],
          integrations: ['Analytics', 'CDP'],
          vendors: ['Medallia', 'Qualtrics', 'InMoment']
        }
      ]
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure & Integration',
      icon: Cloud,
      description: 'Platform infrastructure components',
      tools: [
        {
          id: 'integration-layer',
          name: 'Integration Platform',
          type: 'iPaaS',
          capabilities: [
            'API management',
            'Data integration',
            'Process automation',
            'Event processing'
          ],
          integrations: ['All platform components'],
          vendors: ['MuleSoft', 'Boomi', 'Workato']
        }
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">CX Platform Tool Catalog</h1>
        <p className="text-gray-600">
          Comprehensive toolkit for building exceptional customer experiences
        </p>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${activeCategory === category.id 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tool Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories
          .filter(cat => activeCategory === 'all' || cat.id === activeCategory)
          .map(category => category.tools.map(tool => (
            <div
              key={tool.id}
              className="bg-white rounded-lg shadow-lg border p-6 cursor-pointer hover:shadow-xl transition-all"
              onClick={() => setSelectedTool(selectedTool === tool.id ? null : tool.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <category.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                  <p className="text-sm text-gray-600">{tool.type}</p>
                </div>
              </div>

              {selectedTool === tool.id && (
                <div className="mt-4 space-y-4">
                  {/* Capabilities */}
                  <div>
                    <h4 className="font-medium mb-2">Key Capabilities</h4>
                    <ul className="space-y-1">
                      {tool.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Integrations */}
                  <div>
                    <h4 className="font-medium mb-2">Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.integrations.map((integration, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vendors */}
                  <div>
                    <h4 className="font-medium mb-2">Key Vendors</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.vendors.map((vendor, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {vendor}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )))}
      </div>
    </div>
  );
};

export default CXPlatformCatalog;
