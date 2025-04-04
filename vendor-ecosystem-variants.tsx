import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const vendorData = {
  ccaas: {
    name: 'CCaaS',
    color: '#8B5CF6',
    vendors: [
      { id: 'genesys', name: 'Genesys', rating: 4.8 },
      { id: 'nice', name: 'NICE CXone', rating: 4.7 },
      { id: 'five9', name: 'Five9', rating: 4.6 },
      { id: 'talkdesk', name: 'Talkdesk', rating: 4.5 }
    ]
  },
  crm: {
    name: 'CRM',
    color: '#3B82F6',
    vendors: [
      { id: 'salesforce', name: 'Salesforce', rating: 4.9 },
      { id: 'dynamics', name: 'Microsoft Dynamics', rating: 4.7 },
      { id: 'zendesk', name: 'Zendesk', rating: 4.6 },
      { id: 'freshworks', name: 'Freshworks', rating: 4.5 }
    ]
  },
  wem: {
    name: 'WEM',
    color: '#10B981',
    vendors: [
      { id: 'verint', name: 'Verint', rating: 4.8 },
      { id: 'calabrio', name: 'Calabrio', rating: 4.7 },
      { id: 'nice-wfm', name: 'NICE WFM', rating: 4.6 },
      { id: 'aspect', name: 'Aspect', rating: 4.5 }
    ]
  },
  analytics: {
    name: 'Analytics',
    color: '#F59E0B',
    vendors: [
      { id: 'qualtrics', name: 'Qualtrics', rating: 4.8 },
      { id: 'medallia', name: 'Medallia', rating: 4.7 },
      { id: 'clarabridge', name: 'Clarabridge', rating: 4.6 },
      { id: 'callminer', name: 'CallMiner', rating: 4.5 }
    ]
  }
};

// Orbital Visualization Component
const OrbitalView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [orbitRadius, setOrbitRadius] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      setOrbitRadius(Math.min(window.innerWidth, window.innerHeight) * 0.25);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOrbitalPosition = (index, total, radius) => {
    const angle = (index / total) * 2 * Math.PI;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    };
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Central Hub */}
      <motion.div 
        className="absolute w-24 h-24 bg-white rounded-full flex items-center justify-center"
        animate={{ scale: selectedCategory ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 bg-purple-600 rounded-full animate-pulse" />
      </motion.div>

      {/* Category Orbits */}
      {Object.entries(vendorData).map(([key, category], i) => {
        const pos = getOrbitalPosition(i, Object.keys(vendorData).length, orbitRadius);
        return (
          <motion.div
            key={key}
            className="absolute"
            initial={{ x: 0, y: 0 }}
            animate={{ 
              x: pos.x, 
              y: pos.y,
              scale: selectedCategory === key ? 1.2 : 1
            }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <button
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white ${
                selectedCategory === key ? 'bg-opacity-100' : 'bg-opacity-50'
              }`}
              style={{ backgroundColor: category.color }}
              onClick={() => setSelectedCategory(key === selectedCategory ? null : key)}
            >
              {category.name}
            </button>

            {/* Vendor Orbits */}
            {selectedCategory === key && (
              <AnimatePresence>
                {category.vendors.map((vendor, j) => {
                  const vendorPos = getOrbitalPosition(j, category.vendors.length, orbitRadius * 0.5);
                  return (
                    <motion.div
                      key={vendor.id}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: vendorPos.x, 
                        y: vendorPos.y 
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3, delay: j * 0.1 }}
                    >
                      <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center text-sm p-2">
                        {vendor.name}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

// Floating Grid Visualization
const FloatingGrid = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(vendorData).map(([key, category]) => (
            <motion.div
              key={key}
              className="relative"
              onHoverStart={() => setHoveredCategory(key)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <motion.div
                className="bg-white bg-opacity-10 rounded-lg p-6 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-white text-xl font-semibold mb-2">{category.name}</h3>
                <div className="h-1 rounded-full" style={{ backgroundColor: category.color }} />
              </motion.div>

              <AnimatePresence>
                {hoveredCategory === key && (
                  <motion.div
                    className="absolute top-full left-0 w-full mt-4 z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="bg-white rounded-lg shadow-xl p-4 space-y-3">
                      {category.vendors.map((vendor, i) => (
                        <motion.div
                          key={vendor.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                        >
                          <span>{vendor.name}</span>
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 text-sm">{vendor.rating}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Combined Component with Variant Selector
export default function VendorEcosystemVisualizer() {
  const [activeView, setActiveView] = useState('orbital');

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-50 flex gap-4">
        <button
          onClick={() => setActiveView('orbital')}
          className={`px-4 py-2 rounded-lg ${
            activeView === 'orbital' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-800'
          }`}
        >
          Orbital View
        </button>
        <button
          onClick={() => setActiveView('grid')}
          className={`px-4 py-2 rounded-lg ${
            activeView === 'grid' 
              ? 'bg-purple-600 text-white' 
              : 'bg-white text-gray-800'
          }`}
        >
          Grid View
        </button>
      </div>

      {activeView === 'orbital' ? <OrbitalView /> : <FloatingGrid />}
    </div>
  );
}