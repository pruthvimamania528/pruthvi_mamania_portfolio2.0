/**
 * PRUTHVI.DS - PURE CLIENT-SIDE INTERACTION & TELEMETRY ENGINE
 * Zero-backend standalone script for static hosting (Vercel / GitHub Pages)
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. SCROLL PROGRESS BAR
  // =========================================================================
  const scrollProgress = document.getElementById('scroll-progress');
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = `${progressPercent}%`;
    }
  };
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // =========================================================================
  // 2. MOUSE CURSOR GLOW FOLLOWER
  // =========================================================================
  const cursorGlow = document.getElementById('cursor-glow');
  window.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    }
  }, { passive: true });

  // =========================================================================
  // 3. HERO TYPEWRITER TERMINAL LINE
  // =========================================================================
  const typewriterEl = document.getElementById('typewriter-text');
  const phrases = [
    'Innovation Champion',
    'Computer Vision Builder',
    'SQL Engineer',
    'ML Developer',
    'Data Science Undergraduate'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!typewriterEl) return;
    const current = phrases[phraseIdx];
    if (isDeleting) {
      typewriterEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typewriterEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 35 : 75;
    if (!isDeleting && charIdx === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 350;
    }
    setTimeout(typeLoop, speed);
  }
  if (typewriterEl) typeLoop();

  // =========================================================================
  // 4. INTERACTIVE 3D AVATAR PERSPECTIVE TILT
  // =========================================================================
  const avatarCard = document.getElementById('avatar-card');
  if (avatarCard) {
    avatarCard.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -10;
      const tiltY = (x / (rect.width / 2)) * 10;
      avatarCard.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarCard.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // =========================================================================
  // 5. HERO CLICK RIPPLE EFFECT
  // =========================================================================
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
      const rect = heroSection.getBoundingClientRect();
      const ripple = document.createElement('div');
      ripple.className = 'ripple-ring';
      const size = 64;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      heroSection.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  }

  // =========================================================================
  // 6. REAL-TIME IOT SENSOR SIMULATION (ESP8266 + BLYNK CLOUD)
  // =========================================================================
  const iotTemp = document.getElementById('iot-temp');
  const iotPress = document.getElementById('iot-press');
  const iotRssi = document.getElementById('iot-rssi');
  const iotPackets = document.getElementById('iot-packets');
  const iotLogStream = document.getElementById('iot-log-stream');
  const toggleIotBtn = document.getElementById('toggle-iot-btn');

  let iotActive = true;
  let packetCounter = 14930;

  const iotSimulationInterval = setInterval(() => {
    if (!iotActive) return;
    packetCounter += 1;

    if (iotPackets) iotPackets.textContent = packetCounter.toLocaleString();

    const currentTemp = (28.0 + Math.random() * 0.8).toFixed(1);
    const currentPress = (1012.8 + Math.random() * 0.5).toFixed(1);
    const currentRssi = -62 - Math.floor(Math.random() * 6);

    if (iotTemp) iotTemp.textContent = `${currentTemp} °C`;
    if (iotPress) iotPress.textContent = `${currentPress} hPa`;
    if (iotRssi) iotRssi.textContent = `${currentRssi} dBm`;

    if (iotLogStream && Math.random() > 0.25) {
      const now = new Date().toTimeString().split(' ')[0];
      const logLine = document.createElement('div');
      logLine.className = 'text-primary';
      logLine.textContent = `[${now}] ESP8266 packet #${packetCounter} transmitted to Blynk Cloud -> 200 OK`;
      iotLogStream.appendChild(logLine);
      iotLogStream.scrollTop = iotLogStream.scrollHeight;

      // Keep stream buffer bounded to prevent DOM memory leaks
      if (iotLogStream.children.length > 25) {
        iotLogStream.removeChild(iotLogStream.children[0]);
      }
    }
  }, 1400);

  if (toggleIotBtn) {
    toggleIotBtn.addEventListener('click', () => {
      iotActive = !iotActive;
      toggleIotBtn.textContent = iotActive ? 'PAUSE STREAM' : 'RESUME STREAM';
    });
  }

  // =========================================================================
  // 7. HYPERLOOP THERMAL HUD TELEMETRY SIMULATION (POD-07)
  // =========================================================================
  const hudBattery = document.getElementById('hud-battery-temp');
  const hudInverter = document.getElementById('hud-inverter-temp');
  const hudAero = document.getElementById('hud-aero-flux');

  setInterval(() => {
    if (hudBattery) {
      const bTemp = (41.6 + Math.random() * 0.4).toFixed(1);
      hudBattery.textContent = `${bTemp} °C [STABLE]`;
    }
    if (hudInverter) {
      const iTemp = (38.0 + Math.random() * 0.4).toFixed(1);
      hudInverter.textContent = `${iTemp} °C [OPTIMAL]`;
    }
    if (hudAero) {
      const aFlux = Math.round(182 + Math.random() * 5);
      hudAero.textContent = `${aFlux} W/m²`;
    }
  }, 2200);

  // =========================================================================
  // 8. INTERACTIVE SQL IDE (CODETECH IT RECORD)
  // =========================================================================
  const ideTabSql = document.getElementById('ide-tab-sql');
  const ideTabPy = document.getElementById('ide-tab-py');
  const tabContentSql = document.getElementById('tab-content-sql');
  const tabContentPy = document.getElementById('tab-content-py');
  const ideImpactContent = document.getElementById('ide-impact-content');
  const ideInsightTriggers = document.querySelectorAll('.ide-insight-trigger');

  const sqlInsights = {
    step1: {
      title: 'Query Indexing & EXPLAIN ANALYZE',
      desc: 'Refactored mission-critical legacy queries across multi-million record PostgreSQL databases. By deploying composite B-Tree indexes and optimizing execution plans, reduced database query latency by over 45% during peak traffic simulations.',
      pre: '184 ms',
      post: '14 ms (92% speedup)'
    },
    step2: {
      title: 'Complex Relational Joins & Subqueries',
      desc: 'Restructured nested queries into materialized Common Table Expressions (CTEs). Minimized disk spill on sort operations and enabled efficient parallel worker scans across distributed tenant tables.',
      pre: '340 ms',
      post: '28 ms (89% speedup)'
    },
    step3: {
      title: 'Structural Validation Pipeline',
      desc: 'Embedded automated sanity constraints, non-null assertions, and fixed dimensionality checks to sanitize incoming tabular ingest streams before running downstream machine learning inference.',
      pre: 'Manual QA',
      post: '100% Automated CI Assertions'
    }
  };

  if (ideTabSql && ideTabPy) {
    ideTabSql.addEventListener('click', () => {
      ideTabSql.classList.add('bg-surface-container-lowest', 'border-t-2', 'border-primary', 'text-primary');
      ideTabSql.classList.remove('bg-surface-container-high/60', 'text-on-surface-variant');
      ideTabPy.classList.remove('bg-surface-container-lowest', 'border-t-2', 'border-primary', 'text-primary');
      ideTabPy.classList.add('bg-surface-container-high/60', 'text-on-surface-variant');

      tabContentSql?.classList.remove('hidden');
      tabContentPy?.classList.add('hidden');
    });

    ideTabPy.addEventListener('click', () => {
      ideTabPy.classList.add('bg-surface-container-lowest', 'border-t-2', 'border-primary', 'text-primary');
      ideTabPy.classList.remove('bg-surface-container-high/60', 'text-on-surface-variant');
      ideTabSql.classList.remove('bg-surface-container-lowest', 'border-t-2', 'border-primary', 'text-primary');
      ideTabSql.classList.add('bg-surface-container-high/60', 'text-on-surface-variant');

      tabContentPy?.classList.remove('hidden');
      tabContentSql?.classList.add('hidden');
    });
  }

  ideInsightTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const key = trigger.getAttribute('data-insight');
      const data = sqlInsights[key];
      if (data && ideImpactContent) {
        ideInsightTriggers.forEach(t => t.classList.remove('bg-surface-container-high', 'border-l-primary'));
        trigger.classList.add('bg-surface-container-high', 'border-l-primary');

        ideImpactContent.innerHTML = `
          <div class="text-secondary font-bold text-sm">${data.title}</div>
          <p class="text-on-surface-variant leading-relaxed">${data.desc}</p>
          <div class="p-2.5 bg-surface-container-lowest border border-outline-variant text-[11px] space-y-1 font-mono">
            <div class="flex justify-between">
              <span class="text-outline">Pre-Opt Benchmark:</span>
              <span class="text-error font-bold">${data.pre}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-outline">Post-Opt Benchmark:</span>
              <span class="text-secondary font-bold">${data.post}</span>
            </div>
          </div>
        `;
      }
    });
  });

  // =========================================================================
  // 9. SKILLS MATRIX FILTERING & LIVE DRAWER
  // =========================================================================
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillNodes = document.querySelectorAll('.skill-node');
  const inspectorText = document.getElementById('skill-inspector-text');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary');
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');

      const cat = btn.getAttribute('data-category');
      skillNodes.forEach((node) => {
        if (cat === 'all' || node.getAttribute('data-category') === cat) {
          node.style.display = 'block';
        } else {
          node.style.display = 'none';
        }
      });
    });
  });

  skillNodes.forEach((node) => {
    const handleInspect = () => {
      const details = node.getAttribute('data-details');
      if (inspectorText && details) inspectorText.textContent = details;
    };
    node.addEventListener('mouseenter', handleInspect);
    node.addEventListener('click', handleInspect);
  });

  // =========================================================================
  // 10. MODAL DIALOGS CONTROLLER (CONTACT, RESUME, PROJECTS, TERMINAL)
  // =========================================================================
  const contactModal = document.getElementById('contact-modal');
  const resumeModal = document.getElementById('resume-modal');
  const projectModal = document.getElementById('project-detail-modal');
  const terminalModal = document.getElementById('terminal-modal');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  };

  // Contact Triggers
  document.getElementById('open-contact-modal-btn')?.addEventListener('click', () => openModal(contactModal));
  document.getElementById('mobile-contact-tab')?.addEventListener('click', () => openModal(contactModal));
  document.getElementById('close-contact-modal')?.addEventListener('click', () => closeModal(contactModal));

  // Resume Triggers
  document.getElementById('nav-resume-trigger')?.addEventListener('click', () => openModal(resumeModal));
  document.getElementById('hero-resume-modal-btn')?.addEventListener('click', () => openModal(resumeModal));
  document.getElementById('floating-resume-btn')?.addEventListener('click', () => openModal(resumeModal));
  document.getElementById('view-credentials-sheet-btn')?.addEventListener('click', () => openModal(resumeModal));
  document.getElementById('footer-doc-link')?.addEventListener('click', () => openModal(resumeModal));
  document.getElementById('close-resume-modal')?.addEventListener('click', () => closeModal(resumeModal));

  // Terminal Triggers
  document.getElementById('open-live-term-btn')?.addEventListener('click', () => openModal(terminalModal));
  document.getElementById('footer-terminal-link')?.addEventListener('click', () => openModal(terminalModal));
  document.getElementById('close-terminal-modal')?.addEventListener('click', () => closeModal(terminalModal));

  // Project Modal Triggers & Dynamic Data
  const projectsData = {
    yolo: {
      tag: 'RESEARCH SPOTLIGHT // COMPUTER VISION',
      title: 'Vehicle Detection in Foggy Weather Using YOLOv11',
      problem: 'Heavy optical scattering caused by dense fog particles severely deteriorates standard convolutional edge features, causing steep drops in recall for autonomous vehicular navigation.',
      pipeline: 'Raw Input -> Dark Channel Prior Guided Dehazing -> Contrast Limiting Adaptive Histograms (CLAHE) -> YOLOv11 SPPF Tensor Head -> Post-NMS Bounding Vector.',
      validation: 'Evaluated over 4,200 fog-compromised test frames. Attained an empirical mAP@50 of 0.83, Precision between 0.83–0.84, Recall of 0.78–0.79, and an overall F1 harmonic score of 0.81.',
      metrics: [
        { label: 'mAP@50', val: '0.83', col: 'text-primary' },
        { label: 'PRECISION', val: '0.84', col: 'text-secondary' },
        { label: 'RECALL', val: '0.79', col: 'text-primary' },
        { label: 'F1 SCORE', val: '0.81', col: 'text-secondary' }
      ]
    },
    aqi: {
      tag: 'DATA ENGINEERING // MULTI-CITY TELEMETRY',
      title: 'Air Quality Analytics Platform Across Indian Cities',
      problem: 'Multi-city sensor telemetry exhibits high missingness rates, sensor calibration drift, and transient particulate spikes that distort standard municipal air quality predictions.',
      pipeline: 'Multi-Source Ingestion -> Missing Value Spline Interpolation -> Isolation Forest Glitch Removal -> DBSCAN Spatiotemporal Clustering -> Automated PDF / Dashboard Insights.',
      validation: 'Processed over 1.2M historical records spanning 12 metropolitan centers with 0.42s latency per 50,000 rows. Accurately pinpointed industrial particulate episodes with 91.4% temporal correlation.',
      metrics: [
        { label: 'CITIES EVALUATED', val: '12 Hubs', col: 'text-primary' },
        { label: 'ANOMALY DETECTOR', val: 'Isolation Forest', col: 'text-secondary' },
        { label: 'CLUSTERING', val: 'DBSCAN', col: 'text-primary' },
        { label: 'SPEED', val: '0.42s / 50k', col: 'text-secondary' }
      ]
    },
    hr: {
      tag: 'UI & ANALYTICS // TALENT TELEMETRY',
      title: 'AI-Assisted HR Productivity Dashboard UI',
      problem: 'Recruitment funnels suffer from disjointed candidate evaluations and fragmented tracking across disparate interview stages, ballooning time-to-hire by 35%.',
      pipeline: 'Applicant Profile Parsing -> Semantic Skill Vector Scoring -> Real-Time Pipeline Aggregations -> Bento Grid Cockpit -> Automated Candidate Shortlisting Trigger.',
      validation: 'Engineered responsive neobrutalist dashboard validated across multi-resolution viewports. Accelerated candidate screening throughput by simulated 40% with zero UI latency bottlenecks.',
      metrics: [
        { label: 'DESIGN SYSTEM', val: 'Google Stitch', col: 'text-primary' },
        { label: 'GRID SYSTEM', val: 'Bento Matrix', col: 'text-secondary' },
        { label: 'KPI PIPELINE', val: 'Real-time', col: 'text-primary' },
        { label: 'FIDELITY', val: '100% Mobile Ready', col: 'text-secondary' }
      ]
    }
  };

  const projectCards = document.querySelectorAll('.project-card');
  const projTag = document.getElementById('proj-modal-tag');
  const projTitle = document.getElementById('proj-modal-title');
  const projProblem = document.getElementById('proj-modal-problem');
  const projPipeline = document.getElementById('proj-modal-pipeline');
  const projValidation = document.getElementById('proj-modal-validation');
  const projMetricsStrip = document.getElementById('proj-modal-metrics');

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      const data = projectsData[key];
      if (data && projectModal) {
        if (projTag) projTag.textContent = data.tag;
        if (projTitle) projTitle.textContent = data.title;
        if (projProblem) projProblem.textContent = data.problem;
        if (projPipeline) projPipeline.textContent = data.pipeline;
        if (projValidation) projValidation.textContent = data.validation;

        if (projMetricsStrip) {
          projMetricsStrip.innerHTML = data.metrics.map(m => `
            <div class="p-2 bg-surface-container-lowest border border-outline-variant font-mono text-center">
              <span class="text-[10px] text-outline block">${m.label}</span>
              <span class="font-bold text-xs ${m.col}">${m.val}</span>
            </div>
          `).join('');
        }

        openModal(projectModal);
      }
    });
  });

  document.getElementById('close-project-modal')?.addEventListener('click', () => closeModal(projectModal));

  // Dismiss on backdrop click
  [contactModal, resumeModal, projectModal, terminalModal].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // Global Escape Key to dismiss any active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [contactModal, resumeModal, projectModal, terminalModal].forEach(closeModal);
    }
  });

  // =========================================================================
  // 11. CONTACT FORM CLIENT-SIDE SUBMISSION SIMULATION
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const submitSpinner = document.getElementById('submit-spinner');
  const submitLabel = document.getElementById('submit-label');
  const contactSuccess = document.getElementById('contact-success-msg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitSpinner) submitSpinner.classList.remove('hidden');
      if (submitLabel) submitLabel.textContent = 'Streaming Bytes...';

      setTimeout(() => {
        if (submitSpinner) submitSpinner.classList.add('hidden');
        if (submitLabel) submitLabel.textContent = 'Transmit Data Packet';
        if (contactSuccess) contactSuccess.classList.remove('hidden');
        contactForm.reset();

        setTimeout(() => {
          if (contactSuccess) contactSuccess.classList.add('hidden');
          closeModal(contactModal);
        }, 2200);
      }, 950);
    });
  }

  // =========================================================================
  // 12. INTERACTIVE CYBER TERMINAL CLI LOGIC
  // =========================================================================
  const termForm = document.getElementById('terminal-form');
  const termInput = document.getElementById('terminal-input');
  const termOutput = document.getElementById('terminal-output');

  if (termForm && termInput && termOutput) {
    termForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cmd = termInput.value.trim().toLowerCase();
      if (!cmd) return;

      const userLine = document.createElement('div');
      userLine.className = 'text-secondary font-bold';
      userLine.textContent = `λ pruthvi@portfolio:~$ ${termInput.value}`;
      termOutput.appendChild(userLine);

      const responseLine = document.createElement('div');
      responseLine.className = 'text-on-surface-variant whitespace-pre-wrap';

      switch (cmd) {
        case 'help':
          responseLine.textContent = 'Available commands: about, skills, projects, awards, iot, contact, resume, clear, exit';
          break;
        case 'about':
          responseLine.textContent = 'Pruthvi Anil Mamania - B.Tech IT & Data Science at ADYPU Pune. Specialist in ML, Computer Vision (YOLOv11), Relational SQL Engineering, and IoT Systems.';
          break;
        case 'skills':
          responseLine.textContent = 'Python (90%), SQL (92%), YOLOv11 (85%), Scikit-Learn (88%), Power BI (82%), Git (85%), PyTorch, OpenCV.';
          break;
        case 'projects':
          responseLine.textContent = '1. YOLOv11 Foggy Weather Detection [mAP@50: 0.83]\n2. Indian Cities Air Quality Analytics [12 Cities]\n3. AI HR Productivity Dashboard UI [Google Stitch UI]';
          break;
        case 'awards':
          responseLine.textContent = '🏆 Global Hyperloop Competition IIT Madras: Innovation Champion & Best Thermal System Design.';
          break;
        case 'iot':
          responseLine.textContent = `NodeMCU ESP8266 Live Status: ONLINE\nTemp: ${iotTemp?.textContent || '28.3 °C'}\nPressure: ${iotPress?.textContent || '1013.0 hPa'}\nPackets: ${packetCounter.toLocaleString()}`;
          break;
        case 'contact':
          openModal(contactModal);
          responseLine.textContent = 'Opening Contact Stream Dialog...';
          break;
        case 'resume':
          openModal(resumeModal);
          responseLine.textContent = 'Opening Curriculum Vitae & Credentials Viewer...';
          break;
        case 'clear':
          termOutput.innerHTML = '';
          termInput.value = '';
          return;
        case 'exit':
          closeModal(terminalModal);
          termInput.value = '';
          return;
        default:
          responseLine.textContent = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
      }

      termOutput.appendChild(responseLine);
      termInput.value = '';
      termOutput.scrollTop = termOutput.scrollHeight;
    });
  }

  // =========================================================================
  // 13. VISUAL SIGNAL INVERT FLASH EFFECT
  // =========================================================================
  document.getElementById('theme-toggle-btn')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('invert');
    setTimeout(() => {
      document.documentElement.classList.toggle('invert');
    }, 180);
  });
});
