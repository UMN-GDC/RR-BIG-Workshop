import { peopleData } from "../data/people-data.js";

const pages = ["overview", "program", "application", "people", "community"];
const pageContent = document.getElementById("pageContent");

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.hash = button.dataset.page;
  });
});

window.addEventListener("hashchange", renderCurrentPage);
renderCurrentPage();

function currentPage() {
  const hash = window.location.hash.slice(1);
  return pages.includes(hash) ? hash : "overview";
}

function renderCurrentPage() {
  const page = currentPage();
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.classList.toggle("nav-active", button.dataset.page === page);
  });

  const renderers = { overview: renderOverview, program: renderProgram, application: renderApplication, people: renderPeople, community: renderCommunity };
  pageContent.innerHTML = renderers[page]();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderOverview() {
  return `
    <section class="hero text-white">
      <div class="section-wrap">
        <div class="hero-grid">
          <div>
            <p class="eyebrow">Summer Institute · 2027</p>
            <h1 class="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.03]">Build reproducible research in brain imaging genomics.</h1>
            <p class="mt-6 max-w-2xl text-lg leading-8 text-white/85">The Summer Institute on Reproducible Research in Brain Imaging Genetics trains junior researchers in best practices for reproducible analysis of brain imaging genetics using the ABCD dataset.</p>
            <div class="mt-8 flex flex-wrap gap-3"><a href="#application" class="btn-primary">Apply now</a><a href="#program" class="btn-secondary">Explore the program</a><a href="2026/" class="btn-secondary">View the 2026 workshop</a></div>
          </div>
          <div class="grid grid-cols-2 gap-y-6 text-sm">
            <div class="hero-stat"><strong>3 weeks</strong><span class="text-white/75">July 12–30, 2027</span></div>
            <div class="hero-stat"><strong>In person</strong><span class="text-white/75">Minneapolis, Minnesota</span></div>
            <div class="hero-stat"><strong>ABCD</strong><span class="text-white/75">hands-on data training</span></div>
            <div class="hero-stat"><strong>Graduate</strong><span class="text-white/75">course credit available</span></div>
          </div>
        </div>
      </div>
    </section>
    <section class="section-wrap">
      <p class="eyebrow">The institute</p>
      <div class="mt-3 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div><h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight">From data foundations to collaborative, interpretable science.</h2></div>
        <p class="text-lg leading-8 text-slate-600">RR-BIG is for PhD students, postdoctoral fellows, and early-career researchers in neuroscience, genetics, psychiatry, psychology, statistics, and data science. The program combines instruction, practice, and team-based collaboration in a three-week, in-person institute.</p>
      </div>
      <div class="mt-10 grid gap-5 md:grid-cols-3">
        ${card("Hands-on ABCD training", "Work directly with ABCD data and learn how to integrate imaging, genomics, and behavioral information.")}
        ${card("Reproducible analysis", "Practice transparent, documented workflows for rigorous and collaborative brain imaging genetics research.")}
        ${card("Mentored collaboration", "Develop ideas through team-based projects with guidance from faculty, mentors, and peers.")}
      </div>
    </section>
    <section class="warm-band">
      <div class="section-wrap">
        <div class="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div><p class="eyebrow">Institute details</p><h2 class="mt-3 text-3xl font-extrabold">Join RR-BIG in Minneapolis.</h2></div>
          <div class="info-card">
            <p><strong>When:</strong> July 12–30, 2027 (three weeks, in person)</p>
            <p class="mt-2"><strong>Where:</strong> University of Minnesota, Minneapolis, MN</p>
            <p class="mt-2"><strong>Support:</strong> Registration, travel, housing, and partial meals are covered. Graduate-level course credit is available.</p>
            <p class="mt-4"><strong>Questions?</strong> Contact Megan Schlick at <a class="font-bold text-[#7a0019] underline" href="mailto:adam0489@umn.edu">adam0489@umn.edu</a> or 612-625-5451 for eligibility, application, or program details.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section-wrap">
      <div class="info-card grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div><p class="eyebrow">Applications open</p><h2 class="mt-2 text-2xl font-extrabold">Apply by January 31, 2027.</h2><p class="mt-2">Graduate students, postdoctoral fellows, and early-career researchers are invited to apply.</p></div>
        <a href="#application" class="btn-primary">Application details</a>
      </div>
    </section>
  `;
}

