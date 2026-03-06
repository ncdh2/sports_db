/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";
import { ProtectedRoute } from "@/components/protected-route";

import { UserRole } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AthleteForm } from "@/components/athlete-form";

export default function NewAthletePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(data: any) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/athletes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create athlete");
      }

      router.push("/dashboard/athletes");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ProtectedRoute
      requiredRoles={[UserRole.MAIN_ADMIN, UserRole.FEDERATION_ADMIN]}
    >
      <div className="flex">
        <DashboardNav />
        <div className="flex-1 bg-background">
          <div className="p-8 max-w-2xl">
            {/* Header */}
            <div className="mb-8 flex items-center gap-4">
              <Link href="/dashboard/athletes">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Create Athlete</h1>
                <p className="text-muted-foreground">
                  Add a new athlete profile
                </p>
              </div>
            </div>

            {/* Form */}
            <AthleteForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
