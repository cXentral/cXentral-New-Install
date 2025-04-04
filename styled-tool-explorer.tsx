import React, { useState } from 'react';
import { 
  Search,
  ArrowRight,
  Check,
  Star,
  Grid,
  List,
  Filter
} from 'lucide-react';

const StyledToolExplorer = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTools, setSelectedTools] = useState([]);

  const ToolCard = ({ tool }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl border border-indigo-50">
      {/* Enhanced Header with Gradient */}
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-cyan-500">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm">
              {tool.category}
            </span>
            <h3 className="text-xl font-bold mt-2 text-white">{tool.name}</h3>
          </div>
          <Star className="w-5 h-5 text-yellow-300" />
        </div>
        <p className="text-indigo-100">{tool.description}</p>
      </div>

      {/* Enhanced Features Section */}
      <div className="p-6">
        <h4 className="font-medium mb-3 text-indigo-900">Key Features</h4>
        <ul className="space-y-2">
          {tool.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-gray-700">
              <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                <Check className="w-3 h-3 text-indigo-600" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Enhanced Integration Info */}
      <div className="p-6 border-t border-indigo-50">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-3 rounded-lg">
            <span className="text-sm text-indigo-600 font-medium">Timeline</span>
            <p className="text-indigo-900 font-semibold">{tool.implementation.timeline}</p>
          </div>
          <div className="bg-cyan-50 p-3 rounded-lg">
            <span className="text-sm text-cyan-600 font-medium">Complexity</span>
            <p className="text-cyan-900 font-semibold">{tool.implementation.complexity}</p>
          </div>
        </div>
      </div>

      {/* Enhanced Actions */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 flex gap-2">
        <button className="flex-1 px-4 py-2 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50 text-indigo-600 font-medium transition-all">
          Documentation
        </button>
        <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-all">
          Add to Compare
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-indigo-900">Tool Explorer</h1>
              <p className="text-indigo-600">Discover and compare platform tools</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'text-gray-400 hover:text-indigo-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' 
                    ? 'bg-indigo-100 text-indigo-600' 
                    : 'text-gray-400 hover:text-indigo-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Enhanced Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              placeholder="Search tools, features, or categories..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Enhanced Category Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-indigo-100">
          <div className="flex flex-wrap gap-3">
            {['All', 'Development', 'Integration', 'Security', 'Analytics'].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeCategory === category.toLowerCase() 
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md' 
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
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
          <ToolCard 
            tool={{
              name: "Integration Platform",
              category: "Integration",
              description: "Enterprise-grade integration solution with advanced capabilities",
              features: [
                "API Management",
                "Data Transformation",
                "Event Processing",
                "Workflow Automation"
              ],
              implementation: {
                timeline: "2-4 weeks",
                complexity: "Medium"
              }
            }}
          />
        </div>

        {/* Enhanced Footer */}
        <div className="mt-8 pt-4 border-t border-indigo-100 text-center">
          <p className="text-indigo-600 font-medium">
            Powered by cXentral® | cXonnect Hub™ | © 2024 cXentral. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StyledToolExplorer;
