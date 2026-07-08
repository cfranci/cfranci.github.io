export type Category =
  | 'web'
  | 'electron'
  | 'swift'
  | 'mobile'
  | 'extension'
  | 'automation'
  | 'private'
  | 'oss';

export interface WebProject {
  id: string;
  name: string;
  domain: string;
  url: string;
  image: string;
  kicker: string;
  blurb: string;
  tags: string[];
  category: Category;
  feature?: boolean;
  probe?: string;
}

export interface AppProject {
  id: string;
  name: string;
  platform: 'electron' | 'swift' | 'mobile' | 'extension';
  badge: string;
  hotBadge?: boolean;
  blurb: string;
  tags: string[];
  icon?: string;
  monogram?: string;
  image?: string;
  url?: string;
}

export interface LedgerItem {
  id: string;
  name: string;
  badge: string;
  blurb: string;
  tags: string[];
  icon?: string;
  monogram?: string;
  url?: string;
}

export const SWEEP_DATE = 'JUL 8 2026';

export const webProjects: WebProject[] = [
  {
    id: 'ilios', name: 'Ilios Rentals', domain: 'iliosrentals.com',
    url: 'https://iliosrentals.com', image: '/assets/ilios-tall.webp',
    kicker: 'HOSPITALITY', feature: true,
    probe: 'https://iliosrentals.com/favicon.ico',
    blurb: 'Vacation-rental platform for E11EVEN Hotel & Residences Miami. Availability and nightly pricing come straight from the live property calendar, and every new unit gets SEO-optimized pages with zero extra code.',
    tags: ['Next.js', 'Cloudflare Workers', 'Guesty API', 'Stripe', 'SEO'],
    category: 'web',
  },
  {
    id: 'yachts', name: 'Miami Vice Yachts', domain: 'yachtsmiamivice.com',
    url: 'https://yachtsmiamivice.com', image: '/assets/yachts-tall.webp',
    kicker: 'HOSPITALITY',
    blurb: 'Charter site for a Miami yacht fleet. Guests browse by experience, sandbar days, sunset cruises, party charters, instead of digging through boat specs.',
    tags: ['Static SPA', 'Supabase', 'Square'],
    category: 'web',
  },
  {
    id: 'e11vip', name: 'E11VIP Service', domain: 'e11vip.com',
    url: 'https://e11vip.com', image: '/assets/e11vip-tall.webp',
    kicker: 'HOSPITALITY',
    blurb: 'Service-request portal connecting residence owners with the maintenance team behind them. Sign in with Google or an email link; every request is tracked from report to resolution.',
    tags: ['Cloudflare Workers', 'Supabase', 'SSO'],
    category: 'web',
  },
  {
    id: 'readyapp', name: 'Ready App', domain: 'ready-app.com',
    url: 'https://ready-app.com', image: '/assets/readyapp-tall.webp',
    kicker: 'LOGISTICS',
    probe: 'https://ready-app.com/favicon.ico',
    blurb: 'The verification layer for modern freight: drivers, carriers, and brokers on one verification-first platform. I build across the web apps, the admin portal, and the backend.',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Fintech'],
    category: 'web',
  },
  {
    id: 'jobs', name: 'Ready App Jobs', domain: 'ready-app-jobs.readyapp.workers.dev',
    url: 'https://ready-app-jobs.readyapp.workers.dev', image: '/assets/jobs-tall.webp',
    kicker: 'LOGISTICS',
    probe: 'https://ready-app-jobs.readyapp.workers.dev/icon.png',
    blurb: 'Job board where a driver applies once: build a passport of CDL documents, then apply to any load on the board with a single tap.',
    tags: ['Next.js', 'Cloudflare Workers', 'SEO'],
    category: 'web',
  },
  {
    id: 'ravesanta', name: 'Rave Santa', domain: 'ravesanta.com',
    url: 'https://ravesanta.com', image: '/assets/ravesanta-tall.webp',
    kicker: 'EVENTS',
    probe: 'https://ravesanta.com/favicon.ico',
    blurb: 'Signup site for a July 4th pool party: RSVP flow, guest list, and an admin view. Took the launch-day traffic spike in stride on a free-tier stack.',
    tags: ['Cloudflare Pages', 'Workers KV'],
    category: 'web',
  },
  {
    id: 'vividash', name: 'InvoicePro', domain: 'vividash.com',
    url: 'https://vividash.com', image: '/assets/vividash-tall.webp',
    kicker: 'TOOLS',
    probe: 'https://vividash.com/favicon.ico',
    blurb: 'Invoice and quote generator for freelancers and small businesses: AI-powered invoice parsing, QR-code payments, and two-party e-signing on uploaded PDFs.',
    tags: ['React', 'Vite', 'Supabase', 'AI'],
    category: 'web',
  },
  {
    id: 'contrology', name: 'Contrology Connection', domain: 'contrologyconnection.com',
    url: 'https://contrologyconnection.com', image: '/assets/contrology-tall.webp',
    kicker: 'EDUCATION',
    blurb: 'Certification platform for Pilates teacher training: program pages, enrollment, and the path from student to certified instructor.',
    tags: ['Next.js', 'Cloudflare', 'Supabase'],
    category: 'web',
  },
];

