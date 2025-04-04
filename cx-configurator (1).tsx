import React, { useState } from 'react';
import { 
  Settings, Cloud, Database, Shield, 
  Server, Network, Clock, Zap 
} from 'lucide-react';

const PlatformConfigurator = () => {
  const [step, setStep] = useState(1);
  const [configuration, setConfiguration] = useState({
    cloudProvider: '',
    scale: '',
    services: [],
    security: []
  });

  const [calculatedMetrics, setCalculatedMetrics] = useState({
    estimatedTimeToMarket: null,
    costOptimization: null,
    performanceScore: null
  });

  const steps = [
    {
      id: 1,
      title: 'Select Cloud Infrastructure',
      description: 'Choose your primary cloud provider and deployment model',
      options: [
        { id: 'aws', name: 'AWS', icon: Cloud },
        { id: 'azure', name: 'Azure', icon: Cloud },
        { id: 'gcp', name: 'Google Cloud', icon: Cloud },
        { id: 'hybrid', name: 'Hybrid/Multi-cloud', icon: Cloud }
      ]
    },
    {
      id: 2,
      title: 'Scale Requirements',
      description: 'Define your scaling and performance needs',
      options: [
        { id: 'startup', name: 'Startup (< 1000 users/day)', icon: Server },
        { id: 'growth', name: 'Growth (1000-10000 users/day)', icon: Server },
        { id: 'enterprise', name: 'Enterprise (10000+ users/day)', icon: Server }
      ]
    },
    {
      id: 3,
      title: 'Required Services',
      description: 'Select the services you need',
      options: [
        { id: 'voice', name: 'Voice Processing', icon: Zap },
        { id: 'analytics', name: 'Real-time Analytics', icon: Database },
        { id: 'automation', name: 'Workflow Automation', icon: Settings }
      ]
    }
  ];

  const calculateMetrics = (config) => {
    // Example calculation logic
    const baseTime = {
      startup: 30,
      growth: 45,
      enterprise: 60
    };

    const serviceComplexity = {
      voice: 15,
      analytics: 10,
      automation: 20
    };

    let timeToMarket = baseTime[config.scale] || 30;
    config.services.forEach(service => {
      timeToMarket += serviceComplexity[service] || 0;
    });

    return {
      estimatedTimeToMarket: timeToMarket,
      costOptimization: Math.round(Math.random() * 40 + 60),
      performanceScore: Math.round(Math.random() * 30 + 70)
    };
  };

  const handleSelection = (key, value) => {
    const newConfig = { ...configuration, [key]: value };
    setConfiguration(newConfig);
    setCalculatedMetrics(calculateMetrics(newConfig));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Platform Configuration Wizard</h1>
        <p className="text-gray-600">
          Design your optimal customer experience platform
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((s) => (
          <div 
            key={s.id}
            className={`flex-1 border-t-4 pt-4 ${
              step >= s.id ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            <span className="font-medium">{s.title}</span>
          </div>
        ))}
      </div>

      {/* Current Step Content */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{steps[step-1].title}</h2>
        <p className="text-gray-600 mb-6">{steps[step-1].description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps[step-1].options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => handleSelection(
                  step === 1 ? 'cloudProvider' :
                  step === 2 ? 'scale' : 'services',
                  option.id
                )}
                className={`p-4 border rounded-lg flex items-center gap-3 hover:bg-blue-50
                  ${configuration[step === 1 ? 'cloudProvider' :
                    step === 2 ? 'scale' : 'services'] === option.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                  }`}
              >
                <Icon className="w-6 h-6 text-blue-500" />
                <span className="font-medium">{option.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Dashboard */}
      {calculatedMetrics.estimatedTimeToMarket && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Estimated Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Time to Market</span>
              </div>
              <p className="text-2xl font-bold">{calculatedMetrics.estimatedTimeToMarket} days</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-green-500" />
                <span className="font-medium">Cost Optimization</span>
              </div>
              <p className="text-2xl font-bold">{calculatedMetrics.costOptimization}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-purple-500" />
                <span className="font-medium">Performance Score</span>
              </div>
              <p className="text-2xl font-bold">{calculatedMetrics.performanceScore}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          disabled={step === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length, step + 1))}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={step === steps.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PlatformConfigurator;
