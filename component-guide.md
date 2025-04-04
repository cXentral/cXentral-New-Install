# cXentral Component Implementation Guide

## Core Component Architecture

### Component Structure

The cXentral component system follows a structured pattern with the following hierarchy:

1. **Base Components** - Fundamental building blocks (Button, Input, Card)
2. **Composite Components** - Combinations of base components (Form, Table, Modal)
3. **Feature Components** - Business logic components (IntegrationHub, APIExplorer)
4. **Page Templates** - Full page layouts for specific sections

Each component should follow this directory structure:

```
ComponentName/
├── index.ts         # Re-exports everything
├── ComponentName.tsx       # Main component implementation
├── ComponentName.types.ts  # TypeScript interfaces and types
├── ComponentName.test.tsx  # Unit tests
└── subcomponents/   # Additional related components
```

### Component Design Principles

1. **Composition over Inheritance**
   - Components should be composed from smaller pieces
   - Avoid deep inheritance hierarchies
   - Use Higher-Order Components and Hooks for shared functionality

2. **Prop Consistency**
   - Maintain consistent prop naming across components
   - Use standard patterns for common props (onChange, value, etc.)
   - Document all props with JSDoc comments

3. **Styling Approach**
   - Use Tailwind CSS for all styling
   - Leverage Tailwind's utility-first approach
   - Create reusable class compositions with @apply when needed

## Implementation Examples

### 1. Integration Hub Component

The Integration Hub is a core feature component that allows users to visualize and manage their integrations.

#### Component Structure

```
IntegrationHub/
├── index.ts
├── IntegrationHub.tsx
├── IntegrationHub.types.ts
├── IntegrationHub.test.tsx
└── subcomponents/
    ├── PlatformNode.tsx
    ├── ConnectionLine.tsx
    ├── DataFlow.tsx
    └── IntegrationDetails.tsx
```

#### Implementation

