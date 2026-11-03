import React from 'react';
import { 
  BookMarked, 
  FileText, 
  Eye, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Info, 
  Sparkles,
  ArrowRight,
  Layers
} from 'lucide-react';

export default function ResearchPaperSpotlight({ templates, onPreview, onDirectDownload }) {
  // Filter only the 5 research paper templates
  const researchTemplates = templates.filter(
    (t) => t.category === 'Research Paper Formats'
  );

  const formatComparison = [
    {
      format: 'IEEE Format',
      discipline: 'Engineering, Computer Science, IT, Electronics',
      layout: 'Double-Column, 10pt font, Times New Roman',
      citations: 'Numbered citations in brackets [1], [2]',
      abstract: '150-200 words + Index Terms',
      runningHead: 'Paper title in header, page numbers',
    },
    {
      format: 'APA 7th Edition',
      discipline: 'Psychology, Education, Social Sciences, Health',
      layout: 'Single-Column, 1-inch margins, 1.5 or double spaced',
      citations: 'Author-date in-text citations (Smith, 2023)',
      abstract: '150-250 words single paragraph',
      runningHead: 'Running head on left (student papers optional)',
    },
    {
      format: 'MLA 9th Edition',
      discipline: 'Literature, Humanities, Arts, Cultural Studies',
      layout: 'Single-Column, 1-inch margins, double-spaced',
      citations: 'Author-page citations in parentheses (Eliot 45)',
      abstract: 'Usually omitted unless specifically assigned',
      runningHead: 'Last Name Page# in upper right corner',
    },
    {
      format: 'Standard Academic',
      discipline: 'Undergraduate Sciences, Interdisciplinary Papers',
      layout: 'Single-Column, structured 1-6 numbered headings',
      citations: 'Author-date or numbered superscript bibliography',
      abstract: '200-250 words with 4-6 keywords',
      runningHead: 'Subject header & running page numbers',
    },
    {
      format: 'University General',
      discipline: 'Institutional Term Papers, Dissertations, Theses',
      layout: 'Modular chapters with Declaration & Approval Certificates',
      citations: 'Customizable according to university regulations',
      abstract: 'Universal modular abstract with keywords',
      runningHead: 'Institutional title & candidate roll number',
    },
  ];

  return (
    <section className="py-16 bg-neutral-50 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Core Feature Eyebrow */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 text-neutral-900 text-xs font-bold mb-3 border border-neutral-300">
            <BookMarked className="w-3.5 h-3.5" />
            <span>CORE FEATURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Research Paper Formats
          </h2>
          <p className="mt-3 text-base text-neutral-600 leading-relaxed">
            The foundation of UniFormat. Five structured academic manuscripts 
            with realistic placeholder content, standard heading hierarchies, and bibliographic standards.
          </p>
        </div>

        {/* 5 Core Research Paper Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {researchTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-neutral-200 hover:border-black hover:shadow-xl transition-all duration-200 flex flex-col justify-between p-6 relative group"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-black bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded-md">
                    Academic Standard
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300">
                      DOCX
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300">
                      PDF
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-black group-hover:text-neutral-700 transition-colors">
                  {template.title}
                </h3>

                <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                  {template.description}
                </p>

                {/* Structure Outline Checklist */}
                <div className="mt-4 pt-3 border-t border-neutral-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-black" />
                    <span>Included Sections</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-neutral-600">
                    {template.structureOutline?.slice(0, 5).map((sec, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                        <span className="truncate">{sec}</span>
                      </li>
                    ))}
                    {template.structureOutline && template.structureOutline.length > 5 && (
                      <li className="text-[11px] text-neutral-800 font-semibold pl-5">
                        + {template.structureOutline.length - 5} additional sections in document
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2">
                <button
                  onClick={() => onPreview(template)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-neutral-300 hover:border-black hover:bg-neutral-50 text-neutral-800 text-xs font-semibold transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-black" />
                  <span>Preview PDF</span>
                </button>

                <button
                  onClick={() => onDirectDownload(template, 'DOCX')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get DOCX</span>
                </button>
              </div>
            </div>
          ))}

          {/* Academic Info Banner Card */}
          <div className="bg-black text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800 text-neutral-200 text-xs font-semibold mb-3 border border-neutral-700">
                <Info className="w-3.5 h-3.5" />
                <span>Format Disclaimer</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Academic Integrity & Guidelines
              </h3>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed">
                All templates follow widely accepted scholarly frameworks (IEEE Xplore, APA 7th Edition, MLA 9th Edition). 
                These files serve as customizable base models. Remember that your professor or department syllabus guidelines supersede standard guidelines.
              </p>

              <div className="mt-4 pt-3 border-t border-neutral-800 space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Compatible with Microsoft Word 2016-2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Directly editable in Google Docs & LibreOffice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Vector PDF previews rendered locally</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-400">
              UniFormat Academic Series • Version 1.0
            </div>
          </div>
        </div>

        {/* Academic Comparison Guide Table */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="px-6 py-5 bg-neutral-100 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-black">
                Which Research Paper Format Should You Use?
              </h3>
              <p className="text-xs text-neutral-500">
                Quick comparative matrix to determine the right formatting standard for your subject.
              </p>
            </div>
            <span className="text-xs font-semibold text-black bg-white border border-neutral-300 px-2.5 py-1 rounded-md self-start sm:self-auto">
              5 Standard Frameworks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-800 font-bold border-b border-neutral-200">
                <tr>
                  <th className="py-3 px-4">Standard</th>
                  <th className="py-3 px-4">Common Disciplines</th>
                  <th className="py-3 px-4">Manuscript Layout</th>
                  <th className="py-3 px-4">In-Text Citation</th>
                  <th className="py-3 px-4">Abstract Specs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-600">
                {formatComparison.map((row) => (
                  <tr key={row.format} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-black whitespace-nowrap">
                      {row.format}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">{row.discipline}</td>
                    <td className="py-3.5 px-4">{row.layout}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px]">{row.citations}</td>
                    <td className="py-3.5 px-4">{row.abstract}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
