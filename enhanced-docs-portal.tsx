import React, { useState, useEffect } from 'react';
import {
  Book,
  Code,
  Terminal,
  ChevronRight,
  Search,
  ArrowRight,
  ExternalLink,
  Link2,
  Share2,
  Star,
  FileText,
  Coffee,
  Layout,
  MessageSquare,
  HelpCircle
} from 'lucide-react';

// Tooltip component
const Tooltip = ({ content, children }) => (
  <div className="group relative inline-block">
    {children}
    <div className="invisible group-hover:visible absolute z-50 px-2 py-1 text-sm bg-gray-900 text-white rounded-md 
         -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all">
      {content}
    </div>
  </div>
);

const DocumentationPortal = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const documentationTree = {
    'getting-started': {
      title: 'Getting Started',
      icon: Terminal,
      sections: [
        { id: 'quick-start', title: 'Quick Start Guide' },
        { id: 'installation', title: 'Installation' },
        { id: 'first-steps', title: 'First Steps' }
      ]
    },
    'core-concepts': {
      title: 'Core Concepts',
      icon: Book,
      sections: [
        { id: 'architecture', title: 'Architecture Overview' },
        { id: 'integration-patterns', title: 'Integration Patterns' },
        { id: 'security', title: 'Security & Authentication' }
      ]
    },
    'api-reference': {
      title: 'API Reference',
      icon: Code,
      sections: [
        { id: 'rest-api', title: 'REST APIs' },
        { id: 'webhooks', title: 'Webhooks' },
        { id: 'graphql', title: 'GraphQL APIs' }
      ]
    }
  };

  // Navigation breadcrumb generator
  const generateBreadcrumb = (section) => {
    const category = Object.entries(documentationTree).find(([key, value]) => 
      value.sections.some(s => s.id === section)
    );
    
    if (!category) return [];
    
    return [
      { title: category[1].title, id: category[0] },
      { title: category[1].sections.find(s => s.id === section).title, id: section }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`w-64 bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-64'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Documentation</h2>
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>
              <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="space-y-6">
            {Object.entries(documentationTree).map(([key, category]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                  <category.icon className="w-4 h-4" />
                  {category.title}
                </div>
                <div className="ml-6 space-y-1">
                  {category.sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-purple-50 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-1 flex items-center justify-between">
                {/* Search */}
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">Search documentation</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      type="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 
                               placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 
                               focus:border-purple-500 sm:text-sm"
                      placeholder="Search documentation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Navigation Tools */}
                <div className="flex items-center space-x-4">
                  <Tooltip content="View on GitHub">
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Copy link">
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <Link2 className="w-5 h-5" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Share">
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gray-900">Docs</a>
              </li>
              {generateBreadcrumb(activeSection).map((item, index, array) => (
                <li key={item.id} className="flex items-center">
                  <ChevronRight className="w-4 h-4 mx-1" />
                  <a 
                    href="#"
                    className={
                      index === array.length - 1 
                        ? 'text-gray-900 font-medium' 
                        : 'hover:text-gray-900'
                    }
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Document Content */}
          <article className="prose prose-purple max-w-none">
            {/* Dynamic content based on activeSection would go here */}
            <h1>Documentation Content</h1>
            <p className="text-gray-600">
              Content for section: {activeSection}
            </p>
          </article>

          {/* Page Navigation */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex justify-between">
              <button className="inline-flex items-center text-purple-600 hover:text-purple-700">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Previous
              </button>
              <button className="inline-flex items-center text-purple-600 hover:text-purple-700">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Quick Help Panel */}
      <div className="fixed bottom-4 right-4">
        <Tooltip content="Need help?">
          <button className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center 
                           shadow-lg hover:bg-purple-700 transition-colors">
            <HelpCircle className="w-6 h-6" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default DocumentationPortal;