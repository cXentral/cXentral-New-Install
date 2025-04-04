import React, { useState } from 'react';
import { ArrowRight, BookOpen, Search, Menu, LayoutGrid, FileText, HelpCircle, X, MousePointer } from 'lucide-react';

// First, let's create our reusable components
const TourSpotlight = ({ children }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-purple-500/10 rounded-lg animate-pulse" />
    {children}
  </div>
);

const TourStep = ({ step, current }) => {
  const PreviewContent = () => {
    switch (step.target) {
      case 'search':
        return (
          <div className="flex items-center gap-2 bg-white p-3 rounded border">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search documentation..."
              className="flex-1 outline-none text-sm"
              disabled
            />
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">⌘K</span>
          </div>
        );
      case 'sidebar':
        return (
          <div className="flex gap-2">
            <div className="w-48 bg-white p-3 rounded border">
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <BookOpen className="w-4 h-4" />
                Getting Started
              </div>
              <div className="space-y-1 ml-6">
                <div className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  Quick Start
                </div>
                <div className="text-sm text-gray-600 px-2 py-1">
                  Installation
                </div>
              </div>
            </div>
            <MousePointer className="w-4 h-4 text-purple-600 animate-bounce" />
          </div>
        );
      case 'structure':
        return (
          <div className="bg-white p-3 rounded border">
            <div className="flex gap-4 text-sm">
              <div className="font-medium">Getting Started</div>
              <div className="text-gray-400">→</div>
              <div className="font-medium">Core Concepts</div>
              <div className="text-gray-400">→</div>
              <div className="font-medium">API Reference</div>
            </div>
          </div>
        );
      case 'examples':
        return (
          <div className="bg-white p-3 rounded border">
            <div className="font-mono text-sm bg-gray-800 text-white p-3 rounded">
              const client = new CXClient({"{"} apiKey: &apos;YOUR_API_KEY&apos; {"}"});
            </div>
            <button className="text-sm text-purple-600 mt-2 hover:text-purple-700">
              Try it yourself →
            </button>
          </div>
        );
      case 'help':
        return (
          <div className="flex items-center gap-3 bg-white p-3 rounded border">
            <button className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="text-sm">
              Click for instant help
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (current !== step.id) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          {React.createElement(step.icon, { 
            className: "w-6 h-6 text-purple-600" 
          })}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{step.title}</h3>
          <div className="text-sm text-gray-500">Step {step.id + 1} of 6</div>
        </div>
      </div>
      <p className="text-gray-600 mb-4">{step.description}</p>
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <TourSpotlight>
          <PreviewContent />
        </TourSpotlight>
      </div>
    </div>
  );
};

const DocumentationTour = ({ onClose = () => {} }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      id: 0,
      title: "Welcome to Documentation",
      description: "Let's take a quick tour of our documentation hub to help you get started.",
      target: "welcome",
      icon: BookOpen
    },
    {
      id: 1,
      title: "Navigation Sidebar",
      description: "Browse through different sections of documentation. The sidebar can be collapsed for more space.",
      target: "sidebar",
      icon: Menu
    },
    {
      id: 2,
      title: "Quick Search",
      description: "Quickly find what you need by searching the entire documentation. Use ⌘K (Mac) or Ctrl+K (Windows) to search.",
      target: "search",
      icon: Search
    },
    {
      id: 3,
      title: "Content Structure",
      description: "Documentation is organized into Getting Started, Core Concepts, API Reference, and more for easy navigation.",
      target: "structure",
      icon: LayoutGrid
    },
    {
      id: 4,
      title: "Interactive Examples",
      description: "Try out code examples directly in the documentation. Copy, edit, and test code snippets.",
      target: "examples",
      icon: FileText
    },
    {
      id: 5,
      title: "Quick Help",
      description: "Need assistance? Click the help button to connect with our support team or browse FAQs.",
      target: "help",
      icon: HelpCircle
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Documentation Tour</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {tourSteps.map(step => (
          <TourStep key={step.id} step={step} current={currentStep} />
        ))}

        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-1">
            {tourSteps.map((step) => (
              <div 
                key={step.id}
                className={`w-2 h-2 rounded-full ${
                  step.id === currentStep 
                    ? 'bg-purple-600' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {currentStep < tourSteps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentationTour;