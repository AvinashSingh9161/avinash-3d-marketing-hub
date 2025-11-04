import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Week 1", value: 4000 },
  { name: "Week 2", value: 3000 },
  { name: "Week 3", value: 5000 },
  { name: "Week 4", value: 2780 },
  { name: "Week 5", value: 1890 },
  { name: "Week 6", value: 2390 },
  { name: "Week 7", value: 3490 },
  { name: "Week 8", value: 6000 },
];

export const TrafficChart = () => {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base font-medium text-muted-foreground">
            Website Traffic Over Time
          </CardTitle>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">45,123</p>
            <p className="text-sm text-green-500 font-medium">+10.2%</p>
          </div>
          <p className="text-xs text-muted-foreground">Last 30 Days</p>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
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
              tickFormatter={(value) => `${value / 1000}k`}
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
      </CardContent>
    </Card>
  );
};
