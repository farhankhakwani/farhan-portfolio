import React, { useState, useEffect, useRef } from "react";
import {
  Menu, X, Github, Linkedin, Mail, MapPin, Phone, Calendar, ArrowRight, ArrowUpRight,
  Server, Database, Monitor, Sparkles, Boxes, Terminal, Building2, Kanban, Layout, Globe,
  Briefcase, GraduationCap, Send, CheckCircle2, Moon, Sun, Copy, Check
} from "lucide-react";

/* ───────── THEME (real light + dark via CSS variables) ───────── */
const THEMES = {
  dark: {
    "--bg": "#0B0D12", "--alt": "#11141B", "--card": "#171A22", "--border": "#2A2E39",
    "--text": "#F4F4F5", "--second": "#B6B6C0", "--muted": "#8E8E9A",
    "--accent": "#2DD4BF", "--accent2": "#14B8A6", "--on": "#04110F", "--ok": "#34D399",
  },
  light: {
    "--bg": "#FAFAF9", "--alt": "#F0F4F3", "--card": "#FFFFFF", "--border": "#DDE5E3",
    "--text": "#0F172A", "--second": "#475569", "--muted": "#64748B",
    "--accent": "#0D9488", "--accent2": "#0F766E", "--on": "#FFFFFF", "--ok": "#059669",
  },
};
const v = (n) => `var(--${n})`;
const tint = (n, p) => `color-mix(in srgb, var(--${n}) ${p}%, transparent)`;
const GRAD = "linear-gradient(135deg, var(--accent), var(--accent2))";

/* ───────── DATA ───────── */
const me = {
  name: "Farhan Arif",
  title: "PHP / Laravel Developer",
  location: "Lahore, Pakistan",
  email: "farhanarif266@gmail.com",
  phone: "+92 344 0551041",
  linkedin: "https://linkedin.com/in/farhan-arif-khakwani",
  github: "https://github.com/farhankhakwani",
  summary:
    "I build secure, scalable web applications and REST APIs with Laravel, from AI-powered CRMs to BIM-based construction inventory systems.",
  about:
    "Backend developer with hands-on production experience in PHP (OOP) and Laravel, REST API design, MySQL/PostgreSQL, and front-end development. I've worked on AI-powered CRM platforms, a BIM construction inventory system, and real-time collaborative project tools, with solid grounding in MVC, RBAC, and third-party integrations (Gmail, Outlook, IMAP).",
  interests: ["Sports", "Teaching", "Video gaming", "Exploring new technologies"],
  languages: "English (advanced) · Urdu (native)",
};

const job = {
  role: "Associate Software Developer", company: "Custom Software", location: "Lahore, Pakistan",
  period: "Oct 2025 – Present", type: "Full-time",
  points: [
    "Designed, built, and maintained PHP APIs for secure, reliable communication between internal systems and third-party services.",
    "Tested APIs with Postman to verify functionality, reliability, and performance before deployment.",
    "Turned client requirements into responsive, user-friendly web applications that work across devices.",
    "Debugged and optimized PHP/Laravel code and built database-driven applications.",
  ],
  tech: ["PHP", "Laravel", "MySQL", "PostgreSQL", "Postman", "REST API", "RBAC"],
};

const skills = [
  { cat: "Backend", icon: Server, items: ["PHP (OOP)", "Laravel", "MVC", "REST API", "RBAC", "Eloquent ORM", "Node.js", "Express.js"] },
  { cat: "Frontend", icon: Monitor, items: ["HTML5", "CSS3", "JavaScript", "React.js", "jQuery", "Ajax", "Bootstrap", "Tailwind", "Vite"] },
  { cat: "Database & APIs", icon: Database, items: ["MySQL", "PostgreSQL", "Postman", "Gmail API", "Outlook API", "IMAP", "OAuth"] },
  { cat: "Real-time & AI", icon: Sparkles, items: ["Socket.io", "Real-time collaboration", "OpenAI API", "Workflow automation"] },
  { cat: "BIM & 3D", icon: Boxes, items: ["IFC/GLB", "3D BIM viewer", "Property extraction", "BIM estimation"] },
  { cat: "Tools", icon: Terminal, items: ["Git", "GitHub", "VS Code", "Agile/Scrum", "SDLC", "Clean code"] },
];

