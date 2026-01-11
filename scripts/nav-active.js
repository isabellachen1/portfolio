document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Detect current page robustly
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') currentPage = 'index.html';

  // Highlight Home by default on page load for index.html
  if (currentPage === 'index.html') {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === '#home') {
        link.classList.add('active');
      }
    });
  }

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    // Highlight pages (About, Camera, etc.) - only non-hash links
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#') && href === currentPage) {
        link.classList.add('active');
      }
    });

    // Scroll-based highlighting only on home page
    if (currentPage === 'index.html') {
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');

        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }

        // Highlight "Work" for both projects and experience
        else if ((currentSection === 'projects' || currentSection === 'experience') && href === '#projects') {
          link.classList.add('active');
        }
      });

      // Explicitly highlight Home if at top
      if (window.scrollY < 200) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#home') {
            link.classList.add('active');
          }
        });
      }
    }
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});
