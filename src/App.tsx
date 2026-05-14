import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Brain,
  Building2,
  Compass,
  HandHeart,
  Leaf,
  MapPin,
  Menu,
  PenTool,
  Quote,
  Route,
  SunMedium,
  X,
} from "lucide-react";

const navItems = [
  ["About", "#about"],
  ["Path", "#path"],
  ["Projects", "#projects"],
  ["Values", "#values"],
  ["Connect", "#connect"],
] as const;

const stats = [
  ["UDSM", "BSc Civil Engineering"],
  ["2027", "Expected graduation"],
  ["686", "Instagram followers"],
  ["66", "LinkedIn connections"],
];

const timeline = [
  {
    title: "BSc Civil Engineering",
    meta: "University of Dar es Salaam - Nov 2023 to Jul 2027",
    detail:
      "I am studying civil engineering while building a parallel interest in interior design, BIM, and practical comfort for homes in East African climates.",
  },
  {
    title: "Engineering Apprentice",
    meta: "AutoCAD and Autodesk Civil 3D - Nov 2025 to present",
    detail:
      "I am growing through self-directed work in highway route design, surfaces, horizontal and vertical alignments, and corridor workflows.",
  },
  {
    title: "Junior Civil Engineer",
    meta: "Work from home / independent practice",
    detail:
      "I learn through projects, mentorship, public reflection, and hands-on digital engineering practice.",
  },
];

const skills = [
  ["Design tools", "AutoCAD", "Civil 3D", "Autodesk Revit", "BIM modeling"],
  ["Engineering focus", "Road design", "Corridors", "Surfaces", "Alignment design"],
  ["Future systems", "AI in infrastructure", "Energy modeling", "Sun path analysis"],
  ["Human impact", "Passive cooling", "Sustainable homes", "African development"],
];

const projects = [
  {
    title: "Revit Sun Path Analysis",
    eyebrow: "Sustainable residential design",
    summary:
      "I am modeling a one-storey residence to study solar orientation, room comfort, and passive cooling after observing heat gain in a family bedroom.",
    tags: ["Revit", "BIM", "Solar orientation"],
    Icon: SunMedium,
  },
  {
    title: "Civil 3D Highway Route",
    eyebrow: "2026 learning goal",
    summary:
      "I am using this learning lane to practice surfaces, horizontal and vertical alignments, corridors, and route-design fundamentals.",
    tags: ["Civil 3D", "Road design", "Corridors"],
    Icon: Route,
  },
  {
    title: "AI Everything Kenya 2025",
    eyebrow: "Virtual participation",
    summary:
      "I am exploring how AI can reshape infrastructure, digital engineering, decision-making, and the future of African development.",
    tags: ["AI", "Infrastructure", "Learning"],
    Icon: Brain,
  },
  {
    title: "BCT Expo Dar es Salaam",
    eyebrow: "Building Construction Technology Expo",
    summary:
      "I attended the September 2024 expo at Diamond Jubilee Hall to connect with construction technology, materials, and industry momentum.",
    tags: ["Construction tech", "Dar es Salaam", "Industry"],
    Icon: Building2,
  },
];

const values = [
  [
    "Build before you feel ready",
    "My reflections keep returning to action, courage, and learning by entering the room before certainty arrives.",
  ],
  [
    "Think in decades",
    "I am drawn to books, leverage, collaboration, and national development because I care about long-term value over short-term noise.",
  ],
  [
    "Design for people first",
    "I care about sustainable design because comfort, cost, and dignity matter for real families, especially across African homes.",
  ],
];

