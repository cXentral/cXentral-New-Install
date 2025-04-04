import React from 'react';
import { Star, Box, Check, Shield } from 'lucide-react';

const CCaaSEcosystem = () => {
  const vendors = {
    enterprise: {
      title: "Enterprise Leaders",
      vendors: [
        { name: "Genesys", specialty: "Omnichannel CX", type: "Enterprise", integration: "High" },
        { name: "NICE CXone", specialty: "Digital First Omnichannel", type: "Enterprise", integration: "High" },
        { name: "Five9", specialty: "Intelligent Cloud Contact Center", type: "Enterprise", integration: "High" },
        { name: "Talkdesk", specialty: "AI-Powered Contact Center", type: "Enterprise", integration: "High" },
        { name: "Avaya", specialty: "Unified Communications", type: "Enterprise", integration: "Medium" },
        { name: "Cisco Webex CC", specialty: "Integrated Experience", type: "Enterprise", integration: "High" },
        { name: "Content Guru", specialty: "Large Scale CC", type: "Enterprise", integration: "Medium" },
        { name: "Amazon Connect", specialty: "Cloud Native CC", type: "Enterprise", integration: "High" },
        { name: "Twilio Flex", specialty: "Programmable CC", type: "Enterprise", integration: "High" },
        { name: "8x8", specialty: "Integrated CCaaS & UCaaS", type: "Enterprise", integration: "Medium" }
      ]
    },
    midmarket: {
      title: "Mid-Market Solutions",
      vendors: [
        { name: "RingCentral Engage", specialty: "Digital Engagement", type: "Mid-Market", integration: "Medium" },
        { name: "Alvaria", specialty: "Workforce Engagement", type: "Mid-Market", integration: "Medium" },
        { name: "Vonage Contact Center", specialty: "Unified Communications", type: "Mid-Market", integration: "Medium" },
        { name: "3CLogic", specialty: "Voice & Integration", type: "Mid-Market", integration: "High" },
        { name: "Dixa", specialty: "Customer Friendship", type: "Mid-Market", integration: "Medium" }
      ]
    },
    emerging: {
      title: "Emerging Innovators",
      vendors: [
        { name: "AirCall", specialty: "SMB Cloud Phone", type: "Startup", integration: "Medium" },
        { name: "Telnyx", specialty: "Programmable Voice", type: "Startup", integration: "High" },
        { name: "Ujet", specialty: "Mobile-First CC", type: "Startup", integration: "Medium" },
        { name: "Zipwire", specialty: "Cloud Contact Center", type: "Startup", integration: "Medium" },
        { name: "Level AI", specialty: "AI-First Contact Center", type: "Startup", integration: "High" }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">CCaaS Ecosystem</h2>
        <p className="text-gray-600">Complete contact center ecosystem with integration capabilities</p>
      </div>

      {Object.entries(vendors).map(([key, category]) => (
        <div key={key} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.vendors.map((vendor, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{vendor.name}</span>
                  <div className="px-2 py-1 bg-purple-100 rounded-full text-purple-600 text-xs">
                    {vendor.type}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{vendor.specialty}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Integration Complexity:</span>
                  <div className="flex items-center gap-1">
                    <Shield className={`w-4 h-4 ${
                      vendor.integration === 'High' ? 'text-green-500' : 'text-yellow-500'
                    }`} />
                    <span className="text-xs">{vendor.integration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Quick Integration Examples */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Quick Integration Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-2">CCaaS → XM Integration</h4>
            <p className="text-sm text-gray-600">Automatic post-call surveys and feedback collection</p>
            <div className="mt-2 text-xs text-green-600">Integration time: 2-3 days</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium mb-2">CCaaS → Analytics Integration</h4>
            <p className="text-sm text-gray-600">Real-time sentiment analysis and agent assistance</p>
            <div className="mt-2 text-xs text-green-600">Integration time: 3-4 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCaaSEcosystem;
