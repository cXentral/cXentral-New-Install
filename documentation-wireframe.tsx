import React, { useState } from 'react';
import { Search, Book, FileText, MessageSquare, Settings, ChevronRight, ExternalLink, ArrowRight } from 'lucide-react';

export default function DocumentationPortal() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-rose-500 text-transparent bg-clip-text">
                cxentral docs
              </div>
              <nav className="flex gap-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">Guides</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">API</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Reference</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Community</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="pl-10 pr-4 py-2 w-80 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-rose-500 text-white rounded-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <nav className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Getting Started</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Quick Start Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-purple-600 font-medium flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Installation
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Core Concepts</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Platform Overview
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Integration Basics
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Guides</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Authentication
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-gray-900 flex items-center">
                      <ChevronRight className="w-4 h-4 mr-2" />
                      Data Mapping
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <article className="prose prose-purple max-w-none">
              <div className="mb-8">
                <h1>Documentation</h1>
                <p className="text-xl text-gray-600">
                  Learn how to integrate and use cxentral to transform your customer experience.
                </p>
              </div>

              {/* Quick Start Cards */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <Book className="w-8 h-8 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">Quick Start Guide</h3>
                  <p className="text-gray-600 mb-4">Get up and running with cxentral in minutes.</p>
                  <a href="#" className="text-purple-600 hover:text-purple-700 flex items-center">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>

                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <FileText className="w-8 h-8 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">API Reference</h3>
                  <p className="text-gray-600 mb-4">Comprehensive API documentation and examples.</p>
                  <a href="#" className="text-purple-600 hover:text-purple-700 flex items-center">
                    Explore API <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>

                <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <MessageSquare className="w-8 h-8 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">Community</h3>
                  <p className="text-gray-600 mb-4">Join our community and get help from experts.</p>
                  <a href="#" className="text-purple-600 hover:text-purple-700 flex items-center">
                    Join now <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>

              {/* Popular Guides */}
              <div className="mb-12">
                <h2>Popular Guides</h2>
                <div className="grid grid-cols-2 gap-6">
                  <a href="#" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2">Authentication Guide</h3>
                    <p className="text-gray-600">Learn how to implement secure authentication.</p>
                  </a>
                  <a href="#" className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2">Data Integration</h3>
                    <p className="text-gray-600">Connect and sync your data sources.</p>
                  </a>
                </div>
              </div>

              {/* Recent Updates */}
              <div>
                <h2>Recent Updates</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">New API Features</h3>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-gray-600">Added new endpoints for analytics and reporting.</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Updated Authentication</h3>
                      <span className="text-sm text-gray-500">5 days ago</span>
                    </div>
                    <p className="text-gray-600">Enhanced security features and OAuth2 support.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}