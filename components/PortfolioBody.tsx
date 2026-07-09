'use client';

import { useEffect, useRef, useState } from 'react';
import {
  webProjects, appProjects, automations, clientBuilds, privatePlatforms, openSource,
  manifest, SWEEP_DATE, type AppProject, type LedgerItem,
} from '@/data/site';

type Filter = 'all' | 'web' | 'electron' | 'swift' | 'mobile' | 'extension' | 'automation' | 'client' | 'private' | 'oss';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'web', label: 'WEB' },
  { key: 'electron', label: 'ELECTRON' },
  { key: 'swift', label: 'SWIFT & MACOS' },
  { key: 'mobile', label: 'MOBILE' },
  { key: 'extension', label: 'EXTENSIONS' },
  { key: 'automation', label: 'AUTOMATIONS' },
  { key: 'client', label: 'CLIENT BUILDS' },
  { key: 'private', label: 'BEHIND THE LOGIN' },
  { key: 'oss', label: 'OPEN SOURCE' },
];

const MARQUEE = [
  'ILIOSRENTALS.COM', 'YACHTSMIAMIVICE.COM', 'E11VIP.COM', 'READY-APP.COM', 'RAVESANTA.COM',
  'VIVIDASH.COM', 'CONTROLOGYCONNECTION.COM', 'THE GUESTBOOK', 'GABBY #77',
  'MYSTAYVA', 'READY-APP JOBS', 'READY DRIVER ON TESTFLIGHT', 'TABVIEW IN STORE REVIEW',
  '9 AUTOMATIONS RUNNING', 'GAVEL MOUSE ON DUTY',
];

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="tags">
      {tags.map(t => <span key={t}>{t}</span>)}
    </div>
  );
}

function useMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // reveal in AND out (fade back in on re-entry)
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('in', e.isIntersecting)),
      { rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('.fx').forEach((el, i) => {
      (el as HTMLElement).style.setProperty('--i', String(i % 8));
      io.observe(el);
    });

    if (reduced) return () => io.disconnect();

    // cursor glow + ring with lerp trailing
    const glow = document.querySelector<HTMLElement>('.glow');
    let mx = innerWidth / 2, my = innerHeight / 3;
    let gx = mx, gy = my;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    addEventListener('mousemove', onMove, { passive: true });

    // 3D tilt on frames and tiles
    const tiltEls = document.querySelectorAll<HTMLElement>('.frame, .tile:not(.wide)');
    const tiltHandlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];
    tiltEls.forEach(el => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-4px)`;
      };
      const leave = () => { el.style.transform = ''; };
      el.addEventListener('mousemove', move, { passive: true });
      el.addEventListener('mouseleave', leave);
      tiltHandlers.push([el, move, leave]);
    });

    // scroll progress + hero parallax
    const bar = document.querySelector<HTMLElement>('.progress');
    const heroInner = document.querySelector<HTMLElement>('.hero-inner');

    let raf = 0;
    const tick = () => {
      gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
      if (glow) glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      const doc = document.documentElement;
      const p = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (heroInner) heroInner.style.transform = `translateY(${doc.scrollTop * 0.16}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      removeEventListener('mousemove', onMove);
      tiltHandlers.forEach(([el, move, leave]) => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); });
      cancelAnimationFrame(raf);
    };
  }, []);
}

function useLiveChecks() {
  const [up, setUp] = useState<Record<string, boolean>>({});
  useEffect(() => {
    manifest.forEach(m => {
      if (!m.probe) return;
      const img = new Image();
      const t = setTimeout(() => { img.src = ''; }, 6000);
      img.onload = () => { clearTimeout(t); setUp(prev => ({ ...prev, [m.id]: true })); };
      img.onerror = () => clearTimeout(t);
      img.src = `${m.probe}?cachebust=${Date.now()}`;
    });
  }, []);
  return up;
}

function AppTile({ app }: { app: AppProject }) {
  const title = app.url
    ? <a href={app.url}>{app.name}</a>
    : app.name;
  if (app.image) {
    return (
      <div className="tile wide fx" data-cat={app.platform}>
        <span className="shot" aria-label={`${app.name} landing page`}>
          <img src={app.image} alt={`${app.name} landing page`} loading="lazy" />
        </span>
        <div className="tile-body">
          <div className="tile-top" style={{ justifyContent: 'space-between' }}>
            <h3>{title}</h3>
            <span className={`badge${app.hotBadge ? ' hot' : ''}`}>{app.badge}</span>
          </div>
          <p>{app.blurb}</p>
          <Tags tags={app.tags} />
        </div>
      </div>
    );
  }
  return (
    <div className="tile fx" data-cat={app.platform}>
      <div className="tile-top">
        {app.icon
          ? <img src={app.icon} alt="" width={52} height={52} />
          : <span className="monogram">{app.monogram}</span>}
        <h3>{title}</h3>
      </div>
      <span className={`badge${app.hotBadge ? ' hot' : ''}`}>{app.badge}</span>
      <p>{app.blurb}</p>
      <Tags tags={app.tags} />
    </div>
  );
}

