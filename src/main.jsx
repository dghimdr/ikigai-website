import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const INTRO_SEEN_KEY = 'ikigai_intro_seen';
const contactEmail = 'dgim@ikigaiintl.com';

const financeCards = [
  {
    number: '01',
    title: 'Tax Incentive Cashflow',
    collateral: 'eligible rebates, offsets, and production incentives.',
    use: 'production cashflow.',
  },
  {
    number: '02',
    title: 'Pre-Sale / MG Lending',
    collateral: 'contracted distribution commitments.',
    use: 'converting market value into production capital.',
  },
  {
    number: '03',
    title: 'Senior Production Finance',
    collateral: 'verified finance plan and security position.',
    use: 'structured debt for projects moving into production.',
  },
  {
    number: '04',
    title: 'Strategic Gap Support',
    collateral: 'advanced package and credible closing pathway.',
    use: 'selective support where the finance plan is near close.',
  },
];

const criteria = [
  ['Finance plan', 'sources and uses, closing gap, collateral position'],
  ['Budget', 'line-item budget, schedule, cashflow'],
  ['Collateral', 'tax letter, pre-sales, MGs, distribution agreements'],
  ['Package', 'cast, director, producer, sales agent, distributor'],
  ['Timeline', 'shoot date, closing deadline, delivery schedule'],
];

const founderNote = [
  'IKIGAI International began from a simple frustration: too many strong films struggle not because the story is weak, but because the financing is fragmented, slow, or misunderstood.',
  'I founded IKIGAI after years of producing and financing independent films across Australia, the United States, and South Korea. Working across those markets made one thing clear: producers do not just need capital. They need capital that understands production timelines, market collateral, tax incentives, pre-sales, MGs, delivery pressure, and the reality of closing a finance plan before momentum disappears.',
  'IKIGAI was built to bring discipline, speed, and strategic clarity to that process.',
  'We work with producers, production companies, sales agents, distributors, and finance partners to structure capital around real media collateral and credible production pathways.',
  'Not just capital. A clearer way to close.',
];

const principals = [
  {
    number: '01',
    name: 'David Gim',
    title: 'Founder / CEO',
    bio: 'Korean-born, Australia-raised film financier and producer working across Australia, the United States, and South Korea. David brings producer-side experience across independent feature financing, structured debt, tax incentive cashflow, pre-sales, distribution-backed lending, and cross-border film markets.',
    imdb: 'https://www.imdb.com/name/nm9716291/',
    ariaLabel: 'View David Gim on IMDb',
  },
  {
    number: '02',
    name: 'Will Swift',
    title: 'VP Acquisitions & Development',
    bio: 'Los Angeles-based acquisitions and development executive with longstanding experience across film and television production. Will’s background spans development, production coordination, script workflow, acquisitions, market relationships, and project review, supporting IKIGAI’s assessment of commercially viable titles across the international pipeline.',
    imdb: 'https://www.imdb.com/name/nm4410381/?ref_=ttfc_fcr_4_36',
    ariaLabel: 'View Will Swift on IMDb',
  },
  {
    number: '03',
    name: 'Alexei Slater',
    title: 'VP Operations & Development',
    bio: 'London-based filmmaker, writer, and development executive with extensive experience across independent production, development, festival-facing projects, and international project assessment. Alexei supports IKIGAI’s operations across project review, production workflow, delivery coordination, and finance-readiness analysis.',
    imdb: 'https://www.imdb.com/name/nm2966496/?ref_=ttfc_fcr_4_33',
    ariaLabel: 'View Alexei Slater on IMDb',
  },
  {
    number: '04',
    name: 'Emmett Ferra',
    title: 'Business Operations',
    bio: 'Business operations support across IKIGAI’s project review process, with a focus on internal coordination, workflow, and execution support.',
    imdb: 'https://www.imdb.com/name/nm17402485/',
    ariaLabel: 'View Emmett Ferra on IMDb',
  },
];

const titles = [
  {
    title: 'Time of Death',
    year: '2026',
    format: 'Feature Film',
    metadata: [
      ['Directed by', 'Will Wernick'],
      ['Starring', 'Michael Kelly, Kevin Pollak, Dennis Haysbert, Mena Suvari, Jeff Kober'],
      ['U.S. Release', 'Vertical'],
      ['Sales', 'Radiant Films International'],
    ],
    imdb: 'https://www.imdb.com/title/tt26689505/?ref_=mv_close',
    image: '/assets/time-of-death-title.jpg',
    imagePosition: 'center center',
    alt: 'Time of Death title still',
  },
  {
    title: 'Such a Vivid Imagination',
    year: '2026',
    format: 'Feature Film',
    metadata: [
      ['Directed by', 'Ina Lüders'],
      ['Starring', 'Sheherazade Farrell, Nancy Breheny, Cherry Walters, Laura Ashcroft, Simon Chadwick'],
    ],
    imdb: 'https://www.imdb.com/title/tt33131372/?ref_=mv_close',
    image: '/assets/such-a-vivid-imagination-title.jpg',
    imagePosition: 'center 62%',
    alt: 'Such a Vivid Imagination title still',
  },
];

