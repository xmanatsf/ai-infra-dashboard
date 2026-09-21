# AI Infrastructure Dashboard — NSR synthesis

An interactive, static dashboard that synthesises **20 New Street Research (NSR) reports (January–September 2026)** into a single investment-grade view of the AI infrastructure buildout: scale, financing, unit economics, compute, supply, company positioning and the quarterly scorecard, covering **2015–2030** (core focus 2025–2030).

> **Confidentiality:** all data is extracted from licensed NSR research ("rendered exclusively for" the license holder). This dashboard is for internal analysis. **Do not publish to a public repository or redistribute** — if you deploy to GitHub Pages, use a **private repo with restricted Pages access** (GitHub Enterprise) or keep access limited.

Current vintage: **18 September 2026** (2Q26 reported).

## What's inside

| Tab | Contents |
|---|---|
| **01 Overview** | The thesis, six headline figures, the forecast revision ladder ($2.4tn → $3.0tn → $4.15tn), capex by component 2025–30, and the synthesis in five paragraphs |
| **02 Scale** | Capex by component with share-of-total, the 2025→2030 share shift, memory value content and margins, HBM share of the XPU bill of materials, the capacity/pricing frame, and the long arc of XPU spending |
| **03 Financing** | $16.5tn of cumulative capex viewed as uses and as sources, the hyperscaler FCF path, AI vs non-AI cloud, full group P&L 2025–30, house vs consensus capex, tier-2 and neocloud financing structure |
| **04 Unit economics** | Per-gigawatt economics across three business models, margin stacking, where $100 of frontier AI revenue goes, the capital-intensity crossover, contract pricing, plus server-level economics and the Oracle–OpenAI contract |
| **05 Compute** | XPU revenues by vendor, XPU TAM (house vs consensus), TSMC capex→revenue conversion, server CPU revenues and AI CPU share, the 2030 CPU TAM debate, AMD datacentre GPU and x86 server CPU share |
| **06 Supply** | What each layer of the supply chain said this quarter, the constraint heatmap (8 layers × 2026–28) with evidence per cell, and 8 technology-transition cards |
| **07 Companies** | Coverage table with ratings and target prices, 19 company cards with positioning, risks and prior-vintage revision markers, AMD revenue model 2025–30 |
| **08 2Q26 scorecard** | Quarter headline figures, cloud growth by provider, reported vs expected, consensus revisions over the season, the replatforming scorecard, and management commentary |
| **09 Conclusions** | Ten synthesised conclusions with sources, the February→September revision ladder, and the source-note registry |
| **10 Data** | 325 cleaned data points, filterable by segment / company / year / source note |

Every chart and table carries a **source footnote** naming the report; the registry on the Conclusions tab maps identifiers to full titles, dates and PDF filenames.

## How vintages are handled

Twenty notes across nine months disagree with each other, so the dashboard resolves them explicitly rather than silently:

- **The latest vintage is the live view.** Where September supersedes June, the September figure is what charts and tables show.
- **Superseded figures are retained as revision markers,** not deleted. The *What changed, vintage by vintage* table on the Conclusions tab records the February → April → June → September path for the six figures that moved most (2030 capex, 2030 XPU spend, 2026 hyperscaler capex, total DC spending, installed capacity, consensus 2027 capex).
- **Ratings are date-stamped.** A company card refreshed by the September notes shows the current rating and target price, with the prior one beneath it.
- **Two analyses are never mixed.** The 9 September funding work ($13.6tn capex, $2.5tn to finance) is superseded by the 18 September update ($16.5tn, $3.7tn); only the latter is used.

## Project structure

```
ai-infra-dashboard/
├── index.html              # single-page app shell; every chart/table is a data-* slot
├── css/style.css           # design tokens, light + dark theme (data-theme attr)
├── js/
│   ├── data.js             # GENERATED from data/nsr_data.json (do not edit)
│   ├── charts.js           # dependency-free SVG chart primitives
│   └── app.js              # renderers, filters, tabs, theme
├── data/
│   ├── nsr_data.json       # ★ canonical cleaned dataset (edit this)
│   ├── datapoints.csv      # flat extract for spreadsheets
│   ├── hyperscaler_capex.csv
│   ├── xpu_market.csv
│   └── server_cpu_revenue.csv
├── tools/build-data.js     # regenerates js/data.js + CSVs from the JSON
└── README.md
```

