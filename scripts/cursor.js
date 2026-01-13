// Simple Cursor Animation
document.addEventListener('DOMContentLoaded', function() {
  const cursorDot = document.querySelector('.cursor-dot');

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let isInitialized = false;
  let hasMouseMoved = false;

  // Magic trail variables
  let trailPositions = [];
  const maxTrailLength = 8;
  let trailCounter = 0;
  let lastX = 0;
  let lastY = 0;

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

  // Create magic trail bubble
  function createMagicTrail(x, y) {
    // Check if cursor is actually moving
    const distanceMoved = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
    if (distanceMoved < 5) return; // Only create trail if cursor moved enough

    trailCounter++;
    if (trailCounter % 2 !== 0) return; // Create trail every other frame for performance

    lastX = x;
    lastY = y;

    const trail = document.createElement('div');
    trail.className = 'magic-trail';

    // Random bubble size (bigger)
    const size = 6 + Math.random() * 8;
    trail.style.width = size + 'px';
    trail.style.height = size + 'px';

    // Position
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';

    // Random muted blue and purple colors
    const colors = [
      'rgba(120, 140, 200, 0.4)',
      'rgba(87, 111, 177, 0.4)',
      'rgba(150, 170, 210, 0.4)',
      'rgba(140, 180, 255, 0.35)',
      'rgba(100, 120, 200, 0.4)',
      'rgba(160, 140, 220, 0.4)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    trail.style.background = color;
    trail.style.boxShadow = `0 0 12px ${color}`;

    document.body.appendChild(trail);

    // Fade out and remove
    setTimeout(() => {
      trail.style.opacity = '0';
      trail.style.transform = 'scale(0)';
    }, 50);

    setTimeout(() => {
      trail.remove();
    }, 800);
  }

  // Smooth cursor follow animation with better performance
  function animateCursor() {
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;

    const transformValue = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
    cursorDot.style.transform = transformValue;
    cursorDot.style.setProperty('--cursor-transform', transformValue);

    // Create magic trail
    if (isInitialized && hasMouseMoved) {
      createMagicTrail(dotX, dotY);
    }

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
