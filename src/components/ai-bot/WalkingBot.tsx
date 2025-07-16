import { useState, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BotChat } from './BotChat';

export const WalkingBot = () => {
  const [position, setPosition] = useState({ x: 50 });
  const [direction, setDirection] = useState({ x: 1 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const moveBot = () => {
      setPosition(prev => {
        let newX = prev.x + direction.x * 0.3;
        let newDirection = { ...direction };

        // Bounce off left and right edges
        if (newX <= 2 || newX >= 95) {
          newDirection.x *= -1;
          newX = Math.max(2, Math.min(95, newX));
        }

        setDirection(newDirection);
        return { x: newX };
      });
    };

    const interval = setInterval(moveBot, 80);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <>
      <div
        className="fixed bottom-4 z-50 cursor-pointer transition-all duration-300 hover:scale-110"
        style={{
          left: `${position.x}%`,
          transform: `scaleX(${direction.x > 0 ? 1 : -1}) perspective(1000px) rotateY(${direction.x > 0 ? 15 : -15}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* 3D Shadow */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-black/20 rounded-full blur-sm"></div>
          
          {/* 3D Robot Body */}
          <div 
            className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border-2 border-primary-foreground/30 animate-bounce"
            style={{
              transform: 'translateZ(10px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3), inset 0 2px 8px rgba(255,255,255,0.2)'
            }}
          >
            {/* Robot Head */}
            <div 
              className="bg-gradient-to-br from-primary to-primary/80 rounded-full w-8 h-8 mx-auto mb-1 relative border border-primary-foreground/20"
              style={{
                transform: 'translateZ(5px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset 0 1px 4px rgba(255,255,255,0.3)'
              }}
            >
              {/* Eyes */}
              <div className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse shadow-inner"></div>
              <div className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse shadow-inner"></div>
              {/* Antenna */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gradient-to-t from-primary-foreground to-accent rounded-full"></div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-ping shadow-lg"></div>
            </div>
            
            {/* Robot Body */}
            <div 
              className="bg-gradient-to-br from-primary/90 to-primary/70 rounded-lg w-6 h-8 mx-auto mb-1 relative border border-primary-foreground/20"
              style={{
                transform: 'translateZ(3px)',
                boxShadow: '0 3px 6px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.2)'
              }}
            >
              {/* Chest Panel */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-primary-foreground/40 rounded border border-primary-foreground/20"></div>
              {/* Arms */}
              <div 
                className="absolute top-1 -left-1 w-1 h-4 bg-gradient-to-b from-primary to-primary/80 rounded-full border border-primary-foreground/20"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              ></div>
              <div 
                className="absolute top-1 -right-1 w-1 h-4 bg-gradient-to-b from-primary to-primary/80 rounded-full border border-primary-foreground/20"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              ></div>
              {/* Hands */}
              <div className="absolute top-4 -left-1.5 w-1.5 h-1.5 bg-gradient-to-br from-accent to-accent/80 rounded-full shadow-lg"></div>
              <div className="absolute top-4 -right-1.5 w-1.5 h-1.5 bg-gradient-to-br from-accent to-accent/80 rounded-full shadow-lg"></div>
            </div>
            
            {/* Robot Legs */}
            <div className="flex justify-center gap-1">
              <div 
                className="w-1 h-3 bg-gradient-to-b from-primary to-primary/80 rounded-full border border-primary-foreground/20"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              ></div>
              <div 
                className="w-1 h-3 bg-gradient-to-b from-primary to-primary/80 rounded-full border border-primary-foreground/20"
                style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
              ></div>
            </div>
            
            {/* Robot Feet */}
            <div className="flex justify-center gap-1 mt-0.5">
              <div className="w-2 h-1 bg-gradient-to-r from-accent to-accent/80 rounded-full shadow-lg"></div>
              <div className="w-2 h-1 bg-gradient-to-r from-accent to-accent/80 rounded-full shadow-lg"></div>
            </div>
          </div>
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity shadow-lg">
            Click me! 👋
          </div>
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