function scrollToHash(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-label">
      <span />
      {children}
    </span>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
    </svg>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header initial={{ y: -70 }} animate={{ y: 0 }} className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand-mark" href="#hero" aria-label="Allen Ruben home">
          AR
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <button key={href} type="button" onClick={() => scrollToHash(href)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="header-socials">
          <a href="https://www.linkedin.com/in/allen-ruben/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://www.instagram.com/allen_reubn/" target="_blank" rel="noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <button className="menu-button" type="button" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="mobile-close" type="button" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
            <nav aria-label="Mobile navigation">
              {navItems.map(([label, href]) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => {
                    scrollToHash(href);
                    setOpen(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 0.45], [0, 120]);

  return (
    <section id="hero" className="hero-section">
      <motion.div className="hero-image" style={{ y: imageY }} aria-hidden="true">
        <img src="/images/allen-hero.svg" alt="" />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-content">
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="hero-location">
          Kinondoni Municipal, Dar es Salaam
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
          Allen Ruben
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="hero-tagline">
          I am an engineer learning CAD and Artificial Intelligence, building the future through design and technology.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }} className="hero-actions">
          <button type="button" className="primary-action" onClick={() => scrollToHash("#projects")}>
            See my work
            <ArrowDown size={16} />
          </button>
          <a className="secondary-action" href="https://www.linkedin.com/in/allen-ruben/" target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
      <div className="hero-footer">
        {stats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-grid">
        <div>
          <SectionLabel>01 - About</SectionLabel>
          <h2>I design with climate, community, and computation in the same frame.</h2>
        </div>
        <div className="body-column">
          <p>
            I am a civil engineering student at the University of Dar es Salaam, learning under real project pressure and actively seeking mentorship in BIM, sustainable design, and AI-powered engineering.
          </p>
          <p>
            My work is grounded in everyday problems: hotter rooms, inefficient buildings, road networks that need better design logic, and the bigger question of how Tanzania and Africa build the next generation of infrastructure.
          </p>
          <blockquote>
            <Quote size={20} />
            <span>Let's connect and build better.</span>
          </blockquote>
        </div>
      </div>
      <div className="identity-row">
        {[
          { Icon: MapPin, label: "Base", value: "Dar es Salaam, Tanzania" },
          { Icon: PenTool, label: "Brand note", value: "@len_group" },
          { Icon: Compass, label: "Faith note", value: "DOAE / Isaiah 43:4" },
        ].map(({ Icon, label, value }) => (
          <div key={label} className="identity-item">
            <Icon size={19} />
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function PathAndSkills() {
  return (
    <section id="path" className="section path-section">
      <div className="section-heading">
        <SectionLabel>02 - Path</SectionLabel>
        <h2>My education, apprenticeship, and tools are becoming muscle memory.</h2>
      </div>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p className="timeline-meta">{item.meta}</p>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
      <div className="skills-band">
        {skills.map(([group, ...items]) => (
          <div key={group} className="skill-group">
            <h3>{group}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="blueprint-panel" aria-hidden="true" />
      <div className="section-heading project-heading">
        <SectionLabel>03 - Projects</SectionLabel>
        <h2>My current learning lanes carry practical engineering intent.</h2>
      </div>
      <div className="project-list">
        {projects.map(({ Icon, ...project }) => (
          <article key={project.title} className="project-item">
            <Icon size={24} />
            <div>
              <span>{project.eyebrow}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <small key={tag}>{tag}</small>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ValuesAndCommunity() {
  return (
    <section id="values" className="section values-section">
      <div className="section-grid">
        <div>
          <SectionLabel>04 - Values</SectionLabel>
          <h2>I am reflective, faith-forward, and focused on human impact.</h2>
        </div>
        <div className="value-stack">
          {values.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="community-strip">
        <div>
          <HandHeart size={22} />
          <span>Community</span>
          <strong>I participated in a Temeke Hospital charity event in September 2023.</strong>
        </div>
        <div>
          <Leaf size={22} />
          <span>Open to volunteering</span>
          <strong>I care about children, education, environment, science and technology, and social services.</strong>
        </div>
        <div>
          <BookOpen size={22} />
          <span>Learning habits</span>
          <strong>I learn through books, podcasts, leverage, collaboration, and personal development.</strong>
        </div>
      </div>
    </section>
  );
}

function Connect() {
  return (
    <section id="connect" className="connect-section">
      <div className="connect-inner">
        <div>
          <SectionLabel>05 - Connect</SectionLabel>
          <h2>I am open to mentorship, BIM opportunities, AI engineering conversations, and better-built spaces.</h2>
          <p>
            I am open to learning from experienced professionals and connecting around civil engineering, sustainable homes, road design, BIM, and the future of infrastructure in Africa.
          </p>
        </div>
        <div className="connect-actions">
          <a href="https://www.linkedin.com/in/allen-ruben/" target="_blank" rel="noreferrer">
            <LinkedInIcon />
            linkedin.com/in/allen-ruben
            <ArrowUpRight size={16} />
          </a>
          <a href="https://www.instagram.com/allen_reubn/" target="_blank" rel="noreferrer">
            <InstagramIcon />
            @allen_reubn
            <ArrowUpRight size={16} />
          </a>
          <a href="https://www.instagram.com/len_group/" target="_blank" rel="noreferrer">
            <PenTool size={18} />
            @len_group
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <About />
        <PathAndSkills />
        <Projects />
        <ValuesAndCommunity />
        <Connect />
      </main>
      <footer>
        <span>Allen Ruben</span>
        <span>I am an engineer, learner, and future-focused builder in Dar es Salaam.</span>
      </footer>
    </div>
  );
}
