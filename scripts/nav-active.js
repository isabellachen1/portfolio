document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    if (currentPage === 'about.html') {
      document.querySelector('.nav-links a[href="about.html"]')?.classList.add('active');
      return;
    }
    if (currentPage === 'camera.html') {
      document.querySelector('.nav-links a[href="camera.html"]')?.classList.add('active');
      return;
    }

    // Default: Home page scroll highlighting
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}` ||
          (currentSection === 'projects' || currentSection === 'experience') && href === '#projects' ||
          (window.scrollY < 300 && (href === 'index.html' || href === '#home'))) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();
});
