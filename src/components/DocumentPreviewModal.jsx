import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Download, 
  FileText, 
  CheckCircle2, 
  Layers, 
  BookOpen, 
  AlertCircle,
  Eye,
  Maximize2
} from 'lucide-react';

export default function DocumentPreviewModal({ template, onClose, onDownload }) {
  const [activeView, setActiveView] = useState('pdf'); // 'pdf' | 'blueprint'
  const [iframeError, setIframeError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!template) return null;

  const handleOpenNewTab = () => {
    if (template.previewPath) {
      window.open(template.previewPath, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-800">
                {template.category}
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">
                {template.pages || 'Academic Template'}
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-black truncate">
              {template.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Switcher Tabs */}
            <div className="hidden sm:flex items-center p-1 bg-neutral-200 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveView('pdf')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'pdf'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-neutral-700 hover:text-black'
                }`}
              >
                PDF Preview
              </button>
              <button
                onClick={() => setActiveView('blueprint')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'blueprint'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-neutral-700 hover:text-black'
                }`}
              >
                Structure Outline
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Action Toolbar */}
        <div className="px-5 py-2.5 bg-white border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-500">
            <FileText className="w-4 h-4 text-black" />
            <span>Ready for student download:</span>
            <span className="font-semibold text-black">DOCX & PDF</span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Open in new tab */}
            <button
              onClick={handleOpenNewTab}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 hover:border-black bg-white text-neutral-800 font-medium transition-colors"
              title="Open full PDF document in a new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              <span>Open in New Tab</span>
            </button>

            {/* Download DOCX */}
            {template.downloadDocxPath && (
              <button
                onClick={() => onDownload(template, 'DOCX')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-white font-semibold transition-colors shadow-xs"
                title="Download editable Microsoft Word DOCX file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download DOCX</span>
              </button>
            )}

            {/* Download PDF */}
            {template.downloadPdfPath && (
              <button
                onClick={() => onDownload(template, 'PDF')}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-neutral-300 hover:border-black bg-white text-neutral-800 font-semibold transition-colors"
                title="Download standard PDF file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body / Viewer */}
        <div className="flex-1 overflow-y-auto bg-neutral-100 relative min-h-[420px] sm:min-h-[520px]">
          {activeView === 'pdf' ? (
            <div className="w-full h-full flex flex-col items-stretch">
              {/* Fallback Notice for Small Devices or unsupported PDF embeds */}
              <div className="bg-neutral-100 border-b border-neutral-200 px-4 py-2 text-xs text-neutral-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-neutral-700 shrink-0" />
                  <span>
                    Viewing live document preview. If your device blocks embedded PDF frames, use the "Open in New Tab" or Download buttons above.
                  </span>
                </div>
                <button
                  onClick={handleOpenNewTab}
                  className="font-semibold underline ml-2 shrink-0 hover:text-black"
                >
                  Open Full
                </button>
              </div>

              {/* Embedded PDF iframe */}
              <iframe
                src={`${template.previewPath}#toolbar=1&navpanes=0&scrollbar=1`}
                title={`Preview of ${template.title}`}
                className="w-full flex-1 min-h-[500px] border-none bg-white"
                onError={() => setIframeError(true)}
              />

              {iframeError && (
                <div className="p-8 text-center bg-white flex flex-col items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-neutral-800 mb-3" />
                  <h4 className="text-base font-bold text-black">
                    Inline PDF Preview Unavailable
                  </h4>
                  <p className="mt-1 text-sm text-neutral-500 max-w-md">
                    Your browser does not support embedded PDF viewer plugins. You can open the PDF directly or download the DOCX.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={handleOpenNewTab}
                      className="px-4 py-2 rounded-lg bg-black text-white text-xs font-semibold"
                    >
                      Open PDF in New Tab
                    </button>
                    <button
                      onClick={() => onDownload(template, 'DOCX')}
                      className="px-4 py-2 rounded-lg border border-neutral-300 text-neutral-800 text-xs font-semibold"
                    >
                      Download Word DOCX
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Document Blueprint View */
            <div className="p-6 bg-white min-h-full">
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    Document Structure & Formatting Blueprint
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {template.description}
                  </p>
                </div>

                {/* Included Sections */}
                <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-black" />
                    <span>Included Sections in this Template</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {template.structureOutline?.map((section, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2.5 p-2 rounded-lg bg-white border border-neutral-200 text-xs font-medium text-neutral-800"
                      >
                        <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="truncate">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Guidelines Box */}
                <div className="p-5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-black" />
                    <span>Standard Formatting Recommendations</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                      <div className="text-neutral-400 font-medium">Standard Margins</div>
                      <div className="font-bold text-black mt-0.5">1 inch (2.54 cm)</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                      <div className="text-neutral-400 font-medium">Standard Font</div>
                      <div className="font-bold text-black mt-0.5">Times New Roman 12pt</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                      <div className="text-neutral-400 font-medium">Line Spacing</div>
                      <div className="font-bold text-black mt-0.5">1.5 or Double Spaced</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-neutral-200">
                      <div className="text-neutral-400 font-medium">Page Numbers</div>
                      <div className="font-bold text-black mt-0.5">Bottom Right / Header</div>
                    </div>
                  </div>
                </div>

                {/* Editing instructions */}
                <div className="p-4 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-2">
                  <h5 className="font-bold text-black">How to Edit this Template:</h5>
                  <ol className="list-decimal list-inside space-y-1 text-neutral-600">
                    <li>Download the <strong>DOCX format</strong> above to edit on Microsoft Word, Apple Pages, Google Docs, or LibreOffice.</li>
                    <li>Replace the bracketed placeholder text <code className="px-1.5 py-0.5 bg-neutral-100 rounded text-black font-semibold">[Your Name]</code> with your actual details.</li>
                    <li>Retain the defined heading styles to automatically preserve academic table of contents and bookmarks.</li>
                    <li>Export to PDF prior to final submission to protect document typography and formatting.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>UniFormat Local Archive • Verified File</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-neutral-300 hover:border-black text-black font-semibold transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ className }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  );
}
