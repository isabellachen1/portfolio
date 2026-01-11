document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Detect current page more robustly
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') currentPage = 'index.html';

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    // Handle About and Camera pages (not index.html)
    if (currentPage !== 'index.html') {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match exact page name
        if (href === currentPage) {
          link.classList.add('active');
        }
      });
      return; // Exit - no scroll-based logic needed
    }

    // Scroll-based highlighting for index.html only
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });

    // If we're at the top or haven't scrolled into any section, default to home
    if (!currentSection || window.scrollY < 200) {
      currentSection = 'home';
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // Match section-based links
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
      // Special case: highlight "Work" for both projects and experience sections
      else if ((currentSection === 'projects' || currentSection === 'experience') && href === '#projects') {
        link.classList.add('active');
      }
    });
  }

  // Only add scroll listener on index.html
  if (currentPage === 'index.html') {
    window.addEventListener('scroll', setActiveLink);
  }

  // Run immediately
  setActiveLink();
});
