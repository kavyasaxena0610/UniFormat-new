import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, UnderlineType, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { jsPDF } from 'jspdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const dirs = [
  path.join(rootDir, 'public', 'templates', 'research-papers'),
  path.join(rootDir, 'public', 'templates', 'project-reports'),
  path.join(rootDir, 'public', 'templates', 'practical-files'),
  path.join(rootDir, 'public', 'templates', 'lab-reports'),
  path.join(rootDir, 'public', 'templates', 'applications'),
  path.join(rootDir, 'public', 'templates', 'other-documents'),
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// Helper for generating standard clean PDFs with jsPDF
function createPdfDocument(title, category, subtitle, sections) {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - margin - 30) {
      doc.addPage();
      y = margin;
      drawHeaderFooter();
    }
  };

  const drawHeaderFooter = () => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 130, 140);
      doc.text(`UniFormat Academic Library  •  ${category}`, margin, margin - 18);
      doc.line(margin, margin - 12, pageWidth - margin, margin - 12);

      const footerText = `Page ${i} of ${pageCount}`;
      doc.text(footerText, pageWidth - margin - doc.getTextWidth(footerText), pageHeight - margin + 20);
      doc.text('Sample Template  •  For Academic Reference', margin, pageHeight - margin + 20);
      doc.line(margin, pageHeight - margin + 10, pageWidth - margin, pageHeight - margin + 10);
    }
  };

  // Title Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(0, 0, 0); // Solid Black
  const titleLines = doc.splitTextToSize(title, contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 22 + 4;

  if (subtitle) {
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    const subLines = doc.splitTextToSize(subtitle, contentWidth);
    doc.text(subLines, margin, y);
    y += subLines.length * 15 + 10;
  }

  // Accent divider line
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(1.5);
  doc.line(margin, y, margin + 80, y);
  y += 18;

  // Sections
  sections.forEach((sec) => {
    if (sec.heading) {
      checkPageBreak(35);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black Section Headings
      doc.text(sec.heading.toUpperCase(), margin, y);
      y += 16;
    }

    if (sec.content) {
      doc.setFont('helvetica', sec.isItalic ? 'italic' : 'normal');
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      const textLines = doc.splitTextToSize(sec.content, contentWidth);

      textLines.forEach((line) => {
        checkPageBreak(14);
        doc.text(line, margin, y);
        y += 14;
      });

      y += 10;
    }

    if (sec.list) {
      sec.list.forEach((item) => {
        checkPageBreak(15);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
        const bulletText = `•  ${item}`;
        const lines = doc.splitTextToSize(bulletText, contentWidth - 15);
        doc.text(lines, margin + 10, y);
        y += lines.length * 14 + 2;
      });
      y += 8;
    }
  });

  drawHeaderFooter();
  return Buffer.from(doc.output('arraybuffer'));
}

// Helper to create DOCX
async function createDocxDocument(title, subtitle, sections) {
  const children = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
    }),
  ];

  if (subtitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: subtitle,
            italics: true,
            size: 22,
            color: '555555',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
      })
    );
  }

  sections.forEach((sec) => {
    if (sec.heading) {
      children.push(
        new Paragraph({
          text: sec.heading,
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 100 },
        })
      );
    }

    if (sec.content) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: sec.content,
              italics: !!sec.isItalic,
              size: 21,
            }),
          ],
          spacing: { after: 120 },
        })
      );
    }

    if (sec.list) {
      sec.list.forEach((item) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `• ${item}`,
                size: 21,
              }),
            ],
            indent: { left: 400 },
            spacing: { after: 80 },
          })
        );
      });
    }
  });

  // Footer Note
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '--- UniFormat Sample Academic Template ---',
          size: 18,
          italics: true,
          color: '888888',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 300 },
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}

