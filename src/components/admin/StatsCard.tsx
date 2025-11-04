import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: LucideIcon;
  loading?: boolean;
}

export const StatsCard = ({ title, value, change, isPositive, loading }: StatsCardProps) => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        {loading ? (
          <div className="space-y-2">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            {change && (
              <p className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {change}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
