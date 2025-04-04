import React, { useState } from 'react';
import { Calendar, ChevronRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function IntegrationTimeline() {
  const [selectedPhase, setSelectedPhase] = useState('phase1');

  const phases = {
    phase1: {
      title: 'Phase 1: Foundation (Q1 2024)',
      status: 'completed',
      integrations: [
        {
          vendor: 'Verint',
          status: 'completed',
          duration: '6 weeks',
          features: ['Core API Integration', 'Data Sync', 'Analytics']
        },
        {
          vendor: 'Zoom',
          status: 'completed',
          duration: '4 weeks',
          features: ['Meeting Analytics', 'Recording Integration', 'Chat Analysis']
        },
        {
          vendor: 'Microsoft Teams',
          status: 'inProgress',
          duration: '8 weeks',
          features: ['Collaboration Tools', 'Channel Integration', 'Bot Framework']
        }
      ]
    },
    phase2: {
      title: 'Phase 2: Expansion (Q2-Q3 2024)',
      status: 'inProgress',
      integrations: [
        {
          vendor: 'Genesys',
          status: 'inProgress',
          duration: '10 weeks',
          features: ['Cloud APIs', 'Voice Analytics', 'Workforce Management']
        },
        {
          vendor: 'Five9',
          status: 'planned',
          duration: '8 weeks',
          features: ['Contact Center', 'IVR Integration', 'Quality Management']
        },
        {
          vendor: 'Salesforce',
          status: 'planned',
          duration: '12 weeks',
          features: ['Service Cloud', 'Einstein Analytics', 'Custom Objects']
        }
      ]
    },
    phase3: {
      title: 'Phase 3: Enterprise (Q4 2024)',
      status: 'planned',
      integrations: [
        {
          vendor: 'Nice InContact',
          status: 'planned',
          duration: '10 weeks',
          features: ['CXone Integration', 'Analytics Suite', 'Quality Management']
        },
        {
          vendor: 'Twilio',
          status: 'planned',
          duration: '8 weeks',
          features: ['Voice/SMS', 'Flex Integration', 'Custom Channels']
        },
        {
          vendor: 'Zendesk',
          status: 'planned',
          duration: '6 weeks',
          features: ['Ticket Management', 'Analytics', 'Custom Apps']
        }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'inProgress':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Integration Timeline</h2>
        <div className="flex gap-4">
          {Object.keys(phases).map((phase) => (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPhase === phase
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {phases[phase].title.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold">{phases[selectedPhase].title}</h3>
          {getStatusIcon(phases[selectedPhase].status)}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {phases[selectedPhase].integrations.map((integration, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">{integration.vendor}</h4>
                {getStatusIcon(integration.status)}
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Duration</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {integration.duration}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-2">Features</div>
                  <ul className="space-y-2">
                    {integration.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm">In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-gray-400" />
            <span className="text-sm">Planned</span>
          </div>
        </div>
      </div>
    </div>
  );
}