import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  FileText, 
  Sparkles, 
  ArrowUpDown, 
  BookMarked,
  Layers,
  RotateCcw
} from 'lucide-react';
import TemplateCard from './TemplateCard';

export default function TemplateLibrary({
  templates,
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onPreview,
  onDirectDownload
}) {
  const [selectedFormat, setSelectedFormat] = useState('ALL'); // 'ALL' | 'DOCX' | 'PDF'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'recent' | 'az'

  // Filter and sort logic
  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      // 1. Category Filter
      if (selectedCategory !== 'ALL' && template.category !== selectedCategory) {
        return false;
      }

      // 2. Format Filter
      if (selectedFormat !== 'ALL') {
        if (!template.fileFormats.includes(selectedFormat)) {
          return false;
        }
      }

      // 3. Search Query (Title, Description, Category, Keywords)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = template.title.toLowerCase().includes(query);
        const matchesDesc = template.description.toLowerCase().includes(query);
        const matchesCategory = template.category.toLowerCase().includes(query);
        const matchesKeywords = template.keywords?.some((k) =>
          k.toLowerCase().includes(query)
        );

        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesKeywords) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.downloads || 0) - (a.downloads || 0);
      }
      if (sortBy === 'recent') {
        return (b.recent ? 1 : 0) - (a.recent ? 1 : 0);
      }
      if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [templates, selectedCategory, selectedFormat, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedFormat('ALL');
    setSearchQuery('');
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategory !== 'ALL' || selectedFormat !== 'ALL' || searchQuery.trim() !== '';

  return (
    <section className="py-12 bg-neutral-50 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-800 text-xs font-semibold mb-2">
                <BookMarked className="w-3.5 h-3.5 text-black" />
                <span>Centralized Catalog</span>
              </div>
              <h1 className="text-3xl font-extrabold text-black tracking-tight">
                Academic Document Library
              </h1>
              <p className="mt-1.5 text-sm text-neutral-500 max-w-xl">
                Browse, preview, and download standard college templates in editable Word (.docx) and printable PDF formats.
              </p>
            </div>

            {/* Quick stats / result counter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl">
                Showing <strong className="text-black font-bold">{filteredTemplates.length}</strong> of {templates.length} templates
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Control Panel */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 sm:p-5 mb-8 shadow-xs space-y-4">
          {/* Row 1: Search & Format Pill Filter & Sort */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, description, or keyword (e.g., IEEE, Bonafide, APA, Report)..."
                className="w-full pl-10 pr-10 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-neutral-400 focus:border-black transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-black rounded-md"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Format Filter */}
              <div className="flex items-center p-1 bg-neutral-100 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setSelectedFormat('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedFormat === 'ALL'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  All Formats
                </button>
                <button
                  onClick={() => setSelectedFormat('DOCX')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedFormat === 'DOCX'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  DOCX Only
                </button>
                <button
                  onClick={() => setSelectedFormat('PDF')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedFormat === 'PDF'
                      ? 'bg-black text-white shadow-xs'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  PDF Only
                </button>
              </div>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 text-xs font-semibold text-neutral-800 bg-white border border-neutral-300 rounded-xl hover:border-black focus:outline-hidden focus:ring-2 focus:ring-neutral-400 shadow-2xs cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="recent">Recently Added</option>
                  <option value="az">Alphabetical (A-Z)</option>
                </select>
                <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
              </div>

              {/* Reset Filter Button */}
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-black bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-xl transition-colors"
                  title="Clear all active search and filter conditions"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Category Filter Tabs */}
          <div className="pt-3 border-t border-neutral-100">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-neutral-400 font-semibold uppercase tracking-wider text-[10px] pr-2 shrink-0">
                Categories:
              </span>
              <button
                onClick={() => setSelectedCategory('ALL')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 font-medium ${
                  selectedCategory === 'ALL'
                    ? 'bg-black text-white font-semibold shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                All Categories ({templates.length})
              </button>
              {categories.map((cat) => {
                const count = templates.filter((t) => t.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors shrink-0 font-medium ${
                      isSelected
                        ? 'bg-black text-white font-semibold shadow-xs'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Templates Grid or Empty State */}
        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onPreview={onPreview}
                onDirectDownload={onDirectDownload}
              />
            ))}
          </div>
        ) : (
          /* Empty Search Results Message */
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 text-black flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-black">
              No templates found
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 leading-relaxed">
              We couldn't find any documents matching{' '}
              {searchQuery && <strong className="text-black">"{searchQuery}"</strong>}{' '}
              with the selected filters.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                Clear All Filters & Show All (13)
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-neutral-100 text-xs text-neutral-500">
              <span className="font-medium text-neutral-700">Try searching for:</span>{' '}
              <button
                onClick={() => {
                  setSearchQuery('IEEE');
                  setSelectedCategory('ALL');
                }}
                className="text-black font-semibold hover:underline mx-1"
              >
                IEEE
              </button>
              •
              <button
                onClick={() => {
                  setSearchQuery('Report');
                  setSelectedCategory('ALL');
                }}
                className="text-black font-semibold hover:underline mx-1"
              >
                Report
              </button>
              •
              <button
                onClick={() => {
                  setSearchQuery('Leave');
                  setSelectedCategory('ALL');
                }}
                className="text-black font-semibold hover:underline mx-1"
              >
                Leave
              </button>
              •
              <button
                onClick={() => {
                  setSearchQuery('Bonafide');
                  setSelectedCategory('ALL');
                }}
                className="text-black font-semibold hover:underline mx-1"
              >
                Bonafide
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
