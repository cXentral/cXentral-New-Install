import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageSquare, BarChart2, Users, Activity } from 'lucide-react';

const vendorApps = {
  ccaas: [
    { id: 'genesys', name: 'Genesys', icon: '/api/placeholder/48/48', color: '#FF4F1F' },
    { id: 'nice', name: 'NICE CXone', icon: '/api/placeholder/48/48', color: '#2563EB' },
    { id: 'five9', name: 'Five9', icon: '/api/placeholder/48/48', color: '#059669' }
  ],
  crm: [
    { id: 'salesforce', name: 'Salesforce', icon: '/api/placeholder/48/48', color: '#00A1E0' },
    { id: 'dynamics', name: 'Dynamics', icon: '/api/placeholder/48/48', color: '#002050' },
    { id: 'zendesk', name: 'Zendesk', icon: '/api/placeholder/48/48', color: '#03363D' }
  ],
  wfm: [
    { id: 'verint', name: 'Verint', icon: '/api/placeholder/48/48', color: '#1F2937' },
    { id: 'calabrio', name: 'Calabrio', icon: '/api/placeholder/48/48', color: '#7C3AED' },
    { id: 'nice-wfm', name: 'NICE WFM', icon: '/api/placeholder/48/48', color: '#2563EB' }
  ]
};

// Enhanced data flow animation component
const DataFlow = ({ start, end, color, direction = 'forward', delay = 0 }) => {
  const opacity = direction === 'forward' ? [0, 1, 0] : [0, 0.7, 0];
  const scale = direction === 'forward' ? [1, 0.8, 1] : [0.8, 1, 0.8];
  
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-current"
      style={{
        left: start.x,
        top: start.y,
        color: color
      }}
      animate={{
        x: [0, end.x - start.x],
        y: [0, end.y - start.y],
        scale,
        opacity
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const ProductUI = () => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-md">
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Customer Dashboard</h3>
          <Activity className="w-5 h-5 text-green-500" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Active Calls</div>
            <div className="text-2xl font-bold">24</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Queue</div>
            <div className="text-2xl font-bold">12</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">CSAT</div>
            <div className="text-2xl font-bold">4.8</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm p-2 bg-blue-50 rounded">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            New interaction from Genesys
          </div>
          <div className="flex items-center gap-2 text-sm p-2 bg-green-50 rounded">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Salesforce record updated
          </div>
          <div className="flex items-center gap-2 text-sm p-2 bg-purple-50 rounded">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            WFM schedule optimized
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DynamicIntegrationFlow() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [flowPoints, setFlowPoints] = useState([]);

  useEffect(() => {
    if (selectedApp) {
      const hubElement = document.getElementById('central-hub');
      const appElement = document.getElementById(selectedApp.id);
      const uiElement = document.getElementById('product-ui');

      if (hubElement && appElement && uiElement) {
        const hubRect = hubElement.getBoundingClientRect();
        const appRect = appElement.getBoundingClientRect();
        const uiRect = uiElement.getBoundingClientRect();

        setFlowPoints([
          // Forward flows
          {
            start: {
              x: appRect.left + appRect.width / 2,
              y: appRect.top + appRect.height / 2
            },
            end: {
              x: hubRect.left + hubRect.width / 2,
              y: hubRect.top + hubRect.height / 2
            },
            color: selectedApp.color,
            direction: 'forward',
            delay: 0
          },
          {
            start: {
              x: hubRect.left + hubRect.width / 2,
              y: hubRect.top + hubRect.height / 2
            },
            end: {
              x: uiRect.left,
              y: uiRect.top + uiRect.height / 2
            },
            color: selectedApp.color,
            direction: 'forward',
            delay: 0.5
          },
          // Reverse flows
          {
            start: {
              x: uiRect.left,
              y: uiRect.top + uiRect.height / 2
            },
            end: {
              x: hubRect.left + hubRect.width / 2,
              y: hubRect.top + hubRect.height / 2
            },
            color: selectedApp.color,
            direction: 'reverse',
            delay: 1
          },
          {
            start: {
              x: hubRect.left + hubRect.width / 2,
              y: hubRect.top + hubRect.height / 2
            },
            end: {
              x: appRect.left + appRect.width / 2,
              y: appRect.top + appRect.height / 2
            },
            color: selectedApp.color,
            direction: 'reverse',
            delay: 1.5
          }
        ]);
      }
    }
  }, [selectedApp]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8">
        <div className="space-y-8">
          {Object.entries(vendorApps).map(([category, apps]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase">{category}</h3>
              <div className="grid grid-cols-3 gap-4">
                {apps.map(app => (
                  <motion.button
                    key={app.id}
                    id={app.id}
                    className={`relative p-2 rounded-lg shadow-sm bg-white ${
                      selectedApp?.id === app.id ? 'ring-2 ring-purple-500' : ''
                    }`}
                    onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img 
                      src={app.icon}
                      alt={app.name}
                      className="w-12 h-12 rounded-lg"
                    />
                    <div className="mt-1 text-xs font-medium truncate">{app.name}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <motion.div
            id="central-hub"
            className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center relative"
            animate={{
              scale: selectedApp ? 1.1 : 1,
              boxShadow: selectedApp 
                ? '0 0 0 8px rgba(139, 92, 246, 0.1)' 
                : '0 0 0 0px rgba(139, 92, 246, 0)'
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" />
          </motion.div>
        </div>

        <div id="product-ui">
          <ProductUI />
        </div>

        {selectedApp && flowPoints.map((point, index) => (
          <DataFlow key={index} {...point} />
        ))}
      </div>
    </div>
  );
}