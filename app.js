// MOCHI Premium Website - JavaScript
// Fresh, independent codebase - completely separate from the MOCHI game project

/**
 * Website interactivity for the new MOCHI website
 * Handles: nav animations, scroll reveals, smooth interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initScrollReveal();
  initSmoothScroll();
  initMobileMenu();
  initCounterAnimations();
});

/**
 * Navigation interactions
 */
function initNavigation() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Header background change on scroll
    if (currentScroll > 100) {
      header.style.background = 'rgba(11, 14, 19, 0.95)';
    } else {
      header.style.background = 'rgba(11, 14, 19, 0.8)';
    }
    
    lastScroll = currentScroll;
  });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.section');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('.header');
  
  // Mobile menu button creation
  const menuBtn = document.createElement('button');
  menuBtn.className = 'mobile-menu-btn';
  menuBtn.innerHTML = '<span></span><span></span><span></span>';
  menuBtn.setAttribute('aria-label', 'Toggle navigation');
  menuBtn.style.display = 'none';
  menuBtn.style.position = 'absolute';
  menuBtn.style.right = '2rem';
  menuBtn.style.top = '50%';
  menuBtn.style.transform = 'translateY(-50%)';
  menuBtn.style.background = 'transparent';
  menuBtn.style.border = 'none';
  menuBtn.style.cursor = 'pointer';
  menuBtn.style.zIndex = '101';
  
  // Hamburger lines
  const spanStyle = {
    display: 'block',
    width: '25px',
    height: '3px',
    background: var(--fg-primary),
    margin: '5px 0',
    transition: 0.3s
  };
  
  menuBtn.querySelectorAll('span').forEach(span => {
    Object.assign(span.style, spanStyle);
  });
  
  header.insertBefore(menuBtn, navLinks);
  
  // Toggle menu visibility
  menuBtn.addEventListener('click', function() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle spans
    const spans = menuBtn.querySelectorAll('span');
    if (!isExpanded) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      navLinks.style.display = 'flex';
    } else {
      spans[0].style.transform = 'rotate(0) translate(0, 0)';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'rotate(0) translate(0, 0)';
      navLinks.style.display = 'none';
    }
  });
  
  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.click();
      navLinks.style.display = 'none';
    });
  });
}

/**
 * Counter animations for stats
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseFloat(target.getAttribute('data-final'));
        const duration = 1500;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = finalValue * easeOut;
          
          if (target.tagName === 'LI') {
            target.innerHTML = Math.floor(currentValue) + (finalValue % 1 !== 0 ? `.${Math.floor(Math.abs(finalValue) * 1000).toString().padStart(3, '0')}` : '');
          } else {
            target.textContent = Math.floor(currentValue);
          }
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }
        
        requestAnimationFrame(updateCounter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}