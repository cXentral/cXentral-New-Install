import React, { useState } from 'react';
import { MessageSquare, Users, BarChart2, Heart, Star, Zap, Globe, Phone } from 'lucide-react';

const CXEcosystemMap = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = {
    customerService: {
      icon: MessageSquare,
      title: "Customer Service & Support",
      description: "Tools for resolving customer issues and providing assistance",
      subCategories: {
        helpDesk: {
          name: "Help Desk Software",
          vendors: [
            { name: "Zendesk", type: "Enterprise", focus: "Omnichannel Support" },
            { name: "Freshdesk", type: "Mid-Market", focus: "Ticket Management" },
            { name: "Help Scout", type: "SMB", focus: "Email Support" }
          ]
        },
        customerSuccess: {
          name: "Customer Success Platforms",
          vendors: [
            { name: "Gainsight", type: "Enterprise", focus: "Customer Success" },
            { name: "Totango", type: "Mid-Market", focus: "Customer Journey" },
            { name: "ChurnZero", type: "Growth", focus: "Retention" }
          ]
        }
      }
    },
    engagement: {
      icon: Users,
      title: "Customer Engagement",
      description: "Solutions for interacting with customers across channels",
      subCategories: {
        aiAssistants: {
          name: "AI Sales Assistants",
          vendors: [
            { name: "Drift", type: "Enterprise", focus: "Conversational Marketing" },
            { name: "Intercom", type: "Mid-Market", focus: "Customer Messaging" },
            { name: "Ada", type: "Growth", focus: "AI Chatbots" }
          ]
        }
      }
    },
    analytics: {
      icon: BarChart2,
      title: "Experience Analytics",
      description: "Tools for measuring and analyzing customer experience",
      subCategories: {
        feedback: {
          name: "Enterprise Feedback Management",
          vendors: [
            { name: "Qualtrics", type: "Enterprise", focus: "Experience Management" },
            { name: "Medallia", type: "Enterprise", focus: "Customer Feedback" },
            { name: "SurveyMonkey", type: "Mid-Market", focus: "Surveys" }
          ]
        },
        journey: {
          name: "Journey Analytics",
          vendors: [
            { name: "Pointillist", type: "Enterprise", focus: "Journey Mapping" },
            { name: "Thunderhead", type: "Enterprise", focus: "Journey Orchestration" },
            { name: "UXPressia", type: "Mid-Market", focus: "Journey Mapping" }
          ]
        }
      }
    },
    marketing: {
      icon: Heart,
      title: "Marketing & Relationships",
      description: "Solutions for building and maintaining customer relationships",
      subCategories: {
        abm: {
          name: "Account-Based Marketing",
          vendors: [
            { name: "Demandbase", type: "Enterprise", focus: "ABM Platform" },
            { name: "6sense", type: "Enterprise", focus: "Intent Data" },
            { name: "Terminus", type: "Mid-Market", focus: "ABM Execution" }
          ]
        },
        social: {
          name: "Social Media Management",
          vendors: [
            { name: "Sprinklr", type: "Enterprise", focus: "Unified CXM" },
            { name: "Hootsuite", type: "Mid-Market", focus: "Social Management" },
            { name: "Buffer", type: "SMB", focus: "Social Publishing" }
          ]
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Customer Experience Ecosystem</h2>
        <p className="text-gray-600">Comprehensive mapping of tools and technologies that shape customer experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([key, category]) => (
          <div 
            key={key}
            className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all ${
              selectedCategory === key ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => setSelectedCategory(key === selectedCategory ? null : key)}
          >
            <div className="flex items-center gap-3 mb-4">
              <category.icon className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">{category.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{category.description}</p>

            {selectedCategory === key && (
              <div className="space-y-4 mt-4 pt-4 border-t">
                {Object.entries(category.subCategories).map(([subKey, subCategory]) => (
                  <div key={subKey}>
                    <h4 className="font-medium mb-2">{subCategory.name}</h4>
                    <div className="space-y-2">
                      {subCategory.vendors.map((vendor, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{vendor.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{vendor.focus}</span>
                            <span className="px-2 py-1 bg-purple-100 rounded text-purple-600 text-xs">
                              {vendor.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Key Requirements for CX Solutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-lg">
            <Zap className="w-5 h-5 text-purple-600 mb-2" />
            <h4 className="font-medium mb-2">Actionable Insights</h4>
            <p className="text-sm text-gray-600">Drive decisions with customer satisfaction data</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <Globe className="w-5 h-5 text-purple-600 mb-2" />
            <h4 className="font-medium mb-2">Process Implementation</h4>
            <p className="text-sm text-gray-600">Enable business process improvements</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <Star className="w-5 h-5 text-purple-600 mb-2" />
            <h4 className="font-medium mb-2">Experience Creation</h4>
            <p className="text-sm text-gray-600">Create memorable customer interactions</p>
          </div>
          <div className="p-4 bg-white rounded-lg">
            <Users className="w-5 h-5 text-purple-600 mb-2" />
            <h4 className="font-medium mb-2">Employee Enablement</h4>
            <p className="text-sm text-gray-600">Support consistent customer outcomes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CXEcosystemMap;
