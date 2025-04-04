import React, { useState } from 'react';
import { Search, Filter, Star, Box, Check, MessageSquare, BarChart2, Heart } from 'lucide-react';

const CXEcosystemMapping = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const cxCategories = {
    engagement: {
      name: 'Customer Engagement',
      tools: [
        { name: 'Genesys', type: 'Enterprise CCaaS' },
        { name: 'NICE', type: 'Enterprise CCaaS' },
        { name: 'Five9', type: 'Cloud Contact Center' },
        { name: 'Talkdesk', type: 'Cloud Contact Center' },
        { name: 'Twilio', type: 'CPaaS' },
        { name: 'LivePerson', type: 'Conversational AI' },
        { name: 'Glia', type: 'Digital Customer Service' },
        { name: 'Cognigy', type: 'Conversational AI' },
        { name: 'Kore.ai', type: 'Enterprise Bot Platform' }
      ]
    },
    analytics: {
      name: 'Experience Analytics',
      tools: [
        { name: 'Qualtrics', type: 'Experience Management' },
        { name: 'Medallia', type: 'Experience Analytics' },
        { name: 'InMoment', type: 'Customer Feedback' },
        { name: 'Clarabridge', type: 'Text Analytics' },
        { name: 'Wonderflow', type: 'Customer Feedback' },
        { name: 'Alchemer', type: 'Survey Platform' },
        { name: 'UserTesting', type: 'User Research' },
        { name: 'Hotjar', type: 'Behavior Analytics' },
        { name: 'Contentsquare', type: 'Digital Analytics' }
      ]
    },
    sentiment: {
      name: 'Sentiment & Voice',
      tools: [
        { name: 'Symbl.ai', type: 'Conversation Intelligence' },
        { name: 'CallMiner', type: 'Speech Analytics' },
        { name: 'Amenity Analytics', type: 'Text Analytics' },
        { name: 'Lexalytics', type: 'Text Analytics' },
        { name: 'Repustate', type: 'Sentiment Analysis' },
        { name: 'TheySay', type: 'Sentiment Analysis' },
        { name: 'BrandsEye', type: 'Opinion Mining' },
        { name: 'Relative Insight', type: 'Language Analysis' }
      ]
    },
    personalization: {
      name: 'Personalization',
      tools: [
        { name: 'Dynamic Yield', type: 'Experience Optimization' },
        { name: 'Optimizely', type: 'Experience Optimization' },
        { name: 'Monetate', type: 'Personalization' },
        { name: 'RichRelevance', type: 'Recommendations' },
        { name: 'Evergage', type: 'Personalization' },
        { name: 'Coveo', type: 'AI Search' },
        { name: 'Algolia', type: 'Search & Discovery' }
      ]
    },
    knowledge: {
      name: 'Knowledge & Content',
      tools: [
        { name: 'Bloomreach', type: 'Content Management' },
        { name: 'Contentful', type: 'Headless CMS' },
        { name: 'Storyblok', type: 'Headless CMS' },
        { name: 'KnowledgeOwl', type: 'Knowledge Base' },
        { name: 'Document360', type: 'Knowledge Base' },
        { name: 'ProProfs', type: 'Knowledge Management' }
      ]
    },
    orchestration: {
      name: 'Journey Orchestration',
      tools: [
        { name: 'Kitewheel', type: 'Journey Management' },
        { name: 'Thunderhead', type: 'Journey Orchestration' },
        { name: 'Pointillist', type: 'Journey Analytics' },
        { name: 'Usermind', type: 'Journey Management' },
        { name: 'Engage Hub', type: 'Journey Management' },
        { name: 'Alterian', type: 'Real-time CX' }
      ]
    },
    support: {
      name: 'Support Tools',
      tools: [
        { name: 'Help Scout', type: 'Customer Support' },
        { name: 'Freshdesk', type: 'Support Desk' },
        { name: 'Dixa', type: 'Customer Engagement' },
        { name: 'Front', type: 'Customer Communication' },
        { name: 'Gladly', type: 'Support Platform' },
        { name: 'Intercom', type: 'Customer Messaging' },
        { name: 'Klaus', type: 'QA Platform' }
      ]
    },
    voice: {
      name: 'Voice of Customer',
      tools: [
        { name: 'Alida', type: 'VoC Platform' },
        { name: 'Reputation', type: 'Experience Management' },
        { name: 'Grade.us', type: 'Review Management' },
        { name: 'Trustpilot', type: 'Review Platform' },
        { name: 'BirdEye', type: 'Experience Marketing' },
        { name: 'Mention', type: 'Social Listening' }
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">CX Ecosystem</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <button 
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {Object.entries(cxCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === key 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cxCategories)
          .filter(([key]) => selectedCategory === 'all' || key === selectedCategory)
          .map(([key, category]) => (
            <div key={key} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">{category.name}</h3>
              <div className="space-y-3">
                {category.tools.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{tool.name}</div>
                      <div className="text-sm text-gray-600">{tool.type}</div>
                    </div>
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-8 p-4 bg-purple-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-purple-600" />
          <span className="font-medium">Composable Integration Benefits</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">Rapid connectivity</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">Standardized data models</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">Plug-and-play integration</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CXEcosystemMapping;
