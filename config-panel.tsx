import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Settings, Shield, Zap, Cloud } from 'lucide-react';

const ConfigurationPanel = () => {
  const [config, setConfig] = useState({
    security: {
      level: 'enterprise',
      mfa: true,
      encryption: 'AES-256',
      auditLevel: 'detailed'
    },
    performance: {
      caching: true,
      compression: true,
      loadBalancing: 'adaptive'
    },
    ai: {
      agentAutonomy: 0.7,
      learningRate: 0.5,
      interactionMode: 'supervised'
    },
    scaling: {
      autoScaling: true,
      replicationFactor: 3,
      resourceAllocation: 'dynamic'
    }
  });

  const updateConfig = (section, key, value) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5" />
          <h3 className="text-lg font-semibold">Architecture Configuration</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Security Settings */}
          <section>
            <h4 className="flex items-center space-x-2 font-medium mb-4">
              <Shield className="w-4 h-4" />
              <span>Security Configuration</span>
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Security Level</label>
                <select 
                  className="w-full rounded-md border-gray-300"
                  value={config.security.level}
                  onChange={(e) => updateConfig('security', 'level', e.target.value)}
                >
                  <option value="basic">Basic</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="military">Military Grade</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Multi-Factor Authentication</span>
                <Switch 
                  checked={config.security.mfa}
                  onCheckedChange={(checked) => updateConfig('security', 'mfa', checked)}
                />
              </div>
            </div>
          </section>

          {/* AI Agent Settings */}
          <section>
            <h4 className="flex items-center space-x-2 font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>AI Agent Configuration</span>
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Agent Autonomy Level</label>
                <Slider 
                  value={[config.ai.agentAutonomy * 100]}
                  onValueChange={([value]) => updateConfig('ai', 'agentAutonomy', value / 100)}
                  max={100}
                  step={1}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Learning Mode</label>
                <select 
                  className="w-full rounded-md border-gray-300"
                  value={config.ai.interactionMode}
                  onChange={(e) => updateConfig('ai', 'interactionMode', e.target.value)}
                >
                  <option value="supervised">Supervised</option>
                  <option value="semi-supervised">Semi-Supervised</option>
                  <option value="autonomous">Autonomous</option>
                </select>
              </div>
            </div>
          </section>

          {/* Performance Settings */}
          <section>
            <h4 className="flex items-center space-x-2 font-medium mb-4">
              <Cloud className="w-4 h-4" />
              <span>Performance & Scaling</span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-Scaling</span>
                <Switch 
                  checked={config.scaling.autoScaling}
                  onCheckedChange={(checked) => updateConfig('scaling', 'autoScaling', checked)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Resource Allocation</label>
                <select 
                  className="w-full rounded-md border-gray-300"
                  value={config.scaling.resourceAllocation}
                  onChange={(e) => updateConfig('scaling', 'resourceAllocation', e.target.value)}
                >
                  <option value="static">Static</option>
                  <option value="dynamic">Dynamic</option>
                  <option value="predictive">Predictive</option>
                </select>
              </div>
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;