function renderProgram() {
  const weeks = [
    ["Week 1", "Neuroimaging foundations", "Understand brain structures and transform structural and functional MRI data into standardized, quality-controlled, and meaningful phenotypes.", ["Brain anatomy and MRI terminology", "BIDS, preprocessing, and data curation", "Phenotype extraction, quality control, and precision functional mapping"]],
    ["Week 2", "Genomics and statistical genetics", "Process genetic datasets, address ancestral confounding, estimate heritability, and learn the foundations of association and polygenic score analyses.", ["Genetic data QC and relatedness", "Ancestry, population stratification, and admixture", "Heritability, GWAS, and polygenic risk score modeling"]],
    ["Week 3", "Integrative analysis and reproducibility", "Bring imaging and genomics together through study design, data curation, analysis, visualization, and reproducible documentation.", ["Integrative brain imaging genomics workflows", "ABCD-style study design and data curation", "Capstone-style collaboration and reproducible reporting"]],
  ];
  return `
    <section class="section-wrap narrow">
      <p class="eyebrow">2027 program</p>
      <h1 class="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">An intensive, sequential learning experience.</h1>
      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-600">The overview below describes the 2026 three-week format of lectures, invited seminars, hands-on labs, and roundtable discussions. The detailed 2027 schedule and speakers will be posted here when confirmed.</p>
      <div class="mt-12 grid gap-6">${weeks.map(([label, title, description, topics]) => `
        <article class="info-card program-week">
          <p class="eyebrow">${label}</p><h2 class="mt-2 text-2xl font-extrabold">${title}</h2>
          <p class="mt-3">${description}</p>
          <ul class="mt-5 grid gap-2 md:grid-cols-3">${topics.map((topic) => `<li class="flex gap-2"><span class="text-[#7a0019] font-bold">•</span><span>${topic}</span></li>`).join("")}</ul>
        </article>`).join("")}
      </div>
    </section>
    <section class="warm-band"><div class="section-wrap narrow grid gap-5 md:grid-cols-3">
      ${card("Lectures", "Theory, methodology, and the reasoning behind key analytic decisions.")}
      ${card("Seminars & roundtables", "Conversations with researchers working across imaging genomics.")}
      ${card("Hands-on labs", "Supported coding, processing, and reproducible pipeline practice.")}
    </div></section>
  `;
}

function renderApplication() {
  return `
    <section class="hero text-white"><div class="section-wrap narrow">
      <p class="eyebrow">RR-BIG 2027</p><h1 class="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">Application information</h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-white/85">Apply to join the Summer Institute on Reproducible Research in Brain Imaging Genetics at the University of Minnesota.</p>
      <a class="btn-primary mt-8" href="https://umn.qualtrics.com/jfe/form/SV_emL526mMsXfYijk" target="_blank" rel="noopener">Apply now <span class="ml-1" aria-hidden="true">↗</span></a>
    </div></section>
    <section class="section-wrap narrow">
      <div class="grid gap-5 md:grid-cols-3">
        ${metric("Oct. 1, 2026", "Applications open")}
        ${metric("Jan. 31, 2027", "Application deadline")}
        ${metric("Feb. 28, 2027", "Acceptance notification")}
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <article class="info-card"><p class="eyebrow">Eligibility</p><h2 class="mt-2 text-2xl font-extrabold">Who may apply</h2><ul class="mt-4 list-disc pl-5 space-y-2"><li>Graduate students, postdoctoral fellows, and early-career researchers.</li><li>Background in statistics, bioinformatics, neuroscience, or a related field.</li><li>Commitment to full participation for the entire workshop.</li></ul></article>
        <article class="info-card"><p class="eyebrow">Materials</p><h2 class="mt-2 text-2xl font-extrabold">What to submit</h2><ul class="mt-4 list-disc pl-5 space-y-2"><li>Completed online application form.</li><li>Curriculum Vitae (PDF).</li></ul></article>
      </div>
      <div class="mt-6 info-card"><p class="eyebrow">Strong applications</p><h2 class="mt-2 text-2xl font-extrabold">What we look for</h2><ul class="mt-4 grid gap-2 md:grid-cols-2 list-disc pl-5"><li>Interest in reproducible research and neuroimaging genomics.</li><li>A clear explanation of how RR-BIG will benefit your research.</li><li>Relevant skills or motivation to learn.</li><li>Potential for impact on future collaborative work.</li></ul></div>
      <div class="mt-10 text-center"><a class="btn-primary" href="https://umn.qualtrics.com/jfe/form/SV_emL526mMsXfYijk" target="_blank" rel="noopener">Apply now <span class="ml-1" aria-hidden="true">↗</span></a><p class="mt-3 text-sm text-slate-500">The application opens in a new tab.</p></div>
    </section>
  `;
}

