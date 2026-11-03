import React, { useState } from 'react';
import { BookOpen, FileText, Search, Menu, X, GraduationCap, Download, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'library', label: 'Template Library' },
    { id: 'research', label: 'Research Papers' },
    { id: 'guidelines', label: 'Academic Guidelines' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white shadow-sm group-hover:bg-neutral-800 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-black font-sans">
                  Uni<span className="text-neutral-500">Format</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-800 border border-neutral-300 px-1.5 py-0.5 rounded">
                  Archive
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium hidden sm:block">
                Academic Document & Template Library
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-black text-white font-semibold'
                      : 'text-neutral-600 hover:text-black hover:bg-neutral-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-500 text-xs hover:border-black hover:bg-neutral-100 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-neutral-400" />
              <span>Search templates...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-white border border-neutral-300 rounded font-mono text-neutral-500">
                /
              </kbd>
            </button>

            <button
              onClick={() => handleNavClick('library')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-black hover:bg-neutral-800 rounded-lg transition-colors shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Browse All (13)</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-600 hover:text-black rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-black rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-base font-medium ${
                activeTab === item.id
                  ? 'bg-black text-white font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-200">
            <button
              onClick={() => handleNavClick('library')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-black rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Explore All Templates</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