```typescript
// IntegrationHub.types.ts
export interface IntegrationHubProps {
  platforms: Platform[];
  connections: Connection[];
  onPlatformSelect?: (platform: Platform) => void;
  onConnectionToggle?: (connection: Connection) => void;
}

export interface Platform {
  id: string;
  name: string;
  type: 'source' | 'destination' | 'both';
  category: 'ccaas' | 'crm' | 'analytics' | 'messaging';
  icon: string;
  status: 'active' | 'inactive' | 'error';
}

export interface Connection {
  id: string;
  sourcePlatformId: string;
  destinationPlatformId: string;
  status: 'active' | 'inactive' | 'error';
  dataFlow: 'one-way' | 'bidirectional';
}

// IntegrationHub.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlatformNode } from './subcomponents/PlatformNode';
import { ConnectionLine } from './subcomponents/ConnectionLine';
import { DataFlow } from './subcomponents/DataFlow';
import { IntegrationDetails } from './subcomponents/IntegrationDetails';
import type { IntegrationHubProps, Platform, Connection } from './IntegrationHub.types';

export const IntegrationHub: React.FC<IntegrationHubProps> = ({
  platforms,
  connections,
  onPlatformSelect,
  onConnectionToggle
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [activeConnections, setActiveConnections] = useState<Connection[]>(connections);

  // Handle platform selection
  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    if (onPlatformSelect) {
      onPlatformSelect(platform);
    }
  };

  // Calculate node positions - in a real implementation, this would be more sophisticated
  const getNodePosition = (index: number, total: number) => {
    const radius = 200;
    const angle = (index / total) * 2 * Math.PI;
    const x = 300 + radius * Math.cos(angle);
    const y = 200 + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Integration Hub</h2>
        <p className="text-gray-600">Manage and monitor your integrations</p>
      </div>

      <div className="relative h-[600px] bg-gray-50 rounded-lg overflow-hidden">
        {/* Render platform nodes */}
        <div className="absolute inset-0">
          {platforms.map((platform, index) => {
            const position = getNodePosition(index, platforms.length);
            return (
              <PlatformNode
                key={platform.id}
                platform={platform}
                position={position}
                selected={selectedPlatform?.id === platform.id}
                onSelect={() => handlePlatformSelect(platform)}
              />
            );
          })}
        </div>

        {/* Render connection lines */}
        <svg className="absolute inset-0">
          {activeConnections.map((connection) => {
            const sourcePlatform = platforms.find(p => p.id === connection.sourcePlatformId);
            const destPlatform = platforms.find(p => p.id === connection.destinationPlatformId);
            
            if (!sourcePlatform || !destPlatform) return null;
            
            const sourcePos = getNodePosition(
              platforms.indexOf(sourcePlatform),
              platforms.length
            );
            const destPos = getNodePosition(
              platforms.indexOf(destPlatform),
              platforms.length
            );
            
            return (
              <ConnectionLine
                key={connection.id}
                connection={connection}
                sourcePosition={sourcePos}
                destinationPosition={destPos}
                onClick={() => {
                  if (onConnectionToggle) {
                    onConnectionToggle(connection);
                  }
                }}
              />
            );
          })}
        </svg>

        {/* Render data flow animations */}
        <div className="absolute inset-0">
          {activeConnections
            .filter(conn => conn.status === 'active')
            .map((connection) => {
              const sourcePlatform = platforms.find(p => p.id === connection.sourcePlatformId);
              const destPlatform = platforms.find(p => p.id === connection.destinationPlatformId);
              
              if (!sourcePlatform || !destPlatform) return null;
              
              const sourcePos = getNodePosition(
                platforms.indexOf(sourcePlatform),
                platforms.length
              );
              const destPos = getNodePosition(
                platforms.indexOf(destPlatform),
                platforms.length
              );
              
              return (
                <DataFlow
                  key={`flow-${connection.id}`}
                  sourcePosition={sourcePos}
                  destinationPosition={destPos}
                  bidirectional={connection.dataFlow === 'bidirectional'}
                />
              );
            })}
        </div>
      </div>

      {/* Details panel */}
      {selectedPlatform && (
        <div className="mt-6">
          <IntegrationDetails
            platform={selectedPlatform}
            connections={activeConnections.filter(
              conn => conn.sourcePlatformId === selectedPlatform.id || 
                      conn.destinationPlatformId === selectedPlatform.id
            )}
          />
        </div>
      )}
    </div>
  );
};
```

### 2. API Explorer Component

The API Explorer is an interactive component that allows users to test and explore the unified API.

#### Component Structure

```
APIExplorer/
├── index.ts
├── APIExplorer.tsx
├── APIExplorer.types.ts
├── APIExplorer.test.tsx
└── subcomponents/
    ├── EndpointSelector.tsx
    ├── ParameterForm.tsx
    ├── ResponseViewer.tsx
    └── CodeGenerator.tsx
```

#### Implementation

