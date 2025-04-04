import React, { useState, useEffect } from 'react';
import { 
  Layout, Box, CircuitBoard, Database, Cloud, Shield,
  Globe, Layers, Settings, Zap, Users, Bot, GitBranch,
  Network, MessageSquare, ChevronRight, ChevronDown,
  Search, Filter, AlertCircle, Activity, DollarSign
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Enhanced vendor data incorporating Gartner ratings
const vendors = {
  ccaas: {
    Genesys: { rating: 4.7, reviews: 736, marketShare: 25 },
    NICE: { rating: 4.6, reviews: 468, marketShare: 20 },
    Five9: { rating: 4.5, reviews: 596, marketShare: 15 },
    Talkdesk: { rating: 4.2, reviews: 705, marketShare: 12 }
  },
  cdp: {
    Twilio: { rating: 4.5, reviews: 83, marketShare: 18 },
    Salesforce: { rating: 4.4, reviews: 111, marketShare: 22 },
    Adobe: { rating: 4.3, reviews: 46, marketShare: 15 },
    Treasure: { rating: 4.3, reviews: 94, marketShare: 12 }
  },
  cpaas: {
    Twilio: { rating: 4.3, reviews: 126, marketShare: 28 },
    Vonage: { rating: 4.5, reviews: 121, marketShare: 15 },
    MessageBird: { rating: 4.7, reviews: 9, marketShare: 8 },
    Infobip: { rating: 4.4, reviews: 91, marketShare: 10 }
  }
};

const costCalculator = {
  base: {
    small: 5000,
    medium: 15000,
    enterprise: 50000
  },
  features: {
    aiCapabilities: 2000,
    advancedAnalytics: 1500,
    customIntegrations: 3000,
    premiumSupport: 2500
  },
  scaling: {
    users: 50,
    transactions: 0.001,
    storage: 0.5
  }
};

const IntegrationFlowViz = ({ from, to, status }) => {
  const colors = {
    active: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    inactive: 'bg-gray-300'
  };

  return (
    <div className="relative">
      <div className={`h-1 ${colors[status]} animate-pulse rounded-full`} />
      <div className="flex justify-between text-sm text-gray-500 mt-1">
        <span>{from}</span>
        <span>{to}</span>
      </div>
    </div>
  );
};

const SystemHealthIndicator = ({ health }) => {
  const getHealthColor = (score) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex items-center gap-2">
      <Activity className={`w-4 h-4 ${getHealthColor(health)}`} />
      <span className="text-sm font-medium">{health}%</span>
    </div>
  );
};

const CostEstimator = ({ requirements }) => {
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const calculateCost = () => {
      let total = costCalculator.base[requirements.tier];
      
      requirements.features.forEach(feature => {
        total += costCalculator.features[feature] || 0;
      });

      total += (requirements.users * costCalculator.scaling.users);
      total += (requirements.transactions * costCalculator.scaling.transactions);
      
      setEstimate(total);
    };

    calculateCost();
  }, [requirements]);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Cost Estimate</h3>
        <DollarSign className="w-5 h-5 text-green-500" />
      </div>
      <div className="text-2xl font-bold text-green-600">
        ${estimate.toLocaleString()}
      </div>
      <div className="text-sm text-gray-500 mt-1">per month</div>
    </div>
  );
};

export default function EnhancedIntegrationArchitecture() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [view, setView] = useState('architecture');
  const [filters, setFilters] = useState({
    category: 'all',
    rating: 0,
    deployment: 'all'
  });

  // Integration health simulation
  const [systemHealth, setSystemHealth] = useState({
    engagement: 98,
    integration: 92,
    data: 95,
    ai: 89
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic
  };

  const handleFilterChange = (filter, value) => {
    setFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header with Search & Filters */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Integration Architecture</h2>
          <p className="text-gray-600">Enterprise Integration Platform Analytics</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search components..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar - Navigation & Filters */}
        <div className="col-span-3 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">View Options</h3>
            <div className="space-y-2">
              {['architecture', 'vendors', 'analytics'].map((option) => (
                <button
                  key={option}
                  onClick={() => setView(option)}
                  className={`w-full px-3 py-2 rounded-lg text-left ${
                    view === option
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">System Health</h3>
            <div className="space-y-3">
              {Object.entries(systemHealth).map(([system, health]) => (
                <div key={system} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    {system.charAt(0).toUpperCase() + system.slice(1)}
                  </span>
                  <SystemHealthIndicator health={health} />
                </div>
              ))}
            </div>
          </div>

          <CostEstimator
            requirements={{
              tier: 'medium',
              features: ['aiCapabilities', 'advancedAnalytics'],
              users: 100,
              transactions: 10000
            }}
          />
        </div>

        {/* Main Content Area */}
        <div className="col-span-9">
          {/* Integration Flow Visualizations */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(vendors).map(([category, vendorList]) => (
              <div key={category} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold mb-4">{category.toUpperCase()} Integration Status</h3>
                <div className="space-y-4">
                  {Object.entries(vendorList).slice(0, 3).map(([vendor, data]) => (
                    <div key={vendor}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{vendor}</span>
                        <span className="text-sm text-gray-500">
                          {data.rating} ({data.reviews} reviews)
                        </span>
                      </div>
                      <IntegrationFlowViz
                        from="Source"
                        to="Target"
                        status={data.rating > 4.5 ? 'active' : 'warning'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Vendor Performance Analytics */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-4">Vendor Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(vendors.ccaas).map(([name, data]) => ({
                    name,
                    rating: data.rating * 20,
                    marketShare: data.marketShare
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rating" fill="#8884d8" name="Rating Score" />
                  <Bar dataKey="marketShare" fill="#82ca9d" name="Market Share %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}