export const appProjects: AppProject[] = [
  {
    id: 'shifted', name: 'Shifted', platform: 'electron',
    badge: 'RELEASE PIPELINE READY', icon: '/assets/icon-shifted.webp',
    blurb: 'Desktop email hub: every Gmail account in one window with dashboards and notifications. Passcode hashed with scrypt, real Touch ID, hardened against NIST 800-63B.',
    tags: ['Electron', 'TypeScript', 'Security'],
  },
  {
    id: 'menubarbuddy', name: 'MenuBarBuddy', platform: 'swift',
    badge: 'LAUNCHING · $4.20', hotBadge: true, image: '/assets/menubarbuddy-tall.webp',
    blurb: 'macOS menu-bar manager built for macOS 26 Tahoe: hides icon overflow behind a single dot and survives the collapse bug that kills the other hiders. Self-repairing watchdog, one-command install, sold direct.',
    tags: ['Swift', 'AppKit', 'macOS'],
  },
  {
    id: 'touchproxy', name: 'TouchProxy', platform: 'swift',
    badge: 'DAILY DRIVER', monogram: 'TP',
    blurb: 'Screen streaming and virtual displays for the Mac: drive the desktop from a phone or iPad, with an auto-mirrored HiDPI virtual display for extra room.',
    tags: ['Swift', 'CoreGraphics', 'macOS'],
  },
  {
    id: 'simpledictation', name: 'SimpleDictation', platform: 'swift',
    badge: 'TEAM-DEPLOYED', monogram: 'SD',
    blurb: 'Push-to-talk dictation for Mac and Windows. Runs on startup across the Ready App team’s machines.',
    tags: ['Swift', 'Speech', 'macOS', 'Windows'],
  },
  {
    id: 'readydriver', name: 'Ready Driver', platform: 'mobile',
    badge: 'ON TESTFLIGHT', icon: '/assets/icon-readydriver.webp',
    blurb: 'Driver companion app for Ready App: loads, documents, and scores in a pocket. Shipped to TestFlight from a one-person build pipeline.',
    tags: ['Expo', 'React Native', 'iOS'],
  },
  {
    id: 'tabview', name: 'TabView', platform: 'extension',
    badge: 'CHROME STORE · IN REVIEW', hotBadge: true, icon: '/assets/icon-tabview.webp',
    url: 'https://github.com/cfranci/TabView',
    blurb: 'Chrome extension that turns tab overload into a visual grid: live previews, per-tab memory use, AI grouping, session restore.',
    tags: ['Chrome Extension', 'Manifest V3', 'AI'],
  },
];

export const automations: LedgerItem[] = [
  {
    id: 'handoff', name: 'Daily Handoff', badge: 'LAUNCHD · 3AM',
    blurb: 'Nightly job that writes a rolling handoff of everything that moved across every project, so each morning starts with full context instead of archaeology.',
    tags: ['launchd', 'Automation'],
  },
  {
    id: 'ravesanta-ops', name: 'Rave Santa Ops Agents', badge: 'SELF-HEALING',
    blurb: 'Agents that watched signups, synced the guest sheet, and kept the site inside free-tier quotas through party-day traffic, then fixed what broke without being asked.',
    tags: ['launchd', 'Cloudflare KV', 'Google Sheets'],
  },
  {
    id: 'ilios-social', name: 'Ilios Social Pipeline', badge: 'IN PRODUCTION',
    blurb: 'Content pipeline for the rentals brand: drafts, schedules, and cross-posts to every platform from one admin surface.',
    tags: ['Cloudflare Workers', 'Automation', 'Marketing'],
  },
  {
    id: 'linkedin-bot', name: 'LinkedIn Inbox Bot', badge: 'HUMAN-APPROVED',
    blurb: 'Sweeps unread LinkedIn messages, drafts replies in my tone into an approval queue, and sends only what gets a green light.',
    tags: ['Automation', 'AI'],
  },
  {
    id: 'imsg', name: 'iMessage Triage', badge: 'ON DEMAND',
    blurb: 'Scans for unreplied threads, classifies them by relationship, and drafts replies in tone, one command from inbox-zero for texts.',
    tags: ['AppleScript', 'AI'],
  },
  {
    id: 'team-configs', name: 'Team Config Auto-Update', badge: '6 SEATS',
    blurb: 'Self-updating Claude Code configs for the whole team: push to a teammate’s repo and their machine syncs itself on next launch.',
    tags: ['DevEx', 'Git', 'Automation'],
  },
  {
    id: 'wonderstand', name: 'Wonderstand', badge: 'LAUNCHD',
    blurb: 'Recording ingest pipeline: drop a voice memo in, structured transcripts and notes come out.',
    tags: ['Python', 'Whisper', 'launchd'],
  },
];