```typescript
// APIExplorer.types.ts
export interface APIExplorerProps {
  endpoints: APIEndpoint[];
  onExecute?: (endpoint: APIEndpoint, params: Record<string, any>) => Promise<APIResponse>;
}

export interface APIEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters: {
    path: APIParameter[];
    query: APIParameter[];
    body: APIParameter[];
    headers: APIParameter[];
  };
}

export interface APIParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  required: boolean;
  description: string;
  default?: any;
}

export interface APIResponse {
  status: number;
  headers: Record<string, string>;
  body: any;
}

// APIExplorer.tsx
import React, { useState } from 'react';
import { EndpointSelector } from './subcomponents/EndpointSelector';
import { ParameterForm } from './subcomponents/ParameterForm';
import { ResponseViewer } from './subcomponents/ResponseViewer';
import { CodeGenerator } from './subcomponents/CodeGenerator';
import type { APIExplorerProps, APIEndpoint, APIResponse } from './APIExplorer.types';

export const APIExplorer: React.FC<APIExplorerProps> = ({
  endpoints,
  onExecute
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'parameters' | 'response'>('parameters');

  // Handle endpoint selection
  const handleEndpointSelect = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint);
    setParameters({});
    setResponse(null);
    setActiveTab('parameters');
  };

  // Handle parameter changes
  const handleParameterChange = (parameterName: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [parameterName]: value
    }));
  };

  // Handle API execution
  const handleExecute = async () => {
    if (!selectedEndpoint || !onExecute) return;
    
    setLoading(true);
    try {
      const result = await onExecute(selectedEndpoint, parameters);
      setResponse(result);
      setActiveTab('response');
    } catch (error) {
      setResponse({
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: { error: 'An error occurred' }
      });
      setActiveTab('response');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold">API Explorer</h2>
        <p className="text-gray-600">Test and explore the unified API</p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        {/* Left sidebar - Endpoint selection */}
        <div className="p-4">
          <EndpointSelector
            endpoints={endpoints}
            selectedEndpoint={selectedEndpoint}
            onSelect={handleEndpointSelect}
          />
        </div>

        {/* Center panel - Parameters & Response */}
        <div className="p-4">
          {selectedEndpoint && (
            <>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    selectedEndpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                    selectedEndpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                    selectedEndpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedEndpoint.method}
                  </span>
                  <code className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {selectedEndpoint.path}
                  </code>
                </div>
                <p className="mt-2 text-gray-600">
                  {selectedEndpoint.description}
                </p>
              </div>

              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'parameters'
                      ? 'border-b-2 border-purple-500 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('parameters')}
                >
                  Parameters
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'response'
                      ? 'border-b-2 border-purple-500 text-purple-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('response')}
                  disabled={!response}
                >
                  Response
                </button>
              </div>

              {activeTab === 'parameters' && (
                <>
                  <ParameterForm
                    parameters={[
                      ...(selectedEndpoint.parameters.path || []),
                      ...(selectedEndpoint.parameters.query || []),
                      ...(selectedEndpoint.parameters.body || []),
                      ...(selectedEndpoint.parameters.headers || [])
                    ]}
                    values={parameters}
                    onChange={handleParameterChange}
                  />

                  <div className="mt-4">
                    <button
                      className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                      onClick={handleExecute}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Executing...
                        </>
                      ) : 'Execute'}
                    </button>
                  </div>
                </>
              )}

              {activeTab === 'response' && response && (
                <ResponseViewer response={response} />
              )}
            </>
          )}
        </div>

        {/* Right panel - Code generation */}
        <div className="p-4">
          <h3 className="font-semibold mb-4">Code Example</h3>
          
          {selectedEndpoint && (
            <CodeGenerator
              endpoint={selectedEndpoint}
              parameters={parameters}
            />
          )}
        </div>
      </div>
    </div>
  );
};
```

### 3. Marketplace Component

The Marketplace component is used to browse, search, and install extensions.

#### Component Structure

```
Marketplace/
├── index.ts
├── Marketplace.tsx
├── Marketplace.types.ts
├── Marketplace.test.tsx
└── subcomponents/
    ├── CategorySelector.tsx
    ├── ExtensionCard.tsx
    ├── ExtensionDetail.tsx
    └── SearchBar.tsx
```

#### Implementation

```typescript
// Marketplace.types.ts
export interface MarketplaceProps {
  extensions: Extension[];
  categories: Category[];
  onInstall?: (extension: Extension) => void;
  onViewDetails?: (extension: Extension) => void;
}

export interface Extension {
  id: string;
  name: string;
  description: string;
  vendor: string;
  icon: string;
  category: string[];
  rating: number;
  reviews: number;
  users: number;
  pricing: 'free' | 'paid' | 'freemium';
  price?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Marketplace.tsx
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { CategorySelector } from './subcomponents/CategorySelector';
import { ExtensionCard } from './subcomponents/ExtensionCard';
import { ExtensionDetail } from './subcomponents/ExtensionDetail';
import type { MarketplaceProps, Extension } from './Marketplace.types';

export const Marketplace: React.FC<MarketplaceProps> = ({
  extensions,
  categories,
  onInstall,
  onViewDetails
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExtension, setSelectedExtension] = useState<Extension | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Filter extensions based on search query and selected category
  const filteredExtensions = useMemo(() => {
    return extensions.filter(extension => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        extension.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        extension.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        extension.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by category
      const matchesCategory = selecte