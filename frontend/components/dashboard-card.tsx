import { DivideIcon as LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: "up" | "down"
  }
  icon: typeof LucideIcon
}

export function DashboardCard({ title, value, change, icon: Icon }: DashboardCardProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {change && (
            <p className={cn(
              "text-sm mt-1",
              change.trend === "up" ? "text-primary" : "text-destructive"
            )}>
              {change.trend === "up" ? "↑" : "↓"} {Math.abs(change.value)}%
            </p>
          )}
        </div>
        <div className="p-3 bg-secondary rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Card>
  )
}