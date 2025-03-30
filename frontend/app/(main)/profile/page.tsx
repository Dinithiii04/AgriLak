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
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useState } from "react";

export default function ProfilePage() {
  const { user, isLoading, error } = useUserProfile();
  const { logout } = useAuth();

  // State to manage which table is displayed
  const [activeTable, setActiveTable] = useState<'irrigation' | 'fertilizer' | 'disease'>('fertilizer');

  // Switch between Irrigation History and Fertilizer Recommendation History
  const handleTableChange = (table: 'irrigation' | 'fertilizer'| 'disease') => {
    setActiveTable(table);
  };

  return (
    <div className="container max-w-[1000px] py-8 space-y-8">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-8">
              <Avatar className="h-20 w-20">
                <AvatarImage src="images/ppl.jpg" />
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
                      Officer
                    </div>
                  </>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={logout}>
              <LogOut className="h-6 w-6" />
              logout
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Button to switch between Irrigation and Fertilizer Recommendations */}
      <div className="flex gap-4">
      <Button variant={activeTable === 'disease' ? 'default' : 'outline'} onClick={() => handleTableChange('disease')}>
          Disease Detection
        </Button>
      <Button variant={activeTable === 'fertilizer' ? 'default' : 'outline'} onClick={() => handleTableChange('fertilizer')}>
          Fertilizer Recommendation
      </Button>
      <Button variant={activeTable === 'irrigation' ? 'default' : 'outline'} onClick={() => handleTableChange('irrigation')}>
          Irrigation
      </Button>
      </div>

      {/* Table Card for Prediction History (Fertilizer Recommendation) */}
      {activeTable === 'fertilizer' && (
        <Card className="w-[1000px]">
          <CardHeader>
            <CardTitle>Fertilizer Recommendation History</CardTitle>
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
      )}

      {/* Table Card for Irrigation History */}
      {activeTable === 'irrigation' && (
        <Card>
          <CardHeader>
            <CardTitle>Irrigation History</CardTitle>
            <CardDescription>
              Your recent irrigation activities and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading irrigation history...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : !user?.irrigationHistory || user.irrigationHistory.length === 0 ? (
              <div className="flex justify-center">
                <Badge variant="outline" className="text-muted-foreground">
                  No irrigation history found
                </Badge>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4 whitespace-nowrap">Date</TableHead>
                    <TableHead>Temperature Range</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Relative Humidity</TableHead>
                    <TableHead>Soil Moisture</TableHead>
                    <TableHead>Rainfall</TableHead>
                    <TableHead>Dew Point</TableHead>
                    <TableHead>Recommended Irrigation Plan</TableHead>
                    
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {user.irrigationHistory.map((irrigationHistory,index) => (
                    <TableRow key={index}>
                      <TableCell className="px-4 whitespace-nowrap">{irrigationHistory.inputDate}</TableCell>
                      <TableCell>{irrigationHistory.temperature}</TableCell>
                      <TableCell>{irrigationHistory.temperatureRange}</TableCell>
                      <TableCell>{irrigationHistory.relativeHumidity}</TableCell>
                      <TableCell>{irrigationHistory.soilMoisture}</TableCell>
                      <TableCell>{irrigationHistory.rainfall}</TableCell>
                      <TableCell>{irrigationHistory.dewPoint}</TableCell>
                      <TableCell>{irrigationHistory.recommendedIrrigationPlan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}

{activeTable === 'disease' && (
  <Card>
    <CardHeader>
      <CardTitle>Disease Prediction History</CardTitle>
      <CardDescription>
        Your recent disease diagnosis predictions
      </CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <p className="text-center text-muted-foreground">Loading disease history...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : !user?.diseaseHistory || user.diseaseHistory.length === 0 ? (
        <div className="flex justify-center">
          <Badge variant="outline" className="text-muted-foreground">
            No disease history found
          </Badge>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Disease</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user.diseaseHistory.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(entry.created_at).toLocaleDateString()}</TableCell>
                <TableCell>{entry.disease}</TableCell>
                <TableCell>{(entry.confidence * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </CardContent>
  </Card>
)}

    </div>
  );
}