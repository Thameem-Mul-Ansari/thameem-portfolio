# Thameem Mul Ansari · Portfolio

Static, SEO-first portfolio built with **Astro + React islands**, hosted on **Firebase Hosting**.

- 3D draggable lanyard ID card in the hero (three.js + Rapier physics, desktop only; a CSS badge is shown on phones and for reduced motion)
- **Ask my AI** chat on Gemini via **Firebase AI Logic** + **App Check** (no backend, no exposed API key)
- Project grid → pop-up with image carousel; every project also has its own indexable page at `/projects/<slug>`
- Projects and certifications are content files, so adding one never touches code
- Contact form → your **n8n** workflow (email, Telegram, Google Sheets, auto-reply)
- CI/CD: GitHub Actions deploys `main` to live and every pull request to a preview URL with a Lighthouse report

---

## 1. Run it locally

Requires Node 20.3+ (22 recommended).

```bash
npm install
cp .env.example .env      # fill in values (see section 4)
npm run dev               # http://localhost:4321
npm run build && npm run preview
```

Commit the generated `package-lock.json`. CI uses `npm ci`, which needs it.

---

## 2. Add or edit content (no code changes)

### Add a project

1. Make a folder for screenshots: `src/assets/projects/my-new-project/`
   Put in `cover.png` (shown on the card) and any number of screenshots (`01-flow.png`, `02-dashboard.png`, …).
   PNG, JPG and WebP all work; they're resized and converted to WebP automatically at build time.
2. Copy any file in `src/content/projects/` to `src/content/projects/my-new-project.md` and edit it:

```yaml
---
title: My new project
summary: One sentence shown on the card and in Google results.
category: Voice AI
client: Retail company
year: '2026'
role: Lead developer          # optional
accent: blue                  # blue or orange
order: 3                      # lower numbers show first
metrics:
  - value: '~60%'
    label: fewer manual tickets
stack: [n8n, Azure OpenAI, Python]
cover: ../../assets/projects/my-new-project/cover.png
coverAlt: What the cover image shows
gallery:
  - src: ../../assets/projects/my-new-project/01-flow.png
    alt: n8n workflow that routes tickets
    caption: Optional caption under the image
links:                        # all optional
  live: https://example.com
  github: https://github.com/you/repo
  video: https://youtu.be/xyz
draft: false                  # true hides it
---

## The problem
...

## What I built
...
```

The file name becomes the URL: `my-new-project.md` → `/projects/my-new-project`.

### Replace the placeholder screenshots

All images in `src/assets/projects/*` are placeholders. Drop your real screenshots in with the **same file names**, or change the paths in the project's `.md` file.

### Add a certification

1. Put the badge image in `src/assets/certifications/` (download your real badges from Credly or Microsoft Learn).
2. Copy a file in `src/content/certifications/` and edit `name`, `code`, `issuer`, `badge`, `order`, and optionally `issued` and `credentialUrl` (adds a "Verify credential" link).

### Other text

- Bio, experience, education, impact numbers, chat suggestions: `src/data/profile.ts`
- Tech stack and logos: `src/data/stack.ts`. Icon names come from [Iconify](https://icon-sets.iconify.design/) (`logos:` or `simple-icons:` sets). If a name doesn't exist, a coloured lettered tile is shown instead, so a typo never breaks the build.
- Photos: `src/assets/images/`
- Resume download: `public/resume.pdf` (note: it includes your phone number, which the website itself does not show)

The AI chat rebuilds its knowledge from all of the above on every deploy.

---

## 3. Firebase setup (one time)

1. **Create a project** at <https://console.firebase.google.com> and add a **Web app**. Copy its config values.
2. **Hosting**: `npm i -g firebase-tools`, then `firebase login`, and put your project ID in `.firebaserc`.
3. **Firebase AI Logic**: in the console open *AI Logic* → *Get started* → choose the **Gemini Developer API**.
4. **App Check** (required for AI Logic):
   - Create a **reCAPTCHA Enterprise** key for your domains (include `localhost` for testing).
   - Console → *App Check* → your web app → reCAPTCHA Enterprise → paste the site key.
   - After the site works, open *App Check → APIs → Firebase AI Logic* and click **Enforce**.
   - Local dev: the browser console prints an App Check debug token on first chat. Add it under *App Check → Manage debug tokens*.
5. Deploy by hand once: `npm run deploy`.

**Model**: set `PUBLIC_GEMINI_MODEL` to the current Flash model listed in the Firebase AI Logic docs. Firebase AI Logic also has per-user rate limits you can tune in the console.

---

## 4. Environment variables

| Name | What it is |
| --- | --- |
| `PUBLIC_SITE_URL` | Your live URL, used for canonical links, sitemap and social cards |
| `PUBLIC_FIREBASE_API_KEY`, `_AUTH_DOMAIN`, `_PROJECT_ID`, `_APP_ID` | From the Firebase web app config |
| `PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY` | reCAPTCHA Enterprise site key used by App Check |
| `PUBLIC_GEMINI_MODEL` | Gemini model name |
| `PUBLIC_CONTACT_WEBHOOK_URL` | Production URL of your n8n webhook |
| `PUBLIC_WEB3FORMS_KEY` | Optional fallback for the form if you don't use n8n |

All of these end up in the browser, which is expected. App Check is what protects the Gemini calls.

---

## 5. CI/CD with GitHub Actions

Workflows in `.github/workflows/`:

- `deploy.yml`: on every push to `main` → install → build → deploy to the **live** site
- `preview.yml`: on every pull request → build → deploy a **preview URL** (posted as a PR comment, expires in 7 days) → **Lighthouse** report

Setup:

1. Push this repo to GitHub.
2. Create the service account secret. The easiest way is `firebase init hosting:github`, which creates a secret named like `FIREBASE_SERVICE_ACCOUNT_YOUR_PROJECT_ID`. Either rename it to **`FIREBASE_SERVICE_ACCOUNT`** or change that name in both workflow files. (Say **no** when it offers to overwrite the workflow files.)
3. GitHub → *Settings → Secrets and variables → Actions → **Variables***: add every `PUBLIC_*` variable from the table above.

Your everyday flow is then: add a project file and screenshots → `git push` → live in about two minutes.

---

## 6. Contact form

Import `n8n/portfolio-contact-workflow.json` into n8n and follow `n8n/README-n8n.md`.

---

## 7. SEO checklist after launch

- Connect a custom domain (Firebase Hosting → *Add custom domain*) and update `PUBLIC_SITE_URL`.
- Add the site to **Google Search Console** and submit `https://your-domain/sitemap-index.xml`.
- Check social previews with LinkedIn's Post Inspector.
- Already built in: unique titles and descriptions per page, canonical URLs, Open Graph/Twitter cards, `Person`, `WebSite`, `CreativeWork` and breadcrumb structured data, sitemap, robots.txt, responsive WebP images, and lazy-loaded 3D.

---

## Project structure

```
src/
  assets/            images (optimised at build time)
  content/           projects/*.md and certifications/*.md
  data/              profile.ts, stack.ts
  components/        page sections; lanyard/ (3D badge); chat/ (AI widget)
  lib/               ai.js (Gemini), knowledge.ts (chat knowledge), carousel.ts, icons.ts
  pages/             index, projects/[slug], 404, knowledge.json, robots.txt
public/              favicon, og.png, resume.pdf
n8n/                 contact-form workflow
.github/workflows/   CI/CD
```
