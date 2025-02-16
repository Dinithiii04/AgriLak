"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  image: z.instanceof(File, { message: "Please upload an image" })
});

type FormValues = z.infer<typeof formSchema>;

interface PredictionResult {
  disease: string;
  confidence: string;
  imageUrl: string;
}

export default function DiseaseDetectionPage() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", values.image);

      const response = await axiosInstance.post("/disease/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult({
        disease: response.data.disease,  // ✅ Updated key to match backend
        confidence: response.data.confidence,
        imageUrl: URL.createObjectURL(values.image),
      });
    } catch (err: any) {
      console.error("Error fetching prediction:", err);
      setError(err.response?.data?.error || "Failed to fetch prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setPreview(null);
    form.reset();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("image", file);
    }
  }

  return (
    <div className="container max-w-[800px] py-8">
      <h1 className="text-3xl font-bold">Paddy Disease Detection</h1>
      <p className="text-muted-foreground mt-2">
        Upload an image of the affected paddy leaves to detect diseases.
      </p>

      {result ? (
        <div className="space-y-8">
          <Button variant="ghost" className="flex items-center gap-2" onClick={handleReset}>
            <ArrowLeft className="h-4 w-4" /> Back to Upload
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Result</CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={result.imageUrl}
                alt="Uploaded prediction"
                className="rounded-lg max-w-[300px] h-auto mb-4 mx-auto"
              />
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <h3 className="text-3xl font-bold text-primary mb-2">
                  {result.disease}
                </h3>
                <div className="text-sm text-muted-foreground">
                  Confidence: {result.confidence}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload Image</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Leaf Image</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                      </FormControl>
                      {preview && (
                        <img
                          src={preview}
                          alt="Uploaded preview"
                          className="mt-4 rounded-lg max-w-[300px] h-auto mx-auto"
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Get Prediction"}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        </Form>
      )}
    </div>
  );
}
