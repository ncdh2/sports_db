// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { DashboardNav } from "@/components/dashboard-nav";
// import { ProtectedRoute } from "@/components/protected-route";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Athlete } from "@/lib/types";
// import { ArrowLeft, Mail, Phone, MapPin, Trophy, User } from "lucide-react";
// import Link from "next/link";

// export default function AthleteDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const id = params.id as string;

//   const [athlete, setAthlete] = useState<Athlete | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchAthlete();
//   }, [id]);

//   async function fetchAthlete() {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/athletes/${id}`);
//       if (!response.ok) throw new Error("Failed to fetch athlete");
//       const data = await response.json();
//       setAthlete(data.athlete);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to fetch athlete");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <ProtectedRoute>
//       <div className="flex">
//         <DashboardNav />
//         <div className="flex-1 bg-background">
//           <div className="p-8 max-w-4xl">
//             {/* Header */}
//             <div className="mb-8 flex items-center gap-4">
//               <Link href="/dashboard/athletes">
//                 <Button variant="ghost" size="icon">
//                   <ArrowLeft className="w-4 h-4" />
//                 </Button>
//               </Link>
//               <div>
//                 <h1 className="text-3xl font-bold">Athlete Profile</h1>
//                 <p className="text-muted-foreground">
//                   View and manage athlete information
//                 </p>
//               </div>
//             </div>

//             {loading ? (
//               <div className="text-center py-12">
//                 <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
//                 <p className="text-muted-foreground">Loading athlete...</p>
//               </div>
//             ) : error ? (
//               <Card className="border-destructive">
//                 <CardContent className="pt-6">
//                   <p className="text-destructive">{error}</p>
//                 </CardContent>
//               </Card>
//             ) : athlete ? (
//               <div className="space-y-6">
//                 {/* Basic Info Card */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <User className="w-5 h-5" />
//                       Personal Information
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <p className="text-sm text-muted-foreground">
//                           Full Name
//                         </p>
//                         <p className="text-lg font-semibold">
//                           {athlete.firstName} {athlete.lastName}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground">Status</p>
//                         <span
//                           className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
//                             athlete.status === "Active"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-gray-100 text-gray-700"
//                           }`}
//                         >
//                           {athlete.status}
//                         </span>
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                           <Mail className="w-4 h-4" /> Email
//                         </p>
//                         <p className="text-lg font-semibold">{athlete.email}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                           <Phone className="w-4 h-4" /> Phone
//                         </p>
//                         <p className="text-lg font-semibold">{athlete.phone}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground">Gender</p>
//                         <p className="text-lg font-semibold">
//                           {athlete.gender}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground">
//                           Nationality
//                         </p>
//                         <p className="text-lg font-semibold">
//                           {athlete.nationality}
//                         </p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Location & Sports */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <MapPin className="w-5 h-5" />
//                       Location & Sports
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <p className="text-sm text-muted-foreground">State</p>
//                         <p className="text-lg font-semibold">{athlete.state}</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground">
//                           Date of Birth
//                         </p>
//                         <p className="text-lg font-semibold">
//                           {new Date(athlete.dateOfBirth).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="md:col-span-2">
//                         <p className="text-sm text-muted-foreground mb-2">
//                           Sports
//                         </p>
//                         <div className="flex flex-wrap gap-2">
//                           {athlete.sports?.map((sport, idx) => (
//                             <span
//                               key={idx}
//                               className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
//                             >
//                               {sport}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Achievements & Records */}
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Trophy className="w-5 h-5" />
//                       Achievements & Personal Bests
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {athlete.achievements && athlete.achievements.length > 0 ? (
//                       <div>
//                         <p className="text-sm text-muted-foreground mb-3">
//                           Achievements
//                         </p>
//                         <ul className="space-y-2 mb-6">
//                           {athlete.achievements.map((achievement, idx) => (
//                             <li key={idx} className="flex items-start gap-2">
//                               <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
//                               <span className="font-medium">{achievement}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ) : null}

//                     {athlete.personalBests &&
//                     Object.keys(athlete.personalBests).length > 0 ? (
//                       <div>
//                         <p className="text-sm text-muted-foreground mb-3">
//                           Personal Bests
//                         </p>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           {Object.entries(athlete.personalBests).map(
//                             ([event, record]) => (
//                               <div
//                                 key={event}
//                                 className="bg-muted p-3 rounded-lg"
//                               >
//                                 <p className="text-sm text-muted-foreground">
//                                   {event}
//                                 </p>
//                                 <p className="font-semibold text-lg">
//                                   {record}
//                                 </p>
//                               </div>
//                             ),
//                           )}
//                         </div>
//                       </div>
//                     ) : null}

//                     {(!athlete.achievements ||
//                       athlete.achievements.length === 0) &&
//                       (!athlete.personalBests ||
//                         Object.keys(athlete.personalBests).length === 0) && (
//                         <p className="text-muted-foreground">
//                           No achievements or records added yet
//                         </p>
//                       )}
//                   </CardContent>
//                 </Card>

//                 {/* Bio */}
//                 {athlete.bio && (
//                   <Card>
//                     <CardHeader>
//                       <CardTitle>Biography</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p className="text-muted-foreground whitespace-pre-wrap">
//                         {athlete.bio}
//                       </p>
//                     </CardContent>
//                   </Card>
//                 )}

//                 {/* Actions */}
//                 <div className="flex gap-3">
//                   <Link href={`/dashboard/athletes/${id}/edit`}>
//                     <Button>Edit Profile</Button>
//                   </Link>
//                   <Button variant="outline" onClick={() => router.back()}>
//                     Go Back
//                   </Button>
//                 </div>
//               </div>
//             ) : null}
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { DashboardNav } from "@/components/dashboard-nav";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Athlete } from "@/lib/types";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Trophy,
  User,
  Camera,
} from "lucide-react";
import Link from "next/link";

