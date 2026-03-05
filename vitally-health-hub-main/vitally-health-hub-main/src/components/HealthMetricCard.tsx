import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface HealthMetricCardProps {
  title: string;
  value: string;
  unit?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "stable";
  status?: "excellent" | "good" | "warning" | "alert";
  subtitle?: string;
}

export function HealthMetricCard({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  status = "good",
  subtitle,
}: HealthMetricCardProps) {
  const statusColors = {
    excellent: "text-health-excellent",
    good: "text-health-good",
    warning: "text-health-warning",
    alert: "text-health-alert",
  };

  const statusBgColors = {
    excellent: "bg-health-excellent/10",
    good: "bg-health-good/10",
    warning: "bg-health-warning/10",
    alert: "bg-health-alert/10",
  };

  return (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${statusBgColors[status]}`}>
          <Icon className={`w-4 h-4 ${statusColors[status]}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-muted-foreground">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