const pressItems = [
  {
    outlet: 'Deadline',
    type: 'Trade News',
    date: 'May 2026',
    project: 'Time of Death',
    title:
      'Michael Kelly & Kevin Pollak Thriller Time Of Death Being Sold At Cannes By Radiant; Vertical Sets June U.S. Release',
    description:
      'Trade coverage announcing Radiant Films International sales activity, Vertical’s U.S. release, and the film’s association with IKIGAI International.',
    url: 'https://deadline.com/2026/05/michael-kelly-kevin-pollak-time-of-death-release-date-1236888380/',
    ariaLabel: 'Read Deadline coverage for Time of Death',
    featured: true,
  },
  {
    outlet: 'Dread Central',
    type: 'Trailer / Genre News',
    date: 'June 2026',
    project: 'Time of Death',
    title: 'Time of Death: Prison-Set Horror With Killer Cast Hits Streaming Tomorrow',
    description:
      'Genre coverage highlighting the Vertical release, cast, Will Wernick direction, and the film’s association with IKIGAI International.',
    url: 'https://www.dreadcentral.com/trailer/576633/time-of-death-prison-set-horror-with-killer-cast-hits-streaming-tomorrow-trailer/',
    ariaLabel: 'Read Dread Central coverage for Time of Death',
    featured: true,
  },
  {
    outlet: 'JoBlo',
    type: 'Review',
    date: 'June 2026',
    project: 'Time of Death',
    title: 'Time of Death Review: Michael Kelly Takes the Lead in Prison-Set Mystery Thriller',
    description: 'Review coverage of the film’s dark mystery-thriller tone, ensemble cast, and PVOD release.',
    url: 'https://www.joblo.com/time-of-death-review/',
    ariaLabel: 'Read JoBlo coverage for Time of Death',
  },
  {
    outlet: 'Movie Vine',
    type: 'Trailer / Release News',
    date: 'June 2026',
    project: 'Time of Death',
    title: 'Time of Death Psychological Horror Film Stars Michael Kelly, Kevin Pollak, Mena Suvari, and Dennis Haysbert',
    description:
      'Release coverage highlighting the cast, trailer, and Vertical’s select theatrical and PVOD release.',
    url: 'https://www.movievine.com/movies/time-of-death-psychological-horror-film-stars-michael-kelly-kevin-pollak-mena-suvari-and-dennis-haysbert-trailer-and-release-date/',
    ariaLabel: 'Read Movie Vine coverage for Time of Death',
  },
  {
    outlet: 'British Council UK Films',
    type: 'Industry Listing',
    date: '2026',
    project: 'Such a Vivid Imagination',
    title: 'Such a Vivid Imagination',
    description:
      'UK Films database listing for the 2026 feature directed by Ina Lüders, with project details, principal cast, production companies, and completion status.',
    url: 'https://filmsandfestivals.britishcouncil.org/projects/such-a-vivid-imagination',
    ariaLabel: 'Read British Council UK Films listing for Such a Vivid Imagination',
  },
  {
    outlet: 'Stroud Times',
    type: 'Production Coverage',
    date: '2025 / Production Coverage',
    project: 'Such a Vivid Imagination',
    title: 'Why Filming Is Taking Place in Nailsworth and Stroud',
    description:
      'Local production coverage of Such a Vivid Imagination, including filming locations, writer/director details, and local cast.',
    url: 'https://stroudtimes.com/why-filming-is-taking-place-in-nailsworth-and-stroud/',
    ariaLabel: 'Read Stroud Times coverage for Such a Vivid Imagination',
  },
];

const faqs = [
  {
    q: 'What does IKIGAI finance?',
    a: 'IKIGAI focuses on structured finance for film and media productions, including facilities backed by tax incentives, pre-sales, MGs, and distribution agreements.',
  },
  {
    q: 'Do you finance development?',
    a: 'Generally, IKIGAI is most useful when a project has clear collateral, an advanced finance plan, and a defined production timeline.',
  },
  {
    q: 'What materials should I submit?',
    a: 'A finance plan, budget, schedule, script, package details, collateral documents, and closing timeline are helpful for review.',
  },
  {
    q: 'Do you accept unsolicited scripts?',
    a: 'No. IKIGAI reviews projects for finance consideration only. Please do not submit unsolicited scripts or creative materials unless they are part of a finance package.',
  },
  {
    q: 'How quickly can IKIGAI review a project?',
    a: 'Initial review depends on the completeness of the package. Clear finance plans and collateral documents allow for a faster assessment.',
  },
];

