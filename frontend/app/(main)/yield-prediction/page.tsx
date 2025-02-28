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
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  Aug_RH: z.string().min(1, "Required"),
  Aug_Rain: z.string().min(1, "Required"),
  Aug_SRAD: z.string().min(1, "Required"),
  Jan_SRAD: z.string().min(1, "Required"),
  Nov_Rain: z.string().min(1, "Required"),
  Oct_SRAD: z.string().min(1, "Required"),
  Sep_SRAD: z.string().min(1, "Required"),
  Sep_Wind: z.string().min(1, "Required"),
  District: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof formSchema>;

const customLabels: { [key in keyof FormValues]: string } = {
  Aug_RH: "August Relative Humidity (%)",
  Aug_Rain: "August Rainfall (mm, Monthly Sum)",
  Aug_SRAD: "August Solar Radiation (MJ/m²/day)",
  Jan_SRAD: "January Solar Radiation (MJ/m²/day)",
  Nov_Rain: "November Rainfall (mm, Monthly Sum)",
  Oct_SRAD: "October Solar Radiation (MJ/m²/day)",
  Sep_SRAD: "September Solar Radiation (MJ/m²/day)",
  Sep_Wind: "September Wind Speed (m/s)",
  District: "Select District",
};

const districtMapping = {
  "AMPARA": [1, 0, 0, 0],
  "ANURADHAPURA": [0, 1, 0, 0],
  "HAMBANTOTA": [0, 0, 1, 0],
  "POLONNARUWA": [0, 0, 0, 1]
};

const fieldOrder: (keyof FormValues)[] = [
  "District",
  "Aug_RH", "Aug_Rain", "Aug_SRAD",
  "Sep_SRAD", "Sep_Wind",
  "Oct_SRAD",
  "Nov_Rain",
  "Jan_SRAD"
];

export default function PaddyYieldPredictionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Aug_RH: "",
      Aug_Rain: "",
      Aug_SRAD: "",
      Jan_SRAD: "",
      Nov_Rain: "",
      Oct_SRAD: "",
      Sep_SRAD: "",
      Sep_Wind: "",
      District: "POLONNARUWA",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    try {
      const districtOneHot = districtMapping[values.District as keyof typeof districtMapping] || [0, 0, 0, 1];

      const requestData = {
        ...Object.fromEntries(
          Object.entries(values).map(([key, value]) => [key, key === 'District' ? value : parseFloat(value)])
        ),
        District_AMPARA: districtOneHot[0],
        District_ANURADHAPURA: districtOneHot[1],
        District_HAMBANTOTA: districtOneHot[2],
        District_POLONNARUWA: districtOneHot[3],
      };

      await axiosInstance.post("/yield/predict", requestData);
    } catch (err: any) {
      console.error("Error fetching prediction result:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.error || "Failed to fetch prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container max-w-[1000px] py-12">
      <h1 className="text-3xl font-bold">Paddy Yield Prediction</h1>
      <p className="text-muted-foreground mt-2">Provide the relevant weather parameters of Maha cultivation season to accurately predict the paddy yield. Make sure the values are in the correct units as specified below.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Weather Parameters for Maha Season</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 grid-cols-2">
              <div className="col-span-1">
                <FormField
                  key="District"
                  control={form.control}
                  name="District"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customLabels["District"]}</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a district" />
                          </SelectTrigger>
                          <SelectContent>
                            {["AMPARA", "ANURADHAPURA", "HAMBANTOTA", "POLONNARUWA"].map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1"></div>
              {fieldOrder.filter(key => key !== "District").map((key) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{customLabels[key]}</FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter ${customLabels[key]}`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
          </Card>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Processing..." : "Predict Paddy Yield"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </Form>
    </div>
  );
}