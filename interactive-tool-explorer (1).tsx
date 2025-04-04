import React, { useState } from 'react';
import { 
  Search,
  ChevronRight,
  Star,
  ArrowRight,
  Check,
  ArrowUpRight
} from 'lucide-react';

const InteractiveToolExplorer = () => {
  const [viewMode, setViewMode] = useState('explore'); // explore, compare, detail
  const [selectedTools, setSelectedTools] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [filterSettings, setFilterSettings] = useState({
    priceRange: 'all',
    complexity: 'all',
    deploymentType: 'all'
  });

  // Tool Card Component
  const ToolCard = ({ tool }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{tool.name}</h3>
          <p className="text-gray-600">{tool.category}</p>
        </div>
        <Star className="w-5 h-5 text-blue-500" />
      </div>
      
      <p className="text-gray-600 mb-4">{tool.description}</p>

      <div className="space-y-4">
        {/* Features */}
        <div>
          <h4 className="font-medium mb-2">Key Features</h4>
          <ul className="space-y-2">
            {tool.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-600">
                <Check className="w-4 h-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Implementation Info */}
        <div>
          <h4 className="font-medium mb-2">Implementation</h4>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-sm text-gray-500">Timeline</span>
                <p className="font-medium">{tool.implementation.timeline}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Complexity</span>
                <p className="font-medium">{tool.implementation.complexity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-4">
          <button 
            onClick={() => setActiveTool(tool)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <span>Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setSelectedTools([...selectedTools, tool])}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
          >
            <span>Compare</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Filter Panel
  const FilterPanel = () => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Filter Tools</h3>
        <Search className="w-5 h-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={filterSettings.priceRange}
            onChange={(e) => setFilterSettings({
              ...filterSettings,
              priceRange: e.target.value
            })}
          >
            <option value="all">All Prices</option>
            <option value="free">Free</option>
            <option value="low">$1 - $100</option>
            <option value="medium">$101 - $500</option>
            <option value="high">$500+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Complexity</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={filterSettings.complexity}
            onChange={(e) => setFilterSettings({
              ...filterSettings,
              complexity: e.target.value
            })}
          >
            <option value="all">All Levels</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deployment</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={filterSettings.deploymentType}
            onChange={(e) => setFilterSettings({
              ...filterSettings,
              deploymentType: e.target.value
            })}
          >
            <option value="all">All Types</option>
            <option value="cloud">Cloud</option>
            <option value="onprem">On-Premise</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Comparison View
  const ComparisonView = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Tool Comparison</h3>
        <button 
          onClick={() => setSelectedTools([])}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-3 bg-gray-50">Feature</th>
              {selectedTools.map(tool => (
                <th key={tool.id} className="text-left p-3 bg-gray-50">
                  {tool.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['Features', 'Pricing', 'Implementation', 'Support'].map(category => (
              <tr key={category} className="border-t">
                <td className="p-3 font-medium">{category}</td>
                {selectedTools.map(tool => (
                  <td key={tool.id} className="p-3">
                    <Check className="w-4 h-4 text-green-500" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">cXentral Tool Explorer</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setViewMode('explore')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'explore' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100'
            }`}
          >
            Explore Tools
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={`px-4 py-2 rounded-lg ${
              viewMode === 'compare' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100'
            }`}
          >
            Compare ({selectedTools.length})
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel />

      {/* Main Content */}
      <div className="space-y-6">
        {viewMode === 'explore' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample tool cards - replace with actual data */}
            <ToolCard 
              tool={{
                id: 1,
                name: "Sample Tool",
                category: "Analytics",
                description: "A powerful analytics platform",
                features: ["Real-time analytics", "Custom dashboards"],
                implementation: {
                  timeline: "2-4 weeks",
                  complexity: "Medium"
                }
              }} 
            />
          </div>
        ) : (
          <ComparisonView />
        )}
      </div>
    </div>
  );
};

export default InteractiveToolExplorer;
