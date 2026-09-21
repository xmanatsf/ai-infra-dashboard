/* Section rendering, filters and theme for the AI infrastructure dashboard.
   All content comes from window.NSR, generated from data/nsr_data.json. */
(function () {
  "use strict";

  var D = window.NSR, S = D.series, C = window.Chart;
  var money = C.money, pct = C.pct, fmt = C.fmt, esc = C.esc, table = C.table;

  /* Series colours are handed out in this fixed order and never recycled. */
  var SLOT = ["var(--s1)", "var(--s2)", "var(--s3)", "var(--s4)", "var(--s5)", "var(--s6)"];
  var RAMP = ["var(--o1)", "var(--o2)", "var(--o3)"];
  var POS = "var(--pos)", NEG = "var(--neg)";
  function slot(i) { return SLOT[i % SLOT.length]; }

  function q(sel, root) { return (root || document).querySelector(sel); }
  function qa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function money1(v) { return (v < 0 ? "−" : "") + "$" + Math.abs(v).toFixed(1) + "tn"; }
  /* keeps $4.15tn at full precision while still printing $3.0tn, not $3tn */
  function moneyT(v) {
    var dp = Math.abs(v * 10 % 1) > 1e-9 ? 2 : 1;
    return (v < 0 ? "−" : "") + "$" + Math.abs(v).toFixed(dp) + "tn";
  }
  function grey(s) { return '<span class="muted">' + s + "</span>"; }

  /* ---------- dates & citations ---------- */
  var MONTH = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function shortDate(iso) {
    var p = String(iso).split("-");
    return parseInt(p[2], 10) + " " + MONTH[parseInt(p[1], 10) - 1] + " " + p[0];
  }
  var REPORT_BY_ID = {};
  D.reports.forEach(function (r) { REPORT_BY_ID[r.id] = r; });

  /* Renders "Source: Title (ID p.N), date" from a citation string such as
     "ROIC p.5, p.10, CPU p.2". A fragment that is only a page reference
     belongs to the report named before it, which is how the source notes are
     cited throughout. An id with no registry entry is surfaced, not hidden. */
  function citeText(ids) {
    var groups = [], current = null;
    String(ids || "").split(",").forEach(function (raw) {
      var part = raw.trim();
      if (!part) return;
      var pageOnly = part.match(/^p\.(.+)$/);
      if (pageOnly && current) { current.pages.push(part); return; }
      var m = part.match(/^(\S+)\s+(p\..+)$/);
      current = { id: m ? m[1] : part, pages: m ? [m[2]] : [] };
      groups.push(current);
    });
    return groups.map(function (g) {
      var pages = g.pages.length ? " " + g.pages.join(", ") : "";
      var r = REPORT_BY_ID[g.id];
      return r ? r.title + " (" + g.id + pages + "), " + shortDate(r.date) : g.id + pages + " [unmatched]";
    }).join("; ");
  }
  function fillCites() {
    qa("[data-cite]").forEach(function (n) {
      var k = n.getAttribute("data-cite"), s = S[k];
      if (!s) return;
      n.innerHTML = (s.note ? esc(s.note) + " " : "") + "Source: " + esc(citeText(s.source)) + ".";
    });
    qa("[data-cite-inline]").forEach(function (n) {
      var s = S[n.getAttribute("data-cite-inline")];
      if (s) n.innerHTML = "Source: " + esc(citeText(s.source)) + ".";
    });
    qa("[data-say]").forEach(function (n) {
      var s = S[n.getAttribute("data-say")];
      if (s && s.commentary) n.textContent = s.commentary;
    });
  }

  /* ---------- masthead, ledes, conventions ---------- */
  function renderChrome() {
    q("#mast-dek").textContent = "Scale, financing, unit economics, compute, supply and company positioning — synthesised from " +
      D.reports.length + " New Street Research notes published between " +
      shortDate(D.reports[0].date) + " and " + shortDate(D.reports[D.reports.length - 1].date) + ".";
    q("#mast-vintage").textContent = shortDate(D.meta.vintage);
    q("#mast-quarter").textContent = D.meta.quarter;
    q("#mast-currency").textContent = D.meta.currency;

    qa("[data-lede]").forEach(function (n) {
      var v = D.narrative[n.getAttribute("data-lede")];
      if (!v) return;
      n.innerHTML =
        '<div><div class="kicker">' + esc(v.kicker) + "</div><h2>" + esc(v.headline) + "</h2>" +
        v.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
        '<div class="lede-side">' + v.side.map(function (p) {
          return "<p><b>" + esc(p.lead) + "</b> " + esc(p.text) + "</p>";
        }).join("") + "</div>";
    });

    qa("[data-convention]").forEach(function (n) {
      n.textContent = D.meta.conventions[+n.getAttribute("data-convention")];
    });

    q("#footer-reports").innerHTML = D.reports.map(function (r) {
      return "<li>" + esc(r.title) + " — " + shortDate(r.date) + ' <span class="rid">' + esc(r.id) + "</span></li>";
    }).join("");
    q("#footer-method").textContent = D.meta.conventions[1];
    q("#footer-disclaimer").textContent = D.meta.disclaimer;
  }

  /* ---------- stat tiles ---------- */
  function tiles(node, rows) {
    q(node).innerHTML = rows.map(function (t) {
      return '<div class="tile' + (t.accent ? " accent" : "") + '">' +
        '<div class="lab">' + esc(t.label) + "</div>" +
        '<div class="val">' + esc(t.value) + "</div>" +
        '<div class="sub">' + esc(t.sub) + "</div>" +
        (t.source ? '<div class="cite">' + esc(t.source) + "</div>" : "") + "</div>";
    }).join("");
  }

  /* =======================================================================
     CHARTS
     ======================================================================= */
  var CH = {};
  var cap = S.capexByComponent, mem = S.memoryValue, PL = S.hyperscalerModel.rows;
  var YR = cap.years;

  CH.forecastLadder = function () {
    var L = S.forecastLadder;
    return C.barH({
      rows: L.rows.map(function (r, i) { return { name: r.name, sub: r.sub, v: r.value, color: RAMP[i] }; }),
      w: 430, rowH: 46, pad: { t: 10, r: 62, b: 26, l: 150 },
      lFmt: moneyT, tFmt: moneyT, xFmt: function (v) { return "$" + v + "tn"; },
      vLabel: "2030 forecast"
    });
  };

  CH.capexStack = function () {
    return C.colStack({
      x: YR,
      series: cap.components.map(function (c, i) { return { name: c.name, color: slot(i), v: c.values }; }),
      w: 660, h: 340, pctOf: true,
      tFmt: function (v) { return "$" + (v / 1000).toFixed(2) + "tn"; }
    });
  };

  CH.shareShift = function () {
    var last = YR.length - 1;
    return C.dumbbell({
      rows: cap.components.map(function (c, i) {
        return { name: c.name, color: slot(i),
                 a: c.values[0] / cap.total[0] * 100, b: c.values[last] / cap.total[last] * 100 };
      }),
      xMax: 50, w: 560, aLab: "2025 share", bLab: "2030 share"
    });
  };

  CH.memStack = function () {
    return C.colStack({
      x: YR, w: 560, h: 320, pctOf: true,
      series: mem.lines.map(function (m, i) { return { name: m.name, color: slot(i), v: m.values }; })
    });
  };

  CH.hbmShare = function () {
    return C.lineChart({
      x: YR, w: 640, h: 270,
      series: [{ name: "HBM as % of XPU spending", color: slot(0), v: mem.hbmShareOfXpu }],
      yMin: 0, yMax: 40, yFmt: function (v) { return v + "%"; },
      lFmt: function (v) { return v + "%"; }, tFmt: function (v) { return v + "%"; },
      annots: [{ i: 0, y: 16, text: "16% in 2025", dy: -26, dx: 26, anchor: "start" }]
    });
  };

  CH.xpuLongArc = function () {
    var yrs = ["2015", "2020", "2025", "2030"];
    var xpu = cap.components[0];
    return C.colSingle({
      x: yrs, v: [0, 7, xpu.values[0], xpu.values[YR.length - 1]],
      color: slot(0), w: 760, h: 260, barW: 70, labelAll: true,
      name: "XPU spending", lFmt: money, tFmt: money
    });
  };

  CH.usesSources = function () {
    var U = S.usesSources, total = 16.4;
    return C.stackBarH({
      w: 900, total: total, vFmt: money1,
      rows: [
        { label: "USES — WHO BUILDS", note: "$16.5tn of capex",
          segs: U.uses.map(function (u, i) { return { name: u.name, v: u.value, short: u.short, color: RAMP[1] === undefined ? slot(i) : ["var(--o3)", "var(--o2)", "var(--o1)"][i] }; }) },
        { label: "SOURCES — WHERE THE MONEY COMES FROM", note: "the identical total",
          segs: U.sources.map(function (u, i) { return { name: u.name, v: u.value, short: u.short, color: slot(i) }; }),
          brackets: [U.bracket] }
      ]
    });
  };

  CH.fcfPath = function () {
    return C.lineChart({
      x: YR, w: 660, h: 320,
      series: [
        { name: "Operating cash flow", color: slot(0), v: PL.ocf },
        { name: "Capex", color: slot(1), v: PL.capex },
        { name: "Free cash flow", color: slot(2), v: PL.fcf }
      ],
      yFmt: money, lFmt: money, tFmt: money,
      annots: [{ i: 3, y: -486, text: "Trough −$486bn", dy: -34, dx: 6 }]
    });
  };

  CH.cloudSplit = function () {
    return C.colStack({
      x: YR, w: 520, h: 300, pctOf: true,
      series: [
        { name: "AI cloud", color: slot(0), v: PL.cloudAI },
        { name: "Non-AI cloud", color: slot(1), v: PL.cloudNonAI }
      ]
    });
  };

  CH.nsrVsCons = function () {
    var V = S.nsrVsConsensus;
    return C.colGroup({
      x: V.years, w: 660, h: 320,
      series: [
        { name: "House capex", color: slot(0), v: V.capexNsr },
        { name: "Consensus capex", color: slot(1), v: V.capexConsensus }
      ],
      yFmt: money, lFmt: money, tFmt: money
    });
  };

  CH.modelMargins = function () {
    var M = S.modelMargins;
    return C.colGroup({
      x: M.x, sub: M.sub, w: 540, h: 300, barW: 40,
      series: M.series.map(function (s, i) { return { name: s.name, color: slot(i), v: s.values }; }),
      yFmt: function (v) { return v + "%"; }, lFmt: function (v) { return v ? v + "%" : "n.d."; },
      tFmt: function (v) { return v + "%"; }
    });
  };

  CH.hundred = function () {
    var H = S.revenueHundred;
    return C.stackBarH({
      w: 620, total: 100, barH: 34, below: 46,
      vFmt: function (v) { return "$" + v; },
      rows: [{ label: "$100 OF REVENUE", segs: H.segments.map(function (g, i) {
        return { name: g.name, v: g.value, short: g.short, color: slot(i) }; }),
        brackets: [H.bracket] }]
    });
  };

  CH.capIntensity = function () {
    var K = S.capitalIntensity;
    var ci = K.growth.map(function (g) { return K.slope * g; });
    var fc = K.growth.map(function (g) { return K.ebitdaMargin - K.slope * g; });
    /* index of the crossover on the growth axis, for the reference rule */
    var ix = 0;
    for (var i = 0; i < K.growth.length - 1; i++) {
      if (K.growth[i] <= K.crossoverGrowth && K.growth[i + 1] >= K.crossoverGrowth) {
        ix = i + (K.crossoverGrowth - K.growth[i]) / (K.growth[i + 1] - K.growth[i]);
      }
    }
    return C.lineChart({
      x: K.growth.map(function (g) { return g + "%"; }),
      xLab: K.growth.map(function (g, i) { return i % 2 === 0 ? g + "%" : ""; }),
      w: 660, h: 320, dots: false, labelLast: false,
      series: [
        { name: "Capital intensity", color: slot(1), v: ci },
        { name: "Free cash flow margin", color: slot(0), v: fc }
      ],
      yFmt: function (v) { return v + "%"; }, tFmt: function (v) { return Math.round(v) + "%"; },
      vrules: [{ ix: ix, text: "Free cash flow turns negative at ~38% growth", dx: 8 }]
    });
  };

  CH.replatGap = function () {
    return C.barH({
      rows: S.replatforming2Q26.companies.map(function (r) {
        return { name: r.name, sub: "rev +" + r.revenue + "% · costs +" + r.cashCost + "%",
                 v: r.revenue - r.cashCost, color: (r.revenue - r.cashCost) >= 0 ? POS : NEG };
      }),
      w: 460, rowH: 44, pad: { t: 10, r: 60, b: 26, l: 120 },
      lFmt: function (v) { return (v >= 0 ? "+" : "−") + Math.abs(v) + "pts"; },
      tFmt: function (v) { return (v >= 0 ? "+" : "−") + Math.abs(v) + "pts"; },
      xFmt: function (v) { return v + "pts"; }, vLabel: "Revenue less cash costs"
    });
  };

  CH.cloudGrowth = function () {
    return C.barH({
      rows: S.cloudGrowth2Q26.rows.map(function (r) {
        return { name: r.name, sub: "+" + r.qoqPoints + "pts faster QoQ", v: r.growth, color: slot(0) };
      }),
      w: 460, rowH: 44, pad: { t: 10, r: 60, b: 26, l: 140 },
      lFmt: function (v) { return "+" + v + "%"; }, tFmt: function (v) { return "+" + v + "%"; },
      xFmt: function (v) { return v + "%"; }, vLabel: "2Q26 growth"
    });
  };

  CH.beatMiss = function () {
    return C.barH({
      rows: S.beatMiss2Q26.rows.map(function (r) {
        return { name: r.name, sub: r.sub, v: r.value, color: r.value >= 0 ? POS : NEG };
      }),
      w: 460, rowH: 44, pad: { t: 10, r: 60, b: 26, l: 140 },
      lFmt: function (v) { return (v >= 0 ? "+" : "−") + Math.abs(v) + "%"; },
      tFmt: function (v) { return (v >= 0 ? "+" : "−") + Math.abs(v) + "%"; },
      xFmt: function (v) { return v + "%"; }, vLabel: "vs consensus"
    });
  };

  CH.revisions = function () {
    var R = S.streetRevisions;
    return C.colGroup({
      x: R.x, sub: R.sub, w: 780, h: 290, barW: 46,
      series: R.series.map(function (s, i) { return { name: s.name, color: slot(i), v: s.values }; }),
      yFmt: function (v) { return v + "%"; }, lFmt: function (v) { return "+" + v + "%"; },
      tFmt: function (v) { return "+" + v + "%"; }
    });
  };

  CH.amdGpu = function () {
    var A = S.amdGpuShare;
    return C.colSingle({
      x: A.quarters, v: A.revenue, color: slot(0), est: A.quarters.length - 1,
      w: 660, h: 280, name: "DC GPU revenue", labelIx: [0, 4, 6, 10, 11],
      lFmt: function (v) { return "$" + v.toFixed(1) + "bn"; },
      tFmt: function (v) { return "$" + v.toFixed(1) + "bn"; },
      yFmt: function (v) { return "$" + v + "bn"; },
      extra: function (i) { return C.tipRow("", "Share of DC GPUs", A.share[i] + "%"); }
    });
  };

  /* ---- compute tab: the January–June series ---- */
  CH.xpuMarket = function () {
    var X = S.xpuMarket;
    return C.colStack({
      x: X.years.map(String), w: 620, h: 300, pctOf: true,
      series: X.vendors.map(function (v, i) { return { name: v.name, color: slot(i), v: v.values }; })
    });
  };

  CH.xpuTam = function () {
    var T = S.xpuTam;
    return C.lineChart({
      x: T.years.map(String), w: 520, h: 290,
      series: [
        { name: "House (foundry-implied)", color: slot(0), v: T.nsr },
        { name: "Consensus", color: slot(1), v: T.consensus, dash: true }
      ],
      yFmt: money, lFmt: money, tFmt: money
    });
  };

  CH.cpuRevenue = function () {
    var K = S.serverCpuRevenue;
    return C.colStack({
      x: K.years.map(String), w: 620, h: 300, pctOf: true,
      series: K.vendors.map(function (v, i) { return { name: v.name, color: slot(i), v: v.values }; })
    });
  };

  CH.aiCpuShare = function () {
    var K = S.aiCpuShare;
    return C.lineChart({
      x: K.years.map(String), w: 660, h: 290,
      xLab: K.years.map(function (y, i) { return i % 2 === 0 ? String(y) : ""; }),
      series: K.vendors.map(function (v, i) { return { name: v.name, color: slot(i), v: v.values }; }),
      yMin: 0, yMax: 100, yFmt: function (v) { return v + "%"; },
      lFmt: function (v) { return v + "%"; }, tFmt: function (v) { return v + "%"; }
    });
  };

  CH.amdModel = function () {
    var A = S.amdModel;
    return C.colStack({
      x: A.years.map(String), w: 860, h: 320, pctOf: true,
      series: A.segments.map(function (s, i) {
        return { name: s.name, color: slot(i), v: s.values.map(function (v) { return v || 0; }) };
      }),
      vFmt: function (v) { return "$" + v.toFixed(1) + "bn"; },
      tFmt: function (v) { return "$" + v.toFixed(0) + "bn"; }
    });
  };

  /* =======================================================================
     TABLES
     ======================================================================= */
  var TB = {};

  TB.capex = function () {
    return table({
      head: ["Component"].concat(YR).concat(["CAGR"]),
      rows: cap.components.map(function (c) {
        return { cells: [c.name].concat(c.values.map(function (v) { return money(v); })).concat([c.cagr]) };
      }).concat([{ cls: "total", em: true,
        cells: ["Total AI capex"].concat(cap.total.map(function (v) { return money(v); })).concat([cap.totalCagr]) }])
    });
  };

  TB.capexFull = function () {
    var rows = [];
    cap.components.forEach(function (c) {
      rows.push({ em: true, cells: [c.name].concat(c.values.map(function (v) { return money(v); })).concat([c.cagr, c.comment]) });
      rows.push({ cells: [grey("— share of AI capex")]
        .concat(c.values.map(function (v, i) { return grey(Math.round(v / cap.total[i] * 100) + "%"); }))
        .concat(["", ""]) });
    });
    rows.push({ cls: "total", em: true, cells: ["Total AI capex"].concat(cap.total.map(function (v) { return money(v); })).concat([cap.totalCagr, ""]) });
    rows.push({ cls: "total", cells: [grey("— year-on-year growth")]
      .concat(cap.yoy.map(function (v) { return grey(v || "—"); })).concat(["", ""]) });
    return table({ head: ["Component"].concat(YR).concat(["CAGR", "Comment"]), prose: [YR.length + 2], rows: rows });
  };

  TB.mem = function () {
    var rows = [];
    mem.lines.forEach(function (m) {
      rows.push({ em: true, cells: [m.name + " — value"].concat(m.values.map(function (v) { return money(v); })) });
      rows.push({ cells: [grey(m.name + " — gross margin")]
        .concat(m.grossMargin.map(function (v) { return grey(v + "%"); })) });
    });
    rows.push({ cls: "total", em: true, cells: ["Total memory"].concat(YR.map(function (_, i) {
      return money(mem.lines.reduce(function (a, m) { return a + m.values[i]; }, 0)); })) });
    rows.push({ cells: ["Total server content"].concat(mem.serverContent.map(function (v) { return money(v); })) });
    rows.push({ cells: ["Memory as % of server content"].concat(YR.map(function (_, i) {
      return Math.round(mem.lines.reduce(function (a, m) { return a + m.values[i]; }, 0) / mem.serverContent[i] * 100) + "%"; })) });
    return table({ head: ["US$bn"].concat(YR), rows: rows });
  };

  TB.capacity = function () {
    return table({ head: ["Reference metric", "Value"],
      rows: S.capacityFrame.rows.map(function (r) { return { em: !!r.emphasis, cells: [r.metric, r.value] }; }) });
  };

  TB.uses = function () {
    var U = S.usesSources, rows = [];
    U.uses.forEach(function (u) { rows.push({ cells: ["Uses — " + u.name, money1(u.value), pct(u.value / 16.4 * 100, 0)] }); });
    rows.push({ cls: "total", em: true, cells: ["Total uses", "$16.5tn", "100%"] });
    U.sources.forEach(function (u) { rows.push({ cells: ["Sources — " + u.name, money1(u.value), pct(u.value / 16.4 * 100, 0)] }); });
    rows.push({ cls: "total", em: true, cells: ["Total sources", "$16.5tn", "100%"] });
    return table({ head: ["Cumulative 2026–2030", "Amount", "Share"], rows: rows });
  };

  TB.fcf = function () {
    var cum = S.hyperscalerModel.cumulative;
    return table({ head: ["US$bn"].concat(YR).concat(["Cum. ’26–’30"]), rows: [
      { em: true, cells: ["Operating cash flow"].concat(PL.ocf.map(function (v) { return money(v); })).concat([money(cum.ocf)]) },
      { em: true, cells: ["Capex"].concat(PL.capex.map(function (v) { return money(v); })).concat([money(cum.capex)]) },
      { cls: "total", em: true, cells: ["Free cash flow"].concat(PL.fcf.map(function (v) { return money(v); })).concat([money(cum.fcf)]) }
    ] });
  };

  TB.pl = function () {
    var M = S.hyperscalerModel, cum = M.cumulative, cm = M.comments;
    function r(label, arr, c, em, note, indent) {
      return { em: !!em, indent: !!indent,
        cells: [label].concat(arr.map(function (v) { return money(v); })).concat([c === null ? "—" : money(c), note || ""]) };
    }
    function p(label, arr, c, note) {
      return { cells: [grey(label)].concat(arr.map(function (v) { return grey(v + "%"); }))
        .concat([grey(c + "%"), note || ""]) };
    }
    return table({ head: ["US$bn"].concat(YR).concat(["Cum. ’26–’30", "Comment"]), prose: [YR.length + 2], rows: [
      r("Core revenues", PL.core, cum.core, true, cm.core),
      r("Cloud revenues", PL.cloud, cum.cloud, true, ""),
      r("— AI cloud", PL.cloudAI, cum.cloudAI, false, cm.cloudAI, true),
      r("— Non-AI cloud", PL.cloudNonAI, cum.cloudNonAI, false, cm.cloudNonAI, true),
      r("Group revenues", PL.group, cum.group, true, ""),
      r("EBITDA", PL.ebitda, cum.ebitda, true, ""),
      p("EBITDA margin", PL.ebitdaMargin, cum.ebitdaMargin, cm.ebitdaMargin),
      r("Depreciation & amortisation", PL.da.map(function (v) { return -v; }), cum.da, false, ""),
      r("EBIT", PL.ebit, cum.ebit, true, ""),
      p("EBIT margin", PL.ebitMargin, cum.ebitMargin, cm.ebitMargin),
      r("Operating cash flow", PL.ocf, cum.ocf, true, ""),
      r("Group capex", PL.capex, cum.capex, true, cm.capex),
      { cls: "total", em: true, cells: ["Free cash flow"].concat(PL.fcf.map(function (v) { return money(v); }))
        .concat([money(cum.fcf), cm.fcf]) }
    ] });
  };

  TB.vs = function () {
    var V = S.nsrVsConsensus;
    return table({ head: ["US$bn", "2026E", "2027E", "2028E"], rows: [
      { em: true, cells: ["Capex — house (30 Jul)"].concat(V.capexNsr.map(function (v) { return money(v); })) },
      { cells: ["Capex — consensus (30 Jul)"].concat(V.capexConsensus.map(function (v) { return money(v); })) },
      { cells: [grey("Capex — consensus (12 Jun)")].concat(V.capexConsensusJune.map(function (v) { return grey(money(v)); })) },
      { em: true, cells: ["Free cash flow — house"].concat(V.fcfNsr.map(function (v) { return money(v); })) },
      { cells: ["Free cash flow — consensus"].concat(V.fcfConsensus.map(function (v) { return money(v); })) },
      { cls: "total", cells: ["House capex above consensus"].concat(V.capexNsr.map(function (v, i) {
        return "+" + Math.round((v / V.capexConsensus[i] - 1) * 100) + "%"; })) }
    ] });
  };

  TB.tier2 = function () {
    return table({ head: ["Item", "US$tn"], rows: S.tier2Financing.rows.map(function (r) {
      return { em: !!r.emphasis || !!r.total, cls: r.total ? "total" : "", cells: [r.item, r.value] }; }) });
  };

  TB.perGW = function () {
    var P = S.perGigawatt;
    return table({ em: [3],
      head: ["US$bn per gigawatt"].concat(P.columns.map(function (c, i) {
        return c + '<span class="subnote">' + P.columnNotes[i] + "</span>"; })),
      rows: P.rows.map(function (r) {
        return { em: !!r.emphasis, indent: !!r.indent, cells: [r.metric].concat(r.values) };
      }) });
  };

  TB.ci = function () {
    var K = S.capitalIntensity;
    return table({ head: ["Revenue growth", "Capital intensity", "FCF margin"],
      rows: K.growth.filter(function (g, i) { return i % 2 === 0 || g === 35; }).map(function (g) {
        return [g + "%", pct(K.slope * g, 0), pct(K.ebitdaMargin - K.slope * g, 0)];
      }) });
  };

  TB.pricing = function () {
    return table({ head: ["Contract type", "Price / change", "Detail", "Reported by"], prose: [2],
      rows: S.contractPricing.rows.map(function (r) {
        return { em: true, cells: [r.type, r.price, r.detail, r.by] };
      }) });
  };

  TB.chain = function () {
    return table({ head: ["Company", "Layer", "What it indicates"], prose: [2],
      rows: S.supplyChainSignals.rows.map(function (r) {
        return { em: true, cells: [r.company, '<span class="pill">' + esc(r.layer) + "</span>", esc(r.detail)] };
      }) });
  };

  TB.replat = function () {
    /* The capex guide rides under the company name rather than as a seventh
       column — six is what the card holds without a nested scrollbar. */
    return table({ head: ["", "Revenue", "Total<br>cost", "D&amp;A", "Cash cost<br>&amp; SBC", "Operating<br>income"],
      rows: S.replatforming2Q26.companies.map(function (r) {
        return { em: true, cells: [
          esc(r.name) + ' <span class="pill ' + (r.verdict === "Healthy" ? "up" : "dn") + '">' + esc(r.verdict) + "</span>" +
            '<span class="subnote">' + esc(r.guide) + "</span>",
          "+" + r.revenue + "%", "+" + r.totalCost + "%", "+" + r.da + "%", "+" + r.cashCost + "%", "+" + r.operatingIncome + "%"
        ] };
      }) });
  };

  TB.rev = function () {
    return table({ head: ["", "2026E revision", "Implied 2026 growth", "2027E revision", "Implied 2027 growth", "2025 actual", "2024 actual"],
      rows: S.streetRevisions.table.map(function (r) {
        return { em: true, cells: [r.name, r.rev2026, r.growth2026, r.rev2027, r.growth2027, r.actual2025, r.actual2024] };
      }) });
  };

  TB.amdGpu = function () {
    var A = S.amdGpuShare;
    return table({ head: ["Quarter", "DC GPU revenue", "Share of DC GPUs"],
      rows: A.quarters.map(function (qq, i) {
        return { em: i === A.quarters.length - 1,
                 cells: [qq, "$" + A.revenue[i].toFixed(1) + "bn", A.share[i] + "%"] };
      }) });
  };

  TB.amdCpu = function () {
    return table({ head: ["Quarter", "AMD share"],
      rows: S.amdCpuShare.rows.map(function (r) { return { em: !!r.emphasis, cells: [r.q, r.share] }; }) });
  };

  TB.picks = function () {
    return table({ head: ["Company", "Rating", "Target price", "Thesis"], prose: [3],
      rows: S.coverage.rows.map(function (r) {
        return { em: true, cells: [r.company,
          '<span class="pill ' + (r.rating === "Neutral" ? "" : "up") + '">' + esc(r.rating) + "</span>",
          r.tp, esc(r.thesis)] };
      }) });
  };

  TB.ladder = function () {
    return table({ head: ["Metric", "Feb 2026", "Apr 2026", "Jun 2026", "Sep 2026 (current)", "Comment"],
      em: [4], prose: [5],
      rows: S.vintageLadder.rows.map(function (r) {
        return { em: true, cells: [r.metric, grey(r.feb), grey(r.apr), grey(r.jun), r.sep, esc(r.comment)] };
      }) });
  };

  TB.tsmc = function () {
    return table({ head: ["Metric", "2023–25", "2026–27"],
      rows: S.tsmc.rows.map(function (r) { return [r.metric, r.c2023_25, r.c2026_27]; }) });
  };

  TB.cpuTam = function () {
    /* The detail rides under the estimate name rather than as a fourth column:
       in a five-column card a prose column only earns a horizontal scrollbar. */
    return table({ head: ["Estimate", "US$bn", "Whose"],
      rows: S.cpuTam2030.rows.map(function (r) {
        return { em: true, cells: [
          esc(r.name) + '<span class="subnote">' + esc(r.detail) + "</span>",
          money(r.value), esc(r.who)] };
      }) });
  };

  TB.cloudEconomics = function () {
    return table({ head: ["Metric", "Traditional server", "AI server"],
      rows: S.cloudEconomics.rows.map(function (r) { return [r.metric, r.cpu, r.gpu]; }) });
  };

  TB.oracle = function () {
    var O = S.oracleContract;
    return table({ head: ["Year", "Revenues", "Free cash flow"],
      rows: O.years.map(function (y, i) {
        return { em: i < 3, cells: [String(y), money(O.revenues[i]), money(O.fcf[i])] };
      }) });
  };

  TB.amdModel = function () {
    var A = S.amdModel;
    var rows = A.segments.map(function (s) {
      return { em: true, cells: [s.name].concat(s.values.map(function (v) { return v === null ? "—" : "$" + v.toFixed(1) + "bn"; })) };
    });
    rows.push({ cls: "total", em: true, cells: ["Total revenue"].concat(A.totals.map(function (v) { return "$" + v.toFixed(1) + "bn"; })) });
    rows.push({ cells: [grey("EPS")].concat(A.eps.map(function (v) { return grey("$" + v.toFixed(2)); })) });
    return table({ head: ["US$bn"].concat(A.years.map(String)), rows: rows });
  };

  /* =======================================================================
     LEGENDS
     ======================================================================= */
  var LG = {
    capex:    function () { return C.legend(cap.components.map(function (c, i) { return { name: c.name, color: slot(i) }; })); },
    ladder:   function () { return C.legend([{ name: "Superseded", color: RAMP[0] }, { name: "Current", color: RAMP[2] }]); },
    shift:    function () { return C.legend([{ name: "2025 share", color: "var(--ink-3)", kind: "open" }, { name: "2030 share", color: "var(--ink-3)", kind: "fill" }]); },
    mem:      function () { return C.legend(mem.lines.map(function (m, i) { return { name: m.name, color: slot(i) }; })); },
    uses:     function () { return C.legend(S.usesSources.sources.map(function (u, i) { return { name: u.name, color: slot(i) }; })); },
    fcf:      function () { return C.legend([{ name: "Operating cash flow", color: slot(0), kind: "line" }, { name: "Capex", color: slot(1), kind: "line" }, { name: "Free cash flow", color: slot(2), kind: "line" }]); },
    cloud:    function () { return C.legend([{ name: "AI cloud", color: slot(0) }, { name: "Non-AI cloud", color: slot(1) }]); },
    vs:       function () { return C.legend([{ name: "House estimate", color: slot(0) }, { name: "Consensus", color: slot(1) }]); },
    models:   function () { return C.legend(S.modelMargins.series.map(function (s, i) { return { name: s.name, color: slot(i) }; })); },
    hundred:  function () { return C.legend(S.revenueHundred.segments.map(function (g, i) { return { name: g.name, color: slot(i) }; })); },
    ci:       function () { return C.legend([{ name: "Capital intensity", color: slot(1), kind: "line" }, { name: "Free cash flow margin", color: slot(0), kind: "line" }]); },
    gap:      function () { return C.legend([{ name: "Room to expand margins", color: POS }, { name: "Spending ahead of revenue", color: NEG }]); },
    beat:     function () { return C.legend([{ name: "Above consensus", color: POS }, { name: "Below consensus", color: NEG }]); },
    rev:      function () { return C.legend(S.streetRevisions.series.map(function (s, i) { return { name: s.name, color: slot(i) }; })); },
    amd:      function () { return C.legend([{ name: "Reported", color: slot(0) }, { name: "Estimate", color: RAMP[0] }]); },
    xpu:      function () { return C.legend(S.xpuMarket.vendors.map(function (v, i) { return { name: v.name, color: slot(i) }; })); },
    xputam:   function () { return C.legend([{ name: "House (foundry-implied)", color: slot(0), kind: "line" }, { name: "Consensus", color: slot(1), kind: "line" }]); },
    cpu:      function () { return C.legend(S.serverCpuRevenue.vendors.map(function (v, i) { return { name: v.name, color: slot(i) }; })); },
    aicpu:    function () { return C.legend(S.aiCpuShare.vendors.map(function (v, i) { return { name: v.name, color: slot(i), kind: "line" }; })); },
    amdmodel: function () { return C.legend(S.amdModel.segments.map(function (s, i) { return { name: s.name, color: slot(i) }; })); }
  };

  /* =======================================================================
     LIST-SHAPED SECTIONS
     ======================================================================= */
  function renderLists() {
    q("#five-things").innerHTML = S.fiveThings.rows.map(function (r) {
      return "<li><div><h4>" + esc(r.title) + "</h4><p>" + esc(r.text) + "</p>" +
             '<span class="cite">' + esc(citeText(r.source)) + "</span></div></li>";
    }).join("");

    q("#insight-list").innerHTML = S.insights.map(function (r) {
      return "<li><div><h4>" + esc(r.title) + "</h4><p>" + esc(r.text) + "</p>" +
             '<span class="cite">' + esc(citeText(r.sources)) + "</span></div></li>";
    }).join("");

    q("#quotes").innerHTML = S.managementQuotes.rows.map(function (r) {
      return "<blockquote><p>“" + esc(r.text) + "”</p>" +
             '<div class="attr"><b>' + esc(r.who) + "</b>, " + esc(r.role) + " — " + esc(r.date) + "</div></blockquote>";
    }).join("");

    q("#vendor-cards").innerHTML = S.vendors.map(function (v) {
      return '<div class="co">' +
        '<div class="co-top"><h4>' + esc(v.name) + '</h4><span class="tkr">' + esc(v.ticker || "") + "</span></div>" +
        '<div class="seg">' + esc(v.segment) + "</div>" +
        '<div class="rate"><span class="pill ' + ratingClass(v.rating) + '">' + esc(v.rating) + "</span>" +
          (v.tp && v.tp !== "-" ? '<span class="tp">' + esc(v.tp) + "</span>" : "") +
          '<span class="asof">' + shortDate(v.asOf) + "</span></div>" +
        '<div class="body">' + esc(v.thesis || v.positioning) + "</div>" +
        (v.prior ? '<div class="prior">Previously ' + esc(v.prior) + "</div>" : "") +
        (v.risks ? '<div class="risk"><b>Risks.</b> ' + esc(v.risks) + "</div>" : "") +
        '<div class="cite">' + esc(v.source) + "</div>" +
        "</div>";
    }).join("");

    q("#vendor-count").textContent = S.vendors.length + " companies across the stack";

    q("#tech-cards").innerHTML = S.techTransitions.map(function (t) {
      return '<div class="co">' +
        '<div class="co-top"><h4>' + esc(t.name) + '</h4><span class="pill">' + esc(t.status) + "</span></div>" +
        '<div class="body">' + esc(t.detail) + "</div>" +
        '<div class="risk"><b>Implication.</b> ' + esc(t.implication) + "</div>" +
        '<div class="cite">' + esc(t.source) + "</div>" +
        "</div>";
    }).join("");

    q("#report-list").innerHTML = table({
      head: ["ID", "Date", "Title", "Theme"], prose: [2],
      rows: D.reports.map(function (r) {
        return { em: true, cells: ['<span class="mono">' + esc(r.id) + "</span>", shortDate(r.date), esc(r.title), esc(r.theme)] };
      })
    });
  }
  function ratingClass(r) {
    if (/Top Pick|Buy/i.test(r)) return "up";
    if (/Sell|Underperform/i.test(r)) return "dn";
    return "";
  }

  /* ---------- supply constraint heatmap ---------- */
  function renderHeatmap() {
    var H = S.supplyConstraints;
    var LABEL = ["Balanced", "Constrained", "Sold out"];
    var h = '<table class="heat"><thead><tr><th>Layer</th>' +
      H.years.map(function (y) { return "<th>" + y + "</th>"; }).join("") +
      "<th>Evidence</th></tr></thead><tbody>";
    H.rows.forEach(function (r) {
      h += "<tr><td>" + esc(r.layer) + "</td>" +
        r.values.map(function (v, i) {
          var tt = '<div class="t">' + esc(r.layer) + " · " + H.years[i] + "</div>" +
                   C.tipRow("", "Severity", LABEL[v]) +
                   '<div class="r" style="margin-top:4px"><span>' + esc(r.evidence) + "</span></div>";
          return '<td><span class="cell sev' + v + '" data-tip="' + esc(tt) + '">' + LABEL[v] + "</span></td>";
        }).join("") +
        '<td class="ev">' + esc(r.evidence) + "</td></tr>";
    });
    q("#heatmap").innerHTML = h + "</tbody></table>";
  }

  /* =======================================================================
     DATA EXPLORER
     ======================================================================= */
  function setupExplorer() {
    var rows = D.datapoints;
    var fSeg = q("#f-segment"), fCo = q("#f-company"), fYr = q("#f-year"),
        fRep = q("#f-report"), fQ = q("#f-search"), out = q("#explorer-table"), cnt = q("#f-count");

    function uniq(key, sortNum) {
      var seen = {};
      rows.forEach(function (r) { if (r[key] != null && r[key] !== "") seen[r[key]] = 1; });
      var list = Object.keys(seen);
      return sortNum ? list.sort(function (a, b) { return a - b; }) : list.sort();
    }
    function fill(sel, list, label) {
      sel.innerHTML = '<option value="">' + label + "</option>" +
        list.map(function (v) { return "<option>" + esc(v) + "</option>"; }).join("");
    }
    fill(fSeg, uniq("segment"), "All segments");
    fill(fCo, uniq("company"), "All companies");
    fill(fYr, uniq("year", true), "All years");
    fill(fRep, uniq("report"), "All notes");

    function apply() {
      var seg = fSeg.value, co = fCo.value, yr = fYr.value, rep = fRep.value;
      var term = fQ.value.trim().toLowerCase();
      var hit = rows.filter(function (r) {
        if (seg && r.segment !== seg) return false;
        if (co && r.company !== co) return false;
        if (yr && String(r.year) !== yr) return false;
        if (rep && r.report !== rep) return false;
        if (term) {
          var hay = [r.metric, r.segment, r.company, r.note, r.report].join(" ").toLowerCase();
          if (hay.indexOf(term) < 0) return false;
        }
        return true;
      });
      cnt.textContent = hit.length.toLocaleString("en-US") + " of " + rows.length.toLocaleString("en-US") + " values";
      if (!hit.length) { out.innerHTML = '<div class="empty">No values match these filters.</div>'; return; }
      out.innerHTML = table({
        head: ["Metric", "Segment", "Company", "Year", "Value", "Unit", "Basis", "Source"], prose: [0],
        rows: hit.map(function (r) {
          return [esc(r.metric), esc(r.segment), esc(r.company), r.year == null ? "—" : r.year,
                  r.value == null ? "—" : fmt(r.value, Math.abs(r.value) < 10 && r.value % 1 !== 0 ? 1 : 0),
                  esc(r.unit || ""), esc(r.kind || ""),
                  '<span class="mono">' + esc(r.report) + (r.page ? " p." + r.page : "") + "</span>"];
        })
      });
    }
    [fSeg, fCo, fYr, fRep].forEach(function (n) { n.addEventListener("change", apply); });
    fQ.addEventListener("input", apply);
    q("#f-reset").addEventListener("click", function () {
      fSeg.value = ""; fCo.value = ""; fYr.value = ""; fRep.value = ""; fQ.value = ""; apply();
    });
    apply();
  }

  /* =======================================================================
     TABS, THEME, BOOT
     ======================================================================= */
  function setupTabs() {
    var tabs = qa(".tab");
    function show(id) {
      tabs.forEach(function (t) {
        var on = t.id === id;
        t.setAttribute("aria-selected", on ? "true" : "false");
        q("#" + t.getAttribute("aria-controls")).hidden = !on;
      });
    }
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        show(t.id);
        if (location.hash !== "#" + t.getAttribute("aria-controls"))
          history.replaceState(null, "", "#" + t.getAttribute("aria-controls"));
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      t.addEventListener("keydown", function (e) {
        var i = tabs.indexOf(t), n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (n) { e.preventDefault(); n.focus(); n.click(); }
      });
    });
    var want = qa(".panel").filter(function (p) { return "#" + p.id === location.hash; })[0];
    if (want) show(q('[aria-controls="' + want.id + '"]').id);
  }

  function setupTheme() {
    var btn = q("#themebtn"), root = document.documentElement;
    var saved = null;
    try { saved = localStorage.getItem("nsr-theme"); } catch (e) { /* storage may be blocked */ }
    if (saved) root.setAttribute("data-theme", saved);
    function isDark() {
      var a = root.getAttribute("data-theme");
      if (a) return a === "dark";
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    function label() { btn.textContent = isDark() ? "Light mode" : "Dark mode"; }
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("nsr-theme", next); } catch (e) { /* non-fatal */ }
      label();
      render();
    });
    label();
  }

  /* Charts are strings of SVG that reference CSS custom properties, so a theme
     change needs no redraw — but a re-render keeps any measured geometry honest. */
  function render() {
    qa("[data-chart]").forEach(function (n) {
      var k = n.getAttribute("data-chart");
      if (CH[k]) n.innerHTML = CH[k]();
      else n.innerHTML = '<div class="empty">No renderer for "' + esc(k) + '".</div>';
    });
    qa("[data-table]").forEach(function (n) {
      var k = n.getAttribute("data-table");
      if (TB[k]) n.innerHTML = TB[k]();
      else n.innerHTML = '<div class="empty">No table for "' + esc(k) + '".</div>';
    });
    qa("[data-legend]").forEach(function (n) {
      var k = n.getAttribute("data-legend");
      if (LG[k]) n.innerHTML = LG[k]();
    });
  }

  function boot() {
    renderChrome();
    tiles("#kpis", D.kpis);
    tiles("#fin-tiles", [
      { label: "Cumulative capex ’26–’30", value: "$16.5tn", sub: "Total datacentre infrastructure" },
      { label: "Funded internally", value: "77%", sub: "Operating cash flow plus direct enterprise capex" },
      { label: "To be financed", value: "$3.7tn", sub: "$3.3tn of it by tier-2 and neoclouds", accent: true },
      { label: "Hyperscaler FCF trough", value: "−$486bn", sub: "In 2028; positive again in 2030" },
      { label: "2027 EBITDA, key players", value: "$1.8tn", sub: "Hyperscalers plus Nvidia and Broadcom" }
    ]);
    tiles("#q-tiles", S.scorecard2Q26.tiles);
    renderLists();
    renderHeatmap();
    render();
    fillCites();
    setupExplorer();
    setupTabs();
    setupTheme();
    C.bindTips(document.body);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
