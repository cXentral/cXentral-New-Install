import React, { useState } from 'react';
import { 
  Layout, Box, CircuitBoard, Database, Cloud, Shield,
  Globe, Layers, Settings, Zap, Users, Bot, GitBranch,
  Network, MessageSquare, ChevronRight, ChevronDown,
  ArrowRight, Star, Check, AlertTriangle
} from 'lucide-react';
import { LineChart, Line } from 'recharts';

const marketData = {
  apiManagement: {
    name: 'API Management',
    topVendors: [
      {
        name: 'Postman',
        rating: 4.6,
        reviews: 637,
        features: ['API Design', 'Testing', 'Documentation'],
        deployment: ['Cloud', 'On-Premise'],
        security: ['OAuth 2.0', 'API Keys', 'JWT'],
        pricing: 'Freemium'
      },
      {
        name: 'Amazon API Gateway',
        rating: 4.5,
        reviews: 321,
        features: ['REST APIs', 'WebSocket', 'HTTP APIs'],
        deployment: ['AWS Cloud'],
        security: ['IAM', 'Lambda Authorizer', 'Cognito'],
        pricing: 'Usage-based'
      }
    ]
  },
  integration: {
    name: 'Integration & Automation',
    topVendors: [
      {
        name: 'MuleSoft',
        rating: 4.3,
        reviews: 194,
        features: ['iPaaS', 'ESB', 'API Management'],
        deployment: ['Cloud', 'On-Premise', 'Hybrid'],
        security: ['OAuth', 'SAML', 'Custom Policies'],
        pricing: 'Enterprise'
      },
      {
        name: 'Boomi',
        rating: 4.4,
        reviews: 89,
        features: ['Integration', 'MDM', 'API Management'],
        deployment: ['Cloud', 'Hybrid'],
        security: ['Encryption', 'SSO', 'Role-based Access'],
        pricing: 'Subscription'
      }
    ]
  },
  aiOrchestration: {
    name: 'AI Orchestration',
    topVendors: [
      {
        name: 'Azure OpenAI Service',
        rating: 4.2,
        reviews: 45,
        features: ['Model Management', 'API Integration', 'Monitoring'],
        deployment: ['Azure Cloud'],
        security: ['Azure AD', 'Private Endpoints'],
        pricing: 'Usage-based'
      }
    ]
  },
  engagement: {
    name: 'Engagement Platforms',
    topVendors: [
      {
        name: 'Twilio',
        rating: 4.4,
        reviews: 156,
        features: ['SMS', 'Voice', 'Video'],
        deployment: ['Cloud'],
        security: ['TLS', 'End-to-end Encryption'],
        pricing: 'Usage-based'
      }
    ]
  }
};

const ComparisonMatrix = ({ vendors }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <h3 className="text-lg font-semibold mb-4">Vendor Comparison</h3>
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left p-2">Vendor</th>
          <th className="text-center p-2">Rating</th>
          <th className="text-center p-2">Reviews</th>
          <th className="text-center p-2">Security</th>
          <th className="text-center p-2">Deployment</th>
        </tr>
      </thead>
      <tbody>
        {vendors.map((vendor) => (
          <tr key={vendor.name} className="border-t">
            <td className="p-2 font-medium">{vendor.name}</td>
            <td className="p-2 text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                {vendor.rating}
              </div>
            </td>
            <td className="p-2 text-center">{vendor.reviews}</td>
            <td className="p-2">
              <div className="flex flex-wrap gap-1 justify-center">
                {vendor.security.map((cert) => (
                  <span key={cert} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </td>
            <td className="p-2">
              <div className="flex flex-wrap gap-1 justify-center">
                {vendor.deployment.map((type) => (
                  <span key={type} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {type}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const IntegrationPatternFlow = ({ category }) => {
  const patterns = [
    { name: 'Request/Response', color: 'blue' },
    { name: 'Event-Driven', color: 'purple' },
    { name: 'Batch Processing', color: 'green' }
  ];

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
      <h3 className="text-lg font-semibold mb-4">Integration Patterns</h3>
      <div className="flex items-center justify-between">
        {patterns.map((pattern, index) => (
          <div key={pattern.name} className="flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full bg-${pattern.color}-100 flex items-center justify-center`}>
              <div className={`w-8 h-8 rounded-full bg-${pattern.color}-500 animate-pulse`} />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-600">{pattern.name}</div>
            {index < patterns.length - 1 && (
              <ArrowRight className={`w-6 h-6 text-${pattern.color}-400 mx-4`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function EnhancedArchitecture() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTab, setSelectedTab] = useState('comparison');

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Integration Architecture</h2>
        <p className="text-gray-600">Market analysis and vendor comparison based on Gartner Peer Insights data</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {Object.entries(marketData).map(([key, category]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`p-4 rounded-lg border transition-colors ${
              selectedCategory === key
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-200'
            }`}
          >
            <h3 className="font-semibold mb-2">{category.name}</h3>
            <div className="text-sm text-gray-600">
              {category.topVendors.length} top vendors
            </div>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setSelectedTab('comparison')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'comparison'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white'
                }`}
              >
                Vendor Comparison
              </button>
              <button
                onClick={() => setSelectedTab('patterns')}
                className={`px-4 py-2 rounded-lg ${
                  selectedTab === 'patterns'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white'
                }`}
              >
                Integration Patterns
              </button>
            </div>

            {selectedTab === 'comparison' ? (
              <ComparisonMatrix vendors={marketData[selectedCategory].topVendors} />
            ) : (
              <IntegrationPatternFlow category={selectedCategory} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}