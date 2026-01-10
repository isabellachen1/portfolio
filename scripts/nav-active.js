// Highlight active navigation based on scroll position
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop();

  function setActiveLink() {
    // If we're on a separate page (about.html or camera.html), only highlight that page's link
    if (currentPage === 'about.html') {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'about.html') {
          link.classList.add('active');
        }
      });
      return;
    }

    if (currentPage === 'camera.html') {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === 'camera.html') {
          link.classList.add('active');
        }
      });
      return;
    }

    // For index.html, use scroll-based highlighting
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');

      // Check if link points to current section
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
      // Highlight "Work" for both projects and experience sections
      else if ((currentSection === 'projects' || currentSection === 'experience') && link.getAttribute('href') === '#projects') {
        link.classList.add('active');
      }
      // Check if we're at top of page and this is Home link
      else if (window.scrollY < 300 && (link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#home')) {
        link.classList.add('active');
      }
    });
  }

  // Set active on scroll
  window.addEventListener('scroll', setActiveLink);

  // Set active on load
  setActiveLink();
});
