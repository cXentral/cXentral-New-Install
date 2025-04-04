import React, { useState } from 'react';
import { Search, Filter, ChevronRight, Lock, Globe, Shield, MessageSquare, Users, Code } from 'lucide-react';

const integrationCategories = [
  { id: 'messaging', name: 'MESSAGING', icon: MessageSquare },
  { id: 'ccaas', name: 'CONTACT CENTER', icon: Users },
  { id: 'crm', name: 'CRM', icon: Globe },
  { id: 'wfm', name: 'WORKFORCE', icon: Users },
  { id: 'analytics', name: 'ANALYTICS', icon: Code }
];

const integrations = [
  {
    id: 'genesys',
    name: 'Genesys Cloud',
    icon: '/api/placeholder/32/32',
    status: 'ACTIVE',
    isNew: true,
    categories: ['ccaas', 'messaging'],
    features: {
      webhooks: true,
      oauth2: true,
      apiKey: true,
      testedRecently: true
    },
    objects: {
      interactions: true,
      routing: true,
      analytics: true,
      users: true,
      queues: true
    },
    auth: ['OAuth 2.0', 'API Key']
  },
  {
    id: 'salesforce',
    name: 'Salesforce Service',
    icon: '/api/placeholder/32/32',
    status: 'ACTIVE',
    categories: ['crm'],
    features: {
      webhooks: true,
      oauth2: true,
      apiKey: false,
      testedRecently: true
    },
    objects: {
      contacts: true,
      cases: true,
      accounts: true,
      tasks: true
    },
    auth: ['OAuth 2.0']
  },
  {
    id: 'nice',
    name: 'NICE CXone',
    icon: '/api/placeholder/32/32',
    status: 'ACTIVE',
    isNew: true,
    categories: ['ccaas', 'wfm'],
    features: {
      webhooks: true,
      oauth2: true,
      apiKey: true,
      testedRecently: true
    },
    objects: {
      interactions: true,
      agents: true,
      schedules: true,
      forecasts: true
    },
    auth: ['OAuth 2.0', 'API Key']
  }
  // Add more integrations...
];

const FeatureTag = ({ label, isSupported }) => (
  <span className={`px-2 py-1 rounded text-xs font-medium ${
    isSupported 
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-600'
  }`}>
    {label}
  </span>
);

export default function IntegrationDashboard() {
  const [selectedCategory, setSelectedCategory] = useState('messaging');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    features: []
  });

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || 
      integration.categories.includes(selectedCategory);
    const matchesSearch = integration.name.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Integrations</h1>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                ACTIONS
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                ENV: PRODUCTION
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-800 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between space-x-4">
            {/* Category Select */}
            <div className="flex-shrink-0">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2"
              >
                {integrationCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Feature Filters */}
            <div className="flex items-center space-x-2 flex-grow">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-300">New</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-300">Active</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-300">Featured</span>
              </label>
            </div>

            {/* Feature Support */}
            <div className="flex items-center space-x-2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-300">Webhooks</span>
              </label>
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-300">OAuth 2</span>
              </label>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white">
                Grid
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                List
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search integration..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Integration List */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-4 py-3 bg-gray-800/50 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-4">Integration</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-3">Categories</div>
              <div className="col-span-2">Authentication</div>
            </div>
          </div>

          <div className="divide-y divide-gray-700">
            {filteredIntegrations.map(integration => (
              <div 
                key={integration.id}
                className="px-4 py-4 hover:bg-gray-750 grid grid-cols-12 gap-4 items-center"
              >
                {/* Integration Info */}
                <div className="col-span-4 flex items-center space-x-3">
                  <img
                    src={integration.icon}
                    alt={integration.name}
                    className="w-8 h-8 rounded-lg"
                  />
                  <div>
                    <div className="text-white font-medium">{integration.name}</div>
                    {integration.isNew && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        NEW
                      </span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {integration.status}
                  </span>
                </div>

                {/* Categories */}
                <div className="col-span-3">
                  <div className="flex flex-wrap gap-2">
                    {integration.categories.map(category => (
                      <FeatureTag 
                        key={category} 
                        label={category.toUpperCase()} 
                        isSupported={true}
                      />
                    ))}
                  </div>
                </div>

                {/* Authentication */}
                <div className="col-span-2 flex items-center justify-between">
                  <div className="flex space-x-2">
                    {integration.auth.map(method => (
                      <Lock key={method} className="w-5 h-5 text-gray-400" />
                    ))}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}