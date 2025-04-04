import React, { useState } from 'react';
import {
  FileText,
  Code,
  Book,
  Terminal,
  ChevronRight,
  ExternalLink,
  GitBranch,
  Database,
  Lock,
  Phone,
  Users
} from 'lucide-react';

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = {
    overview: {
      title: 'Overview',
      content: (
        <div className="prose max-w-none">
          <h2>Getting Started with cXentral Integrations</h2>
          <p>
            Build powerful customer experience integrations using our standardized integration platform.
            This guide will walk you through connecting and managing various CX tools and platforms.
          </p>

          <h3>Key Features</h3>
          <ul>
            <li>Standardized REST APIs for all integrations</li>
            <li>Real-time data synchronization capabilities</li>
            <li>OAuth2 and API key authentication support</li>
            <li>Extensive vendor-specific customization options</li>
          </ul>

          <div className="bg-blue-50 rounded-lg p-4 my-6">
            <h4 className="font-semibold text-blue-700 mb-2">Quick Tip</h4>
            <p className="text-blue-600 text-sm">
              Start with our sample integration templates to understand the integration patterns for each vendor category.
            </p>
          </div>
        </div>
      )
    },
    quickstart: {
      title: 'Quick Start',
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">1. Authentication Setup</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
              {`// OAuth2 Authentication Example
const authConfig = {
  authorizationUrl: 'https://example.com/oauth/authorize',
  tokenUrl: 'https://example.com/oauth/token',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scope: ['read', 'write']
};`}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">2. Integration Configuration</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
              {`// Integration configuration example
const integrationConfig = {
  vendor: 'genesys',
  type: 'ccaas',
  endpoints: {
    baseUrl: 'https://api.genesys.com/v2',
    queues: '/routing/queues',
    interactions: '/conversations'
  },
  webhooks: {
    enabled: true,
    events: ['interaction.created', 'interaction.updated']
  }
};`}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">3. API Implementation</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
              {`// Example API implementation using fetch
async function fetchQueues() {
  const response = await fetch(\`\${baseUrl}/routing/queues\`, {
    headers: {
      'Authorization': \`Bearer \${accessToken}\`,
      'Content-Type': 'application/json'
    }
  });
  
  return response.json();
}`}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">4. Event Handling</h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
              {`// Example event handler setup
const eventHandler = {
  'interaction.created': async (event) => {
    // Handle new interaction
    console.log('New interaction:', event.data);
    await updateDashboard(event.data);
  },
  'interaction.updated': async (event) => {
    // Handle interaction update
    console.log('Updated interaction:', event.data);
    await syncInteractionStatus(event.data);
  }
};`}
            </div>
          </div>
        </div>
      )
    },
    guides: {
      title: 'Integration Guides',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* CCaaS Integration Guide */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold">CCaaS Integration</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Learn how to integrate contact center platforms like Genesys, NICE, and Five9.
              </p>
              <a href="#" className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                View Guide
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* CRM Integration Guide */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold">CRM Integration</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Connect with Salesforce, Dynamics, and other CRM platforms.
              </p>
              <a href="#" className="text-purple-600 hover:text-purple-700 flex items-center gap-1">
                View Guide
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Implementation Examples */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-semibold mb-4">Sample Implementations</h3>
            <div className="space-y-4">
              {['Authentication Flow', 'Data Synchronization', 'Webhook Management'].map((example, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-purple-600" />
                    <span>{example}</span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700">
                    View Code
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <div className="col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold mb-4">Documentation</h2>
            <nav className="space-y-1">
              {Object.entries(sections).map(([key, section]) => (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === key
                      ? 'bg-purple-50 text-purple-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {sections[activeSection].content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;