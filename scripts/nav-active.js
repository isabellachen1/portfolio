document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Get current page path - more robust detection
  const fullPath = window.location.pathname;
  const fileName = fullPath.split('/').pop() || 'index.html';

  console.log('Current path:', fullPath);
  console.log('File name:', fileName);

  function setActiveLink() {
    navLinks.forEach(link => link.classList.remove('active'));

    // Check if we're on about.html
    if (fullPath.includes('about') || fileName === 'about.html' || fileName === 'about') {
      console.log('On about page');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        console.log('Checking link:', href);
        if (href === 'about.html') {
          link.classList.add('active');
          console.log('Activated about link');
        }
      });
      return;
    }

    // Check if we're on camera.html
    if (fullPath.includes('camera') || fileName === 'camera.html' || fileName === 'camera') {
      console.log('On camera page');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        console.log('Checking link:', href);
        if (href === 'camera.html') {
          link.classList.add('active');
          console.log('Activated camera link');
        }
      });
      return;
    }

    // Index page - scroll-based highlighting
    console.log('On index page');
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        currentSection = section.getAttribute('id');
      }
    });

    if (!currentSection || window.scrollY < 200) {
      currentSection = 'home';
    }

    console.log('Current section:', currentSection);

    navLinks.forEach(link => {
      const href = link.getAttribute('href');

      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
      else if ((currentSection === 'projects' || currentSection === 'experience') && href === '#projects') {
        link.classList.add('active');
      }
    });
  }

  // Add scroll listener only on index page
  if (!fullPath.includes('about') && !fullPath.includes('camera')) {
    window.addEventListener('scroll', setActiveLink);
  }

  setActiveLink();
});
