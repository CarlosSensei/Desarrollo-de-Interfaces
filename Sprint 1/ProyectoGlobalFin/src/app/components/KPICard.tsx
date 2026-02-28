import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor: string;
}

export function KPICard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconColor,
}: KPICardProps) {
  const changeColor =
    changeType === "positive"
      ? "text-green-600"
      : changeType === "negative"
      ? "text-red-600"
      : "text-slate-600";

  return (
    <Card className="border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
            <p className={`text-sm font-medium ${changeColor}`}>{change}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconColor}`}
          >
            <Icon size={24} className="text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
