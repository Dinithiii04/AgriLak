"use client";

import { useUserProfile } from "@/hooks/useUserProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, LogOut, Mail, User as UserIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, isLoading, error } = useUserProfile();
  const { logout } = useAuth()

  return (
    <div className="container max-w-[1000px] py-8 space-y-8">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="images/profile.png" />
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
            <Button variant="outline" size="sm" className="flex items-center gap-2 " onClick={logout}>
              <LogOut className="h-4 w-4" />
              logout
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Prediction History Card */}
      <Card>
        <CardHeader>
          <CardTitle>Prediction History</CardTitle>
          <CardDescription>
            Your recent fertilizer predictions and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-center text-muted-foreground">Loading prediction history...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : !user?.predictions || user.predictions.length === 0 ? (
            <div className="flex justify-center">
              <Badge variant="outline" className="text-muted-foreground">
                No prediction history found
              </Badge>
            </div>
          ) : (
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
                {user.predictions.map((prediction, index) => (
                  <TableRow key={index}>
                    <TableCell>{prediction.created_at ? new Date(prediction.created_at).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell>{prediction.Nitrogen}</TableCell>
                    <TableCell>{prediction.Phosphorus}</TableCell>
                    <TableCell>{prediction.Potassium}</TableCell>
                    <TableCell>{prediction.pH}</TableCell>
                    <TableCell>{prediction.Rainfall}</TableCell>
                    <TableCell>{prediction.Temperature}</TableCell>
                    <TableCell className="font-medium">
                      {prediction.recommended_fertilizer}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
