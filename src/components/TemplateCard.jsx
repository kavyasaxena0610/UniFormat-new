import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  ChevronDown, 
  Check, 
  Sparkles, 
  ExternalLink,
  BookOpen,
  Layers
} from 'lucide-react';

export default function TemplateCard({ template, onPreview, onDirectDownload }) {
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);

  const handleDownload = (format) => {
    setDownloadMenuOpen(false);
    onDirectDownload(template, format);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-neutral-200 hover:border-black hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Top Banner Accent for Featured */}
      {template.featured && (
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-black text-white text-[10px] font-bold px-3 py-0.5 rounded-bl-lg flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>FEATURED</span>
          </div>
        </div>
      )}

      {/* Card Header & Body */}
      <div className="p-5 sm:p-6">
        {/* Category & Format Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
            {template.category}
          </span>

          <div className="flex items-center gap-1.5 ml-auto">
            {template.fileFormats.includes('DOCX') && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-900 border border-neutral-300">
                DOCX
              </span>
            )}
            {template.fileFormats.includes('PDF') && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-900 border border-neutral-300">
                PDF
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-black group-hover:text-neutral-700 transition-colors leading-snug line-clamp-2">
          {template.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-3">
          {template.description}
        </p>

        {/* Metadata info pills */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-3 text-[11px] text-neutral-500">
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>{template.pages || 'Multi-page'}</span>
          </div>
          {template.academicLevel && (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
              <span className="truncate max-w-[150px]">{template.academicLevel}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 bg-neutral-50/70 border-t border-neutral-100 flex items-center gap-2">
        {/* Preview Button */}
        <button
          onClick={() => onPreview(template)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-800 text-xs font-semibold hover:border-black hover:bg-neutral-100 transition-colors shadow-2xs"
          title="Preview Document in browser"
        >
          <Eye className="w-3.5 h-3.5 text-black" />
          <span>Preview</span>
        </button>

        {/* Download Split Dropdown Button */}
        <div className="relative flex-1">
          <button
            onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
          </button>

          {/* Download Options Dropdown */}
          {downloadMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-20" 
                onClick={() => setDownloadMenuOpen(false)}
              />
              <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Select Format
                </div>
                {template.downloadDocxPath && (
                  <button
                    onClick={() => handleDownload('DOCX')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-100 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-black" />
                      Editable Word (DOCX)
                    </span>
                    <Download className="w-3 h-3 text-neutral-400" />
                  </button>
                )}
                {template.downloadPdfPath && (
                  <button
                    onClick={() => handleDownload('PDF')}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-100 flex items-center justify-between transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neutral-500" />
                      Standard PDF File
                    </span>
                    <Download className="w-3 h-3 text-neutral-400" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
