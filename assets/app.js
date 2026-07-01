import { peopleData } from "../data/people-data.js";

const pages = ["overview", "program", "materials", "travel", "people"];
const pageContent = document.getElementById("pageContent");

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.dataset.page;
    navigateTo(page);
  });
});

window.addEventListener("hashchange", () => {
  loadPage(getPageFromHash());
});

function getPageFromHash() {
  const page = window.location.hash.replace("#", "");
  return pages.includes(page) ? page : "overview";
}

function navigateTo(page) {
  window.location.hash = page;
  loadPage(page);
}

function setActiveNav(page) {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.remove("nav-active");
    if (button.dataset.page === page) {
      button.classList.add("nav-active");
    }
  });
}

async function loadPage(page) {
  setActiveNav(page);
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (page === "overview") {
    renderOverviewPage();
    return;
  }

  if (page === "program") {
    renderProgramPage();
    return;
  }

  if (page === "materials") {
    pageContent.innerHTML = renderMaterialsPage();
    return;
  }

  if (page === "travel") {
    renderTravelPage();
    return;
  }

  if (page === "people") {
    renderPeoplePage();
    return;
  }

  try {
    const response = await fetch(`content/${page}.md`);
    if (!response.ok) {
      throw new Error(`Could not load content/${page}.md`);
    }
    const markdown = await response.text();
    pageContent.innerHTML = `<div class="markdown-body">${markdownToHtml(markdown)}</div>`;
  } catch (error) {
    pageContent.innerHTML = `
      <div class="p-8 bg-red-50 border border-red-200 rounded-2xl">
        <h1 class="text-2xl font-extrabold text-red-900">Content could not be loaded</h1>
        <p class="mt-2 text-red-800">Please check that the Markdown file exists in the content folder.</p>
      </div>
    `;
  }
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  let html = "";
  let inList = false;

  function closeList() {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  }

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      return;
    }

    if (trimmed.startsWith("### ")) {
      closeList();
      html += `<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`;
    } else if (trimmed.startsWith("## ")) {
      closeList();
      html += `<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`;
    } else if (trimmed.startsWith("# ")) {
      closeList();
      html += `<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`;
    } else if (trimmed.startsWith("- ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inlineMarkdown(trimmed.slice(2))}</li>`;
    } else {
      closeList();
      html += `<p>${inlineMarkdown(trimmed)}</p>`;
    }
  });

  closeList();
  return html;
}

function inlineMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function renderOverviewPage() {
  pageContent.innerHTML = `
    <div>
      <p class="text-xs uppercase tracking-[0.2em] font-extrabold text-[#7a0019]">Overview</p>
      <h1 class="text-4xl font-extrabold text-slate-950 mt-1">RR-BIG Summer Institute</h1>
      <p class="text-slate-600 mt-3 max-w-3xl">
        Welcome to the official directory for the Research Education Program: <strong>Reproducible Research in Brain Imaging Genetics (RR-BIG) Summer Institute</strong> at the University of Minnesota (UMN).
      </p>
      <p class="text-slate-600 mt-3 max-w-3xl">
        This is a three-week summer institute focused on neuroimaging foundations, statistical genetics, reproducible workflows, and integrative brain imaging genomics.
      </p>

      <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm" open>
        <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
          <span class="text-xl font-extrabold text-slate-950">Institute at a glance</span>
        </summary>
        <div class="px-5 pb-5">
          <ul class="space-y-2 text-slate-700">
            <li><strong>Dates:</strong> July 13-31, 2026</li>
            <li><strong>Location:</strong> University of Minnesota</li>
            <li><strong>Format:</strong> Lectures, labs, seminars, and roundtables</li>
            <li><strong>Core themes:</strong> Neuroimaging, genomics, reproducibility, and integrative analysis</li>
          </ul>
        </div>
      </details>

      <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
          <span class="text-xl font-extrabold text-slate-950">Who this institute is for</span>
        </summary>
        <div class="px-5 pb-5 text-slate-700 leading-relaxed">
          RR-BIG is designed for graduate students, postdoctoral trainees, research staff, and early-career investigators
          with interests in neuroimaging, statistical genetics, bioinformatics, biostatistics, neuroscience, or related
          quantitative health sciences.
        </div>
      </details>

      <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
          <span class="text-xl font-extrabold text-slate-950">Training goals</span>
        </summary>
        <div class="px-5 pb-5">
          <ul class="space-y-2 text-slate-700">
            <li>Build foundational knowledge in neuroimaging and statistical genetics.</li>
            <li>Practice hands-on workflows for data access, QC, analysis, and documentation.</li>
            <li>Connect participants with instructors, mentors, and guest speakers.</li>
            <li>Support reproducible and interpretable brain imaging genomics research.</li>
          </ul>
        </div>
      </details>

      <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
          <span class="text-xl font-extrabold text-slate-950">What participants will practice</span>
        </summary>
        <div class="px-5 pb-5">
          <ul class="space-y-2 text-slate-700">
            <li>Reading and organizing neuroimaging and genomics data in reproducible workflows</li>
            <li>Interpreting QC, relatedness, ancestry, heritability, and PRS outputs</li>
            <li>Connecting statistical genetics methods to real brain imaging research questions</li>
            <li>Working toward end-to-end, documented analyses suitable for collaborative science</li>
          </ul>
        </div>
      </details>
    </div>
  `;
}

