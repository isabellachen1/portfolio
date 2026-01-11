document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Detect current page robustly
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage) currentPage = 'index.html'; // published home page

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    // Highlight pages (About, Camera, etc.)
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('/', ''); // remove leading slash if present
      if (href === currentPage) {
        link.classList.add('active');
      }
    });

    // Only do scroll-based highlighting on Home page
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

        // Scroll-based match
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }

        // "Work" highlights for both projects and experience
        else if ((currentSection === 'projects' || currentSection === 'experience') && href === '#projects') {
          link.classList.add('active');
        }
      });

      // Explicitly highlight Home if at top of page
      if (window.scrollY < 200) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === 'index.html' || href === '#home') {
            link.classList.add('active');
          }
        });
      }
    }
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});
