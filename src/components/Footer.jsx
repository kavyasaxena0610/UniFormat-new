import React from 'react';
import { GraduationCap, FileText, BookMarked, Download, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate, onSelectCategory, categories }) {
  return (
    <footer className="bg-black text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Uni<span className="text-neutral-400">Format</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              UniFormat is a free, centralized academic document repository providing verified, editable research paper formats, project reports, practical record journals, and standard college applications.
            </p>
            <div className="pt-2 flex items-center gap-2 text-neutral-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>100% Free • Open Academic Resource • No Sign-up</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('library')}
                  className="hover:text-white transition-colors"
                >
                  Template Library (13)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('research')}
                  className="hover:text-white transition-colors"
                >
                  Research Paper Formats
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guidelines')}
                  className="hover:text-white transition-colors"
                >
                  Academic Guidelines & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Research Paper Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Research Standards
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Research Paper Formats');
                    onNavigate('library');
                  }}
                  className="hover:text-white transition-colors"
                >
                  IEEE Conference Format
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Research Paper Formats');
                    onNavigate('library');
                  }}
                  className="hover:text-white transition-colors"
                >
                  APA 7th Edition Student
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Research Paper Formats');
                    onNavigate('library');
                  }}
                  className="hover:text-white transition-colors"
                >
                  MLA 9th Edition Standard
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Research Paper Formats');
                    onNavigate('library');
                  }}
                  className="hover:text-white transition-colors"
                >
                  University Thesis Template
                </button>
              </li>
            </ul>
          </div>

          {/* Document Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.slice(1, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigate('library');
                    }}
                    className="hover:text-white transition-colors truncate max-w-full text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Academic Disclaimer & Local Management Notice */}
        <div className="pt-8 border-t border-neutral-800 space-y-4">
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] leading-relaxed text-neutral-400">
            <strong className="text-white font-semibold">Academic Disclaimer: </strong>
            UniFormat document templates are crafted for student educational formatting convenience and academic reference. 
            Formatting conventions (such as IEEE, APA, MLA) represent standard structural blueprints. 
            Students should verify specific departmental guidelines, font size mandates, and deadline instructions provided by their course instructors.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <div>
              © {new Date().getFullYear()} UniFormat Academic Document Library. Built with React & Vite.
            </div>
            <div className="flex items-center gap-1">
              <span>Organized local file library • Zero external databases</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
