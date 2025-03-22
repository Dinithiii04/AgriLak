// useGwetTopData.ts
import { GwetTopResponse, MonthlySoilMoisture } from "@/types";
import { useState, useEffect } from "react";

  
  const API_URL = "https://power.larc.nasa.gov/api/temporal/monthly/point?start=2001&end=2023&latitude=7.9147&longitude=81.0001&community=ag&parameters=GWETTOP&header=true";
  
  const monthMap: Record<string, string> = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
    "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
    "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
  };
  
  export const useGwetTopData = () => {
    const [data, setData] = useState<MonthlySoilMoisture[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(API_URL);
          const result: GwetTopResponse = await response.json();
          const gwetData = result.properties.parameter.GWETTOP;
  
          const formattedData = Object.entries(gwetData).map(([key, value]) => ({
            month: monthMap[key.slice(-2)], // Extract last two digits as month
            moisture: value
          }));
  
          setData(formattedData);
        } catch (err) {
          setError("Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { data, loading, error };
  };
  