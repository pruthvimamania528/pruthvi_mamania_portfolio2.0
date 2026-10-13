/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Palette,
  FileText,
  Download,
  Printer,
  X,
  ExternalLink,
  Code,
  CheckCircle,
  Award,
  Layers,
  Thermometer,
  Wind,
  Shield,
  Activity,
  Database,
  Sliders,
  Send,
  BookOpen,
  GraduationCap,
  Sparkles,
  Cpu,
  Radio,
  Github,
  Linkedin,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ProjectDetail {
  id: string;
  tag: string;
  title: string;
  metric: string;
  description: string;
  tags: string[];
  specs: { label: string; value: string; colorClass?: string }[];
  problem: string;
  pipeline: string;
  validation: string;
  githubUrl: string;
}

const PROJECTS_DATA: Record<string, ProjectDetail> = {
  yolo: {
    id: 'yolo',
    tag: 'RESEARCH SPOTLIGHT // COMPUTER VISION',
    title: 'Vehicle Detection in Foggy Weather Using YOLOv11',
    metric: 'mAP@50: 0.83',
    description:
      'Developed a specialized computer vision pipeline optimizing state-of-the-art YOLOv11 under adverse atmospheric scattering. Integrated dark channel priors and contrast enhancement heuristics.',
    tags: ['Python', 'YOLOv11', 'OpenCV', 'PyTorch'],
    specs: [
      { label: 'mAP@50', value: '0.83', colorClass: 'text-[#4cd7f6]' },
      { label: 'PRECISION', value: '0.84', colorClass: 'text-[#4edea3]' },
      { label: 'RECALL', value: '0.79', colorClass: 'text-[#4cd7f6]' },
      { label: 'F1 SCORE', value: '0.81', colorClass: 'text-[#4edea3]' },
    ],
    problem:
      'Heavy optical scattering caused by dense fog particles severely deteriorates standard convolutional edge features, causing steep drops in recall for autonomous vehicular navigation.',
    pipeline:
      'Raw Input -> Dark Channel Prior Guided Dehazing -> Contrast Limiting Adaptive Histograms (CLAHE) -> YOLOv11 SPPF Tensor Head -> Post-NMS Bounding Vector.',
    validation:
      'Evaluated over 4,200 fog-compromised test frames. Attained an empirical mAP@50 of 0.83, Precision between 0.83–0.84, Recall of 0.78–0.79, and an overall F1 harmonic score of 0.81.',
    githubUrl: 'https://github.com',
  },
  aqi: {
    id: 'aqi',
    tag: 'DATA ENGINEERING // MULTI-CITY TELEMETRY',
    title: 'Air Quality Analytics Platform Across Indian Cities',
    metric: '12 CITIES DATASET',
    description:
      'Comprehensive data extraction, statistical anomaly detection, and temporal trend clustering pipeline evaluating PM2.5, PM10, SO2, and NOx pollutant distributions with automated reporting.',
    tags: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
    specs: [
      { label: 'Anomaly Detection', value: 'Isolation Forest', colorClass: 'text-[#4edea3]' },
      { label: 'Clustering', value: 'K-Means & DBSCAN', colorClass: 'text-[#4cd7f6]' },
      { label: 'Processing Latency', value: '0.42s / 50k rows', colorClass: 'text-[#4cd7f6]' },
    ],
    problem:
      'Multi-city sensor telemetry exhibits high missingness rates, sensor calibration drift, and transient particulate spikes that distort standard municipal air quality predictions.',
    pipeline:
      'Multi-Source Ingestion -> Missing Value Spline Interpolation -> Isolation Forest Glitch Removal -> DBSCAN Spatiotemporal Clustering -> Automated PDF / Dashboard Insights.',
    validation:
      'Processed over 1.2M historical records spanning 12 metropolitan centers with 0.42s latency per 50,000 rows. Accurately pinpointed industrial particulate episodes with 91.4% temporal correlation.',
    githubUrl: 'https://github.com',
  },
  hr: {
    id: 'hr',
    tag: 'UI & ANALYTICS // TALENT TELEMETRY',
    title: 'AI-Assisted HR Productivity Dashboard UI',
    metric: 'GOOGLE STITCH UI',
    description:
      'Engineered high-efficiency recruitment telemetry and employee retention analytics dashboards. Integrated talent pipeline KPI funnels, candidate scoring models, and modern responsive design.',
    tags: ['Tailwind CSS', 'JavaScript', 'Figma', 'Stitch AI'],
    specs: [
      { label: 'UI Architecture', value: 'Bento Analytics Grid', colorClass: 'text-[#ddb7ff]' },
      { label: 'KPI Metrics', value: 'Attrition & Time-to-Hire', colorClass: 'text-[#4cd7f6]' },
      { label: 'Component Fidelity', value: 'Figma -> HTML/CSS', colorClass: 'text-[#4edea3]' },
    ],
    problem:
      'Recruitment funnels suffer from disjointed candidate evaluations and fragmented tracking across disparate interview stages, ballooning time-to-hire by 35%.',
    pipeline:
      'Applicant Profile Parsing -> Semantic Skill Vector Scoring -> Real-Time Pipeline Aggregations -> Bento Grid Cockpit -> Automated Candidate Shortlisting Trigger.',
    validation:
      'Engineered responsive neobrutalist dashboard validated across multi-resolution viewports. Accelerated candidate screening throughput by simulated 40% with zero UI latency bottlenecks.',
    githubUrl: 'https://github.com',
  },
};

interface SkillItem {
  name: string;
  category: 'ml' | 'lang' | 'tools';
  percentage: number;
  colorClass: string;
  details: string;
}

const SKILLS_DATA: SkillItem[] = [
  {
    name: 'Python',
    category: 'lang',
    percentage: 90,
    colorClass: 'bg-[#4cd7f6]',
    details: 'Python: Deep learning pipelines, pandas, numpy, scikit-learn, vector operations, and algorithmic development.',
  },
  {
    name: 'SQL',
    category: 'lang',
    percentage: 92,
    colorClass: 'bg-[#4edea3]',
    details: 'SQL: Joins, subqueries, aggregations, schema design, EXPLAIN ANALYZE indexing, query optimization.',
  },
  {
    name: 'YOLOv11',
    category: 'ml',
    percentage: 85,
    colorClass: 'bg-[#4cd7f6]',
    details: 'YOLOv11: Real-time object detection, backbone feature pyramid tuning, bounding box regression, adverse condition inference.',
  },
  {
    name: 'Scikit-Learn',
    category: 'ml',
    percentage: 88,
    colorClass: 'bg-[#4edea3]',
    details: 'Scikit-Learn: Classification, regression, clustering (K-Means, DBSCAN), dimensionality reduction (PCA), model cross-validation.',
  },
  {
    name: 'Power BI',
    category: 'tools',
    percentage: 82,
    colorClass: 'bg-[#4cd7f6]',
    details: 'Power BI: DAX calculations, interactive KPI storytelling, tabular semantic models, automated executive dashboards.',
  },
  {
    name: 'Git & GitHub',
    category: 'tools',
    percentage: 85,
    colorClass: 'bg-[#4edea3]',
    details: 'Git: Branching architectures, atomic commit discipline, automated CI pipelines, merge resolution, collaboration.',
  },
  {
    name: 'PyTorch',
    category: 'ml',
    percentage: 80,
    colorClass: 'bg-[#4cd7f6]',
    details: 'PyTorch: Tensor autograd, neural network layers, custom loss functions, model checkpointing, evaluation loops.',
  },
  {
    name: 'OpenCV',
    category: 'ml',
    percentage: 84,
    colorClass: 'bg-[#4edea3]',
    details: 'OpenCV: Image filtering, edge operators, color space conversions, histogram equalization (CLAHE), bounding box rendering.',
  },
  {
    name: 'Pandas & NumPy',
    category: 'lang',
    percentage: 91,
    colorClass: 'bg-[#4cd7f6]',
    details: 'Pandas & NumPy: High-throughput matrix operations, DataFrame reshaping, rolling window calculations, parquet file IO.',
  },
];

const SQL_INSIGHTS: Record<string, { title: string; desc: string; pre: string; post: string }> = {
  step1: {
    title: 'Query Indexing & EXPLAIN ANALYZE',
    desc: 'Refactored mission-critical legacy queries across multi-million record PostgreSQL databases. By deploying composite B-Tree indexes and optimizing execution plans, reduced database query latency by over 45% during peak traffic simulations.',
    pre: '184 ms',
    post: '14 ms (92% speedup)',
  },
  step2: {
    title: 'Complex Relational Joins & Subqueries',
    desc: 'Restructured nested queries into materialized Common Table Expressions (CTEs). Minimized disk spill on sort operations and enabled efficient parallel worker scans across distributed tenant tables.',
    pre: '340 ms',
    post: '28 ms (89% speedup)',
  },
  step3: {
    title: 'Structural Validation Pipeline',
    desc: 'Embedded automated sanity constraints, non-null assertions, and fixed dimensionality checks to sanitize incoming tabular ingest streams before running downstream machine learning inference.',
    pre: 'Manual QA',
    post: '100% Automated CI Assertions',
  },
};

