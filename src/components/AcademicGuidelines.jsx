import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  FolderPlus, 
  FileCode, 
  Info, 
  AlertTriangle,
  Lightbulb,
  FileText,
  ChevronDown,
  Layers
} from 'lucide-react';

export default function AcademicGuidelines({ onSelectCategory }) {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'When should I choose IEEE format over APA or MLA?',
      a: 'Choose IEEE format for Computer Science, Electrical, Electronics, Information Technology, and Engineering assignments or IEEE conferences. Choose APA (American Psychological Association) for Psychology, Education, and Social Sciences. Choose MLA (Modern Language Association) for English, Literature, and Humanities.'
    },
    {
      q: 'Are these templates officially approved by universities?',
      a: 'UniFormat templates provide standard, universally recognized structural frameworks for research papers and college documents. While they closely reflect IEEE, APA 7th, and standard collegiate standards, your course instructor or university department handbook holds final authority on specific departmental requirements.'
    },
    {
      q: 'How should I format margins and font sizes in Word (DOCX)?',
      a: 'Unless specified otherwise by your institution: use 1-inch (2.54 cm) margins on all four sides. For body text, use Times New Roman 12pt or Arial 11pt with 1.5 or double line spacing. Headings should follow a clear hierarchy (e.g. 14pt bold for Heading 1, 12pt bold for Heading 2).'
    },
    {
      q: 'How can I add new templates to UniFormat locally?',
      a: 'UniFormat was designed for effortless local expansion. Simply drop your new .docx and .pdf files into the appropriate folder under "public/templates/<category>/" and add a new JSON object entry into "src/data/templates.json". The website will instantly index and display your new template with working downloads and previews!'
    }
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-3 border border-neutral-300">
            <BookOpen className="w-3.5 h-3.5 text-black" />
            <span>Academic Writing & Template Reference</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Document Guidelines & Standards
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            A comprehensive reference for formatting college papers, understanding document sections, and managing the local UniFormat library.
          </p>
        </div>

        {/* 1. Core Research Paper Sections Decoded */}
        <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-black">
                Core Academic Research Paper Anatomy
              </h2>
              <p className="text-xs text-neutral-500">
                Standard components included across UniFormat research paper templates.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h3 className="font-bold text-black text-sm mb-1">
                1. Title & Abstract
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Contains author names, institutional affiliations, and an informative 150-250 word summary stating problem, method, findings, and conclusion without abbreviations or unverified citations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h3 className="font-bold text-black text-sm mb-1">
                2. Introduction & Background
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Establishes context, problem statement, research significance, and core operational objectives or hypotheses investigated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h3 className="font-bold text-black text-sm mb-1">
                3. Methodology & Design
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Detailed step-by-step description of experimental methods, sampling sizes, algorithms, instrumentation, and statistical techniques to allow peer reproduction.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h3 className="font-bold text-black text-sm mb-1">
                4. Results & Discussion
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Objective empirical presentation of quantitative data, charts, and analysis, followed by critical interpretation and evaluation against existing research.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h3 className="font-bold text-black text-sm mb-1">
                5. Conclusion & Recommendations
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Summary of primary discoveries, practical or industrial implications, acknowledged limitations, and suggested future research avenues.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-neutral-200">
              <h3 className="font-bold text-black text-sm mb-1">
                6. References / Works Cited
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Complete bibliographic catalog formatted in strict accordance with the chosen academic standard (IEEE numeric, APA author-date, or MLA author-page).
              </p>
            </div>
          </div>
        </div>

        {/* 2. How to Add New Templates Locally */}
        <div className="bg-black text-white rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 text-white flex items-center justify-center border border-neutral-700">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Local File Architecture
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                How to Add New Templates to UniFormat
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl mb-6">
            UniFormat does not use databases or cloud servers. Any student or faculty member can add custom templates in two simple steps:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px]">1</span>
                <span>Place files in public directory</span>
              </div>
              <p className="text-neutral-400">
                Save your template DOCX and/or PDF files in the appropriate category folder:
              </p>
              <pre className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-200 overflow-x-auto">
{`public/templates/research-papers/
public/templates/project-reports/
public/templates/practical-files/
public/templates/applications/`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
              <div className="font-bold text-white flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px]">2</span>
                <span>Add JSON entry in src/data/templates.json</span>
              </div>
              <p className="text-neutral-400">
                Append your document metadata to <code className="text-white font-mono">src/data/templates.json</code>:
              </p>
              <pre className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-200 overflow-x-auto">
{`{
  "id": "my-custom-template",
  "title": "My College Template",
  "category": "Project Reports",
  "fileFormats": ["PDF", "DOCX"],
  "previewPath": "/templates/...",
  "downloadDocxPath": "/templates/..."
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* 3. Frequently Asked Questions Accordion */}
        <div className="border border-neutral-200 rounded-2xl p-6 sm:p-8 bg-white">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-black" />
            <h2 className="text-lg font-bold text-black">
              Frequently Asked Academic Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-neutral-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between text-xs sm:text-sm font-bold text-black"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-neutral-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 text-xs sm:text-sm text-neutral-600 bg-white border-t border-neutral-200 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
