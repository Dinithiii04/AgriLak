import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface UserProfile {
  username: string;
  email: string;
  created_at: string;
  predictions: Prediction[];
  irrigationHistory: IrrigationHistory[];
}

interface Prediction {     
  Nitrogen: number;
  Phosphorus: number;
  Potassium: number;
  pH: number;
  Rainfall: number;
  Temperature: number;
  recommended_fertilizer: string;
  created_at: string | null;
}

interface IrrigationHistory {
  inputDate: string; 
  temperature: number; 
  temperatureRange: number; 
  relativeHumidity: number; 
  soilMoisture: number; 
  rainfall: number; 
  dewPoint: number; 
  recommendedIrrigationPlan: string;  
}

interface UseUserProfileOptions {
  lazy?: boolean;
}

export const useUserProfile = (options?: UseUserProfileOptions) => {
  const { lazy } = options || {};
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(lazy ? false : true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/user/profile");
      const profile = response.data.profile;

      // Check if irrigationHistory exists before mapping
      const formattedIrrigationHistory = profile.irrigationHistory
        ? profile.irrigationHistory.map((entry: any) => ({
            inputDate: entry.Input_date, 
            temperature: entry.Temperature,
            temperatureRange: entry.Temperature_Range,
            relativeHumidity: entry.Relative_humidity,
            soilMoisture: entry.Soil_moisture,
            rainfall: entry.Rainfall,
            dewPoint: entry.Dew_point,
            recommendedIrrigationPlan: entry.Recommended_Irrigation_plan,
        
          }))
        : [];

      setUser({ ...profile, irrigationHistory: formattedIrrigationHistory });
    } catch (err: any) { 
      console.error("Error fetching profile:", err); 
      setError("Failed to load profile. Please try again."); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!lazy) {
      fetchUserProfile();
    }
  }, [lazy]);

  return { user, isLoading, error, fetchUserProfile };
};
