# AI Infrastructure Dashboard — NSR Synthesis

An interactive, static dashboard that synthesizes **13 New Street Research (NSR) reports (January–June 2026)** into a single investment-grade view of the AI infrastructure buildout: capex, XPU/GPU/ASIC, server CPUs, memory/HBM, networking, optics, foundry, competitive positioning, and ROI, covering **2015–2030** (core focus 2024–2030).

> **Confidentiality:** all data is extracted from licensed NSR research ("rendered exclusively for" the license holder). This dashboard is for internal analysis. **Do not publish to a public repository or redistribute** — if you deploy to GitHub Pages, use a **private repo with restricted Pages access** (GitHub Enterprise) or keep access limited.

## What's inside

| Tab | Contents |
|---|---|
| **Overview** | KPI cards, hyperscale capex growth by year (2022–2027E), AI vs non-AI capex, 1Q26 momentum snapshot |
| **Capex & Buildout** | Capex by company (2024–26), the $1.2tn buildout map (who spends → what model → who consumes), financing mix, Feb→Apr 2026 estimate revisions |
| **XPU & Foundry** | XPU revenues by vendor (Nvidia/AMD/Broadcom/other ASICs), NSR vs consensus XPU TAM (2023–2028), long-term XPU spend to $933bn (2030), TSMC capex→revenue conversion |
| **Server CPUs** | Vendor revenues (Intel/AMD/Arm, 2015–2030), AI CPU share, shipments (AI vs traditional), the $81bn–$200bn 2030 TAM debate, Nvidia's $20bn CPU guide unpacked |
| **Vendors** | 18 company cards with NSR ratings/TPs, positioning and risks; AMD 2025–2030 revenue model |
| **Technology & Supply** | Supply-constraint heatmap (8 layers × 2026–28) with evidence per cell; 8 technology-transition cards |
| **ROI & Economics** | Traditional vs AI cloud server economics, Oracle–OpenAI contract FCF/IRR, who pays the $190bn 2027 cloud bill, Azure AI margins, replatforming scorecard, hyperscaler P&L 2026→2030 |
| **Key Insights** | 10 synthesized conclusions with sources; source-report registry |
| **Data Explorer** | ~75 cleaned data points, filterable by segment / company / year / report, each cited to report + page |

Every chart and table carries a **source footnote** (`REPORT-ID p.N`); the report registry on the Key Insights tab maps IDs to full titles and PDF filenames.

## Project structure

```
ai-infra-dashboard/
├── index.html              # single-page app shell
├── css/style.css           # styles, light + dark theme (data-theme attr)
├── js/
│   ├── data.js             # GENERATED from data/nsr_data.json (do not edit)
│   ├── charts.js           # dependency-free SVG chart library
│   └── app.js              # section rendering, filters, theme toggle
├── data/
│   ├── nsr_data.json       # ★ canonical cleaned dataset (edit this)
│   ├── datapoints.csv      # flat extract for spreadsheets
│   ├── hyperscaler_capex.csv
│   ├── xpu_market.csv
│   └── server_cpu_revenue.csv
├── tools/build-data.js     # regenerates js/data.js + CSVs from the JSON
└── README.md
```

**No build step, no server-side code, no external dependencies.** Data is embedded as `js/data.js` so the page works when opened directly from disk (`file://`) as well as on GitHub Pages.

## Run locally

Option A — just open it:

1. Open the folder in VS Code (`File → Open Folder`).
2. Double-click `index.html` (or right-click → *Open with Live Server* if you have that extension).

Option B — tiny local server (avoids any browser file:// quirks):

```bash
cd ai-infra-dashboard
python -m http.server 8000     # or: npx serve .
# then open http://localhost:8000
```

## Updating the data (new NSR reports)

1. Edit **`data/nsr_data.json`** only — add new datapoints/series, bump `meta.built`, add the report to `reports[]`.
2. Regenerate the embedded data and CSVs:
   ```bash
   node tools/build-data.js
   ```
3. Refresh the browser. Commit and push (see below) to update the deployed site.

## Deploy to GitHub Pages

> Reminder: given the licensed source data, prefer a **private** repository. Public GitHub Pages sites are visible to anyone with the URL.

1. **Create a GitHub repository** — on github.com click **New repository**, name it (e.g. `ai-infra-dashboard`), do *not* initialize with a README (this folder already has one).
2. **Open this folder in VS Code** and test locally (see above).
3. **Initialize Git** (already done if you received this folder as a repo — check with `git status`):
   ```bash
   git init
   git add -A
   git commit -m "Initial AI infrastructure dashboard"
   ```
4. **Connect and push** (replace `<username>` / `<repo-name>`):
   ```bash
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
5. **Enable GitHub Pages:** repo → **Settings → Pages** → under *Build and deployment*:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)**
   - Save.
6. **Wait** ~1–2 minutes for the deployment (watch the *Actions* tab), then open the URL GitHub shows at the top of the Pages settings — typically `https://<username>.github.io/<repo-name>/`.
7. **Verify** the dashboard loads, tabs switch, charts render, tooltips work, and the Data Explorer filters respond.

### Updating the deployed dashboard later

```bash
node tools/build-data.js         # if you edited data/nsr_data.json
git add -A
git commit -m "Update dashboard data"
git push
```

GitHub Pages redeploys automatically on every push to `main`.

## Data conventions & assumptions

- **Units:** US$bn unless stated; `(floor)` marks NSR ">x" values charted at the floor.
- **kind:** `actual` (reported), `guide` (company guidance), `estimate` (NSR estimate/analysis).
- **Vintage:** where trackers disagree, the dashboard uses the **latest** (Apr-2026) vintage and shows the Feb-2026 numbers in the revisions table.
- Composition midpoints are used where NSR gives ranges (e.g., native AI $25–45bn → $35bn), noted in tooltips.
- The supply-constraint heatmap severity coding (0–2) is this dashboard's compilation of company commentary quoted in the 1Q26 Bible; hover any cell for the underlying quote reference.

## Source reports

| ID | Date | Title |
|---|---|---|
| ROIC | 2026-01-28 | What returns to expect on Cloud AI? |
| CAPEX-4Q25 | 2026-02-06 | Hyperscalers to nearly double AI capex again in 2026 |
| INFRA-I | 2026-03-02 | Grasping the AI Infra buildout (I): Who builds what, for whom? |
| INFRA-II | 2026-03-03 | Grasping the AI Infra buildout (II): How is it financed? |
| INFRA-III | 2026-03-04 | Grasping the AI Infra buildout (III): Who will pay for cloud AI services? |
| INFRA-IV | 2026-03-06 | Grasping the AI Infra buildout (IV): How can hyperscalers swallow so much Capex? |
| TSMC-XPU | 2026-03-09 | Following the money: TSMC capex points to XPU revenues well above expectations |
| CPU | 2026-04-10 | Server CPUs: A brave new world! |
| CAPEX-1Q26 | 2026-04-30 | Hyperscalers to double AI capex again in 2026 (1Q26 update) |
| REPLAT | 2026-04-30 | Hyperscaler replatforming: Here is how to answer the ROI question |
| AMD-1Q26 | 2026-05-06 | AMD 1Q26: Agentic AI boosting CPUs; GPU ramp on track |
| NVDA-CPU | 2026-05-26 | What does Nvidia's $20bn CPU guide imply for agentic CPU adoption? |
| BIBLE-1Q26 | 2026-06-09 | Quarterly Tech Bible 1Q26 — Hyperscale & Cloud |

All research by Pierre Ferragu & team, New Street Research Global Technology Research.
