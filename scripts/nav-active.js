document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a');

  // Detect current page
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage) currentPage = 'index.html';

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');

    // Extract filename from link (ignore # for anchors)
    const linkPage = href.split('#')[0];

    // Highlight link if filename matches current page
    if (linkPage === currentPage) {
      link.classList.add('active');
    }

    // Special case: scroll anchors on index.html
    if (currentPage === 'index.html') {
      if (href === '#home' && window.scrollY < 200) {
        link.classList.add('active');
      }
      if ((href === '#projects') && (window.scrollY >= document.querySelector('#projects').offsetTop - 200)) {
        link.classList.add('active');
      }
    }
  });

  // Add scroll listener only on index.html
  if (currentPage === 'index.html') {
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
