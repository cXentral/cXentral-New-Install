import React, { useState } from 'react';
import {
  Settings,
  Database,
  PlayCircle,
  Code,
  ChevronRight,
  HelpCircle,
  RefreshCw
} from 'lucide-react';

const IntegrationPlatform = () => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  
  const integrations = [
    {
      id: 'crm',
      name: 'CRM Integration',
      description: 'Connect with popular CRM platforms',
      connectors: ['Salesforce', 'HubSpot', 'Microsoft Dynamics'],
      features: [
        'Lead Management',
        'Contact Sync',
        'Opportunity Tracking'
      ],
      setupSteps: [
        'Configure API credentials',
        'Map data fields',
        'Set sync frequency'
      ]
    },
    // Add more integrations...
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Integration Platform</h1>
        <p className="text-gray-600">
          Build seamless customer experiences with our unified integration platform
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900">Available Integrations</h2>
            </div>

            <div className="space-y-2">
              {integrations.map(integration => (
                <button
                  key={integration.id}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedIntegration?.id === integration.id
                      ? 'bg-purple-50 text-purple-700'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedIntegration(integration)}
                >
                  <div className="font-medium">{integration.name}</div>
                  <div className="text-sm text-gray-500">{integration.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Help */}
          <div className="mt-4 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2 text-blue-700">
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Need Help?</span>
            </div>
            <p className="text-sm text-blue-600">
              Check our documentation or connect with our integration experts
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          {selectedIntegration ? (
            <div className="space-y-6">
              {/* Integration Overview */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedIntegration.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedIntegration.description}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Configure Integration
                  </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {selectedIntegration.features.map((feature, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium mb-1">{feature}</div>
                    </div>
                  ))}
                </div>

                {/* Setup Steps */}
                <div>
                  <h3 className="font-semibold mb-4">Setup Guide</h3>
                  <div className="space-y-4">
                    {selectedIntegration.setupSteps.map((step, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Integration Preview */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-4">Live Preview</h3>
                <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600">
                      Click to view integration demo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select an Integration
                </h3>
                <p className="text-gray-500">
                  Choose an integration from the sidebar to view details and begin setup
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationPlatform;