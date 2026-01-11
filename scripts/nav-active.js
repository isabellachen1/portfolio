document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Get current page filename (without .html)
  let currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

  function setActiveLink() {
    // Remove active from all links first
    navLinks.forEach(link => link.classList.remove('active'));

    // For non-index pages (about, camera), just match the filename
    if (currentPage !== 'index') {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const linkPage = href.replace('.html', '');

        if (linkPage === currentPage + '.html' || linkPage === currentPage) {
          link.classList.add('active');
        }
      });
      return; // Exit for non-index pages
    }

    // For index.html - scroll-based highlighting
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });

    // Default to home if at top or no section detected
    if (!currentSection || window.scrollY < 200) {
      currentSection = 'home';
    }

    // Highlight the appropriate link
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
  }

  // Add scroll listener only on index page
  if (currentPage === 'index') {
    window.addEventListener('scroll', setActiveLink);
  }

  // Initial call
  setActiveLink();
});
