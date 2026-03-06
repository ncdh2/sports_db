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
import { UserRole } from "@/lib/types";
import { Plus, Shield } from "lucide-react";
import Link from "next/link";

interface Federation {
  _id: string;
  name: string;
  acronym: string;
  sport: string;
  state: string;
  president: string;
}

export default function FederationsPage() {
  const [federations, setFederations] = useState<Federation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFederations();
  }, []);

  async function fetchFederations() {
    try {
      setLoading(true);
      const response = await fetch("/api/federations");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setFederations(data.federations || []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute requiredRoles={[UserRole.MAIN_ADMIN]}>
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 bg-background">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  <Shield className="w-8 h-8" />
                  Sport Federations
                </h1>
                <p className="text-muted-foreground">
                  Manage all sport federations in Nigeria
                </p>
              </div>
              <Link href="/dashboard/federations/new">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Federation
                </Button>
              </Link>
            </div>

            {/* Federations Grid */}
            <Card>
              <CardHeader>
                <CardTitle>All Federations</CardTitle>
                <CardDescription>
                  {federations.length} federations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
                    <p>Loading federations...</p>
                  </div>
                ) : federations.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No federations yet
                    </p>
                    <Link href="/dashboard/federations/new">
                      <Button variant="outline">Create Federation</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {federations.map((fed) => (
                      <Card key={fed._id} className="border">
                        <CardContent className="pt-6">
                          <div className="mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <span className="text-primary font-bold text-lg">
                              {fed.acronym.substring(0, 2)}
                            </span>
                          </div>
                          <h3 className="font-semibold mb-1">{fed.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {fed.sport}
                          </p>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <p>President: {fed.president}</p>
                            <p>State: {fed.state}</p>
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
