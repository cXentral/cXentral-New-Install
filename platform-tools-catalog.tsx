import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, ExternalLink } from 'lucide-react';

const PlatformToolsCatalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const categories = [
    { id: 'developer', name: 'Developer Control Plane', count: 12 },
    { id: 'integration', name: 'Integration & Delivery Plane', count: 15 },
    { id: 'resource', name: 'Resource Plane', count: 8 },
    { id: 'monitoring', name: 'Monitoring & Logging Plane', count: 10 },
    { id: 'security', name: 'Security Plane', count: 7 },
    { id: 'other', name: 'Other Tools', count: 5 }
  ];

  // Sample tools data structure
  const tools = [
    {
      id: 'humanitec',
      name: 'Humanitec',
      category: 'integration',
      type: 'Platform Orchestrator',
      description: 'Dynamic Internal Developer Platform enablement',
      features: ['Workflow automation', 'Resource management', 'Integration hub'],
      complexity: 'Medium',
      integration: {
        effort: 'Medium',
        documentation: 'Comprehensive',
        support: '24/7 Enterprise'
      },
      useCases: [
        'Automated resource provisioning',
        'Workflow standardization',
        'Multi-cloud deployment'
      ]
    },
    {
      id: 'backstage',
      name: 'Backstage.io',
      category: 'developer',
      type: 'Developer Portal/Service Catalog',
      description: 'Open platform for building developer portals',
      features: ['Service catalog', 'Tech docs', 'Plugin ecosystem'],
      complexity: 'High',
      integration: {
        effort: 'High',
        documentation: 'Extensive',
        support: 'Community + Enterprise'
      },
      useCases: [
        'Developer portal creation',
        'Service documentation',
        'Team collaboration'
      ]
    }
    // Additional tools would be added here
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Platform Tools Catalog</h1>
        <p className="text-gray-600">
          Explore and compare tools for your platform engineering needs
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[300px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-all
                ${selectedCategory === category.id 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{tool.name}</h3>
                <p className="text-sm text-gray-600">{tool.type}</p>
              </div>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>

            <p className="text-gray-700 mb-4">{tool.description}</p>

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Key Features</h4>
              <ul className="space-y-1">
                {tool.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Integration Details */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Integration</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Effort: {tool.integration.effort}</div>
                <div>Support: {tool.integration.support}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
                Learn More
              </button>
              <button className="flex-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformToolsCatalog;
