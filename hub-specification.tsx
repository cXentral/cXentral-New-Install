import React, { useState } from 'react';
import { Layout, Grid, Search, Filter } from 'lucide-react';

const HubSpecifications = () => {
  const [activeHub, setActiveHub] = useState('cXonnect');

  const hubSpecifications = {
    cXonnect: {
      name: 'cXonnect Hub™',
      description: 'Community & Collaboration Platform',
      toolCategories: [
        {
          name: 'Community Management',
          tools: ['Developer Portal', 'Knowledge Base', 'Collaboration Tools']
        },
        {
          name: 'Resource Sharing',
          tools: ['Asset Library', 'Code Repository', 'Documentation']
        }
      ],
      integrations: ['GitHub', 'Confluence', 'Slack'],
      metrics: ['Community Engagement', 'Resource Utilization', 'Knowledge Sharing']
    },
    cXintegrate: {
      name: 'cXintegrate Hub™',
      description: 'Integration & API Management',
      toolCategories: [
        {
          name: 'API Management',
          tools: ['API Gateway', 'API Documentation', 'API Analytics']
        },
        {
          name: 'Integration Framework',
          tools: ['Connector Library', 'Integration Templates', 'Workflow Engine']
        }
      ],
      integrations: ['MuleSoft', 'Apigee', 'Kong'],
      metrics: ['API Performance', 'Integration Success Rate', 'System Uptime']
    },
    cXinsight: {
      name: 'cXinsight Hub™',
      description: 'Analytics & Intelligence Platform',
      toolCategories: [
        {
          name: 'Analytics Tools',
          tools: ['Dashboards', 'Reports', 'Predictive Analytics']
        },
        {
          name: 'Intelligence Framework',
          tools: ['AI Models', 'Machine Learning', 'Data Processing']
        }
      ],
      integrations: ['Tableau', 'Power BI', 'Snowflake'],
      metrics: ['Analysis Accuracy', 'Processing Speed', 'Insight Generation']
    },
    cXinnovate: {
      name: 'cXinnovate Hub™',
      description: 'Innovation Lab',
      toolCategories: [
        {
          name: 'Innovation Tools',
          tools: ['Idea Management', 'Prototype Tools', 'Testing Framework']
        },
        {
          name: 'Research Platform',
          tools: ['Market Analysis', 'User Research', 'Trend Analysis']
        }
      ],
      integrations: ['Jira', 'Miro', 'InVision'],
      metrics: ['Innovation Rate', 'Implementation Success', 'Market Impact']
    },
    cXecute: {
      name: 'cXecute Hub™',
      description: 'Implementation & Deployment',
      toolCategories: [
        {
          name: 'Deployment Tools',
          tools: ['CI/CD Pipeline', 'Infrastructure Management', 'Monitoring']
        },
        {
          name: 'Implementation Framework',
          tools: ['Project Management', 'Resource Planning', 'Quality Assurance']
        }
      ],
      integrations: ['Jenkins', 'Kubernetes', 'Terraform'],
      metrics: ['Deployment Speed', 'Implementation Quality', 'System Stability']
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">cXentral Platform Hubs</h1>
        <p className="text-gray-600">
          Comprehensive specifications for cXentral platform hubs
        </p>
      </div>

      {/* Hub Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        {Object.entries(hubSpecifications).map(([key, hub]) => (
          <button
            key={key}
            onClick={() => setActiveHub(key)}
            className={`px-4 py-2 rounded-lg transition-all
              ${activeHub === key 
                ? 'bg-blue-100 text-blue-700 shadow-sm' 
                : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {hub.name}
          </button>
        ))}
      </div>

      {/* Hub Details */}
      {activeHub && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {hubSpecifications[activeHub].name}
            </h2>
            <p className="text-gray-600">
              {hubSpecifications[activeHub].description}
            </p>
          </div>

          {/* Tool Categories */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Tool Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hubSpecifications[activeHub].toolCategories.map((category, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">{category.name}</h4>
                  <ul className="space-y-2">
                    {category.tools.map((tool, tidx) => (
                      <li key={tidx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Key Integrations</h3>
            <div className="flex flex-wrap gap-2">
              {hubSpecifications[activeHub].integrations.map((integration, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
                  {integration}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Success Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hubSpecifications[activeHub].metrics.map((metric, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-600">{metric}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HubSpecifications;
