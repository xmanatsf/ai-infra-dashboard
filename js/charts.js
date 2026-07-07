/* Minimal SVG chart library following the dataviz method:
   one axis, thin marks, 2px surface gaps, rounded data-ends, hover tooltips,
   legend for >=2 series, recessive grid. No external dependencies. */
(function () {
  const NS = "http://www.w3.org/2000/svg";

  function el(tag, attrs, parent) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  // Shared tooltip
  let tip;
  function tooltip() {
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "viz-tooltip";
      document.body.appendChild(tip);
    }
    return tip;
  }
  function showTip(html, ev) {
    const t = tooltip();
    t.innerHTML = html;
    t.classList.add("on");
    moveTip(ev);
  }
  function moveTip(ev) {
    const t = tooltip();
    const pad = 14;
    let x = ev.clientX + pad, y = ev.clientY + pad;
    const r = t.getBoundingClientRect();
    if (x + r.width > window.innerWidth - 8) x = ev.clientX - r.width - pad;
    if (y + r.height > window.innerHeight - 8) y = ev.clientY - r.height - pad;
    t.style.left = x + "px";
    t.style.top = y + "px";
  }
  function hideTip() { tooltip().classList.remove("on"); }

  function fmt(v, unit) {
    if (v == null) return "–";
    const num = Math.abs(v) >= 1000 ? (v / 1000).toFixed(1).replace(/\.0$/, "") + "tn" : String(Math.round(v * 10) / 10);
    if (!unit) return num;
    if (unit === "$bn") return (Math.abs(v) >= 1000 ? "$" + (v / 1000).toFixed(2).replace(/0$/, "").replace(/\.$/, "") + "tn" : "$" + num + "bn");
    if (unit === "%") return num + "%";
    return num + " " + unit;
  }

  function niceMax(v) {
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    for (const m of [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p;
    return 10 * p;
  }

  function frame(container, opts) {
    const wrap = typeof container === "string" ? document.querySelector(container) : container;
    wrap.innerHTML = "";
    const W = opts.width || Math.max(320, Math.min(wrap.clientWidth || 560, 1200));
    const H = opts.height || 300;
    const m = Object.assign({ top: 14, right: 18, bottom: 30, left: 48 }, opts.margin);
    const svg = el("svg", { width: "100%", viewBox: `0 0 ${W} ${H}`, role: "img" }, wrap);
    if (opts.label) el("title", {}, svg).textContent = opts.label;
    return { wrap, svg, W, H, m, iw: W - m.left - m.right, ih: H - m.top - m.bottom };
  }

  function yAxis(f, yMax, yMin, unit, ticks) {
    const g = el("g", {}, f.svg);
    const n = ticks || 4;
    for (let i = 0; i <= n; i++) {
      const v = yMin + (yMax - yMin) * (i / n);
      const y = f.m.top + f.ih - ((v - yMin) / (yMax - yMin)) * f.ih;
      el("line", { x1: f.m.left, x2: f.m.left + f.iw, y1: y, y2: y, stroke: v === 0 ? cssVar("--baseline") : cssVar("--grid"), "stroke-width": 1 }, g);
      const t = el("text", { x: f.m.left - 8, y: y + 4, "text-anchor": "end", "font-size": 11, fill: cssVar("--muted") }, g);
      t.textContent = fmt(v, unit === "%" ? "%" : null);
      t.style.fontVariantNumeric = "tabular-nums";
    }
  }

  function legend(wrap, items, before) {
    if (items.length < 2) return;
    const prev = wrap.previousElementSibling;
    if (prev && prev.classList && prev.classList.contains("legend")) prev.remove();
    const d = document.createElement("div");
    d.className = "legend";
    items.forEach(it => {
      const s = document.createElement("span");
      s.className = "item";
      s.innerHTML = `<span class="swatch" style="background:${it.color}"></span>${it.name}`;
      d.appendChild(s);
    });
    if (before) wrap.parentNode.insertBefore(d, wrap); else wrap.appendChild(d);
  }

  /* Stacked / grouped column chart.
     cfg: {years, series:[{name, values, color}], unit, stacked, height, floorNote} */
  window.columnChart = function (container, cfg) {
    const f = frame(container, { height: cfg.height || 300, label: cfg.label });
    const years = cfg.years, S = cfg.series;
    const sums = years.map((_, i) => cfg.stacked
      ? S.reduce((a, s) => a + (s.values[i] || 0), 0)
      : Math.max(...S.map(s => s.values[i] || 0)));
    const yMax = niceMax(Math.max(...sums));
    yAxis(f, yMax, 0, cfg.unit);
    const slot = f.iw / years.length;
    const gW = Math.min(cfg.stacked ? 54 : 26 * S.length, slot * 0.62);

    years.forEach((yr, i) => {
      const cx = f.m.left + slot * i + slot / 2;
      el("text", { x: cx, y: f.H - 8, "text-anchor": "middle", "font-size": 11.5, fill: cssVar("--ink-2") }, f.svg).textContent = yr;
      if (cfg.stacked) {
        let acc = 0;
        S.forEach((s, si) => {
          const v = s.values[i] || 0;
          if (!v) return;
          const h = (v / yMax) * f.ih;
          const y = f.m.top + f.ih - ((acc + v) / yMax) * f.ih;
          const isTop = si === S.length - 1 || S.slice(si + 1).every(t => !(t.values[i]));
          const r = el("rect", {
            x: cx - gW / 2, y: y + 1, width: gW, height: Math.max(h - 2, 1.5),
            fill: s.color, rx: isTop ? 4 : 0
          }, f.svg);
          hover(r, () => `<div class="t">${s.name} — ${yr}</div>${fmt(v, cfg.unit)}${cfg.stacked ? `<br>Total ${yr}: ${fmt(sums[i], cfg.unit)}` : ""}`);
          acc += v;
        });
        const total = sums[i];
        const ty = f.m.top + f.ih - (total / yMax) * f.ih - 6;
        const t = el("text", { x: cx, y: ty, "text-anchor": "middle", "font-size": 11.5, "font-weight": 600, fill: cssVar("--ink-1") }, f.svg);
        t.textContent = (cfg.floors && cfg.floors[i] ? ">" : "") + fmt(total, cfg.unit);
      } else {
        const bw = Math.min(24, gW / S.length - 2);
        S.forEach((s, si) => {
          const v = s.values[i];
          if (v == null) return;
          const h = (v / yMax) * f.ih;
          const x = cx - (S.length * (bw + 4)) / 2 + si * (bw + 4);
          const r = el("rect", { x, y: f.m.top + f.ih - h, width: bw, height: Math.max(h, 1.5), fill: s.color, rx: 4 }, f.svg);
          hover(r, () => `<div class="t">${s.name} — ${yr}</div>${fmt(v, cfg.unit)}`);
        });
      }
    });
    legend(f.wrap, S, true);
  };

  /* Horizontal stacked bar for part-to-whole (one bar per column of data).
     cfg: {bars: [{title, total, items:[{name,value,color,detail}]}], unit} */
  window.compositionBars = function (container, cfg) {
    const wrap = typeof container === "string" ? document.querySelector(container) : container;
    wrap.innerHTML = "";
    cfg.bars.forEach(bar => {
      const total = bar.total || bar.items.reduce((a, b) => a + b.value, 0);
      const line = document.createElement("div");
      line.style.marginBottom = "14px";
      const head = document.createElement("div");
      head.style.cssText = "display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:4px;";
      head.innerHTML = `<span style="color:var(--ink-2)">${bar.title}</span><b>${fmt(total, cfg.unit)}</b>`;
      line.appendChild(head);
      const track = document.createElement("div");
      track.style.cssText = "display:flex;height:26px;border-radius:6px;overflow:hidden;gap:2px;";
      bar.items.forEach(it => {
        const seg = document.createElement("div");
        seg.style.cssText = `flex:${it.value} ${it.value} 0%;background:${it.color};min-width:2px;cursor:default;`;
        seg.addEventListener("mousemove", ev => showTip(`<div class="t">${it.name}</div>${fmt(it.value, cfg.unit)} · ${Math.round(it.value / total * 100)}%${it.detail ? "<br>" + it.detail : ""}`, ev));
        seg.addEventListener("mouseleave", hideTip);
        track.appendChild(seg);
      });
      line.appendChild(track);
      const lg = document.createElement("div");
      lg.className = "legend";
      bar.items.forEach(it => {
        const s = document.createElement("span");
        s.className = "item";
        s.innerHTML = `<span class="swatch" style="background:${it.color}"></span>${it.name} <span style="color:var(--muted)">${fmt(it.value, cfg.unit)}</span>`;
        lg.appendChild(s);
      });
      line.appendChild(lg);
      wrap.appendChild(line);
    });
  };

  /* Line chart. cfg: {years, series:[{name, values, color, dashed}], unit, yMin} */
  window.lineChart = function (container, cfg) {
    const f = frame(container, { height: cfg.height || 300, label: cfg.label });
    const years = cfg.years, S = cfg.series;
    const all = S.flatMap(s => s.values).filter(v => v != null);
    const yMax = niceMax(Math.max(...all));
    const yMin = cfg.yMin != null ? cfg.yMin : Math.min(0, Math.min(...all));
    yAxis(f, yMax, yMin, cfg.unit);
    const X = i => f.m.left + (years.length === 1 ? f.iw / 2 : (i / (years.length - 1)) * f.iw);
    const Y = v => f.m.top + f.ih - ((v - yMin) / (yMax - yMin)) * f.ih;

    years.forEach((yr, i) => {
      if (years.length > 10 && i % 2 === 1) return;
      el("text", { x: X(i), y: f.H - 8, "text-anchor": "middle", "font-size": 11, fill: cssVar("--ink-2") }, f.svg).textContent = yr;
    });

    const usedLabelYs = [];
    S.forEach(s => {
      let d = "", started = false;
      s.values.forEach((v, i) => {
        if (v == null) { return; }
        d += (started ? " L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1);
        started = true;
      });
      el("path", { d, fill: "none", stroke: s.color, "stroke-width": 2, "stroke-linejoin": "round", "stroke-dasharray": s.dashed ? "5 4" : "none" }, f.svg);
      s.values.forEach((v, i) => {
        if (v == null) return;
        const c = el("circle", { cx: X(i), cy: Y(v), r: 4, fill: s.color, stroke: cssVar("--surface-1"), "stroke-width": 2 }, f.svg);
        hover(c, () => `<div class="t">${s.name} — ${years[i]}</div>${fmt(v, cfg.unit)}`);
      });
      // direct label at last point
      const li = s.values.map((v, i) => v == null ? -1 : i).reduce((a, b) => Math.max(a, b), -1);
      if (li >= 0) {
        let ly = Y(s.values[li]) + 4;
        while (usedLabelYs.some(u => Math.abs(u - ly) < 13)) ly += 13;
        usedLabelYs.push(ly);
        const t = el("text", { x: Math.min(X(li) + 7, f.W - 4), y: ly, "font-size": 11, "font-weight": 600, fill: cssVar("--ink-1") }, f.svg);
        t.textContent = s.name.length > 14 ? s.name.slice(0, 13) + "…" : s.name;
        if (X(li) + 60 > f.W) { t.setAttribute("text-anchor", "end"); t.setAttribute("x", X(li) - 7); }
      }
    });
    legend(f.wrap, S, true);
  };

  /* Diverging / signed bar chart over years (for FCF). cfg:{years, values, unit, annotations} */
  window.signedBarChart = function (container, cfg) {
    const f = frame(container, { height: cfg.height || 280, label: cfg.label });
    const vals = cfg.values;
    const yMax = niceMax(Math.max(...vals.map(v => Math.abs(v))));
    yAxis(f, yMax, -yMax, cfg.unit, 4);
    const slot = f.iw / cfg.years.length;
    const bw = Math.min(30, slot * 0.6);
    const Y = v => f.m.top + f.ih - ((v + yMax) / (2 * yMax)) * f.ih;
    cfg.years.forEach((yr, i) => {
      const x = f.m.left + slot * i + slot / 2;
      const v = vals[i];
      const y0 = Y(0), y1 = Y(v);
      const r = el("rect", {
        x: x - bw / 2, y: Math.min(y0, y1), width: bw, height: Math.max(Math.abs(y1 - y0), 1.5),
        fill: v >= 0 ? cssVar("--s2") : cssVar("--s6"), rx: 4
      }, f.svg);
      hover(r, () => `<div class="t">${yr}</div>${(cfg.tipLabel || "FCF")}: ${fmt(v, cfg.unit)}${cfg.extra && cfg.extra[i] ? "<br>" + cfg.extra[i] : ""}`);
      if (i % 2 === 0) el("text", { x, y: f.H - 8, "text-anchor": "middle", "font-size": 11, fill: cssVar("--ink-2") }, f.svg).textContent = yr;
    });
  };

  /* Heatmap. cfg: {rows:[{label, values, tip[]}], cols, palette:'seq'|'diverge', max} */
  window.heatmap = function (container, cfg) {
    const wrap = typeof container === "string" ? document.querySelector(container) : container;
    wrap.innerHTML = "";
    const table = document.createElement("table");
    table.className = "data";
    table.style.tableLayout = "fixed";
    const thead = document.createElement("thead");
    thead.innerHTML = "<tr><th style='width:30%'></th>" + cfg.cols.map(c => `<th class="num" style="white-space:normal">${c}</th>`).join("") + "</tr>";
    table.appendChild(thead);
    const tb = document.createElement("tbody");
    const seq = [cssVar("--seq-1"), cssVar("--seq-2"), cssVar("--seq-3"), cssVar("--seq-4"), cssVar("--seq-5")];
    cfg.rows.forEach(row => {
      const tr = document.createElement("tr");
      let html = `<td>${row.label}</td>`;
      row.values.forEach((v, i) => {
        let bg = "transparent", ink = "inherit", txt = v == null ? "–" : (cfg.format ? cfg.format(v) : v);
        if (v != null) {
          const idx = Math.min(seq.length - 1, Math.max(0, Math.round((v / cfg.max) * (seq.length - 1))));
          bg = seq[idx];
          ink = idx >= 3 ? "#fff" : "var(--ink-1)";
          if (document.documentElement.dataset.theme === "dark") ink = idx >= 3 ? "var(--ink-1)" : "#fff";
        }
        html += `<td class="num hm" data-r="${row.label}" data-c="${cfg.cols[i]}" data-tip="${(row.tips && row.tips[i]) || ""}" style="background:${bg};color:${ink};border-radius:4px;">${txt}</td>`;
      });
      tr.innerHTML = html;
      tb.appendChild(tr);
    });
    table.appendChild(tb);
    wrap.appendChild(table);
    wrap.querySelectorAll("td.hm").forEach(td => {
      td.addEventListener("mousemove", ev => showTip(`<div class="t">${td.dataset.r} — ${td.dataset.c}</div>${td.dataset.tip || td.textContent}`, ev));
      td.addEventListener("mouseleave", hideTip);
    });
  };

  function hover(node, html) {
    node.style.cursor = "default";
    node.addEventListener("mousemove", ev => showTip(typeof html === "function" ? html() : html, ev));
    node.addEventListener("mouseleave", hideTip);
  }
  window.__vizHover = hover;
})();
