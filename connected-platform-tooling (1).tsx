import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  Settings, Code, GitBranch, Box, Cloud,
  Shield, Activity, Database, Network,
  Lock, AlertTriangle, BarChart, Users,
  CircuitBoard, Bot, Cpu, 
  MessageSquare, ArrowRight
} from 'lucide-react';

const ConnectedPlatformLandscape = () => {
  const [activeFlow, setActiveFlow] = useState(null);

  const Section = ({ title, children, className, id }) => (
    <div 
      className={`border border-purple-200 rounded-lg ${className} p-4 relative`}
      onMouseEnter={() => setActiveFlow(id)}
      onMouseLeave={() => setActiveFlow(null)}
    >
      <h3 className="text-sm font-semibold bg-purple-100 -mt-6 mb-4 px-2 py-1 inline-block rounded">
        {title}
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );

  const Tool = ({ icon: Icon, name, color = "text-gray-600" }) => (
    <div className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Icon className={`w-6 h-6 ${color} mb-2`} />
      <span className="text-xs text-center">{name}</span>
    </div>
  );

  const DataFlow = ({ from, to, active }) => (
    <div className={`absolute h-px bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300
      ${active ? 'opacity-100' : 'opacity-0'}`}
      style={{
        left: '50%',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '20px',
        top: 'calc(100% + 1px)'
      }}
    >
      <ArrowRight className="w-4 h-4 text-purple-500 absolute -bottom-2 -right-2" />
    </div>
  );

  const flows = {
    dev: ['integration', 'ai'],
    integration: ['resource', 'security'],
    ai: ['resource', 'monitoring'],
    resource: ['security', 'monitoring'],
    security: ['monitoring'],
  };

  return (
    <div className="w-full p-8 bg-gray-50">
      {/* Developer Experience Plane */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <Section title="CX Development Studio" id="dev">
          <Tool icon={Code} name="Visual Studio Code" />
          <Tool icon={Code} name="WebStorm" />
          <Tool icon={Code} name="Eclipse" />
          <Tool icon={Cloud} name="Cloud IDE" />
          <DataFlow active={activeFlow === 'dev'} />
        </Section>

        <Section title="Developer Portal" id="portal">
          <Tool icon={Box} name="Component Library" />
          <Tool icon={Cloud} name="API Documentation" />
          <Tool icon={Code} name="SDK Resources" />
          <Tool icon={Activity} name="Monitoring Tools" />
        </Section>

        <Section title="Version Control & CI/CD" id="cicd">
          <Tool icon={GitBranch} name="Git" />
          <Tool icon={Box} name="GitHub" />
          <Tool icon={Cloud} name="GitLab" />
          <Tool icon={Activity} name="Jenkins" />
        </Section>
      </div>

      {/* Integration & AI Plane */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <Section title="cXonnect Hub" id="integration">
          <Tool icon={Cloud} name="CCaaS Integration" />
          <Tool icon={Network} name="CPaaS Services" />
          <Tool icon={Box} name="Marketplace" />
          <Tool icon={Activity} name="API Gateway" />
          <DataFlow active={activeFlow === 'integration'} />
        </Section>

        <Section title="AI Agent Network" id="ai">
          <Tool icon={Bot} name="Agent Orchestration" />
          <Tool icon={CircuitBoard} name="Learning Engine" />
          <Tool icon={Cpu} name="Predictive Analytics" />
          <Tool icon={MessageSquare} name="NLP Services" />
          <DataFlow active={activeFlow === 'ai'} />
        </Section>
      </div>

      {/* Resource Plane */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <Section title="Compute Resources" id="resource">
          <Tool icon={Cloud} name="Kubernetes" />
          <Tool icon={Box} name="Docker" />
          <Tool icon={Cloud} name="Serverless" />
          <Tool icon={Activity} name="Auto-scaling" />
          <DataFlow active={activeFlow === 'resource'} />
        </Section>

        <Section title="Data Services" id="data">
          <Tool icon={Database} name="Time Series DB" />
          <Tool icon={Database} name="Document Store" />
          <Tool icon={Database} name="Cache" />
          <Tool icon={Database} name="Message Queue" />
        </Section>

        <Section title="Network Services" id="network">
          <Tool icon={Network} name="Service Mesh" />
          <Tool icon={Network} name="Load Balancer" />
          <Tool icon={Shield} name="WAF" />
          <Tool icon={Network} name="CDN" />
        </Section>
      </div>

      {/* Security & Monitoring Plane */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <Section title="Security & Compliance" id="security">
          <Tool icon={Lock} name="IAM" />
          <Tool icon={Shield} name="Encryption" />
          <Tool icon={AlertTriangle} name="Threat Detection" />
          <Tool icon={Shield} name="Compliance" />
          <DataFlow active={activeFlow === 'security'} />
        </Section>

        <Section title="Monitoring & Analytics" id="monitoring">
          <Tool icon={Activity} name="Metrics" />
          <Tool icon={BarChart} name="Analytics" />
          <Tool icon={Activity} name="Logging" />
          <Tool icon={AlertTriangle} name="Alerting" />
        </Section>
      </div>

      {/* Interactive Legend */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
        <h4 className="text-sm font-semibold mb-4">Data Flow Legend</h4>
        <div className="grid grid-cols-4 gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2" />
            <span className="text-sm">Control Flow</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-2" />
            <span className="text-sm">Data Flow</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2" />
            <span className="text-sm">Event Flow</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mr-2" />
            <span className="text-sm">Security Flow</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-8">
        Powered by cXentral® | cXonnect Hub™ | © 2024 cXentral. All rights reserved.
      </div>
    </div>
  );
};

export default ConnectedPlatformLandscape;