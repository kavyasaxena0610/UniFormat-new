import React from 'react';
import { Search, FileText, ArrowRight, Download, Sparkles, CheckCircle2, ShieldCheck, BookOpen } from 'lucide-react';

export default function Hero({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  selectedCategory,
  setSelectedCategory,
  onExploreClick,
  categories
}) {
  const quickSearches = [
    { label: 'IEEE Paper', query: 'IEEE' },
    { label: 'Final Year Report', query: 'Project Report' },
    { label: 'Student Leave', query: 'Leave Application' },
    { label: 'APA 7th Edition', query: 'APA' },
    { label: 'Practical File', query: 'Practical' },
    { label: 'NOC Letter', query: 'NOC' },
  ];

  return (
    <div className="relative overflow-hidden bg-white pt-14 pb-16 border-b border-neutral-200">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
          <span>Standardized Academic Formats & College Templates</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-tight">
          Every College Document Format,{' '}
          <span className="underline decoration-neutral-400 decoration-2 underline-offset-8">
            Standardized & Ready.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          UniFormat is a free, centralized academic document repository. Preview and download verified 
          <strong className="text-black font-semibold"> research papers, project reports, practical files</strong>, and 
          <strong className="text-black font-semibold"> college applications</strong> in editable DOCX and PDF formats.
        </p>

        {/* Prominent Search Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="relative flex flex-col sm:flex-row items-stretch gap-2 bg-white p-2 rounded-2xl shadow-sm border border-neutral-300 hover:border-black transition-colors focus-within:ring-2 focus-within:ring-neutral-400 focus-within:border-black"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search templates by title, format, or keyword (e.g., IEEE, Bonafide, Lab Report)..."
                className="w-full pl-12 pr-4 py-3 text-sm sm:text-base text-neutral-900 placeholder-neutral-400 bg-transparent rounded-xl focus:outline-hidden"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mr-2 text-xs text-neutral-500 hover:text-black px-2 py-1 rounded bg-neutral-100"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <span>Find Templates</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Filter Search Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500">
            <span className="font-medium text-neutral-700">Quick Searches:</span>
            {quickSearches.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setSearchQuery(item.query);
                  onSearchSubmit();
                }}
                className="px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-neutral-700 hover:text-black hover:border-black hover:bg-neutral-100 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlights Row */}
        <div className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black">Standard Formats</h4>
              <p className="text-[11px] text-neutral-500">IEEE, APA 7, MLA & Academic</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black">Real DOCX & PDF</h4>
              <p className="text-[11px] text-neutral-500">Actual files, zero dummy stubs</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black">100% Free & Local</h4>
              <p className="text-[11px] text-neutral-500">No login or external servers</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-black">Complete Structure</h4>
              <p className="text-[11px] text-neutral-500">Ready sections & guidelines</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
