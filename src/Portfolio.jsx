import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown,
  Code, Server, Database, Globe, Layers, Cpu, Award, Briefcase,
  GraduationCap, MapPin, Phone, Calendar, ArrowRight, Star, Zap,
  Terminal, GitBranch, Monitor, Smartphone, Cloud, Shield, Send,
  Bug, Sparkles, Layout, Box, MessageSquare, CheckCircle2,
  Clock, TrendingUp, Eye, Download, Moon, Sun, Copy, Check
} from "lucide-react";

const personalData = {
  name: "Farhan Arif",
  title: "PHP Laravel Developer",
  location: "Lahore, Pakistan",
  email: "farhanrif266@gmail.com",
  phone: "+92 344 0551041",
  linkedin: "https://linkedin.com/in/farhanrif-khakwani",
  github: "https://github.com/farhankhakwani",
  summary: "I am a PHP Laravel Developer building scalable web applications. I specialize in hospital management systems deployed across Ireland, and AI-powered CRMs with intelligent automation.",
  about: "Passionate about clean code, performance optimization, and delivering user-centric solutions. I bridge backend architecture with intuitive front-end experiences, always keeping real users in mind. Currently working full-time at Custom Software — balancing engineering challenges with continuous learning every day.",
  languages: [
    { name: "English", level: "Advanced", percentage: 85 },
    { name: "Urdu", level: "Native", percentage: 100 }
  ],
  interests: ["Sports", "Teaching", "Video Gaming", "Exploring New Technologies"],
  achievements: [
    { title: "Hospital Software Management", description: "Successfully managing 4 hospital software systems in Ireland, handling PHP APIs, backend communication, and comprehensive API testing with Postman." },
    { title: "Custom Software Development", description: "Transformed client requirements into user-friendly, functional websites with seamless performance and responsiveness." }
  ]
};

const experienceData = [
  {
    id: 1, role: "Associate Software Developer", company: "Custom Software", location: "Lahore, Pakistan",
    period: "Oct 2025 – Present", type: "Full-time",
    highlights: [
      "Develop and maintain 4 hospital management systems deployed in Ireland, covering patient registration, appointments, billing, inventory, and lab modules.",
      "Built an AI-powered CRM with lead scoring, Gmail/Outlook/IMAP email automation, call workflows, and customer analytics dashboards.",
      "Implemented Role-Based Access Control (RBAC) and real-time dashboards across all platforms."
    ],
    technologies: ["PHP", "Laravel", "MySQL", "API", "Postman", "RBAC"]
  },
  {
    id: 2, role: "Software Developer Intern", company: "Custom Software", location: "Lahore, Pakistan",
    period: "Jun 2025 – Sep 2025", type: "Internship",
    highlights: [
      "Developed responsive Laravel web applications, converting client requirements into functional, user-friendly websites.",
      "Debugged and optimized backend code and built database-driven features to improve performance and reliability.",
      "Built and customized backend functionalities for tailored solutions.",
      "Practiced troubleshooting, debugging, and optimizing code."
    ],
    technologies: ["PHP", "Laravel", "HTML", "CSS", "JavaScript", "jQuery"]
  }
];

const educationData = [
  { id: 1, degree: "Bachelor of Computer Science", institution: "Federal Urdu University", location: "Islamabad, Pakistan", period: "2014 – 2019",
    description: "Completed degree in Computer Science with strong commitment to academic excellence and consistent Cumulative Grade Point Average (CGPA)." }
];

const skillGroups = [
  { category: "Backend", icon: Server, percentage: 90, color: "from-cyan-500 to-blue-500", skills: ["PHP", "Laravel", "OOP", "MVC Architecture", "REST APIs", "Eloquent ORM"] },
  { category: "Frontend", icon: Monitor, percentage: 78, color: "from-violet-500 to-purple-500", skills: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "jQuery", "Ajax"] },
  { category: "Database & APIs", icon: Database, percentage: 85, color: "from-emerald-500 to-teal-500", skills: ["MySQL", "Postman", "Stripe", "Gmail API", "Outlook API", "IMAP"] },
  { category: "Automation & AI", icon: Sparkles, percentage: 72, color: "from-amber-500 to-orange-500", skills: ["n8n Workflows", "AI/ML Integration", "Lead Scoring", "Email Automation"] },
  { category: "Tools & Dev", icon: Terminal, percentage: 88, color: "from-rose-500 to-pink-500", skills: ["Git", "VS Code", "RBAC", "Real-time Dashboards"] },
  { category: "Domains", icon: Shield, percentage: 92, color: "from-indigo-500 to-blue-600", skills: ["Hospital Management", "CRM Systems", "Billing Systems", "Inventory"] }
];

