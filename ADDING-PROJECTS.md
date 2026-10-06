# Adding projects to Ansari Automates

How to add, edit, feature, hide and remove projects (and certifications) on the portfolio.
No code changes are needed: each project is **one text file + one folder of images**.

Put this file in the project root (`thameem-portfolio\ADDING-PROJECTS.md`) so it's always there when you need it.

---

## 1. Where things live

```
thameem-portfolio\
└── src\
    ├── assets\
    │   ├── projects\
    │   │   └── <project-name>\        ← images for one project (cover + screenshots)
    │   └── certifications\            ← certification badge images
    ├── content\
    │   ├── projects\
    │   │   └── <project-name>.md      ← text for one project
    │   └── certifications\
    │       └── <cert-code>.md         ← text for one certification
    └── lib\
        └── projects.ts                ← HOME_LIMIT (how many projects the home page shows)
```

The **project name** must be identical in both places, for example
`src\assets\projects\invoice-agent\` and `src\content\projects\invoice-agent.md`.

**Naming rules:** lowercase letters, numbers and dashes only. No spaces.
`invoice-agent` ✅  `Invoice Agent` ❌  `invoice_agent` ❌

The name becomes the project's web address: `invoice-agent.md` → `/projects/invoice-agent`.

---

## 2. Add a new project (step by step)

### Step 1: Add the images

Create the folder `src\assets\projects\invoice-agent\` and put in:

| File | What it's for | Tips |
| --- | --- | --- |
| `cover.png` | The card thumbnail on the home page and /projects | Best at **1600 × 1000** (16:10). A clean dashboard or workflow screenshot works best. |
| `01-flow.png`, `02-dashboard.png`, `03-mobile.png`, … | Screenshots in the pop-up carousel | Any size. Phone screenshots are shown in full, never cropped. Number them in the order you want them shown. |

- PNG, JPG and WebP all work. Don't worry about file size: images are compressed automatically when the site builds.
- **Blur client data first.** Hide client names, phone numbers, customer details, invoices and anything under an NDA.

### Step 2: Create the text file

Create `src\content\projects\invoice-agent.md`, paste this template and fill it in:

```markdown
---
title: Invoice processing agent
summary: One sentence for the card and Google results.
category: AI Agents
client: Logistics company in the UAE
year: '2026'
role: Lead developer
accent: blue
order: 7
featured: false
metrics:
  - value: '~80%'
    label: less manual data entry
  - value: '2 min'
    label: per invoice, down from 15
stack: [LangGraph, Azure OpenAI, FastAPI, React]
cover: ../../assets/projects/invoice-agent/cover.png
coverAlt: Invoice agent dashboard showing processed invoices
gallery:
  - src: ../../assets/projects/invoice-agent/01-flow.png
    alt: n8n workflow that routes incoming invoices
    caption: Every invoice is routed automatically.
  - src: ../../assets/projects/invoice-agent/02-dashboard.png
    alt: Dashboard of processed invoices
links:
  live: https://example.com
  github: https://github.com/Thameem-Mul-Ansari/repo-name
  video: https://youtu.be/xyz
draft: false
---

## The problem

What was slow, manual or broken before. Two or three sentences.

## What I built

- One feature per bullet
- Mention the key tools in **bold**

## Results

The outcome, with numbers if you have them.
```

### Step 3: Check it locally

```bash
npm run dev
```

Then open:

- `http://localhost:4321` → the home page (if the project is in the home 6)
- `http://localhost:4321/projects` → the All projects page
- `http://localhost:4321/projects/invoice-agent` → the project's own page

Click the card and check the pop-up: screenshots, captions, text and links.

### Step 4: Publish

```bash
git add .
git commit -m "Add invoice agent project"
git push
```

GitHub Actions builds and deploys it automatically. It's live in about 2 minutes.
Ansari AI (the chat) also learns about the new project on that deploy.

---

## 3. Every field explained

| Field | Required | What it does |
| --- | --- | --- |
| `title` | ✅ | Project name on the card, pop-up and page. |
| `summary` | ✅ | One sentence on the card. Also used as the Google description. |
| `category` | ✅ | Small label above the title. Also creates the **filter buttons** on /projects, so reuse the same spelling for similar projects (e.g. always `Voice AI`, not `Voice AI` and `voice ai`). |
| `client` | ✅ | Who it was for. Keep it generic if needed: "Hotel in the UAE". |
| `year` | ✅ | In quotes: `'2026'`. |
| `role` | optional | Your role, e.g. `Lead developer`. Delete the line if not needed. |
| `accent` | optional | `blue` or `orange`: the card's background tint. Alternate them for variety. Default: `blue`. |
| `order` | optional | Position. Lower numbers come first. `1` is the big featured card on the home page. Default: `100`. |
| `featured` | optional | `true` = may appear on the home page. See section 4. Default: `false`. |
| `metrics` | optional | Results. The **first one** shows on the card; all of them show in the pop-up. 1–3 works best. |
| `stack` | optional | Tools used, shown as tags: `[n8n, Python, Azure OpenAI]`. |
| `cover` | ✅ | Path to the cover image. |
| `coverAlt` | ✅ | Short description of the cover image (for Google and screen readers). |
| `gallery` | optional | Screenshots for the carousel. Each needs `src` and `alt`; `caption` is optional. If empty, the cover is shown instead. |
| `links` | optional | `live`, `github`, `video` (all optional). Each shows as a button. Delete any you don't have, or delete the whole `links:` block. |
| `draft` | optional | `true` hides the project everywhere without deleting it. Default: `false`. |

