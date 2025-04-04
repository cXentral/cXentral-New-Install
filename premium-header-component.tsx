import React, { useState, useEffect } from 'react';
import { 
  Menu, ChevronDown, Search, Sun, 
  ArrowRight 
} from 'lucide-react';

const PremiumHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Platform',
      subitems: ['Overview', 'Features', 'Integration', 'Pricing']
    },
    {
      name: 'Solutions',
      subitems: ['Enterprise', 'Startups', 'Case Studies']
    },
    {
      name: 'Resources',
      subitems: ['Documentation', 'Community', 'Support']
    }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled 
        ? 'bg-slate-900/80 backdrop-blur-lg border-b border-white/10' 
        : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 
              text-transparent bg-clip-text">
              cXentral
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <button className="flex items-center gap-1 text-gray-300 hover:text-white
                    transition-colors">
                    {item.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2
                    group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
                    <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 
                      rounded-lg shadow-xl p-4 min-w-[200px]">
                      {item.subitems.map((subitem) => (
                        <a 
                          key={subitem}
                          href="#" 
                          className="block px-4 py-2 text-gray-300 hover:text-white
                            hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {subitem}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors">
              <Sun className="w-5 h-5" />
            </button>

            {/* CTA Button */}
            <button className="hidden md:flex items-center gap-2 px-4 py-2 
              bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400
              text-white rounded-lg font-medium 
              hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="space-y-2 pl-4">
                    {item.subitems.map((subitem) => (
                      <a 
                        key={subitem}
                        href="#" 
                        className="block text-gray-300 hover:text-white transition-colors"
                      >
                        {subitem}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default PremiumHeader;
