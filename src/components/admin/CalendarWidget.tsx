import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold text-sm">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map((day, i) => (
            <div key={i} className="text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {days.map((day, i) => {
            const isToday = day && 
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear() &&
              day === today.getDate();
            
            return (
              <div
                key={i}
                className={`text-sm py-2 rounded-md ${
                  isToday
                    ? "bg-primary text-primary-foreground font-medium"
                    : day
                    ? "hover:bg-accent cursor-pointer transition-colors"
                    : ""
                }`}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
