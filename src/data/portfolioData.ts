export interface ProjectDetail {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  problem: string;
  myRole: string;
  whatIBuilt: string;
  systemArchitecture: string[];
  keyDecisions: string[];
  securityConsiderations: string[];
  technologies: string[];
  keyOutcomes: string[];
  visualMetaphor: string;
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  confidentialityNote?: string;
}

export interface CareerMilestone {
  year: string;
  role: string;
  company: string;
  detail: string;
  layer: string;
  highlight: string;
}

export interface EcosystemNode {
  name: string;
  category: string;
  domain: string;
  description: string;
  myRole: string;
  capabilities: string[];
  metrics: string;
  keyWork: string[];
}

export interface SystemLayer {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  role: string;
  color: string;
  description: string;
  artifacts: string[];
  mindset: string;
}

export interface Certification {
  title: string;
  issuer: string;
  area: string;
}

export interface SecurityIncident {
  id: string;
  title: string;
  category: string;
  type: 'brute' | 'waf' | 'vapt' | 'cve';
  detail: string;
  mitigation: string;
  status: string;
}

export const PERSONAL_INFO = {
  name: "Vijaya Kumar L",
  preferredName: "Vijay",
  role: "Lead – Application Engineering",
  company: "CIEL HR",
  tenure: "March 2026 – Present",
  location: "Bengaluru, Karnataka, India",
  email: "risewithvj@gmail.com",
  workEmail: "vijayakumar.l@cielhr.com",
  phone: "+91 89041 97200",
  linkedin: "https://www.linkedin.com/in/vijayakumarl/",
  github: "https://github.com/risewithvj",
  blog: "https://trendit.in/author/vijayakumarl/",
  languages: ["English", "Tamil", "Kannada", "Hindi"],
  resumeUrl: "/Vijaya_Kumar_L_Resume.pdf",
  philosophy: "If a task takes more than 10 minutes and you have to do it twice, it's time to automate it.",
  positioningStatement: "I build, secure, automate and operate complete digital systems — from frontend and backend applications to hosting, DNS, SSL, security, chatbots, CRM, automation, infrastructure, analytics and technical SEO.",
  heroEyebrow: "LEAD – APPLICATION ENGINEERING · BENGALURU",
  heroHeadline: "I build, secure and automate complete digital systems.",
  heroSub: "7+ years owning the whole stack — frontend, backend, hosting, DNS/SSL, security, CRM, automation, AI workflows and technical SEO.",
  brandPillars: ["BUILD", "SECURE", "AUTOMATE", "SCALE"]
};

export const VALUE_BREAKDOWN = [
  { item: "6 Full Platforms Built From Scratch", value: "₹9,30,000", type: "Benchmarked Market Value" },
  { item: "7 Group VAPT & Security Engagements", value: "₹5,25,000", type: "Benchmarked Market Value" },
  { item: "LeadFlow CRM Orchestration (Build vs Buy)", value: "₹2,52,000 / yr", type: "Benchmarked Market Value" },
  { item: "Custom Firewall & Monitoring Infrastructure", value: "₹2,28,960 / yr", type: "Benchmarked Market Value" },
  { item: "SSL Consolidation across 9 Domains", value: "₹80,892 / yr", type: "Benchmarked Market Value" },
  { item: "Direct Hard-Cost SSL Migration Savings", value: "₹58,979", type: "Direct Audited Cash Saving" },
  { item: "Cloudflare Edge Tiering & CDN Caching", value: "₹28,525 / yr", type: "Benchmarked Market Value" }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Claude Code in Action (AI & Agentic Workflows)", issuer: "Anthropic", area: "AI Engineering" },
  { title: "Cyber Investigator: An Interactive Cybersecurity Experience", issuer: "IBM", area: "Application Security" },
  { title: "SEO Certified (Advanced Technical & On-Page)", issuer: "HubSpot Academy", area: "Growth Engineering" },
  { title: "Networking Essentials", issuer: "Cisco", area: "Network Systems" },
  { title: "Cybersecurity Essentials", issuer: "Cisco", area: "Information Security" },
  { title: "Digital Marketing Strategy", issuer: "Simplilearn", area: "Marketing Technology" },
  { title: "Business Analysis & Process Management", issuer: "Coursera", area: "Operations Architecture" }
];

export const SYSTEM_LAYERS: SystemLayer[] = [
  {
    id: "hardware",
    number: "01",
    name: "HARDWARE",
    subtitle: "Physical compute & silicon reliability",
    role: "Desktop/Laptop Engineering & Component Triage",
    color: "#2F7BFF",
    description: "Hands-on motherboards, RAM, storage controllers, power rails, and enterprise diagnostics. Understanding that every digital byte is ultimately physical voltage and thermals.",
    artifacts: ["Component-level diagnosis", "BIOS/UEFI configuration", "Hardware stress testing", "Storage controller setup"],
    mindset: "If you don't respect physical silicon and thermals, your software runs on illusions."
  },
  {
    id: "networks",
    number: "02",
    name: "NETWORKS",
    subtitle: "Packets, routing & edge traversal",
    role: "Pan-India Field & Infrastructure Networking",
    color: "#2F7BFF",
    description: "VPNs, firewalls, DNS and network systems for an enterprise warehouse operation, plus risk assessments and vulnerability mitigation.",
    artifacts: ["VPN configuration", "Firewall administration", "DNS and SSL management", "Risk assessments"],
    mindset: "Latency is physics. Reliability is designing for the packets you will inevitably drop."
  },
  {
    id: "servers",
    number: "03",
    name: "SERVERS",
    subtitle: "Operating systems, hypervisors & persistent storage",
    role: "Enterprise Infrastructure & TrueNAS Administration",
    color: "#0A3DFF",
    description: "Linux server administration and a TrueNAS storage server supporting 100+ daily active users, plus cPanel/WHM, Nginx and server hardening.",
    artifacts: ["TrueNAS for 100+ daily users", "Ubuntu / Linux hardening", "cPanel, WHM and Nginx", "Microsoft 365 administration"],
    mindset: "A server is not a magical black box. It is a state machine with finite memory, CPU cycles, and disk IOPS."
  },
  {
    id: "web",
    number: "04",
    name: "WEB",
    subtitle: "Browser runtime, DOM & high-performance applications",
    role: "Lead Application Engineering & Web Architecture",
    color: "#6EA8FF",
    description: "Full-stack web architecture, React, modern JavaScript/TypeScript, PHP, headless CMS, Shadow DOM encapsulation, Core Web Vitals optimization, and 390+ landing pages.",
    artifacts: ["11+ applications and platforms", "390+ SEO landing pages", "Core Web Vitals and WebP optimisation", "Shadow DOM plugin isolation"],
    mindset: "The browser is the most hostile runtime environment on earth. Build with defensive simplicity."
  },
  {
    id: "cloud",
    number: "05",
    name: "CLOUD",
    subtitle: "Distributed edge, object storage & orchestration",
    role: "Cloud Architecture & Multi-Domain Consolidation",
    color: "#2F7BFF",
    description: "Consolidated 9 corporate domains onto unified Cloudflare edge and resilient cloud hosting. AWS S3 hardening, SSL termination, and CDN cache tiering.",
    artifacts: ["9 company domains unified", "AWS S3 public access remediation", "Cloudflare edge rules & WAF", "Docker + n8n on AWS"],
    mindset: "Cloud is just someone else's computer until you architect for failure domains and cost efficiency."
  },
  {
    id: "automation",
    number: "06",
    name: "AUTOMATION",
    subtitle: "Event hooks, serverless pipelines & asynchronous sync",
    role: "Cross-Platform Workflow & Integration Lead",
    color: "#6EA8FF",
    description: "Building event-driven automation pipelines connecting website webhooks, Zoho CRM, Exotel IVR, WhatsApp chatbots, Google Workspace, and n8n orchestration engines.",
    artifacts: ["Multi-source LeadFlow CRM engine", "Serverless IVR calling reports", "Zoho SalesIQ automated pipeline", "Google Apps Script micro-services"],
    mindset: "If a task takes more than 10 minutes and you have to do it twice, it's time to automate it."
  },
  {
    id: "security",
    number: "07",
    name: "SECURITY",
    subtitle: "Zero-trust boundaries, threat mitigation & VAPT remediation",
    role: "Application Security & Incident Response Lead",
    color: "#FF2A1F",
    description: "7 end-to-end VAPT engagements, Cloudflare WAF threat rules blocking 30,000+ hostile requests/month, 10,261 brute-force attack mitigation, and fraudulent clone takedowns.",
    artifacts: ["7 VAPT remediation cycles", "30,000+ monthly threat blocks", "10,261 login brute-force thwarted", "Phishing clone site neutralization"],
    mindset: "Security is not a feature or an afterthought. It is a fundamental property of system geometry."
  },
  {
    id: "ai",
    number: "08",
    name: "AI",
    subtitle: "Adaptive workflows, local intelligence & token telemetry",
    role: "AI Workflows & Extension Engineering",
    color: "#2F7BFF",
    description: "Engineered AIRadar (privacy-first Manifest V3 extension for token tracking and burn-rate visibility), automated LLM-assisted classification, and agentic workflows.",
    artifacts: ["AIRadar Manifest V3 extension", "Local-only token & budget tracking", "Chatbot lead classification engine", "Automated summary pipelines"],
    mindset: "AI models are computational components. Without robust systems and pipelines, they are just expensive text generators."
  }
];

