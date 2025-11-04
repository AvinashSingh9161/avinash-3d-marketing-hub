import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon?: LucideIcon;
}

export const StatsCard = ({ title, value, change, isPositive }: StatsCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {change}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
