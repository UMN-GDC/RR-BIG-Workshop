# RR-BIG Workshop Site

This repository contains the static website for the RR-BIG Summer Institute.

## Structure

```text
RR-BIG-Workshop/
├── index.html
├── assets/
│   ├── app.js
│   └── style.css
├── content/
│   ├── overview.md
│   ├── program.md
│   ├── people.md
│   └── travel.md
└── data/
    ├── people-data.js
    └── schedule-data.js
```

## Main content files

- Edit `content/overview.md` to update the Overview page.
- Edit `content/program.md` to update the Program page.
- Edit `content/people.md` to update the People page.
- Edit `content/travel.md` to update the Travel page.

The `People` page uses structured data from:

```text
data/people-data.js
```

## How to edit the schedule

The schedule lives in:

```text
data/schedule-data.js
```

Add or revise entries there. Each schedule item includes:

- `week`
- `day`
- `type`
- `startTime`
- `endTime`
- `title`
- `instructor`
- `notes`
- `readings`

## Navigation

The navigation tabs are defined in `index.html`, and the allowed page names are defined in `assets/app.js`.

The current public navigation is:

- `Overview`
- `Program`
- `Schedule`
- `Travel`
- `People`

## Publishing notes

The `index.html` file does not need to be manually edited when Markdown or schedule content changes, unless you are changing navigation labels or the overall page shell.

On GitHub Pages, once you commit changes to a Markdown file or `schedule-data.js`, the website will show the updated content after GitHub Pages refreshes.
