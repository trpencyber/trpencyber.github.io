// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a:not(.btn-resume)');

const highlightNav = () => {
  let scrollY = window.pageYOffset;
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        allNavLinks.forEach(l => l.style.color = '');
        navLink.style.color = '#2563eb';
      }
    }
  });
};
window.addEventListener('scroll', highlightNav);

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
  '.section-header, .about-avatar-wrap, .about-text, ' +
  '.skill-category, .project-card, .timeline-item, ' +
  '.edu-card, .cert-card, .contact-info, .contact-form'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== STAGGERED REVEAL FOR GRIDS =====
const staggerGroups = [
  '.skills-grid .skill-category',
  '.projects-grid .project-card',
  '.education-grid .edu-card',
  '.cert-grid .cert-card',
];

staggerGroups.forEach(selector => {
  const items = document.querySelectorAll(selector);
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentNode.children);
        const index = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  items.forEach(item => staggerObserver.observe(item));
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    formNote.textContent = '⚠️ Please fill in all fields.';
    formNote.style.color = '#f87171';
    return;
  }

  // Build mailto link
  const mailtoHref = `mailto:tejasrepale13@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoHref;

  formNote.textContent = '✅ Opening your email client...';
  formNote.style.color = '#4ade80';
  contactForm.reset();

  setTimeout(() => { formNote.textContent = ''; }, 5000);
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== TYPING ANIMATION FOR HERO TITLE =====
const titleLabel = document.querySelector('.hero-title-label');
if (titleLabel) {
  const titles = [
    'Java Backend Developer',
    'Spring Boot Specialist',
    'Microservices & Spring Cloud Engineer',
    'Security-First Developer'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 90;
  const deleteSpeed = 50;
  const pauseTime = 2000;

  function typeWriter() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      titleLabel.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(typeWriter, 400);
      } else {
        setTimeout(typeWriter, deleteSpeed);
      }
    } else {
      titleLabel.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(typeWriter, pauseTime);
      } else {
        setTimeout(typeWriter, typeSpeed);
      }
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 1000);
}

// ===== BACK TO TOP (optional smooth return) =====
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const scrollArrow = document.querySelector('.scroll-down');
  if (scrollArrow) {
    scrollArrow.style.opacity = scrollTop > 100 ? '0' : '1';
    scrollArrow.style.pointerEvents = scrollTop > 100 ? 'none' : 'auto';
  }
});