function renderProgramPage() {
  pageContent.innerHTML = `
    <div>
      <p class="text-xs uppercase tracking-[0.2em] font-extrabold text-[#7a0019]">Program</p>
      <h1 class="text-4xl font-extrabold text-slate-950 mt-1">Program structure</h1>
      <p class="text-slate-600 mt-3 max-w-3xl">
        The RR-BIG Summer Institute is organized as an intensive three-week sequence that combines lectures,
        seminars, and hands-on laboratory work.
      </p>
      <p style="margin-top: 1.5rem; margin-bottom: 1.5rem;">
         <a href="materials/RRBIG Syllabus 2026.pdf" 
             target="_blank" 
             style="display: inline-block; font-weight: 700; color: white; background-color: maroon; padding: 0.75rem 1rem; border-radius: 6px; text-decoration: none; font-size: 1.1rem;">
              Download the RR-BIG Workshop Syllabus PDF
         </a>
      </p>
      <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm" open>
        <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
          <span class="text-xl font-extrabold text-slate-950">Program overview</span>
        </summary>
        <div class="px-5 pb-5">
          <ul class="space-y-3 text-slate-700">
            <li><strong>Lecture (9:00 AM - 10:30 AM, 1:00 PM - 2:00 PM):</strong> Didactic theory, methodology, and mathematical formulations.</li>
            <li><strong>Seminar (11:30 AM - 12:30 PM, M/W/F):</strong> Invited seminar talks with researcher leaders in imaging genetics.</li>
            <li><strong>Hands-On Laboratory (2:30 PM - 3:30 PM):</strong> Active-learning coding, processing, and pipeline execution inside the secure MSI cluster sandbox.</li>
          </ul>
        </div>
      </details>

      ${renderProgramWeek("Week 1: Neuroimaging Foundations", [
        "<strong>Focus:</strong> Understanding brain structures, transforming raw structural and functional MRI data into standard, quality-controlled, and topologically accurate phenotypes.",
        "<strong>Leader Instructor and Lab Mentor:</strong> <strong>Dr. Eric Feczko</strong>",
        "<strong>Seminar Speakers:</strong> <strong>Drs. Sylia Wilson, Tervo-Clemmens, and Steve Nelson</strong>",
        "<strong>Topics:</strong> brain anatomy, MRI terminology, BIDS, preprocessing, phenotype extraction, quality control, and precision functional mapping."
      ], true)}

      ${renderProgramWeek("Week 2: Genomics and Statistical Genetics", [
        "<strong>Focus:</strong> Processing genetic datasets, controlling for ancestral confounding, estimating heritability, and executing genome-wide association studies (GWAS).",
        "<strong>Leader Instructor:</strong> <strong>Dr. Saonli Basu</strong>",
        "<strong>Lab Mentors:</strong> <strong>Dr. Christian Coffman</strong> and <strong>Mr. Kody DeGolier</strong>",
        "<strong>Seminar Speakers:</strong> <strong>Drs. Wei Pan, Brendon Coombes, and Jin Jin</strong>",
        "<strong>Topics:</strong> genetic QC, GRM, population stratification, ancestry, heritability estimation, GWAS, and polygenic risk score modeling."
      ])}

      ${renderProgramWeek("Week 3: Integrative ABCD Analysis and Reproducibility", [
        "<strong>Focus:</strong> Executing safe, compliant, and fully reproducible neuroimaging genetics analyses on the ABCD study.",
        "<strong>Leader Instructor:</strong> <strong>Dr. Lin Zhang</strong>",
        "<strong>Lab Mentor:</strong> <strong>Dr. Kelly Duffy</strong>",
        "<strong>Seminar Speakers:</strong> <strong>Drs. Tianzhong Yang, Thierry Chekouo, and David Kennedy</strong>",
        "<strong>Topics:</strong> study design, data curation, capstone project on ABCD study, visualization, and reproducible documentation."
      ])}
    </div>
  `;
}

