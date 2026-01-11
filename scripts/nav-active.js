document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    const scrollY = window.scrollY;
    let currentSection = '';

    // --- Scroll-based detection for index page ---
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });

    // Default to home if top of page or no section matched
    if (!currentSection || scrollY < 200) currentSection = 'home';

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // Scroll section match
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }

      // Special: highlight Work for both projects & experience
      if ((currentSection === 'projects' || currentSection === 'experience') && href === '#projects') {
        link.classList.add('active');
      }

      // About or Camera pages
      const pageName = window.location.pathname.split('/').pop();
      if ((href === 'about.html' && pageName === 'about.html') ||
          (href === 'camera.html' && pageName === 'camera.html')) {
        link.classList.add('active');
      }
    });
  }

  // Run immediately
  setActiveLink();

  // Listen for scroll only on index.html (Home page)
  const pageName = window.location.pathname.split('/').pop();
  if (!pageName || pageName === '' || pageName === 'index.html') {
    window.addEventListener('scroll', setActiveLink);
  }
});