export const privatePlatforms: LedgerItem[] = [
  {
    id: 'roomtab', name: 'RoomTab', badge: 'FIELD TEST', icon: '/assets/icon-roomtab.webp',
    blurb: 'Walkthrough-to-charge minibar platform for E11EVEN Residences: QR code per unit, bilingual speech-driven capture, guest pay-by-QR store, and a storage inventory ledger. Field-testing in units this week.',
    tags: ['Next.js', 'Supabase', 'Stripe', 'Speech'],
  },
  {
    id: 'ilios-admin', name: 'Ilios Admin Suite', badge: 'IN PRODUCTION', monogram: 'IL',
    blurb: 'The operations brain behind Ilios Rentals: social media manager, live Guesty revenue dashboard, concierge vendor tracker with tracked referral links, and an in-context marketing image editor. SSO-gated on its own admin domain.',
    tags: ['Cloudflare Workers', 'KV', 'SSO'],
  },
  {
    id: 'ra-admin', name: 'Ready App Admin', badge: 'IN PRODUCTION', monogram: 'RA',
    blurb: 'Internal portal for the freight platform: Stripe-native affiliate system with tracked links and a payout ledger, finance dashboards fed by the app stores, and the brand hub.',
    tags: ['Cloudflare', 'D1', 'Stripe'],
  },
  {
    id: 'ra-rebuild', name: 'Ready App Rebuild', badge: 'IN FLIGHT', monogram: 'RB',
    blurb: 'Ground-up rebuild of the whole product line: admin with 21 routes, driver web app, team boards, mobile app, and a shared design system, with auth hardened to NIST 800-63B on a live Supabase backend.',
    tags: ['Next.js', 'Monorepo', 'Design System', 'Security'],
  },
  {
    id: 'knowledge-hub', name: 'Knowledge Hub', badge: 'IN PRODUCTION', monogram: 'KH',
    blurb: 'Shared-knowledge MCP server for the team: Cloudflare Workers, pgvector semantic search, and Workers AI embeddings, so every teammate’s assistant answers from the same brain.',
    tags: ['MCP', 'pgvector', 'Workers AI'],
  },
  {
    id: 'live-shows', name: 'Live Shows', badge: 'SHOW-READY', monogram: 'LS',
    blurb: 'Broadcast overlay system for Ready App podcasts and livestreams: custom HTML overlays composited over StreamYard through OBS.',
    tags: ['OBS', 'HTML Overlays'],
  },
];

export const openSource: LedgerItem[] = [
  {
    id: 'security-audit', name: 'security-audit', badge: 'PUBLIC', monogram: 'SA',
    url: 'https://github.com/cfranci/security-audit',
    blurb: 'One-command, multi-agent security audit for any codebase: dimension-focused finders, adversarial verification of every claim, and findings routed straight to Linear, Notion, or markdown.',
    tags: ['AI Agents', 'Security', 'CLI'],
  },
  {
    id: 'debug-map', name: 'project-debug-map', badge: 'PUBLIC', monogram: 'DM',
    url: 'https://github.com/cfranci/project-debug-map',
    blurb: 'Visual debug map for websites and iOS apps: a page-by-page site map with device views, per-page Kanban bug tracking, and an iOS Simulator lane with live view and console.',
    tags: ['DevTools', 'iOS Simulator', 'Kanban'],
  },
];

export const manifest = [
  ...webProjects.map(p => ({ id: p.id, domain: p.domain, probe: p.probe ?? null, review: false })),
  { id: 'tabview', domain: 'chromewebstore · TabView', probe: null, review: true },
];
