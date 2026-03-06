"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { ImageUploader } from "./image-uploader";

interface AthleteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  state: string;
  sports: string[];
  bio: string;
  photo: string;
}

interface AthleteFormProps {
  onSubmit: (data: AthleteFormData) => Promise<void>;
  initialData?: Partial<AthleteFormData>;
  isLoading?: boolean;
}

const SPORTS = [
  "Athletics - 100m",
  "Athletics - 200m",
  "Athletics - 400m",
  "Athletics - 800m",
  "Athletics - 1500m",
  "Athletics - Long Jump",
  "Athletics - High Jump",
  "Athletics - Triple Jump",
  "Athletics - Shot Put",
  "Basketball",
  "Football",
  "Volleyball",
  "Swimming",
  "Tennis",
  "Boxing",
  "Judo",
  "Taekwondo",
];

const STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
];

const DEFAULT_FORM_DATA: AthleteFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "Male",
  nationality: "Nigerian",
  state: "Lagos",
  sports: [],
  bio: "",
  photo: "",
};

export function AthleteForm({
  onSubmit,
  initialData,
  isLoading = false,
}: AthleteFormProps) {
  const [formData, setFormData] = useState<AthleteFormData>({
    ...DEFAULT_FORM_DATA,
    ...initialData,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: AthleteFormData) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: AthleteFormData) => ({ ...prev, [name]: value }));
  };

  const handleSportToggle = (sport: string) => {
    setFormData((prev: AthleteFormData) => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter((s: string) => s !== sport)
        : [...prev.sports, sport],
    }));
  };

  const handleImageUpload = (url: string) => {
    setFormData((prev: AthleteFormData) => ({ ...prev, photo: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.sports.length === 0) {
      setError("Please select at least one sport");
      return;
    }

    try {
      await onSubmit(formData);
      setSuccess("Athlete saved successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save athlete");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Athlete" : "Create New Athlete"}
        </CardTitle>
        <CardDescription>
          Fill in the athlete&apos;s information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-green-100 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Profile Picture */}
          <div>
            <h3 className="font-semibold mb-4">Profile Picture</h3>
            <ImageUploader
              onImageUpload={handleImageUpload}
              initialImage={formData.photo}
            />
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="font-semibold mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                />
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h3 className="font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nationality
                </label>
                <Input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Nationality"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">State</label>
                <Select
                  value={formData.state}
                  onValueChange={(value) => handleSelectChange("state", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state" />
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
          </div>

          {/* Sports */}
          <div>
            <h3 className="font-semibold mb-4">Sports *</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {SPORTS.map((sport) => (
                <label
                  key={sport}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.sports.includes(sport)}
                    onChange={() => handleSportToggle(sport)}
                    className="w-4 h-4 rounded border-input"
                  />
                  <span className="text-sm">{sport}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Biography */}
          <div>
            <label className="block text-sm font-medium mb-2">Biography</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter athlete's biography"
              rows={4}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? "Saving..." : "Save Athlete"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
