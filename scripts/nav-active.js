document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function setActiveLink() {
    // Non-index pages: just highlight the current page link
    if (currentPage !== 'index.html') {
      navLinks.forEach(link => {
        link.classList.remove('active');
        const hrefPage = link.getAttribute('href').split('#')[0];
        if (hrefPage === currentPage) {
          link.classList.add('active');
        }
      });
      return;
    }

    // index.html: scroll-based sections
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const linkHash = link.getAttribute('href').split('#')[1];

      if (currentSection && linkHash === currentSection) {
        link.classList.add('active');
      }
      // Highlight "Work" for projects + experience sections
      else if ((currentSection === 'projects' || currentSection === 'experience') && linkHash === 'projects') {
        link.classList.add('active');
      }
      // Highlight Home if at the very top
      else if (window.scrollY < 200 && (linkHash === 'home' || link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});
