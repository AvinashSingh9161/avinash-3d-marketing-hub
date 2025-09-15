import { useEffect, useRef } from "react";

const FloatingShapes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating geometric shapes
    const shapes = [
      { type: 'cube', size: 60, x: 10, y: 20 },
      { type: 'sphere', size: 40, x: 80, y: 70 },
      { type: 'pyramid', size: 50, x: 20, y: 80 },
      { type: 'torus', size: 35, x: 70, y: 30 },
      { type: 'octahedron', size: 45, x: 50, y: 50 }
    ];

    shapes.forEach((shape, index) => {
      const element = document.createElement('div');
      element.className = `absolute opacity-20 animate-float`;
      element.style.left = `${shape.x}%`;
      element.style.top = `${shape.y}%`;
      element.style.width = `${shape.size}px`;
      element.style.height = `${shape.size}px`;
      element.style.animationDelay = `${index * 2}s`;
      element.style.transform = 'translate(-50%, -50%)';
      
      if (shape.type === 'cube') {
        element.innerHTML = `
          <div class="w-full h-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-sm border border-white/10 rounded-lg animate-rotate-3d"></div>
        `;
      } else if (shape.type === 'sphere') {
        element.innerHTML = `
          <div class="w-full h-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-full backdrop-blur-sm border border-white/10 animate-pulse-glow"></div>
        `;
      } else if (shape.type === 'pyramid') {
        element.innerHTML = `
          <div class="w-0 h-0 border-l-[${shape.size/2}px] border-r-[${shape.size/2}px] border-b-[${shape.size}px] border-l-transparent border-r-transparent border-b-gradient-to-r from-pink-500/30 to-purple-500/30"></div>
        `;
      }
      
      container.appendChild(element);
    });

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-xl animate-float"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-xl animate-float float-delay-1"></div>
      <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-xl animate-float float-delay-2"></div>
      
      {/* Wireframe Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FloatingShapes;