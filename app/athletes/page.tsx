"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Athlete } from "@/lib/types";
import { Search, MapPin, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SPORTS = [
  "Athletics - 100m",
  "Athletics - 200m",
  "Athletics - 400m",
  "Basketball",
  "Football",
  "Volleyball",
];
const STATES = ["Lagos", "Kaduna", "Oyo", "Kano", "Abuja", "Rivers", "Enugu"];

export default function AthletesPortalPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchAthletes();
  }, [search, selectedSport, selectedState]);

  async function fetchAthletes() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedSport) params.append("sport", selectedSport);
      if (selectedState) params.append("state", selectedState);

      const response = await fetch(`/api/public/athletes?${params}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAthletes(data.athletes);
      setTotal(data.pagination.total);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              SN
            </div>
            <span>Sports Nigeria</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Nigeria&apos;s Athletes</h1>
          <p className="text-muted-foreground mb-8">
            Discover talented athletes across Nigeria
          </p>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search athletes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedSport}
              onValueChange={(value) => setSelectedSport(value)}
            >
              <SelectTrigger className="px-3 py-2 border border-input rounded-md bg-background">
                <SelectValue placeholder="All Sports" />
              </SelectTrigger>
              <SelectContent>
                {SPORTS.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* <Select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">All Sports</option>
              {SPORTS.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </Select> */}
            {/* <Select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">All States</option>
              {STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select> */}
            <Select
              value={selectedState}
              onValueChange={(value) => setSelectedState(value)}
            >
              <SelectTrigger className="px-3 py-2 border border-input rounded-md bg-background">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                {STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Athletes Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${total} athletes found`}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading athletes...</p>
            </div>
          ) : athletes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No athletes found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {athletes.map((athlete) => (
                <Card
                  key={athlete._id?.toString()}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="h-32 bg-gradient-to-br from-primary to-secondary"></div>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg mb-2">
                      {athlete.firstName} {athlete.lastName}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {athlete.sports?.[0] || "N/A"}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {athlete.state}, Nigeria
                      </div>
                      {athlete.achievements &&
                        athlete.achievements.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="font-medium text-foreground mb-1">
                              Achievements:
                            </p>
                            <ul className="text-xs space-y-1">
                              {athlete.achievements
                                .slice(0, 2)
                                .map((achievement, idx) => (
                                  <li key={idx} className="text-primary">
                                    • {achievement}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Sports Nigeria. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
