import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-indigo-900 to-indigo-700 overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
      </div>

      {/* Main Content Container - Centered Vertically */}
      <div className="relative h-screen flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Main headline */}
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200 max-w-4xl">
              Transform Your CX with Intelligent Architecture
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-indigo-100 mb-12 max-w-2xl">
              Unify, Scale, and Innovate Your Customer Experience with cXentral's Enterprise Platform
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-indigo-900 rounded-lg font-medium 
                               hover:bg-indigo-50 transform hover:-translate-y-0.5 
                               transition-all duration-200 flex items-center gap-2 shadow-lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg 
                               font-medium hover:bg-white/10 transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={scrollToNext}
            className="text-white flex flex-col items-center gap-2 opacity-75 hover:opacity-100 transition-opacity duration-200"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </button>
        </div>
      </div>

      {/* Optional: Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-indigo-300 opacity-10 rounded-full blur-2xl" />
    </div>
  );
};

export default HeroSection;
