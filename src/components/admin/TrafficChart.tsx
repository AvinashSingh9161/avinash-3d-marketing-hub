import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { format, parseISO } from "date-fns";

interface TrafficData {
  date: string;
  pageViews: number;
  uniqueSessions: number;
}

interface TrafficChartProps {
  data: TrafficData[];
  totalViews: number;
  loading?: boolean;
}

export const TrafficChart = ({ data, totalViews, loading }: TrafficChartProps) => {
  const chartData = data.map((item) => ({
    name: format(parseISO(item.date), "MMM dd"),
    value: item.pageViews,
  }));

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base font-medium text-muted-foreground">
            Website Traffic Over Time
          </CardTitle>
          {loading ? (
            <div className="space-y-2">
              <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <p className="text-xs text-muted-foreground">Last 30 Days</p>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading chart...</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">No data available yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};
