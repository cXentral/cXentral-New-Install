import React, { useState } from 'react';
import { Code, Database, Shield, Zap, ChevronRight, Server } from 'lucide-react';

export default function PluginSpecs() {
  const [selectedVendor, setSelectedVendor] = useState('genesys');

  const vendors = {
    genesys: {
      name: 'Genesys Cloud',
      specs: {
        api: {
          type: 'REST & WebSocket',
          version: 'v2',
          auth: 'OAuth 2.0',
          endpoints: ['Users', 'Interactions', 'Analytics', 'Routing']
        },
        integration: {
          type: 'Real-time & Batch',
          protocols: ['HTTPS', 'WebSocket', 'MQTT'],
          dataFormats: ['JSON', 'XML', 'CSV']
        },
        security: {
          encryption: 'AES-256',
          compliance: ['SOC 2', 'HIPAA', 'GDPR'],
          audit: 'Full audit logging'
        },
        performance: {
          uptime: '99.99%',
          latency: '<100ms',
          throughput: '1000 req/sec',
          scalability: 'Auto-scaling enabled'
        }
      }
    },
    five9: {
      name: 'Five9',
      specs: {
        api: {
          type: 'REST',
          version: 'v1',
          auth: 'API Key & OAuth',
          endpoints: ['Agents', 'Campaigns', 'Reports', 'Configuration']
        },
        integration: {
          type: 'Real-time',
          protocols: ['HTTPS', 'WebSocket'],
          dataFormats: ['JSON', 'XML']
        },
        security: {
          encryption: 'TLS 1.3',
          compliance: ['SOC 2', 'PCI DSS'],
          audit: 'Comprehensive logging'
        },
        performance: {
          uptime: '99.95%',
          latency: '<150ms',
          throughput: '800 req/sec',
          scalability: 'Horizontal scaling'
        }
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
      
      <div className="grid grid-cols-12 gap-8">
        {/* Vendor Selection */}
        <div className="col-span-3">
          <h3 className="font-semibold mb-4">Vendors</h3>
          <div className="space-y-2">
            {Object.entries(vendors).map(([key, vendor]) => (
              <button
                key={key}
                onClick={() => setSelectedVendor(key)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedVendor === key 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <span>{vendor.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
        
        {/* Specifications */}
        <div className="col-span-9">
          <div className="grid grid-cols-2 gap-6">
            {/* API Specifications */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold">API Specifications</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Type</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.api.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Version</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.api.version}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Authentication</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.api.auth}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Key Endpoints</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vendors[selectedVendor].specs.api.endpoints.map((endpoint) => (
                      <span key={endpoint} className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-sm">
                        {endpoint}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Integration Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold">Integration Details</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Integration Type</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.integration.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Protocols</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vendors[selectedVendor].specs.integration.protocols.map((protocol) => (
                      <span key={protocol} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                        {protocol}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Data Formats</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vendors[selectedVendor].specs.integration.dataFormats.map((format) => (
                      <span key={format} className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-sm">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold">Security Features</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Encryption</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.security.encryption}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Compliance</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {vendors[selectedVendor].specs.security.compliance.map((cert) => (
                      <span key={cert} className="px-2 py-1 bg-green-100 text-green-600 rounded text-sm">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Audit</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.security.audit}</div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
                <h3 className="font-semibold">Performance Metrics</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium">Uptime</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.performance.uptime}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Latency</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.performance.latency}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Throughput</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.performance.throughput}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Scalability</div>
                  <div className="text-gray-600">{vendors[selectedVendor].specs.performance.scalability}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}