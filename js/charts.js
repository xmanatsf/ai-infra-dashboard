/* Dependency-free SVG chart primitives.
   Every builder returns an SVG string; the caller inserts it and calls
   Chart.bindTips(root) once to wire the shared tooltip.

   House rules:
   - numbers and labels are drawn in text colours; the mark next to them
     carries the series colour
   - a 2px gap of background separates neighbouring fills
   - the free end of a bar is rounded 4px, the baseline end left square
   - the caller passes the colours; nothing here picks or cycles them
*/
(function (global) {
  "use strict";

  var GAP = 2;
  var VAL  = "fill:var(--ink);font-size:11px;font-weight:600;font-variant-numeric:tabular-nums";
  var VALS = "fill:var(--ink-2);font-size:10.5px;font-weight:600;font-variant-numeric:tabular-nums";
  var TXT  = "fill:var(--ink-3);font-size:11px";
  var TXT2 = "fill:var(--ink-2);font-size:11.5px";
  var TXTB = "fill:var(--ink);font-size:11.5px;font-weight:600";
  var GRID = "stroke:var(--grid);stroke-width:1";
  var AXIS = "stroke:var(--rule-strong);stroke-width:1";

  /* ---------- small helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function fmt(v, dp) {
    if (v === null || v === undefined) return "—";
    var s = Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 });
    return (v < 0 ? "−" : "") + s;
  }
  function money(v, dp) {
    if (v === null || v === undefined) return "—";
    return (v < 0 ? "−" : "") + "$" + Math.abs(v).toLocaleString("en-US",
      { minimumFractionDigits: dp || 0, maximumFractionDigits: dp || 0 });
  }
  function pct(v, dp) {
    if (v === null || v === undefined) return "—";
    return (v < 0 ? "−" : "") + Math.abs(v).toFixed(dp || 0) + "%";
  }
  function lin(d0, d1, r0, r1) {
    var k = (r1 - r0) / (d1 - d0 || 1);
    return function (v) { return r0 + (v - d0) * k; };
  }
  function ticks(min, max, n) {
    var raw = (max - min) / (n || 5),
        mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10)),
        norm = raw / mag, step;
    step = norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10;
    step *= mag;
    var out = [], s = Math.ceil(min / step) * step;
    for (var v = s; v <= max + 1e-9; v += step) out.push(Math.abs(v) < 1e-9 ? 0 : +v.toFixed(10));
    return out;
  }
  /* approximate advance width, used to keep labels inside their gutters */
  function tw(str, px) { return String(str || "").length * px * 0.545; }
  function lines(txt) { return String(txt).split("\n"); }
  function svgOpen(w, h) {
    return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" font-family="-apple-system,Segoe UI,system-ui,sans-serif">';
  }

  /* rounded-end path helpers */
  function topRound(x, y, w, h, r) {
    if (h <= 0) return ""; r = Math.min(r, w / 2, h);
    return "M" + x + " " + (y + h) + "V" + (y + r) + "A" + r + " " + r + " 0 0 1 " + (x + r) + " " + y +
           "H" + (x + w - r) + "A" + r + " " + r + " 0 0 1 " + (x + w) + " " + (y + r) + "V" + (y + h) + "Z";
  }
  function botRound(x, y, w, h, r) {
    if (h <= 0) return ""; r = Math.min(r, w / 2, h);
    return "M" + x + " " + y + "H" + (x + w) + "V" + (y + h - r) + "A" + r + " " + r + " 0 0 1 " + (x + w - r) + " " + (y + h) +
           "H" + (x + r) + "A" + r + " " + r + " 0 0 1 " + x + " " + (y + h - r) + "Z";
  }
  function rightRound(x, y, w, h, r) {
    if (w <= 0) return ""; r = Math.min(r, h / 2, w);
    return "M" + x + " " + y + "H" + (x + w - r) + "A" + r + " " + r + " 0 0 1 " + (x + w) + " " + (y + r) +
           "V" + (y + h - r) + "A" + r + " " + r + " 0 0 1 " + (x + w - r) + " " + (y + h) + "H" + x + "Z";
  }
  function leftRound(x, y, w, h, r) {
    if (w <= 0) return ""; r = Math.min(r, h / 2, w);
    return "M" + (x + w) + " " + y + "H" + (x + r) + "A" + r + " " + r + " 0 0 0 " + x + " " + (y + r) +
           "V" + (y + h - r) + "A" + r + " " + r + " 0 0 0 " + (x + r) + " " + (y + h) + "H" + (x + w) + "Z";
  }

  /* ---------- tooltip ---------- */
  var tipEl = null;
  function tip() {
    if (!tipEl) {
      tipEl = document.getElementById("tip");
      if (!tipEl) {
        tipEl = document.createElement("div");
        tipEl.id = "tip";
        tipEl.setAttribute("role", "status");
        document.body.appendChild(tipEl);
      }
    }
    return tipEl;
  }
  function tipShow(html, e) {
    var t = tip();
    t.innerHTML = html; t.classList.add("on");
    var r = t.getBoundingClientRect(), x = e.clientX + 14, y = e.clientY - r.height - 12;
    if (x + r.width > window.innerWidth - 10) x = e.clientX - r.width - 14;
    if (y < 8) y = e.clientY + 18;
    t.style.left = x + "px"; t.style.top = y + "px";
  }
  function tipHide() { tip().classList.remove("on"); }
  function bindTips(root) {
    root = root || document;
    root.addEventListener("mousemove", function (e) {
      var t = e.target.closest ? e.target.closest("[data-tip]") : null;
      if (t) tipShow(t.getAttribute("data-tip"), e); else tipHide();
    });
    root.addEventListener("mouseleave", tipHide);
    window.addEventListener("scroll", tipHide, { passive: true });
  }
  function tipRow(color, label, val) {
    return '<div class="r"><span>' + (color ? '<i style="background:' + color + '"></i>' : "") +
           esc(label) + "</span><span>" + val + "</span></div>";
  }
  function tipAttr(html) { return ' data-tip="' + esc(html) + '"'; }

  /* ---------- vertical stacked columns ---------- */
  function colStack(o) {
    var W = o.w || 640, H = o.h || 330, P = o.pad || { t: 26, r: 14, b: 34, l: 44 };
    var totals = o.x.map(function (_, i) {
      return o.series.reduce(function (a, s) { return a + s.v[i]; }, 0);
    });
    var max = o.yMax || Math.max.apply(null, totals) * 1.08;
    var y = lin(0, max, H - P.b, P.t);
    var step = (W - P.l - P.r) / o.x.length;
    var bw = Math.min(o.barW || 64, step - 16);
    var s = svgOpen(W, H);
    ticks(0, max, 5).forEach(function (t) {
      s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '" style="' + GRID + '"/>' +
           '<text x="' + (P.l - 9) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end" style="' + TXT + '">' + (o.yFmt ? o.yFmt(t) : fmt(t)) + "</text>";
    });
    o.x.forEach(function (lab, i) {
      var cx = P.l + step * i + step / 2, x0 = cx - bw / 2, acc = 0, rows = "";
      for (var k = o.series.length - 1; k >= 0; k--) {
        var sr = o.series[k];
        rows += tipRow(sr.color, sr.name, (o.vFmt ? o.vFmt(sr.v[i]) : money(sr.v[i])) +
                (o.pctOf ? " · " + pct(sr.v[i] / totals[i] * 100, 0) : ""));
      }
      var tt = '<div class="t">' + lab + "</div>" + rows +
        '<div class="r" style="margin-top:4px;border-top:1px solid rgba(128,128,128,.35);padding-top:4px"><span>Total</span><span>' +
        (o.vFmt ? o.vFmt(totals[i]) : money(totals[i])) + "</span></div>";
      s += "<g" + tipAttr(tt) + ">";
      s += '<rect x="' + (cx - step / 2) + '" y="' + P.t + '" width="' + step + '" height="' + (H - P.b - P.t) + '" fill="transparent"/>';
      o.series.forEach(function (sr, k) {
        var v = sr.v[i], h = y(0) - y(v), yy = y(acc + v), hh = Math.max(0, h - GAP);
        if (hh > 0.4) {
          s += (k === o.series.length - 1)
            ? '<path d="' + topRound(x0, yy, bw, hh, 4) + '" style="fill:' + sr.color + '"/>'
            : '<rect x="' + x0 + '" y="' + yy.toFixed(1) + '" width="' + bw + '" height="' + hh.toFixed(1) + '" style="fill:' + sr.color + '"/>';
        }
        acc += v;
      });
      if (o.totalLabels !== false)
        s += '<text x="' + cx + '" y="' + (y(totals[i]) - 9).toFixed(1) + '" text-anchor="middle" style="' + TXTB + ';font-variant-numeric:tabular-nums">' +
             (o.tFmt ? o.tFmt(totals[i]) : money(totals[i])) + "</text>";
      s += '<text x="' + cx + '" y="' + (H - P.b + 17) + '" text-anchor="middle" style="' + TXT2 + '">' + lab + "</text>";
      s += "</g>";
    });
    s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(0) + '" y2="' + y(0) + '" style="' + AXIS + '"/>';
    return s + "</svg>";
  }

  /* ---------- multi-series line with crosshair hit zones ---------- */
  function lineChart(o) {
    var W = o.w || 640, H = o.h || 320, P = o.pad || { t: 22, r: 64, b: 34, l: 48 };
    var all = [];
    o.series.forEach(function (s) { all = all.concat(s.v.filter(function (v) { return v !== null; })); });
    var mn = o.yMin !== undefined ? o.yMin : Math.min.apply(null, all);
    var mx = o.yMax !== undefined ? o.yMax : Math.max.apply(null, all);
    var pad = (mx - mn) * 0.1;
    if (o.yMin === undefined) mn -= pad;
    if (o.yMax === undefined) mx += pad;
    var n = o.x.length, x = lin(0, n - 1, P.l, W - P.r), y = lin(mn, mx, H - P.b, P.t);
    var s = svgOpen(W, H);
    ticks(mn, mx, o.yTickN || 5).forEach(function (t) {
      s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '" style="' + GRID + '"/>' +
           '<text x="' + (P.l - 9) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end" style="' + TXT + '">' + (o.yFmt ? o.yFmt(t) : fmt(t)) + "</text>";
    });
    if (mn < 0 && mx > 0)
      s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(0).toFixed(1) + '" y2="' + y(0).toFixed(1) + '" style="' + AXIS + '"/>';
    (o.xLab || o.x).forEach(function (lab, i) {
      if (!lab) return;
      s += '<text x="' + x(i).toFixed(1) + '" y="' + (H - P.b + 17) + '" text-anchor="middle" style="' + TXT2 + '">' + lab + "</text>";
    });
    (o.vrules || []).forEach(function (r) {
      var rx = x(r.ix);
      s += '<line x1="' + rx.toFixed(1) + '" x2="' + rx.toFixed(1) + '" y1="' + P.t + '" y2="' + (H - P.b) + '" style="' + AXIS + '"/>';
      s += '<text x="' + (rx + (r.dx || 6)).toFixed(1) + '" y="' + (P.t - 7) + '" text-anchor="' + (r.anchor || "start") + '" style="' + TXTB + '">' + esc(r.text) + "</text>";
    });
    /* End labels are placed after the lines are drawn, then pushed apart where
       two series finish within a line-height of each other, so the last value
       of every series stays readable. */
    var endLabels = [];
    o.series.forEach(function (sr) {
      var d = "";
      sr.v.forEach(function (v, i) { if (v === null) return; d += (d ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); });
      s += '<path d="' + d + '" style="fill:none;stroke:' + sr.color + ';stroke-width:2;stroke-linejoin:round;stroke-linecap:round' + (sr.dash ? ";stroke-dasharray:5 4" : "") + '"/>';
      if (o.dots !== false) sr.v.forEach(function (v, i) {
        if (v === null) return;
        s += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="4" style="fill:' + sr.color + ';stroke:var(--surface);stroke-width:2"/>';
      });
      if (o.labelLast !== false) {
        var li = sr.v.length - 1;
        while (li > 0 && sr.v[li] === null) li--;
        if (sr.v[li] !== null) endLabels.push({ y: y(sr.v[li]), x: x(li) + 10, text: o.lFmt ? o.lFmt(sr.v[li]) : fmt(sr.v[li]) });
      }
    });
    endLabels.sort(function (a, b) { return a.y - b.y; });
    for (var li2 = 1; li2 < endLabels.length; li2++) {
      if (endLabels[li2].y - endLabels[li2 - 1].y < 13) endLabels[li2].y = endLabels[li2 - 1].y + 13;
    }
    endLabels.forEach(function (L) {
      s += '<text x="' + L.x + '" y="' + (L.y + 4).toFixed(1) + '" style="' + VAL + '">' + L.text + "</text>";
    });
    (o.annots || []).forEach(function (a) {
      var ax = x(a.i), ay = y(a.y);
      s += '<line x1="' + ax + '" x2="' + ax + '" y1="' + ay + '" y2="' + (ay + (a.dy || -30)) + '" style="stroke:var(--rule-strong);stroke-width:1"/>';
      s += '<text x="' + (ax + (a.dx || 0)) + '" y="' + (ay + (a.dy || -30) - 5) + '" text-anchor="' + (a.anchor || "middle") + '" style="' + TXTB + '">' + esc(a.text) + "</text>";
    });
    var bw = (W - P.l - P.r) / (n - 1);
    o.x.forEach(function (lab, i) {
      var rows = o.series.map(function (sr) {
        return sr.v[i] === null ? "" : tipRow(sr.color, sr.name, (o.tFmt ? o.tFmt(sr.v[i]) : fmt(sr.v[i])));
      }).join("");
      s += '<rect x="' + (x(i) - bw / 2).toFixed(1) + '" y="' + P.t + '" width="' + bw.toFixed(1) + '" height="' + (H - P.b - P.t) +
           '" fill="transparent"' + tipAttr('<div class="t">' + esc(lab) + "</div>" + rows) + "/>";
    });
    return s + "</svg>";
  }

  /* ---------- horizontal bars, diverging around zero when values go negative ---------- */
  function barH(o) {
    var rows = o.rows, W = o.w || 560, rh = o.rowH || 30, P = o.pad || { t: 8, r: 56, b: 24, l: 112 };
    /* widen the left gutter (and the canvas with it) so no row label is clipped */
    var need = 14;
    rows.forEach(function (r) { need = Math.max(need, tw(r.name, 11.5) + 14, tw(r.sub, 11) + 14); });
    if (need > P.l) { W += need - P.l; P = { t: P.t, r: P.r, b: P.b, l: need }; }
    var H = P.t + P.b + rows.length * rh;
    var vals = rows.map(function (r) { return r.v; });
    var mn = Math.min(0, Math.min.apply(null, vals)), mx = Math.max(0, Math.max.apply(null, vals));
    if (o.xMin !== undefined) mn = o.xMin;
    if (o.xMax !== undefined) mx = o.xMax;
    /* A bar running left of zero carries its value label further left still.
       Reserve a band for those labels so they cannot land on the row names. */
    var negPad = 0;
    rows.forEach(function (r) {
      if (r.v < 0) negPad = Math.max(negPad, tw(o.lFmt ? o.lFmt(r.v) : fmt(r.v), 11) + 12);
    });
    W += negPad;
    var x = lin(mn, mx * 1.02, P.l + negPad, W - P.r), s = svgOpen(W, H), zx = x(0);
    ticks(mn, mx, 4).forEach(function (t) {
      s += '<line x1="' + x(t).toFixed(1) + '" x2="' + x(t).toFixed(1) + '" y1="' + P.t + '" y2="' + (H - P.b) + '" style="' + GRID + '"/>' +
           '<text x="' + x(t).toFixed(1) + '" y="' + (H - P.b + 15) + '" text-anchor="middle" style="' + TXT + '">' + (o.xFmt ? o.xFmt(t) : fmt(t)) + "</text>";
    });
    rows.forEach(function (r, i) {
      var yy = P.t + i * rh + 4, h = rh - 8, col = r.color;
      var w = Math.abs(x(r.v) - zx) - GAP; if (w < 0) w = 0;
      var xx = r.v >= 0 ? zx + GAP : x(r.v);
      s += "<g" + tipAttr('<div class="t">' + esc(r.name) + "</div>" +
            tipRow(col, o.vLabel || "Value", (o.tFmt ? o.tFmt(r.v) : fmt(r.v))) + (r.tipExtra || "")) + ">";
      s += '<rect x="' + P.l + '" y="' + (P.t + i * rh) + '" width="' + (W - P.l - P.r + 40) + '" height="' + rh + '" fill="transparent"/>';
      s += '<path d="' + (r.v >= 0 ? rightRound(xx, yy, w, h, 4) : leftRound(xx, yy, w, h, 4)) + '" style="fill:' + col + '"/>';
      s += '<text x="' + (P.l - 11) + '" y="' + (yy + h / 2 + (r.sub ? 0 : 4)).toFixed(1) + '" text-anchor="end" style="' + TXT2 + '">' + esc(r.name) + "</text>";
      var lx = r.v >= 0 ? xx + w + 7 : xx - 7;
      s += '<text x="' + lx.toFixed(1) + '" y="' + (yy + h / 2 + 4).toFixed(1) + '" text-anchor="' + (r.v >= 0 ? "start" : "end") + '" style="' + VAL + '">' + (o.lFmt ? o.lFmt(r.v) : fmt(r.v)) + "</text>";
      if (r.sub) s += '<text x="' + (P.l - 11) + '" y="' + (yy + h / 2 + 13).toFixed(1) + '" text-anchor="end" style="' + TXT + '">' + esc(r.sub) + "</text>";
      s += "</g>";
    });
    s += '<line x1="' + zx.toFixed(1) + '" x2="' + zx.toFixed(1) + '" y1="' + P.t + '" y2="' + (H - P.b) + '" style="' + AXIS + '"/>';
    return s + "</svg>";
  }

  /* ---------- one full-width stacked bar per row (part to whole) ----------
     Every label sits outside the fill, in ink tokens, so nothing depends on
     text-on-fill contrast and every segment is directly named. */
  function stackBarH(o) {
    var W = o.w || 900, P = o.pad || { t: 2, r: 10, b: 4, l: 0 }, rows = o.rows;
    var bh = o.barH || 38, lead = o.lead || 22, below = o.below || 38, gapRow = o.gapRow || 26;
    var H = P.t + P.b + rows.length * (lead + bh + below + gapRow) - gapRow;
    var total = o.total, x = lin(0, total, P.l, W - P.r), s = svgOpen(W, H), yy = P.t;
    var vf = o.vFmt || function (v) { return "$" + v.toFixed(1) + "tn"; };
    rows.forEach(function (row) {
      s += '<text x="' + P.l + '" y="' + (yy + 10) + '" style="fill:var(--ink);font-size:10.5px;font-weight:600;letter-spacing:.1em">' + esc(row.label) + "</text>";
      if (row.note) s += '<text x="' + (W - P.r) + '" y="' + (yy + 10) + '" text-anchor="end" style="' + TXT + '">' + esc(row.note) + "</text>";
      var by = yy + lead, acc = 0, n = row.segs.length, geo = [];
      row.segs.forEach(function (g, k) {
        var w = x(g.v) - x(0) - (k < n - 1 ? GAP : 0); if (w < 1) w = 1;
        var gx = x(acc), col = g.color, cx = gx + w / 2;
        geo.push({ g: g, w: w, cx: cx });
        var d = n === 1 ? rightRound(gx, by, w, bh, 4)
              : k === n - 1 ? rightRound(gx, by, w, bh, 4)
              : k === 0 ? leftRound(gx, by, w, bh, 4)
              : "M" + gx + " " + by + "h" + w + "v" + bh + "h" + (-w) + "Z";
        var tt = '<div class="t">' + esc(g.name) + "</div>" + tipRow(col, "Amount", vf(g.v)) +
                 tipRow("", "Share of total", pct(g.v / total * 100, 0));
        s += "<g" + tipAttr(tt) + ">";
        s += '<rect x="' + gx + '" y="' + (by - 6) + '" width="' + (w + GAP) + '" height="' + (bh + 12) + '" fill="transparent"/>';
        s += '<path d="' + d + '" style="fill:' + col + '"/>';
        s += '<text x="' + cx.toFixed(1) + '" y="' + (by + bh + 15) + '" text-anchor="middle" style="' + VAL + ';font-size:12px">' + vf(g.v) + "</text>";
        s += "</g>";
        acc += g.v;
      });
      /* Name line: centred under its segment where it fits, stepped to a second
         line with a leader where it would collide with its neighbour. */
      var occupied = [-1e9, -1e9];
      geo.forEach(function (q) {
        var nm = q.g.short || pct(q.g.v / total * 100, 0), half = tw(nm, 11) / 2;
        var cx = Math.min(Math.max(q.cx, P.l + half), W - P.r - half);
        var ln = cx - half > occupied[0] + 7 ? 0 : (cx - half > occupied[1] + 7 ? 1 : -1);
        if (ln < 0) return;
        occupied[ln] = cx + half;
        var ty = by + bh + 28 + ln * 15;
        if (ln > 0) s += '<line x1="' + q.cx.toFixed(1) + '" x2="' + q.cx.toFixed(1) + '" y1="' + (by + bh + 21) + '" y2="' + (ty - 9) + '" style="stroke:var(--rule);stroke-width:1"/>';
        s += '<text x="' + cx.toFixed(1) + '" y="' + ty + '" text-anchor="middle" style="' + TXT + '">' + esc(nm) + "</text>";
      });
      (row.brackets || []).forEach(function (b) {
        var a = 0, e = 0, i2;
        for (i2 = 0; i2 < b.from; i2++) a += row.segs[i2].v;
        for (i2 = 0; i2 <= b.to; i2++) e += row.segs[i2].v;
        var x0 = x(a), x1 = x(e), yb = by + bh + below - 9;
        s += '<path d="M' + x0 + " " + (yb - 5) + "V" + yb + "H" + x1 + "V" + (yb - 5) + '" style="fill:none;stroke:var(--rule-strong);stroke-width:1"/>';
        s += '<text x="' + ((x0 + x1) / 2).toFixed(1) + '" y="' + (yb + 12) + '" text-anchor="middle" style="' + VALS + '">' + esc(b.text) + "</text>";
      });
      yy += lead + bh + below + gapRow;
    });
    return s + "</svg>";
  }

  /* ---------- dumbbell: one row per category, two points in time ---------- */
  function dumbbell(o) {
    var W = o.w || 560, rh = o.rowH || 34, P = o.pad || { t: 8, r: 52, b: 26, l: 150 };
    /* inset the zero end so a near-zero value still has room for its label */
    var inset = o.inset === undefined ? 36 : o.inset;
    var H = P.t + P.b + o.rows.length * rh, x = lin(0, o.xMax, P.l + inset, W - P.r), s = svgOpen(W, H);
    ticks(0, o.xMax, 4).forEach(function (t) {
      s += '<line x1="' + x(t).toFixed(1) + '" x2="' + x(t).toFixed(1) + '" y1="' + P.t + '" y2="' + (H - P.b) + '" style="' + GRID + '"/>' +
           '<text x="' + x(t).toFixed(1) + '" y="' + (H - P.b + 15) + '" text-anchor="middle" style="' + TXT + '">' + t + "%</text>";
    });
    o.rows.forEach(function (r, i) {
      var cy = P.t + i * rh + rh / 2, col = r.color, xa = x(r.a), xb = x(r.b);
      var lo = Math.min(xa, xb), hi = Math.max(xa, xb);
      var tt = '<div class="t">' + esc(r.name) + "</div>" + tipRow(col, o.aLab, pct(r.a, 0)) +
               tipRow(col, o.bLab, pct(r.b, 0)) +
               tipRow("", "Change", (r.b - r.a >= 0 ? "+" : "−") + Math.abs(r.b - r.a) + "pts");
      s += "<g" + tipAttr(tt) + ">";
      s += '<rect x="' + P.l + '" y="' + (P.t + i * rh) + '" width="' + (W - P.l - P.r + 44) + '" height="' + rh + '" fill="transparent"/>';
      if (hi - lo > 8) s += '<line x1="' + (lo + 5).toFixed(1) + '" x2="' + (hi - 5).toFixed(1) + '" y1="' + cy + '" y2="' + cy + '" style="stroke:' + col + ';stroke-width:2;opacity:.42"/>';
      s += '<circle cx="' + xa.toFixed(1) + '" cy="' + cy + '" r="4.5" style="fill:var(--surface);stroke:' + col + ';stroke-width:2"/>';
      s += '<circle cx="' + xb.toFixed(1) + '" cy="' + cy + '" r="5" style="fill:' + col + ';stroke:var(--surface);stroke-width:2"/>';
      s += '<text x="' + (P.l - 12) + '" y="' + (cy + 4) + '" text-anchor="end" style="' + TXT2 + '">' + esc(r.name) + "</text>";
      /* emphasis follows the later period, whichever side it lands on */
      var rise = xa <= xb;
      s += '<text x="' + (lo - 8).toFixed(1) + '" y="' + (cy + 4) + '" text-anchor="end" style="' + (rise ? VALS : VAL) + '">' + Math.round(rise ? r.a : r.b) + "%</text>";
      s += '<text x="' + (hi + 8).toFixed(1) + '" y="' + (cy + 4) + '" text-anchor="start" style="' + (rise ? VAL : VALS) + '">' + Math.round(rise ? r.b : r.a) + "%</text>";
      s += "</g>";
    });
    return s + "</svg>";
  }

  /* ---------- grouped vertical columns ---------- */
  function colGroup(o) {
    var W = o.w || 620, H = o.h || 300, P = o.pad || { t: 26, r: 14, b: 48, l: 52 };
    var all = [];
    o.series.forEach(function (s) { all = all.concat(s.v); });
    var mn = Math.min(0, Math.min.apply(null, all)), mx = Math.max(0, Math.max.apply(null, all));
    var lo = mn < 0 ? mn * 1.14 : 0, hi = mx > 0 ? mx * 1.10 : 0;
    var y = lin(lo, hi || 1, H - P.b, P.t);
    var step = (W - P.l - P.r) / o.x.length, ns = o.series.length;
    var bw = Math.min(o.barW || 34, (step - 22) / ns);
    var s = svgOpen(W, H);
    ticks(lo, hi, 5).forEach(function (t) {
      s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '" style="' + GRID + '"/>' +
           '<text x="' + (P.l - 9) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end" style="' + TXT + '">' + (o.yFmt ? o.yFmt(t) : fmt(t)) + "</text>";
    });
    o.x.forEach(function (lab, i) {
      var g0 = P.l + step * i + step / 2 - (bw * ns + GAP * (ns - 1)) / 2;
      var rows = o.series.map(function (sr) { return tipRow(sr.color, sr.name, (o.tFmt ? o.tFmt(sr.v[i]) : fmt(sr.v[i]))); }).join("");
      s += "<g" + tipAttr('<div class="t">' + String(lab).replace(/\n/g, " ") + "</div>" + rows) + ">";
      s += '<rect x="' + (P.l + step * i) + '" y="' + P.t + '" width="' + step + '" height="' + (H - P.b - P.t) + '" fill="transparent"/>';
      o.series.forEach(function (sr, k) {
        var v = sr.v[i], xx = g0 + k * (bw + GAP), h = Math.abs(y(v) - y(0));
        s += v >= 0 ? '<path d="' + topRound(xx, y(v), bw, h, 4) + '" style="fill:' + sr.color + '"/>'
                    : '<path d="' + botRound(xx, y(0), bw, h, 4) + '" style="fill:' + sr.color + '"/>';
        var ly = v >= 0 ? y(v) - 7 : y(0) + h + 13;
        s += '<text x="' + (xx + bw / 2).toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" style="' + VALS + '">' + (o.lFmt ? o.lFmt(v) : fmt(v)) + "</text>";
      });
      var cx0 = P.l + step * i + step / 2, ll = lines(lab);
      ll.forEach(function (t, j) {
        s += '<text x="' + cx0 + '" y="' + (H - P.b + 18 + j * 13) + '" text-anchor="middle" style="' + TXT2 + '">' + esc(t) + "</text>";
      });
      if (o.sub && o.sub[i])
        s += '<text x="' + cx0 + '" y="' + (H - P.b + 18 + ll.length * 13 + 1) + '" text-anchor="middle" style="' + TXT + '">' + esc(o.sub[i]) + "</text>";
      s += "</g>";
    });
    s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(0).toFixed(1) + '" y2="' + y(0).toFixed(1) + '" style="' + AXIS + '"/>';
    return s + "</svg>";
  }

  /* ---------- single-series columns with selective value labels ---------- */
  function colSingle(o) {
    var W = o.w || 640, H = o.h || 280, P = o.pad || { t: 26, r: 12, b: 38, l: 44 };
    var mx = Math.max.apply(null, o.v) * 1.12, y = lin(0, mx, H - P.b, P.t);
    var step = (W - P.l - P.r) / o.x.length, bw = Math.min(o.barW || 30, step - 8);
    var s = svgOpen(W, H);
    ticks(0, mx, 4).forEach(function (t) {
      s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(t).toFixed(1) + '" y2="' + y(t).toFixed(1) + '" style="' + GRID + '"/>' +
           '<text x="' + (P.l - 9) + '" y="' + (y(t) + 3.5).toFixed(1) + '" text-anchor="end" style="' + TXT + '">' + (o.yFmt ? o.yFmt(t) : fmt(t)) + "</text>";
    });
    o.x.forEach(function (lab, i) {
      var cx = P.l + step * i + step / 2, v = o.v[i], h = y(0) - y(v);
      var col = (o.est !== undefined && i >= o.est) ? "var(--o1)" : o.color;
      s += "<g" + tipAttr('<div class="t">' + lab + "</div>" + tipRow(col, o.name || "Value", (o.tFmt ? o.tFmt(v) : fmt(v))) + (o.extra ? o.extra(i) : "")) + ">";
      s += '<rect x="' + (cx - step / 2) + '" y="' + P.t + '" width="' + step + '" height="' + (H - P.b - P.t) + '" fill="transparent"/>';
      s += '<path d="' + topRound(cx - bw / 2, y(v), bw, h, 4) + '" style="fill:' + col + '"/>';
      if (o.labelIx ? o.labelIx.indexOf(i) >= 0 : (o.labelAll !== false || i === o.x.length - 1))
        s += '<text x="' + cx + '" y="' + (y(v) - 8).toFixed(1) + '" text-anchor="middle" style="' + VALS + '">' + (o.lFmt ? o.lFmt(v) : fmt(v)) + "</text>";
      s += '<text x="' + cx + '" y="' + (H - P.b + 15) + '" text-anchor="end" style="' + TXT + '" transform="rotate(-40 ' + cx + " " + (H - P.b + 15) + ')">' + lab + "</text>";
      s += "</g>";
    });
    s += '<line x1="' + P.l + '" x2="' + (W - P.r) + '" y1="' + y(0) + '" y2="' + y(0) + '" style="' + AXIS + '"/>';
    return s + "</svg>";
  }

  /* ---------- legend ---------- */
  function legend(items) {
    return items.map(function (it) {
      var col = it.color, cls = "sw", st = "background:" + col;
      if (it.kind === "line") cls = "sw line";
      else if (it.kind === "open") st = "background:transparent;border:2px solid " + col + ";border-radius:50%";
      else if (it.kind === "fill") st = "background:" + col + ";border-radius:50%";
      return '<span><i class="' + cls + '" style="' + st + '"></i>' + esc(it.name) + "</span>";
    }).join("");
  }

  /* ---------- table ----------
     cfg.head: array of header strings
     cfg.rows: array of arrays, or {cells, em, cls} objects
     cfg.prose: column indexes that hold sentences rather than figures
     cfg.em:    column indexes always set in the emphasis weight           */
  function table(cfg) {
    var h = "<table>" + (cfg.caption ? "<caption>" + esc(cfg.caption) + "</caption>" : "") + "<thead><tr>";
    cfg.head.forEach(function (c, i) {
      var hc = [];
      if (cfg.em && cfg.em.indexOf(i) >= 0) hc.push("em");
      if (cfg.prose && cfg.prose.indexOf(i) >= 0) hc.push("pr");
      h += "<th" + (hc.length ? ' class="' + hc.join(" ") + '"' : "") + ' scope="col">' + c + "</th>";
    });
    h += "</tr></thead><tbody>";
    cfg.rows.forEach(function (r) {
      var cls = r.cls ? ' class="' + r.cls + '"' : "";
      var cells = r.cells || r;
      h += "<tr" + cls + ">";
      cells.forEach(function (c, i) {
        var cc = [];
        if (r.em || (cfg.em && cfg.em.indexOf(i) >= 0)) cc.push("em");
        if (cfg.prose && cfg.prose.indexOf(i) >= 0) cc.push("pr");
        if (r.indent && i === 0) cc.push("indent");
        if (typeof c === "string" && c.indexOf("−") === 0) cc.push("neg");
        h += (i === 0
          ? '<th scope="row" class="' + cc.join(" ") + '" style="font-weight:' + (r.em ? 600 : 400) + ';text-align:left">'
          : "<td" + (cc.length ? ' class="' + cc.join(" ") + '"' : "") + ">") + c + (i === 0 ? "</th>" : "</td>");
      });
      h += "</tr>";
    });
    return h + "</tbody></table>";
  }

  global.Chart = {
    colStack: colStack, lineChart: lineChart, barH: barH, stackBarH: stackBarH,
    dumbbell: dumbbell, colGroup: colGroup, colSingle: colSingle,
    legend: legend, table: table,
    bindTips: bindTips, tipRow: tipRow,
    fmt: fmt, money: money, pct: pct, esc: esc, ticks: ticks
  };
})(window);
