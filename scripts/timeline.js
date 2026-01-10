// Timeline Reset Functionality
function resetTimeline() {
  const track = document.querySelector('.timeline-track');

  // Remove animation temporarily
  track.style.animation = 'none';

  // Force reflow to restart animation
  void track.offsetWidth;

  // Restart animation from beginning
  track.style.animation = 'scrollTimeline 25s linear infinite';
}