const projectsData = [
  { id: 1, number: "01", title: "AI-Powered CRM System", category: "Full Stack",
    description: "Modular CRM with AI-driven lead scoring, email automation via Gmail/Outlook/IMAP, call workflows, and smart customer analytics dashboards.",
    technologies: ["Laravel", "PHP", "Bootstrap 5", "AI", "Gmail API", "IMAP"], color: "from-blue-500 to-cyan-400", icon: Sparkles },
  { id: 2, number: "02", title: "Hospital Management System", category: "Full Stack",
    description: "4 custom systems for Irish hospitals covering patient registration, billing, lab management, and inventory with RBAC and real-time data access.",
    technologies: ["Laravel", "PHP", "JavaScript", "RBAC"], color: "from-emerald-500 to-teal-400", icon: Shield },
  { id: 3, number: "03", title: "AI Email Agent (n8n)", category: "Automation",
    description: "Automated email classification and intelligent response workflows using n8n and AI models, significantly reducing manual communication overhead.",
    technologies: ["n8n", "AI Models", "Email APIs"], color: "from-amber-500 to-orange-400", icon: Mail },
  { id: 4, number: "04", title: "WorkDo Dashboard", category: "Full Stack",
    description: "Project and task management dashboard with user roles, dynamic UI components, and real-time team collaboration features.",
    technologies: ["Laravel", "Bootstrap", "jQuery", "RBAC"], color: "from-indigo-500 to-blue-400", icon: Layout },
  { id: 5, number: "05", title: "Comprehensive School Management System (ERP)", category: "Enterprise System",
    description: "A secure, multidimensional ERP platform designed to manage school lifecycle administrative and financial pipelines.",
    technologies: ["Laravel 12", "Eloquent ORM", "MySQL", "AJAX", "React.js", "JavaScript", "AI Analytics", "Multi-Campus"], color: "from-violet-500 to-purple-400", icon: GraduationCap }
];


// ─── ANIMATION HOOKS ────────────────────────────────────────────────

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsIntersecting(true); observer.disconnect(); }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isIntersecting];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div ref={ref} className={`transition-all duration-700 ${className}`}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function CountUp({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver();
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── PARTICLES COMPONENT ────────────────────────────────────────────
function ParticlesBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1, opacity: Math.random() * 0.5 + 0.2 });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x, dy = particles[j].y - p.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - dist / 120)})`; ctx.stroke(); }
        }
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener("resize", resize); }
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// ─── NAVBAR ─────────────────────────────────────────────────────────
function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <a href="#home" className="text-lg sm:text-xl font-bold text-white tracking-tight font-display">
              <span className="text-cyan-400">F</span>A
            </a>
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="relative px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors group">
                  {link.name}
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </a>
              ))}
              <a href="#contact" className="ml-4 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5">
                Hire Me
              </a>
              <button onClick={toggleDarkMode} className="ml-3 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={toggleDarkMode} className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-white transition-all">
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className={`fixed inset-y-0 right-0 z-40 w-72 bg-slate-900/98 backdrop-blur-xl pt-20 px-6 md:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={() => setIsOpen(false)} className="mt-4 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-center">
            Hire Me
          </a>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsOpen(false)} />}
    </>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────