export default function App() {
  // Navigation & Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse Glow Coordinate
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // 3D Avatar Tilt
  const [avatarTilt, setAvatarTilt] = useState({ x: 0, y: 0 });
  const avatarCardRef = useRef<HTMLDivElement>(null);

  // Typewriter Loop State
  const [typewriterText, setTypewriterText] = useState('Innovation Champion');
  const phrases = [
    'Innovation Champion',
    'Computer Vision Builder',
    'SQL Engineer',
    'ML Developer',
    'Data Science Undergraduate',
  ];

  // Modals state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectDetail | null>(null);

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    reason: 'Data Analyst / Data Scientist Role',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Skills filter state
  const [skillCategory, setSkillCategory] = useState<'all' | 'ml' | 'lang' | 'tools'>('all');
  const [selectedSkillDetails, setSelectedSkillDetails] = useState<string>(
    'Python: Deep learning pipelines, pandas, numpy, scikit-learn, vector operations, and algorithmic development.'
  );

  // IoT Live Sensor Simulation State
  const [iotActive, setIotActive] = useState(true);
  const [iotMetrics, setIotMetrics] = useState({
    temp: 28.3,
    press: 1013.0,
    rssi: -65,
    packets: 14930,
  });
  const [iotLogs, setIotLogs] = useState<string[]>([
    '[18:59:05] ESP8266 packet #15051 transmitted to Blynk Cloud -> 200 OK',
    '[18:59:08] ESP8266 packet #15052 transmitted to Blynk Cloud -> 200 OK',
    '[18:59:12] ESP8266 packet #15053 transmitted to Blynk Cloud -> 200 OK',
    '[18:59:15] ESP8266 packet #15054 transmitted to Blynk Cloud -> 200 OK',
    '[18:59:18] ESP8266 packet #15055 transmitted to Blynk Cloud -> 200 OK',
  ]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Hyperloop Thermal HUD Simulation
  const [thermalJitter, setThermalJitter] = useState({
    batteryTemp: 41.8,
    inverterTemp: 38.2,
    aeroFlux: 184,
  });

  // SQL IDE State
  const [ideTab, setIdeTab] = useState<'sql' | 'py'>('sql');
  const [activeSqlInsightKey, setActiveSqlInsightKey] = useState<string>('step1');

  // Interactive Terminal State
  const [termHistory, setTermHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'pruthvi.ds() Neural Core v2.4 initialized.' },
    { type: 'output', text: 'Type "help" to view available terminal commands.' },
  ]);
  const [termInput, setTermInput] = useState('');
  const termEndRef = useRef<HTMLDivElement>(null);

  // Track Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track Mouse for Radial Glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typewriter Loop
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: NodeJS.Timeout;

    const tick = () => {
      const current = phrases[phraseIdx];
      if (isDeleting) {
        setTypewriterText(current.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setTypewriterText(current.substring(0, charIdx + 1));
        charIdx++;
      }

      let speed = isDeleting ? 35 : 75;
      if (!isDeleting && charIdx === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        speed = 350;
      }

      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);
    return () => clearTimeout(timer);
  }, []);

  // IoT Sensor Simulation Loop
  useEffect(() => {
    if (!iotActive) return;

    const interval = setInterval(() => {
      setIotMetrics((prev) => {
        const nextPackets = prev.packets + 1;
        const nextTemp = +(28.0 + Math.random() * 0.8).toFixed(1);
        const nextPress = +(1012.8 + Math.random() * 0.5).toFixed(1);
        const nextRssi = -62 - Math.floor(Math.random() * 6);
        return {
          temp: nextTemp,
          press: nextPress,
          rssi: nextRssi,
          packets: nextPackets,
        };
      });

      // Add log
      if (Math.random() > 0.25) {
        const now = new Date().toTimeString().split(' ')[0];
        setIotLogs((prevLogs) => {
          const newEntry = `[${now}] ESP8266 packet #${iotMetrics.packets + 1} transmitted to Blynk Cloud -> 200 OK`;
          const updated = [...prevLogs, newEntry];
          if (updated.length > 25) updated.shift();
          return updated;
        });
      }
    }, 1400);

    return () => clearInterval(interval);
  }, [iotActive, iotMetrics.packets]);

  // Scroll IoT log container when new logs arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [iotLogs]);

  // Hyperloop Thermal HUD subtle jitter simulation
  useEffect(() => {
    const hudInterval = setInterval(() => {
      setThermalJitter({
        batteryTemp: +(41.6 + Math.random() * 0.4).toFixed(1),
        inverterTemp: +(38.0 + Math.random() * 0.4).toFixed(1),
        aeroFlux: Math.round(182 + Math.random() * 5),
      });
    }, 2000);
    return () => clearInterval(hudInterval);
  }, []);

  // 3D Tilt handlers
  const handleAvatarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarCardRef.current) return;
    const rect = avatarCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / (rect.height / 2)) * -10;
    const tiltY = (x / (rect.width / 2)) * 10;
    setAvatarTilt({ x: tiltX, y: tiltY });
  };

  const handleAvatarMouseLeave = () => {
    setAvatarTilt({ x: 0, y: 0 });
  };

  // Contact form submission simulation
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsContactOpen(false);
        setContactForm({
          name: '',
          email: '',
          reason: 'Data Analyst / Data Scientist Role',
          message: '',
        });
      }, 2000);
    }, 1000);
  };

  // Terminal command executor
  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: Array<{ type: 'input' | 'output'; text: string }> = [
      ...termHistory,
      { type: 'input', text: `λ pruthvi@portfolio:~$ ${termInput}` },
    ];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: 'Available commands: about, skills, projects, awards, contact, resume, clear, exit',
        });
        break;
      case 'about':
        newLogs.push({
          type: 'output',
          text: 'Pruthvi Anil Mamania - B.Tech IT & Data Science at ADYPU Pune. Specialist in ML, Computer Vision (YOLOv11), SQL Engineering, and IoT Systems.',
        });
        break;
      case 'skills':
        newLogs.push({
          type: 'output',
          text: 'Python (90%), SQL (92%), YOLOv11 (85%), Scikit-Learn (88%), Power BI (82%), Git (85%), PyTorch, OpenCV.',
        });
        break;
      case 'projects':
        newLogs.push({
          type: 'output',
          text: '1. YOLOv11 Foggy Weather Detection [mAP@50: 0.83]\n2. Indian Cities Air Quality Analytics [12 Cities]\n3. AI HR Productivity Dashboard UI',
        });
        break;
      case 'awards':
        newLogs.push({
          type: 'output',
          text: '🏆 Global Hyperloop Competition IIT Madras: Innovation Champion & Best Thermal System Design.',
        });
        break;
      case 'contact':
        setIsContactOpen(true);
        newLogs.push({ type: 'output', text: 'Initializing Contact Stream Modal...' });
        break;
      case 'resume':
        setIsResumeOpen(true);
        newLogs.push({ type: 'output', text: 'Opening Interactive Resume & Evidence Viewer...' });
        break;
      case 'clear':
        setTermHistory([]);
        setTermInput('');
        return;
      case 'exit':
        setIsTerminalOpen(false);
        break;
      default:
        newLogs.push({
          type: 'output',
          text: `Command not recognized: "${cmd}". Type "help" for a list of commands.`,
        });
    }

    setTermHistory(newLogs);
    setTermInput('');
    setTimeout(() => {
      termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Invert Theme flash effect
  const handleToggleThemeSignal = () => {
    document.documentElement.classList.toggle('invert');
    setTimeout(() => {
      document.documentElement.classList.toggle('invert');
    }, 200);
  };

  const filteredSkills =
    skillCategory === 'all' ? SKILLS_DATA : SKILLS_DATA.filter((s) => s.category === skillCategory);

  const activeInsight = SQL_INSIGHTS[activeSqlInsightKey] || SQL_INSIGHTS.step1;

  return (
    <div className="relative min-h-screen bg-[#0f131c] text-[#dfe2ee] font-sans selection:bg-[#06b6d4] selection:text-[#0a0e16] overflow-x-hidden">
      {/* Interactive Cursor Spotlight Glow */}
      <div
        className="pointer-events-none fixed rounded-full blur-2xl z-30 transition-transform duration-75 hidden md:block"
        style={{
          width: '380px',
          height: '380px',
          background: 'radial-gradient(circle, rgba(76, 215, 246, 0.12) 0%, rgba(78, 222, 163, 0.04) 45%, transparent 70%)',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Top Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#4cd7f6] via-[#4edea3] to-[#06b6d4] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ==================== HEADER (TOP BAR) ==================== */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#0f131c]/90 backdrop-blur-md border-b border-[#3d494c] shadow-[0_4px_0_0_#06b6d4]">
        <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-16">
          {/* Brand Logo Anchor */}
          <a href="#hero" className="flex items-center gap-3 group">
            <span className="font-mono text-sm font-bold text-[#4cd7f6] tracking-tight group-hover:text-[#4edea3] transition-colors">
              pruthvi.ds()
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#262a33] border border-[#3d494c] text-[10px] font-mono text-[#4edea3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
              ONLINE
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#honors" className="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors font-mono text-xs tracking-wider">
              Honors
            </a>
            <a href="#projects" className="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors font-mono text-xs tracking-wider">
              Projects
            </a>
            <a href="#skills" className="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors font-mono text-xs tracking-wider">
              Skills
            </a>
            <a href="#career-education" className="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors font-mono text-xs tracking-wider">
              Career &amp; Education
            </a>
          </nav>

          {/* Trailing Action Cluster */}
          <div className="flex items-center gap-3">
            {/* Terminal Button */}
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="p-2 bg-[#181c24] border border-[#3d494c] text-[#dfe2ee] hover:text-[#4cd7f6] hover:border-[#4cd7f6] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center"
              title="Open Interactive Cyber Terminal"
              aria-label="Open Interactive Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* Visual Signal Toggle */}
            <button
              onClick={handleToggleThemeSignal}
              className="p-2 bg-[#181c24] border border-[#3d494c] text-[#dfe2ee] hover:text-[#4edea3] hover:border-[#4edea3] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center"
              title="Visual Signal Pulse"
              aria-label="Trigger Visual Signal"
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* Primary Action: Resume */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#06b6d4] text-[#00424f] font-mono text-xs font-bold px-4 py-2 border-2 border-[#06b6d4] shadow-[2px_2px_0px_0px_#dfe2ee] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Resume
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-[#0a0e16]/95 backdrop-blur-lg border-t border-[#3d494c] px-3 py-2 flex justify-around items-center">
        <a href="#honors" className="flex flex-col items-center text-[10px] font-mono text-[#bcc9cd] hover:text-[#4cd7f6] py-1">
          <Award className="w-4 h-4 mb-0.5" />
          <span>Honors</span>
        </a>
        <a href="#projects" className="flex flex-col items-center text-[10px] font-mono text-[#bcc9cd] hover:text-[#4cd7f6] py-1">
          <Code className="w-4 h-4 mb-0.5" />
          <span>Projects</span>
        </a>
        <a href="#skills" className="flex flex-col items-center text-[10px] font-mono text-[#bcc9cd] hover:text-[#4cd7f6] py-1">
          <Cpu className="w-4 h-4 mb-0.5" />
          <span>Skills</span>
        </a>
        <a href="#career-education" className="flex flex-col items-center text-[10px] font-mono text-[#bcc9cd] hover:text-[#4cd7f6] py-1">
          <GraduationCap className="w-4 h-4 mb-0.5" />
          <span>Career</span>
        </a>
        <button
          onClick={() => setIsContactOpen(true)}
          className="flex flex-col items-center text-[10px] font-mono text-[#4cd7f6] hover:text-[#4edea3] py-1"
        >
          <Send className="w-4 h-4 mb-0.5" />
          <span>Contact</span>
        </button>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="pt-24 pb-20 cyber-grid relative">
        {/* ==================== HERO SECTION ==================== */}
        <section id="hero" className="relative max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 min-h-[720px] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Copy & Command Center */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Indicator Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#262a33] border border-[#3d494c] neo-shadow-dark">
                <span className="w-2 h-2 bg-[#4cd7f6] animate-ping" />
                <span className="font-mono text-[10px] uppercase text-[#4cd7f6] tracking-widest">
                  PORTFOLIO PROTOCOL // 2025
                </span>
                <span className="text-[#869397]">|</span>
                <span className="font-mono text-[10px] text-[#4edea3]">ACTIVE INFERENCE ENGINE</span>
              </div>

              {/* Main Headlines */}
              <div className="space-y-3">
                <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl lg:text-6xl text-[#dfe2ee] font-extrabold tracking-tight leading-tight">
                  PRUTHVI ANIL MAMANIA
                </h1>
                <div className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#4cd7f6] font-bold">
                  Bridging raw data and actionable intelligence.
                </div>

                {/* Typewriter Terminal Line */}
                <div className="flex items-center gap-2 font-mono text-sm text-[#bcc9cd] bg-[#0a0e16] border border-[#3d494c] p-3">
                  <span className="text-[#4cd7f6] font-bold">λ focus:</span>
                  <span className="text-[#4edea3] font-semibold">{typewriterText}</span>
                  <span className="inline-block w-2.5 h-4 bg-[#4cd7f6] animate-pulse" />
                </div>
              </div>

              {/* Mission Statement */}
              <p className="text-[#bcc9cd] text-base md:text-lg max-w-2xl leading-relaxed">
                Data Science undergraduate specializing in applied machine learning, computer vision, and IoT ecosystems. Focused on securing a Data Analyst / Data Science Job.
              </p>

              {/* Action Matrix CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="bg-[#06b6d4] text-[#00424f] font-mono text-sm font-bold px-6 py-3.5 border-2 border-[#06b6d4] neo-shadow-cyan neo-shadow-cyan-hover active:translate-x-[3px] active:translate-y-[3px] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Terminal className="w-4 h-4" />
                  Initialize Contact
                </button>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="bg-[#181c24] text-[#dfe2ee] font-mono text-sm font-bold px-6 py-3.5 border-2 border-[#3d494c] hover:border-[#4cd7f6] hover:text-[#4cd7f6] neo-shadow-cyan-hover transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  Interactive Resume Preview
                </button>
              </div>

              {/* Metrics Ribbon */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#3d494c]">
                <div className="bg-[#181c24] p-3 border border-[#3d494c]">
                  <div className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#4cd7f6] font-bold">3+</div>
                  <div className="font-mono text-[10px] text-[#bcc9cd]">Core Projects</div>
                </div>
                <div className="bg-[#181c24] p-3 border border-[#3d494c] border-l-2 border-l-[#4edea3]">
                  <div className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#4edea3] font-bold">1 Global</div>
                  <div className="font-mono text-[10px] text-[#bcc9cd]">Award (IIT Madras)</div>
                </div>
                <div className="bg-[#181c24] p-3 border border-[#3d494c]">
                  <div className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#4cd7f6] font-bold">4+</div>
                  <div className="font-mono text-[10px] text-[#bcc9cd]">Certifications</div>
                </div>
              </div>
            </div>

            {/* Right Column: Avatar 3D Cyber Box */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group perspective-1000">
                {/* Neon Ambient Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#4cd7f6] to-[#4edea3] opacity-30 blur-xl group-hover:opacity-60 transition duration-500" />
                {/* Orbital Tech Ring Lines */}
                <div className="absolute -inset-4 border border-dashed border-[#3d494c] rounded-full animate-spin [animation-duration:24s] pointer-events-none" />
                <div className="absolute -inset-8 border border-[#3d494c]/30 rounded-full pointer-events-none" />

                {/* Interactive 3D Card Shell */}
                <div
                  ref={avatarCardRef}
                  onMouseMove={handleAvatarMouseMove}
                  onMouseLeave={handleAvatarMouseLeave}
                  className="relative w-full h-full bg-[#0a0e16] border-2 border-[#4cd7f6] p-3 neo-shadow-cyan transition-transform duration-200 ease-out flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    transform: `perspective(800px) rotateX(${avatarTilt.x}deg) rotateY(${avatarTilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                  }}
                >
                  {/* Corner Badges */}
                  <div className="absolute top-2 left-2 z-20 bg-[#262a33] px-2 py-0.5 border border-[#3d494c] font-mono text-[10px] text-[#4cd7f6]">
                    PRUTHVI.IMG_01
                  </div>
                  <div className="absolute bottom-2 right-2 z-20 bg-[#262a33] px-2 py-0.5 border border-[#3d494c] font-mono text-[10px] text-[#4edea3]">
                    MODEL: DS-DEV
                  </div>

                  {/* Avatar Container */}
                  <div className="relative w-full h-full overflow-hidden border border-[#3d494c] bg-[#1c2028]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMOxvJnsSAvABcgynR7cIfhKCbtUQI62RjMm8bPDsrqYkU5MegOdBfxu4y2C8mHIvk94Fx3G5c9eOn7-f-sEmyhQkKkNATgJ7seO8fpcCUsuihlk3_s2TicHcXYu68ilv14Ivqro4VdW5KgFKVbUVprlI1zPNqp1ov3QFM1VztOlV0g9sC2hLbJh0E_GACwiF2QfpjKCkTBLJDh8nnlznGqipOkQP8cMBnKCJSkiX7sNZhbc4_u3cIKejzY0tRB9M91hA"
                      alt="Pruthvi Anil Mamania - Data Science Specialist"
                      className="w-full h-full object-cover object-center filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        // Fallback avatar container if external image fails
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    {/* Cyber Scanline Overlay */}
                    <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0a0e16] via-[#0a0e16]/70 to-transparent p-3 pt-8">
                      <div className="font-['Space_Grotesk'] text-lg text-[#dfe2ee] font-bold">Pruthvi Anil Mamania</div>
                      <div className="font-mono text-xs text-[#4cd7f6]">Data Science | AI Engineer</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== HONORS & IIT MADRAS HYPERLOOP TROPHY ==================== */}
        <section id="honors" className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          {/* Section Header */}
          <div className="flex items-center justify-between border-b-2 border-[#4edea3] pb-4 mb-8">
            <div>
              <span className="font-mono text-xs text-[#4edea3] uppercase tracking-widest">
                // GLOBAL RECOGNITION ACCOMPLISHMENT
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl text-[#dfe2ee] font-extrabold flex items-center gap-3">
                <Award className="w-8 h-8 text-[#4edea3]" />
                Global Hyperloop Competition — IIT Madras
              </h2>
            </div>
            <div className="hidden sm:block text-right">
              <span className="font-mono text-xs text-[#4cd7f6] bg-[#262a33] px-3 py-1 border border-[#3d494c]">
                RANK: CHAMPION POD DESIGN
              </span>
            </div>
          </div>

          {/* Hero Trophy Feature Card */}
          <div className="bg-[#181c24] border-2 border-[#4edea3] neo-shadow-emerald p-6 md:p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#4edea3]/10 border border-[#4edea3] text-[#4edea3] font-mono text-xs font-bold">
                    ★ Innovation Champion — Global Hyperloop Competition, IIT Madras
                  </span>
                  <span className="px-3 py-1 bg-[#4cd7f6]/10 border border-[#4cd7f6] text-[#4cd7f6] font-mono text-xs font-bold">
                    ★ Best Thermal System Design — Global Hyperloop Competition, IIT Madras
                  </span>
                </div>
                <p className="text-base md:text-lg text-[#dfe2ee] leading-relaxed">
                  Spearheaded critical mathematical modeling and thermal engineering algorithms for an ultra-high-speed Hyperloop capsule. Designed structural thermal dissipation matrices under extreme near-vacuum operational conditions (sub-ambient pressure envelopes) to safeguard battery banks and onboard avionics compute clusters.
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                  <div className="bg-[#0a0e16] p-3 border border-[#3d494c]">
                    <div className="font-mono text-[10px] text-[#bcc9cd]">HEAT FLUX REDUCTION</div>
                    <div className="font-['Space_Grotesk'] text-xl text-[#4edea3] font-bold">-34.2%</div>
                  </div>
                  <div className="bg-[#0a0e16] p-3 border border-[#3d494c]">
                    <div className="font-mono text-[10px] text-[#bcc9cd]">PCM LATENCY</div>
                    <div className="font-['Space_Grotesk'] text-xl text-[#4cd7f6] font-bold">1200 kJ/kg</div>
                  </div>
                  <div className="bg-[#0a0e16] p-3 border border-[#3d494c]">
                    <div className="font-mono text-[10px] text-[#bcc9cd]">PRESSURE RANGE</div>
                    <div className="font-['Space_Grotesk'] text-xl text-[#dfe2ee] font-bold">0.001 atm</div>
                  </div>
                  <div className="bg-[#0a0e16] p-3 border border-[#3d494c]">
                    <div className="font-mono text-[10px] text-[#bcc9cd]">SAFETY FACTOR</div>
                    <div className="font-['Space_Grotesk'] text-xl text-[#4edea3] font-bold">2.4x NOM</div>
                  </div>
                </div>
              </div>

              {/* Thermal Telemetry Simulation HUD */}
              <div className="lg:col-span-4 bg-[#0a0e16] border border-[#3d494c] p-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-[#3d494c] pb-2 mb-3 text-[#4edea3]">
                  <span className="font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse" />
                    THERMAL HUD // LIVE TELEMETRY
                  </span>
                  <span className="text-[#bcc9cd]">POD-07</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#bcc9cd]">Battery Core T_max:</span>
                      <span className="text-[#4cd7f6] font-bold">{thermalJitter.batteryTemp} °C [STABLE]</span>
                    </div>
                    <div className="w-full bg-[#1c2028] h-1.5 border border-[#3d494c]">
                      <div className="bg-[#4cd7f6] h-full w-[65%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#bcc9cd]">Inverter Heat Sink:</span>
                      <span className="text-[#4edea3] font-bold">{thermalJitter.inverterTemp} °C [OPTIMAL]</span>
                    </div>
                    <div className="w-full bg-[#1c2028] h-1.5 border border-[#3d494c]">
                      <div className="bg-[#4edea3] h-full w-[48%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-[#bcc9cd]">Aero Shell Heat Flux:</span>
                      <span className="text-[#4cd7f6] font-bold">{thermalJitter.aeroFlux} W/m²</span>
                    </div>
                    <div className="w-full bg-[#1c2028] h-1.5 border border-[#3d494c]">
                      <div className="bg-[#4cd7f6] h-full w-[35%]" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-2 bg-[#181c24] border border-[#3d494c] text-[10px] text-[#bcc9cd]">
                  ✓ Phase Change Material (PCM) modeling verified via transient finite elements.
                </div>
              </div>
            </div>
          </div>

          {/* 4 Technical Breakdown Deep-Dive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#1c2028] p-4 border border-[#3d494c] neo-shadow-dark hover:border-[#4edea3] transition-colors">
              <div className="flex items-center gap-2 text-[#4edea3] mb-2">
                <Thermometer className="w-5 h-5" />
                <span className="font-mono text-sm font-bold">Thermal Dissipation</span>
              </div>
              <p className="text-xs text-[#bcc9cd] leading-relaxed">
                Engineered conduction pathways coupled with cold-plate micro-channels delivering uniform isothermal gradients across all 18650 cell clusters.
              </p>
            </div>
            <div className="bg-[#1c2028] p-4 border border-[#3d494c] neo-shadow-dark hover:border-[#4cd7f6] transition-colors">
              <div className="flex items-center gap-2 text-[#4cd7f6] mb-2">
                <Layers className="w-5 h-5" />
                <span className="font-mono text-sm font-bold">Phase Change Material</span>
              </div>
              <p className="text-xs text-[#bcc9cd] leading-relaxed">
                Embedded paraffin/expanded graphite matrices absorbing peak inductive heating spikes during rapid acceleration sprints inside the tube.
              </p>
            </div>
            <div className="bg-[#1c2028] p-4 border border-[#3d494c] neo-shadow-dark hover:border-[#4edea3] transition-colors">
              <div className="flex items-center gap-2 text-[#4edea3] mb-2">
                <Wind className="w-5 h-5" />
                <span className="font-mono text-sm font-bold">Aero Heat Flux</span>
              </div>
              <p className="text-xs text-[#bcc9cd] leading-relaxed">
                Calculated aerodynamic compression boundary layer friction at transonic speeds to prevent localized stagnation hot spots.
              </p>
            </div>
            <div className="bg-[#1c2028] p-4 border border-[#3d494c] neo-shadow-dark hover:border-[#4cd7f6] transition-colors">
              <div className="flex items-center gap-2 text-[#4cd7f6] mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-mono text-sm font-bold">Vacuum Envelopes</span>
              </div>
              <p className="text-xs text-[#bcc9cd] leading-relaxed">
                Overcame the complete absence of convective ambient cooling through high-emissivity radiation coatings and isolated thermal sinks.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== PROJECTS SECTION ==================== */}
        <section id="projects" className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#06b6d4] pb-4 mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-[#4cd7f6] uppercase tracking-widest">
                // DECK OF ARTIFACTS &amp; EXPERIMENTS
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl text-[#dfe2ee] font-extrabold flex items-center gap-3">
                <Terminal className="w-8 h-8 text-[#4cd7f6]" />
                Engineered Projects &amp; Applied ML
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#bcc9cd] max-w-md">
              Explore production models, quantitative pipelines, and end-to-end architectures. Click any card to inspect the interactive technical breakdown.
            </p>
          </div>

          {/* Bento Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.values(PROJECTS_DATA).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setActiveProjectModal(proj)}
                className="bg-[#181c24] border-2 border-[#3d494c] hover:border-[#4cd7f6] neo-shadow-dark neo-shadow-cyan-hover p-6 flex flex-col justify-between cursor-pointer transition-all group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-[#4cd7f6]/10 border border-[#4cd7f6] text-[#4cd7f6] font-mono text-[10px] font-bold">
                      {proj.id === 'yolo' ? 'RESEARCH SPOTLIGHT' : proj.id === 'aqi' ? 'DATA ENGINEERING' : 'UI & ANALYTICS'}
                    </span>
                    <span className="font-mono text-[10px] text-[#bcc9cd]">[{proj.metric}]</span>
                  </div>

                  <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#dfe2ee] group-hover:text-[#4cd7f6] transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#bcc9cd] leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Specs Matrix */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 p-2 bg-[#0a0e16] border border-[#3d494c] font-mono text-center text-xs">
                    {proj.specs.map((spec, idx) => (
                      <div key={idx} className={proj.specs.length === 3 && idx === 2 ? 'col-span-1' : ''}>
                        <span className="text-[#bcc9cd] text-[9px] block truncate">{spec.label}</span>
                        <span className={`font-bold text-[11px] ${spec.colorClass || 'text-[#4cd7f6]'}`}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[10px]">
                    {proj.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#1c2028] border border-[#3d494c] text-[#dfe2ee]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#3d494c] flex items-center justify-between mt-6">
                  <span className="text-[#4cd7f6] font-mono text-xs flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                    Inspect Deep Architecture
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Sliders className="w-4 h-4 text-[#bcc9cd] group-hover:text-[#4cd7f6] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== SKILLS & IOT TELEMETRY MATRIX ==================== */}
        <section id="skills" className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="border-b-2 border-[#3d494c] pb-4 mb-8">
            <span className="font-mono text-xs text-[#4cd7f6] uppercase tracking-widest">
              // TECHNICAL CAPABILITIES MATRIX
            </span>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl text-[#dfe2ee] font-extrabold flex items-center gap-3">
              <Cpu className="w-8 h-8 text-[#4cd7f6]" />
              Interactive Competencies &amp; Live IoT Telemetry
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Skills Wheel Hub + Category Tabs */}
            <div className="lg:col-span-7 bg-[#181c24] border-2 border-[#3d494c] p-6 neo-shadow-dark">
              {/* Category Filter Bar */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-[#3d494c] pb-4">
                <button
                  onClick={() => setSkillCategory('all')}
                  className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer ${
                    skillCategory === 'all'
                      ? 'bg-[#4cd7f6] text-[#003640] border-[#4cd7f6]'
                      : 'bg-[#1c2028] text-[#bcc9cd] border-[#3d494c] hover:text-[#4cd7f6]'
                  }`}
                >
                  ALL NODES
                </button>
                <button
                  onClick={() => setSkillCategory('ml')}
                  className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer ${
                    skillCategory === 'ml'
                      ? 'bg-[#4cd7f6] text-[#003640] border-[#4cd7f6]'
                      : 'bg-[#1c2028] text-[#bcc9cd] border-[#3d494c] hover:text-[#4cd7f6]'
                  }`}
                >
                  Data Science &amp; ML
                </button>
                <button
                  onClick={() => setSkillCategory('lang')}
                  className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer ${
                    skillCategory === 'lang'
                      ? 'bg-[#4cd7f6] text-[#003640] border-[#4cd7f6]'
                      : 'bg-[#1c2028] text-[#bcc9cd] border-[#3d494c] hover:text-[#4cd7f6]'
                  }`}
                >
                  Languages &amp; DB
                </button>
                <button
                  onClick={() => setSkillCategory('tools')}
                  className={`px-3 py-1.5 font-mono text-xs font-bold border transition-colors cursor-pointer ${
                    skillCategory === 'tools'
                      ? 'bg-[#4cd7f6] text-[#003640] border-[#4cd7f6]'
                      : 'bg-[#1c2028] text-[#bcc9cd] border-[#3d494c] hover:text-[#4cd7f6]'
                  }`}
                >
                  DevOps &amp; Tools
                </button>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setSelectedSkillDetails(skill.details)}
                    onClick={() => setSelectedSkillDetails(skill.details)}
                    className="p-3 bg-[#0a0e16] border border-[#3d494c] hover:border-[#4cd7f6] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-[#dfe2ee] font-bold group-hover:text-[#4cd7f6]">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#4cd7f6]">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-[#1c2028] h-1.5">
                      <div className={`${skill.colorClass} h-full`} style={{ width: `${skill.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Dynamic Skill Node Inspection Drawer */}
              <div className="mt-6 p-4 bg-[#0a0e16] border border-[#4cd7f6] text-xs font-mono">
                <span className="text-[#4cd7f6] font-bold">λ HOVER OR TAP A NODE ABOVE:</span>
                <p className="text-[#dfe2ee] mt-1 leading-relaxed">{selectedSkillDetails}</p>
              </div>

              {/* Modern Workflow Toolbox */}
              <div className="mt-6 pt-4 border-t border-[#3d494c]">
                <span className="font-mono text-[10px] text-[#bcc9cd] block mb-3 uppercase tracking-wider">
                  // Modern Workflow Toolbox
                </span>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2.5 bg-[#0a0e16] border border-[#3d494c] text-center">
                    <span className="font-mono text-xs text-[#4cd7f6] font-bold block">Prompt Eng.</span>
                    <span className="text-[10px] text-[#bcc9cd] font-mono">Zero/Few-Shot &amp; CoT</span>
                  </div>
                  <div className="p-2.5 bg-[#0a0e16] border border-[#3d494c] text-center">
                    <span className="font-mono text-xs text-[#4edea3] font-bold block">ChatGPT</span>
                    <span className="text-[10px] text-[#bcc9cd] font-mono">Synthetic Datasets</span>
                  </div>
                  <div className="p-2.5 bg-[#0a0e16] border border-[#3d494c] text-center">
                    <span className="font-mono text-xs text-[#ddb7ff] font-bold block">GH Copilot</span>
                    <span className="text-[10px] text-[#bcc9cd] font-mono">Pair Acceleration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Mock Real-time IoT Sensor Terminal */}
            <div className="lg:col-span-5 bg-[#0a0e16] border-2 border-[#4cd7f6] neo-shadow-cyan p-5 font-mono">
              <div className="flex items-center justify-between border-b border-[#3d494c] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${iotActive ? 'bg-[#4edea3] animate-ping' : 'bg-[#869397]'}`} />
                  <span className="text-[#dfe2ee] font-bold text-sm tracking-wide">IoT TELEMETRY ENGINE</span>
                </div>
                <button
                  onClick={() => setIotActive(!iotActive)}
                  className="px-2.5 py-1 bg-[#1c2028] text-[#4cd7f6] hover:bg-[#4cd7f6] hover:text-[#003640] border border-[#4cd7f6] text-[10px] transition-colors cursor-pointer"
                >
                  {iotActive ? 'PAUSE STREAM' : 'RESUME STREAM'}
                </button>
              </div>

              <div className="space-y-3 text-xs mb-4">
                <div className="flex justify-between items-center bg-[#181c24] p-2 border border-[#3d494c]">
                  <span className="text-[#bcc9cd]">DEVICE:</span>
                  <span className="text-[#4cd7f6] font-bold">NodeMCU ESP8266</span>
                </div>
                <div className="flex justify-between items-center bg-[#181c24] p-2 border border-[#3d494c]">
                  <span className="text-[#bcc9cd]">GATEWAY LINK:</span>
                  <span className="text-[#4edea3] font-bold">Blynk IoT Cloud [{iotActive ? 'ONLINE' : 'PAUSED'}]</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#181c24] p-2 border border-[#3d494c]">
                    <span className="text-[#bcc9cd] text-[10px] block">TEMPERATURE</span>
                    <span className="text-base font-bold text-[#4cd7f6]">{iotMetrics.temp} °C</span>
                  </div>
                  <div className="bg-[#181c24] p-2 border border-[#3d494c]">
                    <span className="text-[#bcc9cd] text-[10px] block">ATM PRESSURE</span>
                    <span className="text-base font-bold text-[#4edea3]">{iotMetrics.press} hPa</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#181c24] p-2 border border-[#3d494c]">
                    <span className="text-[#bcc9cd] text-[10px] block">SIGNAL RSSI</span>
                    <span className="text-base font-bold text-[#dfe2ee]">{iotMetrics.rssi} dBm</span>
                  </div>
                  <div className="bg-[#181c24] p-2 border border-[#3d494c]">
                    <span className="text-[#bcc9cd] text-[10px] block">PACKETS TRANSMITTED</span>
                    <span className="text-base font-bold text-[#4cd7f6]">{iotMetrics.packets.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Live Scrolling Packet Log */}
              <div
                ref={logContainerRef}
                className="border border-[#3d494c] bg-[#262a33]/40 p-2.5 text-[10px] text-[#bcc9cd] h-36 overflow-y-auto space-y-1 font-mono"
              >
                {iotLogs.map((log, idx) => (
                  <div key={idx} className="text-[#4cd7f6]">
                    {log}
                  </div>
                ))}
              </div>

              <div className="mt-3 text-[10px] text-[#869397] flex items-center justify-between">
                <span>BAUD: 115200 N-8-1</span>
                <span>STATUS: {iotActive ? 'ACTIVE RUNTIME' : 'STREAM STANDBY'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== CAREER & SQL ENGINEERING IDE ==================== */}
        <section id="career-education" className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#4cd7f6] pb-4 mb-8 gap-4">
            <div>
              <span className="font-mono text-xs text-[#4cd7f6] uppercase tracking-widest">
                // PROFESSIONAL EXPERIENCE RECORD
              </span>
              <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl text-[#dfe2ee] font-extrabold flex items-center gap-3">
                <Database className="w-8 h-8 text-[#4cd7f6]" />
                Interactive SQL Engineering IDE
              </h2>
            </div>
            <div className="font-mono text-xs text-[#4edea3] bg-[#262a33] px-3 py-1 border border-[#3d494c]">
              CodeTech IT Solutions (June 2025 – August 2025)
            </div>
          </div>

          {/* IDE Window Shell */}
          <div className="bg-[#0a0e16] border-2 border-[#3d494c] neo-shadow-cyan overflow-hidden font-mono">
            {/* Top Bar with Tabs */}
            <div className="bg-[#181c24] border-b border-[#3d494c] px-4 py-2 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIdeTab('sql')}
                  className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    ideTab === 'sql'
                      ? 'bg-[#0a0e16] border-t-2 border-[#4cd7f6] text-[#4cd7f6]'
                      : 'bg-[#262a33]/60 text-[#bcc9cd] hover:text-[#dfe2ee]'
                  }`}
                >
                  <Database className="w-3.5 h-3.5" />
                  queries_optimization.sql
                </button>
                <button
                  onClick={() => setIdeTab('py')}
                  className={`px-3 py-1.5 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                    ideTab === 'py'
                      ? 'bg-[#0a0e16] border-t-2 border-[#4cd7f6] text-[#4cd7f6]'
                      : 'bg-[#262a33]/60 text-[#bcc9cd] hover:text-[#dfe2ee]'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  schema_validation.py
                </button>
              </div>
              <div className="text-[11px] text-[#bcc9cd] flex items-center gap-3">
                <span>ROLE: SQL Engineering Intern</span>
                <span className="text-[#4edea3] font-bold">● EXECUTED</span>
              </div>
            </div>

            {/* IDE Main Code Pane */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
              {/* Code Editor Body */}
              <div className="lg:col-span-8 p-4 text-xs md:text-sm text-[#dfe2ee] leading-relaxed border-b lg:border-b-0 lg:border-r border-[#3d494c] overflow-x-auto">
                {ideTab === 'sql' ? (
                  <div className="space-y-1">
                    <div className="text-[#869397] select-none">-- SQL Optimization Suite: High-Throughput Relational Pipeline</div>
                    <div className="text-[#869397] select-none">-- Click highlighted comments below to trigger live architectural insights:</div>
                    <div className="h-2" />

                    {/* Step 1 */}
                    <div
                      onClick={() => setActiveSqlInsightKey('step1')}
                      className={`p-1.5 cursor-pointer transition-colors border-l-2 ${
                        activeSqlInsightKey === 'step1'
                          ? 'border-[#4cd7f6] bg-[#262a33]'
                          : 'border-transparent hover:border-[#4cd7f6] hover:bg-[#262a33]/40'
                      }`}
                    >
                      <span className="text-[#4cd7f6] font-bold hover:underline">
                        -- STEP 1: Query Indexing &amp; EXPLAIN ANALYZE Optimization
                      </span>
                      <span className="text-[10px] text-[#4edea3] ml-2">[Click to Inspect]</span>
                    </div>
                    <div className="text-[#bcc9cd] pl-4 font-mono text-xs">
                      CREATE INDEX idx_user_events_ts ON telemetry_events (user_id, recorded_at DESC);
                      <br />
                      EXPLAIN ANALYZE SELECT * FROM telemetry_events WHERE user_id = 9028;
                    </div>

                    <div className="h-2" />

                    {/* Step 2 */}
                    <div
                      onClick={() => setActiveSqlInsightKey('step2')}
                      className={`p-1.5 cursor-pointer transition-colors border-l-2 ${
                        activeSqlInsightKey === 'step2'
                          ? 'border-[#4edea3] bg-[#262a33]'
                          : 'border-transparent hover:border-[#4edea3] hover:bg-[#262a33]/40'
                      }`}
                    >
                      <span className="text-[#4edea3] font-bold hover:underline">
                        -- STEP 2: Complex Relational Joins &amp; Subqueries Execution
                      </span>
                      <span className="text-[10px] text-[#4edea3] ml-2">[Click to Inspect]</span>
                    </div>
                    <div className="text-[#bcc9cd] pl-4 font-mono text-xs">
                      WITH aggregated_metrics AS (
                      <br />
                      &nbsp;&nbsp;SELECT account_id, COUNT(*) as txn_count, AVG(latency_ms) as avg_lat
                      <br />
                      &nbsp;&nbsp;FROM transaction_logs WHERE status = &apos;200&apos; GROUP BY account_id
                      <br />
                      )
                      <br />
                      SELECT a.name, m.txn_count FROM accounts a JOIN aggregated_metrics m ON a.id = m.account_id;
                    </div>

                    <div className="h-2" />

                    {/* Step 3 */}
                    <div
                      onClick={() => setActiveSqlInsightKey('step3')}
                      className={`p-1.5 cursor-pointer transition-colors border-l-2 ${
                        activeSqlInsightKey === 'step3'
                          ? 'border-[#4cd7f6] bg-[#262a33]'
                          : 'border-transparent hover:border-[#4cd7f6] hover:bg-[#262a33]/40'
                      }`}
                    >
                      <span className="text-[#4cd7f6] font-bold hover:underline">
                        -- STEP 3: Structural Validation &amp; Integrity Guardrails
                      </span>
                      <span className="text-[10px] text-[#4edea3] ml-2">[Click to Inspect]</span>
                    </div>
                    <div className="text-[#bcc9cd] pl-4 font-mono text-xs">
                      ALTER TABLE enterprise_records ADD CONSTRAINT chk_data_non_null
                      <br />
                      CHECK (record_hash IS NOT NULL AND array_length(vector_dim, 1) = 512);
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-[#869397]"># schema_validation.py - CodeTech Automated Test Suites</div>
                    <div className="text-[#bcc9cd] text-xs">
                      import psycopg2
                      <br />
                      from typing import List, Dict
                      <br />
                      <br />
                      def execute_schema_integrity_audit(db_cursor) -&gt; Dict[str, bool]:
                      <br />
                      &nbsp;&nbsp;db_cursor.execute(&quot;SELECT table_name FROM information_schema.tables WHERE table_schema=&apos;public&apos;;&quot;)
                      <br />
                      &nbsp;&nbsp;tables = db_cursor.fetchall()
                      <br />
                      &nbsp;&nbsp;print(f&quot;[OK] Validated &#123;len(tables)&#125; tables with 100% relational integrity.&quot;)
                      <br />
                      &nbsp;&nbsp;return &#123;&quot;status&quot;: &quot;STABLE&quot;, &quot;foreign_keys_intact&quot;: True&#125;
                    </div>
                  </div>
                )}
              </div>

              {/* Active Insight Drawer on the Right */}
              <div className="lg:col-span-4 p-5 bg-[#181c24] flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#4cd7f6] font-bold border-b border-[#3d494c] pb-2 mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    ENGINEERING IMPACT DRAWER
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="text-[#4edea3] font-bold text-sm">{activeInsight.title}</div>
                    <p className="text-[#bcc9cd] leading-relaxed">{activeInsight.desc}</p>
                    <div className="p-2.5 bg-[#0a0e16] border border-[#3d494c] text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[#869397]">Pre-Opt Benchmark:</span>
                        <span className="text-[#ffb4ab] font-bold">{activeInsight.pre}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#869397]">Post-Opt Benchmark:</span>
                        <span className="text-[#4edea3] font-bold">{activeInsight.post}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#3d494c] text-[11px] text-[#bcc9cd] flex items-center justify-between">
                  <span>INTERNSHIP VERIFIED</span>
                  <span className="text-[#4cd7f6] font-bold">CODETECH IT</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== ACADEMICS & CREDENTIALS MATRIX ==================== */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Academic Foundation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="border-b-2 border-[#3d494c] pb-3">
                <span className="font-mono text-xs text-[#4cd7f6] uppercase tracking-widest">
                  // FORMAL ACADEMIC MILESTONES
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#dfe2ee] font-extrabold flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-[#4cd7f6]" />
                  Academic Foundation
                </h3>
              </div>

              <div className="space-y-4 font-mono">
                {/* Degree */}
                <div className="bg-[#181c24] border-l-4 border-l-[#4cd7f6] border-t border-r border-b border-[#3d494c] p-4">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <span className="text-[#4cd7f6] font-bold text-sm">B.Tech IT &amp; Data Science</span>
                    <span className="text-[#4edea3] font-bold text-xs">CGPA: 7.21</span>
                  </div>
                  <div className="text-[#dfe2ee] text-xs font-semibold mt-1">
                    Ajeenkya D.Y. Patil University (Seamedu), Pune
                  </div>
                  <div className="text-[#bcc9cd] text-[11px] mt-1">
                    Duration: 2023 – 2027 | Undergraduate Scholar
                  </div>
                </div>

                {/* 12th Grade */}
                <div className="bg-[#181c24] border-l-4 border-l-[#4edea3] border-t border-r border-b border-[#3d494c] p-4">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <span className="text-[#4edea3] font-bold text-sm">12th Grade (Science Stream)</span>
                    <span className="text-[#dfe2ee] font-bold text-xs">Score: 62.5%</span>
                  </div>
                  <div className="text-[#dfe2ee] text-xs font-semibold mt-1">
                    St. John International School, Palghar
                  </div>
                  <div className="text-[#bcc9cd] text-[11px] mt-1">Completed: 2022 – 2023</div>
                </div>

                {/* 10th Grade */}
                <div className="bg-[#181c24] border-l-4 border-l-[#869397] border-t border-r border-b border-[#3d494c] p-4">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <span className="text-[#dfe2ee] font-bold text-sm">10th Grade (ICSE Board)</span>
                    <span className="text-[#dfe2ee] font-bold text-xs">Score: 72.5%</span>
                  </div>
                  <div className="text-[#dfe2ee] text-xs font-semibold mt-1">
                    Sir J. P. International School, Palghar
                  </div>
                  <div className="text-[#bcc9cd] text-[11px] mt-1">Completed: 2020 – 2021</div>
                </div>
              </div>
            </div>

            {/* Professional Certifications */}
            <div className="lg:col-span-6 space-y-6">
              <div className="border-b-2 border-[#3d494c] pb-3">
                <span className="font-mono text-xs text-[#4edea3] uppercase tracking-widest">
                  // INDUSTRY-VALIDATED CREDENTIALS
                </span>
                <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl text-[#dfe2ee] font-extrabold flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-[#4edea3]" />
                  Professional Certifications
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 font-mono">
                {/* Cert 1 */}
                <div className="bg-[#181c24] border border-[#3d494c] p-3.5 flex items-center justify-between hover:border-[#4cd7f6] transition-colors">
                  <div>
                    <div className="text-[#dfe2ee] font-bold text-xs">IBM Data Science Professional Certificate</div>
                    <div className="text-[#bcc9cd] text-[11px]">Issuer: IBM | Completion Year: 2025</div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#4cd7f6]/10 text-[#4cd7f6] border border-[#4cd7f6] text-[10px] font-bold">
                    VERIFIED
                  </span>
                </div>

                {/* Cert 2 */}
                <div className="bg-[#181c24] border border-[#3d494c] p-3.5 flex items-center justify-between hover:border-[#4edea3] transition-colors">
                  <div>
                    <div className="text-[#dfe2ee] font-bold text-xs">SQL Certification Course</div>
                    <div className="text-[#bcc9cd] text-[11px]">Issuer: Simplilearn | Year: 2025</div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3] text-[10px] font-bold">
                    VERIFIED
                  </span>
                </div>

                {/* Cert 3 */}
                <div className="bg-[#181c24] border border-[#3d494c] p-3.5 flex items-center justify-between hover:border-[#4cd7f6] transition-colors">
                  <div>
                    <div className="text-[#dfe2ee] font-bold text-xs">Develop Clustering Models with Azure ML Designer</div>
                    <div className="text-[#bcc9cd] text-[11px]">Issuer: Microsoft | Date: March 2026</div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#4cd7f6]/10 text-[#4cd7f6] border border-[#4cd7f6] text-[10px] font-bold">
                    CLOUD ML
                  </span>
                </div>

                {/* Cert 4 */}
                <div className="bg-[#181c24] border border-[#3d494c] p-3.5 flex items-center justify-between hover:border-[#4edea3] transition-colors">
                  <div>
                    <div className="text-[#dfe2ee] font-bold text-xs">Build Reliable Agentic AI Applications</div>
                    <div className="text-[#bcc9cd] text-[11px]">Issuer: Simplilearn | SkillUp | Date: June 2026</div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#4edea3]/10 text-[#4edea3] border border-[#4edea3] text-[10px] font-bold">
                    AGENTIC AI
                  </span>
                </div>
              </div>

              {/* Document Evidence Strip */}
              <div className="p-3 bg-[#0a0e16] border border-[#3d494c] flex items-center justify-between text-xs font-mono">
                <span className="text-[#bcc9cd] flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#4edea3]" />
                  Verbatim credential records verified against registry
                </span>
                <button
                  onClick={() => setIsResumeOpen(true)}
                  className="text-[#4cd7f6] hover:underline font-bold cursor-pointer"
                >
                  View Evidence Sheet
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="w-full bg-[#0a0e16] border-t border-[#3d494c]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 md:px-12 py-8 max-w-7xl mx-auto gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-[#4cd7f6]">pruthvi.ds()</span>
            <span className="text-[#869397]">|</span>
            <span className="font-mono text-xs text-[#bcc9cd]">
              © 2025 PRUTHVI.DS // NEURAL ARCHITECTURE ONLINE
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#bcc9cd] font-mono text-xs hover:text-[#4edea3] transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#bcc9cd] font-mono text-xs hover:text-[#4edea3] transition-colors flex items-center gap-1"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="text-[#bcc9cd] font-mono text-xs hover:text-[#4edea3] transition-colors cursor-pointer flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              Terminal
            </button>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="text-[#bcc9cd] font-mono text-xs hover:text-[#4edea3] transition-colors cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              Documentation
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Action Button */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={() => setIsResumeOpen(true)}
          className="bg-[#06b6d4] text-[#00424f] font-mono text-xs font-bold px-4 py-3 border-2 border-[#4cd7f6] neo-shadow-cyan neo-shadow-cyan-hover flex items-center gap-2 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>RESUME.PDF</span>
        </button>
      </div>

      {/* ==================== MODALS ==================== */}

      {/* 1. CONTACT MODAL */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0e16]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#181c24] border-2 border-[#4cd7f6] neo-shadow-cyan p-6 relative font-sans">
            <div className="flex items-center justify-between border-b border-[#3d494c] pb-3 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#4cd7f6]" />
                <h3 className="font-['Space_Grotesk'] text-lg text-[#dfe2ee] font-bold">
                  Initialize Contact Stream
                </h3>
              </div>
              <button
                onClick={() => setIsContactOpen(false)}
                className="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-[#bcc9cd] mb-1">
                  CANDIDATE / RECRUITER NAME
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-[#0a0e16] border border-[#3d494c] focus:border-[#4cd7f6] text-[#dfe2ee] font-mono text-xs p-3 outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#bcc9cd] mb-1">
                  TRANSMISSION EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full bg-[#0a0e16] border border-[#3d494c] focus:border-[#4cd7f6] text-[#dfe2ee] font-mono text-xs p-3 outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#bcc9cd] mb-1">
                  REASON FOR CONTACT
                </label>
                <select
                  value={contactForm.reason}
                  onChange={(e) => setContactForm({ ...contactForm, reason: e.target.value })}
                  className="w-full bg-[#0a0e16] border border-[#3d494c] focus:border-[#4cd7f6] text-[#dfe2ee] font-mono text-xs p-3 outline-none"
                >
                  <option>Data Analyst / Data Scientist Role</option>
                  <option>Applied ML / Computer Vision Project</option>
                  <option>Contract Engineering / Consultation</option>
                  <option>Academic or Research Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#bcc9cd] mb-1">
                  PAYLOAD MESSAGE
                </label>
                <textarea
                  required
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Detail the role, technical scope, or opportunity..."
                  className="w-full bg-[#0a0e16] border border-[#3d494c] focus:border-[#4cd7f6] text-[#dfe2ee] font-mono text-xs p-3 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#06b6d4] text-[#00424f] font-mono text-sm font-bold py-3.5 border-2 border-[#4cd7f6] neo-shadow-cyan flex items-center justify-center gap-2 hover:bg-[#4cd7f6] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#00424f] border-t-transparent rounded-full animate-spin" />
                    <span>Streaming Bytes...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Data Packet</span>
                  </>
                )}
              </button>
            </form>

            {submitSuccess && (
              <div className="mt-4 p-3 bg-[#4edea3]/15 border border-[#4edea3] text-[#4edea3] font-mono text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Data stream received successfully! Pruthvi will respond shortly.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. RESUME & CREDENTIALS VIEWER MODAL */}
      {isResumeOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0e16]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-[#181c24] border-2 border-[#4cd7f6] neo-shadow-cyan max-h-[85vh] flex flex-col font-sans">
            <div className="flex items-center justify-between border-b border-[#3d494c] p-4 bg-[#0a0e16]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4cd7f6]" />
                <span className="font-['Space_Grotesk'] text-lg text-[#dfe2ee] font-bold">
                  Curriculum Vitae // Pruthvi Anil Mamania
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-[#1c2028] border border-[#3d494c] text-[#bcc9cd] hover:text-[#4cd7f6] text-xs font-mono flex items-center gap-1 cursor-pointer"
                  title="Print Resume"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print
                </button>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="text-[#bcc9cd] hover:text-[#4cd7f6] p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Canvas */}
            <div className="p-6 overflow-y-auto space-y-6 text-[#dfe2ee] text-xs sm:text-sm">
              {/* Header Strip */}
              <div className="border-b border-[#3d494c] pb-4">
                <h2 className="font-['Space_Grotesk'] text-2xl text-[#4cd7f6] font-bold">
                  PRUTHVI ANIL MAMANIA
                </h2>
                <div className="font-mono text-xs text-[#bcc9cd] mt-1 flex flex-wrap gap-4">
                  <span>Location: Pune / Palghar, India</span>
                  <span>Target: Data Analyst / Data Scientist</span>
                  <span>GitHub: github.com</span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <div className="font-mono text-xs text-[#4edea3] font-bold uppercase tracking-wider mb-1">
                  // Professional Profile
                </div>
                <p className="text-[#bcc9cd] leading-relaxed">
                  Data Science undergraduate with specialized focus in machine learning, computer vision (YOLO architectures), and high-throughput SQL database optimization. Proven track record including award-winning Hyperloop thermal engineering design recognized at IIT Madras.
                </p>
              </div>

              {/* Verified Documents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#3d494c] p-4 bg-[#0a0e16]">
                <div>
                  <div className="font-mono text-[10px] text-[#4cd7f6] mb-2">
                    // Verified Document Artifact (Data Sheet)
                  </div>
                  <div className="relative w-full h-48 bg-[#1c2028] border border-[#3d494c] overflow-hidden flex items-center justify-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8hfl2Rl-aL0VnwUurkVF0aROdsX0ci8U1H1YBwcBAmtyBMdeHPT-pa4vgOPSPRQs88UiQm0a77NZmwioscVfzI2fMeevdMk-T_tV9yxtN8S-4I7UqJKpCZwAixH1dUS9yK0T3a_N8SVOr78P5GwpJ6wKytWwYo6EiajvQh8GUu-QQ897UYgyzBzAOCevTiNuJjGvfNCbHQr-wc7SnkFd8XBjnvPG6z1qkB9zLjlsoE5QVcOrl8EDaQgop_RVK0tKCvY0"
                      alt="Official Academic and Career Record Evidence"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="p-3 text-center text-[#bcc9cd] font-mono text-[11px]">
                      <FileText className="w-6 h-6 mx-auto mb-1 text-[#4cd7f6]" />
                      Official Academic Record Verified
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] text-[#4edea3] mb-2">
                    // Verified Award &amp; Scorecard Telemetry
                  </div>
                  <div className="relative w-full h-48 bg-[#1c2028] border border-[#3d494c] overflow-hidden flex items-center justify-center">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXSxZ3_j2KSivjMqEgoyaDteTEZfG5All9xCStGdcoNztAPaFLlZEMVfS3bMZ9dLfOksFouAfd_jcoOa0rbaQCZE0df_CJu5_ptj9vEEUfo_hvJBKk6oOtmxpsdcSNwLpDsQllTf_WI5sQrSjgbYGuL5GS5s000PA2ccBzB8jh9ecynqzr4vLODnJLhBDRa3J9iBeXRLuURS2dP3cMhSF5AS0iYnAxRC4WDp0JuoEPOu0s5PxhKT43jICNc9dw7gShEdM"
                      alt="IIT Madras Hyperloop Competition Performance Record"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="p-3 text-center text-[#bcc9cd] font-mono text-[11px]">
                      <Award className="w-6 h-6 mx-auto mb-1 text-[#4edea3]" />
                      IIT Madras Hyperloop Competition Award Record
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Categorization */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 bg-[#1c2028] border border-[#3d494c]">
                  <span className="text-[#4cd7f6] font-bold block mb-1">Programming &amp; ML</span>
                  <span className="text-[#bcc9cd]">Python, YOLOv11, Scikit-learn, OpenCV, PyTorch, Pandas, NumPy</span>
                </div>
                <div className="p-3 bg-[#1c2028] border border-[#3d494c]">
                  <span className="text-[#4edea3] font-bold block mb-1">Data &amp; Analytics</span>
                  <span className="text-[#bcc9cd]">SQL (PostgreSQL), Power BI, Tableau, Excel, DAX modeling</span>
                </div>
                <div className="p-3 bg-[#1c2028] border border-[#3d494c]">
                  <span className="text-[#4cd7f6] font-bold block mb-1">Systems &amp; Hardware</span>
                  <span className="text-[#bcc9cd]">ESP8266 IoT, Blynk, Git, Linux, Docker, Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PROJECT DETAIL MODAL */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-[#0a0e16]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-[#181c24] border-2 border-[#4cd7f6] neo-shadow-cyan p-6 relative font-sans max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#3d494c] pb-3 mb-4">
              <div>
                <span className="font-mono text-xs text-[#4cd7f6] uppercase">{activeProjectModal.tag}</span>
                <h3 className="font-['Space_Grotesk'] text-xl text-[#dfe2ee] font-bold mt-1">
                  {activeProjectModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="text-[#bcc9cd] hover:text-[#4cd7f6] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#bcc9cd]">
              <p>
                <strong className="text-[#dfe2ee]">Problem Statement:</strong> {activeProjectModal.problem}
              </p>

              <div className="p-3 bg-[#0a0e16] border border-[#3d494c] font-mono text-xs">
                <span className="text-[#4cd7f6] font-bold">PIPELINE FLOW:</span> {activeProjectModal.pipeline}
              </div>

              <p>
                <strong className="text-[#dfe2ee]">Quantitative Validation:</strong> {activeProjectModal.validation}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {activeProjectModal.specs.map((spec, i) => (
                  <div key={i} className="p-2 bg-[#0a0e16] border border-[#3d494c] font-mono text-center">
                    <span className="text-[10px] text-[#869397] block">{spec.label}</span>
                    <span className={`font-bold ${spec.colorClass || 'text-[#4cd7f6]'}`}>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#3d494c] flex items-center justify-between font-mono text-xs">
              <a
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#4cd7f6] text-[#003640] font-bold border border-[#4cd7f6] flex items-center gap-1.5 hover:bg-[#06b6d4] transition-colors"
              >
                <span>Open Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[#869397]">PRUTHVI.DS ARCHIVE</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. INTERACTIVE CYBER TERMINAL MODAL */}
      {isTerminalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0e16]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#0a0e16] border-2 border-[#4cd7f6] neo-shadow-cyan font-mono text-xs overflow-hidden flex flex-col h-[480px]">
            <div className="bg-[#181c24] border-b border-[#3d494c] px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#4cd7f6]" />
                <span className="font-bold text-[#dfe2ee]">pruthvi.ds() Neural Terminal v2.4</span>
              </div>
              <button
                onClick={() => setIsTerminalOpen(false)}
                className="text-[#bcc9cd] hover:text-[#4cd7f6] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Output Screen */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-[#0a0e16]">
              {termHistory.map((line, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed whitespace-pre-wrap ${
                    line.type === 'input' ? 'text-[#4edea3] font-bold' : 'text-[#bcc9cd]'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              <div ref={termEndRef} />
            </div>

            {/* Terminal Input Bar */}
            <form onSubmit={handleTerminalCommand} className="border-t border-[#3d494c] bg-[#181c24] p-3 flex items-center gap-2">
              <span className="text-[#4cd7f6] font-bold">λ pruthvi@portfolio:~$</span>
              <input
                type="text"
                autoFocus
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="type 'help', 'skills', 'projects', 'resume'..."
                className="flex-1 bg-transparent border-none outline-none text-[#dfe2ee] font-mono text-xs"
              />
              <button type="submit" className="text-[#4cd7f6] hover:text-[#4edea3]">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
