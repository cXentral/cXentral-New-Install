import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';

const EnhancedAnimatedHero = ({ page = 'landing' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const heroContent = {
    landing: {
      title: "Transform Your Customer Experience",
      subtitle: "Build, integrate, and scale your CX platform with composable architecture",
      cta: "Explore Platform",
      features: ['Composable', 'Scalable', 'Future-Ready'],
      gradientClass: 'from-violet-600 via-blue-500 to-cyan-400'
    },
    composed: {
      title: "Compose Your Perfect CX Solution",
      subtitle: "Mix and match best-in-class tools for a tailored experience",
      cta: "Start Building",
      features: ['Flexible', 'Integrated', 'Customizable'],
      gradientClass: 'from-blue-600 via-indigo-500 to-purple-400'
    },
    community: {
      title: "Join the CX Innovation Community",
      subtitle: "Connect, learn, and grow with fellow CX innovators",
      cta: "Join Community",
      features: ['Collaborative', 'Innovative', 'Supportive'],
      gradientClass: 'from-indigo-600 via-purple-500 to-pink-400'
    }
  };

  const content = heroContent[page] || heroContent.landing;

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-slate-900">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Primary Gradient Background */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 
            bg-gradient-to-br ${content.gradientClass} opacity-10`}
        />
        
        {/* Animated Orbs */}
        <div 
          className={`absolute top-20 right-20 w-96 h-96 rounded-full
            transition-all duration-1000 blur-3xl
            bg-gradient-to-r ${content.gradientClass} opacity-20
            animate-pulse`}
        />
        <div 
          className={`absolute bottom-20 left-20 w-96 h-96 rounded-full
            transition-all duration-1000 blur-3xl
            bg-gradient-to-r ${content.gradientClass} opacity-20
            animate-pulse delay-1000`}
        />
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            {/* Enhanced Animated Title */}
            <h1 
              className={`text-6xl font-bold mb-6 transition-all duration-1000 
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            >
              <span className={`bg-gradient-to-r ${content.gradientClass}
                text-transparent bg-clip-text`}>
                {content.title}
              </span>
            </h1>

            {/* Enhanced Subtitle */}
            <p 
              className={`text-xl text-gray-300 transition-all duration-1000 delay-300
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            >
              {content.subtitle}
            </p>

            {/* Enhanced CTA Button */}
            <div 
              className={`transition-all duration-1000 delay-500
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <button 
                className={`group px-8 py-4 bg-gradient-to-r ${content.gradientClass}
                  rounded-lg font-medium text-lg text-white
                  hover:shadow-lg hover:shadow-white/10
                  transform hover:-translate-y-0.5 transition-all duration-300
                  flex items-center gap-2 relative overflow-hidden`}
              >
                <span className="relative z-10">{content.cta}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </button>
            </div>

            {/* Enhanced Feature Pills */}
            <div 
              className={`flex flex-wrap gap-4 transition-all duration-1000 delay-700
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              {content.features.map((feature) => (
                <span 
                  key={feature}
                  className={`px-4 py-2 rounded-full text-white/90 font-medium
                    bg-gradient-to-r ${content.gradientClass} opacity-20
                    hover:opacity-30 transition-all duration-300
                    border border-white/10 backdrop-blur-sm`}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Visual Element */}
          <div 
            className={`transition-all duration-1000 delay-500
              ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden
              bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm
              border border-white/10">
              <div className={`absolute inset-0 bg-gradient-to-br ${content.gradientClass} opacity-5`} />
              {/* Page-specific visual content would go here */}
              <div className="p-6 text-center text-gray-400">
                Visual content for {page}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2
          transition-all duration-1000 delay-1000
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="animate-bounce">
          <ChevronRight className="w-6 h-6 text-white/40 transform rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnimatedHero;
