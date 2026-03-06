// "use client";

// import React from "react";
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
// import { useAuth } from "@/app/context/auth-context";
// import { Users, Trophy, MapPin, Shield } from "lucide-react";
// import Link from "next/link";

// export default function DashboardPage() {
//   const { isAdmin } = useAuth();

//   const stats = [
//     {
//       label: "Total Athletes",
//       value: "2,543",
//       icon: Users,
//       color: "bg-blue-100 text-blue-600",
//     },
//     {
//       label: "Active Competitions",
//       value: "14",
//       icon: Trophy,
//       color: "bg-yellow-100 text-yellow-600",
//     },
//     {
//       label: "Facilities",
//       value: "89",
//       icon: MapPin,
//       color: "bg-green-100 text-green-600",
//     },
//     {
//       label: "Federations",
//       value: "12",
//       icon: Shield,
//       color: "bg-purple-100 text-purple-600",
//     },
//   ];

//   return (
//     <ProtectedRoute>
//       <div className="flex">
//         <DashboardNav />
//         <div className="flex-1 bg-background">
//           <div className="p-8">
//             {/* Header */}
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
//               <p className="text-muted-foreground">
//                 Welcome back to Sports Nigeria Management System
//               </p>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//               {stats.map((stat, index) => {
//                 const Icon = stat.icon;
//                 return (
//                   <Card
//                     key={index}
//                     className="hover:shadow-lg transition-shadow"
//                   >
//                     <CardContent className="pt-6">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">
//                             {stat.label}
//                           </p>
//                           <p className="text-2xl font-bold">{stat.value}</p>
//                         </div>
//                         <div className={`${stat.color} p-3 rounded-lg`}>
//                           <Icon className="w-6 h-6" />
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Quick Actions */}
//             <Card className="mb-8">
//               <CardHeader>
//                 <CardTitle>Quick Actions</CardTitle>
//                 <CardDescription>Get started with common tasks</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   <Link href="/dashboard/athletes">
//                     <Button variant="outline" className="w-full">
//                       View Athletes
//                     </Button>
//                   </Link>
//                   <Link href="/dashboard/athletes/new">
//                     <Button variant="outline" className="w-full">
//                       Add Athlete
//                     </Button>
//                   </Link>
//                   <Link href="/dashboard/competitions">
//                     <Button variant="outline" className="w-full">
//                       View Competitions
//                     </Button>
//                   </Link>
//                   {isAdmin && (
//                     <Link href="/dashboard/federations">
//                       <Button variant="outline" className="w-full">
//                         Manage Federations
//                       </Button>
//                     </Link>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Welcome Message */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>About Sports Nigeria Platform</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 text-sm text-muted-foreground">
//                 <p>
//                   Welcome to the comprehensive Sports Management System for
//                   Nigeria. This platform allows you to:
//                 </p>
//                 <ul className="list-disc list-inside space-y-2 ml-2">
//                   <li>Manage athlete profiles and performance records</li>
//                   <li>
//                     Organize and track competitions across different sports
//                   </li>
//                   <li>Manage sports facilities and resources</li>
//                   <li>Coordinate with multiple sport federations</li>
//                   <li>Track coaches, officials, and other sports personnel</li>
//                 </ul>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }

"use client";

import React from "react";
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
import { useAuth } from "@/app/context/auth-context";
import { Users, Trophy, MapPin, Shield } from "lucide-react";
import Link from "next/link";
import { SportsManagement } from "@/components/sports-management";
import { EventsManagement } from "@/components/events-management";

export default function DashboardPage() {
  const { isAdmin } = useAuth();

  const stats = [
    {
      label: "Total Athletes",
      value: "2,543",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Active Competitions",
      value: "14",
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      label: "Facilities",
      value: "89",
      icon: MapPin,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Federations",
      value: "12",
      icon: Shield,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <ProtectedRoute>
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 bg-background">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back to Sports Nigeria Management System
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {stat.label}
                          </p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Link href="/dashboard/athletes">
                    <Button variant="outline" className="w-full">
                      View Athletes
                    </Button>
                  </Link>
                  <Link href="/dashboard/athletes/new">
                    <Button variant="outline" className="w-full">
                      Add Athlete
                    </Button>
                  </Link>
                  <Link href="/dashboard/competitions">
                    <Button variant="outline" className="w-full">
                      View Competitions
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link href="/dashboard/federations">
                      <Button variant="outline" className="w-full">
                        Manage Federations
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Admin Management Sections */}
            {isAdmin && (
              <div className="space-y-6 mb-8">
                <h2 className="text-xl font-semibold mt-8">Administration</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SportsManagement />
                  <EventsManagement />
                </div>
              </div>
            )}

            {/* Welcome Message */}
            <Card>
              <CardHeader>
                <CardTitle>About Sports Nigeria Platform</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Welcome to the comprehensive Sports Management System for
                  Nigeria. This platform allows you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Manage athlete profiles and performance records</li>
                  <li>
                    Organize and track competitions across different sports
                  </li>
                  <li>Manage sports facilities and resources</li>
                  <li>Coordinate with multiple sport federations</li>
                  <li>Track coaches, officials, and other sports personnel</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
