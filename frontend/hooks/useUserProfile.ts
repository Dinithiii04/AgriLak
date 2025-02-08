import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface UserProfile {
  username: string;
  email: string;
  created_at: string;
  predictions: Prediction[];
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

export const useUserProfile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data.profile);
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return { user, isLoading, error };
};
