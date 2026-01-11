document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');

  // Get current page (strip extension)
  let currentPage = window.location.pathname.split('/').pop().replace('.html','');
  if (!currentPage) currentPage = 'index'; // top of index.html

  navLinks.forEach(link => {
    link.classList.remove('active');

    // Get href filename, strip extension and hash
    const href = link.getAttribute('href').split('#')[0].replace('.html','');

    // Compare filenames only
    if (href === currentPage) {
      link.classList.add('active');
    }

    // Scroll highlights for index.html
    if (currentPage === 'index') {
      if (href === '' || href === 'index') {
        if (window.scrollY < 200) link.classList.add('active');
      } else if (href === 'projects') {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection && window.scrollY >= projectsSection.offsetTop - 200) {
          link.classList.add('active');
        }
      }
    }
  });

  // Scroll listener only on index
  if (currentPage === 'index') {
    window.addEventListener('scroll', () => {
      navLinks.forEach(link => link.classList.remove('active'));

      if (window.scrollY < 200) {
        document.querySelector('.nav-links a[href="#home"]').classList.add('active');
      } else {
        const projectsSection = document.querySelector('#projects');
        if (projectsSection && window.scrollY >= projectsSection.offsetTop - 200) {
          document.querySelector('.nav-links a[href="#projects"]').classList.add('active');
        }
      }
    });
  }
});
