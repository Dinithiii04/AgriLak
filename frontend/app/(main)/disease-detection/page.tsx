"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Loader2, Upload, XCircle } from "lucide-react";

export default function DiseaseRecognition() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<{ predicted_class: string; confidence: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setError(null);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
    setPrediction(null);
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      setError("⚠️ Please upload an image before proceeding.");
      return;
    }
    setError(null);
    setLoading(true);
    setPrediction(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(response.data);
    } catch (err) {
      setError("❌ Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-lg py-10">
      <h1 className="text-3xl font-bold text-center">🌾 Paddy Disease Recognition</h1>
      <p className="text-center text-muted-foreground mt-2">
        Upload an image of a rice leaf to detect potential diseases.
      </p>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Upload an Image</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            {preview ? (
              <div className="relative w-full max-w-xs">
                <Image
                  src={preview}
                  alt="Uploaded Image"
                  width={300}
                  height={300}
                  className="rounded-lg shadow-md"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition"
                >
                  <XCircle size={18} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition"
              >
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag & drop</p>
                <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>

          <Button
            onClick={handlePredict}
            className="mt-4 w-full"
            disabled={loading || !selectedFile}
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : "🔍 Predict"}
          </Button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </CardContent>
      </Card>

      {prediction && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>📊 Prediction Result</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg font-semibold">
              Disease: <span className="text-green-600">{prediction.predicted_class}</span>
            </p>
            <p className="text-muted-foreground">
              Confidence: <span className="font-medium">{(parseFloat(prediction.confidence) * 100).toFixed(2)}%</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
