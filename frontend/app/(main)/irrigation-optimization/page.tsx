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


const formSchema = z.object({
  T2M: z.string().min(1, "Required"),
  T2M_RANGE: z.string().min(1, "Required"),
  T2MDEW: z.string().min(1, "Required"),
  RH2M: z.string().min(1, "Required"),
  soil_moisture: z.string().min(1, "Required"),
  Rainfall: z.string().min(1, "Required"),
  Month: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof formSchema>;

interface PredictionResult {
  inputs: FormValues;
  recommendation: string;
  confidence: number; //
  details: string;
}

export default function IrrigationOptimizationPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      T2M: "",
      T2M_RANGE: "",
      T2MDEW: "",
      RH2M: "",
      soil_moisture: "",
      Rainfall: "",
      Month: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestData = {
        T2M: parseFloat(values.T2M),
        T2M_RANGE: parseFloat(values.T2M_RANGE),
        T2MDEW: parseFloat(values.T2MDEW),
        RH2M: parseFloat(values.RH2M),
        soil_moisture: parseFloat(values.soil_moisture),
        Rainfall: parseFloat(values.Rainfall),
        Month: values.Month,
      };

      const response = await axiosInstance.post("/irrigation/predict", requestData);
      const irrigationPlan = response.data.irrigation_plan;
//
      setResult({
        inputs: values,
        recommendation: irrigationPlan,
        confidence: 90,
        details: `Based on the environmental conditions and soil moisture, the recommended irrigation strategy is: ${irrigationPlan}.`,
      });
    } catch (err: any) {
      console.error("Error fetching optimization result:", err);
      setError("Failed to fetch irrigation plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    form.reset();
  }

  if (result) {
    return (
      <div className="container max-w-[1000px] py-8 space-y-8">
        <Button variant="ghost" className="flex items-center gap-2" onClick={handleReset}>
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Irrigation Plan</CardTitle>
            <CardDescription>Based on your soil and climate data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-primary/10 rounded-lg">
              <h3 className="text-3xl font-bold text-primary mb-2">{result.recommendation}</h3>
              <div className="text-sm text-muted-foreground">{result.confidence}% confidence</div>
            </div>
            <p className="text-muted-foreground">{result.details}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-[800px] py-8">
      <h1 className="text-3xl font-bold">Irrigation Optimization</h1>
      <p className="text-muted-foreground mt-2">Enter environmental and soil parameters to optimize irrigation.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Environmental & Soil Parameters</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 grid-cols-2">
              {Object.keys(formSchema.shape).map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key as keyof FormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key.replace(/_/g, " ")}</FormLabel>
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
            {isLoading ? "Processing..." : "Optimize Irrigation"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
