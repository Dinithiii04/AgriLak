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
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

// Define schema for form validation
const formSchema = z.object({
  Aug_Tmax: z.string().min(1, "Required"),
  Aug_RH: z.string().min(1, "Required"),
  Sep_RH: z.string().min(1, "Required"),
  Oct_SRAD: z.string().min(1, "Required"),
  Nov_SRAD: z.string().min(1, "Required"),
  Dec_SRAD: z.string().min(1, "Required"),
  Dec_RH: z.string().min(1, "Required"),
  Dec_Rain: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof formSchema>;

interface ApiResponse {
  predicted_class: string;
  confidence: number;
}

const customLabels: { [key in keyof FormValues]: string } = {
  Aug_Tmax: "August Max Temperature (\u00b0C)",
  Aug_RH: "August Relative Humidity (%)",
  Sep_RH: "September Relative Humidity (%)",
  Oct_SRAD: "October Solar Radiation (MJ/m\u00b2/day)",
  Nov_SRAD: "November Solar Radiation (MJ/m\u00b2/day)",
  Dec_SRAD: "December Solar Radiation (MJ/m\u00b2/day)",
  Dec_RH: "December Relative Humidity (%)",
  Dec_Rain: "December Rainfall (mm, Monthly Sum)",
};

const fieldOrder: (keyof FormValues)[] = [
  "Aug_Tmax", "Aug_RH", "Sep_RH",
  "Oct_SRAD", "Nov_SRAD", "Dec_SRAD",
  "Dec_RH", "Dec_Rain"
];

export default function PaddyYieldPredictionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Aug_Tmax: "",
      Aug_RH: "",
      Sep_RH: "",
      Oct_SRAD: "",
      Nov_SRAD: "",
      Dec_SRAD: "",
      Dec_RH: "",
      Dec_Rain: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestData = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, parseFloat(value)])
      );

      const response = await axiosInstance.post<ApiResponse>("/yield/predict", requestData);
      setResult(response.data);
    } catch (err: any) {
      console.error("Error fetching prediction:", err);
      setError(err.response?.data?.error || "Failed to fetch prediction. Please try again.");
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
            <CardTitle>Paddy Yield Prediction</CardTitle>
            <CardDescription>The model classified your expected yield as:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-primary/10 rounded-lg">
              <h3 className="text-3xl font-bold text-primary mb-2">
                {result.predicted_class}
              </h3>
              <div className="text-sm text-muted-foreground">
                Confidence: {result.confidence}%
              </div>
            </div>

            {/* Show the range dynamically based on the prediction */}
            <div className="p-4 bg-gray-900/10 rounded-lg">
              <h4 className="text-lg font-semibold">Yield Range for {result.predicted_class}:</h4>
              <p className="text-sm text-muted-foreground mt-2">
                {result.predicted_class === "Low" && "1547.00 to 3223.00 kg/ha"}
                {result.predicted_class === "Medium" && "3223.00 to 4899.00 kg/ha"}
                {result.predicted_class === "High" && "4899.00 to 6575.00 kg/ha"}
                {result.predicted_class === "Uncertain" && "Confidence too low to classify"}
              </p>
            </div>
          </CardContent>

        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-[1000px] py-12">
      <h1 className="text-3xl font-bold">Paddy Yield Classification</h1>
      <p className="text-muted-foreground mt-2">
        Provide the relevant weather parameters of the Maha cultivation season to classify the expected paddy yield.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Input Weather Parameters</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 grid-cols-2">
              {fieldOrder.map((key) => (
                <FormField key={key} control={form.control} name={key} render={({ field }) => (
                  <FormItem>
                    <FormLabel>{customLabels[key]}</FormLabel>
                    <FormControl>
                      <Input placeholder={`Enter ${customLabels[key]}`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}/>
              ))}
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Classify Yield"}
          </Button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
