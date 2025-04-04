import React, { useState } from 'react';
import { 
  Layout, 
  Settings, 
  Cloud, 
  Database, 
  Shield, 
  Server, 
  ArrowRight,
  GitBranch,
  Wrench
} from 'lucide-react';

const CXentralCatalog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toolCategories = {
    communication: {
      name: 'Communication Platforms',
      icon: Layout,
      subcategories: {
        ccaas: {
          name: 'Contact Center Solutions',
          tools: [
            {
              id: 'genesys',
              name: 'Genesys Cloud CX',
              description: 'Enterprise-grade CCaaS platform',
              features: ['Omnichannel routing', 'AI-powered interactions', 'WFO'],
              implementation: {
                timeline: '8-12 weeks',
                complexity: 'High',
                requirements: ['Cloud infrastructure', 'Network setup', 'Security compliance']
              }
            },
            {
              id: 'nicecxone',
              name: 'NICE CXone',
              description: 'Cloud native customer experience platform',
              features: ['Digital omnichannel', 'Workforce engagement', 'Analytics'],
              implementation: {
                timeline: '6-10 weeks',
                complexity: 'Medium',
                requirements: ['Cloud setup', 'Integration planning', 'User training']
              }
            },
            {
              id: 'five9',
              name: 'Five9',
              description: 'Intelligent cloud contact center',
              features: ['Voice', 'Digital channels', 'AI assistance'],
              implementation: {
                timeline: '4-8 weeks',
                complexity: 'Medium',
                requirements: ['Network assessment', 'Integration mapping']
              }
            }
          ]
        },
        cpaas: {
          name: 'Communication APIs',
          tools: [
            {
              id: 'twilio',
              name: 'Twilio',
              description: 'Cloud communications platform',
              features: ['Voice', 'Messaging', 'Video', 'Email'],
              implementation: {
                timeline: '2-4 weeks',
                complexity: 'Medium',
                requirements: ['API setup', 'Network configuration']
              }
            },
            {
              id: 'vonage',
              name: 'Vonage Communications APIs',
              description: 'Programmable communications',
              features: ['Voice', 'Messages', 'Verification'],
              implementation: {
                timeline: '2-4 weeks',
                complexity: 'Medium',
                requirements: ['API credentials', 'Network setup']
              }
            }
          ]
        }
      }
    },
    analytics: {
      name: 'Analytics & Intelligence',
      icon: Database,
      subcategories: {
        cx_analytics: {
          name: 'CX Analytics',
          tools: [
            {
              id: 'medallia',
              name: 'Medallia',
              description: 'Experience analytics platform',
              features: ['Journey analytics', 'Voice of customer', 'Predictive insights'],
              implementation: {
                timeline: '12-16 weeks',
                complexity: 'High',
                requirements: ['Data integration', 'User mapping', 'Process design']
              }
            },
            {
              id: 'qualtrics',
              name: 'Qualtrics XM',
              description: 'Experience management platform',
              features: ['Experience data', 'Analytics', 'Action planning'],
              implementation: {
                timeline: '8-12 weeks',
                complexity: 'High',
                requirements: ['Data strategy', 'Integration planning']
              }
            }
          ]
        }
      }
    },
    automation: {
      name: 'Automation & Workflow',
      icon: Settings,
      subcategories: {
        rpa: {
          name: 'Robotic Process Automation',
          tools: [
            {
              id: 'uipath',
              name: 'UiPath',
              description: 'Enterprise automation platform',
              features: ['Process automation', 'AI/ML', 'Analytics'],
              implementation: {
                timeline: '8-12 weeks',
                complexity: 'High',
                requirements: ['Process mapping', 'Infrastructure setup']
              }
            }
          ]
        }
      }
    }
  };

  const renderToolCard = (tool) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{tool.name}</h3>
          <p className="text-gray-600">{tool.description}</p>
        </div>
        <Wrench className="w-6 h-6 text-blue-500" />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Key Features</h4>
          <ul className="space-y-1">
            {tool.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-2">Implementation</h4>
          <div className="bg-gray-50 rounded p-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Timeline:</span>
                <p>{tool.implementation.timeline}</p>
              </div>
              <div>
                <span className="text-gray-500">Complexity:</span>
                <p>{tool.implementation.complexity}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-2">
          <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            View Details
          </button>
          <button className="flex-1 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50">
            Compare
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">cXentral Platform Tools</h1>
        <p className="text-gray-600">
          Comprehensive toolkit for building exceptional customer experiences
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tools, features, or categories..."
            className="w-full px-4 py-3 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries(toolCategories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${activeCategory === key 
                  ? 'bg-blue-100 text-blue-700' 
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
        {activeCategory !== 'all' && 
          Object.values(toolCategories[activeCategory].subcategories)
            .flatMap(subcategory => subcategory.tools)
            .filter(tool => 
              tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              tool.description.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(tool => renderToolCard(tool))
        }
      </div>
    </div>
  );
};

export default CXentralCatalog;
