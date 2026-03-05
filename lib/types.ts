// User Types
export enum UserRole {
  MAIN_ADMIN = "MAIN_ADMIN",
  FEDERATION_ADMIN = "FEDERATION_ADMIN",
  USER = "USER",
}

export interface User {
  _id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  federationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Athlete Types
export interface Athlete {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: "Male" | "Female" | "Other";
  nationality: string;
  state: string;
  photo?: string;
  bio?: string;
  sports: string[];
  federationId: string;
  coachId?: string;
  achievements?: string[];
  personalBests?: Record<string, string>;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

// Coach Types
export interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialization: string[];
  qualifications?: string[];
  experience: number;
  photo?: string;
  bio?: string;
  federationId: string;
  athletes: string[];
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

// Official Types
export interface Official {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  role: "Referee" | "Judge" | "Timekeeper" | "Starter";
  sport: string;
  qualifications?: string[];
  photo?: string;
  federationId: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

// Facility Types
export interface Facility {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  description?: string;
  sports: string[];
  capacity: number;
  photo?: string;
  amenities: string[];
  contact: string;
  owner: string;
  federationId: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

// Federation Types
export interface Federation {
  _id: string;
  name: string;
  acronym: string;
  sport: string;
  description?: string;
  logo?: string;
  president: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  website?: string;
  status: "Active" | "Inactive";
  createdAt: Date;
  updatedAt: Date;
}

// Competition Types
export interface Competition {
  _id: string;
  name: string;
  description?: string;
  sport: string;
  federationId: string;
  startDate: Date;
  endDate: Date;
  location: string;
  facilityId: string;
  type: "Local" | "Regional" | "National" | "International";
  status: "Upcoming" | "Ongoing" | "Completed";
  participants: string[];
  rules?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Result Types
export interface Result {
  _id: string;
  competitionId: string;
  athleteId: string;
  position: number;
  time?: string;
  distance?: string;
  points?: number;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  federationId?: string;
}