export default function AthleteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [athlete, setAthlete] = useState<Athlete | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAthlete();
  }, [id]);

  async function fetchAthlete() {
    try {
      setLoading(true);
      const response = await fetch(`/api/athletes/${id}`);
      if (!response.ok) throw new Error("Failed to fetch athlete");
      const data = await response.json();
      setAthlete(data.athlete);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch athlete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 bg-background">
          <div className="p-8 max-w-4xl">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <Link href="/dashboard/athletes">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Athlete Profile</h1>
                <p className="text-muted-foreground">
                  View and manage athlete information
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading athlete...</p>
              </div>
            ) : error ? (
              <Card className="border-destructive">
                <CardContent className="pt-6">
                  <p className="text-destructive">{error}</p>
                </CardContent>
              </Card>
            ) : athlete ? (
              <div className="space-y-6">
                {/* Profile Image Card */}
                {athlete.photo && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="relative w-full h-96 rounded-lg overflow-hidden">
                        <Image
                          src={athlete.photo}
                          alt={`${athlete.firstName} ${athlete.lastName}`}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Basic Info Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Full Name
                        </p>
                        <p className="text-lg font-semibold">
                          {athlete.firstName} {athlete.lastName}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <span
                          className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                            athlete.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {athlete.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="w-4 h-4" /> Email
                        </p>
                        <p className="text-lg font-semibold">{athlete.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-4 h-4" /> Phone
                        </p>
                        <p className="text-lg font-semibold">{athlete.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="text-lg font-semibold">
                          {athlete.gender}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Nationality
                        </p>
                        <p className="text-lg font-semibold">
                          {athlete.nationality}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Location & Sports */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Location & Sports
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">State</p>
                        <p className="text-lg font-semibold">{athlete.state}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Date of Birth
                        </p>
                        <p className="text-lg font-semibold">
                          {new Date(athlete.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          Sports
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {athlete.sports?.map((sport, idx) => (
                            <span
                              key={idx}
                              className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements & Records */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Achievements & Personal Bests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {athlete.achievements && athlete.achievements.length > 0 ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Achievements
                        </p>
                        <ul className="space-y-2 mb-6">
                          {athlete.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                              <span className="font-medium">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {athlete.personalBests &&
                    Object.keys(athlete.personalBests).length > 0 ? (
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Personal Bests
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(athlete.personalBests).map(
                            ([event, record]) => (
                              <div
                                key={event}
                                className="bg-muted p-3 rounded-lg"
                              >
                                <p className="text-sm text-muted-foreground">
                                  {event}
                                </p>
                                <p className="font-semibold text-lg">
                                  {record}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ) : null}

                    {(!athlete.achievements ||
                      athlete.achievements.length === 0) &&
                      (!athlete.personalBests ||
                        Object.keys(athlete.personalBests).length === 0) && (
                        <p className="text-muted-foreground">
                          No achievements or records added yet
                        </p>
                      )}
                  </CardContent>
                </Card>

                {/* Bio */}
                {athlete.bio && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Biography</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {athlete.bio}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Link href={`/dashboard/athletes/${id}/edit`}>
                    <Button>Edit Profile</Button>
                  </Link>
                  <Button variant="outline" onClick={() => router.back()}>
                    Go Back
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