function renderPeople() {
  return `
    <section class="section-wrap narrow">
      <p class="eyebrow">People</p>
      <h1 class="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight">Faculty, mentors, and speakers.</h1>
      <p class="mt-5 max-w-3xl text-lg leading-8 text-slate-600">The people listed below represent the 2026 RR-BIG program and its collaborative expertise in neuroimaging, biostatistics, statistical genetics, and reproducible data science. 2027 participant-facing roles will be updated as they are confirmed.</p>
      <div class="mt-12"><h2 class="text-2xl font-extrabold">Program leadership</h2><div class="mt-5 grid gap-5 md:grid-cols-2">${peopleData.leadership.map(personCard).join("")}</div></div>
      <div class="mt-12"><h2 class="text-2xl font-extrabold">Lab mentors and teaching support</h2><div class="mt-5 grid gap-5 md:grid-cols-2">${peopleData.mentors.map(personCard).join("")}</div></div>
      <div class="mt-12"><h2 class="text-2xl font-extrabold">2026 guest speakers and roundtable contributors</h2><p class="mt-2 text-slate-600">This list recognizes the 2026 program. The 2027 speaker list is forthcoming.</p><div class="mt-5 info-card"><ul class="grid gap-3 md:grid-cols-2">${peopleData.speakers.map((speaker) => `<li class="text-slate-600 leading-relaxed">${speaker}</li>`).join("")}</ul></div></div>
    </section>
  `;
}

function renderCommunity() {
  const photos = [
    ["assets/photos/workshop-group.jpeg", "2026 RR-BIG participants and instructors gathered for a group photo."],
    ["assets/photos/lecture-color-corrected.png", "A workshop lecture in session."],
    ["assets/photos/IMG_8550.jpg", "Snapshot during the MIDB trip."],
    ["assets/photos/IMG_8553.jpg", "Snapshot during the MIDB trip."],
  ];
  return `
    <section class="hero text-white"><div class="section-wrap">
      <p class="eyebrow">Community</p><h1 class="mt-3 max-w-3xl text-4xl sm:text-5xl font-extrabold tracking-tight">Learning together, one workflow at a time.</h1>
      <p class="mt-5 max-w-2xl text-lg leading-8 text-white/85">This page looks back at the 2026 RR-BIG Summer Institute through workshop photos and participant feedback.</p>
    </div></section>
    <section class="section-wrap">
      <p class="eyebrow">Workshop moments</p><h2 class="mt-3 text-3xl sm:text-4xl font-extrabold">RR-BIG 2026 in photos</h2>
      <div class="mt-8 grid gap-5 sm:grid-cols-2">${photos.map(([src, alt]) => `<figure class="photo-card"><img src="${src}" alt="${alt}" loading="lazy"><figcaption class="px-4 py-3 text-sm text-slate-600">${alt}</figcaption></figure>`).join("")}</div>
    </section>
    <section class="warm-band"><div class="section-wrap">
      <p class="eyebrow">Participant feedback</p><h2 class="mt-3 text-3xl sm:text-4xl font-extrabold">Participant reflections</h2>
      <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-600">Anonymous feedback from the 2026 institute reflects the practical learning, supportive teaching, and collaborative spirit of RR-BIG.</p>
      <figure class="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <img src="data/participant-feedback/2026Feedback.png" alt="Overall student feedback rating distribution from 2026 RR-BIG survey" loading="lazy" class="w-full">
        <figcaption class="mt-3 text-center text-sm text-slate-600">Overall student feedback rating, 2026 RR-BIG Summer Institute survey (Fair to Excellent).</figcaption>
      </figure>
      <div class="mt-10 grid gap-5 lg:grid-cols-2">
        ${quote("“The workshop materials are excellent! They provide comprehensive coverage, from foundational concepts to the latest research in the field.”")}
        ${quote("“The most valuable part ... was learning about genetics and how genetic data can be used in research. The instructor explained many complex concepts clearly and connected the course lectures with the software labs.”")}
        ${quote("“Lab sessions with code and real data, simulations are helpful.”")}
        ${quote("“The configuration file and the pipeline are well built, and gave a clear understanding for GWAS.”")}
        ${quote("“Learning how to access ABCD data” was a particularly valuable part of the workshop.")}
        ${quote("“Overall, this was a very valuable and interesting week. The connection between the course material and the hands-on labs made learning much more effective.”")}
      </div>
    </div></section>
  `;
}

function card(title, description) { return `<article class="info-card"><h3>${title}</h3><p class="mt-3">${description}</p></article>`; }
function metric(value, description) { return `<div class="metric"><strong>${value}</strong><p class="mt-3 text-sm font-semibold text-slate-700 leading-6">${description}</p></div>`; }
function quote(text) { return `<article class="quote-card"><blockquote>${text}</blockquote><p class="mt-4 text-sm font-bold text-[#7a0019]">Anonymous 2026 participant</p></article>`; }
function personCard(person) { return `<article class="info-card"><h3>${person.name}</h3><p class="mt-2 text-sm font-bold text-[#7a0019]">${person.title}</p><p class="mt-3">${person.role}</p><a class="mt-4 inline-block text-sm font-bold text-[#7a0019] underline" href="mailto:${person.email}">${person.email}</a></article>`; }