**Image paths always start with `../../assets/projects/`**, because they're relative to the `.md` file.

---

## 4. Choosing which projects appear on the home page

The home page shows **up to 6** projects. Every project always appears on `/projects`.

| Situation | What the home page shows |
| --- | --- |
| **No** project has `featured: true` | The first 6 by `order` |
| **Some** projects have `featured: true` | Only those, up to 6, sorted by `order` |
| **More than 6** have `featured: true` | The first 6 of them by `order` |

When there are more projects than the home page shows, a **"View all N projects"** button and a **"See N more projects"** button appear automatically.

**Recommended setup once you have more than 6 projects:**

1. Put `featured: true` on your best 6.
2. Give those 6 `order: 1` to `order: 6`, with your strongest project as `1` (it gets the big full-width card).
3. Give all other projects `order: 7` and up.

To change the limit of 6, edit `HOME_LIMIT = 6` in `src\lib\projects.ts`.

---

## 5. Updating your current projects

These six are already on the site. Their write-ups are done; only the **images are placeholders**.
Drop your real screenshots into each folder **using the same file names**, and they're picked up automatically:

```
src\assets\projects\
  turnaround-orchestration\      cover.png  01-dashboard.png  02-agents.png  03-assistant.png
  hotel-voice-agents\            cover.png  01-call-flow.png  02-dashboard.png  03-mobile.png
  call-audio-analytics\          cover.png  01-overview.png  02-insights.png
  social-engagement-automation\  cover.png  01-n8n-flow.png  02-replies.png
  sensei-teaching-assistant\     cover.png  01-classroom.png  02-syllabus.png  03-mobile.png
  payment-reconciliation-rpa\    cover.png  01-flow.png  02-report.png
```

Using `.jpg` instead of `.png`, or a different number of screenshots? Update the paths in that project's `gallery:` list to match.

---

## 6. Hide or remove a project

- **Hide for now:** set `draft: true` in its `.md` file.
- **Remove for good:** delete `src\content\projects\<name>.md` **and** the folder `src\assets\projects\<name>\`.

---

## 7. Add a certification

1. Put the badge image in `src\assets\certifications\`, e.g. `az-104.png`
   (download your real badge from Credly or Microsoft Learn).
2. Create `src\content\certifications\az-104.md`:

```markdown
---
name: Azure Administrator Associate
code: AZ-104
issuer: Microsoft
badge: ../../assets/certifications/az-104.png
order: 5
issued: 'Nov 2026'
credentialUrl: https://learn.microsoft.com/api/credentials/share/en-us/YourName/XXXX
---
```

- `order`: lower numbers show first.
- `issued` and `credentialUrl` are optional. `credentialUrl` adds a **Verify credential** link.

The four current badges in `src\assets\certifications\` are placeholders. Replace them with your real badges using the same file names (`pl-500.png`, `ai-900.png`, `dp-600.png`, `dp-700.png`).

---

## 8. Common mistakes and fixes

| Problem | Cause | Fix |
| --- | --- | --- |
| Build error mentioning an image path | The file name or extension doesn't match exactly | Check spelling, `.png` vs `.jpg`, and capital letters. The error names the missing file. |
| Build error about YAML / frontmatter | Formatting in the top section | See the rules below. |
| Project doesn't appear on the home page | Other projects are `featured: true` and this one isn't, or it's beyond the first 6 | Add `featured: true` and/or a lower `order`. It's always on `/projects`. |
| Project doesn't appear anywhere | `draft: true`, or the file isn't in `src\content\projects\` | Set `draft: false` and check the folder. |
| Two filter buttons for the same thing | Categories spelled differently | Use the exact same `category` text. |
| Changes don't show in the browser | Dev server cache | Stop (`Ctrl+C`), run `npm run dev` again, then `Ctrl+Shift+R`. |

**Formatting rules for the top section (between the `---` lines):**

- **Quote values that start with a number or symbol:** `'2026'`, `'~80%'`, `'2 min'`, `'90%+'`.
- **Quote text containing a colon:** `summary: 'Built X: fast and reliable'`.
- **Indent with 2 spaces, never tabs.** The `- src:` and `alt:` lines under `gallery:` must line up exactly like the template.
- **Keep the `---` lines** at the very top and after the last field.
- Use straight quotes `'` `"`, not curly ones `‘ ’` (watch out when copying from Word or WhatsApp).

---

## 9. Quick checklist

- [ ] Folder `src\assets\projects\<name>\` with `cover.png` + screenshots
- [ ] File `src\content\projects\<name>.md` with the **same** `<name>`
- [ ] Image paths in the `.md` match the real file names exactly
- [ ] Client data blurred in screenshots
- [ ] `category` spelled the same as similar projects
- [ ] `order` set; `featured: true` if it should be on the home page
- [ ] Checked at `http://localhost:4321/projects/<name>`
- [ ] Pushed to GitHub
