// Generated from data/nsr_data.json - regenerate with tools/build-data.js
window.NSR = {
 "meta": {
  "title": "AI Infrastructure Dashboard",
  "subtitle": "Synthesis of 13 New Street Research (NSR) reports, Jan-Jun 2026",
  "built": "2026-07-06",
  "coverage": "2015-2030, core focus 2024-2030",
  "disclaimer": "All data extracted from New Street Research (NSR) reports licensed to the user. NSR estimates unless noted as company guidance. For internal analysis only - do not redistribute."
 },
 "reports": [
  {
   "id": "ROIC",
   "date": "2026-01-28",
   "title": "What returns to expect on Cloud AI?",
   "file": "20260128-INDUSTRY-AI-ROIC-4.pdf",
   "theme": "ROI / economics"
  },
  {
   "id": "CAPEX-4Q25",
   "date": "2026-02-06",
   "title": "Hyperscalers to nearly double AI capex again in 2026",
   "file": "20260206-INDUSTRY-Hyperscaler-capex-tracker-4Q25-1.pdf",
   "theme": "Capex tracker"
  },
  {
   "id": "INFRA-I",
   "date": "2026-03-02",
   "title": "Grasping the AI Infra buildout (I): Who builds what, for whom?",
   "file": "20260302-INDUSTRY-AI-infra-series-I-who-builds-what-for-whom-5.pdf",
   "theme": "Buildout map"
  },
  {
   "id": "INFRA-II",
   "date": "2026-03-03",
   "title": "Grasping the AI Infra buildout (II): How is it financed?",
   "file": "20260303-INDUSTRY-AI-infra-series-II-How-is-it-financed-3.pdf",
   "theme": "Financing"
  },
  {
   "id": "INFRA-III",
   "date": "2026-03-04",
   "title": "Grasping the AI Infra buildout (III): Who will pay for cloud AI services?",
   "file": "20260304-INDUSTRY-AI-Infra-seires-III-Who-will-pay-for-cloud-3.pdf",
   "theme": "Cloud demand"
  },
  {
   "id": "INFRA-IV",
   "date": "2026-03-06",
   "title": "Grasping the AI Infra buildout (IV): How can hyperscalers swallow so much Capex?",
   "file": "20260305-INDUSTRY-AI-Infra-series-How-can-hyperscalers-swallow-so-much-Capex-3.pdf",
   "theme": "P&L absorption"
  },
  {
   "id": "TSMC-XPU",
   "date": "2026-03-09",
   "title": "Following the money: TSMC capex points to XPU revenues well above expectations in 2027/28",
   "file": "20260309-INDUSTRY-TSMC-Capex-implications-for-XPU.pdf",
   "theme": "Foundry / XPU TAM"
  },
  {
   "id": "CPU",
   "date": "2026-04-10",
   "title": "Server CPUs: A brave new world!",
   "file": "20260410-INDUSTRY-Server-CPU-Update.pdf",
   "theme": "Server CPU"
  },
  {
   "id": "CAPEX-1Q26",
   "date": "2026-04-30",
   "title": "Hyperscalers to double AI capex again in 2026 (1Q26 update)",
   "file": "20260430-INDUSTRY-Hyperscaler-capex-tracker-1Q26.pdf",
   "theme": "Capex tracker"
  },
  {
   "id": "REPLAT",
   "date": "2026-04-30",
   "title": "Hyperscaler replatforming: Here is how to answer the ROI question",
   "file": "20260430-INDUSTRY-Hyperscaler-replatforming-1Q26-3.pdf",
   "theme": "ROI / replatforming"
  },
  {
   "id": "AMD-1Q26",
   "date": "2026-05-06",
   "title": "AMD 1Q26: Agentic AI boosting CPUs; GPU ramp on track. Buy, TP $530",
   "file": "20260506-AMD-AMD-1FQ26-Earnings-vf.pdf",
   "theme": "Company - AMD"
  },
  {
   "id": "NVDA-CPU",
   "date": "2026-05-26",
   "title": "What does Nvidia's $20bn CPU guide imply for agentic CPU adoption?",
   "file": "20260526-NVDA-CPU-one-slider-3.pdf",
   "theme": "Company - Nvidia CPU"
  },
  {
   "id": "BIBLE-1Q26",
   "date": "2026-06-09",
   "title": "Quarterly Tech Bible 1Q26 - Hyperscale & Cloud",
   "file": "20260609-BIBLE-1Q26-Hyperscale-Cloud-1.pdf",
   "theme": "Quarterly synthesis"
  }
 ],
 "kpis": [
  {
   "label": "2026 total DC spending",
   "value": "$1.2tn",
   "sub": "All builders: hyperscalers, tier-2 cloud, enterprise",
   "source": "INFRA-I p.1"
  },
  {
   "label": "2026 hyperscaler capex",
   "value": "$675bn",
   "sub": "+78% YoY; AI portion $575bn, +100% YoY",
   "source": "CAPEX-1Q26 p.1"
  },
  {
   "label": "2026 XPU spending",
   "value": ">$390bn",
   "sub": ">+105% YoY (GPUs >$315bn, ASICs >$75bn)",
   "source": "CAPEX-1Q26 p.1"
  },
  {
   "label": "2030 XPU spend",
   "value": "$933bn",
   "sub": "35% CAGR 2025-30; in line with AMD's $1tn TAM guide",
   "source": "CPU p.4"
  },
  {
   "label": "2030 AI DC spending",
   "value": "$3-4tn",
   "sub": "Nvidia guidance, reiterated May-2026",
   "source": "BIBLE-1Q26 p.12"
  },
  {
   "label": "Public cloud growth 1Q26",
   "value": "+41% YoY",
   "sub": "AWS +28%, Google Cloud +63%, Azure +40%, OCI +85%",
   "source": "BIBLE-1Q26 p.5"
  }
 ],
 "series": {
  "hyperscalerCapex": {
   "years": [
    2024,
    2025,
    2026
   ],
   "note": "DC capex US$bn. 2026 = guidance/NSR estimate (Apr-2026 vintage).",
   "companies": [
    {
     "name": "Microsoft",
     "values": [
      76,
      118,
      190
     ]
    },
    {
     "name": "Google",
     "values": [
      53,
      91,
      185
     ]
    },
    {
     "name": "Amazon",
     "values": [
      62,
      100,
      165
     ]
    },
    {
     "name": "Meta",
     "values": [
      37,
      72,
      135
     ]
    }
   ],
   "aiVsNonAi": {
    "AI": [
     148,
     288,
     575
    ],
    "Non-AI": [
     80,
     92,
     100
    ]
   },
   "source": "CAPEX-1Q26 p.1"
  },
  "capexRevisions": {
   "note": "How NSR's 2026 estimates moved between the Feb-2026 (4Q25) and Apr-2026 (1Q26) trackers.",
   "rows": [
    {
     "metric": "Microsoft 2026 capex",
     "feb": 186,
     "apr": 190,
     "unit": "US$bn"
    },
    {
     "metric": "Google 2026 capex",
     "feb": 180,
     "apr": 185,
     "unit": "US$bn"
    },
    {
     "metric": "Meta 2026 capex",
     "feb": 125,
     "apr": 135,
     "unit": "US$bn"
    },
    {
     "metric": "Amazon 2026 capex",
     "feb": 165,
     "apr": 165,
     "unit": "US$bn"
    },
    {
     "metric": "Total 2026 capex",
     "feb": 656,
     "apr": 675,
     "unit": "US$bn"
    },
    {
     "metric": "2026 AI capex",
     "feb": 546,
     "apr": 575,
     "unit": "US$bn"
    },
    {
     "metric": "2026 AI capex growth",
     "feb": 90,
     "apr": 100,
     "unit": "% YoY"
    },
    {
     "metric": "2026 XPU total",
     "feb": 380,
     "apr": 390,
     "unit": "US$bn (floor)"
    },
    {
     "metric": "2026 Broadcom ASICs",
     "feb": 36,
     "apr": 48,
     "unit": "US$bn (floor)"
    }
   ],
   "source": "CAPEX-4Q25 p.1 vs CAPEX-1Q26 p.1"
  },
  "capexGrowthHistory": {
   "note": "Top-8 hyperscale group capex growth, consensus-implied for 2026/27 after 1Q26 revisions (+9%/+19% this season).",
   "years": [
    2022,
    2023,
    2024,
    2025,
    2026,
    2027
   ],
   "growth": [
    16,
    0,
    57,
    70,
    69,
    21
   ],
   "source": "BIBLE-1Q26 p.18"
  },
  "buildout2026": {
   "note": "2026 total DC spending $1.2tn - who spends, what model, who consumes (US$bn).",
   "whoSpends": [
    {
     "name": "Google",
     "value": 179,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "Amazon",
     "value": 170,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "Microsoft",
     "value": 164,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "Meta",
     "value": 125,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "Oracle",
     "value": 58,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "xAI",
     "value": 45,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "Bytedance",
     "value": 24,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "Others (HIF)",
     "value": 25,
     "group": "Hyperscalers, Internet & Frontier"
    },
    {
     "name": "Fluidstack",
     "value": 60,
     "group": "Tier 2 Cloud"
    },
    {
     "name": "CoreWeave",
     "value": 34,
     "group": "Tier 2 Cloud"
    },
    {
     "name": "Vantage",
     "value": 16,
     "group": "Tier 2 Cloud"
    },
    {
     "name": "CyrusOne",
     "value": 15,
     "group": "Tier 2 Cloud"
    },
    {
     "name": "Others (Tier 2)",
     "value": 183,
     "group": "Tier 2 Cloud"
    },
    {
     "name": "Tesla",
     "value": 12,
     "group": "Enterprise"
    },
    {
     "name": "Apple",
     "value": 6,
     "group": "Enterprise"
    },
    {
     "name": "Others (Enterprise)",
     "value": 81,
     "group": "Enterprise"
    }
   ],
   "model": [
    {
     "name": "Internal hyperscalers & other internet",
     "value": 390
    },
    {
     "name": "Cloud & Colo",
     "value": 710
    },
    {
     "name": "Enterprise internal",
     "value": 100
    }
   ],
   "whoConsumes": [
    {
     "name": "Hyperscale & Internet",
     "value": 450
    },
    {
     "name": "Frontier Labs",
     "value": 380
    },
    {
     "name": "Enterprise",
     "value": 370
    }
   ],
   "source": "INFRA-I p.1"
  },
  "financing2026": {
   "note": "How the $1.2tn 2026 buildout is financed (US$bn).",
   "items": [
    {
     "name": "Cash from operations",
     "value": 900
    },
    {
     "name": "Debt",
     "value": 250
    },
    {
     "name": "Equity",
     "value": 50
    }
   ],
   "source": "INFRA-II p.1"
  },
  "xpuMarket": {
   "years": [
    2024,
    2025,
    2026
   ],
   "note": "XPU revenues US$bn; 2026 values are floors ('>'). Apr-2026 vintage.",
   "vendors": [
    {
     "name": "Nvidia GPUs",
     "values": [
      102,
      157,
      300
     ]
    },
    {
     "name": "AMD & other GPUs",
     "values": [
      5,
      7,
      15
     ]
    },
    {
     "name": "Broadcom ASICs",
     "values": [
      8,
      12,
      48
     ]
    },
    {
     "name": "Other ASICs (Trainium, Ascend...)",
     "values": [
      3,
      13,
      27
     ]
    }
   ],
   "source": "CAPEX-1Q26 p.1"
  },
  "xpuTam": {
   "note": "XPU TAM US$bn, NSR (TSMC-capex-implied) vs consensus.",
   "years": [
    2023,
    2024,
    2025,
    2026,
    2027,
    2028
   ],
   "nsr": [
    45,
    124,
    202,
    405,
    600,
    835
   ],
   "consensus": [
    null,
    null,
    null,
    384,
    516,
    709
   ],
   "source": "TSMC-XPU p.1"
  },
  "xpuLongTerm": {
   "note": "XPU spend US$bn and dies (m), 2015-2030. 35% CAGR 2025-30 (7% die ASP, 25% die units).",
   "years": [
    2015,
    2020,
    2025,
    2030
   ],
   "spend": [
    0,
    7,
    205,
    933
   ],
   "dies": [
    0,
    2,
    18,
    60
   ],
   "aspPerDie": [
    2,
    3,
    11,
    16
   ],
   "source": "CPU p.4"
  },
  "tsmc": {
   "note": "TSMC capex-to-XPU-revenue conversion.",
   "rows": [
    {
     "metric": "Cumulative capex (yr n to n+2)",
     "c2023_25": "$100bn",
     "c2026_27": "$110bn"
    },
    {
     "metric": "Capex for wafer production",
     "c2023_25": "$87bn",
     "c2026_27": "$90bn"
    },
    {
     "metric": "Capex per 100k wspm",
     "c2023_25": "$25bn",
     "c2026_27": "$30bn"
    },
    {
     "metric": "Incremental wafer capacity (k wspm)",
     "c2023_25": "348",
     "c2026_27": "301"
    },
    {
     "metric": "Revenue per wafer (US$k)",
     "c2023_25": "23",
     "c2026_27": "28"
    },
    {
     "metric": "Incremental AI revenues (n to n+3)",
     "c2023_25": "$45bn",
     "c2026_27": "$60bn"
    },
    {
     "metric": "Implied incremental XPU revenues",
     "c2023_25": "$360bn",
     "c2026_27": "$430bn"
    },
    {
     "metric": "TSMC AI revenues as % of XPU revenues",
     "c2023_25": "13%",
     "c2026_27": "14%"
    }
   ],
   "source": "TSMC-XPU p.1"
  },
  "serverCpuRevenue": {
   "note": "Total server CPU revenues US$bn by vendor. 2030: Arm 44% share, Intel 29%, AMD 27%.",
   "years": [
    2015,
    2020,
    2025,
    2030
   ],
   "vendors": [
    {
     "name": "Intel",
     "values": [
      15,
      22,
      12,
      24
     ]
    },
    {
     "name": "AMD",
     "values": [
      0,
      1,
      9,
      22
     ]
    },
    {
     "name": "Arm",
     "values": [
      0,
      0,
      4,
      36
     ]
    }
   ],
   "source": "CPU p.8"
  },
  "aiCpuShare": {
   "note": "AI server CPU market share (%).",
   "years": [
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030
   ],
   "vendors": [
    {
     "name": "Arm",
     "values": [
      0,
      0,
      5,
      10,
      20,
      40,
      43,
      46,
      49,
      52,
      55
     ]
    },
    {
     "name": "AMD",
     "values": [
      5,
      10,
      15,
      45,
      40,
      26,
      25,
      25,
      23,
      22,
      21
     ]
    },
    {
     "name": "Intel",
     "values": [
      95,
      90,
      80,
      45,
      40,
      34,
      32,
      29,
      28,
      26,
      24
     ]
    }
   ],
   "source": "CPU p.5"
  },
  "cpuUnits": {
   "note": "Server CPU shipments (m units).",
   "years": [
    2015,
    2020,
    2025,
    2030
   ],
   "traditional": [
    21,
    22,
    13,
    17
   ],
   "traditionalCloud": [
    6,
    12,
    8,
    12
   ],
   "traditionalEnterprise": [
    15,
    10,
    5,
    5
   ],
   "ai": [
    0.04,
    0.5,
    4.9,
    30
   ],
   "source": "CPU p.2, p.4, p.6"
  },
  "cpuTam2030": {
   "note": "Server CPU TAM estimates. NSR bottom-up vs company claims made Apr-May 2026 (Bible: 'TAM estimates now range $100-200bn').",
   "rows": [
    {
     "name": "2026 market (NSR)",
     "value": 60,
     "who": "NSR",
     "detail": "Intel & AMD $35bn + Nvidia $20bn + other Arm $5bn",
     "source": "NVDA-CPU p.1"
    },
    {
     "name": "2030 NSR bottom-up",
     "value": 81,
     "who": "NSR",
     "detail": "26% CAGR 2025-30; Arm 44% / Intel 29% / AMD 27%",
     "source": "CPU p.8"
    },
    {
     "name": "2030 Arm claim (FY31)",
     "value": 100,
     "who": "Arm (Rene Haas)",
     "detail": "'~$100bn TAM for us' driven by agentic AI",
     "source": "BIBLE-1Q26 p.13"
    },
    {
     "name": "2030 AMD claim",
     "value": 120,
     "who": "AMD (Lisa Su)",
     "detail": ">35% CAGR; raised 2x vs Nov-25 CMD",
     "source": "BIBLE-1Q26 p.13"
    },
    {
     "name": "2030 Nvidia claim",
     "value": 200,
     "who": "Nvidia (Jensen Huang)",
     "detail": "'Vera opens a brand new $200bn TAM'",
     "source": "BIBLE-1Q26 p.13"
    }
   ]
  },
  "nvdaCpu2026": {
   "note": "Unpacking Nvidia's $20bn 2026 server CPU guide.",
   "rows": [
    {
     "metric": "Blackwell & Rubin GPU revenues",
     "value": "$300bn",
     "comment": "NSR forecast; excludes networking, Lovelace, CPUs"
    },
    {
     "metric": "ASP per XPU die",
     "value": "$15-20k",
     "comment": "$30/40k per Blackwell/Rubin package, 2 dies/package"
    },
    {
     "metric": "Implied GPU dies",
     "value": "15-20m",
     "comment": ""
    },
    {
     "metric": "Nvidia server CPU revenues",
     "value": "$20bn",
     "comment": "Guided at 1Q26 earnings"
    },
    {
     "metric": "ASP per CPU",
     "value": "$3-4k",
     "comment": "2-3x average traditional CPU ASP ($1.4k)"
    },
    {
     "metric": "Implied CPU units",
     "value": "5-7m",
     "comment": ""
    },
    {
     "metric": "Implied CPU-rack attach rate",
     "value": "33-53%",
     "comment": "CPU-only racks for agentic AI / RL workloads"
    },
    {
     "metric": "Total 2026 CPU market",
     "value": "$60bn",
     "comment": "Intel & AMD $35bn; Nvidia $20bn; other Arm $5bn"
    },
    {
     "metric": "Nvidia share of CPU revenues",
     "value": ">33%",
     "comment": "Ahead of NSR's prior expectations"
    }
   ],
   "source": "NVDA-CPU p.1"
  },
  "hyperscalerPnl": {
   "note": "Hyperscaler & internet company internal capex & P&L, US$bn (base case).",
   "rows": [
    {
     "metric": "Revenues",
     "y2026": 1900,
     "y2030": 2900,
     "cagr": "11%"
    },
    {
     "metric": "EBIT",
     "y2026": 480,
     "y2030": 710,
     "cagr": "11%"
    },
    {
     "metric": "Depreciation",
     "y2026": 130,
     "y2030": 410,
     "cagr": "35%"
    },
    {
     "metric": "Cash costs",
     "y2026": 1300,
     "y2030": 1790,
     "cagr": "8%"
    },
    {
     "metric": "Capex",
     "y2026": 450,
     "y2030": 850,
     "cagr": "17%"
    }
   ],
   "source": "INFRA-IV p.1"
  },
  "cloudPayback": {
   "note": "Who pays the $190bn incremental 2027 cloud revenues required to justify $710bn 2026 cloud capex (US$bn, midpoints where ranges given).",
   "items": [
    {
     "name": "OpenAI",
     "value": 46,
     "detail": "Compute spend $45bn to $91bn"
    },
    {
     "name": "Other enterprises",
     "value": 40,
     "detail": "$30-50bn, ~10% of enterprise IT spending growth"
    },
    {
     "name": "Native AI startups",
     "value": 35,
     "detail": "$25-45bn; raising $20-30bn VC in 2027"
    },
    {
     "name": "Anthropic",
     "value": 30,
     "detail": "Compute spend $25bn to $55bn"
    },
    {
     "name": "Hyperscalers renting",
     "value": 30,
     "detail": "From tier-2 or each other"
    },
    {
     "name": "Other labs",
     "value": 10,
     "detail": "Mistral, DeepSeek, Scale AI, SSI"
    }
   ],
   "source": "INFRA-III p.1"
  },
  "cloudEconomics": {
   "note": "Server-level cloud economics: traditional (2-CPU x86) vs AI (8-GPU Blackwell).",
   "rows": [
    {
     "metric": "Fully loaded investment",
     "cpu": "$21k",
     "gpu": "$667k"
    },
    {
     "metric": "of which compute",
     "cpu": "$12k (25% CPUs)",
     "gpu": "$400k (70% GPUs, 8x $35k)"
    },
    {
     "metric": "Networking",
     "cpu": "$3k",
     "gpu": "$87k"
    },
    {
     "metric": "Building, power & cooling",
     "cpu": "$6k (600W, $10/W)",
     "gpu": "$180k (18kW, $10/W)"
    },
    {
     "metric": "Annual revenues",
     "cpu": "$13.5k",
     "gpu": "$273k"
    },
    {
     "metric": "D&A (5y IT / 10y building)",
     "cpu": "$3.5k",
     "gpu": "$115k"
    },
    {
     "metric": "Cash costs (power, maintenance)",
     "cpu": "$2.5k",
     "gpu": "$35k"
    },
    {
     "metric": "Gross margin",
     "cpu": "55%",
     "gpu": "45%"
    },
    {
     "metric": "Gross cash return on gross assets",
     "cpu": "~50%",
     "gpu": "~35%"
    }
   ],
   "source": "ROIC p.3, p.7"
  },
  "oracleContract": {
   "note": "Oracle-OpenAI 4.5GW contract economics (US$bn). 12% IRR over contract; 20% over 10-year chip life.",
   "years": [
    2026,
    2027,
    2028,
    2029,
    2030,
    2031,
    2032,
    2033,
    2034,
    2035,
    2036,
    2037
   ],
   "revenues": [
    0,
    30,
    60,
    60,
    60,
    60,
    60,
    45,
    30,
    30,
    30,
    15
   ],
   "fcf": [
    -82,
    -59,
    45,
    45,
    45,
    45,
    45,
    30,
    15,
    15,
    15,
    8
   ],
   "grossMargin": [
    null,
    30,
    30,
    30,
    30,
    30,
    30,
    36,
    50,
    50,
    50,
    50
   ],
   "source": "ROIC p.5, p.10"
  },
  "replatforming": {
   "note": "2026E YoY growth (%). ROI test: cash costs growing slower than revenues make room for surging D&A.",
   "metrics": [
    "Revenues",
    "D&A",
    "Cash cost & SBC",
    "Operating income"
   ],
   "companies": [
    {
     "name": "Microsoft",
     "values": [
      16,
      65,
      5,
      16
     ],
     "verdict": "Healthy - D&A up 65% absorbed; tends to beat"
    },
    {
     "name": "Google",
     "values": [
      20,
      66,
      13,
      27
     ],
     "verdict": "Healthy - meaningful margin expansion"
    },
    {
     "name": "Amazon",
     "values": [
      15,
      31,
      12,
      21
     ],
     "verdict": "Healthy - room for margin expansion"
    },
    {
     "name": "Meta",
     "values": [
      26,
      58,
      35,
      7
     ],
     "verdict": "Overspending - cash costs outgrow revenues, margins squeezed"
    }
   ],
   "source": "REPLAT p.1"
  },
  "azureAiMargins": {
   "note": "Azure AI gross margins estimated from incremental Intelligent Cloud gross profit.",
   "rows": [
    {
     "segment": "Azure AI overall",
     "gm": "25-30%",
     "detail": "In line with neo-clouds (CoreWeave)"
    },
    {
     "segment": "of which OpenAI",
     "gm": "<20%",
     "detail": "~30% of Azure AI revenues; near break-even 3FQ25"
    },
    {
     "segment": "Other AI customers",
     "gm": "30-40%",
     "detail": ""
    },
    {
     "segment": "Azure non-AI",
     "gm": "~60%",
     "detail": "Pre-AI-era margin structure"
    },
    {
     "segment": "AI margins over time",
     "gm": "40-50%",
     "detail": "Scale + enterprise mix shift"
    }
   ],
   "source": "ROIC p.6"
  },
  "amdModel": {
   "note": "AMD NSR model, US$bn revenue by segment (post-1Q26 revision).",
   "years": [
    2025,
    2026,
    2027,
    2028,
    2029,
    2030
   ],
   "segments": [
    {
     "name": "Datacenter GPU",
     "values": [
      null,
      15.1,
      34.7,
      51.3,
      69.3,
      90.1
     ]
    },
    {
     "name": "Datacenter CPU & other (Enterprise + Xilinx DC)",
     "values": [
      null,
      15.9,
      22.1,
      28.6,
      35.7,
      41
     ]
    },
    {
     "name": "Client",
     "values": [
      10.6,
      11.8,
      12,
      12.3,
      12.5,
      12.8
     ]
    },
    {
     "name": "Gaming + Embedded",
     "values": [
      7.4,
      6.7,
      7.7,
      9.2,
      10.9,
      11.8
     ]
    }
   ],
   "totals": [
    34.6,
    49.5,
    76.5,
    101.4,
    128.3,
    155.7
   ],
   "eps": [
    4.17,
    7.33,
    13.21,
    18.07,
    23.53,
    29.21
   ],
   "dcTotal": [
    16.6,
    31,
    56.8,
    79.9,
    105,
    131.1
   ],
   "source": "AMD-1Q26 p.8-9, p.14"
  },
  "quarterMomentum": {
   "note": "1Q26 momentum snapshot from the Quarterly Bible.",
   "rows": [
    {
     "metric": "Hyperscale revenues (top-8)",
     "value": "+19% YoY",
     "detail": "Accelerated 3pts, driven by public cloud"
    },
    {
     "metric": "Hyperscale capex",
     "value": "+88% YoY",
     "detail": "Accelerated 20pts"
    },
    {
     "metric": "Public cloud revenues",
     "value": "+41% YoY",
     "detail": "AWS +28%, GCP +63%, Azure +40%, OCI +85%"
    },
    {
     "metric": "DC compute semis",
     "value": "+75% YoY",
     "detail": "XPUs +80%, CPUs +37%; 2Q26E +106%"
    },
    {
     "metric": "Nvidia DC networking",
     "value": "~3x YoY",
     "detail": "$15bn in the quarter; Spectrum-X > all Ethernet peers combined"
    },
    {
     "metric": "2026 capex expectations",
     "value": "+9% revision",
     "detail": "Now implies +69% YoY growth"
    },
    {
     "metric": "2027 capex expectations",
     "value": "+19% revision",
     "detail": "Now implies +21% YoY growth - and rising"
    },
    {
     "metric": "2026/27 DC semi expectations",
     "value": "+8% / +16%",
     "detail": "Imply +83% / +48% growth"
    }
   ],
   "source": "BIBLE-1Q26 p.3, p.5-6, p.18-19"
  },
  "supplyConstraints": {
   "note": "Supply constraint severity by layer, per company commentary. 2 = severe/sold out, 1 = constrained, 0 = balanced.",
   "years": [
    "2026",
    "2027",
    "2028"
   ],
   "rows": [
    {
     "layer": "XPUs / GPUs",
     "values": [
      2,
      1,
      1
     ],
     "evidence": "Nvidia 'demand has gone parabolic'; revenue gated by supply; $1tn Blackwell+Rubin 2025-27",
     "source": "BIBLE-1Q26 p.12"
    },
    {
     "layer": "HBM",
     "values": [
      2,
      2,
      1
     ],
     "evidence": "Samsung HBM4 sold out, revenues >3x in 2026; Hynix: demand exceeds supply for next 3 years",
     "source": "BIBLE-1Q26 p.14"
    },
    {
     "layer": "General DRAM",
     "values": [
      2,
      1,
      0
     ],
     "evidence": "Hynix 'severe supply shortage'; Micron: tight beyond 2026, new fabs only impact late 2027/2028",
     "source": "BIBLE-1Q26 p.15"
    },
    {
     "layer": "Networking (Ethernet)",
     "values": [
      2,
      1,
      0
     ],
     "evidence": "Arista supply-constrained 'next couple of years'; Cisco AI orders 4.5x to $9bn",
     "source": "BIBLE-1Q26 p.16"
    },
    {
     "layer": "Optics / interconnect",
     "values": [
      2,
      2,
      1
     ],
     "evidence": "Lumentum EML imbalance >30%, CPO >$5bn upside; Coherent orders into 2028, LTAs to 2030; InP constrained",
     "source": "BIBLE-1Q26 p.18"
    },
    {
     "layer": "Server CPUs",
     "values": [
      1,
      1,
      0
     ],
     "evidence": "Intel: demand ahead of supply for Xeon through 2027",
     "source": "BIBLE-1Q26 p.13"
    },
    {
     "layer": "Foundry (TSMC allocation)",
     "values": [
      1,
      1,
      1
     ],
     "evidence": "'TSMC allocation the key variable to watch for compute and networking names'",
     "source": "BIBLE-1Q26 p.26"
    },
    {
     "layer": "Cloud capacity (sellable)",
     "values": [
      2,
      1,
      0
     ],
     "evidence": "Google, Microsoft, Amazon all demand-constrained; Microsoft constrained 'at least through 2026'",
     "source": "BIBLE-1Q26 p.9"
    }
   ]
  },
  "techTransitions": [
   {
    "name": "Rack-scale AI systems",
    "status": "Deployed at scale",
    "detail": "Vera Rubin platform: 16 GPU racks (72 Rubin GPUs, 2 dies each, 36 Vera CPUs per rack) + 2 standalone CPU racks (256 chips each).",
    "implication": "System-level integration keeps Nvidia's moat; ASP per XPU die rises 7%/yr as dies per package double (Rubin Ultra).",
    "source": "CPU p.3-4"
   },
   {
    "name": "Agentic AI CPU racks",
    "status": "Inflecting 2026",
    "detail": "CPU:GPU-die ratio doubling from 1:4 to 1:2 in one generation; CPU-only racks at 33-53% attach; Nvidia CPU share >30% in year one.",
    "implication": "New $100-200bn TAM claims; Arm the structural winner (55% AI CPU share by 2030).",
    "source": "CPU p.3, NVDA-CPU p.1, BIBLE-1Q26 p.13"
   },
   {
    "name": "Custom ASICs (XPU)",
    "status": "Accelerating",
    "detail": "ASIC spend $25bn 2025 to >$75bn 2026. Broadcom: 10GW shipping 2027, 20GW OpenAI+Anthropic through 2028 via AI XPV platform (Apollo, Blackstone).",
    "implication": "ASICs grow faster than GPUs but off a smaller base; Google-Marvell talks show programs multiplying.",
    "source": "CAPEX-1Q26 p.1, BIBLE-1Q26 p.12"
   },
   {
    "name": "HBM4",
    "status": "Sold out",
    "detail": "Samsung HBM revenues >3x in 2026, production capacity fully booked; Hynix constrained 3 years out.",
    "implication": "Memory is the tightest bottleneck; favorable pricing 'for the time being' (Hynix).",
    "source": "BIBLE-1Q26 p.14-15"
   },
   {
    "name": "Optical networking / CPO",
    "status": "Constraint emerging",
    "detail": "800G at >100 customers (Arista); 1.6T production scale 2027; co-packaged optics >$5bn incremental opportunity (Lumentum); indium phosphide industry-wide constraint.",
    "implication": "Optics visibility extends to 2028-2030 LTAs; value capture moving into the interconnect.",
    "source": "BIBLE-1Q26 p.16-18"
   },
   {
    "name": "Ethernet for AI (scale-out)",
    "status": "Ramping",
    "detail": "Nvidia Spectrum-X larger than all Ethernet peers combined; InfiniBand +4x YoY; Cisco hyperscale AI orders $9bn FY26.",
    "implication": "Ethernet wins the scale-out layer; Arista/Cisco both supply-gated, not demand-gated.",
    "source": "BIBLE-1Q26 p.16"
   },
   {
    "name": "Foundry node & capacity",
    "status": "Structural gate",
    "detail": "TSMC adding ~301k wspm for $90bn wafer capex 2026-27; revenue per wafer rising $23k to $28k; capex per 100k wspm up $25bn to $30bn.",
    "implication": "TSMC capex implies $430bn incremental XPU revenues 2026-28, 15-20% above consensus - the supply chain is planning for more than the market models.",
    "source": "TSMC-XPU p.1"
   },
   {
    "name": "Traditional cloud CPU refresh",
    "status": "Recovery started",
    "detail": "Cloud CPU units recover to 2020 peak by ~2030 (8% CAGR); very tight capacity after 5 years of AI-first spending; agentic AI adds database/search/web load.",
    "implication": "Multi-year refresh cycle benefits Intel, AMD and Arm simultaneously - 'CPU is a good place to be'.",
    "source": "CPU p.2, p.9"
   }
  ],
  "vendors": [
   {
    "name": "Nvidia",
    "ticker": "NVDA",
    "segment": "GPU / systems / networking / CPU",
    "rating": "Buy (Best idea)",
    "tp": "$340",
    "positioning": "DC GPUs $157bn 2025 to >$300bn 2026; $1tn Blackwell+Rubin revenue 2025-27; networking ~3x YoY; new $20bn CPU line (>33% share year one). Consensus reflects only March-2026 order visibility.",
    "risks": "ASIC encroachment; supply gates revenue; customer concentration.",
    "source": "BIBLE-1Q26 p.26, CAPEX-1Q26 p.1, NVDA-CPU p.1"
   },
   {
    "name": "AMD",
    "ticker": "AMD",
    "segment": "GPU / CPU",
    "rating": "Buy (Best idea)",
    "tp": "$530",
    "positioning": "MI450 on track 2H26; 6GW Meta deployment; path to >10% DC GPU share by 2030 ($90bn revenue); server CPU share 46% and rising; NSR models $155.7bn revenue / $29.21 EPS in 2030.",
    "risks": "DC GPU share only 4% in 1Q26 (China hit); initial MI450 supply concentrated in few suppliers.",
    "source": "AMD-1Q26 p.1-9, BIBLE-1Q26 p.26"
   },
   {
    "name": "Broadcom",
    "ticker": "AVGO",
    "segment": "Custom ASIC / networking",
    "rating": "Buy",
    "tp": "$600",
    "positioning": "ASIC revenues $12bn 2025 to >$48bn 2026; 10GW shipments 2027 intact; 20GW OpenAI+Anthropic deal through 2028 extends visibility.",
    "risks": "Google reportedly in talks with Marvell for two new AI chips.",
    "source": "BIBLE-1Q26 p.12, p.26, CAPEX-1Q26 p.1-2"
   },
   {
    "name": "Arm",
    "ticker": "ARM",
    "segment": "CPU IP / first-party silicon",
    "rating": "Buy",
    "tp": "$250",
    "positioning": "Primary beneficiary of the CPU inflection: AI CPU share 40% to 55% by 2030; server CPU revenues $0.2bn to $13-17bn (1P CPUs $10-15bn); EPS $7-9 by 2031; claims $100bn TAM.",
    "risks": "Increasingly priced in; enterprise compatibility headwind.",
    "source": "CPU p.5-9, BIBLE-1Q26 p.13, p.26"
   },
   {
    "name": "Intel",
    "ticker": "INTC",
    "segment": "CPU / foundry",
    "rating": "Neutral",
    "tp": "$80",
    "positioning": "Server CPU revenues recover $12bn to $24bn by 2030 (14% CAGR) on the traditional refresh; Xeon supply-constrained; Nvidia partnership ($5bn stake, NVLink integration) helps.",
    "risks": "Structural share loss continues in AI servers (34% to 24%) and x86 (AMD at 46-47%); turnaround largely priced in.",
    "source": "CPU p.8-9, BIBLE-1Q26 p.13, p.21, p.26"
   },
   {
    "name": "TSMC",
    "ticker": "TSM",
    "segment": "Foundry",
    "rating": "Buy",
    "tp": "TWD 2,780",
    "positioning": "The structural gate on the whole buildout. Capex plan implies $430bn incremental XPU revenues 2026-28 (15-20% above consensus); AI revenues steady at 13-14% of XPU revenues. Preferred leading-edge pick over Micron.",
    "risks": "Allocation decisions become the key swing factor for every compute/networking name.",
    "source": "TSMC-XPU p.1, BIBLE-1Q26 p.26"
   },
   {
    "name": "Marvell",
    "ticker": "MRVL",
    "segment": "Custom ASIC / optics DSP",
    "rating": "(covered, no rating in these reports)",
    "tp": "-",
    "positioning": "DC business to grow ~50% FY27; interconnect guide raised to +70% YoY; reportedly in talks with Google for two new AI chips.",
    "risks": "Custom-compute wins lumpy.",
    "source": "BIBLE-1Q26 p.18, CAPEX-1Q26 p.2"
   },
   {
    "name": "Arista",
    "ticker": "ANET",
    "segment": "Networking (Ethernet)",
    "rating": "Buy",
    "tp": "$175",
    "positioning": "AI target raised to $3.5bn 2026 (>2x YoY); >100 customers at 800G; 1.6T at production scale 2027; AI clusters pull front-end upgrades (1:1 attach).",
    "risks": "Supply-constrained for 'the next couple of years'; decommits from component shortages.",
    "source": "BIBLE-1Q26 p.16-17, p.26"
   },
   {
    "name": "Cisco",
    "ticker": "CSCO",
    "segment": "Networking",
    "rating": "(covered)",
    "tp": "-",
    "positioning": "Hyperscale AI orders 4.5x to ~$9bn FY26; at least $6bn AI revenue FY27; enterprise orders +18%.",
    "risks": "Hyperscaler share vs Arista/Nvidia.",
    "source": "BIBLE-1Q26 p.16-17"
   },
   {
    "name": "SK Hynix",
    "ticker": "000660.KS",
    "segment": "Memory / HBM",
    "rating": "(covered)",
    "tp": "-",
    "positioning": "HBM leader; customer demand for next 3 years exceeds current capacity; severe general DRAM shortage supports pricing.",
    "risks": "Capacity additions industry-wide land 2027-28.",
    "source": "BIBLE-1Q26 p.14-15"
   },
   {
    "name": "Samsung Memory",
    "ticker": "005930.KS",
    "segment": "Memory / HBM",
    "rating": "(covered)",
    "tp": "-",
    "positioning": "HBM revenues >3x in 2026; HBM4 production-ready capacity fully booked and sold out; overall supply shortage persists given fab lead times.",
    "risks": "HBM share catch-up vs Hynix.",
    "source": "BIBLE-1Q26 p.14-15"
   },
   {
    "name": "Micron",
    "ticker": "MU",
    "segment": "Memory / HBM",
    "rating": "Neutral",
    "tp": "$345",
    "positioning": "Record revenues across DRAM/NAND/HBM; tight supply beyond 2026; new cleanrooms only add meaningful supply late 2027 into 2028.",
    "risks": "NSR prefers TSMC in leading-edge manufacturing.",
    "source": "BIBLE-1Q26 p.14-15, p.26"
   },
   {
    "name": "Coherent",
    "ticker": "COHR",
    "segment": "Optics",
    "rating": "(covered)",
    "tp": "-",
    "positioning": "Orders reaching into calendar 2028, LTAs to end of decade; expanding capacity against industry-wide indium phosphide constraint.",
    "risks": "Capacity execution.",
    "source": "BIBLE-1Q26 p.18"
   },
   {
    "name": "Lumentum",
    "ticker": "LITE",
    "segment": "Optics",
    "rating": "(covered)",
    "tp": "-",
    "positioning": "EML supply-demand imbalance >30%; CPO ramp could add >$5bn incremental revenue if executed.",
    "risks": "Cannot service current demand.",
    "source": "BIBLE-1Q26 p.18"
   },
   {
    "name": "Oracle",
    "ticker": "ORCL",
    "segment": "Cloud (AI IaaS)",
    "rating": "(analyzed)",
    "tp": "-",
    "positioning": "$58bn 2026 capex; OpenAI 4.5GW contract: ~$300bn revenues 2H27-1H32 at ~30% GM, 12% contract IRR, ~20% over full chip life; OCI +85% YoY.",
    "risks": "Capital intensity; concentration on OpenAI.",
    "source": "INFRA-I p.1, ROIC p.5, p.10, BIBLE-1Q26 p.5"
   },
   {
    "name": "Microsoft",
    "ticker": "MSFT",
    "segment": "Hyperscaler",
    "rating": "(analyzed)",
    "tp": "-",
    "positioning": "2026 capex ~$190bn (+61%); replatforming healthiest: D&A +65% absorbed with cash costs +5% vs revenues +16%; Azure +40%, constrained through 2026.",
    "risks": "OpenAI AI margins <20% dilute Azure AI GM (25-30%).",
    "source": "CAPEX-1Q26 p.1, REPLAT p.1, ROIC p.6, BIBLE-1Q26 p.9-10"
   },
   {
    "name": "Google / Alphabet",
    "ticker": "GOOGL",
    "segment": "Hyperscaler / TPU",
    "rating": "(analyzed)",
    "tp": "-",
    "positioning": "2026 capex $175-185bn (>2x), 2027 'significantly higher'; GCP +63%; TPU deployments driving AI infra growth; margin expansion despite D&A +66%.",
    "risks": "Compute-constrained near term.",
    "source": "CAPEX-1Q26 p.1, BIBLE-1Q26 p.5, p.8-10, REPLAT p.1"
   },
   {
    "name": "Amazon / AWS",
    "ticker": "AMZN",
    "segment": "Hyperscaler / Trainium",
    "rating": "(analyzed)",
    "tp": "-",
    "positioning": "2026 capex $165bn (+56%); AWS +28% with 'customer commitments for a substantial portion' of new capacity; Trainium in 'all other ASICs' >$27bn pool.",
    "risks": "D&A +31% needs continued cash-cost discipline.",
    "source": "CAPEX-1Q26 p.1, BIBLE-1Q26 p.8-10, REPLAT p.1"
   },
   {
    "name": "Meta",
    "ticker": "META",
    "segment": "Internet / AI buyer",
    "rating": "(analyzed)",
    "tp": "-",
    "positioning": "2026 capex $125-145bn (+88% mid); 6GW AMD deployment; AI driving engineer productivity, headcount reduction planned.",
    "risks": "The only hyperscaler overspending: cash costs +35% vs revenues +26%, operating income +7%.",
    "source": "CAPEX-1Q26 p.1, REPLAT p.1, BIBLE-1Q26 p.10-11"
   }
  ],
  "insights": [
   {
    "title": "Capex doubling is real, funded, and still being revised up",
    "text": "2026 hyperscaler AI capex doubles to $575bn (vs $546bn expected in February) and consensus 2027 expectations rose 19% in one earnings season. 75% of the $1.2tn buildout is self-funded from operating cash flow; only 20% is debt, and most of that is backstopped by hyperscalers, SoftBank or governments - meaning leverage capacity remains untapped.",
    "sources": "CAPEX-4Q25 p.1, CAPEX-1Q26 p.1, INFRA-II p.1, BIBLE-1Q26 p.18"
   },
   {
    "title": "The supply chain is planning for more demand than the market models",
    "text": "TSMC's own capex implies $430bn of incremental XPU revenues over 2026-28, putting 2027/28 XPU TAM 15-20% above sell-side consensus ($600bn vs $516bn in 2027; $835bn vs $709bn in 2028). Follow the foundry money, not the models.",
    "sources": "TSMC-XPU p.1"
   },
   {
    "title": "Agentic AI created a second compute market overnight",
    "text": "Between Feb and May 2026, server CPUs went from afterthought to a $100-200bn 2030 TAM debate. The CPU:GPU-die ratio doubles to 1:2 with Vera Rubin's standalone CPU racks (33-53% attach in year one), Nvidia took >33% CPU revenue share instantly, and AMD raised its TAM 2x in six months. NSR's bottom-up is more conservative ($81bn) - but every scenario makes Arm the biggest winner (44-55% share).",
    "sources": "CPU p.3-9, NVDA-CPU p.1, BIBLE-1Q26 p.13"
   },
   {
    "title": "ASICs are scaling faster than GPUs - but from one quarter the size",
    "text": "ASIC spend triples in 2026 (>$75bn, +200%) vs GPUs roughly doubling (>$315bn). Broadcom alone quadruples to >$48bn with 20GW committed for OpenAI and Anthropic through 2028. Yet Nvidia still captures ~77% of all XPU dollars in 2026, and its OpenAI deal plus Google-Marvell talks show the GPU/ASIC boundary is fluid, not zero-sum.",
    "sources": "CAPEX-1Q26 p.1, BIBLE-1Q26 p.12"
   },
   {
    "title": "Cloud AI returns are lower than traditional cloud - but the bear case ignores chip longevity",
    "text": "AI cloud earns ~35% gross cash returns on assets vs ~50% for traditional cloud, with gross margins of 25-45% vs 55-60%. The Oracle-OpenAI contract yields only 12% IRR over the contract - but 20% over the 10-year real life of GPUs, since post-depreciation compute costs little more than electricity. The 5-6-year amortization convention understates true economics.",
    "sources": "ROIC p.3-10"
   },
   {
    "title": "The $190bn cloud revenue bill for 2027 is largely spoken for",
    "text": "Justifying $710bn of 2026 cloud capex requires $190bn incremental 2027 cloud revenues. NSR identifies most of it: OpenAI $46bn, Anthropic $30bn, other labs $10bn, native AI $25-45bn, enterprises $30-50bn, hyperscalers renting $30bn. >75% comes from frontier labs, native AI and hyperscalers themselves - concentrated, but visible.",
    "sources": "INFRA-III p.1"
   },
   {
    "title": "Replatforming math works for three of four hyperscalers",
    "text": "Microsoft, Google and Amazon absorb 31-66% D&A growth because cash costs grow 3-7pts slower than revenues (AI-driven efficiency in ads and coding). Meta is the outlier: cash costs +35% vs revenues +26% means margins compress - the only hyperscaler NSR flags as overspending.",
    "sources": "REPLAT p.1, INFRA-IV p.1"
   },
   {
    "title": "Everything is supply-gated; memory and optics are the tightest",
    "text": "Every layer - XPUs, HBM, DRAM, Ethernet, optics, CPUs, cloud capacity itself - is constrained through at least 2026. HBM is sold out (Samsung >3x, capacity fully booked; Hynix constrained 3 years). Optics LTAs extend to 2030 with >30% EML shortfall. TSMC allocation is the single variable that decides who converts demand into revenue.",
    "sources": "BIBLE-1Q26 p.3, p.9, p.12-18, p.26"
   },
   {
    "title": "~70% of 2026 infrastructure serves frontier labs and internet internal workloads",
    "text": "Of $1.2tn 2026 DC spending, frontier labs consume ~$380bn and hyperscale/internet internal workloads ~$450bn. Most tier-2 clouds effectively build for hyperscalers or frontier labs - so the marginal buyer of compute is a small set of very large, fast-growing counterparties. Concentration is the central fragility.",
    "sources": "INFRA-I p.1"
   },
   {
    "title": "NSR positioning: Nvidia and AMD best ideas; Arm, Broadcom, Arista, TSMC buys",
    "text": "As of June 2026: Nvidia Buy $340 (consensus embeds no post-March order upside), AMD Buy $530 ($29 EPS 2030), Arm Buy $250, Broadcom Buy $600, Arista Buy $175, TSMC Buy TWD2,780 preferred over Micron (Neutral $345); Intel Neutral $80 - turnaround real but priced.",
    "sources": "BIBLE-1Q26 p.26, AMD-1Q26 p.1"
   }
  ]
 },
 "datapoints": [
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Microsoft",
   "year": 2024,
   "value": 76,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Microsoft",
   "year": 2025,
   "value": 118,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Microsoft",
   "year": 2026,
   "value": 190,
   "unit": "US$bn",
   "kind": "guide",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "1Q26 guide; was $186bn in Feb-26 tracker"
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Google",
   "year": 2024,
   "value": 53,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Google",
   "year": 2025,
   "value": 91,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Google",
   "year": 2026,
   "value": 185,
   "unit": "US$bn",
   "kind": "guide",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "1Q26 guide $175-185bn; was $180bn in Feb-26 tracker"
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Meta",
   "year": 2024,
   "value": 37,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Meta",
   "year": 2025,
   "value": 72,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Meta",
   "year": 2026,
   "value": 135,
   "unit": "US$bn",
   "kind": "guide",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "Guide $125-145bn; was $125bn in Feb-26 tracker"
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Amazon",
   "year": 2024,
   "value": 62,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Amazon",
   "year": 2025,
   "value": 100,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "DC capex",
   "segment": "Cloud capex",
   "company": "Amazon",
   "year": 2026,
   "value": 165,
   "unit": "US$bn",
   "kind": "guide",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "4Q25 guide, unchanged (+56% YoY)"
  },
  {
   "metric": "DC capex - total top 4",
   "segment": "Cloud capex",
   "company": "Top-4 hyperscalers",
   "year": 2026,
   "value": 675,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "+78% YoY; Feb-26 vintage was $656bn"
  },
  {
   "metric": "AI capex",
   "segment": "Cloud capex",
   "company": "Top-4 hyperscalers",
   "year": 2025,
   "value": 288,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "+95% YoY"
  },
  {
   "metric": "AI capex",
   "segment": "Cloud capex",
   "company": "Top-4 hyperscalers",
   "year": 2026,
   "value": 575,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "+100% YoY; Feb-26 vintage was $546bn (+90%)"
  },
  {
   "metric": "Total DC spending",
   "segment": "Buildout",
   "company": "All builders",
   "year": 2026,
   "value": 1200,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-I",
   "page": 1,
   "note": "Hyperscalers/internet/frontier ~$790bn + tier-2 ~$310bn + enterprise ~$100bn"
  },
  {
   "metric": "DC spending",
   "segment": "Buildout",
   "company": "Oracle",
   "year": 2026,
   "value": 58,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-I",
   "page": 1
  },
  {
   "metric": "DC spending",
   "segment": "Buildout",
   "company": "xAI",
   "year": 2026,
   "value": 45,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-I",
   "page": 1
  },
  {
   "metric": "DC spending",
   "segment": "Buildout",
   "company": "Fluidstack",
   "year": 2026,
   "value": 60,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-I",
   "page": 1
  },
  {
   "metric": "DC spending",
   "segment": "Buildout",
   "company": "CoreWeave",
   "year": 2026,
   "value": 34,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-I",
   "page": 1
  },
  {
   "metric": "DC spending",
   "segment": "Buildout",
   "company": "Bytedance",
   "year": 2026,
   "value": 24,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-I",
   "page": 1
  },
  {
   "metric": "Consumption by frontier labs",
   "segment": "Buildout",
   "company": "Frontier labs",
   "year": 2026,
   "value": 380,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-I",
   "page": 1
  },
  {
   "metric": "Financing - cash from operations",
   "segment": "Financing",
   "company": "All builders",
   "year": 2026,
   "value": 900,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-II",
   "page": 1
  },
  {
   "metric": "Financing - debt",
   "segment": "Financing",
   "company": "All builders",
   "year": 2026,
   "value": 250,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-II",
   "page": 1,
   "note": "Mostly backstopped by hyperscalers, SoftBank, government agencies"
  },
  {
   "metric": "Financing - equity",
   "segment": "Financing",
   "company": "All builders",
   "year": 2026,
   "value": 50,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-II",
   "page": 1,
   "note": "~20% xAI, rest tier-2 cloud"
  },
  {
   "metric": "GPU revenues",
   "segment": "GPU",
   "company": "Nvidia",
   "year": 2024,
   "value": 102,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "GPU revenues",
   "segment": "GPU",
   "company": "Nvidia",
   "year": 2025,
   "value": 157,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "GPU revenues",
   "segment": "GPU",
   "company": "Nvidia",
   "year": 2026,
   "value": 300,
   "unit": "US$bn (floor)",
   "kind": "guide",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "'Jensen's guide'; Blackwell+Rubin only, ex networking"
  },
  {
   "metric": "GPU revenues",
   "segment": "GPU",
   "company": "AMD & others",
   "year": 2026,
   "value": 15,
   "unit": "US$bn (floor)",
   "kind": "estimate",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "OpenAI ramp in 2H26"
  },
  {
   "metric": "ASIC revenues",
   "segment": "XPU/ASIC",
   "company": "Broadcom",
   "year": 2025,
   "value": 12,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CAPEX-1Q26",
   "page": 1
  },
  {
   "metric": "ASIC revenues",
   "segment": "XPU/ASIC",
   "company": "Broadcom",
   "year": 2026,
   "value": 48,
   "unit": "US$bn (floor)",
   "kind": "guide",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "'Hock's guide'; Feb-26 vintage was >$36bn"
  },
  {
   "metric": "ASIC revenues",
   "segment": "XPU/ASIC",
   "company": "Other ASICs",
   "year": 2026,
   "value": 27,
   "unit": "US$bn (floor)",
   "kind": "estimate",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": "Trainium, Ascend, etc."
  },
  {
   "metric": "XPU total",
   "segment": "XPU/ASIC",
   "company": "Market",
   "year": 2026,
   "value": 390,
   "unit": "US$bn (floor)",
   "kind": "estimate",
   "report": "CAPEX-1Q26",
   "page": 1,
   "note": ">+105% YoY"
  },
  {
   "metric": "XPU TAM (NSR)",
   "segment": "XPU/ASIC",
   "company": "Market",
   "year": 2027,
   "value": 600,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "TSMC-XPU",
   "page": 1,
   "note": "Consensus $516bn - NSR 16% above"
  },
  {
   "metric": "XPU TAM (NSR)",
   "segment": "XPU/ASIC",
   "company": "Market",
   "year": 2028,
   "value": 835,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "TSMC-XPU",
   "page": 1,
   "note": "Consensus $709bn - NSR 18% above"
  },
  {
   "metric": "XPU spend",
   "segment": "XPU/ASIC",
   "company": "Market",
   "year": 2030,
   "value": 933,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CPU",
   "page": 4,
   "note": "35% CAGR 2025-30; in line with AMD's $1tn TAM"
  },
  {
   "metric": "XPU dies",
   "segment": "XPU/ASIC",
   "company": "Market",
   "year": 2030,
   "value": 60,
   "unit": "m units",
   "kind": "estimate",
   "report": "CPU",
   "page": 4,
   "note": "25% unit CAGR; ASP per die $16k"
  },
  {
   "metric": "TSMC incremental XPU revenues 2026-28",
   "segment": "Foundry",
   "company": "TSMC",
   "year": 2028,
   "value": 430,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "TSMC-XPU",
   "page": 1,
   "note": "From $110bn 2026-27 capex; 18% above consensus"
  },
  {
   "metric": "Incremental wafer capacity 2026-27",
   "segment": "Foundry",
   "company": "TSMC",
   "year": 2027,
   "value": 301,
   "unit": "k wspm",
   "kind": "estimate",
   "report": "TSMC-XPU",
   "page": 1
  },
  {
   "metric": "Revenue per wafer",
   "segment": "Foundry",
   "company": "TSMC",
   "year": 2027,
   "value": 28,
   "unit": "US$k",
   "kind": "estimate",
   "report": "TSMC-XPU",
   "page": 1,
   "note": "Up from $23k in 2023-25 window"
  },
  {
   "metric": "Server CPU revenues (total)",
   "segment": "CPU",
   "company": "Market",
   "year": 2025,
   "value": 25,
   "unit": "US$bn",
   "kind": "actual",
   "report": "CPU",
   "page": 8
  },
  {
   "metric": "Server CPU revenues (total)",
   "segment": "CPU",
   "company": "Market",
   "year": 2026,
   "value": 60,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "NVDA-CPU",
   "page": 1,
   "note": "Intel & AMD $35bn, Nvidia $20bn, other Arm $5bn"
  },
  {
   "metric": "Server CPU revenues (total)",
   "segment": "CPU",
   "company": "Market",
   "year": 2030,
   "value": 81,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CPU",
   "page": 8,
   "note": "26% CAGR 2025-30"
  },
  {
   "metric": "Server CPU TAM claim",
   "segment": "CPU",
   "company": "AMD",
   "year": 2030,
   "value": 120,
   "unit": "US$bn",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 13,
   "note": "Lisa Su: >35% CAGR; raised 2x vs Nov-25 CMD"
  },
  {
   "metric": "Server CPU TAM claim",
   "segment": "CPU",
   "company": "Arm",
   "year": 2031,
   "value": 100,
   "unit": "US$bn",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 13,
   "note": "Rene Haas, FY31"
  },
  {
   "metric": "Server CPU TAM claim (Vera)",
   "segment": "CPU",
   "company": "Nvidia",
   "year": 2030,
   "value": 200,
   "unit": "US$bn",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 13,
   "note": "Jensen Huang, 20-May-2026"
  },
  {
   "metric": "Server CPU revenues",
   "segment": "CPU",
   "company": "Nvidia",
   "year": 2026,
   "value": 20,
   "unit": "US$bn",
   "kind": "guide",
   "report": "NVDA-CPU",
   "page": 1,
   "note": ">33% market share in year one; 5-7m units at $3-4k ASP"
  },
  {
   "metric": "Server CPU revenues",
   "segment": "CPU",
   "company": "Intel",
   "year": 2030,
   "value": 24,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CPU",
   "page": 9,
   "note": "14% CAGR 2025-30"
  },
  {
   "metric": "Server CPU revenues",
   "segment": "CPU",
   "company": "AMD",
   "year": 2030,
   "value": 22,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CPU",
   "page": 9,
   "note": "19% CAGR; AMD's own target: $40bn (40% of $100bn TAM)"
  },
  {
   "metric": "Server CPU revenues",
   "segment": "CPU",
   "company": "Arm",
   "year": 2030,
   "value": 15,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "CPU",
   "page": 9,
   "note": "$13-17bn; 1P CPUs $10-15bn + royalties $2-2.5bn; EPS $7-9 by 2031"
  },
  {
   "metric": "AI CPU share",
   "segment": "CPU",
   "company": "Arm",
   "year": 2030,
   "value": 55,
   "unit": "%",
   "kind": "estimate",
   "report": "CPU",
   "page": 5,
   "note": "From 40% in 2025"
  },
  {
   "metric": "AI server CPU units",
   "segment": "CPU",
   "company": "Market",
   "year": 2030,
   "value": 30,
   "unit": "m units",
   "kind": "estimate",
   "report": "CPU",
   "page": 4,
   "note": "43% CAGR 2025-30"
  },
  {
   "metric": "Traditional server CPU units",
   "segment": "CPU",
   "company": "Market",
   "year": 2030,
   "value": 17,
   "unit": "m units",
   "kind": "estimate",
   "report": "CPU",
   "page": 2,
   "note": "Recovery to 2020 peak; cloud 12m, enterprise 5m"
  },
  {
   "metric": "x86 server CPU share",
   "segment": "CPU",
   "company": "AMD",
   "year": 2026,
   "value": 46,
   "unit": "%",
   "kind": "actual",
   "report": "BIBLE-1Q26",
   "page": 21,
   "note": "1Q26, +2pts QoQ; expected up again 2Q26"
  },
  {
   "metric": "DC GPU market share",
   "segment": "GPU",
   "company": "AMD",
   "year": 2026,
   "value": 4,
   "unit": "%",
   "kind": "actual",
   "report": "AMD-1Q26",
   "page": 3,
   "note": "1Q26, down 1pt QoQ on China; >10% expected by 2030"
  },
  {
   "metric": "Revenue",
   "segment": "Company model",
   "company": "AMD",
   "year": 2026,
   "value": 49.5,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "AMD-1Q26",
   "page": 9
  },
  {
   "metric": "Revenue",
   "segment": "Company model",
   "company": "AMD",
   "year": 2030,
   "value": 155.7,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "AMD-1Q26",
   "page": 9,
   "note": "EPS $29.21; TP $530 = 29x 2030 EPS discounted back"
  },
  {
   "metric": "DC GPU revenue",
   "segment": "Company model",
   "company": "AMD",
   "year": 2030,
   "value": 90.1,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "AMD-1Q26",
   "page": 9,
   "note": ">10% GPU share"
  },
  {
   "metric": "Hyperscaler internal revenues",
   "segment": "ROI",
   "company": "Hyperscalers & internet",
   "year": 2030,
   "value": 2900,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-IV",
   "page": 1,
   "note": "11% CAGR from $1.9tn in 2026"
  },
  {
   "metric": "Hyperscaler depreciation",
   "segment": "ROI",
   "company": "Hyperscalers & internet",
   "year": 2030,
   "value": 410,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-IV",
   "page": 1,
   "note": "35% CAGR - absorbed if cash costs grow 3pts slower than revenues"
  },
  {
   "metric": "Incremental cloud revenues required",
   "segment": "ROI",
   "company": "Cloud market",
   "year": 2027,
   "value": 190,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-III",
   "page": 1,
   "note": "To justify $710bn 2026 cloud capex"
  },
  {
   "metric": "Compute spend",
   "segment": "ROI",
   "company": "OpenAI",
   "year": 2027,
   "value": 91,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-III",
   "page": 1,
   "note": "From $45bn in 2026"
  },
  {
   "metric": "Compute spend",
   "segment": "ROI",
   "company": "Anthropic",
   "year": 2027,
   "value": 55,
   "unit": "US$bn",
   "kind": "estimate",
   "report": "INFRA-III",
   "page": 1,
   "note": "From $25bn in 2026"
  },
  {
   "metric": "Traditional cloud gross cash return",
   "segment": "ROI",
   "company": "Top-3 CSPs",
   "year": 2025,
   "value": 50,
   "unit": "%",
   "kind": "estimate",
   "report": "ROIC",
   "page": 3,
   "note": "On gross operating assets; 60% GM / 30% EBIT margin business"
  },
  {
   "metric": "AI cloud gross cash return",
   "segment": "ROI",
   "company": "AI cloud",
   "year": 2026,
   "value": 35,
   "unit": "%",
   "kind": "estimate",
   "report": "ROIC",
   "page": 7,
   "note": "45% average gross margin on 8-GPU Blackwell server"
  },
  {
   "metric": "Oracle-OpenAI contract IRR",
   "segment": "ROI",
   "company": "Oracle",
   "year": 2032,
   "value": 12,
   "unit": "%",
   "kind": "estimate",
   "report": "ROIC",
   "page": 5,
   "note": "4.5GW, ~$300bn revenues 2H27-1H32, 30% GM; 20% IRR over 10y chip life"
  },
  {
   "metric": "Azure AI gross margin",
   "segment": "ROI",
   "company": "Microsoft",
   "year": 2026,
   "value": 30,
   "unit": "% (25-30)",
   "kind": "estimate",
   "report": "ROIC",
   "page": 6,
   "note": "OpenAI <20%, others 30-40%; path to 40-50%"
  },
  {
   "metric": "AI server cost per GW",
   "segment": "ROI",
   "company": "Industry",
   "year": 2026,
   "value": 36,
   "unit": "US$bn/GW",
   "kind": "estimate",
   "report": "ROIC",
   "page": 5,
   "note": "Ex-building"
  },
  {
   "metric": "Public cloud revenue growth",
   "segment": "Cloud revenue",
   "company": "Market",
   "year": 2026,
   "value": 41,
   "unit": "% YoY",
   "kind": "actual",
   "report": "BIBLE-1Q26",
   "page": 5,
   "note": "1Q26: AWS +28%, GCP +63%, Azure +40%, OCI +85%"
  },
  {
   "metric": "Hyperscale capex growth",
   "segment": "Cloud capex",
   "company": "Top-8",
   "year": 2027,
   "value": 21,
   "unit": "% YoY implied",
   "kind": "estimate",
   "report": "BIBLE-1Q26",
   "page": 18,
   "note": "Expectations revised +19% in one season; NSR sees room for more"
  },
  {
   "metric": "DC semi revenue growth",
   "segment": "Semis",
   "company": "Market",
   "year": 2026,
   "value": 83,
   "unit": "% YoY implied",
   "kind": "estimate",
   "report": "BIBLE-1Q26",
   "page": 19,
   "note": "2027: +48% implied"
  },
  {
   "metric": "HBM revenue growth",
   "segment": "Memory/HBM",
   "company": "Samsung",
   "year": 2026,
   "value": 200,
   "unit": "% YoY (>3x)",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 14,
   "note": "HBM4 capacity fully booked and sold out"
  },
  {
   "metric": "AI networking revenue",
   "segment": "Networking",
   "company": "Nvidia",
   "year": 2026,
   "value": 15,
   "unit": "US$bn/quarter",
   "kind": "actual",
   "report": "BIBLE-1Q26",
   "page": 16,
   "note": "~3x YoY; Spectrum-X > all Ethernet peers combined"
  },
  {
   "metric": "AI revenue target",
   "segment": "Networking",
   "company": "Arista",
   "year": 2026,
   "value": 3.5,
   "unit": "US$bn",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 16,
   "note": ">2x YoY; supply-constrained next couple of years"
  },
  {
   "metric": "Hyperscale AI orders",
   "segment": "Networking",
   "company": "Cisco",
   "year": 2026,
   "value": 9,
   "unit": "US$bn (FY26)",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 16,
   "note": "4.5x FY25; >=$6bn revenue in FY27"
  },
  {
   "metric": "Interconnect revenue growth",
   "segment": "Optics",
   "company": "Marvell",
   "year": 2027,
   "value": 70,
   "unit": "% YoY (FY27)",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 18,
   "note": "Raised from 50%"
  },
  {
   "metric": "ASIC deployment",
   "segment": "XPU/ASIC",
   "company": "Broadcom",
   "year": 2027,
   "value": 10,
   "unit": "GW",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 12,
   "note": "Plus 20GW for OpenAI & Anthropic through 2028 (AI XPV platform)"
  },
  {
   "metric": "AI DC spending",
   "segment": "Buildout",
   "company": "Industry",
   "year": 2030,
   "value": 3500,
   "unit": "US$bn ($3-4tn)",
   "kind": "guide",
   "report": "BIBLE-1Q26",
   "page": 12,
   "note": "Nvidia guidance, reiterated May-2026"
  }
 ]
};
