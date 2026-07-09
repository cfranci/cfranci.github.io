'use client';

import { useEffect, useState } from 'react';
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

function Stack({ tags }: { tags: string[] }) {
  return <p className="stackline">Stack — <b>{tags.join(' · ')}</b></p>;
}

function useMotion() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('in', e.isIntersecting)),
      { rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll('.fx').forEach((el, i) => {
      (el as HTMLElement).style.setProperty('--i', String(i % 6));
      io.observe(el);
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return () => io.disconnect();

    const bar = document.querySelector<HTMLElement>('.progress');
    let raf = 0;
    const tick = () => {
      const doc = document.documentElement;
      const p = doc.scrollTop / (doc.scrollHeight - doc.clientHeight || 1);
      if (bar) bar.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
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

function AppRow({ app }: { app: AppProject }) {
  const title = app.url ? <a href={app.url}>{app.name}</a> : app.name;
  if (app.image) {
    return (
      <div className="app-feature fx">
        <div className="media">
          <div className="media-cap">
            <span>{app.name} — landing page</span>
            <span className={`live${app.hotBadge ? '' : ' review'}`}>{app.badge}</span>
          </div>
          <span className="shot"><img src={app.image} alt={`${app.name} landing page`} loading="lazy" /></span>
        </div>
        <div className="info">
          <h3>{title}</h3>
          <p>{app.blurb}</p>
          <Stack tags={app.tags} />
        </div>
      </div>
    );
  }
  return (
    <div className="app-row fx">
      {app.icon
        ? <img className="appicon" src={app.icon} alt="" width={44} height={44} />
        : <span className="monogram">{app.monogram}</span>}
      <div>
        <h3>{title}</h3>
        <p>{app.blurb}</p>
        <Stack tags={app.tags} />
      </div>
      <span className={`badge${app.hotBadge ? ' hot' : ''}`}>[{app.badge}]</span>
    </div>
  );
}

function LedgerRow({ item }: { item: LedgerItem }) {
  return (
    <li className="fx">
      <div>
        <h3>{item.url ? <a href={item.url}>{item.name}</a> : item.name}</h3>
        <p>{item.blurb}</p>
        {item.url && <a className="repolink" href={item.url}>{item.url.replace('https://', '')} ↗</a>}
        <Stack tags={item.tags} />
      </div>
      <span className="badge">[{item.badge}]</span>
    </li>
  );
}

export default function PortfolioBody() {
  const [filter, setFilter] = useState<Filter>('all');
  const up = useLiveChecks();
  useMotion();

  const show = (cat: Filter) => filter === 'all' || filter === cat;
  const appsVisible = (['electron', 'swift', 'mobile', 'extension'] as Filter[]).some(show);

  return (
    <>
      <div className="progress" aria-hidden="true" />

      <header className="hero">
        <div className="wrap hero-grid">
          <div className="hero-left">
            <p className="eyebrow">CHASE FRANCIS <b>·</b> PRODUCT ENGINEER <b>·</b> MIAMI, FL</p>
            <h1>Everything here is live<span className="dot">.</span></h1>
            <p className="lede">
              Hospitality platforms for Miami&apos;s biggest venues, logistics software for modern freight,
              desktop and mobile apps, and automations that run while I sleep.
              {' '}<strong>Every entry links to a working product, and this page checks its own links while you read it.</strong>
            </p>
            <div className="hero-links">
              <a className="textlink solid" href="mailto:chaseefrancis1@gmail.com">Email me</a>
              <a className="textlink" href="https://github.com/cfranci">github.com/cfranci</a>
            </div>
          </div>

          <aside className="hero-right manifest" aria-label="Live status of every project">
            <h2>INDEX — CHECKED IN YOUR BROWSER</h2>
            <ol>
              {manifest.map(m => (
                <li key={m.id}>
                  <a href={`#${m.id}`}>
                    <span className="domain">{m.domain}</span>
                    <span className={`status${m.review ? ' review' : up[m.id] ? ' up' : ''}`}>
                      {m.review ? 'in review' : up[m.id] ? 'up now' : 'ok 07.08'}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
            <p className="foot-note">LAST FULL SWEEP {SWEEP_DATE} · ▪ = CONFIRMED FROM YOUR CONNECTION</p>
          </aside>
        </div>
      </header>

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
            <div className="band-head fx">
              <h2>Live on the web</h2>
              <span className="note">{webProjects.length} SITES — HOVER A CAPTURE TO SCROLL THE REAL PAGE</span>
            </div>
            <div className="entries">
              {webProjects.map((p, i) => (
                <article key={p.id} id={p.id} className="entry fx">
                  <div className="media">
                    <div className="media-cap">
                      <a href={p.url}>{p.domain} ↗</a>
                      <span className="live">LIVE</span>
                    </div>
                    <a className="shot" href={p.url}>
                      <img src={p.image} alt={`${p.name} — live site capture`} loading="lazy" />
                    </a>
                  </div>
                  <div className="info">
                    <span className="idx"><b>{String(i + 1).padStart(2, '0')}</b> / {p.kicker}</span>
                    <h3><a href={p.url}>{p.name}</a></h3>
                    <a className="domainline" href={p.url}>{p.domain}</a>
                    <p>{p.blurb}</p>
                    <Stack tags={p.tags} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section data-band id="apps" className={appsVisible ? '' : 'hidden-band'}>
          <div className="wrap">
            <div className="band-head fx">
              <h2>Apps &amp; tools</h2>
              <span className="note">ELECTRON · SWIFT · MOBILE · EXTENSIONS</span>
            </div>

            {show('electron') && (
              <>
                <p className="subhead fx">ELECTRON</p>
                <div className="app-list">
                  {appProjects.filter(a => a.platform === 'electron').map(a => <AppRow key={a.id} app={a} />)}
                </div>
              </>
            )}

            {show('swift') && (
              <>
                <p className="subhead fx">SWIFT &amp; MACOS</p>
                <div className="app-list">
                  {appProjects.filter(a => a.platform === 'swift').map(a => <AppRow key={a.id} app={a} />)}
                </div>
              </>
            )}

            {(show('mobile') || show('extension')) && (
              <>
                <p className="subhead fx">MOBILE &amp; EXTENSIONS</p>
                <div className="app-list">
                  {appProjects
                    .filter(a => (a.platform === 'mobile' && show('mobile')) || (a.platform === 'extension' && show('extension')))
                    .map(a => <AppRow key={a.id} app={a} />)}
                </div>
              </>
            )}
          </div>
        </section>

        <section data-band id="client" className={show('client') ? '' : 'hidden-band'}>
          <div className="wrap">
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
          <p className="kicker">IDEA ON MONDAY <b>·</b> LIVE BY FRIDAY</p>
          <h2 className="fx">Have something that needs to exist by Friday<span className="dot">?</span></h2>
          <div className="hero-links fx">
            <a className="textlink solid" href="mailto:chaseefrancis1@gmail.com">chaseefrancis1@gmail.com</a>
            <a className="textlink" href="https://github.com/cfranci">github.com/cfranci</a>
          </div>
          <div className="small">
            <span>© 2026 Chase Francis · Miami, FL</span>
            <span>{COUNTS.web} live sites · {COUNTS.electron + COUNTS.swift + COUNTS.mobile + COUNTS.extension} apps · {COUNTS.automation} automations · {COUNTS.client} client builds · {COUNTS.private} private · {COUNTS.oss} open source</span>
          </div>
        </div>
      </footer>
    </>
  );
}
