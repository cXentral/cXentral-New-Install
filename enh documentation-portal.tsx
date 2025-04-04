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
  Award,
  Search,
  ArrowRight,
  Play,
  ExternalLink,
  Link,
  Share2
} from 'lucide-react';

const DocumentationPortal = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [userProgress, setUserProgress] = useState({
    completedTutorials: 2,
    earnedPoints: 150,
    currentStreak: 3
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 top-40 right-20 animate-pulse delay-1000" />
      </div>

      <div className="relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Top Navigation */}
          <div className="pt-6 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold">cXentral</div>
              <nav className="hidden md:flex space-x-6">
                {['Platform', 'Documentation', 'Community', 'Support'].map((item) => (
                  <button key={item} className="text-white/80 hover:text-white transition-colors">
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full px-4 py-2 pl-12 bg-white/10 border border-white/20 rounded-lg placeholder-white/50 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                />
                <Search className="absolute left-4 top-3 w-5 h-5 text-white/50" />
                <div className="absolute right-4 top-2 px-2 py-1 rounded-md bg-white/10 text-sm">⌘K</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                Sign In
              </button>
              <button className="px-4 py-2 text-sm bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="py-24">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-4 py-1 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
                  New: Interactive Learning Paths 🚀
                </div>
                <div className="h-6 w-px bg-white/20" />
                <a href="#" className="text-sm text-white/70 hover:text-white flex items-center gap-1">
                  See what's new
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Master Customer Experience Integration
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-3xl">
                Join our interactive learning journey and become a CX integration expert. Build, test, and deploy integrations while earning rewards and recognition.
              </p>

              {/* Enhanced CTA Section */}
              <div className="flex items-center gap-6 mb-12">
                <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center gap-2 group">
                  <Play className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  Start Learning Journey
                </button>
                <a href="#" className="flex items-center gap-2 text-white/80 hover:text-white group">
                  Browse Documentation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Interactive Progress Cards */}
            <div className="grid grid-cols-4 gap-6">
              <ProgressCard
                icon={Trophy}
                title="Progress Score"
                value={userProgress.earnedPoints}
                subtitle="Level 3 Expert"
                action="View Details"
                color="purple"
              />
              <ProgressCard
                icon={Zap}
                title="Daily Streak"
                value={`${userProgress.currentStreak} days`}
                subtitle="Keep it up! 🔥"
                action="View History"
                color="blue"
              />
              <ProgressCard
                icon={Star}
                title="Guides Completed"
                value={userProgress.completedTutorials}
                subtitle="8 remaining"
                action="Continue"
                color="green"
              />
              <ProgressCard
                icon={Award}
                title="Achievements"
                value="5/12"
                subtitle="Next: API Master"
                action="View All"
                color="yellow"
              />
            </div>

            {/* Learning Path Preview */}
            <LearningPathPreview />
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <QuickNavigation />
    </div>
  );
};

// Helper Components
const ProgressCard = ({ icon: Icon, title, value, subtitle, action, color }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group">
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-3 bg-${color}-500/20 rounded-lg group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-3xl font-bold mt-1">{value}</div>
      </div>
    </div>
    <div className="flex items-center justify-between text-sm text-white/70">
      <span>{subtitle}</span>
      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
        {action} →
      </button>
    </div>
  </div>
);

const LearningPathPreview = () => (
  <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-xl font-semibold">Your Learning Path</h3>
      <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
        View All Paths
      </button>
    </div>
    
    <div className="grid grid-cols-4 gap-4">
      {['CCaaS Basics', 'API Integration', 'Data Sync', 'Advanced Features'].map((step, index) => (
        <div key={step} className="relative">
          <div className={`p-4 rounded-lg ${
            index === 0 ? 'bg-white/20' : 'bg-white/5'
          }`}>
            <div className="text-sm font-medium mb-1">Step {index + 1}</div>
            <div className="font-medium">{step}</div>
            {index === 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-sm">
                ✓
              </div>
            )}
          </div>
          {index < 3 && (
            <div className="absolute top-1/2 -right-2 w-4 border-t border-white/20" />
          )}
        </div>
      ))}
    </div>
  </div>
);

const QuickNavigation = () => (
  <div className="border-t border-white/10 mt-12">
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex justify-between items-center">
        <nav className="flex space-x-8">
          {['Quick Start', 'Guides', 'API Docs', 'Examples', 'SDKs', 'Support'].map((item) => (
            <button
              key={item}
              className="text-white/70 hover:text-white font-medium transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-white/70 hover:text-white">
            <Link className="w-5 h-5" />
          </button>
          <button className="text-white/70 hover:text-white">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="text-white/70 hover:text-white">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DocumentationPortal;