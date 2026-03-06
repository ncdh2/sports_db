import { NextRequest, NextResponse } from "next/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Sport {
  _id: string;
  name: string;
  description?: string;
  category: string;
  status: string;
}

export function SportsManagement() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "Other",
  });

  const categories = [
    "Individual",
    "Team",
    "Combat",
    "Winter",
    "Water",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSport = async () => {
    if (!formData.name.trim()) {
      toast.error("Sport name is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/sports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Sport created successfully");
        setFormData({ name: "", description: "", category: "Other" });
        setShowForm(false);
        // Refresh sports list
        await fetchSports();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create sport");
      }
    } catch (error) {
      toast.error("Failed to create sport");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSports = async () => {
    try {
      const response = await fetch("/api/sports");
      if (response.ok) {
        const data = await response.json();
        setSports(data.sports);
      }
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  React.useEffect(() => {
    fetchSports();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Manage Sports</CardTitle>
          <CardDescription>
            Create and manage sports in the system
          </CardDescription>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          size="sm"
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Sport
        </Button>
      </CardHeader>
      <CardContent>
        {showForm && (
          <div className="mb-6 p-4 bg-muted rounded-lg space-y-4">
            <Input
              placeholder="Sport name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Description (optional)"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md border-input bg-background"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <Button
                onClick={handleAddSport}
                disabled={isLoading}
                className="bg-primary text-primary-foreground"
              >
                {isLoading ? "Creating..." : "Create Sport"}
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {sports.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No sports created yet
            </p>
          ) : (
            sports.map((sport) => (
              <div
                key={sport._id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{sport.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {sport.category}
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                  {sport.status}
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
