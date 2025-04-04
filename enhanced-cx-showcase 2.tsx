import React, { useState } from 'react';
import {
  Globe,
  MessageSquare,
  Phone,
  Activity,
  Star,
  ArrowRight,
  AlertCircle,
  Check,
  X,
  RefreshCcw,
  FileText
} from 'lucide-react';

// Validation utilities
const ValidationUtils = {
  isUUID: (value) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value),
  isEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  isPhone: (value) => /^\+?[1-9]\d{1,14}$/.test(value),
  isURL: (value) => /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value)
};

// Integration Definitions
const INTEGRATIONS = {
  ccaas: {
    title: 'Contact Center',
    description: 'Cloud contact center solutions',
    icon: Phone,
    platforms: [
      {
        id: 'genesys',
        name: 'Genesys Cloud',
        apiBase: 'https://api.mypurecloud.com',
        docs: 'https://developer.genesys.cloud',
        authType: 'oauth2',
        endpoints: [
          {
            id: 'list-queues',
            path: '/api/v2/routing/queues',
            method: 'GET',
            description: 'List all routing queues',
            parameters: {
              pageSize: { 
                type: 'number', 
                default: 25,
                validation: (value) => value > 0 && value <= 100,
                description: 'Number of results per page'
              }
            }
          }
        ]
      }
    ]
  },
  messaging: {
    title: 'Messaging',
    description: 'Enterprise messaging solutions',
    icon: MessageSquare,
    platforms: [
      {
        id: 'teams',
        name: 'Microsoft Teams',
        apiBase: 'https://graph.microsoft.com',
        docs: 'https://docs.microsoft.com/graph',
        authType: 'oauth2',
        endpoints: [
          {
            id: 'send-message',
            path: '/v1.0/teams/{teamId}/channels/{channelId}/messages',
            method: 'POST',
            description: 'Send channel message',
            parameters: {
              teamId: {
                type: 'string',
                required: true,
                validation: ValidationUtils.isUUID,
                description: 'Team ID'
              },
              content: {
                type: 'string',
                required: true,
                validation: (value) => value.length > 0 && value.length <= 1000,
                description: 'Message content'
              }
            }
          }
        ]
      }
    ]
  }
};

// Documentation Component
const EndpointDocs = ({ platform, endpoint }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Documentation</h3>
        <a 
          href={platform.docs}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
        >
          <FileText className="w-4 h-4" />
          API Docs
        </a>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-700 mb-1">Endpoint</div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
              {endpoint.method}
            </span>
            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
              {endpoint.path}
            </code>
          </div>
        </div>

        {endpoint.parameters && (
          <div>
            <div className="text-sm font-medium text-gray-700 mb-2">Parameters</div>
            <div className="space-y-2">
              {Object.entries(endpoint.parameters).map(([name, config]) => (
                <div key={name} className="bg-white p-3 rounded border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{name}</span>
                    {config.required && (
                      <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{config.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// API Tester Component
const ApiTester = ({ platform, endpoint }) => {
  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateParams = () => {
    const newErrors = {};
    Object.entries(endpoint.parameters || {}).forEach(([key, config]) => {
      const value = params[key];
      if (config.required && !value) {
        newErrors[key] = 'This field is required';
      } else if (value && config.validation && !config.validation(value)) {
        newErrors[key] = 'Invalid format';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTest = async () => {
    if (!validateParams()) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse({
        success: true,
        status: 200,
        data: {
          id: 'test_123',
          timestamp: new Date().toISOString(),
          params
        }
      });
    } catch (error) {
      setResponse({
        success: false,
        status: 500,
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <EndpointDocs platform={platform} endpoint={endpoint} />

      <div className="space-y-4 mb-6">
        {endpoint.parameters && Object.entries(endpoint.parameters).map(([key, config]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key}
              {config.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={config.type === 'number' ? 'number' : 'text'}
              value={params[key] || ''}
              onChange={(e) => {
                setParams({ ...params, [key]: e.target.value });
                if (errors[key]) {
                  const newErrors = { ...errors };
                  delete newErrors[key];
                  setErrors(newErrors);
                }
              }}
              className={`w-full p-2 border rounded ${errors[key] ? 'border-red-500' : ''}`}
              placeholder={config.description}
            />
            {errors[key] && (
              <p className="mt-1 text-sm text-red-600">{errors[key]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleTest}
        disabled={loading}
        className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
          loading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
      >
        {loading ? (
          <>
            <RefreshCcw className="w-4 h-4 animate-spin" />
            Testing...
          </>
        ) : (
          'Test Endpoint'
        )}
      </button>

      {response && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Response</span>
            <span className={response.success ? 'text-green-600' : 'text-red-600'}>
              {response.status}
            </span>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(response.data || response.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Main Component
export default function CXShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('ccaas');
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">CX Integration Showcase</h1>
          <p className="text-gray-600">Explore and test customer experience integrations</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Live Demo</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        {Object.entries(INTEGRATIONS).map(([key, category]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(key);
              setSelectedPlatform(null);
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              selectedCategory === key
                ? 'bg-purple-100 text-purple-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <category.icon className="w-5 h-5" />
            {category.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9">
          {selectedPlatform ? (
            <ApiTester
              platform={selectedPlatform}
              endpoint={selectedPlatform.endpoints[0]}
            />
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {INTEGRATIONS[selectedCategory].platforms.map((platform) => (
                <div
                  key={platform.id}
                  className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedPlatform(platform)}
                >
                  <h3 className="text-lg font-medium mb-2">{platform.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      {platform.authType}
                    </span>
                    {platform.endpoints.length} endpoints
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-span-3">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Select a platform to explore its endpoints</p>
              <p>• Test API calls with sample data</p>
              <p>• View request and response details</p>
              <p>• Check documentation for more info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}