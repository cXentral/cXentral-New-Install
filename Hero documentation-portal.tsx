import React, { useState } from 'react';
import {
  Book,
  Code,
  Terminal,
  Star,
  Trophy,
  Zap,
  Phone,
  Users,
  Bot,
  MessageSquare,
  BarChart2,
  Headphones,
  Database,
  Shield,
  Clock,
  Award
} from 'lucide-react';

const DocumentationPortal = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [userProgress, setUserProgress] = useState({
    completedTutorials: 2,
    earnedPoints: 150,
    currentStreak: 3
  });

  const categories = [
    {
      id: 'ccaas',
      name: 'Contact Center',
      icon: Phone,
      color: 'blue',
      platforms: ['Genesys', 'NICE', 'Five9'],
      progress: 60
    },
    {
      id: 'crm',
      name: 'CRM Systems',
      icon: Users,
      color: 'purple',
      platforms: ['Salesforce', 'Dynamics', 'HubSpot'],
      progress: 40
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart2,
      color: 'green',
      platforms: ['Tableau', 'PowerBI', 'Looker'],
      progress: 30
    },
    {
      id: 'voice',
      name: 'Voice Analytics',
      icon: Headphones,
      color: 'orange',
      platforms: ['Verint', 'CallMiner', 'Observe.ai'],
      progress: 25
    },
    {
      id: 'knowledge',
      name: 'Knowledge Base',
      icon: Database,
      color: 'red',
      platforms: ['Zendesk Guide', 'ServiceNow', 'Confluence'],
      progress: 45
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top Navigation Pills */}
          <div className="pt-4 flex justify-end space-x-4">
            {['Platform Status', 'Search Docs', 'Community'].map((item) => (
              <button key={item} className="px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                {item}
              </button>
            ))}
          </div>
          
          {/* Main Hero Content */}
          <div className="py-20">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Build Better CX Experiences with Integration
              </h1>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Explore our comprehensive documentation and learn how to create seamless customer experiences through powerful integrations. Start your integration journey today.
              </p>
              
              {/* Quick Action Buttons */}
              <div className="flex space-x-4 mb-12">
                <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Quick Start Guide
                </button>
                <button className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-400 transition-colors flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  API Reference
                </button>
              </div>
            </div>

            {/* Progress Cards */}
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-6 h-6" />
                  <span className="font-medium">Progress Score</span>
                </div>
                <div className="text-3xl font-bold mb-2">{userProgress.earnedPoints} pts</div>
                <div className="text-sm text-white/70">Level 3 Integration Expert</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6" />
                  <span className="font-medium">Learning Streak</span>
                </div>
                <div className="text-3xl font-bold mb-2">{userProgress.currentStreak} days</div>
                <div className="text-sm text-white/70">Keep it up! 🔥</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-6 h-6" />
                  <span className="font-medium">Completed Guides</span>
                </div>
                <div className="text-3xl font-bold mb-2">{userProgress.completedTutorials}</div>
                <div className="text-sm text-white/70">8 guides remaining</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6" />
                  <span className="font-medium">Achievements</span>
                </div>
                <div className="text-3xl font-bold mb-2">5/12</div>
                <div className="text-sm text-white/70">Next: API Master</div>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="py-6 border-t border-white/10">
            <nav className="flex space-x-8">
              {['Getting Started', 'Guides', 'API Reference', 'SDKs', 'Examples', 'Community'].map((item) => (
                <button 
                  key={item}
                  className="text-white/70 hover:text-white font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Side Navigation */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold mb-4 px-2">Documentation</h3>
              <nav className="space-y-1">
                {['Getting Started', 'Integration Guides', 'API Reference', 'SDKs & Tools', 'Examples'].map((item) => (
                  <button
                    key={item}
                    className="w-full px-2 py-2 text-left rounded-lg hover:bg-purple-50 hover:text-purple-600"
                  >
                    {item}
                  </button>
                ))}
              </nav>

              {/* Achievement Badges */}
              <div className="mt-8">
                <h4 className="font-medium text-sm text-gray-600 mb-3 px-2">Your Achievements</h4>
                <div className="grid grid-cols-3 gap-2 px-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-lg flex items-center justify-center ${
                        i < 3 ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Award className="w-6 h-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {/* Integration Categories */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-${category.color}-100 text-${category.color}-600`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.platforms.join(', ')}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div 
                      className={`bg-${category.color}-600 h-2 rounded-full`}
                      style={{ width: `${category.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{category.progress}% Complete</span>
                    <button className="text-purple-600 hover:text-purple-700 font-medium">
                      Continue →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Start Examples */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-6">Quick Start Examples</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Installation</span>
                  </div>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                    npm install @cxentral/client
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">Basic Usage</span>
                  </div>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                    {`const client = new CXClient({
  apiKey: 'YOUR_API_KEY'
});`}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Challenges */}
            <div className="mt-8 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-sm p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Integration Challenge</h3>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  <span>50 points</span>
                </div>
              </div>

              <p className="mb-4 opacity-90">
                Complete this challenge to earn points and unlock the "Integration Master" badge!
              </p>

              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50">
                Start Challenge
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPortal;