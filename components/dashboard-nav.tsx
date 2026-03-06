"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LogOut,
  Users,
  Trophy,
  MapPin,
  Shield,
  BarChart3,
  Home,
  Settings,
} from "lucide-react";
import Link from "next/link";

export function DashboardNav() {
  const router = useRouter();
  const { user, logout, isAdmin, isFederationAdmin } = useAuth();

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  const adminMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/athletes", label: "Athletes", icon: Users },
    { href: "/dashboard/competitions", label: "Competitions", icon: Trophy },
    { href: "/dashboard/facilities", label: "Facilities", icon: MapPin },
    { href: "/dashboard/federations", label: "Federations", icon: Shield },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  ];

  const federationAdminMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/dashboard/athletes", label: "My Athletes", icon: Users },
    { href: "/dashboard/competitions", label: "My Competitions", icon: Trophy },
    { href: "/dashboard/facilities", label: "Facilities", icon: MapPin },
  ];

  const menuItems = isAdmin ? adminMenuItems : federationAdminMenuItems;

  return (
    <div className="flex gap-4 flex-col w-64 bg-sidebar text-sidebar-foreground min-h-screen p-4 border-r border-sidebar-border">
      {/* Logo */}
      <Link href="/dashboard" className="font-bold text-2xl mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center text-white font-bold">
            SN
          </div>
          <span className="text-foreground">Sports NG</span>
        </div>
      </Link>

      {/* User Info */}
      <Card className="bg-sidebar-accent/20 border-sidebar-accent p-3 text-sm">
        <p className="font-medium text-foreground">{user?.name}</p>
        <p className="text-xs text-muted-foreground capitalize">
          {user?.role.replace("_", " ")}
        </p>
      </Card>

      {/* Menu */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-sidebar-primary/20"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Settings and Logout */}
      <div className="space-y-2 pt-4 border-t border-sidebar-border">
        <Link href="/dashboard/settings">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 hover:bg-sidebar-primary/20"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="w-full justify-start gap-2"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
