import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  time: number;
}

const TRAIL_LIFETIME = 280; // ms trail lasts before disappearing
const MAX_WIDTH = 1.8; // subtle, crisp line width at the head

const CursorLine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number | null = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const points: Point[] = [];
    let isMoving = false;
    let idleTimeout: number | null = null;

    const render = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, width, height);

      // Remove points that have exceeded lifetime
      while (points.length > 0 && now - points[0].time > TRAIL_LIFETIME) {
        points.shift();
      }

      if (points.length >= 2) {
        const isDark =
          document.documentElement.classList.contains('dark') ||
          !document.documentElement.classList.contains('light');

        // Professional, clean line: pure white in dark theme, refined dark-charcoal in light theme
        const baseColor = isDark ? '255, 255, 255' : '15, 23, 42';

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];

          // Progress from tail (0) to head (1)
          const progress = (i + 1) / points.length;
          const ageRatio = 1 - (now - p2.time) / TRAIL_LIFETIME;
          const alpha = Math.max(0, Math.min(1, progress * ageRatio * 0.85));

          if (alpha <= 0.01) continue;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          ctx.strokeStyle = `rgba(${baseColor}, ${alpha})`;
          ctx.lineWidth = MAX_WIDTH * progress;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.stroke();
        }
      }

      // Continue animation loop while there are active points
      if (points.length > 0 || isMoving) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
        ctx.clearRect(0, 0, width, height);
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      points.push({ x: e.clientX, y: e.clientY, time: now });
      isMoving = true;

      if (idleTimeout) window.clearTimeout(idleTimeout);
      idleTimeout = window.setTimeout(() => {
        isMoving = false;
      }, 100);

      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      isMoving = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (idleTimeout) window.clearTimeout(idleTimeout);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    />
  );
};

export default CursorLine;
