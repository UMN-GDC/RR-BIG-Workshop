# RR-BIG Website

This repository is structured so the website design and the editable content are separated.

## Folder structure

```text
rr-big-website/
  index.html
  assets/
    style.css
    app.js
  data/
    schedule-data.js
  content/
    overview.md
    program.md
    materials.md
    travel.md
    people.md
```

## How to edit content

Most page text lives in the Markdown files inside the `content/` folder.

For example:

- Edit `content/overview.md` to update the Overview page.
- Edit `content/program.md` to update the Program page.
- Edit `content/travel.md` to update the Travel page.

## How to edit the schedule

The schedule lives in:

```text
data/schedule-data.js
```

Add or revise entries there. Each schedule item has this structure:

```js
{
  week: "2",
  day: "Monday",
  type: "Lecture",
  startTime: "09:00",
  endTime: "10:00",
  title: "Lecture title",
  instructor: "Instructor name",
  notes: "Optional notes",
  readings: "Optional URL"
}
```

## How the website updates

The `index.html` file does not need to be manually edited when Markdown or schedule content changes.

When a visitor opens the site, `assets/app.js` loads:

- the selected Markdown file from `content/`
- the schedule data from `data/schedule-data.js`

On GitHub Pages, once you commit changes to a Markdown file or `schedule-data.js`, the website will show the updated content after GitHub Pages refreshes.

## Local preview

Because this site loads Markdown files using `fetch()`, do not preview it by double-clicking `index.html`.

Instead, run a small local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```
