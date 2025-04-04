import React, { useState, useEffect } from 'react';

const vendors = {
  ccaas: [
    { id: 'genesys', name: 'Genesys', category: 'CCaaS' },
    { id: 'nice', name: 'NICE CXone', category: 'CCaaS' },
    { id: 'five9', name: 'Five9', category: 'CCaaS' },
    { id: 'talkdesk', name: 'Talkdesk', category: 'CCaaS' }
  ],
  crm: [
    { id: 'salesforce', name: 'Salesforce', category: 'CRM' },
    { id: 'dynamics', name: 'Microsoft Dynamics', category: 'CRM' },
    { id: 'zendesk', name: 'Zendesk', category: 'CRM' },
    { id: 'freshworks', name: 'Freshworks', category: 'CRM' }
  ],
  wem: [
    { id: 'verint', name: 'Verint', category: 'WEM' },
    { id: 'calabrio', name: 'Calabrio', category: 'WEM' },
    { id: 'nice-wfm', name: 'NICE WFM', category: 'WEM' },
    { id: 'aspect', name: 'Aspect', category: 'WEM' }
  ],
  analytics: [
    { id: 'qualtrics', name: 'Qualtrics', category: 'Analytics' },
    { id: 'medallia', name: 'Medallia', category: 'Analytics' },
    { id: 'clarabridge', name: 'Clarabridge', category: 'Analytics' },
    { id: 'callminer', name: 'CallMiner', category: 'Analytics' }
  ]
};

export default function VendorEcosystem() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [activeVendors, setActiveVendors] = useState([]);

  useEffect(() => {
    // Animation effect when category changes
    if (hoveredCategory) {
      setActiveVendors(vendors[hoveredCategory]);
    } else {
      setActiveVendors([]);
    }
  }, [hoveredCategory]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-purple-900 flex items-center justify-center p-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          One API, <span className="text-blue-400">hundreds</span> of
          <br />CX integrations
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          cXentral unifies your entire CX stack through a single, powerful API
        </p>

        <div className="relative">
          {/* Central Hub */}
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-12 shadow-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full animate-pulse" />
          </div>

          {/* Vendor Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {Object.entries(vendors).map(([category, vendorList]) => (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <button className="w-full p-4 bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-all">
                  {category.toUpperCase()}
                </button>

                {hoveredCategory === category && (
                  <div className="absolute top-full left-0 w-full mt-2 space-y-2">
                    {vendorList.map((vendor, index) => (
                      <div
                        key={vendor.id}
                        className="bg-white rounded-lg p-3 shadow-lg transform transition-all duration-300"
                        style={{
                          opacity: 0,
                          transform: 'translateY(20px)',
                          animation: `fadeIn 0.3s ease-out forwards ${index * 0.1}s`
                        }}
                      >
                        {vendor.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Connection Lines */}
          {hoveredCategory && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Add SVG connection lines here */}
            </div>
          )}
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}