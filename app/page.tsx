import PortfolioBody from '@/components/PortfolioBody';
import { webProjects, openSource } from '@/data/site';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://cfranci.github.io/#person',
        name: 'Chase Francis',
        url: 'https://cfranci.github.io',
        email: 'mailto:chaseefrancis1@gmail.com',
        jobTitle: 'Product Engineer',
        address: { '@type': 'PostalAddress', addressLocality: 'Miami', addressRegion: 'FL', addressCountry: 'US' },
        sameAs: ['https://github.com/cfranci'],
      },
      {
        '@type': 'ItemList',
        name: 'Live projects by Chase Francis',
        itemListElement: [...webProjects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: { '@type': 'WebSite', name: p.name, url: p.url, description: p.blurb },
        })),
        ...openSource.map((o, i) => ({
          '@type': 'ListItem',
          position: webProjects.length + i + 1,
          item: { '@type': 'SoftwareSourceCode', name: o.name, url: o.url, description: o.blurb },
        }))],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortfolioBody />
    </>
  );
}
