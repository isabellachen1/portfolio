document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Get current page path
  let currentPath = window.location.pathname;
  let isAboutPage = currentPath.includes('about');
  let isCameraPage = currentPath.includes('camera');
  let isIndexPage = !isAboutPage && !isCameraPage;

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    // Handle About page
    if (isAboutPage) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === 'about.html') {
          link.classList.add('active');
        }
      });
      return;
    }

    // Handle Camera page
    if (isCameraPage) {
      navLinks.forEach(link => {
        if (link.getAttribute('href') === 'camera.html') {
          link.classList.add('active');
        }
      });
      return;
    }

    // Handle index.html - scroll-based highlighting
    if (isIndexPage) {
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) {
          currentSection = section.getAttribute('id');
        }
      });

      // Default to home if at top
      if (!currentSection || window.scrollY < 200) {
        currentSection = 'home';
      }

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
  }

  // Add scroll listener only on index page
  if (isIndexPage) {
    window.addEventListener('scroll', setActiveLink);
  }

  setActiveLink();
});