function renderProgramWeek(title, items, openByDefault = false) {
  return `
    <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm" ${openByDefault ? "open" : ""}>
      <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
        <span class="text-xl font-extrabold text-slate-950">${title}</span>
      </summary>
      <div class="px-5 pb-5">
        <ul class="space-y-3 text-slate-700">
          ${items.map((item) => `<li class="leading-relaxed">${item}</li>`).join("")}
        </ul>
      </div>
    </details>
  `;
}

function renderDetailSections(sections) {
  return sections.map((section) => `
    <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm" ${section.open ? "open" : ""}>
      <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
        <span class="text-xl font-extrabold text-slate-950">${section.title}</span>
      </summary>
      <div class="px-5 pb-5">
        ${section.content}
      </div>
    </details>
  `).join("");
}

function renderMaterialLinks(materials = {}) {
  const order = [
    ["slides", "Slides"],
    ["notes", "Notes"]
  ];

  return `
    <div class="mt-3 flex flex-wrap gap-2">
      ${order.map(([key, label]) => {
        const href = materials[key];
        if (href) {
          return `<a href="${href}" target="_blank" rel="noopener" class="inline-flex items-center rounded-full border border-[#7a0019]/20 bg-[#7a0019]/5 px-3 py-1 text-xs font-semibold text-[#7a0019] hover:bg-[#7a0019]/10">${label}</a>`;
        }
        return `<span class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">${label}: add link</span>`;
      }).join("")}
    </div>
  `;
}

function renderMaterialSession(session) {
  return `
    <div class="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <p class="text-sm font-bold text-slate-900">${session.label}</p>
          <p class="text-sm text-slate-500">${session.time}</p>
        </div>
        <p class="text-sm font-medium text-slate-600">${session.instructor || ""}</p>
      </div>
      <p class="mt-2 text-sm leading-relaxed text-slate-700">${session.title}</p>
      ${session.notes ? `<p class="mt-2 text-sm text-slate-500">${session.notes}</p>` : ""}
      ${renderMaterialLinks(session.materials || {})}
    </div>
  `;
}

function renderMaterialDay(day, openByDefault = false) {
  return `
    <details class="rounded-3xl border border-slate-200 bg-slate-50/70 shadow-sm" ${openByDefault ? "open" : ""}>
      <summary class="cursor-pointer list-none px-4 py-4 md:px-5 flex items-start justify-between gap-4">
        <div>
          <h3 class="text-xl font-extrabold text-slate-950">${day.day}</h3>
          <p class="mt-1 text-sm text-slate-600">${day.focus}</p>
        </div>
        <span class="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 border border-slate-200">${day.sessions.length} items</span>
      </summary>
      <div class="px-4 pb-4 md:px-5 md:pb-5">
        <div class="grid gap-3">
          ${day.sessions.map((session) => renderMaterialSession(session)).join("")}
        </div>
      </div>
    </details>
  `;
}

function renderMaterialsWeek(week) {
  return {
    title: week.title,
    open: week.open,
    content: `<div class="grid gap-4">${week.days.map((day) => renderMaterialDay(day, false)).join("")}</div>`
  };
}

function renderMaterialsPage() {
  const weeks = [
    {
      title: "Week 1: Basics of Brain Anatomy and Neuroimaging Data",
      open: false,
      days: [
        {
          day: "Day 1",
          focus: "Scientific questions in brain genomics and neuroimaging as intermediate phenotypes.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Eric Feczko", title: "Introduce scientific questions in brain genomics and use of neuroimaging as intermediate phenotypes.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Roundtable Group", title: "Big Data vs. Deep Phenotyping: perspectives toward 21st century neuroimaging research.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Eric Feczko", title: "Continuation of the motivating scientific questions lecture with imaging genomics examples.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Michael Anderson", title: "Accessing NDA/LASSO and the ABCD database.", materials: {} }
          ]
        },
        {
          day: "Day 2",
          focus: "Brain structure, parcellation, and key neuroanatomical concepts.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Eric Feczko", title: "Overview of brain structure and parcellation.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Eric Feczko", title: "Continuation of brain structure and parcellation with examples.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Michael Anderson", title: "Viewing neuroimaging data.", materials: {} }
          ]
        },
        {
          day: "Day 3",
          focus: "Neuroimaging terminology, voxel/ROI concepts, and imaging modalities.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Eric Feczko", title: "Introduce neuroimaging terminology and modalities.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 1 faculty", title: "Progress toward brain imaging data standardization and harmonization.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Eric Feczko", title: "Continuation with structural and functional imaging workflow examples.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Michael Anderson", title: "Data standards, processing, and curation workflows.", materials: {} }
          ]
        },
        {
          day: "Day 4",
          focus: "Extraction of meaningful imaging phenotypes.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Eric Feczko", title: "Extraction of meaningful phenotypes.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Eric Feczko", title: "Continuation with morphometry and phenotype definition choices.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Michael Anderson", title: "Morphometry data extraction and QC.", materials: {} }
          ]
        },
        {
          day: "Day 5",
          focus: "Precision functional mapping, pitfalls, and reproducibility discussion.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Eric Feczko", title: "Precision functional mapping.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 1 faculty", title: "Pitfalls and considerations for MRI phenotypes.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Eric Feczko", title: "Continuation of precision functional mapping with translational examples.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Michael Anderson", title: "Precision functional mapping workflow review.", materials: {} }
          ]
        }
      ]
    },
    {
      title: "Week 2: Genomics Data and Methods for Heritability and Polygenic Risk Score Analysis",
      open: true,
      days: [
        {
          day: "Day 1",
          focus: "Genetic data foundations, genotype formats, QC concepts, and statistical genetics motivation.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Saonli Basu", title: "Genetic data foundations for brain imaging genetics, genotype data formats, QC concepts, and statistical genetics motivation.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 2 faculty", title: "Genetic data quality control and reproducible workflows in imaging genetics.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Saonli Basu", title: "Afternoon continuation of genetic data foundations and QC concepts.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Christian Coffman", title: "Run QC pipeline and get oriented to genetic data types (.vcf.gz, .bed, .bim, .fam, .ped).", materials: {} }
          ]
        },
        {
          day: "Day 2",
          focus: "Relatedness, kinship estimation, mixed effect models, and genomic relationship matrices.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Saonli Basu", title: "Relatedness, kinship estimation, mixed effect models, and genomic relationship matrices.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Saonli Basu", title: "Afternoon continuation with estimation strategy and interpretation examples.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Christian Coffman", title: "Explore relatedness and kinship outputs and identify duplicates, siblings, and cryptic relatives.", materials: {} }
          ]
        },
        {
          day: "Day 3",
          focus: "Population stratification, ancestry inference, admixture, and linear/nonlinear embedding approaches.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Saonli Basu", title: "Population stratification, ancestry inference, admixture, and linear/nonlinear approaches including PCA, UMAP, and VAE.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 2 faculty", title: "Ancestry, admixture, and fairness in multi-ethnic brain imaging genomics studies.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Saonli Basu", title: "Afternoon continuation with classification, RF-based assignment, and interpretation of admixed samples.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Christian Coffman", title: "Explore global ancestry outputs and compare PCA, UMAP, and VAE on simulated admixed data.", materials: {} }
          ]
        },
        {
          day: "Day 4",
          focus: "Family-based and SNP-based heritability estimation in multi-site and multi-ancestry studies.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Saonli Basu", title: "Heritability estimation in family-based and SNP-based settings, with attention to multi-site and multi-ancestry studies.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Saonli Basu", title: "Afternoon continuation on modeling assumptions, estimators, and interpretation.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Christian Coffman", title: "Run SNP heritability analyses and compare estimates across ancestries, sites, and estimators.", materials: {} }
          ]
        },
        {
          day: "Day 5",
          focus: "Polygenic risk score analysis, evaluation, portability, and diverse-sample prediction.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Saonli Basu", title: "Polygenic risk score analysis, evaluation, portability, and statistical/machine learning approaches in diverse samples.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 2 faculty", title: "Interpretation, limitations, and responsible use of heritability and polygenic risk scores.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Saonli Basu", title: "Afternoon continuation with PRS workflow decisions and performance interpretation.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Kody DeGolier", title: "Run PRS workflow and explore outputs, evaluation metrics, and portability across samples.", materials: {} }
          ]
        }
      ]
    },
    {
      title: "Week 3: Study Design and Integrative Analysis of Brain Imaging Genomics",
      open: false,
      days: [
        {
          day: "Day 1",
          focus: "Study design and the role of imaging genetics in translational research.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Week 3 faculty", title: "Study design for brain imaging genomics and reproducible integrative analysis.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 3 faculty", title: "Advanced discussion in integrative imaging genomics.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Week 3 faculty", title: "Continuation with design considerations and translational examples.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Kelly Duffy", title: "Hands-on integrative analysis workflow.", materials: {} }
          ]
        },
        {
          day: "Day 2",
          focus: "Association analysis, modeling choices, and reproducible interpretation.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Week 3 faculty", title: "Association modeling and interpretation for imaging genomics studies.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Week 3 faculty", title: "Continuation with model diagnostics and sensitivity analyses.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Kelly Duffy", title: "Applied association analysis and reproducible reporting.", materials: {} }
          ]
        },
        {
          day: "Day 3",
          focus: "Integrative pipelines and harmonized multi-modal workflows.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Week 3 faculty", title: "Integrative pipelines for brain imaging genomics.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 3 faculty", title: "Discussion of challenges in large collaborative neuroimaging genomics studies.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Week 3 faculty", title: "Continuation with harmonization, reproducibility, and workflow design.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Kelly Duffy", title: "Hands-on reproducible multi-modal analysis activity.", materials: {} }
          ]
        },
        {
          day: "Day 4",
          focus: "Capstone-style synthesis and collaborative analysis practice.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Week 3 faculty and mentors", title: "Capstone analysis planning and synthesis of institute methods.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Week 3 faculty and mentors", title: "Continuation with collaborative interpretation and presentation planning.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Kelly Duffy", title: "Capstone work session and mentor feedback.", materials: {} }
          ]
        },
        {
          day: "Day 5",
          focus: "Project presentation, reflection, and next steps.",
          sessions: [
            { label: "Lecture", time: "9:00-10:30 AM", instructor: "Week 3 faculty", title: "Project synthesis, interpretation, and responsible reporting.", materials: {} },
            { label: "Seminar/Roundtable", time: "11:30 AM-12:30 PM", instructor: "Week 3 faculty", title: "Final discussion on reproducibility, collaboration, and future directions.", materials: {} },
            { label: "Lecture", time: "1:00-2:00 PM", instructor: "Week 3 faculty", title: "Wrap-up session and institute takeaways.", materials: {} },
            { label: "Lab", time: "2:30-3:30 PM", instructor: "Kelly Duffy", title: "Capstone wrap-up and materials review.", materials: {} }
          ]
        }
      ]
    }
  ];

  const sections = weeks.map((week) => renderMaterialsWeek(week));

  return `
    <section class="content-page page-materials">
      <div class="hero-card materials-hero">
        <h1>Course Materials</h1>
        <p>Browse each week by day, then attach session-specific slides and notes for lectures, seminars, and hands-on activities.</p>
      </div>
      <div class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        To post materials, replace any <strong>add link</strong> placeholder with a Box, Google Drive, or local course file URL in the site data.
      </div>
      ${renderDetailSections(sections)}
    </section>
  `;
}

function renderTravelPage() {
  pageContent.innerHTML = `
    <div>
      <p class="text-xs uppercase tracking-[0.2em] font-extrabold text-[#7a0019]">Travel</p>
      <h1 class="text-4xl font-extrabold text-slate-950 mt-1">Travel and logistics</h1>
      <p class="text-slate-600 mt-3 max-w-3xl">
        Practical planning information for RR-BIG Summer Institute participants.
      </p>

      ${renderTravelSection("Institute dates and location", [
        "<strong>Program dates:</strong> July 13-31, 2026",
        "<strong>Location:</strong> University of Minnesota, Twin Cities campus",
        "<strong>Daily format:</strong> Lectures, labs, seminars, and roundtables"
      ], true)}

      ${renderTravelSection("Travel to campus", [
        "Participants flying to Minnesota will typically arrive at <strong>Minneapolis-Saint Paul International Airport (MSP)</strong>, about 13 miles from campus.",
        "<strong>Light rail:</strong> Take the Blue Line from MSP to U.S. Bank Stadium Station, then transfer to the Green Line toward St. Paul and exit at <strong>East Bank Station</strong>.",
        "<strong>Taxi or rideshare:</strong> App-based rides and taxis are available directly from the airport.",
        "<strong>Driving:</strong> Parking and campus arrival instructions can be added here once finalized."
      ])}

      ${renderTravelSection("Housing", [
        "On-campus housing will be provided at <strong>Pioneer Hall</strong>.",
        "<strong>Address:</strong> 615 Fulton Street SE, Minneapolis, MN 55455",
        "<strong>Check-in:</strong> 1:00 PM beginning Saturday, July 11, 2026",
        "<strong>Check-out:</strong> By 12:00 PM on Sunday, August 2, 2026",
        "<strong>Room setup:</strong> Bed linens and towels are provided, though beds may not be pre-made.",
        "<strong>Linen exchange:</strong> Replacement linens and towels are available through the Pioneer Hall Information Desk."
      ])}

      ${renderTravelSection("Dining", [
        "<strong>Mondays:</strong> Breakfast; on July 20 and July 27, breakfast and dinner",
        "<strong>Tuesdays:</strong> Breakfast, lunch, and dinner",
        "<strong>Wednesdays:</strong> Breakfast and dinner",
        "<strong>Thursdays:</strong> Breakfast, lunch, and dinner",
        "<strong>Fridays:</strong> Breakfast and dinner; on July 31, breakfast only",
        "Additional meals may be provided for selected program events."
      ])}

      ${renderTravelSection("Nearby food and campus amenities", [
        "Dining options are available in <strong>Stadium Village</strong>, <strong>Dinkytown</strong>, <strong>Northeast Minneapolis</strong>, and <strong>Downtown Minneapolis</strong>.",
        "Campus-specific maps, Wi-Fi instructions, and building access notes can be added here if needed."
      ])}

      ${renderTravelSection("Support", [
        "<strong>Program questions:</strong> Saonli Basu (saonli@umn.edu) or Lin Zhang (zhan4800@umn.edu)",
        "<strong>Workshop and lab support:</strong> Christian Coffman (coffm049@umn.edu), Kelly Duffy (duffy379@umn.edu), or Kody DeGolier (baron063@umn.edu)",
        "<strong>Accessibility or accommodation needs:</strong> participants should contact the program team in advance so campus resources can be coordinated appropriately",
        "<strong>Urgent logistics questions during the institute:</strong> use the primary workshop contacts distributed to participants before arrival"
      ])}
    </div>
  `;
}

function renderTravelSection(title, items, openByDefault = false) {
  return `
    <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm" ${openByDefault ? "open" : ""}>
      <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
        <span class="text-xl font-extrabold text-slate-950">${title}</span>
      </summary>
      <div class="px-5 pb-5">
        <ul class="space-y-3 text-slate-700">
          ${items.map((item) => `<li class="leading-relaxed">${item}</li>`).join("")}
        </ul>
      </div>
    </details>
  `;
}

function renderSchedulePage() {
  pageContent.innerHTML = `
    <div>
      <p class="text-xs uppercase tracking-[0.2em] font-extrabold text-[#7a0019]">Schedule</p>
      <h1 class="text-4xl font-extrabold text-slate-950 mt-1">Day-by-day sessions</h1>
      <p class="text-slate-600 mt-3 max-w-3xl">
        Filter by week or session type. The schedule is generated from <code class="bg-slate-100 px-1 rounded">data/schedule-data.js</code>.
      </p>

      <div class="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
        <div class="flex flex-wrap gap-2">
          <button data-week="all" class="week-btn px-4 py-2 text-sm font-bold rounded-xl border">All Weeks</button>
          <button data-week="1" class="week-btn px-4 py-2 text-sm font-bold rounded-xl border">Week 1</button>
          <button data-week="2" class="week-btn px-4 py-2 text-sm font-bold rounded-xl border">Week 2</button>
          <button data-week="3" class="week-btn px-4 py-2 text-sm font-bold rounded-xl border">Week 3</button>
        </div>

        <div class="flex flex-col sm:flex-row gap-3">
          <select id="typeFilter" class="text-sm bg-white border border-slate-300 rounded-xl px-3 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-[#ffcc33]">
            <option value="all">All session types</option>
            <option value="Lecture">Lectures</option>
            <option value="Lab">Labs</option>
            <option value="Seminar">Seminars/Roundtables</option>
          </select>
          <div id="itemCount" class="text-sm text-slate-600 font-bold bg-white border border-slate-200 rounded-xl px-3 py-2">0 sessions</div>
        </div>
      </div>

      <div id="scheduleTimeline" class="mt-8 space-y-8"></div>
    </div>
  `;

  let activeWeek = "all";

  document.querySelectorAll(".week-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeWeek = button.dataset.week;
      renderSchedule(activeWeek);
    });
  });

  document.getElementById("typeFilter").addEventListener("change", () => {
    renderSchedule(activeWeek);
  });

  renderSchedule(activeWeek);
}

function renderPeoplePage() {
  pageContent.innerHTML = `
    <div>
      <p class="text-xs uppercase tracking-[0.2em] font-extrabold text-[#7a0019]">People</p>
      <h1 class="text-4xl font-extrabold text-slate-950 mt-1">Faculty, mentors, and speakers</h1>
      <p class="text-slate-600 mt-3 max-w-3xl">
        RR-BIG brings together faculty, research professionals, and invited speakers across neuroimaging,
        biostatistics, statistical genetics, and reproducible data science.
      </p>

      <div class="mt-8">
        ${renderPeopleSection("Program leadership", peopleData.leadership, true)}
        ${renderPeopleSection("Lab mentors and teaching support", peopleData.mentors, false)}
        ${renderSpeakersSection()}
      </div>
    </div>
  `;
}

function renderPeopleSection(title, people, openByDefault = false) {
  return `
    <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm" ${openByDefault ? "open" : ""}>
      <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
        <span class="text-xl font-extrabold text-slate-950">${title}</span>
        <span class="text-sm font-semibold text-slate-500">${people.length} people</span>
      </summary>
      <div class="px-5 pb-5 grid gap-4 md:grid-cols-2">
        ${people.map((person) => `
          <article class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h3 class="text-lg font-extrabold text-slate-950">${person.name}</h3>
            <p class="mt-1 text-sm font-semibold text-[#7a0019]">${person.title}</p>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">${person.role}</p>
            <p class="mt-3 text-sm font-semibold text-slate-700">Email: <span class="font-normal text-slate-800">${person.email}</span></p>
          </article>
        `).join("")}
      </div>
    </details>
  `;
}

function renderSpeakersSection() {
  return `
    <details class="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <summary class="cursor-pointer list-none px-5 py-4 flex items-center justify-between">
        <span class="text-xl font-extrabold text-slate-950">Guest speakers and roundtable contributors</span>
        <span class="text-sm font-semibold text-slate-500">${peopleData.speakers.length} people</span>
      </summary>
      <div class="px-5 pb-5">
        <ul class="space-y-3 text-slate-700">
          ${peopleData.speakers.map((speaker) => `<li class="leading-relaxed">${speaker}</li>`).join("")}
        </ul>
      </div>
    </details>
  `;
}

function renderSchedule(activeWeek) {
  const container = document.getElementById("scheduleTimeline");
  const selectedType = document.getElementById("typeFilter").value;
  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  document.querySelectorAll(".week-btn").forEach((button) => {
    const isActive = button.dataset.week === activeWeek;
    button.className = isActive
      ? "week-btn px-4 py-2 text-sm font-bold rounded-xl border bg-[#7a0019] text-white border-[#7a0019] shadow-sm"
      : "week-btn px-4 py-2 text-sm font-bold rounded-xl border bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
  });

  let filtered = [...scheduleData];

  if (activeWeek !== "all") {
    filtered = filtered.filter((item) => item.week === activeWeek);
  }

  if (selectedType !== "all") {
    filtered = filtered.filter((item) => item.type === selectedType);
  }

  filtered.sort((a, b) => {
    if (a.week !== b.week) return a.week.localeCompare(b.week);
    if (a.day !== b.day) return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
    return a.startTime.localeCompare(b.startTime);
  });

  document.getElementById("itemCount").innerText = `${filtered.length} session${filtered.length === 1 ? "" : "s"}`;

  if (!filtered.length) {
    container.innerHTML = `<div class="p-8 text-center text-sm font-semibold text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">No sessions match the selected filters.</div>`;
    return;
  }

  let activeHeader = "";
  let html = "";

  filtered.forEach((item) => {
    const header = `Week ${item.week} · ${item.day}`;
    const typeStyle = getTypeStyle(item.type);

    if (header !== activeHeader) {
      activeHeader = header;
      html += `
        <div class="flex items-center gap-3 pt-2">
          <div class="h-px bg-slate-200 flex-1"></div>
          <h2 class="text-sm font-extrabold uppercase tracking-[0.18em] text-slate-500">${header}</h2>
          <div class="h-px bg-slate-200 flex-1"></div>
        </div>
      `;
    }

    html += `
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition">
        <div class="flex flex-col md:flex-row md:items-start gap-4">
          <div class="md:w-40 shrink-0">
            <div class="inline-flex items-center rounded-xl bg-slate-100 text-slate-950 px-3 py-2 text-sm font-extrabold border border-slate-300">
              ${formatTime(item.startTime)} - ${formatTime(item.endTime)}
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-2">
              <span class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-extrabold ${typeStyle.badge}">
                <span class="w-2 h-2 rounded-full ${typeStyle.dot}"></span>
                ${typeStyle.label}
              </span>
              <span class="text-xs font-bold text-slate-500">Instructor: <span class="text-slate-800">${item.instructor}</span></span>
            </div>

            <h3 class="text-lg font-extrabold text-slate-950 leading-snug">${item.title}</h3>
            ${item.notes ? `<p class="mt-2 text-sm text-slate-600 leading-relaxed">${item.notes}</p>` : ""}
          </div>
        </div>
      </article>
    `;
  });

  container.innerHTML = html;
}

function getTypeStyle(type) {
  const styles = {
    Lecture: { label: "Lecture", badge: "bg-emerald-50 text-emerald-800 border-emerald-200", dot: "bg-emerald-500" },
    Lab: { label: "Lab", badge: "bg-blue-50 text-blue-800 border-blue-200", dot: "bg-blue-500" },
    Seminar: { label: "Seminar / Roundtable", badge: "bg-purple-50 text-purple-800 border-purple-200", dot: "bg-purple-500" },
  };

  return styles[type] || styles.Lecture;
}

function formatTime(timeString) {
  if (!timeString) return "TBD";
  const [hour, minute] = timeString.split(":");
  const H = parseInt(hour, 10);
  return `${H % 12 || 12}:${minute} ${H >= 12 ? "PM" : "AM"}`;
}

loadPage(getPageFromHash());