const projects = [
  { title: "BIM-Based Construction Inventory", cat: "Enterprise", icon: Building2, featured: true,
    desc: "Web platform connecting projects, documents, and BIM models. IFC-to-GLB conversion, 3D viewer, rule-based material estimation, OpenAI-powered catalog matching, and inventory modules with audit trails.",
    tech: ["Laravel", "PostgreSQL", "Blade", "Tailwind", "IFC/GLB", "OpenAI"] },
  { title: "Real-Time Project Management", cat: "Full Stack", icon: Kanban, featured: true,
    desc: "Monday.com/Asana-style workspace with teams, projects, Kanban and calendar views, Socket.io live updates, comments, attachments, activity log, and AI task suggestions.",
    tech: ["Node.js", "React", "Express", "MySQL", "Socket.io"] },
  { title: "AI-Powered CRM", cat: "Full Stack", icon: Sparkles, featured: true,
    desc: "CRM with lead management, AI lead scoring, customer insights, and task automation. Email automation through Gmail, Outlook, and IMAP, with RBAC and analytics.",
    tech: ["Laravel", "Gmail API", "Outlook API", "IMAP", "AI/ML"] },
  { title: "WorkDo Dashboard", cat: "Full Stack", icon: Layout,
    desc: "Project and task dashboard with user roles, project tracking, and live task status updates.",
    tech: ["Laravel", "Bootstrap", "JavaScript"] },
  { title: "Restaurant Website", cat: "Frontend", icon: Globe,
    desc: "Fully responsive restaurant site with clean layouts that work on every screen size.",
    tech: ["HTML", "CSS", "Bootstrap"] },
];

/* ───────── SMALL PARTS ───────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: seen ? 1 : 0, transform: seen ? "none" : "translateY(16px)", transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

const Chip = ({ children, accent }) => (
  <span className="px-2.5 py-1 rounded-md text-xs font-medium"
    style={accent
      ? { background: tint("accent", 12), color: v("accent"), border: `1px solid ${tint("accent", 30)}` }
      : { background: tint("text", 5), color: v("second"), border: `1px solid ${v("border")}` }}>
    {children}
  </span>
);

const Card = ({ children, className = "", style = {} }) => (
  <div className={`rounded-2xl ${className}`} style={{ background: v("card"), border: `1px solid ${v("border")}`, ...style }}>{children}</div>
);

const Heading = ({ title, sub }) => (
  <div className="mb-12 max-w-2xl">
    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: v("text") }}>{title}</h2>
    {sub && <p className="mt-3 text-base" style={{ color: v("second") }}>{sub}</p>}
  </div>
);

const Section = ({ id, alt, children }) => (
  <section id={id} className="py-20 sm:py-24 px-4" style={{ background: alt ? v("alt") : v("bg") }}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const Btn = ({ href, children, ghost, ...p }) => (
  <a href={href} {...p}
    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-transform hover:-translate-y-0.5"
    style={ghost
      ? { border: `1px solid ${v("border")}`, color: v("text") }
      : { background: GRAD, color: v("on") }}>
    {children}
  </a>
);

/* ───────── NAV ───────── */
const links = ["about", "skills", "experience", "work", "contact"];

function Navbar({ dark, toggle }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 30);
      let cur = "";
      links.forEach((id) => { const el = document.getElementById(id); if (el && window.scrollY >= el.offsetTop - 160) cur = id; });
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  const iconBtn = { background: tint("text", 6), color: v("second"), border: `1px solid ${v("border")}` };
  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all"
          style={scrolled ? { background: tint("card", 90), backdropFilter: "blur(14px)", border: `1px solid ${v("border")}` } : {}}>
          <a href="#home" className="flex items-center gap-2 font-bold" style={{ color: v("text") }}>
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-sm" style={{ background: GRAD, color: v("on") }}>FA</span>
            <span className="hidden sm:block">Farhan Arif</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a key={l} href={`#${l}`} className="px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors"
                style={active === l ? { background: tint("accent", 14), color: v("accent") } : { color: v("second") }}>{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme" className="p-2.5 rounded-full" style={iconBtn}>
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a href="#contact" className="hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-semibold" style={{ background: GRAD, color: v("on") }}>Hire me</a>
            <button className="md:hidden p-2" aria-label="Menu" onClick={() => setOpen(!open)} style={{ color: v("text") }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-40 pt-24 px-6 md:hidden" style={{ background: v("bg") }}>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a key={l} href={`#${l}`} onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-lg capitalize" style={{ color: v("text") }}>{l}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4 px-4 py-3 rounded-xl font-semibold text-center" style={{ background: GRAD, color: v("on") }}>Hire me</a>
          </div>
        </div>
      )}
    </>
  );
}

