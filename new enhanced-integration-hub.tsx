import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, ArrowRight, Activity, DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react';

const vendors = {
  ccaas: [
    { name: 'Genesys', rating: 4.8, marketShare: 25, apiQuality: 4.9, cost: '$$$$', color: '#2563eb' },
    { name: 'NICE inContact', rating: 4.7, marketShare: 20, apiQuality: 4.7, cost: '$$$$', color: '#7c3aed' },
    { name: 'Five9', rating: 4.6, marketShare: 15, apiQuality: 4.8, cost: '$$$', color: '#2563eb' },
    { name: 'Talkdesk', rating: 4.5, marketShare: 12, apiQuality: 4.6, cost: '$$$', color: '#7c3aed' },
    { name: 'Avaya', rating: 4.4, marketShare: 10, apiQuality: 4.3, cost: '$$$$', color: '#2563eb' }
  ],
  crm: [
    { name: 'Salesforce', rating: 4.9, marketShare: 30, apiQuality: 4.9, cost: '$$$$', color: '#2563eb' },
    { name: 'Microsoft Dynamics', rating: 4.7, marketShare: 25, apiQuality: 4.7, cost: '$$$$', color: '#7c3aed' },
    { name: 'HubSpot', rating: 4.8, marketShare: 15, apiQuality: 4.8, cost: '$$$', color: '#2563eb' },
    { name: 'Zendesk', rating: 4.6, marketShare: 10, apiQuality: 4.7, cost: '$$', color: '#7c3aed' },
    { name: 'Oracle', rating: 4.5, marketShare: 8, apiQuality: 4.4, cost: '$$$$', color: '#2563eb' }
  ],
  analytics: [
    { name: 'Tableau', rating: 4.8, marketShare: 28, apiQuality: 4.7, cost: '$$$$', color: '#2563eb' },
    { name: 'Power BI', rating: 4.7, marketShare: 25, apiQuality: 4.6, cost: '$$$', color: '#7c3aed' },
    { name: 'Looker', rating: 4.6, marketShare: 15, apiQuality: 4.8, cost: '$$$', color: '#2563eb' },
    { name: 'Qlik', rating: 4.5, marketShare: 12, apiQuality: 4.5, cost: '$$$', color: '#7c3aed' },
    { name: 'Sisense', rating: 4.4, marketShare: 8, apiQuality: 4.6, cost: '$$$', color: '#2563eb' }
  ]
};

const customerJourneyStages = [
  { id: 'awareness', name: 'Awareness', color: '#2563eb' },
  { id: 'consideration', name: 'Consideration', color: '#7c3aed' },
  { id: 'purchase', name: 'Purchase', color: '#16a34a' },
  { id: 'retention', name: 'Retention', color: '#dc2626' },
  { id: 'advocacy', name: 'Advocacy', color: '#f59e0b' }
];

const journeyData = [
  { touchpoint: 'Website Visit', satisfaction: 85, friction: 15 },
  { touchpoint: 'Product Research', satisfaction: 75, friction: 25 },
  { touchpoint: 'Sales Contact', satisfaction: 90, friction: 10 },
  { touchpoint: 'Demo/Trial', satisfaction: 85, friction: 15 },
  { touchpoint: 'Negotiation', satisfaction: 70, friction: 30 },
  { touchpoint: 'Onboarding', satisfaction: 80, friction: 20 },
  { touchpoint: 'Initial Usage', satisfaction: 85, friction: 15 },
  { touchpoint: 'Support', satisfaction: 75, friction: 25 }
];

const JourneyMap = ({ selectedStage, onStageSelect }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex justify-between mb-8">
        {customerJourneyStages.map((stage) => (
          <div 
            key={stage.id}
            onClick={() => onStageSelect(stage.id)}
            className={`flex flex-col items-center cursor-pointer transition-colors ${
              selectedStage === stage.id ? 'scale-110' : ''
            }`}
          >
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: stage.color + '20', color: stage.color }}
            >
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-sm font-medium">{stage.name}</span>
          </div>
        ))}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={journeyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="touchpoint" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="satisfaction" stroke="#2563eb" />
            <Line type="monotone" dataKey="friction" stroke="#dc2626" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CostAnalysis = () => {
  const costData = [
    { category: 'Integration', current: 100000, projected: 60000 },
    { category: 'Operations', current: 80000, projected: 40000 },
    { category: 'Support', current: 60000, projected: 30000 },
    { category: 'Training', current: 40000, projected: 20000 }
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Cost Analysis</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={costData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="current" fill="#dc2626" name="Current" />
            <Bar dataKey="projected" fill="#16a34a" name="Projected" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MarketAnalysis = ({ selectedCategory }) => {
  const marketData = {
    ccaas: { size: 24.1, growth: 15.2 },
    crm: { size: 43.7, growth: 12.8 },
    analytics: { size: 29.9, growth: 18.4 }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Market Analysis</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Market Size</div>
          <div className="text-2xl font-bold text-purple-600">
            ${marketData[selectedCategory].size}B
          </div>
        </div>
        <div className="p-4 bg-white rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Growth Rate</div>
          <div className="text-2xl font-bold text-green-600">
            {marketData[selectedCategory].growth}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default function EnhancedIntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState('ccaas');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedStage, setSelectedStage] = useState('awareness');

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Integration Hub</h2>
          <p className="text-gray-600">Journey Analysis & Market Intelligence</p>
        </div>
        <div className="flex gap-4">
          {Object.keys(vendors).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Panel - Vendor List */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border"
                />
              </div>
            </div>
            <div className="space-y-2">
              {vendors[selectedCategory].map((vendor) => (
                <button
                  key={vendor.name}
                  onClick={() => setSelectedVendor(vendor)}
                  className={`w-full p-3 text-left rounded-lg ${
                    selectedVendor?.name === vendor.name
                      ? 'bg-purple-50 text-purple-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{vendor.name}</div>
                  <div className="text-sm text-gray-500">
                    Market Share: {vendor.marketShare}%
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Analysis */}
        <div className="col-span-9 space-y-8">
          <JourneyMap 
            selectedStage={selectedStage}
            onStageSelect={setSelectedStage}
          />
          <div className="grid grid-cols-2 gap-8">
            <CostAnalysis />
            <MarketAnalysis selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </div>
  );
}
