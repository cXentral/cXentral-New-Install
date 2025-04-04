import React, { useState } from 'react';
import { ChevronDown, Copy, Send, Code } from 'lucide-react';

const endpoints = {
  ccaas: {
    'GET /interactions/{id}': {
      description: 'Fetch interaction details',
      parameters: {
        id: {
          type: 'string',
          required: true,
          description: 'Interaction ID'
        }
      },
      response: {
        id: 'string',
        type: 'string',
        status: 'string',
        duration: 'number',
        timestamp: 'string'
      }
    },
    'POST /interactions/create': {
      description: 'Create new interaction',
      parameters: {
        type: {
          type: 'string',
          required: true,
          description: 'Interaction type'
        },
        channel: {
          type: 'string',
          required: true,
          description: 'Channel name'
        }
      },
      response: {
        id: 'string',
        status: 'string',
        created: 'string'
      }
    }
  }
};

export default function APIPlayground() {
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('/interactions/{id}');
  const [params, setParams] = useState({});
  const [auth, setAuth] = useState('');
  const [selectedTab, setSelectedTab] = useState('curl');
  const [response, setResponse] = useState(null);

  const handleSend = () => {
    // Simulate API call
    const sampleResponse = {
      id: 'int_123456',
      type: 'voice',
      status: 'active',
      duration: 145,
      timestamp: new Date().toISOString()
    };

    setResponse({
      status: 200,
      data: sampleResponse
    });
  };

  const generateCurlCommand = () => {
    return `curl --request ${method} \\
  --url https://api.cxentral.com${path} \\
  --header 'Authorization: Bearer ${auth || '<token>'}'`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">API Playground</h2>
        <p className="text-gray-600">Test and interact with CX integration endpoints</p>
      </div>

      {/* Request Builder */}
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-1 bg-blue-50 text-blue-600 font-medium rounded border-none"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="flex-1 p-2 bg-gray-50 rounded"
              placeholder="/endpoint/{param}"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>

        {/* Parameters */}
        <div className="p-4 border-b border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Authorization</label>
            <input
              type="text"
              value={auth}
              onChange={(e) => setAuth(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Bearer token"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Parameters</label>
            <div className="space-y-2">
              {Object.entries(endpoints.ccaas[`${method} ${path}`]?.parameters || {}).map(([key, param]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-1/3">
                    <label className="text-sm text-gray-600">{key}</label>
                  </div>
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded"
                    placeholder={param.description}
                    onChange={(e) => setParams(prev => ({...prev, [key]: e.target.value}))}
                  />
                  {param.required && (
                    <span className="text-xs text-red-500">required</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="p-4">
          <div className="flex gap-2 mb-4 border-b">
            {['curl', 'python', 'javascript', 'go'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 text-sm ${
                  selectedTab === tab 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm relative">
            <button 
              className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded"
              onClick={() => navigator.clipboard.writeText(generateCurlCommand())}
            >
              <Copy className="w-4 h-4" />
            </button>
            <pre>{generateCurlCommand()}</pre>
          </div>
        </div>
      </div>

      {/* Response */}
      {response && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Response</span>
              <span className={`px-2 py-1 text-xs rounded ${
                response.status === 200 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {response.status}
              </span>
            </div>
            <button 
              className="p-2 hover:bg-gray-100 rounded"
              onClick={() => navigator.clipboard.writeText(JSON.stringify(response.data, null, 2))}
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 bg-gray-50 rounded-b-lg">
            <pre className="text-sm">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}