export const CAREER_JOURNEY: CareerMilestone[] = [
  {
    year: "2021 – 2022",
    role: "Laptop/Desktop Engineer & Technical Support",
    company: "Airblue Services",
    layer: "Hardware Layer",
    detail: "Component-level diagnostics, physical motherboard repair, system builds, peripheral troubleshooting, and on-site hardware fault resolution across diverse systems.",
    highlight: "Ground-level hardware mastery: learned how physical silicon behaves under thermal stress."
  },
  {
    year: "2022 – 2024",
    role: "Service Engineer / Pan-India TSD Support",
    company: "TVS-E Electronics",
    layer: "Network & Field Infrastructure",
    detail: "NextGO/Avita hardware/software diagnostics, remote technical support desk, and mission-critical network/hardware escalation service nationwide.",
    highlight: "Operated at national scale: resolved high-availability hardware and network connectivity issues."
  },
  {
    year: "2023 – 2024",
    role: "IT Supervisor",
    company: "Jumbotail Technologies Pvt Ltd (via TVS-E)",
    layer: "Enterprise Infrastructure & Storage",
    detail: "Administered high-throughput TrueNAS enterprise storage supporting 100+ daily operational users, managed Linux infrastructure, firewalls, VPNs and Microsoft 365 for the warehouse workforce.",
    highlight: "Managed TrueNAS infrastructure serving 100+ daily active enterprise users without data loss."
  },
  {
    year: "2024 – 2026",
    role: "Digital Marketing Executive → Web Platform Owner",
    company: "CIEL HR",
    layer: "Web Platforms & Growth Systems",
    detail: "Rebuilt corporate web platform from scratch, shipped 390+ optimized landing pages, migrated 465+ blog posts, handled Core Web Vitals optimization, and managed production web assets.",
    highlight: "Achieved 10,000+ search crawl requests in 24 hours post-technical SEO and AEO/GEO deployment."
  },
  {
    year: "Concurrent",
    role: "Founder & Managing Director",
    company: "Tech Point Official",
    layer: "Full-System Engineering & Security",
    detail: "Directed end-to-end technology solutions covering custom application builds, server security auditing, business process automation, and client technical advisory.",
    highlight: "End-to-end ownership: architecting, securing, and operating production systems for clients."
  },
  {
    year: "March 2026 – Present",
    role: "Lead – Application Engineering",
    company: "CIEL HR",
    layer: "Application Engineering & Systems Leadership",
    detail: "Leading end-to-end multi-brand application engineering, multi-domain security posture, cloud infrastructure consolidation, automated lead pipelines, and AI workflow integration.",
    highlight: "Consolidated 9 enterprise domains onto unified security, blocking 30,000+ monthly attacks."
  }
];

export const IMPACT_METRICS = [
  {
    value: "7+",
    label: "Years of Experience",
    description: "Hands-on progression through every layer from hardware bench to application engineering leadership."
  },
  {
    value: "11+",
    label: "Platforms Built & Supported",
    description: "Enterprise web platforms, customer portals, CRM integrations, and self-hosted tools."
  },
  {
    value: "7",
    label: "Security Engagements (VAPT)",
    description: "Rigorous vulnerability assessments and comprehensive engineering remediations across corporate assets."
  },
  {
    value: "9",
    label: "Domains Consolidated",
    description: "Unified isolated group companies into one Cloudflare edge and infrastructure standard."
  },
  {
    value: "30,000+",
    label: "Monthly Attacks Blocked",
    description: "Automated WAF, rate-limiting, and bot management policies intercepting malicious and hostile requests."
  },
  {
    value: "₹21.04L+",
    label: "Total Quantified Value",
    description: "₹58,979 direct documented hard-cost savings plus ₹20.45L+ benchmarked market-rate engineering value."
  },
  {
    value: "390+",
    label: "SEO Landing Pages",
    description: "High-performance programmatically structured landing pages shipped with structured Schema."
  },
  {
    value: "100+",
    label: "Enterprise Users on TrueNAS",
    description: "Concurrent operational workforce supported on high-availability TrueNAS storage infrastructure."
  },
  {
    value: "363",
    label: "Verified Audit Contributions",
    description: "Dated, email-verified production contributions documented in the FY2025–26 work and impact record."
  },
  {
    value: "8 GB",
    label: "Storage Reclaimed",
    description: "Automated weekly cron cleanup routines removing orphan blobs and container artifacts."
  }
];

