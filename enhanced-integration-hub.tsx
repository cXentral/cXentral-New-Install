import React, { useState } from 'react';
import { 
  Server, Database, Cloud, Shield, Network, Activity,
  Settings, Search, BarChart2, ArrowRight, Star,
  Users, Clock, Check, AlertTriangle
} from 'lucide-react';

const vendorCategories = {
  ccaas: {
    name: 'CCaaS',
    icon: Server,
    vendors: [
      {
        name: 'Genesys',
        logo: <Cloud className="w-8 h-8 text-blue-600" />,
        rating: 4.8,
        marketShare: 25,
        apiQuality: 4.9,
        cost: '$$$$',
        features: ['Omnichannel', 'AI', 'WFO']
      },
      {
        name: 'NICE inContact',
        logo: <Server className="w-8 h-8 text-indigo-600" />,
        rating: 4.7,
        marketShare: 20,
        apiQuality: 4.7,
        cost: '$$$$',
        features: ['Voice', 'Digital', 'Analytics']
      }
    ]
  },
  xm: {
    name: 'Experience Management',
    icon: Activity,
    vendors: [
      {
        name: 'Qualtrics',
        logo: <Database className="w-8 h-8 text-purple-600" />,
        rating: 4.9,
        marketShare: 30,
        apiQuality: 4.8,
        cost: '$$$$',
        features: ['Surveys', 'Analytics', 'Text Analysis']
      },
      {
        name: 'Medallia',
        logo: <Star className="w-8 h-8 text-yellow-600" />,
        rating: 4.8,
        marketShare: 25,
        apiQuality: 4.7,
        cost: '$$$$',
        features: ['Voice of Customer', 'Text Analytics', 'Insights']
      }
    ]
  },
  cpaas: {
    name: 'CPaaS',
    icon: Network,
    vendors: [
      {
        name: 'Twilio',
        logo: <Cloud className="w-8 h-8 text-red-600" />,
        rating: 4.9,
        marketShare: 35,
        apiQuality: 4.9,
        cost: '$$$',
        features: ['Voice', 'SMS', 'Video']
      },
      {
        name: 'Vonage',
        logo: <Network className="w-8 h-8 text-blue-600" />,
        rating: 4.7,
        marketShare: 20,
        apiQuality: 4.8,
        cost: '$$$',
        features: ['Communications APIs', 'Voice', 'Messaging']
      }
    ]
  }
};

export default function EnhancedIntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState('ccaas');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const DataFlowVisualization = ({ vendor }) => (
    <div className="relative h-64 bg-gray-50 rounded-lg p-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center space-x-8">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse" />
            <Check className="absolute -top-2 -right-2 w-6 h-6 text-green-500" />
          </div>
          <ArrowRight className="w-8 h-8 text-gray-400" />
          <div className="relative">
            <div className="w-16 h-16 bg-purple-500 rounded-full animate-pulse" />
            <Activity className="absolute -top-2 -right-2 w-6 h-6 text-blue-500" />
          </div>
          <ArrowRight className="w-8 h-8 text-gray-400" />
          <div className="relative">
            <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse" />
            <Shield className="absolute -top-2 -right-2 w-6 h-6 text-purple-500" />
          </div>
        </div>
      </div>
    </div>
  );

  const VendorMetrics = ({ vendor }) => (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium">Market Share</span>
        </div>
        <div className="text-2xl font-bold text-blue-600">{vendor.marketShare}%</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-5 h-5 text-purple-600" />
          <span className="font-medium">API Quality</span>
        </div>
        <div className="text-2xl font-bold text-purple-600">{vendor.apiQuality}</div>
      </div>
      
      <div className="bg-white p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-green-600" />
          <span className="font-medium">Cost</span>
        </div>
        <div className="text-2xl font-bold text-green-600">{vendor.cost}</div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Integration Hub</h2>
          <p className="text-gray-600">Compare and analyze integration options</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search vendors..."
            className="pl-10 pr-4 py-2 w-64 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Categories & Vendors */}
        <div className="col-span-3">
          <div className="space-y-4">
            {Object.entries(vendorCategories).map(([key, category]) => (
              <div key={key}>
                <button
                  onClick={() => setSelectedCategory(key)}
                  className={`w-full flex items-center gap-2 p-3 rounded-lg ${
                    selectedCategory === key
                      ? 'bg-purple-50 text-purple-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.name}</span>
                </button>
                {selectedCategory === key && (
                  <div className="mt-2 ml-4 space-y-2">
                    {category.vendors.map((vendor) => (
                      <button
                        key={vendor.name}
                        onClick={() => setSelectedVendor(vendor)}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg ${
                          selectedVendor?.name === vendor.name
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {vendor.logo}
                        <span>{vendor.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Details */}
        <div className="col-span-9">
          {selectedVendor ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {selectedVendor.logo}
                    <div>
                      <h3 className="text-xl font-semibold">{selectedVendor.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{selectedVendor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {selectedVendor.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <VendorMetrics vendor={selectedVendor} />
                <DataFlowVisualization vendor={selectedVendor} />
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600">Select a vendor to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}