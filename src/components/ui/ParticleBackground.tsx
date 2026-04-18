import { useEffect, useRef } from "react";

interface ParticleProps {
  count?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  symbol: string;
  angle: number;
  angleSpeed: number;
  lifespan: number;
  age: number;
}

const COLORS = [
  "rgba(255, 107, 26,",  // saffron
  "rgba(245, 158, 11,",  // gold
  "rgba(139, 92, 246,",  // violet
  "rgba(34, 211, 238,",  // ganga
];

const SYMBOLS = ["ॐ", "🔱", "·", "·", "·", "·", "✦", "·"];

export default function ParticleBackground({ count = 60 }: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const symbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 0.8 + 0.3),
      size: symbol === "·" ? Math.random() * 2 + 1 : Math.random() * 10 + 8,
      opacity: Math.random() * 0.6 + 0.3,
      color,
      symbol,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: (Math.random() - 0.5) * 0.02,
      lifespan: Math.random() * 300 + 200,
      age: 0,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize particles spread across the screen
    particlesRef.current = Array.from({ length: count }, () => {
      const p = createParticle(canvas);
      p.y = Math.random() * canvas.height;
      p.age = Math.random() * p.lifespan;
      return p;
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.map((p) => {
        p.age++;
        if (p.age >= p.lifespan) {
          return createParticle(canvas);
        }

        // Fade in/out
        let alpha = p.opacity;
        const lifeRatio = p.age / p.lifespan;
        if (lifeRatio < 0.1) alpha = p.opacity * (lifeRatio / 0.1);
        if (lifeRatio > 0.8) alpha = p.opacity * (1 - (lifeRatio - 0.8) / 0.2);

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angleSpeed;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `${p.color}${alpha})`;

        if (p.symbol === "·") {
          // Dot particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.shadowColor = `${p.color}0.8)`;
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Symbol particle
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.font = `${p.size}px "Cinzel Decorative", serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowColor = `${p.color}0.8)`;
          ctx.shadowBlur = 15;
          ctx.fillText(p.symbol, 0, 0);
        }

        ctx.restore();
        return p;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