export const SELECTED_PROJECTS: ProjectDetail[] = [
  {
    id: "sec-ops",
    number: "01",
    title: "Web Security Operations Platform",
    category: "Security & Observability",
    tagline: "Self-hosted, multi-domain threat monitoring, incident clustering & compliance reporting engine.",
    problem: "Public corporate websites were protected by an edge security provider, but data was fragmented across vendor consoles without cross-domain visibility, long-term history, or scheduled executive digests.",
    myRole: "Lead Architect & Security Engineer",
    whatIBuilt: "A containerized, vendor-neutral platform that continuously ingests traffic data, clusters multi-vector attack events into incidents, runs synthetic Lighthouse audits, and delivers automated executive reports.",
    systemArchitecture: [
      "Containerized microservices running on Docker & Docker Compose",
      "Node.js 20 / Express 4 backend orchestrating scheduled domain health probes",
      "Headless Puppeteer & Google Lighthouse workers for Core Web Vitals & DOM tamper checks",
      "Normalized vendor-neutral security event ingestion pipeline stored in PostgreSQL 16",
      "Incident clustering algorithm grouping multi-vector reconnaissance spikes",
      "Automated PDF & CSV audit reporting with real-time webhook & email dispatchers via Nodemailer"
    ],
    keyDecisions: [
      "Designed a vendor-neutral abstraction layer to prevent single-vendor monitoring lock-in",
      "Engineered resilient partial-failure handling so single probe timeouts never halt the ingest queue",
      "Implemented honest live-data and degraded-feed indicators instead of presenting stale cache"
    ],
    securityConsiderations: [
      "Excluded all secrets and tokens from source control with AES-256-GCM encryption at rest",
      "Enforced bcrypt password hashing, HTTP-only session cookies, and SameSite=Strict hardening",
      "Applied minimal container base images and scheduled automated data pruning policies"
    ],
    technologies: ["Docker", "Docker Compose", "Node.js 20", "Express 4", "PostgreSQL 16", "Puppeteer", "Lighthouse", "Nodemailer", "node-cron"],
    keyOutcomes: [
      "100% self-hosted historical telemetry beyond vendor retention windows",
      "Consolidated multi-domain security monitoring with zero external SaaS licensing cost",
      "Automated executive PDF compliance reports generated on weekly cron schedules"
    ],
    visualMetaphor: "Multi-sensor perimeter shield with localized threat analysis and automated dispatch",
    metrics: "Continuous multi-domain coverage with zero external SaaS licensing cost",
    confidentialityNote: "Vendor-neutral implementation. Upstream provider endpoints, internal hostnames, and detection thresholds are omitted."
  },
  {
    id: "leadflow",
    number: "02",
    title: "LeadFlow CRM Orchestration",
    category: "Automation & Data Pipelines",
    tagline: "Centralized multi-channel lead ingestion, deduplication, validation and real-time CRM routing.",
    problem: "Lead data arrived across website inquiry forms, WhatsApp chatbots, web chat, and IVR, resulting in duplicate CRM entries, delayed responses, and lost attribution.",
    myRole: "Full-Stack System Architect & Workflow Engineer",
    whatIBuilt: "A centralized lead-management orchestration engine built with Docker, VPS, and dedicated database that ingests, validates, deduplicates, and dispatches leads to sales.",
    systemArchitecture: [
      "Unified webhook listener capturing JSON payloads from web forms, chat widgets, and IVR",
      "Validation of incoming lead data before it reaches sales",
      "Deduplication so the same lead is never entered twice",
      "Intelligent rule-based routing dispatching hot leads directly into Zoho CRM and assigned agents",
      "Real-time notifications to the sales team"
    ],
    keyDecisions: [
      "Built custom in-house CRM middleware instead of paying high recurring SaaS subscription fees",
      "Adopted asynchronous event-driven queues to isolate traffic spikes during marketing campaigns"
    ],
    securityConsiderations: [
      "Sanitized all incoming payloads against SQL injection and cross-site scripting",
      "Dedicated database and container isolation on a VPS"
    ],
    technologies: ["Docker", "VPS", "Dedicated database", "Webhooks", "Zoho"],
    keyOutcomes: [
      "Leads from every CIEL site, form and chatbot in one place",
      "Validation and deduplication before the sales handoff",
      "Saved ₹2,52,000/year compared to commercial enterprise CRM routing middleware"
    ],
    visualMetaphor: "Centripetal funnel routing turbulent raw streams into crystal-clear operational channels",
    metrics: "Benchmarked at ₹2,52,000 a year vs. a bought CRM",
    githubUrl: "https://github.com/risewithvj/leadflow"
  },
  {
    id: "airadar",
    number: "03",
    title: "AIRadar — Privacy-First AI Telemetry",
    category: "Browser Extension Engineering",
    tagline: "Manifest V3 browser extension for local token tracking, burn-rate visibility & quota reset alerts.",
    problem: "Engineers using multiple AI services frequently hit unexpected rate limits and budget exhaustion without client-side visibility into real-time token consumption.",
    myRole: "Creator & Lead Extension Developer",
    whatIBuilt: "AIRadar (v2.2.2) — a privacy-first browser extension supporting Chrome, Edge, Brave, Firefox, Opera, Vivaldi, and Arc that calculates session and weekly burn rates with zero data tracking.",
    systemArchitecture: [
      "Modern Chrome Manifest V3 compliant service worker architecture supporting 8+ browsers",
      "Zero-remote-server design: all telemetry, token counters, and usage logs stay 100% local on-device",
      "Dynamic quota reset countdown timers and threshold burn-rate alarms",
      "Lightweight UI with usage gauges, reset timers and budget alerts"
    ],
    keyDecisions: [
      "Engineered an absolute zero-tracking policy: zero analytics calls, zero remote telemetry",
      "Local-only data: nothing leaves the browser"
    ],
    securityConsiderations: [
      "Strict Content Security Policy (CSP) compliant with Manifest V3 standards",
      "No external network permissions requested"
    ],
    technologies: ["JavaScript", "WebExtensions", "Manifest V3"],
    keyOutcomes: [
      "Overcome sudden token overages through predictive burn-rate threshold alerts",
      "Compatible across Chromium, Firefox, and WebExtension browser ecosystems",
      "Production version v2.2.2 open-source on GitHub"
    ],
    visualMetaphor: "Avionics cockpit fuel-gauge monitoring consumption without sending signals home",
    metrics: "v2.2.2 — Chrome, Edge, Brave, Firefox, Opera, Vivaldi, Arc",
    githubUrl: "https://github.com/risewithvj/AIRadar"
  },
  {
    id: "ivr-automation",
    number: "04",
    title: "IVR Calling Report Automation",
    category: "Serverless Automation",
    tagline: "Fully serverless Exotel call processing, dashboard computation & automated executive delivery.",
    problem: "Operational call center records from Exotel required daily manual CSV downloads, spreadsheet formulas, and repetitive email formatting by hand every week and month.",
    myRole: "Automation Engineer & System Developer",
    whatIBuilt: "A 100% serverless pipeline using Google Apps Script that pulls Exotel telephony endpoints, computes aggregations, updates Google Sheets, and sends branded HTML executive reports.",
    systemArchitecture: [
      "Serverless Google Apps Script scheduled trigger polling Exotel telephony endpoints",
      "In-memory normalization engine cleaning call duration, agent pick rates, and disposition codes",
      "Automated Google Sheets dashboard refreshing weekly and monthly KPI aggregations",
      "HTML email templating engine generating executive summary tables directly into management inboxes"
    ],
    keyDecisions: [
      "Eliminated server maintenance by executing entire workflow on Google serverless cloud infrastructure",
      "Automated weekly and monthly historical rollups without manual formulas"
    ],
    securityConsiderations: [
      "API credentials stored securely in Apps Script ScriptProperties with restricted script access",
      "Customer phone numbers masked in management email reports for privacy compliance"
    ],
    technologies: ["Google Apps Script", "Exotel REST API", "Google Sheets", "Serverless", "JavaScript"],
    keyOutcomes: [
      "Zero dedicated server infrastructure required (100% serverless, zero hosting overhead)",
      "Weekly and monthly reports automated for HR, Compliance and Helpdesk teams",
      "Sustained from July 2025 to July 2026"
    ],
    visualMetaphor: "Autonomous clockwork mechanism extracting signal from raw telephony exhaust",
    metrics: "100% automated report delivery running without maintenance",
    githubUrl: "https://github.com/risewithvj/ivr-calling-report-automation"
  },
  {
    id: "salesiq-automation",
    number: "05",
    title: "Zoho SalesIQ Intelligence Engine",
    category: "Data Pipelines & Chatbot Analytics",
    tagline: "Automated aggregation of website & WhatsApp chat streams into structured intelligence dashboards.",
    problem: "Visitor interactions and chatbot conversations remained trapped inside the Zoho console, preventing leadership from extracting actionable hiring intent signals.",
    myRole: "Integration Architect & Data Engineer",
    whatIBuilt: "An automated pipeline connecting Zoho SalesIQ exports to Google Drive, running regex intent classification, and publishing live Google Sheets conversion dashboards.",
    systemArchitecture: [
      "Scheduled export listener extracting conversation transcripts and visitor metadata",
      "Automated Google Drive archive syncing encrypted raw chat transcripts",
      "Regex-driven intent classifier sorting conversations by hiring intent, candidate query, or support",
      "Dynamic dashboard updating lead conversion metrics and conversation drop-off rates"
    ],
    keyDecisions: [
      "Decoupled analytics from the proprietary console into open spreadsheet reporting",
      "Implemented automated weekly and monthly summaries via email"
    ],
    securityConsiderations: [
      "OAuth 2.0 token refresh automation with restricted scope boundaries",
      "Candidate sensitive contact information sanitized in analytical aggregate views"
    ],
    technologies: ["Zoho SalesIQ", "Google Drive API", "Google Sheets API", "Apps Script", "RegEx Data Mining"],
    keyOutcomes: [
      "Consolidated website chat and WhatsApp traffic into a single source of truth",
      "Automated daily reporting eliminates manual data scraping",
      "Identified top visitor friction points to optimize chatbot conversion flows"
    ],
    visualMetaphor: "Optical prism separating raw chaotic conversation into sharp spectral frequencies",
    metrics: "Thousands of conversations indexed with structured lead categorization",
    githubUrl: "https://github.com/risewithvj/zoho-salesiq-report-automation"
  },
  {
    id: "pressrise",
    number: "06",
    title: "PressRise — Press & Media CMS Engine",
    category: "Web Engineering & Plugins",
    tagline: "WordPress plugin with Shadow DOM isolation, CSV/Excel ingestion & programmatic SEO sitemaps.",
    problem: "Media releases on corporate sites suffered from styling conflicts with parent themes, clunky manual publishing workflows, and missing structured metadata for Google News.",
    myRole: "Plugin Author & Full-Stack Developer",
    whatIBuilt: "PressRise — an open-source WordPress plugin (GPL v2.0) that encapsulates media coverage within Shadow DOM, supports bulk spreadsheet imports, and generates automated sitemaps.",
    systemArchitecture: [
      "Encapsulated Web Components rendering via Shadow DOM to guarantee zero CSS bleed",
      "Streaming CSV and Excel parser allowing instant bulk media article imports",
      "Dynamic filtering engine with date range pickers, publisher tags, and live search",
      "Dedicated XML sitemap generator embedding Schema.org NewsArticle structured JSON-LD"
    ],
    keyDecisions: [
      "Adopted Shadow DOM for theme isolation so the plugin looks flawless on any client theme",
      "Built native spreadsheet parsers to reduce publishing friction for editorial teams"
    ],
    securityConsiderations: [
      "Strict WordPress nonce verification on all AJAX import endpoints",
      "Sanitized file upload MIME types and prevented PHP execution in upload paths"
    ],
    technologies: ["PHP", "WordPress Plugin API", "Shadow DOM", "JavaScript (ES6)", "Schema.org", "XML"],
    keyOutcomes: [
      "100% visual isolation regardless of active WordPress theme or external stylesheet",
      "CSV and Excel bulk import for press and media entries",
      "Enhanced Google News and Search crawl indexing through automated media schema"
    ],
    visualMetaphor: "Hermetically sealed display vitrine with dedicated optical lighting",
    metrics: "Deployed across corporate sites under GPL v2.0 license",
    githubUrl: "https://github.com/risewithvj/Pressrise",
    liveUrl: "https://risewithvj.github.io/PressRise/"
  },
  {
    id: "psp-agent-x",
    number: "07",
    title: "PSP Agent X — Security & High-Availability Recovery",
    category: "Enterprise Security & Infrastructure",
    tagline: "Large SaaS application third-party VAPT remediation, privilege escalation fix & Nginx crash recovery.",
    problem: "A critical enterprise SaaS platform failed an independent third-party VAPT assessment due to high-severity privilege escalation, session fixation, and exposed network ports, followed by production Nginx crashes.",
    myRole: "Lead Security & Infrastructure Engineer",
    whatIBuilt: "Full vulnerability remediation across application sessions and permissions, secure subdomain configuration with Nginx and SSL termination, and production web server stabilization.",
    systemArchitecture: [
      "Nginx reverse proxy with hardened TLS 1.3 ciphers and rate-limiting zones",
      "Session management overhaul enforcing strict server-side token invalidation",
      "Port exposure containment closing unauthorized diagnostic ports",
      "Secure API gateway bridge connecting safely to cielhr.ai"
    ],
    keyDecisions: [
      "Resolved underlying Nginx memory saturation and worker process crash loop",
      "Eliminated horizontal and vertical privilege escalation vectors in the authorization middleware"
    ],
    securityConsiderations: [
      "Comprehensive remediation of session fixation vulnerabilities",
      "Hardened CORS headers, CSP policies, and removed server fingerprint disclosures"
    ],
    technologies: ["Nginx", "Linux", "SSL/TLS", "VAPT Remediation", "Session Hardening", "Reverse Proxy"],
    keyOutcomes: [
      "Clean sign-off on subsequent third-party VAPT audit report",
      "Production Nginx crash resolved",
      "Secured communication channel to group AI ecosystem"
    ],
    visualMetaphor: "Reinforced vault gateway with multi-factor privilege checkpoints",
    metrics: "Third-party VAPT findings remediated"
  },
  {
    id: "aiprompts",
    number: "08",
    title: "AI Prompts Directory Platform",
    category: "AI Web Platform",
    tagline: "Production web application for discovering, testing, rating, and managing reusable AI agent prompts.",
    problem: "Teams experimenting with generative AI and agent workflows lacked a centralized, high-performance library to store, bookmark, and review prompt patterns with structured metadata.",
    myRole: "Lead Full-Stack Developer",
    whatIBuilt: "A modern web application built with Next.js, TypeScript, and Supabase featuring live search, categorization, community ratings, bookmarks, and an administrative moderation panel.",
    systemArchitecture: [
      "Next.js App Router with TypeScript and Tailwind CSS",
      "Supabase PostgreSQL backend with Row Level Security (RLS) policies",
      "Real-time search filtering with instant client-side debounced queries",
      "Analytics instrumentation tracking prompt copy and bookmark frequencies"
    ],
    keyDecisions: [
      "Used Supabase RLS to secure administrative prompt management from public read views",
      "Built instant copy-to-clipboard interactions with toast feedback for developer ergonomics"
    ],
    securityConsiderations: [
      "Enforced strict sanitization of user-submitted prompt templates against injection",
      "Environment variables isolated on secure Vercel edge deployment"
    ],
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
    keyOutcomes: [
      "Live deployment at aiprompts.trendit.in",
      "Browse, search, rate and bookmark prompts",
      "Fast, searchable prompt library with a responsive UI"
    ],
    visualMetaphor: "Curated optical index card catalog with instant laser retrieval",
    metrics: "Production SaaS deployed at aiprompts.trendit.in",
    liveUrl: "https://aiprompts.trendit.in"
  },
  {
    id: "okr-app",
    number: "09",
    title: "OKR Application — Standards-Based Hardening",
    category: "Internal Enterprise Application",
    tagline: "Full delivery, VAPT audit remediation, hardened deployment & automated weekly storage reclamation.",
    problem: "The internal Objectives and Key Results (OKR) tracking system accumulated runaway storage bloating and required standards-based security certification before enterprise rollout.",
    myRole: "Application & Security Engineer",
    whatIBuilt: "Complete application delivery, VAPT remediation, hardened production environment, and automated weekly cleanup daemons that reclaimed 8 GB of disk space.",
    systemArchitecture: [
      "Containerized application deployment with strict resource quotas",
      "Standards-based security audit report resolution across authentication routes",
      "Automated weekly cron script pruning temporary artifacts, logs, and dangling blobs"
    ],
    keyDecisions: [
      "Engineered automated storage reclamation to permanently prevent disk-full downtime incidents",
      "Implemented granular role-based access control (RBAC) across departments"
    ],
    securityConsiderations: [
      "Eliminated insecure direct object references (IDOR) on objective scorecards",
      "Secured database connection strings and applied encryption at rest"
    ],
    technologies: ["Node.js", "Docker", "PostgreSQL", "Cron", "VAPT Remediation", "Linux"],
    keyOutcomes: [
      "8 GB of valuable production server storage permanently reclaimed",
      "Full compliance with enterprise standards-based security certification",
      "Stable internal rollout across department leaders"
    ],
    visualMetaphor: "Precision mechanical governor purging operational exhaust automatically",
    metrics: "8 GB storage reclaimed by a weekly cleanup job"
  },
  {
    id: "payroll-automation",
    number: "10",
    title: "Payroll Automation & Zero-Loss Migration",
    category: "Cloud Migration & Orchestration",
    tagline: "NeonDB to local PostgreSQL zero-loss migration, Docker + n8n automation on AWS & RDP hosting.",
    problem: "Mission-critical payroll data was hosted on external NeonDB and was moved to self-hosted PostgreSQL in a zero-loss migration to self-hosted PostgreSQL.",
    myRole: "DevOps & Database Engineer",
    whatIBuilt: "A verified zero-loss database migration pipeline from NeonDB to local PostgreSQL, coupled with Docker and n8n workflow deployment on AWS EC2 and RDP server management.",
    systemArchitecture: [
      "Streaming logical replication and schema normalization to local PostgreSQL",
      "AWS EC2 instance provisioned with Docker and containerized n8n workflow engine",
      "Secure RDP server hosting and access management for payroll finance administrators"
    ],
    keyDecisions: [
      "Conducted dry-run checksum verification to validate 100% record parity before DNS cutover",
      "Self-hosted n8n workflows on AWS to keep sensitive payroll records within corporate perimeter"
    ],
    securityConsiderations: [
      "Payroll database secured behind private VPC subnets with strict security groups",
      "Encrypted all database backups with automated daily S3 rotation"
    ],
    technologies: ["PostgreSQL", "NeonDB", "AWS EC2", "Docker", "n8n", "RDP Hosting", "Bash"],
    keyOutcomes: [
      "100% data integrity verified with zero record loss during migration",
      "Significantly reduced cloud database hosting expenses",
      "Automated payroll data synchronization workflows deployed on n8n"
    ],
    visualMetaphor: "Hermetic data conduit transferring critical liquid without a single drop lost",
    metrics: "Zero-loss migration completed on schedule"
  },
  {
    id: "smart-clm",
    number: "11",
    title: "Smart CLM — Vulnerability Remediation & SQL Migration",
    category: "Application Security & Database Migration",
    tagline: "Login/session vulnerability remediation, SQLite to standard SQL migration & API key protection.",
    problem: "Contract Lifecycle Management (CLM) software had critical unauthenticated access flaws, session cache-control leaks, an exposed API key in build code, and unscalable SQLite storage.",
    myRole: "Application Security & Database Engineer",
    whatIBuilt: "Neutralized unauthenticated access and session bugs, migrated the storage engine from SQLite to standard PostgreSQL, and scrubbed exposed API credentials before deployment.",
    systemArchitecture: [
      "Relational SQL schema migration with normalized relational constraints",
      "Session management rewrite adding Cache-Control: no-store and token validation",
      "Credential rotation and automated git-secrets pre-commit enforcement"
    ],
    keyDecisions: [
      "Replaced file-based SQLite with multi-tenant SQL database to support concurrent reviewers",
      "Intercepted and rotated exposed API keys before any production release"
    ],
    securityConsiderations: [
      "Resolved unauthenticated account access bug completely",
      "Hardened session invalidation across browser logout and timeout events"
    ],
    technologies: ["SQL", "SQLite Migration", "Session Hardening", "API Security", "PostgreSQL"],
    keyOutcomes: [
      "All high-risk authentication and credential vulnerabilities resolved",
      "Scaled database concurrency for enterprise contract workflows",
      "Passed security verification prior to production launch"
    ],
    visualMetaphor: "Replacing fragile wooden lock with hardened electronic cryptographic bolt",
    metrics: "100% security remediation prior to enterprise shipping"
  },
  {
    id: "onward-upward",
    number: "12",
    title: "Onward & Upward — Credential & Org Email Defense",
    category: "Internal Tools & Security Remediation",
    tagline: "Asset allocation & ticketing tool; discovered and closed critical org-email hijack risks; free DB mapped.",
    problem: "An internal IT ticketing and laptop allocation application had serious credential vulnerabilities that put the entire organization at risk of email hijack and remote wipe.",
    myRole: "Security Auditor & Platform Engineer",
    whatIBuilt: "Identified and neutralized critical credential flaws, remediated VAPT vulnerabilities, and mapped a high-performance free dedicated database to eliminate hosting costs.",
    systemArchitecture: [
      "Ticketing and asset management service with authenticated role boundaries",
      "Credential security overhaul eliminating hard-coded tokens and privileged escalation vectors",
      "Sourced and configured dedicated cloud database tier with zero infrastructure cost"
    ],
    keyDecisions: [
      "Flagged organization-wide email hijack risk to senior leadership and remediated within hours",
      "Optimized infrastructure cost by sourcing and mapping free dedicated database tier"
    ],
    securityConsiderations: [
      "Prevented catastrophic organizational email takeover and unauthorized remote device wipes",
      "Enforced strict environment isolation for administrative credentials"
    ],
    technologies: ["Node.js", "SQL", "VAPT Remediation", "Access Control", "Email Security"],
    keyOutcomes: [
      "Neutralized severe security breach vector that risked organizational domain trust",
      "Streamlined laptop allocation and asset tracking across internal departments",
      "Zero monthly database hosting expense achieved"
    ],
    visualMetaphor: "Defusing an undetected tripwire guarding the central communications vault",
    metrics: "Critical enterprise security risk eliminated with zero budget increase"
  },
  {
    id: "snapurl",
    number: "13",
    title: "SnapURL — High-Throughput URL Shortener",
    category: "Full-Stack Web Application",
    tagline: "Full-stack URL shortener with analytics, CSV import, JWT auth and rate limiting.",
    problem: "Marketing and internal operations required a secure, brand-controlled link management service with low redirect latency, bulk ingestion, and real-time click attribution.",
    myRole: "Creator & Full-Stack Architect",
    whatIBuilt: "A full-stack URL shortening service built with React, Vite, TypeScript, Express, PostgreSQL, Drizzle ORM, and Redis with live deployment on Vercel.",
    systemArchitecture: [
      "React + Vite SPA paired with Express TypeScript backend",
      "PostgreSQL persistence managed with Drizzle ORM schema migrations",
      "Redis caching tier for fast redirects",
      "JWT authentication, sliding-window rate limiting, and bulk CSV export"
    ],
    keyDecisions: [
      "Used Redis memory caching to bypass SQL queries for frequently accessed redirect links",
      "Built sliding-window rate limiters to prevent bot abuse and brute-force slug enumeration"
    ],
    securityConsiderations: [
      "JWT authentication with HTTP-only cookies and expiration controls",
      "Strict URL validation protecting against open redirects and phishing payloads"
    ],
    technologies: ["React", "Vite", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM", "Redis", "Vercel"],
    keyOutcomes: [
      "Redis cache layer in front of PostgreSQL",
      "Bulk CSV upload processing for large marketing campaigns",
      "Live production deployment accessible on Vercel"
    ],
    visualMetaphor: "High-speed rail switch routing thousands of trains across instant junctions",
    metrics: "Live production SaaS at urlshortener-hazel.vercel.app",
    liveUrl: "https://urlshortener-hazel.vercel.app"
  },
  {
    id: "aws-s3-hardening",
    number: "14",
    title: "AWS S3 Cloud Security Hardening",
    category: "Cloud Security & Governance",
    tagline: "Zero-trust bucket policy enforcement, public access remediation & operational auditing scripts.",
    problem: "Uncoordinated cloud asset storage across distributed marketing teams led to risks of accidental public S3 bucket exposure and missing server-side encryption.",
    myRole: "Cloud Security Architect",
    whatIBuilt: "An open-source security guide and automated auditing toolkit using PowerShell and AWS CLI to discover permissive ACLs, enforce KMS encryption, and automate S3 Block Public Access.",
    systemArchitecture: [
      "Automated CLI auditing scripts discovering unencrypted buckets and permissive ACLs",
      "Strict IAM least-privilege boundary policies and S3 Block Public Access enforcement",
      "Enforced KMS encryption-at-rest and TLS 1.3 encryption-in-transit for all object uploads",
      "Lifecycle rules transitioning stale assets to Glacier and pruning orphan upload parts"
    ],
    keyDecisions: [
      "Published open-source security guidance under MIT License to assist cloud engineering community",
      "Implemented automated cost tiering to transition cold marketing assets to Glacier"
    ],
    securityConsiderations: [
      "Universal enforcement of AWS S3 Block Public Access across all existing and new buckets",
      "KMS envelope encryption enforced on sensitive corporate file objects"
    ],
    technologies: ["AWS IAM", "AWS S3", "AWS CLI", "PowerShell", "CloudWatch", "CloudTrail"],
    keyOutcomes: [
      "Neutralized all potential public read/write vulnerabilities across cloud storage assets",
      "Standardized security baseline documentation adopted by cross-functional teams",
      "Published open-source security guidance on GitHub under MIT License"
    ],
    visualMetaphor: "Multi-key ballistic vault door with continuous tamper sensor verification",
    metrics: "Documented public-access management guidance",
    githubUrl: "https://github.com/risewithvj/s3-bucket-security-guide"
  },
  {
    id: "mafoi-foundation",
    number: "15",
    title: "The MaFoi Foundation Digital Platform",
    category: "High-Performance Web Platforms",
    tagline: "Modern accessible web engineering for the philanthropic institution empowering communities.",
    problem: "The legacy foundation site suffered from slow mobile load times, outdated design patterns, and lacked structured accessibility for diverse donors and beneficiaries.",
    myRole: "Lead Web Developer & Architect",
    whatIBuilt: "A component-driven platform built from scratch with Astro, featuring 30+ custom landing pages, 50+ modular components, and strict WCAG AA compliance.",
    systemArchitecture: [
      "Astro-based component architecture with 30+ custom landing pages and 50+ modules",
      "30+ custom landing pages and 50+ fully modular components",
      "Strict semantic HTML5 with WCAG AA compliance for screen readers and high-contrast modes",
      "Optimized responsive asset delivery pipeline serving next-gen WebP imagery"
    ],
    keyDecisions: [
      "Chose Astro for zero-JS-by-default architecture to maximize speed on low-bandwidth mobile devices",
      "Structured multi-branch delivery (main Astro branch and static skilling-program branch)"
    ],
    securityConsiderations: [
      "Static site generation eliminates server-side vulnerability surfaces",
      "Strict CSP policies protecting donation and contact forms"
    ],
    technologies: ["Astro", "TypeScript", "HTML5", "Responsive CSS", "REST Integration", "WCAG 2.1 AA"],
    keyOutcomes: [
      "Sub-1.2s First Contentful Paint with 98+ Lighthouse accessibility score",
      "30+ custom landing pages shipped for skilling and education initiatives",
      "Structured SEO schema enhancing visibility for social welfare initiatives"
    ],
    visualMetaphor: "Open architectural pavilion designed with warmth, dignity and enduring permanence",
    metrics: "Delivered from scratch with 30+ pages and 50+ modules",
    githubUrl: "https://github.com/risewithvj/themafoifoundation"
  },
  {
    id: "finx",
    number: "16",
    title: "FinX — UI/UX Redesign & Security Hardening",
    category: "UI/UX & Security Engineering",
    tagline: "Comprehensive UI/UX overhaul, VAPT vulnerability remediation and hosting stabilization.",
    problem: "An initial version built by interns suffered from UI/UX navigation friction, hosting instability, and multiple security vulnerabilities discovered during preliminary audits.",
    myRole: "Lead Developer & Security Mentor",
    whatIBuilt: "Improved and secured the application in-house, overhauled the interface for clean usability, remediated VAPT security gaps, and provided robust production hosting support.",
    systemArchitecture: [
      "Refactored component architecture with clean responsive layout",
      "VAPT remediation hardening session validation and input handling",
      "High-availability hosting deployment with automated SSL renewal"
    ],
    keyDecisions: [
      "Redesigned user workflows to eliminate navigation confusion for core financial tasks",
      "Hardened authentication and API communication without requiring full rewrite"
    ],
    securityConsiderations: [
      "Input validation and sanitization across all financial calculation forms",
      "Eliminated session leakage and updated outdated dependencies"
    ],
    technologies: ["React", "JavaScript", "VAPT Remediation", "CSS Architecture", "Hosting Support"],
    keyOutcomes: [
      "Elevated application from prototype to secure production standard",
      "Seamless user experience with verified VAPT clean bill of health",
      "Established reliable hosting baseline"
    ],
    visualMetaphor: "Refining rough field prototype into precision aerospace flight instrument",
    metrics: "In-house security and UI/UX transformation"
  }
];

export const SECURITY_INCIDENTS: SecurityIncident[] = [
  {
    id: "inc-1",
    title: "Distributed Brute-Force Campaign Neutralized",
    category: "Credential Stuffing & Bot Mitigation",
    type: "brute",
    detail: "10,261 automated login attempts were recorded against cielhr.com.",
    mitigation: "Deployed two-level login protection on the login endpoint and tightened edge rules.",
    status: "RESOLVED // PROTECTED"
  },
  {
    id: "inc-2",
    title: "Fraudulent Corporate Clone Site Takedown",
    category: "Brand Protection & Edge Defenses",
    type: "waf",
    detail: "Detected an unauthorized corporate clone site harvesting candidate credentials by impersonating the group brand.",
    mitigation: "Filed abuse notices with the hosting and domain providers; the clone site was taken down.",
    status: "RESOLVED // SITE NEUTRALIZED"
  },
  {
    id: "inc-3",
    title: "Malware Compromise Contained in ~3 Hours",
    category: "Rapid Incident Response",
    type: "vapt",
    detail: "A malware compromise was detected on one of the group’s business websites.",
    mitigation: "Contained in roughly three hours, followed by a full root-cause report.",
    status: "RESOLVED // ~3 HOURS"
  },
  {
    id: "inc-4",
    title: "Edge Takeover / DDoS Attempt Deflected",
    category: "Edge Protection & DDoS Policy",
    type: "waf",
    detail: "A takeover and DDoS attempt targeted one of the group’s domains.",
    mitigation: "Mitigated at the edge — 376 attack attempts blocked before reaching the origin.",
    status: "RESOLVED // MITIGATED"
  },
  {
    id: "inc-5",
    title: "Organization Email Hijack Risk Remediated",
    category: "Credential Remediation & Access Control",
    type: "vapt",
    detail: "VAPT on the Onward & Upward app found credential bugs that could have let organisation email accounts be hijacked and remotely wiped.",
    mitigation: "Credential bugs fixed and the risk closed before it could be exploited.",
    status: "RESOLVED // BREACH PREVENTED"
  },
  {
    id: "inc-6",
    title: "CVE-2026-24049 Dependency Advisory Issued",
    category: "CVE Triage",
    type: "cve",
    detail: "Triaged CVE-2026-24049 (CVSS 7.1) in the Python wheel dependency, plus a related high-severity wheel-package issue.",
    mitigation: "Issued an internal engineering advisory to the teams using it.",
    status: "RESOLVED // ADVISORY ISSUED"
  }
];

export const CONSOLIDATED_DOMAINS = [
  "cielhr.ai",
  "cielhr.com",
  "cielrapid.ai",
  "cielskillsandcareers.com",
  "courseplay.ai",
  "hfactor.digital",
  "mafoibusinessconsulting.com",
  "mafoistrategy.com",
  "themafoifoundation.in"
];

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    name: "CIEL HR",
    category: "Flagship Corporate Platform",
    domain: "cielhr.com",
    myRole: "Lead Developer & Digital Architect",
    description: "The primary digital platform of one of India's leading talent solutions companies. Rebuilt end-to-end from scratch covering frontend UI/UX, backend structure, hosting, DNS/SSL, Cloudflare WAF, and automated lead ingestion.",
    capabilities: ["Full-Stack Rebuild", "Cloudflare WAF", "LeadFlow CRM", "Technical SEO", "TrueNAS Infrastructure"],
    metrics: "390+ SEO pages, 30,000+ monthly threat blocks, 10,000+ crawl requests in 24h",
    keyWork: [
      "Rebuilt cielhr.com end-to-end from scratch (Frontend, Backend, Hosting)",
      "Deployed Cloudflare WAF, CDN, and custom DDoS mitigation rules",
      "Integrated Zoho SalesIQ, CRM, and real-time lead routing bot",
      "Architected 390+ SEO landing pages with structured Schema.org JSON-LD",
      "Core Web Vitals optimisation"
    ]
  },
  {
    name: "CIEL Rapid",
    category: "High-Velocity Staffing Platform",
    domain: "cielrapid.ai",
    myRole: "Web Developer & Platform Owner",
    description: "Specialized staffing platform built for rapid talent deployment. Engineered high-conversion landing pages, handled massive content migration, and integrated real-time applicant routing.",
    capabilities: ["Web Engineering", "Blog Migration", "Spam Defense", "Lead Automation"],
    metrics: "465+ blog posts migrated, 3,000+ spam comments removed",
    keyWork: [
      "Built from scratch with custom Elementor architecture",
      "Migrated 465+ corporate blog posts with 404 preservation",
      "Neutralized and cleaned 3,000+ spam comments from production database",
      "Integrated real-time applicant notification webhooks"
    ]
  },
  {
    name: "CIEL Skills & Careers",
    category: "Workforce Upskilling Portal",
    domain: "cielskillsandcareers.com",
    myRole: "Web Developer",
    description: "Education and professional training platform. Implemented modern catalog navigation, domain access coordination, Cloudflare setup, and analytics instrumentation.",
    capabilities: ["Portal Architecture", "SEO & Schema", "Nameserver Routing", "Cloudflare Setup"],
    metrics: "Zero-latency search, automated lead qualification, end-to-end VAPT",
    keyWork: [
      "Built and launched portal end-to-end from domain coordination to go-live",
      "Configured nameserver routing, Cloudflare edge, and SSL termination",
      "Conducted VAPT remediation and verified clean security posture",
      "Instrumented GA4 and Google Search Console indexing fleets"
    ]
  },
  {
    name: "Courseplay.ai",
    category: "Enterprise Learning Cloud",
    domain: "courseplay.ai",
    myRole: "Architecture & Automation Lead",
    description: "AI-driven corporate training platform. Provided web infrastructure consultation, performance tuning, domain security consolidation, and zero-downtime domain migration.",
    capabilities: ["Zero-Downtime Migration", "Performance Tuning", "Wildcard SSL", "n8n Automation"],
    metrics: "courseplay.co → courseplay.ai migration with zero downtime",
    keyWork: [
      "Executed zero-downtime domain migration from courseplay.co to courseplay.ai",
      "Configured wildcard SSL certificates and automated renewal daemons",
      "Built n8n automation pipelines for real-time lead intelligence",
      "Consolidated edge routing into centralized Cloudflare posture"
    ]
  },
  {
    name: "hfactor.digital",
    category: "HR Tech Digital Innovation",
    domain: "hfactor.digital",
    myRole: "Lead Developer",
    description: "Next-generation digital HR and consulting platform. Handled full website rebuild, AI solution integration, technical SEO baseline, and production deployment.",
    capabilities: ["React & Supabase", "AI Solution Integration", "Chatbot Rebuild", "IVR Automation"],
    metrics: "Sub-1.2s Core Web Vitals, automated Google Ads conversion tracking",
    keyWork: [
      "Engineered new website with React, Supabase, and custom PHP backend",
      "Integrated AI solution workflows and interactive chatbot engine",
      "Implemented Exotel IVR call routing and automated reporting",
      "Configured Google Ads conversion tracking and UTM attribution"
    ]
  },
  {
    name: "Ma Foi Business Consulting",
    category: "Strategic Advisory Platform",
    domain: "mafoibusinessconsulting.com",
    myRole: "Platform Owner — Audit, Recovery & PHP Backend",
    description: "Executive advisory firm platform. Performed full platform audit, license recovery, resolved critical 100% CPU hosting crashes, and hardened WordPress CMS security.",
    capabilities: ["Critical Incident Recovery", "100% CPU Resolution", "SQL Query Optimization", "CMS Hardening"],
    metrics: "Critical 100% CPU hosting incident resolved",
    keyWork: [
      "Resolved critical 100% CPU production hosting outage by diagnosing repeated SQL queries",
      "Conducted full platform audit, database backup, and license recovery",
      "Eliminated domain and email routing conflicts on cPanel environment",
      "Contained malware incident within 3 hours and published root-cause report"
    ]
  },
  {
    name: "The MaFoi Foundation",
    category: "Social Impact & Philanthropy",
    domain: "themafoifoundation.in",
    myRole: "Lead Web Developer & Architect",
    description: "Philanthropic institution empowering underprivileged communities through education and livelihood initiatives. Architected accessible, high-performance web presence from scratch.",
    capabilities: ["Astro Modern Architecture", "30+ Custom Pages", "50+ Modules", "WCAG AA Accessibility"],
    metrics: "Sub-1.2s FCP, 98+ Lighthouse accessibility score",
    keyWork: [
      "Built from scratch with 30+ custom landing pages and 50+ custom modules",
      "Delivered Astro-based architecture on main branch and static HTML/CSS on skilling branch",
      "Enforced WCAG AA accessibility compliance for screen readers and high contrast",
      "Structured SEO schema enhancing visibility for educational initiatives"
    ]
  }
];

