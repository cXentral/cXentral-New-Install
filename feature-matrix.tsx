import React, { useState } from 'react';
import { Check, Minus, AlertCircle, HelpCircle, Filter } from 'lucide-react';

export default function FeatureMatrix() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showEnterprise, setShowEnterprise] = useState(true);

  const categories = [
    { id: 'all', name: 'All Features' },
    { id: 'integration', name: 'Integration' },
    { id: 'security', name: 'Security' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'automation', name: 'Automation' }
  ];

  const features = [
    {
      category: 'integration',
      name: 'Real-time Data Sync',
      description: 'Synchronize data across platforms in real-time',
      basic: true,
      professional: true,
      enterprise: true
    },
    {
      category: 'integration',
      name: 'Custom API Access',
      description: 'Build custom integrations using our API',
      basic: false,
      professional: true,
      enterprise: true
    },
    {
      category: 'security',
      name: 'SSO Integration',
      description: 'Single Sign-On with major providers',
      basic: false,
      professional: true,
      enterprise: true
    },
    {
      category: 'security',
      name: 'Advanced Encryption',
      description: 'End-to-end encryption for all data',
      basic: true,
      professional: true,
      enterprise: true
    },
    {
      category: 'analytics',
      name: 'Basic Reporting',
      description: 'Standard analytics and reporting',
      basic: true,
      professional: true,
      enterprise: true
    },
    {
      category: 'analytics',
      name: 'Custom Dashboards',
      description: 'Build personalized analytics views',
      basic: false,
      professional: true,
      enterprise: true
    },
    {
      category: 'automation',
      name: 'Workflow Builder',
      description: 'Create custom automation workflows',
      basic: false,
      professional: true,
      enterprise: true
    },
    {
      category: 'automation',
      name: 'AI Suggestions',
      description: 'AI-powered workflow suggestions',
      basic: false,
      professional: false,
      enterprise: true
    }
  ];

  const filteredFeatures = features.filter(
    feature => selectedCategory === 'all' || feature.category === selectedCategory
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Feature Comparison</h2>
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setShowEnterprise(!showEnterprise)}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            {showEnterprise ? 'Hide' : 'Show'} Enterprise
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 w-1/3">Feature</th>
              <th className="text-center py-4 px-4">Basic</th>
              <th className="text-center py-4 px-4">Professional</th>
              {showEnterprise && (
                <th className="text-center py-4 px-4">Enterprise</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredFeatures.map((feature, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="font-medium mb-1">{feature.name}</div>
                  <div className="text-sm text-gray-600">{feature.description}</div>
                </td>
                <td className="text-center py-4 px-4">
                  {feature.basic ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                  )}
                </td>
                <td className="text-center py-4 px-4">
                  {feature.professional ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                  )}
                </td>
                {showEnterprise && (
                  <td className="text-center py-4 px-4">
                    {feature.enterprise ? (
                      <Check className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Minus className="w-5 h-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold">Plan Highlights</h4>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h5 className="font-medium mb-2">Basic</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Essential features</li>
              <li>Basic support</li>
              <li>Standard security</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Professional</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Advanced features</li>
              <li>Priority support</li>
              <li>Enhanced security</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Enterprise</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Custom solutions</li>
              <li>24/7 dedicated support</li>
              <li>Advanced compliance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}