const formatOptions = ['Feature Film', 'Series', 'Documentary', 'Animation', 'Other'];
const stageOptions = [
  'Development',
  'Packaging',
  'Pre-production',
  'Production',
  'Post-production',
  'Delivery',
  'Distribution',
];
const currencyOptions = ['USD', 'AUD', 'GBP', 'EUR', 'KRW', 'CAD', 'Other'];
const useOfFundsOptions = [
  'Production finance',
  'Tax incentive cashflow',
  'Pre-sale / MG cashflow',
  'Gap finance',
  'Post-production',
  'Delivery',
  'Other',
];
const collateralOptions = [
  'Tax incentive / rebate / offset',
  'Pre-sale agreement',
  'Minimum guarantee',
  'Distribution agreement',
  'Sales estimates',
  'Completion bond',
  'Corporate guarantee',
  'Personal guarantee',
  'Other',
];
const taxStatusOptions = ['Approved', 'Preliminary assessment', 'Pending', 'Not applicable'];
const yesNoDiscussionOptions = ['Yes', 'No', 'In discussion'];
const bondStatusOptions = ['Bonded', 'In discussion', 'Not bonded', 'Not applicable'];
const heardOptions = [
  'Existing relationship',
  'Producer referral',
  'Sales agent',
  'Distributor',
  'Film market',
  'IMDb / online search',
  'LinkedIn',
  'Other',
];

const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    description: 'Privacy Policy for IKIGAI International.',
    intro: 'IKIGAI International respects your privacy. This Privacy Policy explains how we collect, use, and protect information submitted through our website.',
    sections: [
      {
        title: '1. Information we collect',
        paragraphs: [
          'We may collect personal and project-related information when you contact us or submit a project for finance review, including:',
        ],
        list: [
          'Name',
          'Email address',
          'Phone number',
          'Company name',
          'Project title and project details',
          'Finance information',
          'Links to project materials',
          'Any other information you choose to provide',
        ],
      },
      {
        title: '2. How we use information',
        paragraphs: ['We use submitted information to:'],
        list: [
          'Review project finance enquiries',
          'Assess whether a project may fit IKIGAI International’s finance criteria',
          'Respond to enquiries',
          'Communicate with applicants, producers, production companies, sales agents, distributors, or finance partners',
          'Maintain internal business records',
        ],
        after: ['We do not sell personal information.'],
      },
      {
        title: '3. Project submissions',
        paragraphs: [
          'Any materials submitted through this website are reviewed for finance consideration only.',
          'Please do not submit unsolicited scripts, treatments, concepts, or creative materials unless they are part of a finance package. Submitting materials does not create any obligation, partnership, financing commitment, or confidential relationship unless separately agreed in writing.',
        ],
      },
      {
        title: '4. Sharing information',
        paragraphs: [
          'We may share submitted information with our internal team, advisors, legal representatives, finance partners, or other professional partners where reasonably necessary to review or respond to an enquiry.',
          'We will not publicly disclose submitted project information without permission, unless required by law.',
        ],
      },
      {
        title: '5. Data security',
        paragraphs: [
          'We take reasonable steps to protect information submitted through our website. However, no online transmission or storage system can be guaranteed to be completely secure.',
        ],
      },
      {
        title: '6. Third-party links',
        paragraphs: [
          'Our website may include links to third-party websites, including IMDb, press outlets, and other external platforms. We are not responsible for the privacy practices or content of those third-party sites.',
        ],
      },
      {
        title: '7. Contact',
        paragraphs: ['For privacy-related questions, please contact:'],
        contact: contactEmail,
      },
      {
        title: '8. Updates',
        paragraphs: [
          'We may update this Privacy Policy from time to time. The latest version will be posted on this page.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of Use',
    description: 'Terms of Use for the IKIGAI International website.',
    intro: 'These Terms of Use govern your use of the IKIGAI International website.',
    afterIntro: 'By using this website, you agree to these Terms.',
    sections: [
      {
        title: '1. Website purpose',
        paragraphs: [
          'This website provides general information about IKIGAI International, its work, selected projects, and project finance review process.',
          'Nothing on this website constitutes financial advice, legal advice, investment advice, or a binding financing offer.',
        ],
      },
      {
        title: '2. No financing commitment',
        paragraphs: [
          'Submitting a project, enquiry, or finance package through this website does not guarantee review, approval, financing, or any business relationship with IKIGAI International.',
          'Any financing arrangement is subject to separate due diligence, underwriting, legal documentation, security, approvals, and executed agreements.',
        ],
      },
      {
        title: '3. Project submissions',
        paragraphs: [
          'You are responsible for ensuring that you have the authority to submit any project information or materials.',
          'By submitting materials, you confirm that:',
        ],
        list: [
          'You are authorised to submit the project',
          'The information provided is accurate to the best of your knowledge',
          'The submission is made for finance consideration',
          'You understand that IKIGAI International does not accept unsolicited creative submissions outside a finance package',
        ],
        after: [
          'Submitting materials does not create any confidential, fiduciary, advisory, partnership, or agency relationship unless separately agreed in writing.',
        ],
      },
      {
        title: '4. Intellectual property',
        paragraphs: [
          'All website content, including text, design, layout, branding, logos, images, and visual materials, is owned by or licensed to IKIGAI International unless otherwise stated.',
          'You may not copy, reproduce, distribute, modify, or use website content for commercial purposes without written permission.',
          'Third-party project images, stills, titles, press links, and references remain the property of their respective owners and are used for identification, portfolio, publicity, or informational purposes.',
        ],
      },
      {
        title: '5. External links',
        paragraphs: [
          'This website may contain links to external websites, including IMDb, press outlets, and partner platforms. IKIGAI International is not responsible for the content, accuracy, security, or practices of external websites.',
        ],
      },
      {
        title: '6. Accuracy of information',
        paragraphs: [
          'We aim to keep website information accurate and up to date, but we do not guarantee that all information is complete, current, or error-free.',
          'We may update, remove, or change website content at any time.',
        ],
      },
      {
        title: '7. Limitation of liability',
        paragraphs: [
          'To the maximum extent permitted by law, IKIGAI International is not liable for any loss, damage, claim, or expense arising from your use of this website, reliance on website content, or submission of information through the website.',
        ],
      },
      {
        title: '8. Contact',
        paragraphs: ['For questions about these Terms, please contact:'],
        contact: contactEmail,
      },
    ],
  },
};

function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll(
      [
        '.titles-heading',
        '.title-card',
        '.press-heading',
        '.press-card',
        '.founder-letter-inner',
        '.principals-hero > *',
        '.principal-card',
        '.split-section > div',
        '.finance-card',
        '.section-heading',
        '.criteria-row',
        '.apply-cta > div',
        '.faq-list details',
      ].join(','),
    );

    targets.forEach((target, index) => {
      target.classList.add('is-reveal');
      target.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);
}

function setPageMeta(title, description) {
  document.title = title;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.append(meta);
  }
  meta.content = description;
}

