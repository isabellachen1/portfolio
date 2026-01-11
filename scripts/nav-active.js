document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Get current page path
  const fullPath = window.location.pathname;
  const fileName = fullPath.split('/').pop() || 'index.html';

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    // Check if we're on about page
    if (fullPath.includes('about') || fileName === 'about.html' || fileName === 'about') {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if href contains 'about' OR equals 'about.html'
        if (href.includes('about')) {
          link.classList.add('active');
        }
      });
      return;
    }

    // Check if we're on camera page
    if (fullPath.includes('camera') || fileName === 'camera.html' || fileName === 'camera') {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Check if href contains 'camera' OR equals 'camera.html'
        if (href.includes('camera')) {
          link.classList.add('active');
        }
      });
      return;
    }

    // Index page - scroll-based highlighting
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });

    if (!currentSection || window.scrollY < 200) {
      currentSection = 'home';
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
      else if ((currentSection === 'projects' || currentSection === 'experience') && href === '#projects') {
        link.classList.add('active');
      }
    });
  }

  // Add scroll listener only on index page
  if (!fullPath.includes('about') && !fullPath.includes('camera')) {
    window.addEventListener('scroll', setActiveLink);
  }

  setActiveLink();
});
