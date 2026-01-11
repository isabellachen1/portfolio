document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Normalize current page
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') currentPage = 'index.html'; // root becomes index.html

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      // ----- Exact page match (Home, About, Camera) -----
      if (
        (href === currentPage) || // matches page filename
        (currentPage === 'index.html' && href === '#home') // root scroll to home
      ) {
        link.classList.add('active');
        return;
      }

      // ----- Scroll-based section highlighting (index.html only) -----
      if (currentPage === 'index.html' && href.startsWith('#')) {
        let currentSection = '';

        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
          }
        });

        // Default to home if top of page
        if (!currentSection || window.scrollY < 200) currentSection = 'home';

        if (href === `#${currentSection}`) link.classList.add('active');

        // Special: highlight Work for projects/experience
        if ((currentSection === 'projects' || currentSection === 'experience') && href === '#projects') {
          link.classList.add('active');
        }
      }
    });
  }

  // Scroll listener only on index.html
  if (currentPage === 'index.html') {
    window.addEventListener('scroll', setActiveLink);
  }

  // Run immediately on page load
  setActiveLink();
});