/* ───────── HERO ───────── */
const roles = ["PHP / Laravel Developer", "REST API Developer", "Web Application Developer", "BIM & AI Integration"];

function Hero() {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = roles[i];
    const t = setTimeout(() => {
      if (!del && text === cur) setDel(true);
      else if (del && text === "") { setDel(false); setI((i + 1) % roles.length); }
      else setText(del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1));
    }, !del && text === cur ? 1800 : del ? 35 : 70);
    return () => clearTimeout(t);
  }, [text, del, i]);

  return (
    <section id="home" className="relative min-h-screen flex items-center px-4 pt-24 pb-16 overflow-hidden" style={{ background: v("bg") }}>
      <div className="absolute rounded-full pointer-events-none" style={{ top: -120, left: -120, width: 560, height: 560, background: tint("accent", 14), filter: "blur(120px)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.04, backgroundImage: `linear-gradient(${v("text")} 1px, transparent 1px), linear-gradient(90deg, ${v("text")} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6" style={{ border: `1px solid ${v("border")}`, color: v("second") }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: v("ok") }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: v("ok") }} />
            </span>
            Open to new opportunities
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight" style={{ color: v("text"), lineHeight: 1.05 }}>
            Farhan Arif
          </h1>
          <div className="h-10 mt-4 flex items-center text-xl sm:text-2xl" style={{ color: v("accent") }}>
            {text}<span className="inline-block w-0.5 h-6 ml-1 animate-pulse" style={{ background: v("accent") }} />
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: v("second") }}>{me.summary}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Btn href="#work">View my work <ArrowRight size={16} /></Btn>
            <Btn href="#contact" ghost><Mail size={16} /> Get in touch</Btn>
          </div>
          <div className="mt-10 flex items-center gap-3">
            {[[Github, me.github, "GitHub"], [Linkedin, me.linkedin, "LinkedIn"], [Mail, `mailto:${me.email}`, "Email"]].map(([Icon, href, label]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="p-2.5 rounded-xl"
                style={{ background: tint("text", 6), color: v("second"), border: `1px solid ${v("border")}` }}><Icon size={18} /></a>
            ))}
          </div>
        </div>

        {/* Live stack card — shows real work instead of a decorative orb */}
        <div className="lg:col-span-2">
          <Card className="p-5 shadow-xl">
            <div className="flex items-center gap-1.5 mb-4">
              {["#F87171", "#FBBF24", "#34D399"].map((c) => <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
              <span className="ml-2 text-xs font-mono" style={{ color: v("muted") }}>InventoryController.php</span>
            </div>
            <pre className="text-xs leading-relaxed overflow-x-auto font-mono" style={{ color: v("second"), margin: 0 }}>
{`public function estimate(Project $project)
{
    $items = $project->bimModel
        ->properties()
        ->mapToCatalog();   // OpenAI match

    return response()->json([
        'items' => $items,
        'audit' => $this->log($project),
    ]);
}`}
            </pre>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {["Laravel", "PostgreSQL", "REST API", "OpenAI"].map((t) => <Chip key={t} accent>{t}</Chip>)}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ───────── ABOUT ───────── */
function About() {
  return (
    <Section id="about" alt>
      <Reveal><Heading title="About me" sub="Backend architecture first, with front-end that people enjoy using." /></Reveal>
      <div className="grid lg:grid-cols-12 gap-8">
        <Reveal className="lg:col-span-5">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold" style={{ background: GRAD, color: v("on") }}>FA</div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: v("text") }}>{me.name}</h3>
                <p className="text-sm" style={{ color: v("accent") }}>{me.title}</p>
              </div>
            </div>
            <div className="space-y-2.5 text-sm" style={{ color: v("second") }}>
              <p className="flex items-center gap-2.5"><MapPin size={14} style={{ color: v("accent") }} />{me.location}</p>
              <p className="flex items-center gap-2.5"><Mail size={14} style={{ color: v("accent") }} />{me.email}</p>
              <p className="flex items-center gap-2.5"><Briefcase size={14} style={{ color: v("accent") }} />{job.company}</p>
              <p className="flex items-center gap-2.5"><Globe size={14} style={{ color: v("accent") }} />{me.languages}</p>
            </div>
            <div className="mt-5 pt-5 flex flex-wrap gap-2" style={{ borderTop: `1px solid ${v("border")}` }}>
              {me.interests.map((x) => <Chip key={x}>{x}</Chip>)}
            </div>
          </Card>
        </Reveal>
        <div className="lg:col-span-7 space-y-6">
          <Reveal><p className="text-lg leading-relaxed" style={{ color: v("text"), maxWidth: 640 }}>{me.about}</p></Reveal>
          <Reveal delay={100}>
            <div className="grid sm:grid-cols-3 gap-3">
              {[["1+ year", "Production experience"], ["5", "Projects delivered"], ["3", "Enterprise-style systems"]].map(([a, b]) => (
                <Card key={b} className="p-4">
                  <p className="text-2xl font-bold" style={{ color: v("accent") }}>{a}</p>
                  <p className="text-sm mt-1" style={{ color: v("second") }}>{b}</p>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ───────── SKILLS ───────── */
function Skills() {
  return (
    <Section id="skills">
      <Reveal><Heading title="Skills & technologies" sub="The tools I use across backend, frontend, data, real-time, and BIM work." /></Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((g, idx) => {
          const Icon = g.icon;
          return (
            <Reveal key={g.cat} delay={idx * 50} className="h-full">
              <Card className="p-5 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2.5 rounded-xl" style={{ background: GRAD, color: v("on") }}><Icon size={18} /></span>
                  <h3 className="font-bold" style={{ color: v("text") }}>{g.cat}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">{g.items.map((s) => <Chip key={s}>{s}</Chip>)}</div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ───────── EXPERIENCE ───────── */
function Experience() {
  return (
    <Section id="experience" alt>
      <Reveal><Heading title="Experience" sub="Building production systems, from APIs to full applications." /></Reveal>
      <Reveal>
        <Card className="p-6 sm:p-8 max-w-4xl">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold" style={{ color: v("text") }}>{job.role}</h3>
              <p className="font-medium mt-0.5" style={{ color: v("accent") }}>{job.company}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: tint("ok", 14), color: v("ok"), border: `1px solid ${tint("ok", 35)}` }}>{job.type}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm mt-3 mb-5" style={{ color: v("second") }}>
            <span className="flex items-center gap-1.5"><Calendar size={13} />{job.period}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
          </div>
          <ul className="space-y-2.5">
            {job.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm leading-relaxed" style={{ color: v("second") }}>
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: v("accent") }} />{p}
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-5 flex flex-wrap gap-1.5" style={{ borderTop: `1px solid ${v("border")}` }}>
            {job.tech.map((t) => <Chip key={t} accent>{t}</Chip>)}
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}

/* ───────── WORK + EDUCATION ───────── */
function Work() {
  const [f, setF] = useState("All");
  const cats = ["All", "Enterprise", "Full Stack", "Frontend"];
  const list = f === "All" ? projects : projects.filter((p) => p.cat === f);
  return (
    <Section id="work">
      <Reveal><Heading title="Selected work" sub="Systems built for real business problems." /></Reveal>
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((c) => (
          <button key={c} onClick={() => setF(c)} aria-pressed={f === c} className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
            style={f === c ? { background: GRAD, color: v("on") } : { background: v("card"), color: v("second"), border: `1px solid ${v("border")}` }}>{c}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ alignItems: "stretch" }}>
        {list.map((p) => {
          const Icon = p.icon;
          return (
            <Card key={p.title} className="p-5 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl" style={{ background: tint("accent", 14), color: v("accent") }}><Icon size={20} /></span>
                <span className="text-xs font-medium" style={{ color: v("muted") }}>{p.cat}</span>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: v("text") }}>{p.title}</h3>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: v("second") }}>{p.desc}</p>
              <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: `1px solid ${v("border")}` }}>
                {p.tech.map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-16">
        <h3 className="flex items-center gap-2 text-xl font-bold mb-5" style={{ color: v("text") }}>
          <GraduationCap size={20} style={{ color: v("accent") }} /> Education
        </h3>
        <Card className="p-6 max-w-3xl flex items-start gap-4">
          <span className="p-3 rounded-xl shrink-0" style={{ background: GRAD, color: v("on") }}><GraduationCap size={22} /></span>
          <div>
            <h4 className="font-bold" style={{ color: v("text") }}>Bachelor's in Computer Science</h4>
            <p className="text-sm mt-0.5" style={{ color: v("accent") }}>Federal Urdu University, Islamabad</p>
            <p className="text-sm mt-1" style={{ color: v("second") }}>2013 – 2019</p>
          </div>
        </Card>
      </div>
    </Section>
  );
}

/* ───────── CONTACT ───────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${me.email}?subject=${subject}&body=${body}`;
  };
  const copy = () => {
    try { navigator.clipboard.writeText(me.email); } catch (_) {}
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  const field = { background: v("bg"), border: `1px solid ${v("border")}`, color: v("text") };
  const info = [
    { icon: Mail, label: "Email", value: me.email, href: `mailto:${me.email}`, copy: true },
    { icon: Phone, label: "Phone", value: me.phone, href: `tel:${me.phone.replace(/\s/g, "")}` },
    { icon: Linkedin, label: "LinkedIn", value: "farhan-arif-khakwani", href: me.linkedin, ext: true },
    { icon: MapPin, label: "Location", value: me.location },
  ];

  return (
    <Section id="contact" alt>
      <Reveal><Heading title="Let's work together" sub="Have a project in mind or a role to fill? Send a message and I'll reply by email." /></Reveal>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {info.map((it) => {
            const Icon = it.icon;
            const W = it.href ? "a" : "div";
            return (
              <W key={it.label} href={it.href} target={it.ext ? "_blank" : undefined} rel={it.ext ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: v("card"), border: `1px solid ${v("border")}` }}>
                <span className="p-2.5 rounded-xl" style={{ background: tint("accent", 14), color: v("accent") }}><Icon size={18} /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs" style={{ color: v("muted") }}>{it.label}</p>
                  <p className="text-sm font-medium truncate" style={{ color: v("text") }}>{it.value}</p>
                </div>
                {it.copy && (
                  <button onClick={(e) => { e.preventDefault(); copy(); }} aria-label="Copy email" className="p-2 rounded-lg" style={{ background: tint("text", 6), color: v("second") }}>
                    {copied ? <Check size={14} style={{ color: v("ok") }} /> : <Copy size={14} />}
                  </button>
                )}
              </W>
            );
          })}
          <div className="p-5 rounded-2xl" style={{ background: tint("accent", 8), border: `1px solid ${tint("accent", 30)}` }}>
            <Sparkles size={20} className="mb-2" style={{ color: v("accent") }} />
            <p className="text-sm leading-relaxed" style={{ color: v("text") }}>
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>
        </div>
        <form onSubmit={submit} className="lg:col-span-3 p-6 sm:p-8 rounded-3xl space-y-4" style={{ background: v("card"), border: `1px solid ${v("border")}` }}>
          <div className="grid sm:grid-cols-2 gap-4">
            {[["name", "Name", "text", "Your name"], ["email", "Email", "email", "you@example.com"]].map(([k, l, t, ph]) => (
              <label key={k} className="block text-sm font-medium" style={{ color: v("second") }}>{l}
                <input required type={t} value={form[k]} placeholder={ph} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="mt-2 w-full px-4 py-3 rounded-xl text-sm" style={field} />
              </label>
            ))}
          </div>
          <label className="block text-sm font-medium" style={{ color: v("second") }}>Message
            <textarea required rows={6} value={form.message} placeholder="Tell me about your project" onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 w-full px-4 py-3 rounded-xl text-sm resize-none" style={field} />
          </label>
          <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-transform hover:-translate-y-0.5" style={{ background: GRAD, color: v("on") }}>
            <Send size={18} /> Send by email
          </button>
        </form>
      </div>
    </Section>
  );
}

/* ───────── APP ───────── */
export default function App() {
  const [dark, setDark] = useState(true);
  return (
    <div className="min-h-screen antialiased" style={{ ...THEMES[dark ? "dark" : "light"], background: v("bg"), color: v("text"), fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        input:focus, textarea:focus { border-color: var(--accent) !important; }
        ::selection { background: color-mix(in srgb, var(--accent) 35%, transparent); }
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
      `}</style>
      <Navbar dark={dark} toggle={() => setDark((d) => !d)} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Work />
      <Contact />
      <footer className="py-8 px-4" style={{ background: v("bg"), borderTop: `1px solid ${v("border")}` }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: v("muted") }}>
          <span>© {new Date().getFullYear()} Farhan Arif</span>
          <div className="flex gap-2">
            {[[Github, me.github], [Linkedin, me.linkedin], [Mail, `mailto:${me.email}`]].map(([Icon, href], i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label="Social link" className="p-2 rounded-lg" style={{ background: tint("text", 6), color: v("second"), border: `1px solid ${v("border")}` }}><Icon size={16} /></a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}