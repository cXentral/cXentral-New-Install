# cXentral Page Specifications & UI Framework

## Global UI Components

### Design System Guidelines
```typescript
// styles/theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#f5f3ff',
      100: '#ede9fe',
      500: '#8b5cf6',
      600: '#7c3aed',
      700: '#6d28d9'
    },
    secondary: {
      // Cool grays for secondary elements
      50: '#f8fafc',
      100: '#f1f5f9',
      500: '#64748b',
      600: '#475569',
      700: '#334155'
    },
    accent: {
      blue: '#3b82f6',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b'
    }
  },
  typography: {
    fonts: {
      sans: 'Inter var, system-ui, -apple-system, sans-serif',
      mono: 'SF Mono, monospace'
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    }
  },
  spacing: {
    page: {
      x: '1.5rem',
      y: '2rem'
    },
    section: {
      x: '2rem',
      y: '4rem'
    }
  }
};
```

### Base Components

#### Button System
```typescript
// components/common/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  leftIcon,
  rightIcon,
  children
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
    ghost: 'text-primary-600 hover:bg-primary-50'
  };
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={disabled || loading}
    >
      {loading && <LoadingSpinner className="mr-2" />}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
```

#### Card System
```typescript
// components/common/Card.tsx
interface CardProps {
  variant: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  interactive = false,
  children
}) => {
  const baseStyles = 'rounded-xl overflow-hidden';
  const variantStyles = {
    default: 'bg-white',
    elevated: 'bg-white shadow-lg',
    bordered: 'bg-white border border-gray-200'
  };
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  const interactiveStyles = interactive 
    ? 'hover:shadow-lg transition-shadow cursor-pointer' 
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${interactiveStyles}
      `}
    >
      {children}
    </div>
  );
};
```

### 5. Unified API Page

#### API Explorer
```typescript
// components/api/APIExplorer.tsx
interface Endpoint {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description: string;
  parameters: {
    path: Parameter[];
    query: Parameter[];
    body: Parameter[];
    headers: Parameter[];
  };
  responses: {
    [statusCode: string]: {
      description: string;
      schema: object;
    };
  };
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default?: string | number | boolean;
}

