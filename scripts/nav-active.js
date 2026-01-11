document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');

  // Get current page (ignore .html and query params)
  let currentPage = window.location.pathname.split('/').pop().split('?')[0].replace('.html','');
  if (!currentPage) currentPage = 'index';

  navLinks.forEach(link => {
    link.classList.remove('active');

    // Get href (ignore hash and .html)
    const href = link.getAttribute('href').split('#')[0].replace('.html','');

    // If link matches current page
    if (href === currentPage) {
      link.classList.add('active');
    }

    // Special scroll-based highlight for index.html only
    if (currentPage === 'index') {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';

      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          currentSection = section.getAttribute('id');
        }
      });

      if (!currentSection || window.scrollY < 200) currentSection = 'home';

      navLinks.forEach(l => {
        l.classList.remove('active');
        const lHref = l.getAttribute('href').split('#')[0].replace('.html','');

        if (lHref === currentSection) {
          l.classList.add('active');
        }
        // Highlight "Work" for both projects and experience
        else if ((currentSection === 'projects' || currentSection === 'experience') && lHref === 'projects') {
          l.classList.add('active');
        }
      });
    }
  });

  // Add scroll listener only on index
  if (currentPage === 'index') {
    window.addEventListener('scroll', () => {
      navLinks.forEach(link => link.classList.remove('active'));

      const sections = document.querySelectorAll('section[id]');
      let currentSection = '';

      sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
          currentSection = section.getAttribute('id');
        }
      });

      if (!currentSection || window.scrollY < 200) currentSection = 'home';

      navLinks.forEach(link => {
        const href = link.getAttribute('href').split('#')[0].replace('.html','');
        if (href === currentSection) {
          link.classList.add('active');
        } else if ((currentSection === 'projects' || currentSection === 'experience') && href === 'projects') {
          link.classList.add('active');
        }
      });
    });
  }
});
