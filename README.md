# PersonalWebsite

The source of my personal site, **[matpohj.fi](https://matpohj.fi/)** — a portfolio and blog where I collect my projects and course write-ups on cybersecurity, penetration testing and software development.

It is a hand-built static site: plain HTML, CSS and vanilla JavaScript, no framework and no build step. The server it runs on is provisioned and hardened entirely in code in a separate repository, [MatPohj/matpohj-infra](https://github.com/MatPohj/matpohj-infra), which clones this repo and serves it with nginx over HTTPS.

## Features

- **Data-driven blog.** Every post is a Markdown file listed in [`blogs/metadata.json`](blogs/metadata.json). The front end fetches that file and renders posts client-side with [markdown-it](https://github.com/markdown-it/markdown-it), so publishing a new write-up only means adding a Markdown file and one metadata entry — no HTML to touch.
- **Grouped by course.** Posts are organised into courses (Penetration Testing, Application Hacking, Network Attacks & Reconnaissance, Server Management, General), each linking back to its GitHub repository. The home page shows a summary and `/blog/` shows the full index and single-post view.
- **Self-hosted everything.** Fonts (Bricolage Grotesque, Instrument Sans, IBM Plex Mono) and scripts are served from the site itself, locked down with a strict `Content-Security-Policy` (`default-src 'self'`).
- **SEO & sharing.** Semantic metadata, Open Graph tags, schema.org `Person` structured data, `sitemap.xml` and `robots.txt`.

## Project structure

```
index.html            Home page (intro + course summary)
blog/index.html       Blog index and single-post view
css/style.css         All styling
js/
├── blog.js           Loads metadata.json, renders the blog and course list
└── vendor/           markdown-it (Markdown → HTML)
blogs/
├── metadata.json     The list of posts (id, title, date, file, …)
├── penetration_testing/ , application-hacking/ , network_attacks…/ , …
│                     Markdown posts and their images, grouped by course
fonts/                Self-hosted woff2 fonts + licenses
pictures/             Images and logos
sitemap.xml, robots.txt
```

## Running it locally

No build step — just serve the folder over HTTP (the blog uses `fetch`, so opening `index.html` from `file://` will not work):

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Adding a blog post

1. Drop a Markdown file into the relevant folder under `blogs/` (e.g. `blogs/pentesting/h8.md`).
2. Add an entry to `blogs/metadata.json` with its `id`, `title`, `date`, `excerpt` and `file`.

That's it — the post appears automatically, sorted into its course.

## Deployment

The site is deployed to [matpohj.fi](https://matpohj.fi/) by the [matpohj-infra](https://github.com/MatPohj/matpohj-infra) Ansible playbook, which clones this repository onto a hardened Ubuntu VPS and serves it with nginx and a Let's Encrypt certificate.
