"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axiosInstance from "@/lib/axios"
import { Edit, Mail, User as UserIcon } from "lucide-react"
import { useEffect, useState } from "react"

interface UserProfile {
  username: string;
  email: string;
  created_at: string;
}

const predictionHistory = [
  {
    id: 1,
    date: "2024-03-15",
    inputs: {
      nitrogen: "40",
      phosphorus: "35",
      potassium: "45",
      ph: "6.5",
      rainfall: "200",
      temperature: "25",
    },
    recommendation: "NPK 15-15-15",
  },
  {
    id: 2,
    date: "2024-03-10",
    inputs: {
      nitrogen: "30",
      phosphorus: "45",
      potassium: "35",
      ph: "7.0",
      rainfall: "150",
      temperature: "28",
    },
    recommendation: "Urea",
  },
]

export default function ProfilePage() {
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

  return (
    <div className="container max-w-[1000px] py-8 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80" />
                <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                {isLoading ? (
                  <CardTitle className="text-2xl">Loading...</CardTitle>
                ) : error ? (
                  <CardTitle className="text-2xl text-red-500">{error}</CardTitle>
                ) : (
                  <>
                    <CardTitle className="text-2xl capitalize">{user?.username}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Mail className="h-4 w-4" />
                      {user?.email}
                    </CardDescription>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <UserIcon className="h-4 w-4" />
                      Farmer
                    </div>
                  </>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prediction History</CardTitle>
          <CardDescription>
            Your recent fertilizer predictions and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Nitrogen</TableHead>
                <TableHead>Phosphorus</TableHead>
                <TableHead>Potassium</TableHead>
                <TableHead>pH</TableHead>
                <TableHead>Rainfall</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Recommendation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictionHistory.map((prediction) => (
                <TableRow key={prediction.id}>
                  <TableCell>{prediction.date}</TableCell>
                  <TableCell>{prediction.inputs.nitrogen}</TableCell>
                  <TableCell>{prediction.inputs.phosphorus}</TableCell>
                  <TableCell>{prediction.inputs.potassium}</TableCell>
                  <TableCell>{prediction.inputs.ph}</TableCell>
                  <TableCell>{prediction.inputs.rainfall}</TableCell>
                  <TableCell>{prediction.inputs.temperature}</TableCell>
                  <TableCell className="font-medium">
                    {prediction.recommendation}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}