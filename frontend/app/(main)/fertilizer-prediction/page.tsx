"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Droplets, Thermometer, FlaskRound as Flask } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";

// Zod schema for form validation
const formSchema = z.object({
  nitrogen: z.string().min(1, "Required"),
  phosphorus: z.string().min(1, "Required"),
  potassium: z.string().min(1, "Required"),
  temperature: z.string().min(1, "Required"),
  ph: z.string().min(1, "Required"),
  rainfall: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof formSchema>;

interface PredictionResult {
  inputs: FormValues;
  recommendation: string;
  confidence: string;
  details: string;
}

export default function FertilizerPredictionPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      ph: "",
      rainfall: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestData = {
        Nitrogen: parseFloat(values.nitrogen),
        Phosphorus: parseFloat(values.phosphorus),
        Potassium: parseFloat(values.potassium),
        pH: parseFloat(values.ph),
        Rainfall: parseFloat(values.rainfall),
        Temperature: parseFloat(values.temperature),
      };

      // Fetch data from API
      const response = await axiosInstance.post("/fertilizer/predict", requestData);

      // Extract values from API response
      const recommendedFertilizer = response.data.recommended_fertilizer;
      const confidenceScore = response.data.confidence; // Fetch confidence dynamically

      setResult({
        inputs: values,
        recommendation: recommendedFertilizer,
        confidence: confidenceScore, //Use actual confidence score
        details: `Based on your soil composition and environmental conditions, we recommend using ${recommendedFertilizer} fertilizer for optimal plant growth.`,
      });
    } catch (err: any) {
      console.error("Error fetching prediction:", err);
      setError("Failed to fetch recommendation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    form.reset();
  }

  if (result) {
    const radarData = [
      { subject: "Nitrogen", value: parseFloat(result.inputs.nitrogen) },
      { subject: "Phosphorus", value: parseFloat(result.inputs.phosphorus) },
      { subject: "Potassium", value: parseFloat(result.inputs.potassium) },
    ];

    const environmentalData = [
      { label: "Temperature", value: `${result.inputs.temperature}°C`, icon: Thermometer },
      { label: "pH Level", value: result.inputs.ph, icon: Flask },
      { label: "Rainfall", value: `${result.inputs.rainfall}mm`, icon: Droplets },
    ];

    return (
      <div className="container max-w-[1000px] py-8 space-y-8">
        <Button variant="ghost" className="flex items-center gap-2" onClick={handleReset}>
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
                  Confidence: {result.confidence}
                </div>
              </div>
              <p className="text-muted-foreground">{result.details}</p>
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
                    <Radar name="NPK Levels" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-[800px] py-8">
      <h1 className="text-3xl font-bold">Fertilizer Prediction</h1>
      <p className="text-muted-foreground mt-2">
        Enter your soil and environmental parameters to get personalized fertilizer recommendations.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Soil & Environmental Parameters</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 grid-cols-2">
              {Object.keys(formSchema.shape).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter ${key}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Get Prediction"}
          </Button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
