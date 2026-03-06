"use client";

import React, { useState, useEffect } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Athlete } from "@/lib/types";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAthletes();
  }, [search]);

  async function fetchAthletes() {
    try {
      setLoading(true);
      const query = search ? `?search=${encodeURIComponent(search)}` : "";
      const response = await fetch(`/api/athletes${query}`);
      if (!response.ok) throw new Error("Failed to fetch athletes");
      const data = await response.json();
      setAthletes(data.athletes || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch athletes");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 bg-background">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Athletes</h1>
                <p className="text-muted-foreground">
                  Manage and view athlete profiles
                </p>
              </div>
              <Link href="/dashboard/athletes/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Athlete
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search athletes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Athletes List */}
            <Card>
              <CardHeader>
                <CardTitle>All Athletes</CardTitle>
                <CardDescription>
                  {athletes.length} athletes found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-4">
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading athletes...</p>
                  </div>
                ) : athletes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No athletes found
                    </p>
                    <Link href="/dashboard/athletes/new">
                      <Button variant="outline">Create First Athlete</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                            Name
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                            Sports
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                            State
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {athletes.map((athlete) => (
                          <tr
                            key={athlete._id?.toString()}
                            className="border-b hover:bg-muted/50 transition-colors"
                          >
                            <td className="py-3 px-4 font-medium">
                              {athlete.firstName} {athlete.lastName}
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">
                              {athlete.sports?.join(", ") || "N/A"}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {athlete.state}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  athlete.status === "Active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {athlete.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={`/dashboard/athletes/${athlete._id}`}>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
