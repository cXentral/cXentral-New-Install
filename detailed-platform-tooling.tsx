import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  Settings, Code, GitBranch, Box, Cloud,
  Shield, Activity, Database, Network,
  Lock, AlertTriangle, BarChart, Users,
  CircuitBoard, Bot, Cpu, 
  MessageSquare, Workflow
} from 'lucide-react';

const PlatformToolingLandscape = () => {
  const Section = ({ title, children, className }) => (
    <div className={`border border-purple-200 rounded-lg ${className} p-4`}>
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

  return (
    <div className="w-full p-8 bg-gray-50">
      {/* Developer Experience Plane */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Section title="CX Development Studio">
          <Tool icon={Code} name="Visual Studio Code" />
          <Tool icon={Code} name="WebStorm" />
          <Tool icon={Code} name="Eclipse" />
          <Tool icon={Cloud} name="Cloud IDE" />
        </Section>

        <Section title="Developer Portal">
          <Tool icon={Box} name="Component Library" />
          <Tool icon={Cloud} name="API Documentation" />
          <Tool icon={Code} name="SDK Resources" />
          <Tool icon={Activity} name="Monitoring Tools" />
        </Section>

        <Section title="Version Control & CI/CD">
          <Tool icon={GitBranch} name="Git" />
          <Tool icon={Box} name="GitHub" />
          <Tool icon={Cloud} name="GitLab" />
          <Tool icon={Activity} name="Jenkins" />
        </Section>
      </div>

      {/* Integration Plane */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Section title="cXonnect Hub">
          <Tool icon={Cloud} name="CCaaS Integration" />
          <Tool icon={Network} name="CPaaS Services" />
          <Tool icon={Box} name="Marketplace" />
          <Tool icon={Activity} name="API Gateway" />
        </Section>

        <Section title="AI Agent Network">
          <Tool icon={Bot} name="Agent Orchestration" />
          <Tool icon={CircuitBoard} name="Learning Engine" />
          <Tool icon={Cpu} name="Predictive Analytics" />
          <Tool icon={MessageSquare} name="NLP Services" />
        </Section>
      </div>

      {/* Resource Plane */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Section title="Compute Resources">
          <Tool icon={Cloud} name="Kubernetes" />
          <Tool icon={Box} name="Docker" />
          <Tool icon={Cloud} name="Serverless" />
          <Tool icon={Activity} name="Auto-scaling" />
        </Section>

        <Section title="Data Services">
          <Tool icon={Database} name="Time Series DB" />
          <Tool icon={Database} name="Document Store" />
          <Tool icon={Database} name="Cache" />
          <Tool icon={Database} name="Message Queue" />
        </Section>

        <Section title="Network Services">
          <Tool icon={Network} name="Service Mesh" />
          <Tool icon={Network} name="Load Balancer" />
          <Tool icon={Shield} name="WAF" />
          <Tool icon={Network} name="CDN" />
        </Section>
      </div>

      {/* Security Plane */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <Section title="Security & Compliance">
          <Tool icon={Lock} name="IAM" />
          <Tool icon={Shield} name="Encryption" />
          <Tool icon={AlertTriangle} name="Threat Detection" />
          <Tool icon={Shield} name="Compliance" />
        </Section>

        <Section title="Monitoring & Analytics">
          <Tool icon={Activity} name="Metrics" />
          <Tool icon={BarChart} name="Analytics" />
          <Tool icon={Activity} name="Logging" />
          <Tool icon={AlertTriangle} name="Alerting" />
        </Section>
      </div>

      {/* Experience & User Plane */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Section title="Customer Experience">
          <Tool icon={Users} name="Journey Mapping" />
          <Tool icon={MessageSquare} name="Interaction Analytics" />
          <Tool icon={Activity} name="Experience Metrics" />
          <Tool icon={BarChart} name="CX Dashboard" />
        </Section>

        <Section title="Workflow Automation">
          <Tool icon={Settings} name="Process Builder" />
          <Tool icon={Settings} name="Rule Engine" />
          <Tool icon={Activity} name="Task Automation" />
          <Tool icon={Box} name="Integration Flow" />
        </Section>

        <Section title="AI Services">
          <Tool icon={Bot} name="Conversational AI" />
          <Tool icon={CircuitBoard} name="Decision Engine" />
          <Tool icon={Activity} name="Predictive Models" />
          <Tool icon={MessageSquare} name="Language Processing" />
        </Section>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 mt-8">
        Powered by cXentral® | cXonnect Hub™ | © 2024 cXentral. All rights reserved.
      </div>
    </div>
  );
};

export default PlatformToolingLandscape;