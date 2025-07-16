import { useState, useEffect } from 'react';
import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BotChat } from './BotChat';

export const WalkingBot = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const moveBot = () => {
      setPosition(prev => {
        let newX = prev.x + direction.x * 0.5;
        let newY = prev.y + direction.y * 0.3;
        let newDirection = { ...direction };

        // Bounce off edges
        if (newX <= 0 || newX >= 95) {
          newDirection.x *= -1;
          newX = Math.max(0, Math.min(95, newX));
        }
        if (newY <= 0 || newY >= 90) {
          newDirection.y *= -1;
          newY = Math.max(0, Math.min(90, newY));
        }

        setDirection(newDirection);
        return { x: newX, y: newY };
      });
    };

    const interval = setInterval(moveBot, 50);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <>
      <div
        className="fixed z-50 cursor-pointer transition-all duration-200 hover:scale-110"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: `scaleX(${direction.x > 0 ? 1 : -1})`,
        }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          {/* Cute Robot Body */}
          <div className="bg-primary/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg border-2 border-primary-foreground/20 animate-bounce">
            {/* Robot Head */}
            <div className="bg-primary rounded-full w-8 h-8 mx-auto mb-1 relative">
              {/* Eyes */}
              <div className="absolute top-2 left-1.5 w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse"></div>
              <div className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse"></div>
              {/* Antenna */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-primary-foreground rounded-full"></div>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-ping"></div>
            </div>
            
            {/* Robot Body */}
            <div className="bg-primary/80 rounded-lg w-6 h-8 mx-auto mb-1 relative">
              {/* Chest Panel */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-primary-foreground/30 rounded"></div>
              {/* Arms */}
              <div className="absolute top-1 -left-1 w-1 h-4 bg-primary rounded-full"></div>
              <div className="absolute top-1 -right-1 w-1 h-4 bg-primary rounded-full"></div>
              {/* Hands */}
              <div className="absolute top-4 -left-1.5 w-1.5 h-1.5 bg-accent rounded-full"></div>
              <div className="absolute top-4 -right-1.5 w-1.5 h-1.5 bg-accent rounded-full"></div>
            </div>
            
            {/* Robot Legs */}
            <div className="flex justify-center gap-1">
              <div className="w-1 h-3 bg-primary rounded-full"></div>
              <div className="w-1 h-3 bg-primary rounded-full"></div>
            </div>
            
            {/* Robot Feet */}
            <div className="flex justify-center gap-1 mt-0.5">
              <div className="w-2 h-1 bg-accent rounded-full"></div>
              <div className="w-2 h-1 bg-accent rounded-full"></div>
            </div>
          </div>
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium border whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
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