/* ============================================================
   StakeArena - Main JavaScript
   Interactive behaviors, animations, and utilities
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. Navbar: Scroll + Mobile Toggle
     ============================================================ */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  navToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    navLinks?.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translate(5px,5px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)')
      : (spans[0].style.transform = '',
         spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });

  // Close nav on link click (mobile)
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // Highlight active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks?.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  /* ============================================================
     2. Hero Particles
     ============================================================ */
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    const colors = ['#b14aff', '#00d4ff', '#ff2d78', '#00ffb3', '#ff6b2b'];
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 6 + 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 15;
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;
      particlesContainer.appendChild(particle);
    }
  }

  /* ============================================================
     3. Scroll Reveal
     ============================================================ */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ============================================================
     4. FAQ Accordion
     ============================================================ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(f => f.classList.remove('open'));
      // Open clicked if was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ============================================================
     5. Animated Counters
     ============================================================ */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = (Number.isInteger(target)
            ? Math.round(current)
            : current.toFixed(1)) + suffix;
        }, duration / steps);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ============================================================
     6. Explore Filter Buttons
     ============================================================ */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const arenaBlocks = document.querySelectorAll('.country-arena');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      arenaBlocks.forEach(block => {
        if (filter === 'all' || block.dataset.region === filter) {
          block.style.display = 'block';
          block.style.animation = 'fadeInUp 0.5s ease both';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });

  /* ============================================================
     7. Contact Form
     ============================================================ */
  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #00ffb3, #00d4ff)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });

  /* ============================================================
     8. Smooth hover tilt on arena cards
     ============================================================ */
  const tiltCards = document.querySelectorAll('.arena-card, .trending-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ============================================================
     9. Typewriter effect for hero title span
     ============================================================ */
  const typeTarget = document.querySelector('.typewriter');
  if (typeTarget) {
    const words = ['Entertainment', 'Discovery', 'Culture', 'Trends', 'Innovation'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];
      if (!deleting) {
        typeTarget.textContent = word.slice(0, ci + 1);
        ci++;
        if (ci === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typeTarget.textContent = word.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  }

  /* ============================================================
     10. Sticky Scroll Progress Bar
     ============================================================ */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / total) * 100;
      progressBar.style.width = progress + '%';
    });
  }

  /* ============================================================
     11. Image lazy loading fallback
     ============================================================ */
  document.querySelectorAll('img[data-src]').forEach(img => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  });

});