// 13 Document definitions with academic rigor
const documents = [
  // 1. Standard Academic Research Paper
  {
    dir: 'research-papers',
    filename: 'standard-academic-research-paper',
    title: 'Standard Academic Research Paper Format',
    category: 'Research Paper Formats',
    subtitle: 'Author: [Your Name] | Department of [Your Department] | [University Name] | Date: [Date]',
    sections: [
      { heading: 'Abstract', isItalic: true, content: 'This template provides the standardized structure for collegiate and postgraduate research papers. The abstract should synthesize the research problem, methodology, findings, and substantive conclusions within a concise 200 to 250-word window. Avoid acronyms and unverified citations in this summary block.' },
      { heading: 'Keywords', isItalic: true, content: 'Academic Formatting, Research Methodology, Empirical Analysis, Literature Review, Scholarly Communication.' },
      { heading: '1. Introduction', content: 'The introduction establishes the contextual foundation of the study. It clearly delineates the problem statement, primary research objectives, and the scope of investigation. Authors should explicitly highlight research questions and formulate operational hypotheses where applicable.' },
      { heading: '2. Literature Review', content: 'A rigorous synthesis of prior academic literature relevant to the research domain. Differentiate previous theoretical models, critique contradictory empirical results, and establish the specific academic gap that this inquiry addresses.' },
      { heading: '3. Methodology & Materials', content: 'Detailed procedural documentation enabling peer replication. Elaborate on research design, data collection mechanisms, sample size, population demographics, experimental apparatus, ethical clearances, and statistical inference tools utilized during data treatment.' },
      { heading: '4. Results and Analysis', content: 'Objective exposition of empirical findings accompanied by quantitative tables, statistical metrics, or qualitative narrative clusters. Reserve subjective interpretations for the subsequent discussion segment.' },
      { heading: '5. Discussion', content: 'Critical examination of findings in relation to established theories. Revisit initial hypotheses, acknowledge methodological boundaries, address potential biases, and propose directions for prospective academic inquiry.' },
      { heading: '6. Conclusion', content: 'Succinct encapsulation of substantive findings and their broader pedagogical, theoretical, or industrial implications.' },
      { heading: 'References', list: [
        'Anderson, P. K. (2023). Methodological Frameworks in Contemporary Academic Research. Journal of Higher Education, 45(2), 112-128.',
        'Davis, M. R., & Patel, S. (2022). Quantitative Inquiry in Collegiate Science Curricula. Academic Press, New York.',
        'Roberts, L. H. (2024). Principles of Standardized Academic Documentation. Cambridge University Press.'
      ]}
    ]
  },

  // 2. IEEE Research Paper Format
  {
    dir: 'research-papers',
    filename: 'ieee-research-paper-format',
    title: 'IEEE Conference and Journal Research Paper Format',
    category: 'Research Paper Formats',
    subtitle: 'First Author, Member, IEEE, Second Author, and Third Author | Department of Electrical Engineering',
    sections: [
      { heading: 'Abstract', isItalic: true, content: 'This template illustrates the standard IEEE double-column manuscript structure for conferences and journals. The abstract must accurately reflect the technical contributions, simulation or prototype benchmarks, and experimental metrics (typically 150-200 words).' },
      { heading: 'Index Terms', isItalic: true, content: 'Embedded Systems, Distributed Computing, Signal Processing, IEEE Standards, Algorithmic Optimization.' },
      { heading: 'I. Introduction', content: 'IEEE manuscripts demand structured numerical section heads. The introduction situates the engineering or scientific challenge, summarizes recent peer advances, and concludes with an outline of the paper\'s architecture.' },
      { heading: 'II. System Architecture and Design', content: 'Architectural schematics, circuit models, software architecture, algorithm state machines, and mathematical formulations governing system behavior.' },
      { heading: 'III. Mathematical Modeling & Equations', content: 'Formal proofs and governing formulas. Example: Let f(x) denote the loss metric where gradient descent converges within tolerance epsilon under bounded runtime complexity.' },
      { heading: 'IV. Experimental Evaluation and Benchmarks', content: 'Comparative evaluation against benchmark state-of-the-art implementations. Include performance metrics: throughput (req/s), latency (ms), error rates, and computational overhead.' },
      { heading: 'V. Conclusion and Future Directions', content: 'Summary of engineering contributions and validation against original design criteria.' },
      { heading: 'References', list: [
        '[1] J. K. Author, "Title of paper," IEEE Trans. Software Eng., vol. 49, no. 3, pp. 245-256, Mar. 2023.',
        '[2] M. Smith and B. Doe, "High-performance computational algorithms," in Proc. IEEE Int. Conf. Computing, 2022, pp. 101-108.',
        '[3] R. Williams, Standard Engineering Documentation, 3rd ed. Piscataway, NJ: IEEE Press, 2021.'
      ]}
    ]
  },

  // 3. APA Research Paper Format
  {
    dir: 'research-papers',
    filename: 'apa-research-paper-format',
    title: 'APA 7th Edition Student Research Paper Format',
    category: 'Research Paper Formats',
    subtitle: 'Running Head: APA FORMAT TEMPLATE | Student Name | Department of Psychology | Course Code: PSY-301 | Instructor Name | Due Date',
    sections: [
      { heading: 'Title Page (Page 1)', content: 'In APA 7th Edition for students, the title page features bold title in upper-and-lowercase, author name, institutional affiliation, course code and name, instructor title, and assignment submission date. Running head is optional for undergraduate student papers unless specified by faculty.' },
      { heading: 'Abstract', isItalic: true, content: 'A single, unindented paragraph of 150 to 250 words describing the problem, participants, study method, findings, and implications.' },
      { heading: 'Keywords', isItalic: true, content: 'APA 7th edition, student manuscript, social sciences, behavioral research, formatting guidelines.' },
      { heading: 'Introduction', content: 'Begins on page 3 with the paper title centered in bold. Introduce the problem, review pertinent literature, discuss theoretical rationale, and state precise hypotheses or questions.' },
      { heading: 'Method', content: 'Subdivided into: (a) Participants, (b) Measures and Instruments, and (c) Procedure. Every operational step must be articulated with exact psychometric detail.' },
      { heading: 'Results', content: 'Statistical reporting adheres strictly to APA notation: italicized p, t, F, and r values. Include degrees of freedom and effect sizes (e.g., Cohen\'s d or partial eta-squared).' },
      { heading: 'Discussion', content: 'Interpret findings in the broader psychological context, articulate practical applications, address study constraints, and suggest future avenues.' },
      { heading: 'References', list: [
        'American Psychological Association. (2020). Publication manual of the American Psychological Association (7th ed.). https://doi.org/10.1037/0000165-000',
        'Bandura, A. (2021). Social cognitive theory in collegiate development. Psychological Review, 128(1), 45-62.',
        'Kahneman, D., & Tversky, A. (2022). Heuristics and cognitive judgments in experimental research. Cambridge University Press.'
      ]}
    ]
  },

  // 4. MLA Research Paper Format
  {
    dir: 'research-papers',
    filename: 'mla-research-paper-format',
    title: 'MLA 9th Edition Academic Research Paper Format',
    category: 'Research Paper Formats',
    subtitle: 'Student Last Name 1 | Student Name | Professor Name | Course Name | Day Month Year',
    sections: [
      { heading: 'Header & Identification Block', content: 'MLA style does not mandate a separate title page unless requested. The top-left corner on page 1 lists: Student Full Name, Instructor Name, Course Title and Section, and Date. Running head in top-right corner displays [Last Name Page#] on every page.' },
      { heading: 'Paper Title', content: 'Centered in standard font (no bold, no italics, no underline) directly below the header block. Text follows with standard 0.5-inch paragraph indentation.' },
      { heading: 'Introduction & Thesis Statement', content: 'Establish cultural or textual context. The final sentence of the introductory paragraph should articulate an explicit, arguable thesis statement governing the analytical trajectory of the paper.' },
      { heading: 'Body Paragraphs & Textual Analysis', content: 'Each paragraph begins with a clear topic sentence, followed by textual evidence, direct quotation or paraphrase, and extensive analytical commentary. Use parenthetical citations (Author Page).' },
      { heading: 'Block Quotations', content: 'Quotations exceeding 4 lines of prose or 3 lines of poetry are formatted in a free-standing block indented 0.5 inches from the left margin, with no enclosing quotation marks.' },
      { heading: 'Conclusion', content: 'Recontextualize the thesis in light of the developed arguments. Emphasize why the textual, historical, or literary reading matters to the scholarly discourse.' },
      { heading: 'Works Cited', list: [
        'Eliot, T. S. The Waste Land and Other Poems. Edited by Frank Kermode, Penguin Books, 2021.',
        'Modern Language Association. MLA Handbook. 9th ed., Modern Language Association of America, 2021.',
        'Spivak, Gayatri Chakravorty. "Can the Subaltern Speak?" Postcolonial Studies Reader, edited by Bill Ashcroft, Routledge, 2020, pp. 24-28.'
      ]}
    ]
  },

  // 5. University General Research Paper Format
  {
    dir: 'research-papers',
    filename: 'university-research-paper-format',
    title: 'University Customizable Research Paper Format',
    category: 'Research Paper Formats',
    subtitle: 'Institutional Research Document | Candidate Name | Roll / Registration Number | Faculty of Science & Engineering',
    sections: [
      { heading: 'Declaration of Originality', content: 'I hereby declare that this research paper titled "[Your Topic]" is the outcome of my original academic effort and has not been submitted in part or full for any other degree or diploma to any university or institution.' },
      { heading: 'Certificate of Faculty Approval', content: 'This is to certify that the research work entitled "[Topic]" submitted by [Student Name] has been carried out under our supervision and meets the acceptable standards for academic evaluation.' },
      { heading: 'Abstract', isItalic: true, content: 'Universal modular abstract framework suitable for science, commerce, humanities, and engineering degree submissions. State the context, problem, objective, methodology, key findings, and summary recommendations.' },
      { heading: 'Chapter 1: Contextual Overview', content: 'Introduce institutional guidelines, definitions of terms, project motivation, organizational boundaries, and target beneficiaries of the study.' },
      { heading: 'Chapter 2: Conceptual & Theoretical Framework', content: 'Provide background theory, conceptual schematics, and analytical baseline models.' },
      { heading: 'Chapter 3: Investigative Methodology', content: 'Step-by-step description of procedures, sampling criteria, equipment specifications, and data security measures.' },
      { heading: 'Chapter 4: Implementation and Findings', content: 'Systematic presentation of data sets, comparative graphs, charts, and verification criteria.' },
      { heading: 'Chapter 5: Summary & Recommendations', content: 'Actionable takeaways for academic researchers, industry sponsors, and policy makers.' },
      { heading: 'Bibliography & Annexures', list: [
        'University Academic Guidelines for Dissertation and Thesis Preparation (2024 Edition).',
        'Standard Handbook for Research Writing and Documentation, Oxford University Press, 2023.'
      ]}
    ]
  },

  // 6. College Project Report
  {
    dir: 'project-reports',
    filename: 'college-project-report',
    title: 'Comprehensive College Final Year Project Report Format',
    category: 'Project Reports',
    subtitle: 'Project Title: [Title of Project] | Submitted by: [Student Name(s) & Roll Numbers] | Guided by: [Faculty Supervisor Name]',
    sections: [
      { heading: 'Project Abstract', isItalic: true, content: 'A complete overview of the software, hardware, or research project. Covers the targeted real-world problem, technology stack, architectural milestones, test outcomes, and future product viability.' },
      { heading: 'Chapter 1: Introduction and Problem Definition', content: 'Explain current industry challenges, legacy system bottlenecks, project rationale, objectives, hardware/software specifications, and feasibility study (technical, operational, economic).' },
      { heading: 'Chapter 2: Literature Survey and Existing Systems', content: 'Critical analysis of competing platforms and published techniques. Highlight shortcomings in existing software and how this project improves efficiency, security, or usability.' },
      { heading: 'Chapter 3: System Design and Architecture', content: 'Architectural diagrams, UML Class Diagrams, Sequence Diagrams, ER Diagrams, Database Schema, and API specifications.' },
      { heading: 'Chapter 4: Implementation and Module Details', content: 'Core algorithm workflows, source code breakdown, tech stack (Frontend, Backend, Database), security controls, and third-party integrations.' },
      { heading: 'Chapter 5: Testing and Validation', content: 'Test plans: Unit testing, Integration testing, System testing, User Acceptance Testing (UAT), and test case execution tables with pass/fail metrics.' },
      { heading: 'Chapter 6: Conclusion and Future Scope', content: 'Summary of completed objectives, challenges encountered during development, and planned enhancements.' },
      { heading: 'References and Appendices', list: [
        'Pressman, R. S. Software Engineering: A Practitioner\'s Approach, McGraw-Hill Education, 2022.',
        'W3C Standards and RESTful Architecture Specification Guidelines, 2023.'
      ]}
    ]
  },

  // 7. Practical File Format
  {
    dir: 'practical-files',
    filename: 'practical-file-format',
    title: 'Standard College Practical File / Record Format',
    category: 'Practical Files',
    subtitle: 'Course: Computer Science / Engineering Laboratory | Student Name: [Name] | Roll No: [Roll No] | Semester: [Sem]',
    sections: [
      { heading: 'Index / List of Experiments', content: '1. Implementation of Linear Search and Binary Search Algorithms\n2. Implementation of Singly Linked List with Insertion and Deletion\n3. Stack Implementation using Arrays with Push and Pop Operations\n4. Queue Implementation using Circular Arrays\n5. Implementation of QuickSort and MergeSort with Complexity Analysis' },
      { heading: 'Experiment Structure Guide', content: 'Each laboratory experiment entry must follow this rigorous uniform structure:\n1. Aim / Objective of the Experiment\n2. Prerequisites / Theoretical Background\n3. Hardware & Software Requirements\n4. Algorithm / Flowchart\n5. Documented Source Code / Circuit Diagram\n6. Sample Input & Output Verification\n7. Complexity Analysis / Viva Questions' },
      { heading: 'Sample Practical Entry: Experiment 01', content: 'AIM: Write a program to implement Binary Search on a sorted array of integers.\nTHEORY: Binary search operates on the divide-and-conquer paradigm with O(log n) time complexity.\nALGORITHM: Initialize low = 0, high = n - 1. While low <= high, compute mid = (low + high) / 2...' },
      { heading: 'Faculty Evaluation Criteria', list: [
        'Timely practical submission and index verification (5 Marks)',
        'Code correctness and adherence to coding guidelines (10 Marks)',
        'Viva Voce performance and concept clarity (10 Marks)',
        'Total Laboratory Assessment Weightage: 25 Marks'
      ]}
    ]
  },

  // 8. Lab Report Format
  {
    dir: 'lab-reports',
    filename: 'lab-report-format',
    title: 'Scientific Laboratory Report Format',
    category: 'Lab Reports',
    subtitle: 'Experiment Title: [Title of Lab Experiment] | Course: Physics / Chemistry / Electrical Lab | Date Performed: [Date]',
    sections: [
      { heading: '1. Objective & Hypothesis', content: 'State the precise experimental purpose. Formulate a testable quantitative hypothesis specifying dependent and independent variables.' },
      { heading: '2. Theoretical Background & Principles', content: 'Explain physical laws, chemical equations, or mathematical theorems governing the experiment (e.g., Ohm\'s Law, Snell\'s Law, Beer-Lambert Law).' },
      { heading: '3. Equipment & Apparatus List', content: 'Catalog of instruments with model numbers, calibration status, and measurement precisions (e.g., Digital Multimeter +/- 0.01V, Spectrophotometer, Vernier Caliper).' },
      { heading: '4. Experimental Procedure', content: 'Step-by-step documentation of experimental setup, parameter changes, safety protocols, and observational checkpoints.' },
      { heading: '5. Observation Tables & Raw Data', content: 'Structured tabular record of observations, repetitions (Trial 1, Trial 2, Trial 3), and arithmetic means.' },
      { heading: '6. Calculations and Error Analysis', content: 'Show all calculation formulas, percentage error calculation: % Error = |(Experimental - Theoretical) / Theoretical| * 100, and standard deviation.' },
      { heading: '7. Discussion and Conclusion', content: 'Analyze anomalies, evaluate sources of random and systematic errors, and formulate scientific conclusions.' }
    ]
  },

  // 9. Student Leave Application
  {
    dir: 'applications',
    filename: 'student-leave-application',
    title: 'Formal Student Leave Application Template',
    category: 'Leave Applications',
    subtitle: 'To the Head of Department / Principal | Sub: Application for Leave of Absence',
    sections: [
      { heading: 'Recipient Block', content: 'To,\nThe Head of Department,\nDepartment of [Department Name],\n[College / University Name],\n[City, State, Zip Code]\n\nDate: [Current Date]' },
      { heading: 'Subject Line', content: 'SUBJECT: Application for Leave of Absence from [Start Date] to [End Date] (Total: [Number] Days)' },
      { heading: 'Application Body', content: 'Respected Sir / Madam,\n\nI am writing to formally request leave of absence from classes from [Start Date] to [End Date] due to [Reason: Medical Illness / Family Emergency / Participation in University Sports Tournament].\n\nI am currently enrolled in [Course Name], Semester [Semester Number], Section [Section], Roll Number [Roll Number]. During my absence, I will coordinate with my classmates to ensure all class assignments, lab records, and notes are promptly caught up.\n\n[If medical: I have attached the relevant medical certificate issued by a registered medical practitioner for your verification.]' },
      { heading: 'Applicant Declaration & Signatures', content: 'I kindly request you to approve my leave for the aforementioned duration.\n\nThanking you,\n\nYours sincerely,\n\n[Signature]\n[Student Full Name]\nRoll Number: [Roll Number]\nContact Number: [Phone Number]\nEmail: [Email Address]\n\nParent / Guardian Signature: _______________________' }
    ]
  },

  // 10. Bonafide Certificate Application
  {
    dir: 'applications',
    filename: 'bonafide-certificate-application',
    title: 'Application for Issue of Bonafide Certificate',
    category: 'College Applications',
    subtitle: 'Standard Institutional Request for Educational, Passport, Scholarship, or Transit Verification',
    sections: [
      { heading: 'To', content: 'The Principal / Dean of Student Affairs,\n[College / University Name],\n[Campus Address]\n\nDate: [Date]' },
      { heading: 'Subject', content: 'SUBJECT: Requisition for the Issuance of Bonafide Certificate' },
      { heading: 'Application Body', content: 'Respected Authority,\n\nI am a bonafide student of this institution, currently studying in [Degree Program], Department of [Department], Year / Semester: [Year/Sem], bearing University Registration Number [Registration Number].\n\nI require a Bonafide Certificate in order to apply for [Purpose: National Scholarship Portal / Education Loan Verification / Passport Application / Student Bus/Metro Transit Pass / Internship Verification].\n\nI have enclosed a self-attested photocopy of my current College Identity Card and fee receipt for the ongoing academic semester.' },
      { heading: 'Verification Details', content: 'Kindly process my application and issue the certificate at your earliest convenience.\n\nYours obediently,\n\n[Student Full Name]\nRoll Number / Enrollment No: [Enrollment No]\nBranch & Year: [Branch, Year]\nEnclosures:\n1. Copy of College ID Card\n2. Copy of Latest Semester Fee Receipt' }
    ]
  },

  // 11. Internship Permission Letter
  {
    dir: 'applications',
    filename: 'internship-permission-letter',
    title: 'Internship Permission & Attendance Letter',
    category: 'College Applications',
    subtitle: 'Application Requesting Permission to Undergo Industrial Training / Corporate Internship',
    sections: [
      { heading: 'To', content: 'The Head of Department / Training & Placement Officer,\nDepartment of [Department],\n[College / Institute Name]\n\nDate: [Date]' },
      { heading: 'Subject', content: 'SUBJECT: Request for Permission to Pursue Industrial Internship at [Company Name]' },
      { heading: 'Letter Content', content: 'Respected Sir / Madam,\n\nI am pleased to inform you that I have been offered a position as [Internship Role, e.g., Software Engineering Intern] at [Company / Organization Name] for a duration of [Number of Weeks / Months], commencing from [Start Date] to [End Date].\n\nThis internship provides practical exposure directly aligned with our academic curriculum. The organization has agreed to adhere to university guidelines regarding deliverables and evaluation.\n\nI undertake to complete all coursework, mid-semester evaluations, and submit weekly progress reports as stipulated by the department.' },
      { heading: 'Recommendation & Enclosures', content: 'I request you to grant me permission to undertake this training and grant necessary attendance compensation as per college norms.\n\nThanking you,\n\nYours faithfully,\n\n[Student Name]\nRoll Number: [Roll Number]\n\nEnclosures:\n1. Official Internship Offer Letter from [Company Name]\n2. Internship Scope & Terms Document' }
    ]
  },

  // 12. No Objection Certificate (NOC) Application
  {
    dir: 'applications',
    filename: 'noc-application',
    title: 'Application for No Objection Certificate (NOC)',
    category: 'Other College Documents',
    subtitle: 'Request for Institutional Clearance for Off-Campus Activities, Research, or Competitions',
    sections: [
      { heading: 'To', content: 'The Registrar / Dean of Academic Affairs,\n[College / University Name],\n[Campus City, State]\n\nDate: [Date]' },
      { heading: 'Subject', content: 'SUBJECT: Application for Issuance of No Objection Certificate (NOC)' },
      { heading: 'Application Body', content: 'Respected Authority,\n\nI am [Student Name], a student of [Degree / Branch], Semester [Semester], holding Enrollment Number [Enrollment Number].\n\nI intend to participate in / apply for [Specify Activity: National Level Hackathon / External Research Project / Exchange Program / Part-time Industrial Certification] conducted by [Host Organization / University] from [Date] to [Date].\n\nThe organizers require an official No Objection Certificate (NOC) from my parent institution affirming that the college has no objection to my participation.' },
      { heading: 'Declaration', content: 'I assure you that my participation will not adversely affect my academic responsibilities. I will uphold the reputation of our institution during the program.\n\nKindly issue the NOC at your earliest convenience.\n\nYours faithfully,\n\n[Student Full Name]\nRoll No: [Roll No]\nDepartment: [Department]\nHead of Department Recommendation: [Signature & Stamp]' }
    ]
  },

  // 13. General College Application
  {
    dir: 'applications',
    filename: 'general-college-application',
    title: 'Universal Multi-Purpose College Application Template',
    category: 'Other College Documents',
    subtitle: 'General Standard Template for Course Corrections, Fee Queries, Re-evaluations, and Administrative Requests',
    sections: [
      { heading: 'Standard Heading', content: 'To,\nThe [Designation of Authority: Principal / Dean / Examination Controller / Registrar],\n[College / Institute Name],\n[City, State]\n\nDate: [Date of Submission]' },
      { heading: 'Subject Line Format', content: 'SUBJECT: Application Regarding [Clearly State Request: e.g., Re-checking of Examination Paper / Correction in Name on Grade Sheet / Request for Fee Installment / Issue of Duplicate ID Card]' },
      { heading: 'Application Body', content: 'Respected Sir / Madam,\n\nI, [Student Name], am a regular student of [Program Name, e.g., B.Tech / B.Sc / B.Com / MBA], currently in [Semester / Year], bearing Roll Number [Roll Number] and Enrollment Number [Enrollment Number].\n\nI am submitting this application to respectfully bring to your notice that [Describe your issue or request clearly and concisely in 2-3 paragraphs. Include dates, course codes, exam roll numbers, or specific incident details].\n\nI have attached all supporting documentation to expedite administrative verification.' },
      { heading: 'Closing & Sign-off', content: 'I earnestly request you to look into this matter sympathetically and take necessary action.\n\nThanking you,\n\nYours obediently,\n\n[Your Signature]\n[Your Full Name]\nRoll Number: [Roll Number]\nDepartment: [Department]\nMobile Number: [Contact Number]\nEmail Address: [Email Address]' }
    ]
  }
];

// Generator execution
async function run() {
  console.log('Generating PDF and DOCX files for all 13 document templates...');

  for (const item of documents) {
    const pdfPath = path.join(rootDir, 'public', 'templates', item.dir, `${item.filename}.pdf`);
    const docxPath = path.join(rootDir, 'public', 'templates', item.dir, `${item.filename}.docx`);

    // 1. Generate PDF
    const pdfBuffer = createPdfDocument(item.title, item.category, item.subtitle, item.sections);
    fs.writeFileSync(pdfPath, pdfBuffer);
    console.log(`[PDF] Generated: ${item.dir}/${item.filename}.pdf (${pdfBuffer.length} bytes)`);

    // 2. Generate DOCX
    const docxBuffer = await createDocxDocument(item.title, item.subtitle, item.sections);
    fs.writeFileSync(docxPath, docxBuffer);
    console.log(`[DOCX] Generated: ${item.dir}/${item.filename}.docx (${docxBuffer.length} bytes)`);
  }

  console.log('All 26 template files generated successfully!');
}

run().catch(err => {
  console.error('Document generation failed:', err);
  process.exit(1);
});

