import React, { useState, useEffect } from 'react';
import { 
  Code, Database, Cloud, Shield, 
  Server, Network, Activity, Settings,
  Box, GitBranch, ArrowRight, Search,
  BarChart2, CheckCircle, AlertTriangle,
  FileText, Zap, Star 
} from 'lucide-react';

const vendorData = {
  ccaas: [
    {
      id: 1,
      name: 'Genesys',
      logo: '🎯',
      color: 'blue',
      rating: 4.8,
      marketShare: 25,
      apiQuality: 4.9,
      cost: '$$$$'
    },
    {
      id: 2,
      name: 'NICE inContact',
      logo: '🔷',
      color: 'indigo',
      rating: 4.7,
      marketShare: 20,
      apiQuality: 4.7,
      cost: '$$$$'
    }
  ],
  crm: [
    {
      id: 3,
      name: 'Salesforce',
      logo: '☁️',
      color: 'blue',
      rating: 4.9,
      marketShare: 30,
      apiQuality: 4.9,
      cost: '$$$$'
    },
    {
      id: 4,
      name: 'Microsoft Dynamics',
      logo: '⊞',
      color: 'blue',
      rating: 4.7,
      marketShare: 25,
      apiQuality: 4.7,
      cost: '$$$$'
    }
  ],
  analytics: [
    {
      id: 5,
      name: 'Tableau',
      logo: '📊',
      color: 'blue',
      rating: 4.8,
      marketShare: 28,
      apiQuality: 4.7,
      cost: '$$$$'
    },
    {
      id: 6,
      name: 'Power BI',
      logo: '⚡',
      color: 'yellow',
      rating: 4.7,
      marketShare: 25,
      apiQuality: 4.6,
      cost: '$$$'
    }
  ]
};

export default function EnhancedIntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState('ccaas');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = vendorData[selectedCategory] || [];

  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
  };

  const DataFlowAnimation = ({ vendor }) => (
    <div className="relative h-64 bg-gray-50 rounded-lg p-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="animate-pulse bg-blue-500 w-16 h-16 rounded-full" />
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <div className="animate-pulse bg-purple-500 w-16 h-16 rounded-full" />
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <div className="animate-pulse bg-green-500 w-16 h-16 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Integration Hub</h2>
          <p className="text-gray-600 mt-1">Explore and analyze integration options</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Panel - Categories & Vendors */}
        <div className="col-span-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              {Object.keys(vendorData).map((category) => (
                <div key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                      selectedCategory === category
                        ? 'bg-purple-100 text-purple-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.toUpperCase()}
                  </button>
                  {selectedCategory === category && (
                    <div className="mt-2 space-y-1">
                      {vendorData[category].map((vendor) => (
                        <button
                          key={vendor.id}
                          onClick={() => handleVendorSelect(vendor)}
                          className={`w-full px-3 py-2 text-left rounded-lg flex items-center gap-2 ${
                            selectedVendor?.id === vendor.id
                              ? 'bg-purple-50 text-purple-600'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          <span style={{ color: vendor.color }}>{vendor.logo}</span>
                          <span>{vendor.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Details & Visualizations */}
        <div className="col-span-9">
          {selectedVendor ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{selectedVendor.logo}</span>
                    <h3 className="text-xl font-semibold">{selectedVendor.name}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedVendor.rating}</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Market Share</h4>
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedVendor.marketShare}%
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium mb-2">API Quality</h4>
                    <div className="text-2xl font-bold text-green-600">
                      {selectedVendor.apiQuality}
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Cost</h4>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedVendor.cost}
                    </div>
                  </div>
                </div>
              </div>

              <DataFlowAnimation vendor={selectedVendor} />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600">Select a vendor to see details</p>
            </div>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div className="mt-8 text-right">
        <div className="text-sm font-normal text-gray-400">experience is everything</div>
        <div className="text-sm font-normal text-gray-400">Your CX front and centre at</div>
        <div className="text-sm font-medium text-gray-600">cXentral</div>
      </div>
    </div>
  );
}
