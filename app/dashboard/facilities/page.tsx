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
import { Plus, MapPin } from "lucide-react";
import Link from "next/link";

interface Facility {
  _id: string;
  name: string;
  city: string;
  state: string;
  capacity: number;
  sports: string[];
}

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFacilities();
  }, []);

  async function fetchFacilities() {
    try {
      setLoading(true);
      const response = await fetch("/api/facilities");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setFacilities(data.facilities || []);
    } catch (error) {
      console.error("Fetch error:", error);
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
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <MapPin className="w-8 h-8" />
                  Sports Facilities
                </h1>
                <p className="text-muted-foreground">
                  Manage sports facilities across Nigeria
                </p>
              </div>
              <Link href="/dashboard/facilities/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Facility
                </Button>
              </Link>
            </div>

            {/* Facilities List */}
            <Card>
              <CardHeader>
                <CardTitle>All Facilities</CardTitle>
                <CardDescription>
                  {facilities.length} facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading facilities...</p>
                  </div>
                ) : facilities.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No facilities yet
                    </p>
                    <Link href="/dashboard/facilities/new">
                      <Button variant="outline">Create Facility</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {facilities.map((facility) => (
                      <Card key={facility._id} className="border">
                        <CardContent className="pt-6">
                          <h3 className="font-semibold mb-2">
                            {facility.name}
                          </h3>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                              {facility.city}, {facility.state}
                            </p>
                            <p>
                              Capacity: {facility.capacity.toLocaleString()}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {facility.sports
                                ?.slice(0, 3)
                                .map((sport, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-muted px-2 py-1 rounded text-xs"
                                  >
                                    {sport}
                                  </span>
                                ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
