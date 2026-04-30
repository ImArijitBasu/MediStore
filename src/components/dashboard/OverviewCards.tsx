import { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  color?: string;
}

export function OverviewCard({ title, value, description, icon: Icon, trend, color = "text-blue-600 dark:text-blue-400" }: OverviewCardProps) {
  return (
    <div className="bg-card rounded-xl border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={`p-2 rounded-lg bg-muted ${color}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <p className={`text-xs font-medium ${trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last month
          </p>
        )}
      </div>
    </div>
  );
}

interface OverviewCardsGridProps {
  cards: OverviewCardProps[];
}

export function OverviewCardsGrid({ cards }: OverviewCardsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <OverviewCard key={i} {...card} />
      ))}
    </div>
  );
}
