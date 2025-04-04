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
  Headphones,
  BarChart2,
  Users
} from 'lucide-react';

// Platform configurations
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
        authType: 'oauth2',
        endpoints: [
          {
            id: 'list-queues',
            path: '/api/v2/routing/queues',
            method: 'GET',
            description: 'List all routing queues',
            parameters: {
              pageSize: { type: 'number', default: 25 },
              name: { type: 'string' }
            }
          }
        ]
      }
    ]
  },
  analytics: {
    title: 'CX Analytics',
    description: 'Experience analytics and insights',
    icon: BarChart2,
    platforms: [
      {
        id: 'qualtrics',
        name: 'Qualtrics',
        apiBase: 'https://api.qualtrics.com',
        authType: 'apikey',
        endpoints: [
          {
            id: 'list-surveys',
            path: '/API/v3/surveys',
            method: 'GET',
            description: 'List all surveys',
            parameters: {
              offset: { type: 'number', default: 0 }
            }
          }
        ]
      }
    ]
  },
  messaging: {
    title: 'Unified Communications',
    description: 'Enterprise messaging solutions',
    icon: MessageSquare,
    platforms: [
      {
        id: 'teams',
        name: 'Microsoft Teams',
        apiBase: 'https://graph.microsoft.com',
        authType: 'oauth2',
        endpoints: [
          {
            id: 'send-message',
            path: '/v1.0/teams/{teamId}/channels/{channelId}/messages',
            method: 'POST',
            description: 'Send channel message',
            parameters: {
              teamId: { type: 'string', required: true },
              channelId: { type: 'string', required: true },
              content: { type: 'string', required: true }
            }
          }
        ]
      }
    ]
  }
};

// API Test Component
const ApiTester = ({ platform, endpoint }) => {
  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse({
        success: true,
        status: 200,
        data: {
          id: 'test_123',
          timestamp: new Date().toISOString(),
          params: params
        }
      });
    } catch (error) {
      setResponse({
        success: false,
        status: 500,
        error: error.message
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">{platform.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {platform.authType}
          </span>
          <span>{endpoint.description}</span>
        </div>
      </div>

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
              onChange={(e) => setParams({ ...params, [key]: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder={`Enter ${key}`}
            />
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
            <Activity className="w-4 h-4 animate-spin" />
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
            <div className="flex items-center gap-2">
              {response.success ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ${
                response.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {response.status}
              </span>
            </div>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(response.data || response.error, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

// Product Launch Corner
const LaunchCorner = () => {
  const [launches] = useState([
    {
      id: 1,
      name: 'CX Analytics Pro',
      description: 'AI-powered customer insights',
      votes: 128
    },
    {
      id: 2,
      name: 'OmniChannel Hub',
      description: 'Unified customer communications',
      votes: 95
    }
  ]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Latest CX Launches</h2>
      <div className="space-y-4">
        {launches.map(launch => (
          <div key={launch.id} className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium mb-1">{launch.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{launch.description}</p>
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{launch.votes} votes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export default function CXShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('ccaas');
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handlePlatformSelect = (category, platform) => {
    setSelectedCategory(category);
    setSelectedPlatform(platform);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">CX Integration Showcase</h1>
          <p className="text-gray-600">
            Explore and test real-world customer experience integrations
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Live Demo</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-9">
          <div className="mb-6">
            <div className="flex gap-4">
              {Object.entries(INTEGRATIONS).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
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
          </div>

          <div className="space-y-6">
            {selectedPlatform ? (
              <ApiTester
                platform={selectedPlatform}
                endpoint={selectedPlatform.endpoints[0]}
              />
            ) : (
              INTEGRATIONS[selectedCategory].platforms.map(platform => (
                <div
                  key={platform.id}
                  className="bg-white rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handlePlatformSelect(selectedCategory, platform)}
                >
                  <h3 className="text-lg font-medium mb-2">{platform.name}</h3>
                  <p className="text-gray-600">{platform.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-span-3">
          <LaunchCorner />
        </div>
      </div>
    </div>
  );
}