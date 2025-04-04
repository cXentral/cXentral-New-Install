import React, { useState } from 'react';
import { Settings, Building2, Users, Phone, MessageSquare, BarChart2, Shield, Cloud, Server } from 'lucide-react';

// Configuration model based on real integration requirements
const initialConfig = {
  organization: {
    size: '',
    industry: '',
    region: '',
    compliance: []
  },
  requirements: {
    channels: [],
    volume: '',
    languages: [],
    integrations: []
  },
  infrastructure: {
    deployment: '',
    dataResidency: [],
    recording: '',
    retention: ''
  }
};

const configOptions = {
  industries: ['Banking', 'Insurance', 'Retail', 'Telecom', 'Healthcare'],
  regions: ['UAE', 'KSA', 'Qatar', 'Kuwait', 'Oman', 'Bahrain'],
  compliance: ['SAMA', 'CITC', 'GDPR', 'PCI-DSS', 'HIPAA'],
  channels: ['Voice', 'Email', 'Chat', 'SMS', 'WhatsApp', 'Social'],
  languages: ['English', 'Arabic', 'Hindi', 'Urdu', 'French'],
  deployments: ['Cloud', 'Hybrid', 'Edge'],
  volumes: ['1-50', '51-200', '201-500', '501-1000', '1000+'],
  integrations: [
    { category: 'CCaaS', vendors: ['Genesys', 'NICE', 'Five9'] },
    { category: 'CRM', vendors: ['Salesforce', 'Microsoft', 'Oracle'] },
    { category: 'WEM', vendors: ['Verint', 'Calabrio', 'NICE'] }
  ]
};

export default function CXConfigurator() {
  const [config, setConfig] = useState(initialConfig);
  const [currentStep, setCurrentStep] = useState('organization');
  const [showSummary, setShowSummary] = useState(false);

  const steps = {
    organization: {
      title: 'Organization Profile',
      icon: Building2,
      fields: ['size', 'industry', 'region', 'compliance']
    },
    requirements: {
      title: 'Requirements',
      icon: Users,
      fields: ['channels', 'volume', 'languages', 'integrations']
    },
    infrastructure: {
      title: 'Infrastructure',
      icon: Cloud,
      fields: ['deployment', 'dataResidency', 'recording', 'retention']
    }
  };

  const handleConfigUpdate = (section, field, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderField = (section, field) => {
    const value = config[section][field];
    
    switch(field) {
      case 'industry':
        return (
          <select 
            value={value}
            onChange={(e) => handleConfigUpdate(section, field, e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">Select Industry</option>
            {configOptions.industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        );
      
      case 'channels':
        return (
          <div className="flex flex-wrap gap-2">
            {configOptions.channels.map(channel => (
              <button
                key={channel}
                onClick={() => {
                  const newChannels = value.includes(channel)
                    ? value.filter(c => c !== channel)
                    : [...value, channel];
                  handleConfigUpdate(section, field, newChannels);
                }}
                className={`px-3 py-1 rounded-full text-sm ${
                  value.includes(channel)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {channel}
              </button>
            ))}
          </div>
        );

      case 'deployment':
        return (
          <div className="grid grid-cols-3 gap-4">
            {configOptions.deployments.map(dep => (
              <button
                key={dep}
                onClick={() => handleConfigUpdate(section, field, dep)}
                className={`p-4 rounded-lg border flex flex-col items-center gap-2 ${
                  value === dep 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-200'
                }`}
              >
                {dep === 'Cloud' ? (
                  <Cloud className="w-6 h-6 text-purple-600" />
                ) : dep === 'Hybrid' ? (
                  <Server className="w-6 h-6 text-purple-600" />
                ) : (
                  <Settings className="w-6 h-6 text-purple-600" />
                )}
                <span>{dep}</span>
              </button>
            ))}
          </div>
        );

      // Add more field types as needed
      
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleConfigUpdate(section, field, e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder={`Enter ${field}`}
          />
        );
    }
  };

  const renderStep = () => {
    const step = steps[currentStep];
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <step.icon className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">{step.title}</h2>
        </div>

        <div className="space-y-4">
          {step.fields.map(field => (
            <div key={field} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              {renderField(currentStep, field)}
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={() => {
              const stepKeys = Object.keys(steps);
              const currentIndex = stepKeys.indexOf(currentStep);
              if (currentIndex > 0) {
                setCurrentStep(stepKeys[currentIndex - 1]);
              }
            }}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Back
          </button>
          <button
            onClick={() => {
              const stepKeys = Object.keys(steps);
              const currentIndex = stepKeys.indexOf(currentStep);
              if (currentIndex < stepKeys.length - 1) {
                setCurrentStep(stepKeys[currentIndex + 1]);
              } else {
                setShowSummary(true);
              }
            }}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg"
          >
            {currentStep === Object.keys(steps)[Object.keys(steps).length - 1] ? 'Review' : 'Next'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        {!showSummary ? (
          renderStep()
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Configuration Summary</h2>
            {/* Add summary visualization */}
          </div>
        )}
      </div>
    </div>
  );
}