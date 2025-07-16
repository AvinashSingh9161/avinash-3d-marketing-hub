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
          <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3 shadow-lg border-2 border-primary-foreground/20 animate-bounce">
            <Bot className="w-6 h-6 text-primary-foreground" />
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