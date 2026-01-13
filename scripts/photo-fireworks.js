// Soft fireworks effect for photo gallery only
document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.gallery-photo');

    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function(e) {
            createFireworks(this);
        });
    });

    function createFireworks(element) {
        const rect = element.getBoundingClientRect();
        // Less particles for project images, more for gallery photos
        const isProjectImg = element.classList.contains('project-img');
        const particleCount = isProjectImg ? 6 : 12; // Number of particles per firework

        for (let i = 0; i < particleCount; i++) {
            createParticle(rect, isProjectImg);
        }
    }

    function createParticle(rect, isProjectImg = false) {
        const particle = document.createElement('div');
        particle.className = 'firework-particle';

        // Random position around the image edges
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
        const distance = 40 + Math.random() * 60;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;

        // Set initial position
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';

        // Random colorful palette with coral pink (muted for project images)
        const opacity = isProjectImg ? 0.4 : 0.6;
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
        particle.style.boxShadow = `0 0 ${isProjectImg ? 10 : 15}px ${color}`;

        // Random size (smaller for project images)
        const size = isProjectImg ? (6 + Math.random() * 6) : (8 + Math.random() * 8);
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        document.body.appendChild(particle);

        // Animate (slower for project images)
        const duration = isProjectImg ? (1000 + Math.random() * 500) : (800 + Math.random() * 400);
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
