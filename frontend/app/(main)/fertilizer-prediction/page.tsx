"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowLeft, Droplets, Thermometer, FlaskRound as Flask } from "lucide-react"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts"

const formSchema = z.object({
  nitrogen: z.string().min(1, "Required"),
  phosphorus: z.string().min(1, "Required"),
  potassium: z.string().min(1, "Required"),
  temperature: z.string().min(1, "Required"),
  humidity: z.string().min(1, "Required"),
  ph: z.string().min(1, "Required"),
  rainfall: z.string().min(1, "Required"),
})

type FormValues = z.infer<typeof formSchema>

interface PredictionResult {
  inputs: FormValues
  recommendation: string
  confidence: number
  details: string
}

export default function FertilizerPredictionPage() {
  const [result, setResult] = useState<PredictionResult | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
    },
  })

  function onSubmit(values: FormValues) {
    // Simulate prediction
    setResult({
      inputs: values,
      recommendation: "NPK 15-15-15",
      confidence: 92,
      details: "Based on your soil composition and environmental conditions, we recommend using NPK 15-15-15 fertilizer. This balanced fertilizer will provide essential nutrients for optimal plant growth.",
    })
  }

  function handleReset() {
    setResult(null)
    form.reset()
  }

  if (result) {
    const radarData = [
      { subject: 'Nitrogen', value: parseFloat(result.inputs.nitrogen) },
      { subject: 'Phosphorus', value: parseFloat(result.inputs.phosphorus) },
      { subject: 'Potassium', value: parseFloat(result.inputs.potassium) },
    ]

    const environmentalData = [
      {
        label: "Temperature",
        value: `${result.inputs.temperature}°C`,
        icon: Thermometer,
      },
      {
        label: "Humidity",
        value: `${result.inputs.humidity}%`,
        icon: Droplets,
      },
      {
        label: "pH Level",
        value: result.inputs.ph,
        icon: Flask,
      },
      {
        label: "Rainfall",
        value: `${result.inputs.rainfall}mm`,
        icon: Droplets,
      },
    ]

    return (
      <div className="container max-w-[1000px] py-8 space-y-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={handleReset}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recommendation</CardTitle>
              <CardDescription>Based on your soil analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {result.recommendation}
                </h3>
                <div className="text-sm text-muted-foreground">
                  {result.confidence}% confidence
                </div>
              </div>
              <p className="text-muted-foreground">
                {result.details}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nutrient Composition</CardTitle>
              <CardDescription>NPK levels in your soil</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <Radar
                      name="NPK Levels"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Environmental Conditions</CardTitle>
              <CardDescription>Current conditions affecting fertilizer effectiveness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
                {environmentalData.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg"
                  >
                    <div className="p-3 bg-secondary rounded-full mb-3">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold mt-1">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-[800px] py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Fertilizer Prediction</h1>
        <p className="text-muted-foreground mt-2">
          Enter your soil and environmental parameters to get personalized fertilizer recommendations.
        </p>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Soil Parameters</CardTitle>
                <CardDescription>
                  Enter the nutrient levels in your soil
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="nitrogen"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nitrogen (N)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 40" {...field} />
                        </FormControl>
                        <FormDescription>mg/kg</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phosphorus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phosphorus (P)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 35" {...field} />
                        </FormControl>
                        <FormDescription>mg/kg</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="potassium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potassium (K)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 45" {...field} />
                        </FormControl>
                        <FormDescription>mg/kg</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ph"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>pH Level</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 6.5" {...field} />
                        </FormControl>
                        <FormDescription>pH scale</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Conditions</CardTitle>
                <CardDescription>
                  Enter the current environmental parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 25" {...field} />
                        </FormControl>
                        <FormDescription>°C</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="humidity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Humidity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 65" {...field} />
                        </FormControl>
                        <FormDescription>%</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rainfall"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rainfall</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 200" {...field} />
                        </FormControl>
                        <FormDescription>mm</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full">
              Get Prediction
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}