import React, { useState, useEffect } from 'react';
import { 
  Code, Database, Cloud, Shield, 
  Server, Network, Activity, Settings,
  Box, GitBranch, ArrowRight, Search,
  BarChart2, CheckCircle, AlertTriangle,
  FileText, Zap, Star
} from 'lucide-react';

export default function EnhancedIntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [activeTab, setActiveTab] = useState('connectors');

  const vendors = {
    ccaas: [
      { name: 'Genesys', rating: 4.8, marketShare: 25, apiQuality: 4.9, cost: '$$$$' },
      { name: 'NICE inContact', rating: 4.7, marketShare: 20, apiQuality: 4.7, cost: '$$$$' },
      { name: 'Five9', rating: 4.6, marketShare: 15, apiQuality: 4.8, cost: '$$$' },
      { name: 'Talkdesk', rating: 4.5, marketShare: 12, apiQuality: 4.6, cost: '$$$' },
      { name: 'Avaya', rating: 4.4, marketShare: 10, apiQuality: 4.3, cost: '$$$$' },
      { name: 'Cisco', rating: 4.5, marketShare: 8, apiQuality: 4.5, cost: '$$$$' },
      { name: 'Amazon Connect', rating: 4.4, marketShare: 5, apiQuality: 4.8, cost: '$$' },
      { name: 'Twilio Flex', rating: 4.6, marketShare: 3, apiQuality: 4.9, cost: '$$' },
      { name: '8x8', rating: 4.3, marketShare: 2, apiQuality: 4.4, cost: '$$' }
    ],
    crm: [
      { name: 'Salesforce', rating: 4.9, marketShare: 30, apiQuality: 4.9, cost: '$$$$' },
      { name: 'Microsoft Dynamics', rating: 4.7, marketShare: 25, apiQuality: 4.7, cost: '$$$$' },
      { name: 'HubSpot', rating: 4.8, marketShare: 15, apiQuality: 4.8, cost: '$$$' },
      { name: 'Zendesk', rating: 4.6, marketShare: 10, apiQuality: 4.7, cost: '$$' },
      { name: 'Oracle', rating: 4.5, marketShare: 8, apiQuality: 4.4, cost: '$$$$' },
      { name: 'SAP', rating: 4.4, marketShare: 7, apiQuality: 4.3, cost: '$$$$' },
      { name: 'Zoho', rating: 4.5, marketShare: 3, apiQuality: 4.5, cost: '$$' },
      { name: 'SugarCRM', rating: 4.2, marketShare: 2, apiQuality: 4.2, cost: '$$' }
    ],
    analytics: [
      { name: 'Tableau', rating: 4.8, marketShare: 28, apiQuality: 4.7, cost: '$$$$' },
      { name: 'Power BI', rating: 4.7, marketShare: 25, apiQuality: 4.6, cost: '$$$' },
      { name: 'Looker', rating: 4.6, marketShare: 15, apiQuality: 4.8, cost: '$$$' },
      { name: 'Qlik', rating: 4.5, marketShare: 12, apiQuality: 4.5, cost: '$$$' },
      { name: 'Sisense', rating: 4.4, marketShare: 8, apiQuality: 4.6, cost: '$$$' },
      { name: 'ThoughtSpot', rating: 4.3, marketShare: 5, apiQuality: 4.4, cost: '$$' },
      { name: 'Domo', rating: 4.4, marketShare: 4, apiQuality: 4.5, cost: '$$$' },
      { name: 'MongoDB Charts', rating: 4.2, marketShare: 3, apiQuality: 4.7, cost: '$$' }
    ]
  };

  const integrationPatterns = [
    {
      name: 'Real-time Event-Driven',
      description: 'Process events as they occur using event streams',
      technology: ['Apache Kafka', 'RabbitMQ', 'Redis'],
      useCase: 'Live customer interactions, real-time analytics',
      performance: { latency: '<100ms', throughput: '10k events/sec' }
    },
    {
      name: 'Batch Synchronization',
      description: 'Periodic data synchronization for large datasets',
      technology: ['Apache Spark', 'Airflow', 'AWS Glue'],
      useCase: 'Reporting, data warehousing, analytics',
      performance: { latency: 'minutes', throughput: 'millions of records' }
    },
    {
      name: 'API-Led Integration',
      description: 'RESTful APIs with microservices architecture',
      technology: ['REST', 'GraphQL', 'OpenAPI'],
      useCase: 'System-to-system integration, mobile apps',
      performance: { latency: '<200ms', throughput: '1000 req/sec' }
    },
    {
      name: 'Hybrid Integration',
      description: 'Combination of real-time and batch processing',
      technology: ['Lambda Architecture', 'Kafka', 'Spark'],
      useCase: 'Complex workflows, multi-system orchestration',
      performance: { latency: 'variable', throughput: 'adaptive' }
    }
  ];

  const useCaseLibrary = [
    {
      title: 'Omnichannel Customer Service',
      description: 'Integrate CCaaS with CRM for unified customer experience',
      components: ['Genesys', 'Salesforce', 'Custom Middleware'],
      benefits: ['360° customer view', 'Reduced handle time', 'Improved CSAT'],
      roi: { timeToValue: '3 months', costSavings: '30%' }
    },
    {
      title: 'Real-time Analytics Pipeline',
      description: 'Stream customer interaction data for instant insights',
      components: ['Five9', 'Kafka', 'Tableau'],
      benefits: ['Real-time insights', 'Proactive service', 'Data-driven decisions'],
      roi: { timeToValue: '2 months', costSavings: '25%' }
    }
  ];

  const DataFlowAnimation = ({ vendor }) => {
    return (
      <div className="relative h-64 bg-gray-50 rounded-lg p-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Add animated data flow visualization here */}
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
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header with Tabs */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Integration Hub</h2>
        <div className="flex gap-4 border-b">
          {['connectors', 'patterns', 'use-cases', 'monitoring'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${
                activeTab === tab
                  ? 'border-b-2 border-purple-600 text-purple-600'
                  : 'text-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
            </button>
          ))}
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
                />
              </div>
            </div>
            <div className="space-y-4">
              {Object.keys(vendors).map((category) => (
                <div key={category}>
                  <h3 className="font-medium text-gray-700 mb-2 capitalize">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {vendors[category].map((vendor) => (
                      <button
                        key={vendor.name}
                        onClick={() => setSelectedVendor(vendor)}
                        className={`w-full px-3 py-2 text-left rounded-lg ${
                          selectedVendor?.name === vendor.name
                            ? 'bg-purple-50 text-purple-600'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {vendor.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Details & Visualizations */}
        <div className="col-span-9">
          {selectedVendor && (
            <div className="space-y-6">
              {/* Vendor Details */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedVendor.name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        {selectedVendor.rating}
                      </span>
                      <span className="text-gray-600">
                        Market Share: {selectedVendor.marketShare}%
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">
                      {selectedVendor.cost}
                    </span>
                  </div>
                </div>

                {/* API & Integration Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium mb-2">API Quality</h4>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${selectedVendor.apiQuality * 20}%` }}
                        />
                      </div>
                      <span className="ml-2">{selectedVendor.apiQuality}</span>
                    </div>
                  </div>
                  {/* Add more metrics... */}
                </div>
              </div>

              {/* Data Flow Visualization */}
              <DataFlowAnimation vendor={selectedVendor} />

              {/* Integration Patterns */}
              <div className="grid grid-cols-2 gap-4">
                {integrationPatterns.map((pattern) => (
                  <div key={pattern.name} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2">{pattern.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {pattern.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {pattern.technology.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Watermark */}
      <div className="mt-8 text-right">
        <div className="text-sm font-normal text-gray-400">
          experience is everything
        </div>
        <div className="text-sm font-normal text-gray-400">
          Your CX front and centre at
        </div>
        <div className="text-sm font-medium text-gray-600">cXentral</div>
      </div>
    </div>
  );
}