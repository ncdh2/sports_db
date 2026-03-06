"use client";

import React, { useState, useEffect } from "react";
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
import { Plus, Trophy } from "lucide-react";
import Link from "next/link";

interface Competition {
  _id: string;
  name: string;
  sport: string;
  startDate: string;
  location: string;
  status: "Upcoming" | "Ongoing" | "Completed";
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetitions();
  }, []);

  async function fetchCompetitions() {
    try {
      setLoading(true);
      const response = await fetch("/api/competitions");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setCompetitions(data.competitions || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Ongoing":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 bg-background">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <Trophy className="w-8 h-8" />
                  Competitions
                </h1>
                <p className="text-muted-foreground">
                  Manage sports competitions
                </p>
              </div>
              <Link href="/dashboard/competitions/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Competition
                </Button>
              </Link>
            </div>

            {/* Competitions List */}
            <Card>
              <CardHeader>
                <CardTitle>All Competitions</CardTitle>
                <CardDescription>
                  {competitions.length} competitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading competitions...</p>
                  </div>
                ) : competitions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No competitions yet
                    </p>
                    <Link href="/dashboard/competitions/new">
                      <Button variant="outline">Create Competition</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {competitions.map((comp) => (
                      <div
                        key={comp._id}
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{comp.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {comp.sport}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {comp.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${statusColor(comp.status)}`}
                            >
                              {comp.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