function IntroFilm() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(INTRO_SEEN_KEY) !== 'true';
  });
  const [leaving, setLeaving] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  function dismiss() {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true');
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 760);
  }

  useEffect(() => {
    if (!visible) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = window.setTimeout(() => dismiss(), 1200);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [visible]);

  if (!visible) return null;

  return (
    <section className={`intro-film ${leaving ? 'is-leaving' : ''}`} aria-label="IKIGAI International opening title">
      <div className="intro-vignette" />
      {!videoFailed ? (
        <video
          className="intro-video"
          src="/assets/ikigai-logo-intro-7sec.mov"
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={dismiss}
          onError={() => setVideoFailed(true)}
          aria-label="IKIGAI International logo film"
        />
      ) : (
        <img className="intro-fallback" src="/assets/ikigai-logo.png" alt="IKIGAI International" />
      )}
      {videoFailed && (
        <button className="intro-enter" type="button" onClick={dismiss}>
          Enter
        </button>
      )}
      <button className="skip-intro" type="button" onClick={dismiss}>
        Skip
      </button>
    </section>
  );
}

function Header({ isApply = false, currentPage = '' }) {
  const isInterior = isApply || currentPage;
  const link = (hash) => (isInterior ? `/${hash}` : hash);

  return (
    <header className={`site-header ${isInterior ? 'site-header-apply' : ''}`}>
      <a className="brand" href="/" aria-label="IKIGAI International home">
        <img src="/assets/ikigai-wordmark.png" alt="IKIGAI International" />
      </a>
      <nav className="nav" aria-label="Primary navigation">
        <a href={isInterior ? '/' : '#home'}>Home</a>
        <a href={link('#titles')}>Titles</a>
        <a href={link('#press')}>Press</a>
        <a href="/principals" aria-current={currentPage === 'principals' ? 'page' : undefined}>
          Principals
        </a>
        <a href={link('#approach')}>Approach</a>
        <a href={link('#criteria')}>Criteria</a>
        <a href="/apply" aria-current={isApply || currentPage === 'apply' ? 'page' : undefined}>
          Apply
        </a>
        <a href={link('#faq')}>FAQ</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <img
        className="hero-image"
        src="/assets/ikigai-vision-tunnel.jpg"
        alt="Cinematic illuminated tunnel representing structured paths to production finance"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-inner section-shell">
        <p className="eyebrow">Global media finance</p>
        <h1>Structured capital for independent cinema.</h1>
        <p className="hero-copy">
          IKIGAI International provides collateral-backed finance for film and media productions across global markets.
        </p>
        <div className="capital-line" aria-label="Finance capabilities">
          <span>Tax incentives</span>
          <span>Pre-sales</span>
          <span>MGs</span>
          <span>Distribution-backed lending</span>
          <span>Senior production finance</span>
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href="/apply">
            Submit a Project
          </a>
          <a className="button button-secondary" href="#criteria">
            View Criteria
          </a>
        </div>
      </div>
    </section>
  );
}

