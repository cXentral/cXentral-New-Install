import React, { useState } from 'react';
import { 
  Search,
  ArrowRight,
  Check,
  Star
} from 'lucide-react';

const EnhancedToolExplorer = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTools, setSelectedTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Enhanced Tool Card
  const ToolCard = ({ tool }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
      {/* Tool Header */}
      <div className="p-6 border-b">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {tool.category}
            </span>
            <h3 className="text-xl font-bold mt-2">{tool.name}</h3>
          </div>
          <Star className="w-5 h-5 text-yellow-400" />
        </div>
        <p className="text-gray-600">{tool.description}</p>
      </div>

      {/* Features Section */}
      <div className="p-6 bg-gray-50">
        <h4 className="font-medium mb-3">Key Features</h4>
        <ul className="space-y-2">
          {tool.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-700">
              <Check className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Integration Info */}
      <div className="p-6 border-t">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Integration Time</span>
            <p className="font-medium">{tool.implementation.timeline}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Complexity</span>
            <p className="font-medium">{tool.implementation.complexity}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 bg-gray-50 border-t flex gap-2">
        <button 
          onClick={() => window.open(tool.documentation)}
          className="flex-1 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
        >
          Documentation
        </button>
        <button 
          onClick={() => setSelectedTools([...selectedTools, tool])}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add to Compare
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header with Search */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tool Explorer</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
              }`}
            >
              Grid View
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg ${
                viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
              }`}
            >
              List View
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools, features, or categories..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-wrap gap-3">
          {['All', 'Development', 'Integration', 'Security', 'Analytics'].map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category.toLowerCase())}
              className={`px-4 py-2 rounded-lg transition-all
                ${activeCategory === category.toLowerCase() 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Grid */}
      <div className={`grid ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
        } gap-6`}
      >
        {/* Example Tool Card */}
        <ToolCard 
          tool={{
            name: "Sample Integration Tool",
            category: "Integration",
            description: "Powerful integration platform for enterprise needs",
            features: [
              "API Management",
              "Data Transformation",
              "Event Processing"
            ],
            implementation: {
              timeline: "2-4 weeks",
              complexity: "Medium"
            },
            documentation: "#"
          }}
        />
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t text-center text-gray-600">
        Powered by cXentral® | cXonnect Hub™ | © 2024 cXentral. All rights reserved.
      </div>
    </div>
  );
};

export default EnhancedToolExplorer;
