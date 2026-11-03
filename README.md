# UniFormat – College Document & Research Paper Template Library

UniFormat is a modern, responsive academic document repository where students and educators can find, preview, and download standard research paper formats and commonly required college documents in editable DOCX (Microsoft Word) and standard PDF formats.

---

## 🌟 Key Features

1. **Research Paper Formats (Core Feature)**:
   - **Standard Academic Research Paper Format**: Classic undergraduate and graduate structure (Abstract, Keywords, Introduction, Literature Review, Methodology, Results, Discussion, Conclusion, References).
   - **IEEE Research Paper Format**: Double-column layout adhering to IEEE standard manuscript conventions with numbered citations (`[1]`).
   - **APA 7th Edition Student Format**: American Psychological Association manuscript guidelines with author-date parenthetical citations.
   - **MLA 9th Edition Format**: Humanities standard with last-name running heads, Works Cited, and block quotation standards.
   - **University Customizable Research Paper Format**: General thesis and dissertation template complete with Student Declaration of Originality and Certificate of Faculty Supervision.

2. **College Document Formats**:
   - **College Final Year Project Report**: Complete capstone project documentation outline with SRS, system architecture, module design, and test cases.
   - **College Practical File / Record**: Laboratory journal with experiment index table, aim, algorithm, code, and faculty signature blocks.
   - **Scientific Lab Report**: Physics/Chemistry/Engineering experiment report with equipment list, observation tables, and percentage error formulas.
   - **Student Leave Application**: Formal leave application to HOD or Principal for medical, family, or athletic absences.
   - **Bonafide Certificate Application**: Official requisition for scholarships, passport issuance, transit passes, or education loans.
   - **Internship Permission Letter**: Formal request for industrial training permission and attendance compensation.
   - **No Objection Certificate (NOC) Application**: Requisition for institutional clearance to attend external hackathons and conferences.
   - **General Multi-Purpose College Application**: Adaptable template for duplicate ID cards, marksheet corrections, and fee installments.

3. **In-Browser Document Preview & Downloads**:
   - Live PDF document preview inside modal.
   - "Open in New Tab" support.
   - Direct downloads for both editable Word (`.docx`) and printable (`.pdf`) formats.
   - Interactive Document Structure Blueprint view displaying all section outlines and formatting guidelines.

4. **Instant Search & Filtering**:
   - Real-time search by title, description, category, and keywords.
   - Filter by the 7 academic categories.
   - Filter by format (All, DOCX Only, PDF Only).
   - Sort by Popularity, Recently Added, and Alphabetical.
   - Friendly empty state with one-click filter reset.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Document Generation**: `docx` (Office Open XML) and `jspdf`
- **Data Architecture**: Local JSON (`src/data/templates.json`) and local public files (`public/templates/`)
- **Zero External Dependencies**: No backend, no databases, no cloud authentication, no third-party APIs required.

---

## 📂 Project Structure

```
c:\UniFormat new\
├── index.html                    # HTML entry point with Google Fonts
├── package.json                  # Dependencies & npm scripts
├── vite.config.js                # Vite build configuration
├── tailwind.config.js            # Tailwind theme and custom colors
├── postcss.config.js             # PostCSS plugins
├── scripts/
│   ├── generate-documents.js     # Script to generate real DOCX & PDF files
│   └── verify-dist.js            # Verification script for document paths
├── public/
│   └── templates/
│       ├── research-papers/      # 5 research paper formats (.docx & .pdf)
│       ├── project-reports/      # College project report (.docx & .pdf)
│       ├── practical-files/      # Practical file & record format (.docx & .pdf)
│       ├── lab-reports/          # Scientific lab report (.docx & .pdf)
│       └── applications/         # Applications (Leave, Bonafide, NOC, etc.)
└── src/
    ├── main.jsx                  # React application root
    ├── App.jsx                   # Main layout and tab router
    ├── index.css                 # Tailwind directives & styles
    ├── data/
    │   └── templates.json        # Central template database
    └── components/
        ├── Navbar.jsx            # Top navigation bar
        ├── Hero.jsx              # Landing hero with search & quick filters
        ├── CategoriesSection.jsx # Category cards & navigation
        ├── ResearchPaperSpotlight.jsx # Core research paper section & comparison matrix
        ├── TemplateLibrary.jsx   # Filterable & searchable template grid
        ├── TemplateCard.jsx      # Document card with preview & download
        ├── DocumentPreviewModal.jsx   # PDF iframe viewer & blueprint view
        ├── AcademicGuidelines.jsx# Academic guidelines & local file FAQ
        └── Footer.jsx            # Academic disclaimer & platform links
```

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port Vite outputs).

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## ➕ How to Add New Templates Locally

Adding new templates to UniFormat requires only two simple file additions:

1. **Place your document files** in the corresponding folder:
   - For a research paper: `public/templates/research-papers/my-template.docx` and `my-template.pdf`
   - For an application: `public/templates/applications/my-application.docx` and `my-application.pdf`

2. **Add an entry** to `src/data/templates.json`:
```json
{
  "id": "my-custom-template",
  "title": "Custom Seminar Report Format",
  "description": "Standard departmental seminar presentation report format.",
  "category": "Project Reports",
  "keywords": ["seminar", "presentation", "report"],
  "fileFormats": ["PDF", "DOCX"],
  "previewPath": "/templates/project-reports/my-template.pdf",
  "downloadPdfPath": "/templates/project-reports/my-template.pdf",
  "downloadDocxPath": "/templates/project-reports/my-template.docx",
  "featured": true,
  "recent": true,
  "downloads": 1200,
  "pages": "10-15 Pages",
  "academicLevel": "Undergraduate",
  "structureOutline": [
    "Cover Page",
    "Abstract",
    "Literature Survey",
    "Technical Details",
    "Conclusion",
    "References"
  ]
}
```

The application automatically reads the JSON file and renders the template across all views, searches, and download handlers.

---

## ⚖️ Academic Disclaimer
UniFormat templates are provided for reference, student convenience, and educational guidance. Specific university regulations, syllabus guidelines, and instructor instructions always take precedence.

