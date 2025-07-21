
import { useState, useEffect, Suspense } from 'react';
import { Bot } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Canvas } from '@react-three/fiber';
import { BotChat } from './BotChat';
import { Robot3D } from './Robot3D';
import { FallbackRobot3D } from './FallbackRobot3D';

export const WalkingBot = () => {
  const [position, setPosition] = useState({ x: 50 });
  const [direction, setDirection] = useState({ x: 1 });
  const [isOpen, setIsOpen] = useState(false);
  const [isWalking, setIsWalking] = useState(true);
  const [hasGLBModel, setHasGLBModel] = useState(false);

  // Check if GLB model exists
  useEffect(() => {
    fetch('/models/robot.glb')
      .then(response => {
        setHasGLBModel(response.ok);
      })
      .catch(() => setHasGLBModel(false));
  }, []);

  useEffect(() => {
    const moveBot = () => {
      setPosition(prev => {
        let newX = prev.x + direction.x * 0.3;
        let newDirection = { ...direction };

        // Bounce off left and right edges
        if (newX <= 5 || newX >= 95) {
          newDirection.x *= -1;
          newX = Math.max(5, Math.min(95, newX));
        }

        setDirection(newDirection);
        return { x: newX };
      });
    };

    const interval = setInterval(moveBot, 80);
    return () => clearInterval(interval);
  }, [direction]);

  const RobotModel = () => {
    if (hasGLBModel) {
      return (
        <Robot3D 
          direction={direction} 
          isWalking={isWalking}
          scale={0.5}
        />
      );
    }
    return <FallbackRobot3D direction={direction} isWalking={isWalking} />;
  };

  return (
    <>
      <div
        className="fixed bottom-4 z-50 cursor-pointer transition-all duration-300 hover:scale-110"
        style={{
          left: `${position.x}%`,
          transform: 'translateX(-50%)',
          width: '80px',
          height: '80px',
        }}
        onClick={() => setIsOpen(true)}
        onMouseEnter={() => setIsWalking(false)}
        onMouseLeave={() => setIsWalking(true)}
      >
        <Canvas
          camera={{ position: [0, 1, 3], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 1]} intensity={1} castShadow />
          <pointLight position={[-2, 2, 1]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <RobotModel />
          </Suspense>
        </Canvas>
        
        {/* Tooltip */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity shadow-lg">
          Click me! 👋
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              AI Assistant
            </DialogTitle>
          </DialogHeader>
          <BotChat onClose={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
