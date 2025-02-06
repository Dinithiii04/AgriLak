import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plane as Plant } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-8 px-4 text-center">
      <div className="space-y-4">
        <Plant className="mx-auto h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Smart Paddy Management System
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Empowering Sri Lankan agriculture with AI-driven insights for better paddy farming decisions.
        </p>
      </div>
      <div className="flex flex-col gap-4 min-[400px]:flex-row">
        <Link href="/signup">
          <Button size="lg" className="w-full min-[400px]:w-auto">
            Get Started
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
            View Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}