function LedgerRow({ item }: { item: LedgerItem }) {
  return (
    <li className="fx">
      {item.icon
        ? <img src={item.icon} alt="" />
        : <span className="monogram">{item.monogram ?? item.name.slice(0, 2).toUpperCase()}</span>}
      <div>
        <h3>{item.url ? <a href={item.url}>{item.name}</a> : item.name}</h3>
        <p>{item.blurb}</p>
        {item.url && <a className="repolink" href={item.url}>{item.url.replace('https://', '')}</a>}
        <Tags tags={item.tags} />
      </div>
      <span className="badge">{item.badge}</span>
    </li>
  );
}

const COUNTS: Record<Filter, number> = {
  all: webProjects.length + appProjects.length + automations.length + clientBuilds.length + privatePlatforms.length + openSource.length,
  web: webProjects.length,
  electron: appProjects.filter(a => a.platform === 'electron').length,
  swift: appProjects.filter(a => a.platform === 'swift').length,
  mobile: appProjects.filter(a => a.platform === 'mobile').length,
  extension: appProjects.filter(a => a.platform === 'extension').length,
  automation: automations.length,
  client: clientBuilds.length,
  private: privatePlatforms.length,
  oss: openSource.length,
};

export default function PortfolioBody() {
  const [filter, setFilter] = useState<Filter>('all');
  const up = useLiveChecks();
  useMotion();

  const show = (cat: Filter) => filter === 'all' || filter === cat;
  const appsVisible = (['electron', 'swift', 'mobile', 'extension'] as Filter[]).some(show);

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />

      <header className="hero">
        <div className="wrap hero-inner">
          <p className="eyebrow">CHASE FRANCIS &nbsp;·&nbsp; MIAMI, FL</p>
          <h1>
            <span className="line"><span>Everything here</span></span>
            <span className="line"><span>is live<span className="dot">.</span></span></span>
          </h1>
          <p className="lede">
            I build and launch products fast: hospitality platforms for Miami&apos;s biggest venues, logistics
            software for modern freight, desktop and mobile apps, automations that run while I sleep, and tools
            people use every day. <strong>Every screenshot below links to a working product, and this page checks
            its own links while you read it.</strong>
          </p>
          <div className="hero-links">
            <a className="btn primary" href="mailto:chaseefrancis1@gmail.com">Email me</a>
            <a className="btn" href="https://github.com/cfranci">GitHub</a>
          </div>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...MARQUEE, ...MARQUEE].map((m, i) => <span key={i}>{m} <b>·</b></span>)}
          </div>
        </div>
      </header>

      <section className="manifest" aria-label="Live status of every project">
        <div className="wrap">
          <h2>MANIFEST — LAST FULL SWEEP {SWEEP_DATE} · LIVE CHECKS RUN IN YOUR BROWSER</h2>
          <ol>
            {manifest.map(m => (
              <li key={m.id}>
                <a href={`#${m.id}`}>
                  <span className="domain">{m.domain}</span>
                  <span className={`status${m.review ? ' review' : up[m.id] ? ' up' : ''}`}>
                    {m.review ? 'IN REVIEW' : up[m.id] ? 'UP NOW' : 'VERIFIED 07.08'}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <nav className="filterbar" aria-label="Filter projects">
        <div className="filterbar-inner">
          {FILTERS.map(f => (
            <button
              key={f.key}
              className={`chip${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}<span className="n">{COUNTS[f.key]}</span>
            </button>
          ))}
        </div>
      </nav>

      <main>
        <section data-band id="web" className={show('web') ? '' : 'hidden-band'}>
          <div className="wrap">
            <span className="ghost" aria-hidden="true">WEB</span>
            <div className="band-head fx">
              <h2>Live on the web</h2>
              <span className="note">11 SITES · HOVER ANY SCREENSHOT TO SCROLL THE REAL PAGE</span>
            </div>
            <div className="grid">
              {webProjects.map(p => (
                <article key={p.id} id={p.id} className={`project fx${p.feature ? ' feature' : ''}`}>
                  <div className="frame">
                    <div className="chrome">
                      <span className="chrome-dots"><i /><i /><i /></span>
                      <a className="urlbar" href={p.url}>{p.domain}</a>
                      <span className="live"><b />LIVE</span>
                    </div>
                    <a className="shot" href={p.url}>
                      <img src={p.image} alt={`${p.name} — live site screenshot`} loading="lazy" />
                    </a>
                  </div>
                  <div className="meta">
                    <span className="kicker">{p.kicker}</span>
                    <h3><a href={p.url}>{p.name}</a></h3>
                    <p>{p.blurb}</p>
                    <Tags tags={p.tags} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="statement" aria-label="How fast things ship">
          <div className="wrap">
            <p className="fx">Idea on Monday. <b>Live by Friday<span className="dot">.</span></b></p>
          </div>
        </section>

        <section data-band id="apps" className={appsVisible ? '' : 'hidden-band'}>
          <div className="wrap">
            <span className="ghost" aria-hidden="true">APPS</span>
            <div className="band-head fx">
              <h2>Apps &amp; tools</h2>
              <span className="note">ELECTRON · SWIFT · MOBILE · EXTENSIONS</span>
            </div>

            {show('electron') && (
              <>
                <p className="subhead fx">ELECTRON</p>
                <div className="tiles">
                  {appProjects.filter(a => a.platform === 'electron').map(a => <AppTile key={a.id} app={a} />)}
                </div>
              </>
            )}

            {show('swift') && (
              <>
                <p className="subhead fx">SWIFT &amp; MACOS</p>
                <div className="tiles">
                  {appProjects.filter(a => a.platform === 'swift').map(a => <AppTile key={a.id} app={a} />)}
                </div>
              </>
            )}

            {(show('mobile') || show('extension')) && (
              <>
                <p className="subhead fx">MOBILE &amp; EXTENSIONS</p>
                <div className="tiles">
                  {appProjects
                    .filter(a => (a.platform === 'mobile' && show('mobile')) || (a.platform === 'extension' && show('extension')))
                    .map(a => <AppTile key={a.id} app={a} />)}
                </div>
              </>
            )}
          </div>
        </section>

        <section data-band id="client" className={show('client') ? '' : 'hidden-band'}>
          <div className="wrap">
            <span className="ghost" aria-hidden="true">CLIENTS</span>
            <div className="band-head fx">
              <h2>Client builds</h2>
              <span className="note">DESIGNED · BUILT · HANDED OVER</span>
            </div>
            <ul className="ledger">
              {clientBuilds.map(c => <LedgerRow key={c.id} item={c} />)}
            </ul>
          </div>
        </section>

        <section data-band id="automations" className={show('automation') ? '' : 'hidden-band'}>
          <div className="wrap">
            <span className="ghost" aria-hidden="true">AUTOS</span>
            <div className="band-head fx">
              <h2>Automations</h2>
              <span className="note">RUNNING WHILE I SLEEP</span>
            </div>
            <ul className="ledger">
              {automations.map(a => <LedgerRow key={a.id} item={a} />)}
            </ul>
          </div>
        </section>

        <section data-band id="private" className={`private-band${show('private') ? '' : ' hidden-band'}`}>
          <div className="wrap">
            <span className="ghost" aria-hidden="true">PRIVATE</span>
            <div className="band-head fx">
              <h2>Behind the login</h2>
              <span className="note">IN PRODUCTION · NOT PUBLIC</span>
            </div>
            <ul className="ledger">
              {privatePlatforms.map(p => <LedgerRow key={p.id} item={p} />)}
            </ul>
          </div>
        </section>

        <section data-band id="oss" className={show('oss') ? '' : 'hidden-band'}>
          <div className="wrap">
            <span className="ghost" aria-hidden="true">SOURCE</span>
            <div className="band-head fx">
              <h2>Open source</h2>
              <span className="note">CLONE &amp; RUN</span>
            </div>
            <ul className="ledger">
              {openSource.map(o => <LedgerRow key={o.id} item={o} />)}
            </ul>
          </div>
        </section>
      </main>

      <footer className="foot">
        <img className="big-gavel" src="/assets/gm-cursor.png" alt="" aria-hidden="true" title="Order in the court." />
        <div className="wrap">
          <h2 className="fx">Have something that needs to exist by Friday<span className="dot">?</span></h2>
          <div className="hero-links fx">
            <a className="btn primary" href="mailto:chaseefrancis1@gmail.com">chaseefrancis1@gmail.com</a>
            <a className="btn" href="https://github.com/cfranci">github.com/cfranci</a>
          </div>
          <div className="small">
            <span>© 2026 Chase Francis · Miami, FL</span>
            <span>11 live sites · 10 apps · 9 automations · 8 client builds · 6 private platforms · 5 open-source kits</span>
          </div>
        </div>
      </footer>
    </>
  );
}
