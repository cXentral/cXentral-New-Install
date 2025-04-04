import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Users, Clock, Settings, Database, Cloud, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const scenarioTemplates = {
  smallBusiness: {
    name: 'Small Business',
    description: 'Ideal for companies with basic integration needs',
    baseUsers: 10,
    integrationCount: 3,
    dataVolume: 'low',
    supportTier: 'basic',
    customization: 'low'
  },
  midMarket: {
    name: 'Mid-Market',
    description: 'Balanced solution for growing companies',
    baseUsers: 50,
    integrationCount: 10,
    dataVolume: 'medium',
    supportTier: 'standard',
    customization: 'medium'
  },
  enterprise: {
    name: 'Enterprise',
    description: 'Full-featured solution for large organizations',
    baseUsers: 200,
    integrationCount: 25,
    dataVolume: 'high',
    supportTier: 'premium',
    customization: 'high'
  }
};

const CostCalculator = () => {
  const [scenario, setScenario] = useState('midMarket');
  const [config, setConfig] = useState(scenarioTemplates.midMarket);
  const [projectedData, setProjectedData] = useState([]);

  const calculateMonthlyCost = () => {
    const baseCosts = {
      users: {
        low: 20,
        medium: 15,
        high: 10
      },
      integration: {
        low: 200,
        medium: 150,
        high: 100
      },
      support: {
        basic: 500,
        standard: 2000,
        premium: 5000
      },
      dataVolume: {
        low: 0.10,
        medium: 0.08,
        high: 0.05
      },
      customization: {
        low: 1000,
        medium: 3000,
        high: 8000
      }
    };

    const userCost = config.baseUsers * baseCosts.users[config.dataVolume];
    const integrationCost = config.integrationCount * baseCosts.integration[config.dataVolume];
    const supportCost = baseCosts.support[config.supportTier];
    const customizationCost = baseCosts.customization[config.customization];

    return userCost + integrationCost + supportCost + customizationCost;
  };

  const generateProjectedData = () => {
    const monthlyCost = calculateMonthlyCost();
    const data = [];
    
    for (let month = 1; month <= 12; month++) {
      const projected = monthlyCost * (1 + (month * 0.02)); // Assuming 2% monthly growth
      data.push({
        month: `Month ${month}`,
        cost: projected,
        savings: projected * 0.25 // Estimated savings of 25%
      });
    }

    return data;
  };

  useEffect(() => {
    setConfig(scenarioTemplates[scenario]);
    setProjectedData(generateProjectedData());
  }, [scenario]);

  useEffect(() => {
    setProjectedData(generateProjectedData());
  }, [config]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Scenario Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Integration Scenario</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(scenarioTemplates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setScenario(key)}
              className={`p-4 rounded-lg border transition-colors ${
                scenario === key 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <h3 className="font-semibold mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h3 className="font-semibold mb-4">Integration Configuration</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Users
            </label>
            <input
              type="number"
              value={config.baseUsers}
              onChange={(e) => setConfig({...config, baseUsers: parseInt(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Integrations
            </label>
            <input
              type="number"
              value={config.integrationCount}
              onChange={(e) => setConfig({...config, integrationCount: parseInt(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Data Volume
            </label>
            <select
              value={config.dataVolume}
              onChange={(e) => setConfig({...config, dataVolume: e.target.value})}
              className="w-full p-2 border rounded-lg"
            >
              <option value="low">Low (&lt; 1M records/month)</option>
              <option value="medium">Medium (1-10M records/month)</option>
              <option value="high">High (&gt; 10M records/month)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold mb-4">Support & Customization</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Support Tier
            </label>
            <select
              value={config.supportTier}
              onChange={(e) => setConfig({...config, supportTier: e.target.value})}
              className="w-full p-2 border rounded-lg"
            >
              <option value="basic">Basic (Email Support)</option>
              <option value="standard">Standard (24/5 Support)</option>
              <option value="premium">Premium (24/7 Support)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customization Level
            </label>
            <select
              value={config.customization}
              onChange={(e) => setConfig({...config, customization: e.target.value})}
              className="w-full p-2 border rounded-lg"
            >
              <option value="low">Low (Standard Features)</option>
              <option value="medium">Medium (Some Customization)</option>
              <option value="high">High (Fully Custom)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <DollarSign className="w-5 h-5" />
              <h4 className="font-semibold">Monthly Cost</h4>
            </div>
            <div className="text-2xl font-bold">
              ${Math.round(calculateMonthlyCost()).toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Calculator className="w-5 h-5" />
              <h4 className="font-semibold">Annual Cost</h4>
            </div>
            <div className="text-2xl font-bold">
              ${Math.round(calculateMonthlyCost() * 12).toLocaleString()}
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Zap className="w-5 h-5" />
              <h4 className="font-semibold">Est. ROI (3yr)</h4>
            </div>
            <div className="text-2xl font-bold">285%</div>
          </div>
        </div>
      </div>

      {/* Projected Costs Chart */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">12-Month Cost Projection</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#8b5cf6" 
                name="Total Cost"
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="#10b981" 
                name="Projected Savings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CostCalculator;