function FounderLetter() {
  const bodyParagraphs = founderNote.slice(0, -1);
  const pullQuote = founderNote[founderNote.length - 1];

  return (
    <section className="founder-letter section-shell" aria-labelledby="founder-letter-title">
      <div className="founder-letter-inner">
        <div className="founder-letter-heading">
          <p className="eyebrow">From David Gim</p>
          <h2 id="founder-letter-title">Built from the producer side of the table.</h2>
        </div>
        <div className="founder-letter-copy">
          {bodyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="founder-letter-pull">{pullQuote}</p>
          <div className="founder-letter-signature" aria-label="Founder signature">
            <strong>David Gim</strong>
            <span>Founder / CEO</span>
            <span>IKIGAI International</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrincipalsPage() {
  useScrollReveal();

  useEffect(() => {
    setPageMeta(
      'Principals | IKIGAI International',
      'The people behind IKIGAI International, operating across film finance, production, acquisitions, and international markets.',
    );
  }, []);

  return (
    <>
      <Header currentPage="principals" />
      <main className="principals-page">
        <section className="principals-hero section-shell" aria-labelledby="principals-title">
          <a className="return-link" href="/">
            Return Home
          </a>
          <p className="eyebrow">Principals</p>
          <h1 id="principals-title">The people behind IKIGAI.</h1>
          <p>
            A focused team operating across film finance, production, acquisitions, and international markets.
          </p>
        </section>
        <FounderLetter />
        <section className="principals-roster section-shell" aria-label="IKIGAI principals">
          <div className="principals-roster-heading">
            <p className="eyebrow">Principals</p>
            <h2>Film finance, production, acquisitions, and operations.</h2>
          </div>
          <div className="principals-grid">
            {principals.map((person) => (
              <article className="principal-card" key={person.name}>
                <span className="principal-number">{person.number}</span>
                <div className="principal-identity">
                  <h3>{person.name}</h3>
                  <p className="principal-title">{person.title}</p>
                </div>
                <p>{person.bio}</p>
                <a
                  className="principal-link"
                  href={person.imdb}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={person.ariaLabel}
                >
                  IMDb
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer isApply />
    </>
  );
}

function Titles() {
  return (
    <section id="titles" className="titles-section section-shell">
      <div className="titles-heading">
        <div>
          <p className="eyebrow">Selected Titles</p>
          <h2>Financed across global markets.</h2>
        </div>
        <p className="section-copy">A focused selection of projects supported by IKIGAI.</p>
      </div>
      <div className="titles-grid">
        {titles.map((item) => (
          <article className="title-card" key={item.title}>
            <figure className="title-card-media">
              <img
                className="title-card-image"
                src={item.image}
                sizes="(max-width: 820px) calc(100vw - 1.4rem), 50vw"
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: item.imagePosition }}
              />
            </figure>
            <div className="title-card-content">
              <p className="title-format">{item.format}</p>
              <h3>
                {item.title} <span className="title-year">({item.year})</span>
              </h3>
              <dl className="title-meta">
                {item.metadata.map(([label, value]) => (
                  <div className="title-meta-row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <a
                className="title-link"
                href={item.imdb}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${item.title} on IMDb`}
              >
                View on IMDb
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PressCoverage() {
  return (
    <section id="press" className="press-section section-shell">
      <div className="press-heading">
        <div>
          <p className="eyebrow">Press &amp; Coverage</p>
          <h2>Project coverage and industry mentions.</h2>
        </div>
        <p className="section-copy">Selected public coverage across titles supported by IKIGAI.</p>
      </div>
      <div className="press-grid">
        {pressItems.map((item) => (
          <article className={`press-card ${item.featured ? 'press-card-featured' : ''}`} key={item.url}>
            <div className="press-card-topline">
              <span>{item.outlet}</span>
              <span>{item.type}</span>
              <span>{item.date}</span>
            </div>
            <p className="press-project">{item.project}</p>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a className="press-link" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.ariaLabel}>
              Read coverage
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="approach" className="section-shell split-section">
      <div>
        <p className="eyebrow">Approach</p>
        <h2>We finance projects with real collateral.</h2>
      </div>
      <div>
        <p className="section-copy">
          IKIGAI works with producers, production companies, sales agents, distributors, and finance partners to
          structure capital around contracted or verifiable media assets.
        </p>
        <div className="finance-grid" aria-label="IKIGAI capital structure matrix">
          {financeCards.map((card) => (
            <article className="finance-card" key={card.title}>
              <div className="finance-card-top">
                <span className="finance-number">{card.number}</span>
                <span className="finance-type">Structure</span>
              </div>
              <h3>{card.title}</h3>
              <dl className="finance-terms">
                <div>
                  <dt>Collateral</dt>
                  <dd>{card.collateral}</dd>
                </div>
                <div>
                  <dt>Use</dt>
                  <dd>{card.use}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Criteria() {
  return (
    <section id="criteria" className="section-shell criteria-section">
      <div className="section-heading">
        <p className="eyebrow">Criteria</p>
        <h2>Built for serious packages.</h2>
        <p className="section-copy">We are most useful when a project has clear commercial structure.</p>
      </div>
      <div className="criteria-list">
        {criteria.map(([label, body], index) => (
          <div className="criteria-row" key={label}>
            <span className="criteria-number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{label}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LandingApplyCta() {
  return (
    <section id="apply" className="apply-section apply-cta-section">
      <div className="section-shell apply-cta">
        <div>
          <p className="eyebrow">Apply</p>
          <h2>Have a financeable project?</h2>
        </div>
        <div>
          <p className="section-copy">Submit your core materials through our project finance review page.</p>
          <a className="button button-primary" href="/apply">
            Apply for Review
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="section-shell faq-section">
      <div className="section-heading">
        <p className="eyebrow">FAQ</p>
        <h2>Practical questions.</h2>
      </div>
      <div className="faq-list">
        {faqs.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer({ isApply = false }) {
  const link = (hash) => (isApply ? `/${hash}` : hash);

  return (
    <footer className="footer">
      <div className="footer-main">
        <div>
          <img src="/assets/ikigai-wordmark.png" alt="IKIGAI International" />
          <p>Structured media finance across global markets.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/">Home</a>
          <a href={link('#titles')}>Titles</a>
          <a href={link('#press')}>Press</a>
          <a href="/principals">Principals</a>
          <a href={link('#approach')}>Approach</a>
          <a href={link('#criteria')}>Criteria</a>
          <a href="/apply">Apply</a>
          <a href={link('#faq')}>FAQ</a>
          <a href={`mailto:${contactEmail}`}>Contact</a>
        </nav>
      </div>
      <div className="footer-legal">
        <p>© 2026 IKIGAI International. All rights reserved.</p>
        <nav aria-label="Legal navigation">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a
            href="https://www.instagram.com/ikigai_intl/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit IKIGAI International on Instagram"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/company/ikigai-intl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit IKIGAI International on LinkedIn"
          >
            LinkedIn
          </a>
          <a href="/principals">Principals</a>
        </nav>
      </div>
    </footer>
  );
}

function LegalPage({ type }) {
  const page = legalPages[type] ?? legalPages.privacy;

  useEffect(() => {
    setPageMeta(`${page.title} | IKIGAI International`, page.description);
  }, [page.description, page.title]);

  return (
    <>
      <Header isApply />
      <main className="legal-page">
        <section className="legal-hero section-shell">
          <a className="return-link" href="/">
            Return Home
          </a>
          <p className="eyebrow">Legal</p>
          <h1>{page.title}</h1>
          <p className="legal-effective">Effective date: 2026</p>
          <p className="legal-copy">{page.intro}</p>
          {page.afterIntro && <p className="legal-copy">{page.afterIntro}</p>}
        </section>
        <section className="legal-content section-shell" aria-label={page.title}>
          {page.sections.map((section) => (
            <article className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.after?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.contact && (
                <p>
                  <a href={`mailto:${section.contact}`}>{section.contact}</a>
                </p>
              )}
            </article>
          ))}
        </section>
      </main>
      <Footer isApply />
    </>
  );
}

function Field({ label, name, required = false, children, helper }) {
  return (
    <label className="form-field">
      <span>
        {label}
        {required && <em aria-hidden="true">*</em>}
      </span>
      {children ?? <input name={name} required={required} />}
      {helper && <small>{helper}</small>}
    </label>
  );
}

function SelectField({ label, name, options, required = false, placeholder = 'Select one' }) {
  return (
    <Field label={label} required={required}>
      <select name={name} required={required} defaultValue="">
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

function TextAreaField({ label, name, required = false, rows = 4, placeholder, helper }) {
  return (
    <Field label={label} required={required} helper={helper}>
      <textarea name={name} rows={rows} required={required} placeholder={placeholder} />
    </Field>
  );
}

function FormSection({ number, title, intro, children }) {
  return (
    <section className="form-section" aria-labelledby={`apply-section-${number}`}>
      <div className="form-section-heading">
        <span>{number}</span>
        <div>
          <h2 id={`apply-section-${number}`}>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
      </div>
      <div className="form-grid">{children}</div>
    </section>
  );
}

function CheckboxGrid({ legend, name, options, required = false }) {
  return (
    <fieldset className="checkbox-fieldset">
      <legend>
        {legend}
        {required && <em aria-hidden="true">*</em>}
      </legend>
      <div className="checkbox-grid">
        {options.map((option) => (
          <label className="choice-field" key={option}>
            <input type="checkbox" name={name} value={option} />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Declaration({ name, children, required = false }) {
  return (
    <label className="declaration-field">
      <input type="checkbox" name={name} required={required} />
      <span>{children}</span>
    </label>
  );
}

function validateSubmission(form) {
  const data = Object.fromEntries(form.entries());
  const collateral = form.getAll('collateralAvailable');
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'companyName',
    'projectRole',
    'countryRegion',
    'projectTitle',
    'format',
    'primaryLanguage',
    'countryOfProduction',
    'currentStage',
    'shortSummary',
    'totalBudget',
    'budgetCurrency',
    'amountRaised',
    'amountRequested',
    'useOfFunds',
    'requiredClosingDate',
    'salesAgentAttached',
    'distributorAttached',
    'directorAttached',
    'keyCastAttached',
    'producerDetails',
    'materialsLink',
  ];

  const missing = requiredFields.filter((field) => !String(data[field] ?? '').trim());
  const declarations = ['authorized', 'financeOnly', 'accurate', 'contactConsent'];
  const missingDeclarations = declarations.filter((field) => !form.get(field));

  if (missing.length || !collateral.length || missingDeclarations.length) {
    return 'Please complete all required fields and declarations before submitting.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) {
    return 'Please enter a valid email address.';
  }

  const amountFields = ['totalBudget', 'amountRaised', 'amountRequested'];
  if (amountFields.some((field) => Number(data[field]) < 0 || Number.isNaN(Number(data[field])))) {
    return 'Budget and amount fields must be valid numbers.';
  }

  return '';
}

function ApplyPage() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setPageMeta(
      'Project Finance Review | IKIGAI International',
      'Submit a film or media production package for finance review by IKIGAI International.',
    );
  }, []);

  async function submitApplication(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const validationMessage = validateSubmission(new FormData(form));

    if (validationMessage) {
      setStatus('error');
      setMessage(validationMessage);
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.collateralAvailable = new FormData(form).getAll('collateralAvailable');
    payload.updatesOptIn = Boolean(new FormData(form).get('updatesOptIn'));

    setStatus('submitting');
    setMessage('');

    try {
      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Submission failed');
      }

      form.reset();
      setStatus('success');
      setMessage(
        'Thank you. Your project has been submitted for review. The IKIGAI team will review the materials and follow up if the package fits our finance criteria.',
      );
    } catch {
      setStatus('error');
      setMessage(
        'Something went wrong and your submission could not be sent. Please try again or contact dgim@ikigaiintl.com directly.',
      );
    }
  }

  return (
    <>
      <Header isApply />
      <main className="apply-page">
        <section className="apply-hero section-shell">
          <a className="return-link" href="/">
            Return Home
          </a>
          <p className="eyebrow">Project Intake</p>
          <h1>Project Finance Review</h1>
          <p className="apply-intro">
            Submit your project for finance review. IKIGAI International reviews production packages where there is
            clear commercial structure, collateral, and a defined financing requirement.
          </p>
          <p className="apply-note">
            Please do not submit unsolicited scripts or creative materials unless they are part of a finance package.
            This form is for finance consideration only.
          </p>
        </section>

        <form className="project-form section-shell" onSubmit={submitApplication} noValidate>
          <input
            className="honeypot"
            type="text"
            name="websiteUrl"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />

          <FormSection number="01" title="Applicant Details">
            <Field label="First name" required>
              <input name="firstName" autoComplete="given-name" required />
            </Field>
            <Field label="Last name" required>
              <input name="lastName" autoComplete="family-name" required />
            </Field>
            <Field label="Email" required>
              <input name="email" type="email" autoComplete="email" required />
            </Field>
            <Field label="Phone">
              <input name="phone" type="tel" autoComplete="tel" />
            </Field>
            <Field label="Company name" required>
              <input name="companyName" autoComplete="organization" required />
            </Field>
            <Field label="Role on project" required>
              <input name="projectRole" required placeholder="Producer, financier, sales agent, distributor..." />
            </Field>
            <Field label="Website">
              <input name="website" type="url" placeholder="https://" />
            </Field>
            <Field label="IMDb or LinkedIn profile">
              <input name="profileUrl" type="url" placeholder="https://" />
            </Field>
            <Field label="Country / region" required>
              <input name="countryRegion" autoComplete="country-name" required />
            </Field>
          </FormSection>

          <FormSection number="02" title="Project Overview">
            <Field label="Project title" required>
              <input name="projectTitle" required />
            </Field>
            <SelectField label="Format" name="format" options={formatOptions} required />
            <Field label="Genre">
              <input name="genre" />
            </Field>
            <Field label="Primary language" required>
              <input name="primaryLanguage" required />
            </Field>
            <Field label="Country of production" required>
              <input name="countryOfProduction" required />
            </Field>
            <SelectField label="Current stage" name="currentStage" options={stageOptions} required />
            <TextAreaField
              label="Short project summary"
              name="shortSummary"
              required
              rows={5}
              placeholder="Keep this commercial and concise."
            />
            <TextAreaField
              label="Key attachments / package elements"
              name="packageElements"
              rows={4}
              placeholder="Cast, director, sales agent, distributor, finance plan, collateral documents..."
            />
          </FormSection>

          <FormSection number="03" title="Finance Requirement">
            <Field label="Total budget" required>
              <input name="totalBudget" type="number" min="0" inputMode="decimal" required />
            </Field>
            <SelectField label="Budget currency" name="budgetCurrency" options={currencyOptions} required />
            <Field label="Amount already raised" required>
              <input name="amountRaised" type="number" min="0" inputMode="decimal" required />
            </Field>
            <Field label="Amount requested from IKIGAI" required>
              <input name="amountRequested" type="number" min="0" inputMode="decimal" required />
            </Field>
            <SelectField label="Intended use of funds" name="useOfFunds" options={useOfFundsOptions} required />
            <Field label="Required closing date" required>
              <input name="requiredClosingDate" type="date" required />
            </Field>
            <Field label="Expected shoot date">
              <input name="expectedShootDate" type="date" />
            </Field>
            <Field label="Expected delivery date">
              <input name="expectedDeliveryDate" type="date" />
            </Field>
          </FormSection>

          <FormSection number="04" title="Collateral">
            <CheckboxGrid legend="What collateral is available?" name="collateralAvailable" options={collateralOptions} required />
            <Field label="Tax incentive jurisdiction">
              <input name="taxIncentiveJurisdiction" />
            </Field>
            <Field label="Estimated tax incentive value">
              <input name="taxIncentiveValue" />
            </Field>
            <SelectField
              label="Is the tax incentive approved or assessed?"
              name="taxIncentiveStatus"
              options={taxStatusOptions}
              placeholder="Optional"
            />
            <SelectField
              label="Sales agent attached?"
              name="salesAgentAttached"
              options={yesNoDiscussionOptions}
              required
            />
            <Field label="Sales agent name">
              <input name="salesAgentName" />
            </Field>
            <SelectField
              label="Distributor attached?"
              name="distributorAttached"
              options={yesNoDiscussionOptions}
              required
            />
            <Field label="Distributor name / territory">
              <input name="distributorNameTerritory" />
            </Field>
            <SelectField
              label="Completion bond status"
              name="completionBondStatus"
              options={bondStatusOptions}
              placeholder="Optional"
            />
          </FormSection>

          <FormSection number="05" title="Package">
            <SelectField label="Director attached?" name="directorAttached" options={yesNoDiscussionOptions} required />
            <SelectField label="Key cast attached?" name="keyCastAttached" options={yesNoDiscussionOptions} required />
            <TextAreaField
              label="Producer / production company details"
              name="producerDetails"
              required
              rows={4}
            />
            <TextAreaField label="Financing partners already involved" name="financingPartners" rows={3} />
            <TextAreaField label="Executive producers or lenders already involved" name="executiveProducersLenders" rows={3} />
            <TextAreaField
              label="Relevant market history"
              name="marketHistory"
              rows={4}
              placeholder="Cannes, EFM, AFM, TIFF, Busan, private buyer meetings, sales estimates, prior offers, etc."
            />
          </FormSection>

          <FormSection
            number="06"
            title="Materials"
            intro="Provide a secure Dropbox, Google Drive, Box, or WeTransfer link. Direct file uploads can be added later once storage is configured."
          >
            <Field label="Link to materials" required helper="Include pitch deck, finance plan, budget, schedule, script, sales estimates, tax documents, and distribution or pre-sale agreements where applicable.">
              <input name="materialsLink" type="url" placeholder="https://" required />
            </Field>
            <Field label="Password / access notes">
              <input name="materialsAccessNotes" />
            </Field>
          </FormSection>

          <FormSection number="07" title="Additional Notes">
            <TextAreaField label="Anything else IKIGAI should know?" name="additionalNotes" rows={4} />
            <SelectField
              label="How did you hear about IKIGAI?"
              name="heardAbout"
              options={heardOptions}
              placeholder="Optional"
            />
          </FormSection>

          <FormSection number="08" title="Declarations">
            <div className="declarations">
              <Declaration name="authorized" required>
                I confirm I am authorised to submit this project for finance review.
              </Declaration>
              <Declaration name="financeOnly" required>
                I understand IKIGAI reviews projects for finance consideration only and does not accept unsolicited
                creative submissions outside a finance package.
              </Declaration>
              <Declaration name="accurate" required>
                I confirm the information provided is accurate to the best of my knowledge.
              </Declaration>
              <Declaration name="contactConsent" required>
                I consent to IKIGAI International contacting me about this submission.
              </Declaration>
              <Declaration name="updatesOptIn">I would like to receive occasional IKIGAI updates.</Declaration>
            </div>
          </FormSection>

          <div className="form-submit-panel">
            <div>
              <p className="eyebrow">Submit</p>
              <p>Applications are reviewed for finance fit, collateral position, timeline, and package completeness.</p>
            </div>
            <button className="button button-primary" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>

          {message && (
            <p className={`form-status ${status === 'success' ? 'is-success' : 'is-error'}`} role="status">
              {message}
            </p>
          )}
        </form>
      </main>
      <Footer isApply />
    </>
  );
}

function LandingPage() {
  useScrollReveal();

  useEffect(() => {
    setPageMeta(
      'IKIGAI International | Structured Media Finance',
      'IKIGAI International provides collateral-backed finance for film and media productions across global markets.',
    );

    function scrollToHash() {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - 88;
      const nextTop = Math.max(0, top);
      window.scrollTo({ top: nextTop, behavior: 'auto' });
      document.documentElement.scrollTop = nextTop;
      document.body.scrollTop = nextTop;
    }

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);
    const timers = [120, 360, 720].map((delay) => window.setTimeout(scrollToHash, delay));

    return () => {
      window.removeEventListener('hashchange', scrollToHash);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <>
      <IntroFilm />
      <Header />
      <main>
        <Hero />
        <Titles />
        <PressCoverage />
        <Approach />
        <Criteria />
        <LandingApplyCta />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  if (path === '/apply') {
    return <ApplyPage />;
  }

  if (path === '/privacy') {
    return <LegalPage type="privacy" />;
  }

  if (path === '/terms') {
    return <LegalPage type="terms" />;
  }

  if (path === '/principals') {
    return <PrincipalsPage />;
  }

  return <LandingPage />;
}

createRoot(document.getElementById('root')).render(<App />);
