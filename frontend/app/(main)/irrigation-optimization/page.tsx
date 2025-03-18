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
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  date: z.string().min(1, "Required"),  
  Rainfall: z.string().min(1, "Required"), 
});

type FormValues = z.infer<typeof formSchema>;

interface PredictionResult {
  inputs: FormValues;
  recommendation: string;
  confidence: number;
  details: string;
}

export default function IrrigationOptimizationPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      Rainfall: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestData = {
        date: values.date,
        Rainfall: parseFloat(values.Rainfall),
      };

      const response = await axiosInstance.post("/irrigation/predict", requestData);
      const irrigationPlan = response.data.prediction;
      const confidenceScore = response.data.confidence;
      setResult({
        inputs: values,
        recommendation: irrigationPlan,
        confidence: confidenceScore,
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
      </div>
    );
  }

  return (
    <div className="container max-w-[800px] py-12">
      <h1 className="text-3xl font-bold">Irrigation Optimization</h1>
      <p className="text-muted-foreground mt-2">Enter date and rainfall to optimize irrigation.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Input Parameters</CardTitle>
            </CardHeader>
            <CardContent>
            
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter date (YYYYMMDD)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="Rainfall"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rainfall (mm)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Rainfall" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
