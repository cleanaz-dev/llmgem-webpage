import { useEffect } from 'react';

export default function useOrbsAnimation(canvasRef) {
  useEffect(() => {
    // Get the canvas and its 2D rendering context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Array to store orb objects
    const orbs = [];
    const orbCount = 10; // Number of orbs to create

    // Create orbs with random properties
    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width, // Random x position
        y: Math.random() * canvas.height, // Random y position
        radius: Math.random() * 80 + 40, // Random radius (40 to 120)
        dx: (Math.random() - 0.5) * 2, // Random horizontal speed
        dy: (Math.random() - 0.5) * 2, // Random vertical speed
      });
    }

    // Animation loop
    const animate = () => {
      // Clear the canvas and fill it with a semi-transparent black background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update each orb
      orbs.forEach((orb) => {
        // Draw the orb
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2); // Draw a circle
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)'; // Set orb color (cyan with transparency)
        ctx.fill();
        ctx.closePath();

        // Update orb position
        orb.x += orb.dx; // Move orb horizontally
        orb.y += orb.dy; // Move orb vertically

        // Bounce orbs off the edges of the canvas
        if (orb.x + orb.radius > canvas.width || orb.x - orb.radius < 0) orb.dx = -orb.dx;
        if (orb.y + orb.radius > canvas.height || orb.y - orb.radius < 0) orb.dy = -orb.dy;
      });

      // Request the next animation frame
      requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();

    // Handle window resizing
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    // Cleanup: Remove the resize event listener when the component unmounts
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [canvasRef]); // Re-run the effect if the canvasRef changes
}