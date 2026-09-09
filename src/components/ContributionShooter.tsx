import { useEffect, useRef } from 'react';

type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type Bullet = {
  x: number;
  y: number;
  speed: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
};

type Props = {
  weeks: ContributionDay[][];
  totalContributions: number;
  hoveredDay: ContributionDay | null;
  setHoveredDay: (day: ContributionDay | null) => void;
  formatDate: (d: string) => string;
  getLevelClass: (level: number) => string;
  getMonthLabel: (wIdx: number) => string | null;
  loading: boolean;
};

const ContributionShooter = ({
  weeks,
  totalContributions,
  hoveredDay,
  setHoveredDay,
  formatDate,
  getLevelClass,
  getMonthLabel,
  loading,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation refs
  const shipXRef = useRef(100);
  const dirRef = useRef(1);
  const bulletsRef = useRef<Bullet[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastShotRef = useRef(0);

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.scrollWidth || 670;
        canvas.height = 118;
      }
    };
    resizeCanvas();

    const loop = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const shipY = canvas.height - 8;

      // Patrol movement
      shipXRef.current += dirRef.current * 1.4;
      if (shipXRef.current > canvas.width - 30) {
        dirRef.current = -1;
      } else if (shipXRef.current < 30) {
        dirRef.current = 1;
      }

      // Fire subtle laser every ~450ms
      if (timestamp - lastShotRef.current > 450) {
        bulletsRef.current.push({
          x: shipXRef.current,
          y: shipY - 6,
          speed: 4.5,
        });
        lastShotRef.current = timestamp;
      }

      // Update & Render Bullets
      ctx.fillStyle = '#10b981';
      const activeBullets: Bullet[] = [];
      bulletsRef.current.forEach((b) => {
        b.y -= b.speed;
        ctx.fillRect(b.x - 0.75, b.y - 3, 1.5, 5);

        // Check impact with grid
        const gridLeft = 24;
        const gridTop = 16;
        const cellStep = 12.5;

        if (b.y <= gridTop + 7 * cellStep && b.y >= gridTop) {
          const col = Math.floor((b.x - gridLeft) / cellStep);
          const row = Math.floor((b.y - gridTop) / cellStep);

          if (
            col >= 0 &&
            col < weeks.length &&
            row >= 0 &&
            row < weeks[col].length
          ) {
            const day = weeks[col][row];
            if (day && day.count > 0) {
              // Hit an active commit square - spawn small subtle spark
              for (let i = 0; i < 4; i++) {
                const angle = Math.random() * Math.PI * 2;
                const spd = Math.random() * 1.5 + 0.5;
                particlesRef.current.push({
                  x: b.x,
                  y: b.y,
                  vx: Math.cos(angle) * spd,
                  vy: Math.sin(angle) * spd,
                  alpha: 1,
                });
              }
              return; // Bullet consumed
            }
          }
        }

        if (b.y > 0) {
          activeBullets.push(b);
        }
      });
      bulletsRef.current = activeBullets;

      // Update & Render Particle Sparks
      const activeParticles: Particle[] = [];
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.05;
        if (p.alpha > 0) {
          ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
          ctx.fillRect(p.x - 0.5, p.y - 0.5, 1.5, 1.5);
          activeParticles.push(p);
        }
      });
      particlesRef.current = activeParticles;

      // Render Minimalist Ambient Ship Cannon
      const sx = shipXRef.current;
      const sy = shipY;

      ctx.fillStyle = '#10b981';
      // Ship nose
      ctx.beginPath();
      ctx.moveTo(sx, sy - 6);
      ctx.lineTo(sx - 5, sy + 3);
      ctx.lineTo(sx - 2, sy + 1);
      ctx.lineTo(sx, sy + 3);
      ctx.lineTo(sx + 2, sy + 1);
      ctx.lineTo(sx + 5, sy + 3);
      ctx.closePath();
      ctx.fill();

      // Wing cannon tips
      ctx.fillStyle = '#34d399';
      ctx.fillRect(sx - 4.5, sy - 2, 1, 4);
      ctx.fillRect(sx + 3.5, sy - 2, 1, 4);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [weeks]);

  return (
    <div
      ref={containerRef}
      className="p-4 sm:p-5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] mb-6"
    >
      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-semibold text-light-main dark:text-main">
          Contributions
        </span>
        <span className="text-light-muted dark:text-muted text-[11px]">
          {hoveredDay && hoveredDay.count >= 0
            ? `${hoveredDay.count} commit${hoveredDay.count === 1 ? '' : 's'} on ${formatDate(hoveredDay.date)}`
            : `${totalContributions} commits in past year`}
        </span>
      </div>

      {/* Heatmap with no ugly scrollbars */}
      <div className="relative overflow-x-auto no-scrollbar pb-1">
        <div className="relative min-w-[660px]">
          {/* Month labels */}
          <div className="flex text-[9px] text-light-muted dark:text-muted mb-1 h-3.5 pl-6">
            {weeks.map((_, wIdx) => {
              const label = getMonthLabel(wIdx);
              return (
                <div
                  key={wIdx}
                  className="w-[10px] mr-[2.5px] flex-shrink-0 text-left"
                >
                  {label && <span>{label}</span>}
                </div>
              );
            })}
          </div>

          {/* Grid + Canvas Stack */}
          <div className="relative">
            <div className="flex">
              {/* Day of week labels */}
              <div className="flex flex-col justify-between text-[8px] text-light-muted dark:text-muted pr-2 h-[85px] select-none">
                <span>Sun</span>
                <span>Wed</span>
                <span>Sat</span>
              </div>

              {/* Weeks Columns */}
              <div className="flex gap-[2.5px]">
                {loading && weeks.length === 0 ? (
                  <div className="flex items-center justify-center w-full py-8 text-xs text-light-muted dark:text-muted">
                    Syncing GitHub activity...
                  </div>
                ) : (
                  weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[2.5px]">
                      {week.map((day, dIdx) => {
                        if (day.count === -1) {
                          return (
                            <div
                              key={dIdx}
                              className="w-[10px] h-[10px] rounded-[2px] opacity-0"
                            />
                          );
                        }
                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-[10px] h-[10px] rounded-[2px] transition-all cursor-pointer hover:ring-1 hover:ring-secondary ${getLevelClass(day.level)}`}
                          />
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Ambient Shooter Canvas Overlay (pointer-events-none so tooltips work smoothly) */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-[118px] pointer-events-none z-10"
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-black/[0.04] dark:border-white/[0.04] text-[10px] text-light-muted dark:text-muted">
        <span>Synced with @mohitdevx</span>
        <div className="flex items-center gap-1 text-[10px]">
          <span>Less</span>
          <span className="w-[8px] h-[8px] rounded-[1px] bg-black/[0.04] dark:bg-white/[0.05]" />
          <span className="w-[8px] h-[8px] rounded-[1px] bg-secondary/30" />
          <span className="w-[8px] h-[8px] rounded-[1px] bg-secondary/55" />
          <span className="w-[8px] h-[8px] rounded-[1px] bg-secondary/80" />
          <span className="w-[8px] h-[8px] rounded-[1px] bg-secondary" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionShooter;