function Hero() {
  const [typedText, setTypedText] = useState("");
  const phrases = ["PHP Laravel Developer", "React Developer", "Building Scalable Web Solutions", "Full Stack Developer", "API Architecture Expert"];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    const current = phrases[phraseIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    const timer = setTimeout(() => {
      if (!isDeleting && typedText === current) { setTimeout(() => setIsDeleting(true), 2000); }
      else if (isDeleting && typedText === "") { setIsDeleting(false); setPhraseIndex((prev) => (prev + 1) % phrases.length); }
      else { setTypedText(prev => isDeleting ? current.substring(0, prev.length - 1) : current.substring(0, prev.length + 1)); }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, phrases]);
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-4">
      <ParticlesBackground />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-[80px] sm:blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-[500px] sm:h-[500px] bg-violet-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[800px] sm:h-[800px] bg-blue-500/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>
      <div className="relative z-10 text-center max-w-5xl mx-auto pt-20">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium mb-6 sm:mb-8">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span></span>
            Available for Opportunities
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-2xl shadow-cyan-500/20 font-display">
            FA
          </div>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight leading-[1.1] font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500">Farhan Arif</span><br />
            <span className="text-white"></span>
          </h1>
        </AnimatedSection>
        <AnimatedSection delay={300}>
          <div className="h-10 sm:h-12 md:h-16 flex items-center justify-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-slate-400 font-light font-display">
              {typedText}<span className="inline-block w-0.5 h-6 sm:h-8 bg-cyan-400 ml-1 animate-pulse" />
            </h2>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={400}>
          <p className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            {personalData.summary}
          </p>
        </AnimatedSection>
        <AnimatedSection delay={500}>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <a href="#projects" className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:-translate-y-1 text-sm sm:text-base">
              View My Works<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 border border-slate-700 text-slate-300 font-semibold rounded-full hover:border-cyan-500/50 hover:text-cyan-400 transition-all hover:-translate-y-1 hover:bg-white/5 text-sm sm:text-base">
              <Mail size={18} />Get In Touch
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={600}>
          <div className="flex justify-center gap-3 sm:gap-4">
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-2xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110 border border-white/5 hover:border-cyan-500/30">
              <Github size={20} className="sm:w-[22px] sm:h-[22px]" />
            </a>
            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-2xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110 border border-white/5 hover:border-cyan-500/30">
              <Linkedin size={20} className="sm:w-[22px] sm:h-[22px]" />
            </a>
            <a href={`mailto:${personalData.email}`} className="p-3 sm:p-4 rounded-2xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110 border border-white/5 hover:border-cyan-500/30">
              <Mail size={20} className="sm:w-[22px] sm:h-[22px]" />
            </a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={700}>
          <a href="#about" className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-slate-600 hover:text-cyan-400 transition-colors animate-bounce">
            <ChevronDown size={24} className="sm:w-7 sm:h-7" />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── STATS ──────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: 1, suffix: "+", label: "Years Experience", icon: Briefcase },
    { value: 4, suffix: "", label: "Hospital Systems", icon: Shield },
    { value: 5, suffix: "", label: "Projects Built", icon: Layers },
    { value: 15, suffix: "+", label: "Technologies", icon: Code }
  ];
  return (
    <section className="py-10 sm:py-12 bg-slate-900 border-y border-white/5 relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <AnimatedSection key={stat.label} delay={index * 100}>
                <div className="text-center group">
                  <div className="inline-flex p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-cyan-500/10 text-cyan-400 mb-3 sm:mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-500">
                    <IconComponent size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2 font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-14 sm:py-20 bg-slate-950 relative px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">About Me</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-3 font-display">Building Digital Solutions That Scale</h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 sm:mt-6 rounded-full" />
          </div>
        </AnimatedSection>
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
          <AnimatedSection delay={200}>
            <div className="relative max-w-xs sm:max-w-sm mx-auto lg:mx-0">
              <div className="aspect-square rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-1">
                <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-slate-900 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.1),transparent_70%)]" />
                  <div className="text-center p-6 sm:p-10 relative z-10">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-3xl sm:text-5xl font-bold text-white shadow-2xl shadow-cyan-500/30">
                      FA
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display">{personalData.name}</h3>
                    <p className="text-cyan-400 font-medium mt-1 text-sm sm:text-base">{personalData.title}</p>
                    <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4 text-slate-400 text-xs sm:text-sm">
                      <MapPin size={14} /><span>{personalData.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 border-l-2 border-t-2 border-cyan-500/30 rounded-tl-2xl sm:rounded-tl-3xl" />
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 border-r-2 border-b-2 border-blue-500/30 rounded-br-2xl sm:rounded-br-3xl" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={400} className="space-y-4 sm:space-y-6">
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">{personalData.about}</p>
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {personalData.achievements.map((achievement, index) => (
                <div key={index} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/50 border border-white/5 hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/5">
                  <Award className="text-cyan-400 mb-2 sm:mb-3" size={22} />
                  <h4 className="text-white font-semibold text-sm">{achievement.title}</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{achievement.description}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {personalData.interests.map((interest, index) => (
                <span key={index} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 text-slate-400 text-xs sm:text-sm border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                  {interest}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ─────────────────────────────────────────────────────────
function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(skillGroups.map(s => s.category))];
  const filteredSkills = activeCategory === "All" ? skillGroups : skillGroups.filter(s => s.category === activeCategory);
  return (
    <section id="skills" className="py-14 sm:py-20 bg-slate-900 relative px-4">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">My Expertise</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-3 font-display">What I Work With</h2>
            <p className="text-slate-500 mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base px-4">A well-rounded stack covering backend, frontend, databases, APIs, and automation.</p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 sm:mt-6 rounded-full" />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat 
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-500/50" 
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredSkills.map((group, index) => {
            const IconComponent = group.icon;
            return (
              <AnimatedSection key={group.category} delay={index * 100}>
                <div className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-950/50 border border-white/5 hover:border-cyan-500/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/5">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className={`p-2.5 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${group.color} text-white shadow-lg shrink-0`}>
                      <IconComponent size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm sm:text-base">{group.category}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${group.color} rounded-full transition-all duration-1000`} style={{ width: `${group.percentage}%` }} />
                        </div>
                        <span className="text-cyan-400 text-xs sm:text-sm font-bold shrink-0">{group.percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {group.skills.map(skill => (
                      <span key={skill} className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-white/5 text-slate-300 text-xs font-medium border border-white/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
        <AnimatedSection delay={400}>
          <div className="mt-10 sm:mt-14 max-w-2xl mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-6 sm:mb-8 font-display">Languages</h3>
            <div className="space-y-3 sm:space-y-4">
              {personalData.languages.map((lang) => (
                <div key={lang.name} className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-950/50 border border-white/5">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <span className="text-white font-medium text-sm sm:text-base">{lang.name}</span>
                    <span className="text-cyan-400 text-xs sm:text-sm font-bold">{lang.level}</span>
                  </div>
                  <div className="w-full h-2.5 sm:h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-1000" style={{ width: `${lang.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ─────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="py-14 sm:py-20 bg-slate-950 relative overflow-hidden px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">Career Path</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-3 font-display">My Journey</h2>
            <p className="text-slate-500 mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base px-4">Building production systems from day one — real impact in real healthcare environments.</p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 sm:mt-6 rounded-full" />
          </div>
        </AnimatedSection>
        
        {/* Two column layout with center divider */}
        <div className="relative">
          {/* Center vertical divider line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent -translate-x-px" />
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-14">
            {experienceData.map((job, index) => (
              <AnimatedSection key={job.id} delay={index * 200}>
                <div className={`relative ${index % 2 === 0 ? "md:pr-6 lg:pr-10" : "md:pl-6 lg:pl-10"}`}>
                  {/* Card */}
                  <div className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-white/5 hover:border-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/5 group">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold border ${
                        job.type === "Full-time" 
                          ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                          : "bg-violet-500/10 text-violet-400 border-violet-500/20"
                      }`}>
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-cyan-400 transition-colors">{job.role}</h3>
                    <p className="text-slate-400 font-medium text-sm sm:text-base">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={12} className="sm:w-3.5 sm:h-3.5" />{job.period}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} className="sm:w-3.5 sm:h-3.5" />{job.location}</span>
                    </div>
                    <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                      {job.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm">
                          <ArrowRight size={12} className="text-cyan-500 mt-0.5 sm:mt-1 shrink-0 sm:w-3.5 sm:h-3.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                      {job.technologies.map((tech) => (
                        <span key={tech} className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-white/5 text-slate-400 text-[10px] sm:text-xs border border-white/10">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ───────────────────────────────────────────────────────
function Projects() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Full Stack", "Enterprise System", "Automation"];
  const filteredProjects = filter === "All" ? projectsData : projectsData.filter(p => p.category === filter);
  return (
    <section id="projects" className="py-14 sm:py-20 bg-slate-900 px-4">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">Portfolio</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-2 font-display">What I Have Built</h2>
            <p className="text-slate-500 mt-2 sm:mt-3 max-w-xl mx-auto text-sm sm:text-base px-4">Production systems solving real problems.</p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-3 sm:mt-4 rounded-full" />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  filter === cat 
                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-500/50" 
                    : "bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProjects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <AnimatedSection key={project.id} delay={index * 100}>
                <div className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950/50 border border-white/5 hover:border-cyan-500/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10">
                  {/* Compact header */}
                  <div className={`h-16 sm:h-20 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold border border-white/20">{project.category}</span>
                    </div>
                    <div className="absolute bottom-2 left-3 sm:bottom-3 sm:left-5 flex items-end gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <IconComponent size={16} className="sm:w-5 sm:h-5 text-white" />
                      </div>
                      <span className="text-xl sm:text-3xl font-bold text-white/20 font-display">{project.number}</span>
                    </div>
                  </div>
                  {/* Compact body */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-bold text-white font-display group-hover:text-cyan-400 transition-colors mb-1 sm:mb-1.5">{project.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-1.5 sm:px-2 py-0.5 rounded bg-white/5 text-slate-400 text-[10px] sm:text-[11px] border border-white/10">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ──────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="py-14 sm:py-20 bg-slate-950 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">Academic</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-3 font-display">Education</h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 sm:mt-6 rounded-full" />
          </div>
        </AnimatedSection>
        <div className="max-w-2xl mx-auto">
          {educationData.map((edu, index) => (
            <AnimatedSection key={edu.id} delay={index * 200}>
              <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-white/5 hover:border-cyan-500/20 transition-all group">
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap size={40} className="sm:w-16 sm:h-16 text-cyan-500" />
                </div>
                <div className="flex items-start gap-3 sm:gap-5">
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400 shrink-0">
                    <GraduationCap size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-xl font-bold text-white font-display group-hover:text-cyan-400 transition-colors">{edu.degree}</h3>
                    <p className="text-slate-400 font-medium text-sm sm:text-base mt-1">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 text-xs sm:text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Calendar size={12} className="sm:w-3.5 sm:h-3.5" />{edu.period}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} className="sm:w-3.5 sm:h-3.5" />{edu.location}</span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed">{edu.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────
function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };
  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <section id="contact" className="py-14 sm:py-20 bg-slate-900 relative px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-900/10 via-slate-900 to-slate-900" />
      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">Get In Touch</span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mt-3 font-display">Contact Me</h2>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto mt-4 sm:mt-6 rounded-full" />
          </div>
        </AnimatedSection>
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-10">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 font-display">Let Us Work Together</h3>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/50 border border-white/5 group hover:border-cyan-500/30 transition-all">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shrink-0">
                  <Mail size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">Email</p>
                  <p className="text-white font-medium mt-0.5 text-sm sm:text-base truncate">{personalData.email}</p>
                </div>
                <button onClick={copyEmail} className="p-1.5 sm:p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all shrink-0" title="Copy email">
                  {copied ? <Check size={14} className="text-emerald-400 sm:w-4 sm:h-4" /> : <Copy size={14} className="sm:w-4 sm:h-4" />}
                </button>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/50 border border-white/5">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Phone size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">Phone</p>
                  <p className="text-white font-medium mt-0.5 text-sm sm:text-base">{personalData.phone}</p>
                </div>
              </div>
              <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/50 border border-white/5 hover:border-cyan-500/30 transition-all group">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shrink-0">
                  <Linkedin size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">LinkedIn</p>
                  <p className="text-white font-medium mt-0.5 text-sm sm:text-base">farhanrif-khakwani</p>
                </div>
                <ExternalLink size={14} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 sm:w-4 sm:h-4" />
              </a>
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-950/50 border border-white/5">
                <div className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <MapPin size={16} className="sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</p>
                  <p className="text-white font-medium mt-0.5 text-sm sm:text-base">{personalData.location}</p>
                </div>
              </div>
            </div>
          </div>
          <AnimatedSection delay={200} className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-slate-950/50 border border-white/5">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm sm:text-base" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm sm:text-base" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5 sm:mb-2">Message</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none text-sm sm:text-base" placeholder="Tell me about your project..." />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-xl hover:shadow-cyan-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm sm:text-base">
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
                    submitted ? <><CheckCircle2 size={16} className="sm:w-[18px] sm:h-[18px]" />Message Sent!</> :
                    <><Send size={16} className="sm:w-[18px] sm:h-[18px]" />Send Message</>}
                </button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-6 sm:py-8 bg-slate-950 border-t border-white/5 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg sm:text-xl font-bold text-white">
              <span className="text-cyan-400">F</span>arhan <span className="text-cyan-400">A</span>rif <span className="text-slate-500">Khakwani</span>
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm">&copy; {new Date().getFullYear()} Farhan Arif. All rights reserved.</p>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-400 transition-colors">
              <Github size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href={personalData.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-cyan-400 transition-colors">
              <Linkedin size={18} className="sm:w-5 sm:h-5" />
            </a>
            <a href={`mailto:${personalData.email}`} className="text-slate-600 hover:text-cyan-400 transition-colors">
              <Mail size={18} className="sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN APP ───────────────────────────────────────────────────────
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"} font-sans selection:bg-cyan-500/30 selection:text-cyan-200`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}