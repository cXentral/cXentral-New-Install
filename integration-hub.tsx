import React, { useState } from 'react';
import { 
  Layers, Database, Cloud, Shield, 
  Server, Network, Code, Settings,
  Box, Activity, GitBranch, Terminal
} from 'lucide-react';

export default function IntegrationHub() {
  const [selectedLayer, setSelectedLayer] = useState('middleware');
  
  const layers = {
    interface: {
      title: 'USER INTERFACE',
      components: [
        { name: 'Web Application', technologies: ['XHTML', 'CSS', 'XML', 'PHP'] },
        { name: 'Mobile App', technologies: ['Java', 'Kotlin', 'Objective C'] },
        { name: 'Admin Portal', technologies: ['React', 'TypeScript', 'GraphQL'] }
      ]
    },
    services: {
      title: 'SERVICES',
      components: [
        { name: 'IT Management Tools', icon: Settings },
        { name: 'Cloud Services', icon: Cloud },
        { name: 'Security', icon: Shield }
      ]
    },
    middleware: {
      title: 'MIDDLEWARE',
      components: [
        { name: 'Communications', technologies: ['TCP/IP', 'SOAP', 'REST'] },
        { name: 'CRM/ERP Integration', technologies: ['APIs', 'Webhooks'] },
        { name: 'Virtualization', technologies: ['Docker', 'Kubernetes'] }
      ]
    },
    database: {
      title: 'DATABASE',
      components: [
        { name: 'Oracle/SAP', icon: Database },
        { name: 'MySQL', icon: Database },
        { name: 'XML/JSON', icon: Code },
        { name: 'Hadoop', icon: Server }
      ]
    }
  };

  const connectors = [
    { category: 'CRM', vendors: ['Salesforce', 'Microsoft Dynamics', 'HubSpot'] },
    { category: 'CCaaS', vendors: ['Genesys', 'NICE', 'Five9', 'Talkdesk'] },
    { category: 'Analytics', vendors: ['Tableau', 'PowerBI', 'Looker'] },
    { category: 'Data', vendors: ['Snowflake', 'MongoDB', 'PostgreSQL'] }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">Integration Hub Architecture</h2>
          <p className="text-gray-600 mt-1">Technical stack and available connectors</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Tech Stack Visualization */}
        <div className="col-span-8">
          <div className="space-y-4">
            {Object.entries(layers).map(([key, layer]) => (
              <div 
                key={key}
                onClick={() => setSelectedLayer(key)}
                className={`p-4 rounded-lg transition-colors cursor-pointer ${
                  selectedLayer === key 
                    ? 'bg-blue-50 border-2 border-blue-200'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <h3 className="font-semibold mb-3">{layer.title}</h3>
                <div className="grid grid-cols-3 gap-4">
                  {layer.components.map((component, index) => (
                    <div 
                      key={index}
                      className="bg-white p-3 rounded-md shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {component.icon && <component.icon className="w-4 h-4 text-blue-600" />}
                        <span className="font-medium">{component.name}</span>
                      </div>
                      {component.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {component.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connectors Panel */}
        <div className="col-span-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-6">Available Connectors</h3>
            <div className="space-y-6">
              {connectors.map((category, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-700 mb-3">{category.category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.vendors.map((vendor, idx) => (
                      <div 
                        key={idx}
                        className="bg-white px-3 py-2 rounded-md text-sm flex items-center gap-2"
                      >
                        <Box className="w-4 h-4 text-blue-600" />
                        {vendor}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Process */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-6">Implementation Process</h3>
        <div className="grid grid-cols-4 gap-6">
          {[
            { title: 'Connect', icon: Network, description: 'Establish secure connections' },
            { title: 'Configure', icon: Settings, description: 'Set up data mappings' },
            { title: 'Test', icon: Activity, description: 'Validate integrations' },
            { title: 'Deploy', icon: GitBranch, description: 'Go live with monitoring' }
          ].map((step, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <step.icon className="w-6 h-6 text-blue-600 mb-3" />
              <h4 className="font-medium mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div className="mt-8 text-right">
        <div className="text-sm font-normal text-gray-400">experience is everything</div>
        <div className="text-sm font-normal text-gray-400">Your CX front and centre at</div>
        <div className="text-sm font-medium text-gray-600">cXentral</div>
      </div>
    </div>
  );
}