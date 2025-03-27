import { useEffect } from 'react';

export default function useOrbsAnimation(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const wallpaper = new Image();
    wallpaper.src = '/images/hero-wallpaper.png';

    wallpaper.onload = () => {
      const orbs = [];
      const orbCount = 0; // Slightly more orbs for better coverage

      for (let i = 0; i < orbCount; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 80 + 50, // Larger orbs (50-130px)
          dx: (Math.random() - 0.5) * 3, // Faster movement
          dy: (Math.random() - 0.5) * 3,
        });
      }

      const animate = () => {
        // Clear and draw the darkened background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(wallpaper, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)'; // Darker overlay for contrast
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        orbs.forEach((orb) => {
          // Reveal wallpaper through orb
          ctx.save();
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(wallpaper, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          // Add glow effect
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius * 1.2, 0, Math.PI * 2); // Slightly larger glow
          const gradient = ctx.createRadialGradient(
            orb.x, orb.y, orb.radius * 0.6, // Tighter inner glow
            orb.x, orb.y, orb.radius * 1.2
          );
          gradient.addColorStop(0, 'rgba(0, 255, 255, 0.4)'); // Brighter cyan
          gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();

          // Update position
          orb.x += orb.dx;
          orb.y += orb.dy;

          // Bounce off edges
          if (orb.x + orb.radius > canvas.width || orb.x - orb.radius < 0) orb.dx = -orb.dx;
          if (orb.y + orb.radius > canvas.height || orb.y - orb.radius < 0) orb.dy = -orb.dy;
        });

        requestAnimationFrame(animate);
      };

      animate();
    };

    wallpaper.onerror = () => {
      console.error('Failed to load wallpaper image. Please check the path.');
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Redraw immediately on resize to avoid blank canvas
      if (wallpaper.complete) {
        ctx.drawImage(wallpaper, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef]);
}