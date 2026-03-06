/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Trophy } from "lucide-react";
import { UserRole } from "@/lib/types";
import { ProtectedRoute } from "@/components/protected-route";
import { DashboardNav } from "@/components/dashboard-nav";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalAthletes: 0,
    activeCompetitions: 0,
    totalFacilities: 0,
    totalFederations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);
      // Fetch data from all endpoints to get statistics
      const [athletesRes, competitionsRes, facilitiesRes, federationsRes] =
        await Promise.all([
          fetch("/api/athletes"),
          fetch("/api/competitions"),
          fetch("/api/facilities"),
          fetch("/api/federations"),
        ]);

      const athletesData = await athletesRes.json();
      const competitionsData = await competitionsRes.json();
      const facilitiesData = await facilitiesRes.json();
      const federationsData = await federationsRes.json();

      setStats({
        totalAthletes: athletesData.athletes?.length || 0,
        activeCompetitions:
          competitionsData.competitions?.filter(
            (c: any) => c.status === "Ongoing",
          ).length || 0,
        totalFacilities: facilitiesData.facilities?.length || 0,
        totalFederations: federationsData.federations?.length || 0,
      });
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  const analyticsCards = [
    {
      title: "Total Athletes",
      value: stats.totalAthletes,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      trend: "+12.5% from last month",
    },
    {
      title: "Active Competitions",
      value: stats.activeCompetitions,
      icon: Trophy,
      color: "bg-yellow-100 text-yellow-600",
      trend: "+3 this month",
    },
    {
      title: "Total Facilities",
      value: stats.totalFacilities,
      icon: BarChart3,
      color: "bg-green-100 text-green-600",
      trend: "Across Nigeria",
    },
    {
      title: "Sport Federations",
      value: stats.totalFederations,
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
      trend: "Managing sports",
    },
  ];

  return (
    <ProtectedRoute requiredRoles={[UserRole.MAIN_ADMIN]}>
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 bg-background">
          <div className="p-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <BarChart3 className="w-8 h-8" />
                Analytics & Reports
              </h1>
              <p className="text-muted-foreground">
                System-wide statistics and insights
              </p>
            </div>

            {/* Main Stats */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading analytics...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {analyticsCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                      <Card
                        key={index}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                {card.title}
                              </p>
                              <p className="text-3xl font-bold mt-1">
                                {card.value}
                              </p>
                            </div>
                            <div className={`${card.color} p-3 rounded-lg`}>
                              <Icon className="w-6 h-6" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {card.trend}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Athletes by Sport */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Sports</CardTitle>
                      <CardDescription>
                        Most registered sports by athletes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { sport: "Athletics", count: 834, percentage: 32 },
                          { sport: "Basketball", count: 562, percentage: 22 },
                          { sport: "Football", count: 456, percentage: 18 },
                          { sport: "Volleyball", count: 398, percentage: 16 },
                          { sport: "Other", count: 293, percentage: 12 },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">{item.sport}</p>
                              <span className="text-sm text-muted-foreground">
                                {item.count}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Competition Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Competitions Status</CardTitle>
                      <CardDescription>
                        Distribution of competitions by status
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            status: "Completed",
                            count: 23,
                            color: "bg-gray-200",
                          },
                          {
                            status: "Ongoing",
                            count: 8,
                            color: "bg-green-200",
                          },
                          {
                            status: "Upcoming",
                            count: 14,
                            color: "bg-blue-200",
                          },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-2">
                              <p className="font-medium">{item.status}</p>
                              <span className="text-sm text-muted-foreground">
                                {item.count}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${item.color}`}
                                style={{ width: `${(item.count / 45) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* System Information */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Platform</p>
                        <p className="font-semibold">
                          Sports Nigeria Management System
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Version</p>
                        <p className="font-semibold">1.0.0</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">
                          Last Updated
                        </p>
                        <p className="font-semibold">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
