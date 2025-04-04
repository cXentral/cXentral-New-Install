import React, { useState } from 'react';
import { 
  Settings, 
  Play, 
  Database, 
  Lock,
  AlertCircle,
  ArrowRight,
  Globe,
  Activity
} from 'lucide-react';

// Apideck unified API endpoints
const apideckEndpoints = {
  crm: {
    'GET /crm/companies/{id}': {
      description: 'Get company details',
      unifiedApi: 'crm',
      parameters: {
        path: {
          id: {
            type: 'string',
            required: true,
            description: 'Company ID'
          }
        },
        headers: {
          'x-apideck-consumer-id': {
            type: 'string',
            required: true,
            description: 'Consumer ID'
          },
          'x-apideck-app-id': {
            type: 'string',
            required: true,
            description: 'Application ID'
          }
        }
      }
    },
    'GET /crm/contacts': {
      description: 'List all contacts',
      unifiedApi: 'crm',
      parameters: {
        query: {
          limit: {
            type: 'number',
            description: 'Number of records to return',
            default: 20
          },
          cursor: {
            type: 'string',
            description: 'Cursor to start from'
          }
        },
        headers: {
          'x-apideck-consumer-id': {
            type: 'string',
            required: true,
            description: 'Consumer ID'
          },
          'x-apideck-app-id': {
            type: 'string',
            required: true,
            description: 'Application ID'
          }
        }
      }
    }
  },
  support: {
    'GET /customer-support/tickets': {
      description: 'List support tickets',
      unifiedApi: 'customer-support',
      parameters: {
        query: {
          filter: {
            type: 'object',
            properties: {
              status: {
                type: 'string',
                enum: ['open', 'closed', 'pending']
              }
            }
          }
        },
        headers: {
          'x-apideck-consumer-id': {
            type: 'string',
            required: true,
            description: 'Consumer ID'
          },
          'x-apideck-app-id': {
            type: 'string',
            required: true,
            description: 'Application ID'
          }
        }
      }
    },
    'POST /customer-support/tickets': {
      description: 'Create support ticket',
      unifiedApi: 'customer-support',
      parameters: {
        body: {
          subject: {
            type: 'string',
            required: true,
            description: 'Ticket subject'
          },
          description: {
            type: 'string',
            required: true,
            description: 'Ticket description'
          },
          priority: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'urgent'],
            description: 'Ticket priority'
          }
        },
        headers: {
          'x-apideck-consumer-id': {
            type: 'string',
            required: true,
            description: 'Consumer ID'
          },
          'x-apideck-app-id': {
            type: 'string',
            required: true,
            description: 'Application ID'
          }
        }
      }
    }
  }
};

const ApideckTester = ({ endpoint }) => {
  const [credentials, setCredentials] = useState({
    apiKey: '',
    consumerId: '',
    appId: '',
    serviceId: ''
  });
  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construct request URL and headers for Apideck sandbox
      const baseUrl = 'https://unify.apideck.com';
      const path = endpoint.path.replace(/\{([^}]+)\}/g, (_, param) => params[param] || '');
      
      const headers = {
        'Authorization': `Bearer ${credentials.apiKey}`,
        'x-apideck-consumer-id': credentials.consumerId,
        'x-apideck-app-id': credentials.appId,
        'x-apideck-service-id': credentials.serviceId,
        'Content-Type': 'application/json'
      };

      // Make request to Apideck sandbox
      const response = await fetch(`${baseUrl}${path}`, {
        method: endpoint.method || 'GET',
        headers,
        body: endpoint.method === 'POST' ? JSON.stringify(params.body) : undefined
      });

      const data = await response.json();
      setResponse({
        status: response.status,
        data
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Apideck Credentials */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Apideck Credentials
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">API Key</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={credentials.apiKey}
              onChange={(e) => setCredentials({ ...credentials, apiKey: e.target.value })}
              placeholder="Apideck API Key"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Consumer ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={credentials.consumerId}
              onChange={(e) => setCredentials({ ...credentials, consumerId: e.target.value })}
              placeholder="Apideck Consumer ID"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Application ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={credentials.appId}
              onChange={(e) => setCredentials({ ...credentials, appId: e.target.value })}
              placeholder="Apideck Application ID"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Service ID</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={credentials.serviceId}
              onChange={(e) => setCredentials({ ...credentials, serviceId: e.target.value })}
              placeholder="Target Service ID (e.g., salesforce)"
            />
          </div>
        </div>
      </div>

      {/* Request Parameters */}
      {endpoint.parameters && (
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Request Parameters</h3>
          {Object.entries(endpoint.parameters).map(([type, fields]) => (
            type !== 'headers' && (
              <div key={type} className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">{type} Parameters</h4>
                <div className="space-y-3">
                  {Object.entries(fields).map(([field, config]) => (
                    <div key={field}>
                      <label className="block text-sm text-gray-600 mb-1">
                        {config.description}
                        {config.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {config.enum ? (
                        <select
                          className="w-full p-2 border rounded"
                          value={params[field] || ''}
                          onChange={(e) => setParams({ ...params, [field]: e.target.value })}
                        >
                          <option value="">Select {field}</option>
                          {config.enum.map(value => (
                            <option key={value} value={value}>{value}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={config.type === 'number' ? 'number' : 'text'}
                          className="w-full p-2 border rounded"
                          placeholder={config.type}
                          value={params[field] || ''}
                          onChange={(e) => setParams({ ...params, [field]: e.target.value })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error:</span> {error}
          </div>
        </div>
      )}

      <button
        onClick={handleTest}
        disabled={loading}
        className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
          loading 
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
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
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Response</h3>
            <span className={`px-2 py-1 rounded-full text-sm ${
              response.status >= 200 && response.status < 300
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {response.status}
            </span>
          </div>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default function ApideckToolkit() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const handleEndpointSelect = (category, path) => {
    const [method, routePath] = path.split(' ');
    setSelectedEndpoint({
      category,
      method,
      path: routePath,
      ...apideckEndpoints[category][path]
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Apideck Integration Toolkit</h2>
          <p className="text-gray-600">Test Apideck unified APIs for CRM and Support</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">Sandbox Environment</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Endpoints Navigation */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Available Endpoints</h3>
            <div className="space-y-6">
              {Object.entries(apideckEndpoints).map(([category, endpoints]) => (
                <div key={category}>
                  <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">{category}</h4>
                  <div className="space-y-1">
                    {Object.entries(endpoints).map(([path, config]) => (
                      <button
                        key={path}
                        onClick={() => handleEndpointSelect(category, path)}
                        className={`w-full p-2 rounded-lg text-left text-sm ${
                          selectedEndpoint?.path === path.split(' ')[1]
                            ? 'bg-blue-50 text-blue-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{path}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-9">
          {selectedEndpoint ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-medium mb-2">{selectedEndpoint.description}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Database className="w-4 h-4" />
                  <span>{selectedEndpoint.unifiedApi.toUpperCase()}</span>
                </div>
              </div>

              <ApideckTester endpoint={selectedEndpoint} />
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
              Select an endpoint to test
            </div>
          )}
        </div>
      </div>
    </div>
  );
}