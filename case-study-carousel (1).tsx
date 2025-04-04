import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  ChevronRight,
  Star
} from 'lucide-react';

const CaseStudyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const caseStudies = [
    {
      title: "Enterprise CX Transformation",
      company: "Global Financial Services",
      description: "How a leading financial institution transformed their customer experience with composable architecture",
      metrics: [
        { label: "Reduction in Response Time", value: "60%" },
        { label: "Customer Satisfaction", value: "↑ 45%" },
        { label: "Integration Time", value: "↓ 70%" }
      ],
      testimonial: {
        quote: "cXentral transformed how we deliver customer experience across all channels.",
        author: "Sarah Johnson",
        role: "Chief Digital Officer"
      },
      gradient: "from-violet-600 via-blue-500 to-cyan-400"
    },
    {
      title: "Omnichannel Excellence",
      company: "Retail Innovation Co",
      description: "Achieving seamless omnichannel experience through integrated CX platform",
      metrics: [
        { label: "Channel Integration Time", value: "↓ 80%" },
        { label: "Customer Engagement", value: "↑ 65%" },
        { label: "Revenue Impact", value: "+35%" }
      ],
      testimonial: {
        quote: "We've seen unprecedented improvements in our customer engagement metrics.",
        author: "Michael Chen",
        role: "Head of Customer Experience"
      },
      gradient: "from-blue-600 via-indigo-500 to-purple-400"
    }
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % caseStudies.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <div className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 
            text-transparent bg-clip-text mb-4">
            Customer Success Stories
          </h2>
          <p className="text-gray-400">See how leading organizations transform their CX with cXentral</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Content */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm
            border border-white/10">
            <div className={`transition-all duration-500 ease-in-out transform
              ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Content Side */}
                <div className="space-y-8">
                  <div>
                    <div className="text-sm text-gray-400 mb-2">{caseStudies[activeIndex].company}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{caseStudies[activeIndex].title}</h3>
                    <p className="text-gray-300">{caseStudies[activeIndex].description}</p>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {caseStudies[activeIndex].metrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 rounded-lg bg-white/5">
                        <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
                        <div className="text-sm text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="relative">
                    <div className="absolute -top-4 -left-4">
                      <Star className="w-8 h-8 text-yellow-500 opacity-50" />
                    </div>
                    <blockquote className="pt-4 px-8">
                      <p className="text-lg text-gray-300 italic mb-4">
                        "{caseStudies[activeIndex].testimonial.quote}"
                      </p>
                      <footer>
                        <div className="font-medium text-white">
                          {caseStudies[activeIndex].testimonial.author}
                        </div>
                        <div className="text-sm text-gray-400">
                          {caseStudies[activeIndex].testimonial.role}
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>

                {/* Visual Side */}
                <div className="relative rounded-xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br 
                    ${caseStudies[activeIndex].gradient} opacity-10`} />
                  {/* Replace with actual case study visuals */}
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Case Study Visualization
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 
                transition-colors backdrop-blur-sm"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 
                transition-colors backdrop-blur-sm"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {caseStudies.map((_, index) => (
              <button 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-16 h-1 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-400' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyCarousel;
