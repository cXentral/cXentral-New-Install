import React, { useState, useEffect } from 'react';
import {
  Globe,
  MessageSquare,
  Phone,
  Activity,
  Star,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = {
  ccaas: {
    title: 'Contact Center as a Service',
    description: 'Cloud-based customer service solutions',
    icon: Phone,
    platforms: [
      {
        name: 'Genesys Cloud',
        description: 'Enterprise contact center platform',
        endpoints: [
          {
            path: '/api/v2/routing/queues',
            method: 'GET',
            description: 'List all queues'
          },
          {
            path: '/api/v2/conversations/messages',
            method: 'POST',
            description: 'Send message'
          }
        ]
      },
      {
        name: 'NICE CXone',
        description: 'Cloud contact center solution',
        endpoints: [
          {
            path: '/api/agents',
            method: 'GET',
            description: 'List all agents'
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
        name: 'Microsoft Teams',
        description: 'Enterprise communications platform',
        endpoints: [
          {
            path: '/api/v1/messages',
            method: 'POST',
            description: 'Send message'
          }
        ]
      }
    ]
  }
};

const LaunchCorner = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLaunches([
        {
          id: 1,
          name: 'CX Analytics Pro',
          description: 'AI-powered customer experience platform',
          votes: 128,
          date: '2024-01-20'
        },
        {
          id: 2,
          name: 'OmniChannel Hub',
          description: 'Unified customer communications',
          votes: 95,
          date: '2024-01-19'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-center">
        <Activity className="w-6 h-6 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Latest Launches</h2>
      <div className="space-y-4">
        {launches.map(launch => (
          <div key={launch.id} className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-medium">{launch.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{launch.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{launch.votes} votes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IntegrationDemo = ({ platform }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(platform.endpoints[0]);
  const [response, setResponse] = useState(null);

  const handleTest = async () => {
    // Simulate API call
    setResponse({
      status: 200,
      data: {
        success: true,
        timestamp: new Date().toISOString(),
        message: 'Operation successful'
      }
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium mb-2">{platform.name}</h3>
      <p className="text-gray-600 mb-4">{platform.description}</p>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
              {selectedEndpoint.method}
            </span>
            <code className="text-sm">{selectedEndpoint.path}</code>
          </div>
          <p className="text-sm text-gray-600">{selectedEndpoint.description}</p>
        </div>

        <button
          onClick={handleTest}
          className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Test Endpoint
        </button>

        {response && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Response</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {response.status}
              </span>
            </div>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default function CXShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('ccaas');

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
              {Object.entries(CATEGORIES).map(([key, category]) => (
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
            {CATEGORIES[selectedCategory].platforms.map((platform) => (
              <IntegrationDemo key={platform.name} platform={platform} />
            ))}
          </div>
        </div>

        <div className="col-span-3">
          <LaunchCorner />
        </div>
      </div>
    </div>
  );
}