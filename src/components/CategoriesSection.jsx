import React from 'react';
import { 
  BookMarked, 
  Briefcase, 
  ClipboardList, 
  FlaskConical, 
  CalendarClock, 
  Award, 
  FileCheck,
  ChevronRight
} from 'lucide-react';

export const categoryMeta = {
  'Research Paper Formats': {
    icon: BookMarked,
    description: 'IEEE, APA 7th, MLA 9th, and University standard research paper structures.',
  },
  'Project Reports': {
    icon: Briefcase,
    description: 'Comprehensive college final year, capstone, and mini-project report formats.',
  },
  'Practical Files': {
    icon: ClipboardList,
    description: 'Semester laboratory assignment journals, index pages, and experiment writeups.',
  },
  'Lab Reports': {
    icon: FlaskConical,
    description: 'Formal scientific experiment reports with equipment, tables, and error calculus.',
  },
  'Leave Applications': {
    icon: CalendarClock,
    description: 'Formal leave applications for medical, family, and athletic college absences.',
  },
  'College Applications': {
    icon: Award,
    description: 'Applications for Bonafide Certificates, Internship permissions, and placement letters.',
  },
  'Other College Documents': {
    icon: FileCheck,
    description: 'No Objection Certificate (NOC) letters and multi-purpose administrative requests.',
  },
};

export default function CategoriesSection({ categories, templates, onSelectCategory }) {
  const getCategoryCount = (categoryName) => {
    return templates.filter((t) => t.category === categoryName).length;
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              <span>Organized Academic Categories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              Explore By Document Category
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-neutral-500 max-w-md">
            All seven essential college document divisions, prepared according to academic conventions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => {
            const meta = categoryMeta[category] || {
              icon: FileCheck,
              description: 'Standard academic document templates.',
            };
            const Icon = meta.icon;
            const count = getCategoryCount(category);

            return (
              <div
                key={category}
                onClick={() => onSelectCategory(category)}
                className="group relative p-5 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-black hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center transition-transform group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-200 text-neutral-800">
                      {count} {count === 1 ? 'Template' : 'Templates'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-black group-hover:text-black transition-colors">
                    {category}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {meta.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-semibold text-neutral-700 group-hover:text-black">
                  <span>Browse Category</span>
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
