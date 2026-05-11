/* global React, ReactDOM, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, useTweaks */
const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// PALETTES
// ============================================================
const PALETTES = {
  aurora: {
    label: "Aurora",
    bg: "#0a0a0f",
    bgRaised: "#101019",
    bgCard: "#13131c",
    border: "#23232f",
    borderStrong: "#33334a",
    text: "#f4f4f7",
    textMuted: "#8a8a9a",
    accent1: "#c8ff3d", // lima eléctrico
    accent2: "#ff3da8", // magenta
    accent3: "#3de1ff", // cyan
    grid: "rgba(255,255,255,0.04)",
  },
  sunset: {
    label: "Sunset",
    bg: "#0f0a0d",
    bgRaised: "#161018",
    bgCard: "#1a121b",
    border: "#2a1f2a",
    borderStrong: "#3d2d3d",
    text: "#fbf4f0",
    textMuted: "#a08a92",
    accent1: "#ff7a3d", // naranja
    accent2: "#ff3d6e", // rosa
    accent3: "#a93dff", // violeta
    grid: "rgba(255,200,180,0.04)",
  },
  ocean: {
    label: "Ocean",
    bg: "#070d12",
    bgRaised: "#0c141c",
    bgCard: "#0f1822",
    border: "#1c2a38",
    borderStrong: "#2c3e52",
    text: "#eef6fb",
    textMuted: "#7a96ad",
    accent1: "#3df0c5", // teal
    accent2: "#3d8eff", // azul
    accent3: "#bd7dff", // violeta
    grid: "rgba(140,200,255,0.04)",
  },
};

// ============================================================
// DATA
// ============================================================
const DEV = {
  name: "David Hernandez Hernandez",
  role: "Full Stack Developer",
  location: "Ciudad de México",
  tagline:
    "Construyo productos web y móviles end-to-end — desde la arquitectura de la API hasta el píxel final en pantalla.",
  bio: "Desarrollador full stack con +2 años de experiencia construyendo plataformas SaaS, dashboards de datos y aplicaciones móviles. Me apasionan los sistemas bien diseñados, las APIs limpias y las interfaces que se sienten rápidas. Trabajo cómodo en todo el stack — desde modelar la base de datos hasta ajustar curvas de animación.",
  stats: [
    { v: "2+", l: "años de experiencia" },
    { v: "5+", l: "tecnologías" },
    { v: "24/7", l: "aprendiendo" },
    { v: "∞", l: "café consumido" },
  ],
  email: "dh.hdz.dh2@gmail.com",
  github: "https://github.com/david-hdz03",
  linkedin: "https://www.linkedin.com/in/david-hernandez-62690017a/",
};

const ICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
const SKILLS = [
  {
    cat: "Backend",
    primary: true,
    items: [
      { name: "Python", icon: `${ICON_BASE}/python/python-original.svg` },
      { name: "Django", icon: `${ICON_BASE}/django/django-plain.svg` },
      { name: "FastAPI", icon: `${ICON_BASE}/fastapi/fastapi-original.svg` },
      {
        name: "PostgreSQL",
        icon: `${ICON_BASE}/postgresql/postgresql-original.svg`,
      },
      {
        name: "MySQL",
        icon: `${ICON_BASE}/mysql/mysql-original.svg`,
      },
    ],
  },
  {
    cat: "Frontend",
    primary: true,
    items: [
      { name: "Vue.js", icon: `${ICON_BASE}/vuejs/vuejs-original.svg` },
      { name: "React", icon: `${ICON_BASE}/react/react-original.svg` },
    ],
  },
  {
    cat: "Mobile",
    primary: true,
    items: [
      { name: "Flutter", icon: `${ICON_BASE}/flutter/flutter-original.svg` },
      { name: "Dart", icon: `${ICON_BASE}/dart/dart-original.svg` },
    ],
  },
  {
    cat: "Tooling",
    primary: false,
    items: [
      { name: "Git", icon: `${ICON_BASE}/git/git-original.svg` },
      {
        name: "GitHub",
        icon: `${ICON_BASE}/github/github-original.svg`,
        invertOnDark: true,
      },
      { name: "Figma", icon: `${ICON_BASE}/figma/figma-original.svg` },
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Atria",
    period: "2025 — Presente",
    location: "CDMX · Híbrido",
    desc: "Construyo funcionalidades end-to-end: modelado de datos en Django, endpoints REST y componentes de UI en Vue 3. Colaboro en ciclos completos de entrega en equipo híbrido.",
    stack: ["Django", "Vue 3", "PostgreSQL"],
  },
  {
    role: "Full Stack Developer",
    company:
      "Dirección General de Publicaciones y Fomento Editorial (DGPFE) - Universidad Nacional Autónoma de México (UNAM)",
    period: "2023 — 2024",
    location: "CDMX / Remoto",
    desc: "Colaboré en el desarrollo de una plataforma de mesa de ayuda, creando API's REST con Express JS y gestionando la base de datos MySQL para optimizar el rendimiento de consultas. Implementé nuevas funcionalidades e interfaces en React, buscando mejorar la experiencia del usuario y la eficiencia del sistema.",
    stack: ["React", "MySQL", "Express JS"],
  },
  {
    role: "Licenciatura en Informática",
    company: "Facultad de Contaduría y Administración · UNAM",
    period: "2020 — 2024",
    location: "Ciudad de México",
    desc: "Formación en desarrollo de software, bases de datos, sistemas de información y administración de proyectos tecnológicos.",
    stack: [],
    isEducation: true,
  },
];

const PROJECTS = [
  {
    name: "FlowCash",
    tag: "Web · Móvil",
    desc: "App de control de finanzas personales con dashboard de ingresos y gastos, autenticación JWT con refresh automático, verificación de correo y soporte para web y Android.",
    stack: ["Flutter", "Dart", "Riverpod", "FastAPI"],
    color: 2,
    image: "images/login.png",
    demo: "https://flowcash.cloud/",
    repos: [
      { label: "Frontend", url: "https://github.com/david-hdz03/expense-control-frontend" },
      { label: "Backend", url: "https://github.com/david-hdz03/expense-control-backend" },
    ],
  },
];

const SECTIONS = [
  { id: "hero", label: "Inicio", n: "00" },
  { id: "about", label: "Sobre mí", n: "01" },
  { id: "skills", label: "Skills", n: "02" },
  { id: "experience", label: "Experiencia", n: "03" },
  { id: "projects", label: "Proyectos", n: "04" },
  { id: "contact", label: "Contacto", n: "05" },
];

// ============================================================
// HOOKS
// ============================================================
function useScrollSpy() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);
  return active;
}

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ============================================================
// COMPONENTS
// ============================================================
function Navbar({ active, onJump, palette }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-inner">
        <a
          href="#hero"
          className="nav-brand"
          onClick={(e) => {
            e.preventDefault();
            onJump("hero");
          }}
        >
          <span
            className="brand-mark"
            style={{ background: palette.accent1 }}
          ></span>
          <span className="brand-text">
            dhh<span style={{ color: palette.accent1 }}>.</span>
          </span>
        </a>
        <ul className="nav-links">
          {SECTIONS.slice(1).map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? "is-active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  onJump(s.id);
                }}
              >
                <span className="nav-n">{s.n}</span>
                <span>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="nav-cta"
          onClick={(e) => {
            e.preventDefault();
            onJump("contact");
          }}
        >
          Trabajemos juntos
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
        <button
          className="nav-burger"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {SECTIONS.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                onJump(s.id);
                setOpen(false);
              }}
            >
              <span className="nav-n">{s.n}</span> {s.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ palette, onJump }) {
  return (
    <section id="hero" data-screen-label="00 Hero" className="hero">
      <div className="hero-grid" aria-hidden="true"></div>
      <div
        className="hero-glow"
        style={{
          background: `radial-gradient(circle, ${palette.accent2}33, transparent 60%)`,
        }}
      ></div>
      <div
        className="hero-glow hero-glow-2"
        style={{
          background: `radial-gradient(circle, ${palette.accent3}26, transparent 60%)`,
        }}
      ></div>
      <div className="container hero-content">
        <div className="hero-eyebrow reveal">
          <span className="dot" style={{ background: palette.accent1 }}></span>
          <span>Disponible para nuevos proyectos · Q3 2026</span>
        </div>
        <h1 className="hero-title reveal" style={{ transitionDelay: "60ms" }}>
          {DEV.name.split(" ")[0]}
          <br />
          <span
            className="hero-title-accent"
            style={{ color: palette.accent1 }}
          >
            {DEV.name.split(" ")[1]}
          </span>
          <span
            className="hero-cursor"
            style={{ background: palette.accent1 }}
          ></span>
        </h1>
        <div className="hero-role reveal" style={{ transitionDelay: "120ms" }}>
          <span className="hero-role-tag">{DEV.role}</span>
          <span className="hero-role-sep">·</span>
          <span>Django · Vue · FastAPI · Flutter</span>
        </div>
        <p className="hero-tagline reveal" style={{ transitionDelay: "180ms" }}>
          {DEV.tagline}
        </p>
        <div
          className="hero-actions reveal"
          style={{ transitionDelay: "240ms" }}
        >
          <button
            className="btn btn-primary"
            onClick={() => onJump("projects")}
          >
            Ver proyectos
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn btn-ghost" onClick={() => onJump("contact")}>
            Contactar
          </button>
        </div>
        <div className="hero-stats reveal" style={{ transitionDelay: "320ms" }}>
          {DEV.stats.map((s, i) => (
            <div key={i} className="hero-stat">
              <div
                className="hero-stat-v"
                style={{ color: i === 0 ? palette.accent1 : palette.text }}
              >
                {s.v}
              </div>
              <div className="hero-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}

function SectionHeader({ n, kicker, title, palette }) {
  return (
    <div className="section-header reveal">
      <div className="section-kicker">
        <span className="section-n" style={{ color: palette.accent1 }}>
          // {n}
        </span>
        <span className="section-kicker-line"></span>
        <span>{kicker}</span>
      </div>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function About({ palette }) {
  return (
    <section id="about" data-screen-label="01 About" className="section about">
      <div className="container">
        <SectionHeader
          n="01"
          kicker="Sobre mí"
          title="Un poco de contexto."
          palette={palette}
        />
        <div className="about-grid">
          <div className="about-portrait reveal">
            <div className="portrait-frame">
              <div className="portrait-deco" aria-hidden="true">
                <span className="portrait-deco-line">$ whoami</span>
                <span
                  className="portrait-deco-line"
                  style={{ color: palette.accent1 }}
                >
                  &gt; full_stack.dev
                </span>
                <span className="portrait-deco-corner portrait-deco-tl"></span>
                <span className="portrait-deco-corner portrait-deco-tr"></span>
                <span className="portrait-deco-corner portrait-deco-bl"></span>
                <span className="portrait-deco-corner portrait-deco-br"></span>
              </div>
              <div
                className="portrait-avatar-bg"
                style={{
                  background: `radial-gradient(circle at 50% 35%, ${palette.accent1}22, transparent 70%)`,
                }}
              ></div>
              <img
                className="portrait-avatar"
                src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=mateoherrera&backgroundType=solid&backgroundColor=transparent"
                alt="Avatar tech"
              />
              <div
                className="portrait-tag"
                style={{ background: palette.accent1, color: palette.bg }}
              >
                <span>● en línea</span>
              </div>
            </div>
          </div>
          <div className="about-body">
            <p className="about-lead reveal">
              Hola, soy <strong>{DEV.name}</strong>. {DEV.bio}
            </p>
            <p
              className="about-secondary reveal"
              style={{ textAlign: "justify" }}
            >
              Actualmente vivo en <strong>{DEV.location}</strong> y trabajo de
              forma híbrida. Cuando no estoy programando, probablemente sólo
              esté escuchando música o jugando algún videojuego.
            </p>
            <div className="about-meta reveal">
              <div className="about-meta-item">
                <span className="meta-l">Ubicación</span>
                <span className="meta-v">{DEV.location}</span>
              </div>
              <div className="about-meta-item">
                <span className="meta-l">Disponible</span>
                <span className="meta-v" style={{ color: palette.accent1 }}>
                  ● Sí, Q3 2026
                </span>
              </div>
              <div className="about-meta-item">
                <span className="meta-l">Idiomas</span>
                <span className="meta-v">Español nativo </span>
                <span className="meta-v">Inglés B1</span>
              </div>
              <div className="about-meta-item">
                <span className="meta-l">Modalidad</span>
                <span className="meta-v">Remoto / Híbrido</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ palette }) {
  return (
    <section
      id="skills"
      data-screen-label="02 Skills"
      className="section skills"
    >
      <div className="container">
        <SectionHeader
          n="02"
          kicker="Stack"
          title="Tecnologías con las que construyo."
          palette={palette}
        />
        <div className="skills-grid">
          {SKILLS.map((group, gi) => (
            <div
              key={group.cat}
              className={`skill-card reveal ${group.primary ? "is-primary" : ""}`}
              style={{ transitionDelay: `${gi * 60}ms` }}
            >
              <div className="skill-card-head">
                <span className="skill-cat">{group.cat}</span>
                {group.primary && (
                  <span
                    className="skill-badge"
                    style={{ background: palette.accent1, color: palette.bg }}
                  >
                    core
                  </span>
                )}
              </div>
              <ul className="skill-list">
                {group.items.map((it, i) => {
                  const accent =
                    i % 3 === 0
                      ? palette.accent1
                      : i % 3 === 1
                        ? palette.accent2
                        : palette.accent3;
                  return (
                    <li
                      key={it.name}
                      className="skill-tile"
                      style={{ "--tile-accent": accent }}
                    >
                      <div className="skill-tile-icon">
                        <img
                          src={it.icon}
                          alt={it.name}
                          loading="lazy"
                          style={it.invertOnDark ? { filter: "invert(1)" } : {}}
                        />
                      </div>
                      <span className="skill-tile-name">{it.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ palette }) {
  return (
    <section
      id="experience"
      data-screen-label="03 Experience"
      className="section experience"
    >
      <div className="container">
        <SectionHeader
          n="03"
          kicker="Trayectoria"
          title="Dónde he construido."
          palette={palette}
        />
        <div className="timeline">
          <div
            className="timeline-spine"
            style={{
              background: `linear-gradient(180deg, ${palette.accent1}, ${palette.accent2}, ${palette.accent3})`,
            }}
          ></div>
          {EXPERIENCE.map((job, i) => (
            <div
              key={i}
              className="timeline-item reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="timeline-node">
                <div
                  className="timeline-dot"
                  style={{
                    background: job.isEducation ? palette.accent3 : palette.accent1,
                    borderColor: palette.bg,
                  }}
                ></div>
              </div>
              <div className="timeline-card">
                <div className="timeline-head">
                  <div>
                    <div className="timeline-role">{job.role}</div>
                    <div className="timeline-company">
                      <span style={{ color: job.isEducation ? palette.accent3 : palette.accent1 }}>
                        {job.isEducation ? "🎓" : "@"}
                      </span>{" "}
                      {job.company} · {job.location}
                    </div>
                  </div>
                  <div className="timeline-period">{job.period}</div>
                </div>
                <p className="timeline-desc">{job.desc}</p>
                <div className="chip-row">
                  {job.stack.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ palette }) {
  const [filter, setFilter] = useState("Todos");
  const tags = ["Todos", ...new Set(PROJECTS.map((p) => p.tag))];
  const shown =
    filter === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.tag === filter);
  return (
    <section
      id="projects"
      data-screen-label="04 Projects"
      className="section projects"
    >
      <div className="container">
        <SectionHeader
          n="04"
          kicker="Trabajo seleccionado"
          title="Proyectos recientes."
          palette={palette}
        />
        <div className="project-filters reveal">
          {tags.map((t) => (
            <button
              key={t}
              className={`filter-pill ${filter === t ? "is-active" : ""}`}
              onClick={() => setFilter(t)}
              style={
                filter === t
                  ? {
                      background: palette.accent1,
                      color: palette.bg,
                      borderColor: palette.accent1,
                    }
                  : {}
              }
            >
              {t}
            </button>
          ))}
        </div>
        <div className="project-grid">
          {shown.map((p, i) => {
            const accent =
              p.color === 1
                ? palette.accent1
                : p.color === 2
                  ? palette.accent2
                  : palette.accent3;
            return (
              <article
                key={p.name}
                className="project-card reveal"
                style={{ transitionDelay: `${i * 60}ms`, "--accent": accent }}
              >
                <div className="project-image">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: "inherit" }}
                    />
                  ) : (
                    <>
                      <div className="project-image-grid"></div>
                      <div className="project-image-shape" style={{ background: accent }}></div>
                      <div className="project-image-shape project-image-shape-2"></div>
                      <span className="project-image-label">
                        // {p.name.toLowerCase().replace(/[^a-z]/g, "-")}.png
                      </span>
                    </>
                  )}
                </div>
                <div className="project-body">
                  <div className="project-head">
                    <span
                      className="project-tag"
                      style={{ color: accent, borderColor: accent + "55" }}
                    >
                      {p.tag}
                    </span>
                    <div className="project-links">
                      {p.demo ? (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Demo">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <path d="M15 3h6v6" />
                            <path d="M10 14 21 3" />
                          </svg>
                        </a>
                      ) : (
                        <button className="project-link" aria-label="Demo" disabled>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <path d="M15 3h6v6" />
                            <path d="M10 14 21 3" />
                          </svg>
                        </button>
                      )}
                      {p.repos && p.repos.length > 0 ? (
                        p.repos.map((r) => (
                          <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" className="project-link" aria-label={r.label} title={r.label}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                            </svg>
                          </a>
                        ))
                      ) : (
                        <button className="project-link" aria-label="Repositorio" disabled>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="chip-row">
                    {p.stack.map((t) => (
                      <span key={t} className="chip chip-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const WEB3FORMS_KEY = "793013d3-7117-451f-8f29-df3b08f107cb";

function Contact({ palette }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Falta tu nombre";
    if (!form.email.trim()) e.email = "Falta tu correo";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Correo no válido";
    if (!form.message.trim()) e.message = "Cuéntame algo";
    else if (form.message.trim().length < 10)
      e.message = "Un poco más, por favor";
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    setSendError(false);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        setSendError(true);
      }
    } catch {
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    {
      l: "GitHub",
      v: DEV.github,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      ),
    },
    {
      l: "LinkedIn",
      v: DEV.linkedin,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      l: "Email",
      v: DEV.email,
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 5L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="contact"
      data-screen-label="05 Contact"
      className="section contact"
    >
      <div className="container">
        <SectionHeader
          n="05"
          kicker="Contacto"
          title="Hablemos de tu proyecto."
          palette={palette}
        />
        <div className="contact-grid">
          <div className="contact-info reveal">
            <p className="contact-blurb">
              ¿Tienes un proyecto en mente o necesitas un par de manos extra en
              tu equipo? Escríbeme. Respondo en menos de 24h hábiles.
            </p>
            <div className="contact-socials">
              {socials.map((s) => (
                <a
                  key={s.l}
                  href="#"
                  className="social-card"
                  onClick={(e) => e.preventDefault()}
                >
                  <span
                    className="social-icon"
                    style={{ color: palette.accent1 }}
                  >
                    {s.icon}
                  </span>
                  <div>
                    <div className="social-l">{s.l}</div>
                    <div className="social-v">{s.v}</div>
                  </div>
                  <svg
                    className="social-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={submit} noValidate>
            <div className="form-row">
              <label className="form-field">
                <span className="form-label">Nombre</span>
                <input
                  className={`form-input ${errors.name ? "has-error" : ""}`}
                  type="text"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && (
                  <span className="form-error">{errors.name}</span>
                )}
              </label>
              <label className="form-field">
                <span className="form-label">Correo</span>
                <input
                  className={`form-input ${errors.email ? "has-error" : ""}`}
                  type="email"
                  placeholder="tu@correo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </label>
            </div>
            <label className="form-field">
              <span className="form-label">Mensaje</span>
              <textarea
                className={`form-input form-textarea ${errors.message ? "has-error" : ""}`}
                placeholder="Cuéntame sobre tu proyecto, equipo, timeline..."
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && (
                <span className="form-error">{errors.message}</span>
              )}
            </label>
            {sendError && (
              <span
                className="form-error"
                style={{ marginBottom: "8px", display: "block" }}
              >
                Error al enviar. Intenta de nuevo o escríbeme directo a{" "}
                {DEV.email}
              </span>
            )}
            <button
              type="submit"
              className={`btn btn-primary form-submit ${sent ? "is-sent" : ""}`}
              disabled={sent || loading}
            >
              {sent ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Mensaje enviado · te respondo pronto
                </>
              ) : loading ? (
                "Enviando..."
              ) : (
                <>
                  Enviar mensaje
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer({ palette }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span
            className="brand-mark"
            style={{ background: palette.accent1 }}
          ></span>
          <span>
            {DEV.name} · {DEV.role}
          </span>
        </div>
        <div className="footer-meta">
          <span>© 2026</span>
          <span>Hecho con React + ☕</span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// APP
// ============================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  palette: "aurora",
  showGrid: true,
}; /*EDITMODE-END*/

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const palette = PALETTES[tweaks.palette] || PALETTES.aurora;
  const active = useScrollSpy();
  useReveal();

  // Re-run reveal when palette changes (no need actually, but harmless)
  useEffect(() => {
    document.documentElement.style.setProperty("--bg", palette.bg);
    document.documentElement.style.setProperty("--bg-raised", palette.bgRaised);
    document.documentElement.style.setProperty("--bg-card", palette.bgCard);
    document.documentElement.style.setProperty("--border", palette.border);
    document.documentElement.style.setProperty(
      "--border-strong",
      palette.borderStrong,
    );
    document.documentElement.style.setProperty("--text", palette.text);
    document.documentElement.style.setProperty(
      "--text-muted",
      palette.textMuted,
    );
    document.documentElement.style.setProperty("--accent-1", palette.accent1);
    document.documentElement.style.setProperty("--accent-2", palette.accent2);
    document.documentElement.style.setProperty("--accent-3", palette.accent3);
    document.documentElement.style.setProperty("--grid", palette.grid);
    document.documentElement.style.setProperty(
      "--grid-display",
      tweaks.showGrid ? "block" : "none",
    );
  }, [tweaks.palette, tweaks.showGrid, palette]);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top =
        el.getBoundingClientRect().top +
        window.scrollY -
        (id === "hero" ? 0 : 60);
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar active={active} onJump={jump} palette={palette} />
      <main>
        <Hero palette={palette} onJump={jump} />
        <About palette={palette} />
        <Skills palette={palette} />
        <Experience palette={palette} />
        <Projects palette={palette} />
        <Contact palette={palette} />
      </main>
      <Footer palette={palette} />

      <TweaksPanel title="Tweaks" defaultPosition={{ right: 20, bottom: 20 }}>
        <TweakSection title="Paleta">
          <TweakRadio
            value={tweaks.palette}
            options={[
              { value: "aurora", label: "Aurora" },
              { value: "sunset", label: "Sunset" },
              { value: "ocean", label: "Ocean" },
            ]}
            onChange={(v) => setTweak("palette", v)}
          />
        </TweakSection>
        <TweakSection title="Display">
          <TweakToggle
            label="Grid técnico de fondo"
            value={tweaks.showGrid}
            onChange={(v) => setTweak("showGrid", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
