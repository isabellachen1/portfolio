// Simple Cursor Animation
document.addEventListener('DOMContentLoaded', function() {
  const cursorDot = document.querySelector('.cursor-dot');

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let isInitialized = false;
  let hasMouseMoved = false;

  // Track mouse position
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Initialize cursor position on first mouse move and make visible
    if (!isInitialized) {
      dotX = mouseX;
      dotY = mouseY;
      isInitialized = true;

      // Show cursor after brief delay on first mouse movement
      if (!hasMouseMoved) {
        hasMouseMoved = true;
        setTimeout(function() {
          cursorDot.classList.add('visible');
        }, 100);
      }
    }
  });

  // Smooth cursor follow animation with better performance
  function animateCursor() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;

    const transformValue = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    cursorDot.style.transform = transformValue;
    cursorDot.style.setProperty('--cursor-transform', transformValue);

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('.color-container, .timeline-item, .initial, .scroll-down-indicator, .footer-icon');

  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursorDot.classList.add('hover');
    });

    element.addEventListener('mouseleave', function() {
      cursorDot.classList.remove('hover');
    });
  });

  // Click animation
  document.addEventListener('mousedown', function() {
    cursorDot.classList.add('click');
  });

  document.addEventListener('mouseup', function() {
    setTimeout(() => {
      cursorDot.classList.remove('click');
    }, 300);
  });

  // Hide cursor when it leaves the window
  document.addEventListener('mouseleave', function() {
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', function() {
    cursorDot.style.opacity = '1';
  });
});
