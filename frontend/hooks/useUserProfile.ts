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
      setUser(response.data.profile);
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