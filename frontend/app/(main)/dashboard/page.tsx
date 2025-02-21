"use client"

import { Plane as Plant, AlertTriangle, Droplets, LineChart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { DashboardCard } from "@/components/dashboard-card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import GifLoader from "@/components/loader"
import { useUserProfile } from "@/hooks/useUserProfile"

const data = [
  { month: "Jan", prediction: 4.2 },
  { month: "Feb", prediction: 4.5 },
  { month: "Mar", prediction: 4.8 },
  { month: "Apr", prediction: 4.6 },
  { month: "May", prediction: 4.9 },
  { month: "Jun", prediction: 4.8 },
]

const alerts = [
  {
    title: "Disease Risk Alert",
    description: "High risk of blast disease in Field A-12",
    icon: AlertTriangle,
  },
  {
    title: "Water Level Low",
    description: "Irrigation needed in Field B-7",
    icon: Droplets,
  },
  {
    title: "Optimal Harvest Time",
    description: "Field C-3 ready for harvest in 5 days",
    icon: Plant,
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
   const { user, error } = useUserProfile();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <GifLoader />
  }
  return (
    <div className="container max-w-[1000px] py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s what &apos;s happening with your fields.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Fields"
          value="124"
          change={{ value: 12, trend: "up" }}
          icon={Plant}
        />
        <DashboardCard
          title="Active Alerts"
          value="7"
          change={{ value: 3, trend: "down" }}
          icon={AlertTriangle}
        />
        <DashboardCard
          title="Water Usage"
          value="85%"
          icon={Droplets}
        />
        <DashboardCard
          title="Yield Forecast"
          value="4.8 tons"
          change={{ value: 8, trend: "up" }}
          icon={LineChart}
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="p-6 lg:col-span-4">
          <h2 className="text-lg font-semibold mb-4">Yield Predictions</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="prediction" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="prediction"
                  stroke="hsl(var(--primary))"
                  fill="url(#prediction)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {alerts.map((alert, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-3 rounded-lg bg-secondary/50"
              >
                <div className="p-2 rounded-full bg-secondary">
                  <alert.icon className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-medium">{alert.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {alert.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}