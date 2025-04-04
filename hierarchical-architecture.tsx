import React, { useState } from 'react';
import { 
  Layout, Box, CircuitBoard, Database, Cloud, Shield,
  Globe, Layers, Settings, Zap, Users, Bot, GitBranch,
  Network, MessageSquare, ChevronRight, ChevronDown
} from 'lucide-react';

// Enhanced vendor comparison metrics
const comparisonMetrics = {
  implementation: {
    complexity: ['Low', 'Medium', 'High'],
    timeline: ['1-3 months', '3-6 months', '6+ months'],
    effort: ['Small team', 'Medium team', 'Large team']
  },
  integration: {
    protocols: ['REST', 'GraphQL', 'gRPC', 'SOAP', 'WebSocket'],
    dataFormats: ['JSON', 'XML', 'Protobuf', 'Avro'],
    patterns: ['Sync', 'Async', 'Batch', 'Streaming']
  },
  security: {
    certifications: ['SOC2', 'ISO27001', 'HIPAA', 'GDPR', 'PCI-DSS'],
    features: ['OAuth', 'OIDC', 'mTLS', 'API Key', 'JWT'],
    compliance: ['Basic', 'Advanced', 'Enterprise']
  },
  deployment: {
    cloud: ['AWS', 'Azure', 'GCP', 'Private'],
    models: ['SaaS', 'Self-hosted', 'Hybrid'],
    scaling: ['Manual', 'Auto', 'Serverless']
  },
  support: {
    channels: ['Email', 'Chat', 'Phone', 'Enterprise'],
    documentation: ['Basic', 'Advanced', 'Interactive'],
    community: ['Forums', 'GitHub', 'Stack Overflow']
  }
};

const architectureLayers = {
  engagement: {
    name: 'Engagement Layer',
    icon: Users,
    color: 'bg-blue-500',
    modules: {
      aiAgents: {
        name: 'AI Agents',
        icon: Bot,
        systems: ['Conversational AI', 'Virtual Assistants', 'Smart Routing']
      },
      conversationalUX: {
        name: 'Conversational UX',
        icon: MessageSquare,
        systems: ['Chat Interfaces', 'Voice Interactions', 'Omnichannel Experience']
      },
      graphicalUI: {
        name: 'Graphical UI',
        icon: Layout,
        systems: ['Admin Dashboards', 'Customer Portals', 'Mobile Apps']
      }
    }
  },
  democratization: {
    name: 'Democratization & Composability',
    icon: Layers,
    color: 'bg-purple-500',
    modules: {
      recipes: {
        name: 'Recipes',
        icon: Box,
        systems: ['Integration Templates', 'Workflow Patterns', 'Process Models']
      },
      spaces: {
        name: 'Spaces',
        icon: Globe,
        systems: ['Development Environments', 'Testing Sandboxes', 'Production Zones']
      },
      connectors: {
        name: 'Connectors',
        icon: Network,
        systems: ['Pre-built Integrations', 'Custom Adapters', 'Protocol Bridges']
      }
    }
  },
  core: {
    name: 'Core Services',
    icon: CircuitBoard,
    color: 'bg-green-500',
    modules: {
      apiManagement: {
        name: 'API Management',
        icon: Settings,
        systems: ['API Gateway', 'Developer Portal', 'API Analytics']
      },
      integration: {
        name: 'Integration & Automation',
        icon: GitBranch,
        systems: ['Process Automation', 'Data Integration', 'Event Processing']
      },
      dataManagement: {
        name: 'Data Management',
        icon: Database,
        systems: ['Master Data', 'Data Quality', 'Data Governance']
      }
    }
  },
  aiOrchestration: {
    name: 'AI Orchestration',
    icon: Zap,
    color: 'bg-yellow-500',
    modules: {
      aiGarden: {
        name: 'AI Agent Garden',
        icon: Bot,
        systems: ['Agent Development', 'Training Environment', 'Version Control']
      },
      aiMarketplace: {
        name: 'AI Agent Marketplace',
        icon: Globe,
        systems: ['Agent Discovery', 'Deployment', 'Monitoring']
      },
      aiRegistry: {
        name: 'AI Agent Registry',
        icon: Database,
        systems: ['Agent Catalog', 'Metadata Management', 'Usage Analytics']
      }
    }
  },
  platform: {
    name: 'Platform Architecture',
    icon: Cloud,
    color: 'bg-indigo-500',
    modules: {
      scalability: {
        name: 'Enterprise Scalability',
        icon: Layout,
        systems: ['Load Balancing', 'High Availability', 'Performance Monitoring']
      },
      security: {
        name: 'Advanced Security',
        icon: Shield,
        systems: ['Identity Management', 'Encryption', 'Compliance']
      },
      runtime: {
        name: 'Distributed Runtime',
        icon: Network,
        systems: ['Container Orchestration', 'Service Mesh', 'Edge Computing']
      }
    }
  }
};

export default function HierarchicalArchitecture() {
  const [expandedLayers, setExpandedLayers] = useState({});
  const [expandedModules, setExpandedModules] = useState({});
  const [selectedSystem, setSelectedSystem] = useState(null);

  const toggleLayer = (layerId) => {
    setExpandedLayers(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const LayerCard = ({ layerId, layer }) => (
    <div className="mb-4">
      <button
        onClick={() => toggleLayer(layerId)}
        className={`w-full flex items-center gap-3 p-4 rounded-lg ${layer.color} text-white transition-colors hover:opacity-90`}
      >
        <layer.icon className="w-6 h-6" />
        <span className="flex-grow text-left font-semibold">{layer.name}</span>
        {expandedLayers[layerId] ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronRight className="w-5 h-5" />
        )}
      </button>

      {expandedLayers[layerId] && (
        <div className="ml-6 mt-2 space-y-2">
          {Object.entries(layer.modules).map(([moduleId, module]) => (
            <ModuleCard 
              key={moduleId}
              moduleId={moduleId}
              module={module}
              layerColor={layer.color}
            />
          ))}
        </div>
      )}
    </div>
  );

  const ModuleCard = ({ moduleId, module, layerColor }) => (
    <div className="rounded-lg bg-white shadow-sm">
      <button
        onClick={() => toggleModule(moduleId)}
        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
      >
        <module.icon className="w-5 h-5 text-gray-600" />
        <span className="flex-grow text-left">{module.name}</span>
        {expandedModules[moduleId] ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {expandedModules[moduleId] && (
        <div className="px-4 pb-3">
          <div className="space-y-2 mt-2 ml-8">
            {module.systems.map((system, index) => (
              <button
                key={index}
                onClick={() => setSelectedSystem({ name: system, module: module.name })}
                className={`w-full text-left p-2 rounded text-sm hover:bg-gray-50 ${
                  selectedSystem?.name === system ? 'text-blue-600 bg-blue-50' : 'text-gray-600'
                }`}
              >
                {system}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Integration Architecture</h2>
        <p className="text-gray-600">Explore the hierarchical structure of our integration platform</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-4">
          {Object.entries(architectureLayers).map(([layerId, layer]) => (
            <LayerCard key={layerId} layerId={layerId} layer={layer} />
          ))}
        </div>

        <div className="col-span-1">
          {selectedSystem ? (
            <div className="sticky top-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{selectedSystem.name}</h3>
              <p className="text-sm text-gray-600 mb-4">
                Part of {selectedSystem.module}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Security Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Cloud className="w-4 h-4 text-blue-500" />
                  <span>Cloud Ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>High Performance</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky top-6 bg-gray-50 rounded-lg p-4 text-center text-gray-500">
              Select a system to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}