export const APIExplorer: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'parameters' | 'response'>('parameters');
  
  const handleParameterChange = (name: string, value: any) => {
    setParameters((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleExecute = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would make an actual API call
      // Here we're just simulating a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse({
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          success: true,
          data: {
            // Sample response data
          }
        }
      });
      setActiveTab('response');
    } catch (error) {
      setResponse({
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          success: false,
          error: 'An error occurred'
        }
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* API Explorer Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold">API Explorer</h2>
        <div className="flex gap-2">
          <Select
            placeholder="Select endpoint"
            onChange={(endpoint) => setSelectedEndpoint(endpoint)}
          />
          <Button
            variant="primary"
            size="sm"
            loading={loading}
            disabled={!selectedEndpoint}
            onClick={handleExecute}
          >
            Execute
          </Button>
        </div>
      </div>
      
      {/* API Explorer Content */}
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        {/* Left Panel - Endpoint Information */}
        <div className="p-4">
          {selectedEndpoint ? (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Badge
                  method={selectedEndpoint.method}
                />
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {selectedEndpoint.path}
                </code>
              </div>
              <p className="text-gray-600 mb-4">
                {selectedEndpoint.description}
              </p>
              
              {/* Parameter Tabs */}
              <Tabs
                tabs={[
                  { id: 'path', label: 'Path Parameters' },
                  { id: 'query', label: 'Query Parameters' },
                  { id: 'body', label: 'Body' },
                  { id: 'headers', label: 'Headers' }
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
              
              {/* Parameter Forms */}
              <div className="mt-4">
                {activeTab === 'parameters' && (
                  <ParameterForm
                    parameters={selectedEndpoint.parameters[activeTab]}
                    values={parameters}
                    onChange={handleParameterChange}
                  />
                )}
                
                {activeTab === 'response' && response && (
                  <ResponseViewer response={response} />
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <FileSearch className="w-10 h-10 text-gray-400 mb-2" />
              <p className="text-gray-500">
                Select an endpoint to explore
              </p>
            </div>
          )}
        </div>
        
        {/* Right Panel - Code Generation */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Code Example</h3>
          
          <Tabs
            tabs={[
              { id: 'curl', label: 'cURL' },
              { id: 'javascript', label: 'JavaScript' },
              { id: 'python', label: 'Python' },
              { id: 'go', label: 'Go' }
            ]}
            activeTab="curl"
            onChange={() => {}}
          />
          
          <div className="mt-4">
            <CodeBlock
              language="bash"
              code={generateCodeExample(selectedEndpoint, parameters, 'curl')}
              copyable
            />
          </div>
        </div>
      </div>
    </div>
  );
};
```

#### API Documentation
```typescript
// components/api/APIDocumentation.tsx
interface APICategory {
  name: string;
  description: string;
  endpoints: APIEndpoint[];
}

interface APIEndpoint {
  name: string;
  path: string;
  method: string;
  description: string;
  parameters: APIParameter[];
  responses: APIResponse[];
  examples: APIExample[];
}

export const APIDocumentation: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeEndpoint, setActiveEndpoint] = useState<string>('');
  
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar Navigation */}
      <div className="col-span-3 border-r border-gray-200 pr-6">
        <div className="sticky top-6">
          <h3 className="text-lg font-semibold mb-4">API Reference</h3>
          
          <div className="space-y-4">
            {apiCategories.map((category) => (
              <div key={category.name}>
                <button
                  className={`flex items-center justify-between w-full text-left px-2 py-1 rounded ${
                    activeCategory === category.name
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category.name)}
                >
                  <span>{category.name}</span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      activeCategory === category.name ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                
                {activeCategory === category.name && (
                  <div className="mt-2 ml-4 space-y-1">
                    {category.endpoints.map((endpoint) => (
                      <button
                        key={endpoint.name}
                        className={`block w-full text-left px-2 py-1 rounded text-sm ${
                          activeEndpoint === endpoint.name
                            ? 'bg-purple-50 text-purple-700'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveEndpoint(endpoint.name)}
                      >
                        {endpoint.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Documentation Content */}
      <div className="col-span-9">
        {activeEndpoint ? (
          <APIEndpointDocumentation
            endpoint={findEndpoint(activeCategory, activeEndpoint)}
          />
        ) : activeCategory ? (
          <APICategoryOverview
            category={findCategory(activeCategory)}
          />
        ) : (
          <APIOverview />
        )}
      </div>
    </div>
  );
};
```

## Page-Specific Components

### 1. Homepage

#### Hero Section
```typescript
// components/home/Hero.tsx
export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-3xl" />
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Transform Your
            <span className="block text-blue-200">Customer Experience</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Unify your customer experience stack with intelligent integration,
            powerful extensions, and AI-driven insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight />}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Play />}
            >
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
```

#### Feature Grid
```typescript
// components/home/FeatureGrid.tsx
interface Feature {
  title: string;
  description: string;
  icon: React.FC;
  color: string;
}

const features: Feature[] = [
  {
    title: 'Integration Hub',
    description: 'Connect and orchestrate your entire CX stack with intelligent automation.',
    icon: Cube,
    color: 'blue'
  },
  {
    title: 'Extension Marketplace',
    description: 'Enhance your capabilities with trusted, enterprise-ready solutions.',
    icon: Puzzle,
    color: 'purple'
  },
  {
    title: 'AI Agentverse',
    description: 'Deploy and manage AI agents across your customer touchpoints.',
    icon: Sparkles,
    color: 'green'
  },
  {
    title: 'Unified API',
    description: 'One API to power your entire customer experience stack.',
    icon: Code,
    color: 'orange'
  }
];

export const FeatureGrid: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to deliver exceptional experiences
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Powerful tools and capabilities designed for modern customer experience teams.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              variant="elevated"
              padding="lg"
              interactive
            >
              <div className={`w-12 h-12 rounded-lg bg-${feature.color}-100 flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
```

### 2. Integration Hub Page

#### Integration Flow Visualization
```typescript
// components/platform/IntegrationFlow.tsx
interface Platform {
  id: string;
  name: string;
  type: 'source' | 'destination';
  icon: string;
  status: 'active' | 'inactive';
}

interface Connection {
  from: string;
  to: string;
  status: 'active' | 'error' | 'warning';
}

export const IntegrationFlow: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [connections, setConnections] = useState<Connection[]>([]);

  return (
    <div className="relative h-[600px] bg-gray-50 rounded-xl overflow-hidden">
      {/* Platform Nodes */}
      <motion.div className="absolute inset-0">
        {platforms.map((platform) => (
          <PlatformNode
            key={platform.id}
            platform={platform}
            selected={selectedPlatform?.id === platform.id}
            onSelect={() => setSelectedPlatform(platform)}
          />
        ))}
      </motion.div>

      {/* Connection Lines */}
      <svg className="absolute inset-0">
        {connections.map((connection) => (
          <ConnectionLine
            key={`${connection.from}-${connection.to}`}
            connection={connection}
          />
        ))}
      </svg>

      {/* Data Flow Animation */}
      <motion.div className="absolute inset-0">
        {connections.map((connection) => (
          <DataFlowParticles
            key={`flow-${connection.from}-${connection.to}`}
            connection={connection}
          />
        ))}
      </motion.div>
    </div>
  );
};
```

### 3. Extension Marketplace Page

#### Extension Card
```typescript
// components/marketplace/ExtensionCard.tsx
interface ExtensionProps {
  name: string;
  description: string;
  vendor: string;
  rating: number;
  users: number;
  pricing: string;
  tags: string[];
  icon: string;
}

export const ExtensionCard: React.FC<ExtensionProps> = ({
  name,
  description,
  vendor,
  rating,
  users,
  pricing,
  tags,
  icon
}) => {
  return (
    <Card variant="elevated" padding="none" interactive>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <img
              src={icon}
              alt={name}
              className="w-12 h-12 rounded-lg"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {name}
              </h3>
              <p className="text-sm text-gray-600">
                by {vendor}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-900">
              {rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-sm text-gray-600">
              {users.toLocaleString()} users
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            rightIcon={<Download />}
          >
            Install
          </Button>
        </div>
      </div>
    </Card>
  );
};
```

### 4. AI Agentverse Page

#### Agent Orchestration Visualization
```typescript
// components/platform/AgentOrchestration.tsx
interface Agent {
  id: string;
  name: string;
  type: 'conversational' | 'task' | 'analytical';
  status: 'active' | 'learning' | 'idle';
  performance: {
    accuracy: number;
    latency: number;
    satisfaction: number;
  };
}

export const AgentOrchestration: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">AI Agent Orchestration</h2>
        <p className="text-gray-600">Deploy, manage and orchestrate AI agents across your customer touchpoints</p>
      </div>

      {/* Visualization Canvas */}
      <div className="relative h-96 border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        {/* Agent Nodes */}
        <div className="absolute inset-0">
          {agents.map((agent) => (
            <AgentNode
              key={agent.id}
              agent={agent}
              selected={selectedAgent?.id === agent.id}
              onSelect={() => setSelectedAgent(agent)}
            />
          ))}
          
          {/* Central Orchestrator Node */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white">
              <Brain className="w-10 h-10" />
            </div>
            <div className="mt-2 text-center font-medium">Orchestrator</div>
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0">
          {/* Connection implementation */}
        </svg>
      </div>

      {/* Agent Details Panel */}
      {selectedAgent && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{selectedAgent.name}</h3>
            <Badge status={selectedAgent.status} />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            <Metric
              label="Accuracy"
              value={`${selectedAgent.performance.accuracy}%`}
              color="green"
            />
            <Metric
              label="Latency"
              value={`${selectedAgent.performance.latency}ms`}
              color="blue"
            />
            <Metric
              label="Satisfaction"
              value={`${selectedAgent.performance.satisfaction}%`}
              color="purple"
            />
          </div>
        </div>
      )}
    </div>
  );
};