**No build step, no server-side code, no external dependencies.** Data is embedded as `js/data.js`, so the page works opened directly from disk (`file://`) as well as over HTTP.

## Run locally

Option A — just open `index.html` (double-click, or right-click → *Open with Live Server*).

Option B — tiny local server:

```bash
cd ai-infra-dashboard
python -m http.server 8000     # or: npx serve .
# then open http://localhost:8000
```

## Updating the data (new NSR reports)

1. Edit **`data/nsr_data.json`** only — add the report to `reports[]`, add datapoints and series, bump `meta.vintage` and `meta.built`.
2. If the new note supersedes a figure already on the dashboard, add a row (or update one) in `series.vintageLadder` rather than overwriting the old number in place.
3. Regenerate the embedded data and CSVs:
   ```bash
   node tools/build-data.js
   ```
4. Refresh the browser.

Adding a chart means adding a `data-chart="key"` slot in `index.html` and a matching `CH.key` renderer in `js/app.js`; the same pattern applies to `data-table` / `TB.key` and `data-legend` / `LG.key`. An unmatched key renders a visible placeholder rather than failing silently.

## Deploy to GitHub Pages

> Reminder: given the licensed source data, prefer a **private** repository. Public GitHub Pages sites are visible to anyone with the URL.

1. **Create a GitHub repository** — do *not* initialize with a README (this folder already has one).
2. **Commit** (`git add -A && git commit -m "…"`).
3. **Connect and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
4. **Enable Pages:** repo → **Settings → Pages** → Source *Deploy from a branch*, Branch **main**, folder **/ (root)**, Save.
5. **Verify** the dashboard loads, tabs switch, charts render, tooltips work, and the Data tab filters respond.

GitHub Pages redeploys automatically on every push to `main`.

## Data conventions & assumptions

- **Units:** US$bn unless stated; `(floor)` marks NSR ">x" values charted at the floor.
- **kind:** `actual` (reported), `guide` (company guidance), `estimate` (NSR estimate/analysis).
- **NSR vs consensus:** NSR is the house estimate; consensus is the Visible Alpha / FactSet post-event aggregate. Where they differ materially, both are shown.
- **Page references:** rows from the January–June notes carry a page number. The July–September notes are cited at note level, where the source presents figures as exhibits rather than numbered pages; those rows show the report identifier without a page.
- **Two CPU figures exist and are not interchangeable:** total server CPU spending reaches about $200bn in 2030, of which roughly $170bn is AI-attributable. The capex composition uses the AI-attributable figure; the Compute tab uses total server CPU spending.
- Composition midpoints are used where NSR gives ranges, noted in tooltips.
- The supply-constraint heatmap severity coding (balanced / constrained / sold out) is this dashboard's compilation of company commentary quoted in the Bibles; hover any cell for the underlying evidence.
- **Group definitions.** Top-8 hyperscalers: Google, Amazon, Microsoft, Meta, Oracle, Baidu, Alibaba, Tencent (quarterly capex excludes Baidu and Tencent). Top-5 public neoclouds: CoreWeave, Nebius, Iren, Whitefiber, SharonAI. Datacentre semis: Intel DCAI, Nvidia Datacenter, AMD Datacenter, Marvell Datacenter, MediaTek AI ASICs, Broadcom AI compute offload.

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
| REPLAT-2Q26 | 2026-07-30 | Hyperscaler replatforming 2Q26: answering the ROI question |
| CAPEX-GAP | 2026-07-31 | Hyperscaler capex: the street is closing the gap |
| LAB-ECON | 2026-09-04 | Economics of a frontier lab |
| FIN-II | 2026-09-08 | Financing the AI buildout (II): capital intensity and FCF margin |
| FIN-III | 2026-09-09 | Financing the AI buildout (III): running the numbers |
| CAPEX-4TN | 2026-09-18 | Here we are — $4tn AI capex in 2030? |
| BIBLE-2Q26 | 2026-09-18 | Quarterly Tech Bible 2Q26 — Hyperscale & Cloud |

All research by Pierre Ferragu & team, New Street Research Global Technology Research.
