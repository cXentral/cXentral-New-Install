import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const FieldMappingVisualization = () => {
  const [currentMapping, setCurrentMapping] = useState(0);

  // Example field mappings across different CX platforms
  const mappings = [
    {
      source: { platform: 'Genesys', field: 'customer_id', icon: '💠' },
      target: { platform: 'Salesforce', field: 'ContactId', icon: '☁️' }
    },
    {
      source: { platform: 'Qualtrics', field: 'response_id', icon: '📊' },
      target: { platform: 'Medallia', field: 'feedback_id', icon: '📈' }
    },
    {
      source: { platform: 'Zendesk', field: 'ticket_number', icon: '🎫' },
      target: { platform: 'ServiceNow', field: 'incident_id', icon: '🔧' }
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMapping((prev) => (prev + 1) % mappings.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-rose-500 bg-clip-text text-transparent">
            Unified Field Mapping
          </span>
        </h2>
        <p className="text-gray-600">
          Seamlessly map fields across your CX ecosystem
        </p>
      </div>

      <div className="relative h-64 bg-gray-50 rounded-xl p-8">
        {/* Field Mapping Animation */}
        <div className="flex items-center justify-between">
          {/* Source Platform */}
          <div className="w-64 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{mappings[currentMapping].source.icon}</span>
              <span className="font-medium">{mappings[currentMapping].source.platform}</span>
            </div>
            <div className="p-2 bg-gray-50 rounded border border-gray-200">
              <code className="text-sm text-purple-600">
                {mappings[currentMapping].source.field}
              </code>
            </div>
          </div>

          {/* Mapping Arrow */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 relative">
              <div className="absolute -top-2 right-0 animate-ping">
                <ArrowRight className="w-4 h-4 text-rose-500" />
              </div>
            </div>
          </div>

          {/* Target Platform */}
          <div className="w-64 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{mappings[currentMapping].target.icon}</span>
              <span className="font-medium">{mappings[currentMapping].target.platform}</span>
            </div>
            <div className="p-2 bg-gray-50 rounded border border-gray-200">
              <code className="text-sm text-purple-600">
                {mappings[currentMapping].target.field}
              </code>
            </div>
          </div>
        </div>

        {/* Mapping Type Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {mappings.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentMapping === index ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-6 mt-12">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Automatic Mapping</h3>
          <p className="text-sm text-gray-600">
            AI-powered field detection and mapping suggestions
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Custom Transforms</h3>
          <p className="text-sm text-gray-600">
            Define custom field transformations and validations
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="font-medium mb-2">Real-time Sync</h3>
          <p className="text-sm text-gray-600">
            Keep your data in sync across all platforms
          </p>
        </div>
      </div>
    </div>
  );
};

export default FieldMappingVisualization;
