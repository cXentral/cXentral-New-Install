import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Users, BarChart2, Globe, Database, Share2, Camera, ShieldCheck } from 'lucide-react';

const vendorEcosystem = {
  ccaas: {
    name: 'Contact Center',
    color: '#8B5CF6',
    vendors: [
      { id: 'genesys', name: 'Genesys Cloud', icon: '/api/placeholder/40/40' },
      { id: 'nice', name: 'NICE CXone', icon: '/api/placeholder/40/40' },
      { id: 'five9', name: 'Five9', icon: '/api/placeholder/40/40' },
      { id: 'talkdesk', name: 'Talkdesk', icon: '/api/placeholder/40/40' },
      { id: 'avaya', name: 'Avaya', icon: '/api/placeholder/40/40' }
    ]
  },
  crm: {
    name: 'CRM',
    color: '#3B82F6',
    vendors: [
      { id: 'salesforce', name: 'Salesforce', icon: '/api/placeholder/40/40' },
      { id: 'zendesk', name: 'Zendesk', icon: '/api/placeholder/40/40' },
      { id: 'freshworks', name: 'Freshworks', icon: '/api/placeholder/40/40' },
      { id: 'dynamics', name: 'MS Dynamics', icon: '/api/placeholder/40/40' },
      { id: 'oracle', name: 'Oracle CX', icon: '/api/placeholder/40/40' }
    ]
  },
  cdp: {
    name: 'CDP',
    color: '#10B981',
    vendors: [
      { id: 'segment', name: 'Segment', icon: '/api/placeholder/40/40' },
      { id: 'tealium', name: 'Tealium', icon: '/api/placeholder/40/40' },
      { id: 'treasure', name: 'Treasure Data', icon: '/api/placeholder/40/40' },
      { id: 'adobe', name: 'Adobe CDP', icon: '/api/placeholder/40/40' }
    ]
  },
  social: {
    name: 'Social & Messaging',
    color: '#F59E0B',
    vendors: [
      { id: 'sprinklr', name: 'Sprinklr', icon: '/api/placeholder/40/40' },
      { id: 'khoros', name: 'Khoros', icon: '/api/placeholder/40/40' },
      { id: 'emplifi', name: 'Emplifi', icon: '/api/placeholder/40/40' },
      { id: 'sparkcentral', name: 'Sparkcentral', icon: '/api/placeholder/40/40' }
    ]
  },
  analytics: {
    name: 'Analytics',
    color: '#EC4899',
    vendors: [
      { id: 'qualtrics', name: 'Qualtrics', icon: '/api/placeholder/40/40' },
      { id: 'medallia', name: 'Medallia', icon: '/api/placeholder/40/40' },
      { id: 'clarabridge', name: 'Clarabridge', icon: '/api/placeholder/40/40' },
      { id: 'callminer', name: 'CallMiner', icon: '/api/placeholder/40/40' }
    ]
  },
  wfm: {
    name: 'WFM',
    color: '#6366F1',
    vendors: [
      { id: 'verint', name: 'Verint', icon: '/api/placeholder/40/40' },
      { id: 'calabrio', name: 'Calabrio', icon: '/api/placeholder/40/40' },
      { id: 'nice-wfm', name: 'NICE WFM', icon: '/api/placeholder/40/40' },
      { id: 'aspect', name: 'Aspect', icon: '/api/placeholder/40/40' }
    ]
  }
};

// Animated data flow particle
const DataParticle = ({ start, end, color }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{ 
      background: `linear-gradient(to right, ${color}, ${color}88)`,
      filter: 'blur(1px)'
    }}
    initial={{ x: start.x, y: start.y, opacity: 0 }}
    animate={{
      x: end.x,
      y: end.y,
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8]
    }}
    transition={{
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: Math.random() * 0.5
    }}
  />
);

// Integration visualization component
const IntegrationHub = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredVendor, setHoveredVendor] = useState(null);
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (selectedCategory && containerRef.current) {
      const center = {
        x: containerRef.current.offsetWidth / 2,
        y: containerRef.current.offsetHeight / 2
      };

      const newParticles = [];
      const category = vendorEcosystem[selectedCategory];
      category.vendors.forEach((vendor, i) => {
        const angle = (i / category.vendors.length) * 2 * Math.PI;
        const radius = 150;
        const start = {
          x: center.x + Math.cos(angle) * radius,
          y: center.y + Math.sin(angle) * radius
        };
        
        // Create multiple particles per vendor
        for (let j = 0; j < 3; j++) {
          newParticles.push({
            id: `${vendor.id}-${j}`,
            start,
            end: center,
            color: category.color
          });
        }
      });
      
      setParticles(newParticles);
    }
  }, [selectedCategory]);

  const renderVendorIcons = (category) => {
    return vendorEcosystem[category].vendors.map((vendor, index) => {
      const angle = (index / vendorEcosystem[category].vendors.length) * 2 * Math.PI;
      const radius = 150;
      
      return (
        <motion.div
          key={vendor.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
          }}
          transition={{ 
            duration: 0.5,
            delay: index * 0.1
          }}
          className="absolute"
          style={{ 
            transform: `translate(-50%, -50%)`,
            cursor: 'pointer'
          }}
          onHoverStart={() => setHoveredVendor(vendor)}
          onHoverEnd={() => setHoveredVendor(null)}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={vendor.icon} 
              alt={vendor.name}
              className="w-10 h-10 rounded"
            />
            <div className="mt-1 text-xs font-medium text-center truncate w-16">
              {vendor.name}
            </div>
          </motion.div>
        </motion.div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Selection */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-12">
          {Object.entries(vendorEcosystem).map(([key, category]) => (
            <motion.button
              key={key}
              className={`p-4 rounded-xl ${
                selectedCategory === key 
                  ? 'bg-white text-gray-900' 
                  : 'bg-gray-800 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(key === selectedCategory ? null : key)}
            >
              <div className="text-center">
                <div 
                  className="w-8 h-8 mx-auto mb-2 rounded-lg"
                  style={{ backgroundColor: category.color }}
                />
                <div className="text-sm font-medium">{category.name}</div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Integration Visualization */}
        <div 
          ref={containerRef}
          className="relative h-[600px] bg-gray-800 rounded-xl overflow-hidden"
        >
          {/* Central Hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            animate={{
              scale: selectedCategory ? [1, 1.1, 1] : 1,
              rotate: selectedCategory ? 360 : 0
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Vendor Icons */}
          <AnimatePresence>
            {selectedCategory && renderVendorIcons(selectedCategory)}
          </AnimatePresence>

          {/* Data Flow Particles */}
          <AnimatePresence>
            {particles.map((particle) => (
              <DataParticle key={particle.id} {...particle} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default IntegrationHub;