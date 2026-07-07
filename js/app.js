/* Dashboard app: renders all sections from window.NSR (see data/nsr_data.json). */
(function () {
  const D = window.NSR;
  const $ = s => document.querySelector(s);
  const v = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  // Entity color map - color follows the entity everywhere (dataviz rule).
  const C = () => ({
    Microsoft: v("--s1"), Google: v("--s2"), Meta: v("--s3"), Amazon: v("--s8"),
    Oracle: v("--s5"), xAI: v("--s6"), Bytedance: v("--s7"), Other: v("--muted"),
    Nvidia: v("--s4"), AMD: v("--s6"), Broadcom: v("--s5"), Intel: v("--s1"), Arm: v("--s2"),
    AI: v("--s1"), NonAI: v("--baseline"),
    NSR: v("--s1"), Consensus: v("--muted")
  });

  // ---- Theme toggle ----
  const root = document.documentElement;
  const stored = localStorage.getItem("nsr-theme");
  if (stored) root.dataset.theme = stored;
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.dataset.theme = "dark";
  $("#themeToggle").addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("nsr-theme", root.dataset.theme);
    renderCharts(); // re-render for theme-correct colors
  });

  // ---- Tabs ----
  document.querySelectorAll("nav.tabs button").forEach(b => {
    b.addEventListener("click", () => {
      document.querySelectorAll("nav.tabs button").forEach(x => x.classList.remove("active"));
      document.querySelectorAll("section.panel").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      $("#" + b.dataset.panel).classList.add("active");
      window.scrollTo({ top: 0 });
    });
  });

  // ---- KPI row ----
  $("#kpis").innerHTML = D.kpis.map(k =>
    `<div class="kpi"><div class="v">${k.value}</div><div class="l">${k.label}</div><div class="s">${k.sub}</div><div class="src">${k.source}</div></div>`
  ).join("");

  // ---- Static tables & cards (theme-independent) ----
  renderRevisionTable();
  renderTsmcTable();
  renderNvdaCpuTable();
  renderPnlTable();
  renderEconomicsTable();
  renderAzureTable();
  renderVendors();
  renderTech();
  renderInsights();
  renderReports();
  setupExplorer();

  function renderCharts() {
    const c = C();
    const S = D.series;

    // Overview: capex growth history + AI vs non-AI
    columnChart("#chart-capex-growth", {
      years: S.capexGrowthHistory.years,
      series: [{ name: "Top-8 hyperscale capex growth (% YoY)", values: S.capexGrowthHistory.growth, color: c.AI }],
      unit: "%", height: 260, label: "Hyperscale capex growth by year"
    });
    columnChart("#chart-ai-nonai", {
      years: S.hyperscalerCapex.years,
      series: [
        { name: "AI capex", values: S.hyperscalerCapex.aiVsNonAi["AI"], color: c.AI },
        { name: "Non-AI capex", values: S.hyperscalerCapex.aiVsNonAi["Non-AI"], color: c.NonAI }
      ],
      unit: "$bn", stacked: true, height: 260, label: "AI vs non-AI capex"
    });

    // Capex by company
    columnChart("#chart-capex-company", {
      years: S.hyperscalerCapex.years,
      series: S.hyperscalerCapex.companies.map(x => ({ name: x.name, values: x.values, color: c[x.name] })),
      unit: "$bn", stacked: true, height: 320, label: "Hyperscaler DC capex by company"
    });

    // Buildout: who spends / model / who consumes
    const groups = ["Hyperscalers, Internet & Frontier", "Tier 2 Cloud", "Enterprise"];
    const gc = { "Hyperscalers, Internet & Frontier": c.AI, "Tier 2 Cloud": v("--s2"), "Enterprise": v("--s5") };
    compositionBars("#chart-buildout", {
      unit: "$bn",
      bars: [
        {
          title: "Who spends? (by builder group)",
          items: groups.map(g => ({
            name: g,
            value: S.buildout2026.whoSpends.filter(x => x.group === g).reduce((a, b) => a + b.value, 0),
            color: gc[g],
            detail: S.buildout2026.whoSpends.filter(x => x.group === g).map(x => `${x.name} $${x.value}bn`).join(" · ")
          }))
        },
        {
          title: "What model?",
          items: S.buildout2026.model.map((x, i) => ({ name: x.name, value: x.value, color: [c.AI, v("--s2"), v("--s5")][i] }))
        },
        {
          title: "Who consumes?",
          items: S.buildout2026.whoConsumes.map((x, i) => ({ name: x.name, value: x.value, color: [c.AI, v("--s3"), v("--s5")][i] }))
        }
      ]
    });
    compositionBars("#chart-financing", {
      unit: "$bn",
      bars: [{
        title: "How the $1.2tn is financed",
        items: S.financing2026.items.map((x, i) => ({ name: x.name, value: x.value, color: [v("--s2"), v("--s3"), v("--s6")][i] }))
      }]
    });
    compositionBars("#chart-spenders", {
      unit: "$bn",
      bars: [{
        title: "Top builders, 2026 DC spending",
        items: S.buildout2026.whoSpends.filter(x => !x.name.startsWith("Others")).map(x => ({
          name: x.name, value: x.value, color: c[x.name] || v("--s4"), detail: x.group
        })).concat([{ name: "All others", value: 316, color: v("--muted"), detail: "Others across the three groups" }])
      }]
    });

    // XPU market by vendor
    columnChart("#chart-xpu-vendors", {
      years: S.xpuMarket.years,
      series: [
        { name: "Nvidia GPUs", values: S.xpuMarket.vendors[0].values, color: c.Nvidia },
        { name: "AMD & other GPUs", values: S.xpuMarket.vendors[1].values, color: c.AMD },
        { name: "Broadcom ASICs", values: S.xpuMarket.vendors[2].values, color: c.Broadcom },
        { name: "Other ASICs", values: S.xpuMarket.vendors[3].values, color: v("--s3") }
      ],
      unit: "$bn", stacked: true, height: 320, floors: [false, false, true],
      label: "XPU revenues by vendor"
    });

    // XPU TAM vs consensus
    lineChart("#chart-xpu-tam", {
      years: S.xpuTam.years,
      series: [
        { name: "NSR (TSMC-implied)", values: S.xpuTam.nsr, color: c.NSR },
        { name: "Consensus", values: S.xpuTam.consensus, color: c.Consensus, dashed: true }
      ],
      unit: "$bn", height: 300, label: "XPU TAM: NSR vs consensus"
    });

    // XPU long term
    lineChart("#chart-xpu-longterm", {
      years: S.xpuLongTerm.years,
      series: [{ name: "XPU spend ($bn)", values: S.xpuLongTerm.spend, color: c.AI }],
      unit: "$bn", height: 260, label: "XPU spend 2015-2030"
    });

    // CPU revenue by vendor
    columnChart("#chart-cpu-rev", {
      years: S.serverCpuRevenue.years,
      series: S.serverCpuRevenue.vendors.map(x => ({ name: x.name, values: x.values, color: c[x.name] })),
      unit: "$bn", stacked: true, height: 300, label: "Server CPU revenues by vendor"
    });

    // AI CPU share
    lineChart("#chart-ai-cpu-share", {
      years: S.aiCpuShare.years,
      series: S.aiCpuShare.vendors.map(x => ({ name: x.name, values: x.values, color: c[x.name] })),
      unit: "%", height: 300, yMin: 0, label: "AI server CPU share"
    });

    // CPU units
    columnChart("#chart-cpu-units", {
      years: S.cpuUnits.years,
      series: [
        { name: "Traditional server CPUs (m)", values: S.cpuUnits.traditional, color: v("--baseline") },
        { name: "AI server CPUs (m)", values: S.cpuUnits.ai, color: c.AI }
      ],
      unit: "m", stacked: true, height: 280, label: "Server CPU shipments"
    });

    // CPU TAM comparison
    columnChart("#chart-cpu-tam", {
      years: S.cpuTam2030.rows.map(r => r.name.replace("2030 ", "").replace("2026 market (NSR)", "2026 (NSR)")),
      series: [{ name: "Server CPU TAM ($bn)", values: S.cpuTam2030.rows.map(r => r.value), color: c.Arm }],
      unit: "$bn", height: 280, label: "CPU TAM estimates"
    });

    // AMD model
    columnChart("#chart-amd", {
      years: S.amdModel.years,
      series: S.amdModel.segments.map((x, i) => ({
        name: x.name, values: x.values.map(y => y == null ? 0 : y),
        color: [c.Nvidia, v("--s1"), v("--s3"), v("--muted")][i]
      })),
      unit: "$bn", stacked: true, height: 320, label: "AMD revenue model by segment"
    });

    // Oracle contract FCF
    signedBarChart("#chart-oracle", {
      years: S.oracleContract.years,
      values: S.oracleContract.fcf,
      unit: "$bn", height: 280, tipLabel: "Free cash flow",
      extra: S.oracleContract.years.map((y, i) =>
        `Revenues: ${S.oracleContract.revenues[i] ? "$" + S.oracleContract.revenues[i] + "bn" : "–"} · GM: ${S.oracleContract.grossMargin[i] != null ? S.oracleContract.grossMargin[i] + "%" : "–"}`),
      label: "Oracle-OpenAI 4.5GW contract FCF"
    });

    // Cloud payback
    compositionBars("#chart-payback", {
      unit: "$bn",
      bars: [{
        title: "Who pays the $190bn incremental 2027 cloud revenues",
        items: S.cloudPayback.items.map((x, i) => ({
          name: x.name, value: x.value,
          color: [v("--s1"), v("--s5"), v("--s2"), v("--s8"), v("--s3"), v("--muted")][i],
          detail: x.detail
        }))
      }]
    });

    // Replatforming heatmap
    heatmap("#chart-replat", {
      cols: S.replatforming.metrics.map(m => m.replace("Operating income", "Op. income")),
      rows: S.replatforming.companies.map(co => ({
        label: co.name, values: co.values,
        tips: co.values.map(() => co.verdict)
      })),
      max: 70, format: x => x + "%"
    });

    // Supply constraints heatmap
    heatmap("#chart-supply", {
      cols: S.supplyConstraints.years,
      rows: S.supplyConstraints.rows.map(r => ({
        label: r.layer, values: r.values,
        tips: r.values.map(() => `${r.evidence}<br><i>${r.source}</i>`)
      })),
      max: 2, format: x => ["Balanced", "Constrained", "Severe / sold out"][x]
    });
  }

  function renderRevisionTable() {
    const r = D.series.capexRevisions;
    $("#table-revisions").innerHTML = `<div class="table-scroll"><table class="data">
      <thead><tr><th>2026 estimate</th><th class="num">Feb-2026 tracker</th><th class="num">Apr-2026 tracker</th><th class="num">Change</th><th>Unit</th></tr></thead>
      <tbody>${r.rows.map(x => {
        const d = x.apr - x.feb;
        const cls = d > 0 ? "style='color:var(--good);font-weight:600'" : "";
        return `<tr><td>${x.metric}</td><td class="num">${x.feb}</td><td class="num">${x.apr}</td><td class="num" ${cls}>${d > 0 ? "+" + d : d === 0 ? "–" : d}</td><td>${x.unit}</td></tr>`;
      }).join("")}</tbody></table></div>`;
  }

  function renderTsmcTable() {
    const t = D.series.tsmc;
    $("#table-tsmc").innerHTML = `<div class="table-scroll"><table class="data">
      <thead><tr><th>Metric</th><th class="num">Capex window 2023-25</th><th class="num">Capex window 2026-27</th></tr></thead>
      <tbody>${t.rows.map(x => `<tr><td>${x.metric}</td><td class="num">${x.c2023_25}</td><td class="num">${x.c2026_27}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderNvdaCpuTable() {
    const t = D.series.nvdaCpu2026;
    $("#table-nvda-cpu").innerHTML = `<div class="table-scroll"><table class="data">
      <thead><tr><th>Metric</th><th class="num">2026</th><th>Comment</th></tr></thead>
      <tbody>${t.rows.map(x => `<tr><td>${x.metric}</td><td class="num"><b>${x.value}</b></td><td style="color:var(--ink-2)">${x.comment}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderPnlTable() {
    const t = D.series.hyperscalerPnl;
    $("#table-pnl").innerHTML = `<div class="table-scroll"><table class="data">
      <thead><tr><th>US$bn</th><th class="num">2026</th><th class="num">2030</th><th class="num">CAGR</th></tr></thead>
      <tbody>${t.rows.map(x => `<tr><td>${x.metric}</td><td class="num">${x.y2026.toLocaleString()}</td><td class="num">${x.y2030.toLocaleString()}</td><td class="num"><b>${x.cagr}</b></td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderEconomicsTable() {
    const t = D.series.cloudEconomics;
    $("#table-econ").innerHTML = `<div class="table-scroll"><table class="data">
      <thead><tr><th>Metric</th><th>Traditional (2-CPU x86)</th><th>AI (8-GPU Blackwell)</th></tr></thead>
      <tbody>${t.rows.map(x => `<tr><td>${x.metric}</td><td>${x.cpu}</td><td>${x.gpu}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderAzureTable() {
    const t = D.series.azureAiMargins;
    $("#table-azure").innerHTML = `<div class="table-scroll"><table class="data">
      <thead><tr><th>Segment</th><th class="num">Gross margin</th><th>Detail</th></tr></thead>
      <tbody>${t.rows.map(x => `<tr><td>${x.segment}</td><td class="num"><b>${x.gm}</b></td><td style="color:var(--ink-2)">${x.detail}</td></tr>`).join("")}</tbody></table></div>`;
  }

  function renderVendors() {
    $("#vendor-cards").innerHTML = D.series.vendors.map(x => {
      const pill = x.rating.startsWith("Buy") ? "buy" : x.rating.startsWith("Neutral") ? "neutral" : "info";
      return `<div class="vendor-card">
        <div class="head"><h3>${x.name}</h3><span class="ticker">${x.ticker}</span>
          <span class="pill ${pill}">${x.rating}${x.tp !== "-" ? " · TP " + x.tp : ""}</span></div>
        <div class="seg">${x.segment}</div>
        <p><b>Positioning:</b> ${x.positioning}</p>
        <p><b>Risks:</b> ${x.risks}</p>
        <div class="source">Source: ${x.source}</div>
      </div>`;
    }).join("");
  }

  function renderTech() {
    $("#tech-cards").innerHTML = D.series.techTransitions.map(x => {
      const pill = /sold out|Severe/i.test(x.status) ? "warn" : /Inflect|Accelerat|Ramping|Recovery/i.test(x.status) ? "buy" : "info";
      return `<div class="tech-card">
        <div class="head"><h3>${x.name}</h3><span class="pill ${pill}">${x.status}</span></div>
        <p>${x.detail}</p>
        <p><b>Why it matters:</b> ${x.implication}</p>
        <div class="source">Source: ${x.source}</div>
      </div>`;
    }).join("");
  }

  function renderInsights() {
    $("#insight-list").innerHTML = D.series.insights.map((x, i) =>
      `<div class="insight"><h4>${i + 1}. ${x.title}</h4><p>${x.text}</p><div class="src">Sources: ${x.sources}</div></div>`
    ).join("");
  }

  function renderReports() {
    $("#report-list").innerHTML = `<div class="table-scroll"><table class="data">
      <thead><tr><th>ID</th><th>Date</th><th>Report</th><th>Theme</th><th>File</th></tr></thead>
      <tbody>${D.reports.map(r =>
        `<tr><td><b>${r.id}</b></td><td style="white-space:nowrap">${r.date}</td><td>${r.title}</td><td>${r.theme}</td><td style="color:var(--muted);font-size:11px">${r.file}</td></tr>`
      ).join("")}</tbody></table></div>`;
  }

  // ---- Data explorer ----
  function setupExplorer() {
    const dp = D.datapoints;
    const uniq = k => [...new Set(dp.map(x => x[k]))].sort();
    const selects = {
      segment: $("#f-segment"), company: $("#f-company"), year: $("#f-year"), report: $("#f-report")
    };
    const fill = (sel, vals, label) => {
      sel.innerHTML = `<option value="">All ${label}</option>` + vals.map(x => `<option>${x}</option>`).join("");
    };
    fill(selects.segment, uniq("segment"), "segments");
    fill(selects.company, uniq("company"), "companies");
    fill(selects.year, uniq("year"), "years");
    fill(selects.report, uniq("report"), "reports");

    const render = () => {
      const q = $("#f-search").value.toLowerCase();
      const rows = dp.filter(x =>
        (!selects.segment.value || x.segment === selects.segment.value) &&
        (!selects.company.value || x.company === selects.company.value) &&
        (!selects.year.value || String(x.year) === selects.year.value) &&
        (!selects.report.value || x.report === selects.report.value) &&
        (!q || JSON.stringify(x).toLowerCase().includes(q))
      );
      $("#f-count").textContent = rows.length + " of " + dp.length + " data points";
      $("#explorer-table").innerHTML = `<div class="table-scroll"><table class="data">
        <thead><tr><th>Metric</th><th>Segment</th><th>Company</th><th class="num">Year</th><th class="num">Value</th><th>Unit</th><th>Type</th><th>Source</th><th>Note</th></tr></thead>
        <tbody>${rows.map(x =>
          `<tr><td>${x.metric}</td><td>${x.segment}</td><td>${x.company}</td><td class="num">${x.year}</td><td class="num"><b>${x.value.toLocaleString()}</b></td><td>${x.unit}</td><td><span class="pill ${x.kind === "actual" ? "buy" : x.kind === "guide" ? "info" : "neutral"}">${x.kind}</span></td><td style="white-space:nowrap">${x.report} p.${x.page}</td><td style="color:var(--ink-2);font-size:12px">${x.note || ""}</td></tr>`
        ).join("")}</tbody></table></div>`;
    };
    Object.values(selects).forEach(s => s.addEventListener("change", render));
    $("#f-search").addEventListener("input", render);
    render();
  }

  renderCharts();
  window.addEventListener("resize", (() => {
    let t; return () => { clearTimeout(t); t = setTimeout(renderCharts, 200); };
  })());
})();
