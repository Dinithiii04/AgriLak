"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Leaf as Plant,
  LineChart,
  FlaskRound as Flask,
  Droplets,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  PanelLeftClose,
  PanelLeft,
  User,
  FireExtinguisher,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/context/AuthContext"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LineChart },
  { name: "Yield Prediction", href: "/yield-prediction", icon: Plant },
  { name: "Disease Detection", href: "/disease-detection", icon: Flask },
  { name: "Fertilizer", href: "/fertilizer-prediction", icon: FireExtinguisher },
  { name: "Irrigation", href: "/irrigation-optimization", icon: Droplets },
]

const bottomNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Help", href: "/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { logout } = useAuth()
  return (
    <>
      <div
        className={cn(
          "flex h-screen flex-col fixed left-0 top-0 border-r bg-card transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex h-16 items-center gap-2 px-4 border-b">
          <Plant className="h-6 w-6 text-primary flex-shrink-0" />
          {!isCollapsed && <span className="font-bold text-xl">AgriLak</span>}
        </div>

        <div className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "sidebar-link",
                  isActive && "active",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 space-y-4">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "sidebar-link",
                pathname === item.href && "active",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && item.name}
            </Link>
          ))}

          <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            {!isCollapsed && (
              <>
                <Moon className="h-4 w-4" />
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto h-8 w-8"
                  onClick={() => setIsCollapsed(true)}
                >
                  <PanelLeftClose className="h-4 w-4" />
                </Button>
                
                
              </>
            )}
            {isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsCollapsed(false)}
              >
                <PanelLeft className="h-4 w-4" />
              </Button>
            )}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={logout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            
          </div>
        </div>
      </div>
      <div
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <main className="flex-1">{/* Content */}</main>
      </div>
    </>
  )
}