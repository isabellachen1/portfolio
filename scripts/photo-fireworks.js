// Soft fireworks effect for photo gallery and about profile picture
document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.gallery-photo');
    const aboutProfilePic = document.querySelector('.about-image img');

    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            createFireworks(this);
        });
    });

    if (aboutProfilePic) {
        aboutProfilePic.addEventListener('mouseenter', function() {
            createFireworks(this, false, true);
        });
    }

    function createFireworks(element, isProjectImg = false, isInterestCard = false) {
        const rect = element.getBoundingClientRect();
        // Different particle counts for different elements
        let particleCount;
        if (isInterestCard) {
            particleCount = 10; // Medium amount for interest cards
        } else if (isProjectImg) {
            particleCount = 6; // Less for project images
        } else {
            particleCount = 12; // More for gallery photos
        }

        for (let i = 0; i < particleCount; i++) {
            createParticle(rect, isProjectImg, isInterestCard);
        }
    }

    function createParticle(rect, isProjectImg = false, isInterestCard = false) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        // Random position around the element edges
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        let startX, startY;

        switch(side) {
            case 0: // top
                startX = rect.left + Math.random() * rect.width;
                startY = rect.top;
                break;
            case 1: // right
                startX = rect.right;
                startY = rect.top + Math.random() * rect.height;
                break;
            case 2: // bottom
                startX = rect.left + Math.random() * rect.width;
                startY = rect.bottom;
                break;
            case 3: // left
                startX = rect.left;
                startY = rect.top + Math.random() * rect.height;
                break;
        }

        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = isInterestCard ? (30 + Math.random() * 50) : (40 + Math.random() * 60);
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;

        // Set initial position
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';

        // Random colorful palette with coral pink
        let opacity;
        if (isInterestCard) {
            opacity = 0.5; // Subtle for interest cards
        } else if (isProjectImg) {
            opacity = 0.4; // Muted for project images
        } else {
            opacity = 0.6; // More visible for gallery photos
        }

        const colors = [
            `rgba(120, 140, 200, ${opacity})`,
            `rgba(87, 111, 177, ${opacity})`,
            `rgba(180, 160, 200, ${opacity})`,
            `rgba(150, 170, 210, ${opacity})`,
            `rgba(255, 127, 150, ${opacity})`, // coral pink
            `rgba(255, 160, 180, ${opacity})`, // lighter coral
            `rgba(200, 120, 220, ${opacity})`, // bright purple
            `rgba(140, 180, 255, ${opacity})`  // bright blue
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;

        const shadowSize = isInterestCard ? 12 : (isProjectImg ? 10 : 15);
        particle.style.boxShadow = `0 0 ${shadowSize}px ${color}`;

        // Random size
        let size;
        if (isInterestCard) {
            size = 7 + Math.random() * 7; // Medium size for interest cards
        } else if (isProjectImg) {
            size = 6 + Math.random() * 6; // Smaller for project images
        } else {
            size = 8 + Math.random() * 8; // Larger for gallery photos
        }
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        document.body.appendChild(particle);

        // Animate with different durations
        let duration;
        if (isInterestCard) {
            duration = 900 + Math.random() * 450; // Medium speed for interest cards
        } else if (isProjectImg) {
            duration = 1000 + Math.random() * 500; // Slower for project images
        } else {
            duration = 800 + Math.random() * 400; // Faster for gallery photos
        }

        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, duration);
    }
});
