/* ═══════════════════════════════════════════════════════════
   ALEX CHEN — PORTFOLIO SCRIPT
   Stack: GSAP 3 + ScrollTrigger, Lenis, Canvas API (vanilla)
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────
     FEATURE DETECTION
  ───────────────────────────────────────────── */
  const isMobile    = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile) document.body.classList.add('mobile');

  /* ─────────────────────────────────────────────
     1. PRELOADER
  ───────────────────────────────────────────── */
  const preloader    = document.getElementById('preloader');
  const countEl      = document.getElementById('preloader-count');
  const barFill      = document.getElementById('preloader-bar-fill');

  function runPreloader(onComplete) {
    if (prefersReducedMotion) {
      preloader.classList.add('exit');
      onComplete();
      return;
    }

    const duration = 1800; // ms
    const startTime = performance.now();

    function updateCounter(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased    = 1 - Math.pow(2, -10 * progress);
      const value    = Math.floor(eased * 100);

      countEl.textContent  = String(value).padStart(2, '0');
      barFill.style.width  = value + '%';

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        countEl.textContent = '100';
        barFill.style.width = '100%';
        // Small pause then exit
        setTimeout(() => {
          preloader.classList.add('exit');
          setTimeout(onComplete, 800);
        }, 300);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  /* ─────────────────────────────────────────────
     2. LENIS SMOOTH SCROLL
  ───────────────────────────────────────────── */
  let lenis;

  function initLenis() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') return;

    lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Tick via GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger in sync
    lenis.on('scroll', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.update();
      }
    });

    // Smooth anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const id = anchor.getAttribute('href');
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.4 });
      });
    });
  }

  /* ─────────────────────────────────────────────
     3. CUSTOM CURSOR
  ───────────────────────────────────────────── */
  function initCursor() {
    if (isMobile) return;

    const cursorOuter = document.getElementById('cursor-outer');
    const cursorInner = document.getElementById('cursor-inner');
    if (!cursorOuter || !cursorInner) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;

    // Inner follows instantly via GSAP quickTo
    const innerSetX = gsap.quickTo(cursorInner, 'x', { duration: 0.05, ease: 'none' });
    const innerSetY = gsap.quickTo(cursorInner, 'y', { duration: 0.05, ease: 'none' });

    // Outer follows with lag
    const outerSetX = gsap.quickTo(cursorOuter, 'x', { duration: 0.18, ease: 'power2.out' });
    const outerSetY = gsap.quickTo(cursorOuter, 'y', { duration: 0.18, ease: 'power2.out' });

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      innerSetX(mouseX);
      innerSetY(mouseY);
      outerSetX(mouseX);
      outerSetY(mouseY);
    });

    // Hover states
    const hoverTargets = 'a, button, .magnetic, .project-card, .skill-card, label, .nav-link';
    document.querySelectorAll(hoverTargets).forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Text cursor state
    document.querySelectorAll('.cursor-text-trigger').forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-text');
        document.body.classList.remove('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-text');
      });
    });

    // Hide when out of window
    document.addEventListener('mouseleave', () => {
      gsap.to([cursorOuter, cursorInner], { opacity: 0, duration: 0.3 });
    });
    document.addEventListener('mouseenter', () => {
      gsap.to([cursorOuter, cursorInner], { opacity: 1, duration: 0.3 });
    });
  }

  /* ─────────────────────────────────────────────
     4. MOUSE SPOTLIGHT
  ───────────────────────────────────────────── */
  function initSpotlight() {
    if (isMobile) return;

    const spotlight = document.getElementById('spotlight');
    if (!spotlight) return;

    const setX = gsap.quickTo(spotlight, 'x', { duration: 0.6, ease: 'power2.out' });
    const setY = gsap.quickTo(spotlight, 'y', { duration: 0.6, ease: 'power2.out' });

    document.addEventListener('mousemove', e => {
      setX(e.clientX);
      setY(e.clientY);
    });
  }

  /* ─────────────────────────────────────────────
     5. MAGNETIC BUTTONS
  ───────────────────────────────────────────── */
  function initMagnetic() {
    if (isMobile) return;

    document.querySelectorAll('.magnetic').forEach(el => {
      el.addEventListener('mousemove', e => {
        const rect     = el.getBoundingClientRect();
        const centerX  = rect.left + rect.width / 2;
        const centerY  = rect.top  + rect.height / 2;
        const dx       = (e.clientX - centerX) * 0.35;
        const dy       = (e.clientY - centerY) * 0.35;

        gsap.to(el, {
          x: dx,
          y: dy,
          duration: 0.5,
          ease: 'power2.out',
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    });
  }

  /* ─────────────────────────────────────────────
     6. PARTICLE CANVAS
  ───────────────────────────────────────────── */
  function initParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    let W, H, particles, animId;
    let mouse    = { x: -9999, y: -9999 };

    const COLORS = [
      'rgba(124, 58, 237, ',    // accent-1 purple
      'rgba(6, 182, 212, ',     // accent-2 cyan
      'rgba(244, 63, 94, ',     // accent-3 rose
    ];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildParticles();
    }

    function buildParticles() {
      const count = Math.floor(80 + Math.random() * 40); // 80-120
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x:       Math.random() * W,
          y:       Math.random() * H,
          vx:      (Math.random() - 0.5) * 0.5,
          vy:      (Math.random() - 0.5) * 0.5,
          radius:  1 + Math.random() * 2,
          opacity: 0.2 + Math.random() * 0.6,
          color:   COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);

      // Update + draw each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.8;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Dampen velocity
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Cap velocity
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5;
          p.vy = (p.vy / speed) * 1.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();

        // Draw lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q    = particles[j];
          const ldx  = p.x - q.x;
          const ldy  = p.y - q.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);

          if (ldist < 150) {
            const lineOpacity = ((150 - ldist) / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = p.color + lineOpacity + ')';
            ctx.lineWidth   = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(drawFrame);
    }

    // Track mouse over hero only
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      });
      heroSection.addEventListener('mouseleave', () => {
        mouse.x = -9999;
        mouse.y = -9999;
      });
    }

    window.addEventListener('resize', () => {
      cancelAnimationFrame(animId);
      resize();
      drawFrame();
    });

    resize();
    drawFrame();
  }

  /* ─────────────────────────────────────────────
     7. TYPEWRITER EFFECT
  ───────────────────────────────────────────── */
  function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    let texts;
    try {
      texts = JSON.parse(el.getAttribute('data-texts') || '[]');
    } catch {
      texts = ['Full-Stack Developer'];
    }

    if (!texts.length) return;

    let textIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;
    let isPaused   = false;

    const TYPING_SPEED  = 80;
    const DELETE_SPEED  = 40;
    const PAUSE_AFTER   = 2200;
    const PAUSE_BEFORE  = 400;

    function type() {
      if (isPaused) return;

      const current = texts[textIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting  = false;
          textIndex   = (textIndex + 1) % texts.length;
          isPaused    = true;
          setTimeout(() => { isPaused = false; tick(); }, PAUSE_BEFORE);
          return;
        }
      } else {
        charIndex++;
        el.textContent = current.slice(0, charIndex);

        if (charIndex === current.length) {
          isPaused = true;
          setTimeout(() => {
            isPaused   = false;
            isDeleting = true;
            tick();
          }, PAUSE_AFTER);
          return;
        }
      }

      tick();
    }

    function tick() {
      setTimeout(type, isDeleting ? DELETE_SPEED : TYPING_SPEED);
    }

    // Start after short delay
    setTimeout(tick, 800);
  }

  /* ─────────────────────────────────────────────
     TEXT SPLIT HELPER
  ───────────────────────────────────────────── */
  function splitTextToChars(el) {
    const text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);
    return text.split('').map(char => {
      const span = document.createElement('span');
      span.className  = 'split-char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
      return span;
    });
  }

  /* ─────────────────────────────────────────────
     8. GSAP + SCROLL TRIGGER ANIMATIONS
  ───────────────────────────────────────────── */
  function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Connect ScrollTrigger to Lenis if available
    if (lenis) {
      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll || 0;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.documentElement.style.transform ? 'transform' : 'fixed',
      });
    }

    /* ── Scroll Progress Bar ── */
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          progressBar.style.width = (self.progress * 100) + '%';
        },
      });
    }

    /* ── Nav scroll behavior ── */
    const nav = document.getElementById('main-nav');
    if (nav) {
      let lastScrollY = 0;
      let navHidden   = false;

      ScrollTrigger.create({
        trigger: '#hero',
        start: 'bottom 10%',
        onEnter:      () => nav.classList.add('scrolled'),
        onLeaveBack:  () => nav.classList.remove('scrolled'),
      });

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: self => {
          const scrollY    = self.scroll();
          const delta      = scrollY - lastScrollY;
          lastScrollY      = scrollY;

          if (scrollY < 100) {
            if (navHidden) {
              gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.out' });
              navHidden = false;
            }
            return;
          }

          if (delta > 3 && !navHidden) {
            gsap.to(nav, { y: '-100%', duration: 0.4, ease: 'power2.inOut' });
            navHidden = true;
          } else if (delta < -3 && navHidden) {
            gsap.to(nav, { y: 0, duration: 0.4, ease: 'power2.out' });
            navHidden = false;
          }
        },
      });
    }

    /* ── Split text headings ── */
    document.querySelectorAll('.split-heading').forEach(heading => {
      const chars = splitTextToChars(heading);

      gsap.from(chars, {
        scrollTrigger: {
          trigger: heading,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 80,
        opacity: 0,
        rotateX: 90,
        transformPerspective: 500,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.03,
      });
    });

    /* ── Section labels ── */
    document.querySelectorAll('.section-label').forEach(label => {
      gsap.from(label, {
        scrollTrigger: {
          trigger: label,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    });

    /* ── Generic reveal-up ── */
    document.querySelectorAll('.section-subtitle, .about-bio, .contact-form').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });
    });

    /* ── About image ── */
    const aboutImgWrap = document.querySelector('.about-image-wrap');
    if (aboutImgWrap) {
      gsap.from(aboutImgWrap, {
        scrollTrigger: {
          trigger: aboutImgWrap,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        x: -60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });
    }

    /* ── About text col ── */
    const aboutTextCol = document.querySelector('.about-text-col');
    if (aboutTextCol) {
      gsap.from(aboutTextCol, {
        scrollTrigger: {
          trigger: aboutTextCol,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        x: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
      });
    }

    /* ── Stat counters ── */
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const obj    = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.floor(obj.val);
            },
          });
        },
      });
    });

    /* ── Skill cards batch stagger ── */
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length) {
      ScrollTrigger.batch(skillCards, {
        start: 'top 88%',
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
          });
        },
      });
    }

    /* ── Project cards batch stagger ── */
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length) {
      ScrollTrigger.batch(projectCards, {
        start: 'top 88%',
        onEnter: batch => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
          });
        },
      });
    }

    /* ── Contact info cards ── */
    const contactCards = document.querySelectorAll('.contact-info-card');
    if (contactCards.length) {
      ScrollTrigger.batch(contactCards, {
        start: 'top 90%',
        onEnter: batch => {
          gsap.from(batch, {
            x: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
          });
        },
      });
    }

    /* ── Hero parallax ── */
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.to(heroContent, {
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: -80,
        ease: 'none',
      });
    }

    /* ── Hero floating shapes parallax ── */
    const shape1 = document.querySelector('.shape-1');
    const shape2 = document.querySelector('.shape-2');
    if (shape1) gsap.to(shape1, { scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 }, y: -120 });
    if (shape2) gsap.to(shape2, { scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 }, y: -60 });

    ScrollTrigger.refresh();
  }

  /* ─────────────────────────────────────────────
     9. PROJECT CARD TILT
  ───────────────────────────────────────────── */
  function initTilt() {
    if (isMobile) return;

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.parentElement.style.perspective = '1000px';

      card.addEventListener('mousemove', e => {
        const rect    = card.getBoundingClientRect();
        const x       = e.clientX - rect.left;
        const y       = e.clientY - rect.top;
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 12;
        const rotateX = -((y - centerY) / centerY) * 8;

        gsap.to(card, {
          rotateX,
          rotateY,
          scale: 1.015,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  /* ─────────────────────────────────────────────
     10. BUTTON RIPPLE
  ───────────────────────────────────────────── */
  function initRipple() {
    document.querySelectorAll('.ripple-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const rect   = btn.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top  = y + 'px';
        btn.appendChild(ripple);

        gsap.fromTo(ripple,
          { scale: 0, opacity: 0.5 },
          {
            scale: 8,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            onComplete: () => ripple.remove(),
          }
        );
      });
    });
  }

  /* ─────────────────────────────────────────────
     12. NAV MOBILE MENU
  ───────────────────────────────────────────── */
  function initMobileMenu() {
    const hamburger  = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    if (!hamburger || !mobileMenu) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('active');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Stagger links in
      gsap.fromTo(mobileLinks,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.15,
        }
      );
    }

    function closeMenu() {
      isOpen = false;
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
      if (isOpen) closeMenu(); else openMenu();
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ─────────────────────────────────────────────
     14. ENTRANCE ANIMATION (post-preloader)
  ───────────────────────────────────────────── */
  function runEntranceAnimation() {
    if (prefersReducedMotion) {
      // Just show everything
      document.querySelectorAll('.eyebrow, .hero-description, .hero-cta, .scroll-indicator')
        .forEach(el => { el.style.opacity = '1'; });
      return;
    }

    const nav         = document.getElementById('main-nav');
    const eyebrow     = document.querySelector('.eyebrow');
    const heroTitle   = document.querySelector('.hero-title');
    const heroDesc    = document.querySelector('.hero-description');
    const heroCta     = document.querySelector('.hero-cta');
    const scrollInd   = document.querySelector('.scroll-indicator');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (nav) {
      tl.from(nav, { y: -80, opacity: 0, duration: 0.7 }, 0);
    }

    if (eyebrow) {
      tl.to(eyebrow, { opacity: 1, duration: 0.5 }, 0.4);
    }

    if (heroTitle) {
      const chars = heroTitle.querySelectorAll('.split-char');
      if (chars.length) {
        tl.from(chars, {
          y: 80,
          opacity: 0,
          rotateX: 90,
          transformPerspective: 600,
          duration: 0.8,
          stagger: 0.035,
        }, 0.6);
      } else {
        tl.from(heroTitle, { y: 60, opacity: 0, duration: 0.8 }, 0.6);
      }
    }

    if (heroDesc) {
      tl.to(heroDesc, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3');
    }

    if (heroCta) {
      tl.to(heroCta, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
    }

    if (scrollInd) {
      tl.to(scrollInd, { opacity: 1, duration: 0.5 }, '-=0.2');
    }
  }

  /* ─────────────────────────────────────────────
     CONTACT FORM BASIC VALIDATION
  ───────────────────────────────────────────── */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      // Simple validation
      const name    = form.querySelector('#name');
      const email   = form.querySelector('#email');
      const message = form.querySelector('#message');

      const nameErr    = form.querySelector('#name + .form-error');
      const emailErr   = form.querySelector('#email + .form-error');
      const messageErr = form.querySelector('#message + .form-error');

      if (name && name.value.trim().length < 2) {
        if (nameErr) nameErr.textContent = 'Please enter your name.';
        valid = false;
        gsap.fromTo(name, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(3, 0.4)' });
      } else if (nameErr) {
        nameErr.textContent = '';
      }

      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRx.test(email.value.trim())) {
        if (emailErr) emailErr.textContent = 'Please enter a valid email address.';
        valid = false;
        gsap.fromTo(email, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(3, 0.4)' });
      } else if (emailErr) {
        emailErr.textContent = '';
      }

      if (message && message.value.trim().length < 10) {
        if (messageErr) messageErr.textContent = 'Message must be at least 10 characters.';
        valid = false;
        gsap.fromTo(message, { x: -6 }, { x: 0, duration: 0.4, ease: 'elastic.out(3, 0.4)' });
      } else if (messageErr) {
        messageErr.textContent = '';
      }

      if (!valid) return;

      // Simulate successful send
      const btn = form.querySelector('.contact-submit');
      if (btn) {
        btn.classList.add('sent');
        btn.disabled = true;
        setTimeout(() => {
          btn.classList.remove('sent');
          btn.disabled = false;
          form.reset();
        }, 3500);
      }
    });
  }

  /* ─────────────────────────────────────────────
     INIT: GSAP SPLIT ON HERO TITLE EARLY
  ───────────────────────────────────────────── */
  function prepareHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !prefersReducedMotion) {
      splitTextToChars(heroTitle);
    }
  }

  /* ─────────────────────────────────────────────
     SCROLL PROGRESS (fallback if no ST)
  ───────────────────────────────────────────── */
  function initScrollProgressFallback() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    // Only use fallback if GSAP ScrollTrigger not available
    if (typeof ScrollTrigger !== 'undefined') return;

    window.addEventListener('scroll', () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width  = progress + '%';
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     REDUCED MOTION SKIP
  ───────────────────────────────────────────── */
  if (prefersReducedMotion) {
    // Remove preloader immediately
    if (preloader) preloader.classList.add('exit');

    // Force reveal all animated elements
    document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-fade, .skill-card, .project-card, .eyebrow, .hero-description, .hero-cta, .scroll-indicator'
    ).forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    });

    // Still init functional pieces
    initTypewriter();
    initMobileMenu();
    initContactForm();
    initParticles();
    return;
  }

  /* ─────────────────────────────────────────────
     BOOT SEQUENCE
  ───────────────────────────────────────────── */
  // Prepare DOM before preloader finishes
  prepareHeroTitle();
  initParticles();
  initTypewriter();

  runPreloader(() => {
    // Everything after preloader exits
    initLenis();
    initScrollAnimations();
    initCursor();
    initSpotlight();
    initMagnetic();
    initTilt();
    initRipple();
    initMobileMenu();
    initContactForm();
    initScrollProgressFallback();
    runEntranceAnimation();
  });

});
