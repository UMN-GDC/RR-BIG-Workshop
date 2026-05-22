import { scheduleData } from "../data/schedule-data.js";

const pages = ["overview", "program", "schedule", "materials", "travel", "people"];
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

  if (page === "schedule") {
    renderSchedulePage();
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
            <div class="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-3 py-2 text-sm font-extrabold">
              ${formatTime(item.startTime)}
            </div>
            <p class="text-xs text-slate-500 font-semibold mt-2">to ${formatTime(item.endTime)}</p>
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

            <div class="mt-4 flex flex-wrap gap-2">
              ${item.readings ? `<a href="${item.readings}" target="_blank" rel="noopener" class="inline-flex items-center rounded-xl bg-[#7a0019] text-white px-3 py-2 text-xs font-extrabold hover:brightness-110">View materials →</a>` : `<span class="inline-flex items-center rounded-xl bg-slate-100 text-slate-500 px-3 py-2 text-xs font-bold">Materials coming soon</span>`}
            </div>
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
