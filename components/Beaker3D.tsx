
import React, { useEffect, useRef } from 'react';

interface Props {
  isReacting: boolean;
  color: string;
}

const Beaker3D: React.FC<Props> = ({ isReacting, color }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isReacting) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: any[] = [];

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 4 + 2,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.5,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() > 0.8) particles.push(createParticle());

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed;
        p.opacity -= 0.01;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isReacting]);

  return (
    <div className="relative perspective-1000 w-64 h-80 flex items-end justify-center">
      {/* 3D Glass Container */}
      <div className={`relative w-48 h-64 border-4 border-white/20 rounded-b-[4rem] rounded-t-lg transition-all duration-1000 ${isReacting ? 'animate-bounce' : ''}`}
           style={{ transformStyle: 'preserve-3d', transform: 'rotateX(10deg)' }}>
        
        {/* Liquid Layer */}
        <div 
          className="absolute bottom-0 w-full rounded-b-[3.5rem] transition-all duration-1000 ease-in-out"
          style={{ 
            height: isReacting ? '80%' : '40%', 
            backgroundColor: color,
            boxShadow: `0 0 50px ${color}44`,
            opacity: 0.6
          }}
        >
          {/* Surface Wave */}
          <div className="absolute top-0 w-full h-4 bg-white/20 blur-sm rounded-full -translate-y-2"></div>
        </div>

        {/* Inner Bubbles Canvas */}
        <canvas 
          ref={canvasRef} 
          width={180} 
          height={240} 
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
        />

        {/* Reflections */}
        <div className="absolute top-4 left-4 w-4 h-32 bg-white/10 rounded-full blur-[2px]"></div>
      </div>

      {/* Steam/Smoke Effect */}
      {isReacting && (
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-32 h-32 flex flex-col items-center">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="w-16 h-16 bg-white/10 blur-xl rounded-full animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}></div>
           ))}
        </div>
      )}
      
      {/* Floor Shadow */}
      <div className={`absolute -bottom-4 w-40 h-8 bg-black/40 blur-xl rounded-full transition-all ${isReacting ? 'scale-110 opacity-60' : 'scale-100 opacity-40'}`}></div>
    </div>
  );
};

export default Beaker3D;
