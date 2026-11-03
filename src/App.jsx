import React, { useState } from 'react';
import templatesData from './data/templates.json';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoriesSection from './components/CategoriesSection';
import ResearchPaperSpotlight from './components/ResearchPaperSpotlight';
import TemplateLibrary from './components/TemplateLibrary';
import TemplateCard from './components/TemplateCard';
import DocumentPreviewModal from './components/DocumentPreviewModal';
import AcademicGuidelines from './components/AcademicGuidelines';
import Footer from './components/Footer';
import { 
  Sparkles, 
  Clock, 
  ArrowRight, 
  FileText, 
  BookMarked, 
  CheckCircle2, 
  Download 
} from 'lucide-react';

const CATEGORIES = [
  'Research Paper Formats',
  'Project Reports',
  'Practical Files',
  'Lab Reports',
  'Leave Applications',
  'College Applications',
  'Other College Documents',
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'library' | 'research' | 'guidelines'
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // Filter lists for Homepage sections
  const featuredTemplates = templatesData.filter((t) => t.featured);
  const recentTemplates = templatesData.filter((t) => t.recent);

  // Trigger search from Hero or Navbar
  const handleHeroSearchSubmit = () => {
    setActiveTab('library');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleOpenSearchModal = () => {
    setActiveTab('library');
    const input = document.querySelector('input[type="text"]');
    if (input) {
      input.focus();
    }
  };

  const handleSelectCategory = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveTab('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  const handleDirectDownload = (template, format = 'DOCX') => {
    const filePath = format === 'PDF' ? template.downloadPdfPath : template.downloadDocxPath;
    if (!filePath) return;

    // Create programmatic anchor for instant local download
    const link = document.createElement('a');
    link.href = filePath;
    const extension = format === 'PDF' ? 'pdf' : 'docx';
    const cleanTitle = template.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `${cleanTitle}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={handleOpenSearchModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearchSubmit={handleHeroSearchSubmit}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onExploreClick={() => setActiveTab('library')}
              categories={CATEGORIES}
            />

            {/* Popular Document Categories Grid */}
            <CategoriesSection
              categories={CATEGORIES}
              templates={templatesData}
              onSelectCategory={handleSelectCategory}
            />

            {/* Core Feature: Dedicated Research Paper Formats Section */}
            <ResearchPaperSpotlight
              templates={templatesData}
              onPreview={handlePreview}
              onDirectDownload={handleDirectDownload}
            />

            {/* Featured Templates Section */}
            <section className="py-14 bg-white border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>Most Popular Academic Choices</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                      Featured Templates
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL');
                      setActiveTab('library');
                    }}
                    className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline transition-all"
                  >
                    <span>View All 13 Documents</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredTemplates.slice(0, 6).map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onPreview={handlePreview}
                      onDirectDownload={handleDirectDownload}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Recently Added Templates Section */}
            <section className="py-14 bg-neutral-50 border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      <Clock className="w-3.5 h-3.5 text-black" />
                      <span>Latest Uploads</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
                      Recently Added Formats
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL');
                      setActiveTab('library');
                    }}
                    className="mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline transition-all"
                  >
                    <span>Explore Full Archive</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onPreview={handlePreview}
                      onDirectDownload={handleDirectDownload}
                    />
                  ))}
                </div>

                {/* Explore All CTA Box */}
                <div className="mt-12 p-8 rounded-2xl bg-black text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold">
                      Ready to start formatting your college document?
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 max-w-xl">
                      Explore our full collection of 13 academic templates. All files are 100% free, ready to edit in Microsoft Word, and printable in PDF.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('ALL');
                      setActiveTab('library');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-xl bg-white text-black text-xs sm:text-sm font-bold shadow-md hover:bg-neutral-100 transition-colors shrink-0"
                  >
                    Explore All Templates (13)
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Tab: Full Template Library */}
        {activeTab === 'library' && (
          <TemplateLibrary
            templates={templatesData}
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onPreview={handlePreview}
            onDirectDownload={handleDirectDownload}
          />
        )}

        {/* Tab: Dedicated Research Papers Spotlight */}
        {activeTab === 'research' && (
          <div className="py-6">
            <ResearchPaperSpotlight
              templates={templatesData}
              onPreview={handlePreview}
              onDirectDownload={handleDirectDownload}
            />
          </div>
        )}

        {/* Tab: Academic Guidelines & Local Management */}
        {activeTab === 'guidelines' && (
          <AcademicGuidelines onSelectCategory={handleSelectCategory} />
        )}
      </main>

      {/* In-Browser PDF & Blueprint Preview Modal */}
      {previewTemplate && (
        <DocumentPreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onDownload={handleDirectDownload}
        />
      )}

      {/* Clean Academic Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={handleSelectCategory}
        categories={CATEGORIES}
      />
    </div>
  );
}