export const CAPABILITY_CONSTELLATION = [
  {
    pillar: "BUILD",
    group: "Application Engineering",
    description: "Building production-grade web systems from core protocols to browser paint.",
    skills: ["TypeScript / JavaScript", "React & Modern SPA", "Node.js & Express", "PHP & Custom Plugins", "Vite & Tooling", "Web Components & Shadow DOM", "Astro & Static Builds"]
  },
  {
    pillar: "SECURE",
    group: "Application & Edge Security",
    description: "Designing defensive architectures where security is baked into geometry.",
    skills: ["7 VAPT Engagements Led", "Cloudflare WAF Rules", "10,261 Brute-Force Neutralized", "CVE-2026-24049 Triage", "Auth & Session Hardening", "Rate Limiting & IP Policies", "Privilege Escalation Fixes"]
  },
  {
    pillar: "AUTOMATE",
    group: "Automation & Workflows",
    description: "Eliminating human friction with event-driven asynchronous pipelines.",
    skills: ["n8n Orchestration", "Google Apps Script", "Webhook Infrastructure", "Zoho CRM & SalesIQ APIs", "WhatsApp Bot Automation", "Exotel IVR Integration", "Automated Daily Reports"]
  },
  {
    pillar: "SCALE",
    group: "Cloud & Infrastructure",
    description: "Solid foundations on physical servers, virtualization and cloud edge.",
    skills: ["TrueNAS 100+ User Storage", "Linux Ubuntu / Debian", "Docker & Docker Compose", "AWS EC2 & S3 Hardening", "cPanel/WHM Fleet", "DNS, SSL/TLS Consolidation", "NeonDB → Postgres Migration"]
  },
  {
    pillar: "SCALE",
    group: "Growth & Technical SEO",
    description: "Bridging the gap between software engineering and organic search crawl capacity.",
    skills: ["390+ SEO Landing Pages", "10k+ Crawl Requests in 24h", "AEO / GEO Knowledge Graphs", "Schema.org JSON-LD", "Core Web Vitals Tuning", "GA4 / GTM Fleet", "Google Search Console Fleet"]
  },
  {
    pillar: "BUILD",
    group: "AI Workflows & Local Telemetry",
    description: "Practical engineering for AI tools without the marketing fluff.",
    skills: ["AIRadar (Manifest V3)", "Token & Quota Telemetry", "Claude Code Workflows", "LLM Pipeline Integration", "Local-First Architecture", "Privacy-Preserving Workflows"]
  }
];
