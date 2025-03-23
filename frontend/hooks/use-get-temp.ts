import { useState, useEffect } from "react";
import { T2MResponse, MonthlyTemperature } from "@/types";

const API_URL = "https://power.larc.nasa.gov/api/temporal/monthly/point?start=2021&end=2023&latitude=7.9147&longitude=81.0001&community=ag&parameters=T2M&header=true";

const monthMap: Record<string, string> = {
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
  "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec"
};

export const useT2MData = () => {
  const [tempData, setTempData] = useState<MonthlyTemperature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result: T2MResponse = await response.json();
        const tempValues = result.properties.parameter.T2M;

        const formattedData = Object.entries(tempValues).map(([key, value]) => ({
          month: monthMap[key.slice(-2)], 
          temp: value
        }));

        setTempData(formattedData);
      } catch (err) {
        setError("Failed to fetch temperature data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tempData, loading, error };
};
