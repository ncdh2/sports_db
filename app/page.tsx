"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Users,
  Trophy,
  MapPin,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";
import { useAuth } from "./context/auth-context";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const features = [
    {
      icon: Users,
      title: "Athlete Management",
      description:
        "Comprehensive athlete profiles with performance tracking and achievements",
    },
    {
      icon: Trophy,
      title: "Competition Management",
      description:
        "Organize, schedule, and manage sports competitions seamlessly",
    },
    {
      icon: MapPin,
      title: "Facility Tracking",
      description:
        "Monitor sports facilities, equipment, and resources across Nigeria",
    },
    {
      icon: Shield,
      title: "Federation Portal",
      description:
        "Dedicated portals for each sports federation with role-based access",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description: "Detailed analytics and reports for performance insights",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Stay updated with instant notifications and live competition results",
    },
  ];

  const stats = [
    { number: "2500+", label: "Athletes" },
    { number: "14", label: "Active Competitions" },
    { number: "89", label: "Facilities" },
    { number: "12", label: "Sport Federations" },
  ];

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
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="default">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-primary text-secondary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className=" from-primary/5 via-secondary/5 to-background py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Nigeria&apos;s Premier Sports{" "}
            <span className="text-primary">Management Platform</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Comprehensive system for managing athletes, competitions,
            facilities, and sports federations across Nigeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-primary text-primary-foreground">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="default" className="text-white ">
                Login to Your Account
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 border-border/50">
                <CardContent className="pt-6">
                  <p className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.number}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage sports in Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-block p-3 bg-secondary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Join thousands of sports professionals managing athletes and
            competitions on our platform
          </p>
          {!isAuthenticated && (
            <Link href="/auth/register">
              <Button
                size="lg"
                className="bg-primary text-secondary-foreground hover:bg-primary/60"
              >
                Create Free Account
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Sports Nigeria</h4>
              <p className="text-sm text-muted-foreground">
                Premier platform for managing sports in Nigeria
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Sports Nigeria. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
