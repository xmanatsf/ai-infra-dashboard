/* Regenerates js/data.js and the CSV extracts from data/nsr_data.json.
   Run from the project root:  node tools/build-data.js  */
const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/nsr_data.json"), "utf8"));

fs.writeFileSync(
  path.join(root, "js/data.js"),
  "// Generated from data/nsr_data.json - regenerate with tools/build-data.js\nwindow.NSR = " +
    JSON.stringify(data, null, 1) + ";\n"
);

const esc = v => v == null ? "" :
  (String(v).includes(",") || String(v).includes('"') ? '"' + String(v).replace(/"/g, '""') + '"' : String(v));

const cols = ["metric", "segment", "company", "year", "value", "unit", "kind", "report", "page", "note"];
fs.writeFileSync(
  path.join(root, "data/datapoints.csv"),
  cols.join(",") + "\n" + data.datapoints.map(r => cols.map(c => esc(r[c])).join(",")).join("\n")
);

const seriesCsv = (file, header, rows) =>
  fs.writeFileSync(path.join(root, "data", file), [header, ...rows].join("\n"));

const cap = data.series.hyperscalerCapex;
seriesCsv("hyperscaler_capex.csv", "company,year,capex_usd_bn",
  cap.companies.flatMap(c => cap.years.map((y, i) => `${c.name},${y},${c.values[i]}`)));

const xpu = data.series.xpuMarket;
seriesCsv("xpu_market.csv", "vendor,year,revenue_usd_bn",
  xpu.vendors.flatMap(c => xpu.years.map((y, i) => `${esc(c.name)},${y},${c.values[i]}`)));

const cpu = data.series.serverCpuRevenue;
seriesCsv("server_cpu_revenue.csv", "vendor,year,revenue_usd_bn",
  cpu.vendors.flatMap(c => cpu.years.map((y, i) => `${c.name},${y},${c.values[i]}`)));

console.log("Regenerated js/data.js and data/*.csv");
