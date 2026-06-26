# RR-BIG Workshop Site

This repository contains the static website for the RR-BIG Summer Institute.

## Structure

```text
RR-BIG-Workshop/
├── index.html
├── README.md
├── assets/
│   ├── app.js
│   └── style.css
├── content/
│   ├── materials.md
│   ├── overview.md
│   ├── people.md
│   ├── program.md
│   └── travel.md
└── data/
    ├── people-data.js
    └── schedule-data.js
```

## Current site pages

The current public navigation is:

- `Overview`
- `Program`
- `Materials`
- `Travel`
- `People`

## Where to edit content

### Pages rendered directly from `assets/app.js`

These pages are currently built from JavaScript template content inside `assets/app.js`:

- `Overview`
- `Program`
- `Materials`
- `Travel`
- `People`

If you want to change visible text, section structure, instructor names, or materials links on those pages, edit:

```text
assets/app.js
```

### Structured data files

The `People` page uses structured profile data from:

```text
data/people-data.js
```

The schedule data used by the schedule logic and workshop planning lives in:

```text
data/schedule-data.js
```

Each schedule item includes:

- `week`
- `day`
- `type`
- `startTime`
- `endTime`
- `title`
- `instructor`
- `notes`
- `readings`

### Markdown content folder

The `content/` folder is still available for simple markdown-backed pages or future expansion. At the moment, the main public pages are not primarily driven from these markdown files.

## Materials page workflow

The `Materials` page is organized:

- by `Week`
- then by `Day`
- then by session type such as `Lecture`, `Seminar/Roundtable`, and `Lab`

Each session currently supports two material links:

- `Slides`
- `Notes`

To post materials, open `assets/app.js` and find the relevant session entry inside `renderMaterialsPage()`. Add URLs under the `materials` object.

Example:

```js
{
  label: "Lecture",
  time: "9:00-10:30 AM",
  instructor: "Saonli Basu",
  title: "Population stratification, ancestry inference, admixture, and linear/nonlinear approaches including PCA, UMAP, and VAE.",
  materials: {
    slides: "https://example.com/day3-slides",
    notes: "https://example.com/day3-notes"
  }
}
```

If a link is missing, the site will show an `add link` placeholder.

## Navigation

The visible navigation buttons are defined in:

```text
index.html
```

The allowed page names and page-rendering logic are defined in:

```text
assets/app.js
```

If you add, remove, or rename a page, update both files.

## Styling

Site-wide styling is controlled by:

```text
assets/style.css
```

Tailwind utility classes are also used directly inside `index.html` and `assets/app.js`.

## Local preview

Open the site locally by loading:

```text
index.html
```

For example:

```text
file:///Users/saonli/UMN_GDC/RR-BIG-Workshop/index.html
```

If changes do not appear immediately in the browser, refresh the page or reopen the local file tab.

## Publishing notes

If this site is hosted through GitHub Pages, commit and push changes after editing. Static content updates usually appear after GitHub Pages refreshes.
