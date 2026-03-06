// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Plus, Calendar } from "lucide-react";
// import { toast } from "sonner";

// interface Sport {
//   _id: string;
//   name: string;
// }

// interface Event {
//   _id: string;
//   name: string;
//   sportName: string;
//   eventType: string;
//   level: string;
//   startDate: string;
//   status: string;
// }

// export function EventsManagement() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [sports, setSports] = useState<Sport[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     sportId: "",
//     startDate: "",
//     endDate: "",
//     location: "",
//     eventType: "Tournament",
//     level: "National",
//     maxParticipants: "",
//     entryFee: "",
//   });

//   const eventTypes = [
//     "Championship",
//     "League",
//     "Tournament",
//     "Friendly",
//     "Trial",
//   ];
//   const levels = ["Local", "State", "National", "International"];

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const fetchSports = async () => {
//     try {
//       const response = await fetch("/api/sports");
//       if (response.ok) {
//         const data = await response.json();
//         setSports(data.sports);
//       }
//     } catch (error) {
//       console.error("Error fetching sports:", error);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch("/api/events");
//       if (response.ok) {
//         const data = await response.json();
//         setEvents(data.events);
//       }
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   const handleAddEvent = async () => {
//     if (
//       !formData.name ||
//       !formData.sportId ||
//       !formData.startDate ||
//       !formData.endDate ||
//       !formData.location
//     ) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/events", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           maxParticipants: formData.maxParticipants
//             ? parseInt(formData.maxParticipants)
//             : null,
//           entryFee: formData.entryFee ? parseFloat(formData.entryFee) : null,
//         }),
//       });

//       if (response.ok) {
//         toast.success("Event created successfully");
//         setFormData({
//           name: "",
//           sportId: "",
//           startDate: "",
//           endDate: "",
//           location: "",
//           eventType: "Tournament",
//           level: "National",
//           maxParticipants: "",
//           entryFee: "",
//         });
//         setShowForm(false);
//         await fetchEvents();
//       } else {
//         const error = await response.json();
//         toast.error(error.error || "Failed to create event");
//       }
//     } catch (error) {
//       toast.error("Failed to create event");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSports();
//     fetchEvents();
//   }, []);

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between space-y-0">
//         <div>
//           <CardTitle>Manage Events</CardTitle>
//           <CardDescription>Create and manage sports events</CardDescription>
//         </div>
//         <Button
//           onClick={() => setShowForm(!showForm)}
//           size="sm"
//           className="gap-2"
//         >
//           <Plus className="w-4 h-4" />
//           Add Event
//         </Button>
//       </CardHeader>
//       <CardContent>
//         {showForm && (
//           <div className="mb-6 p-4 bg-muted rounded-lg space-y-4">
//             <Input
//               placeholder="Event name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             <select
//               name="sportId"
//               value={formData.sportId}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border rounded-md border-input bg-background"
//             >
//               <option value="">Select Sport</option>
//               {sports.map((sport) => (
//                 <option key={sport._id} value={sport._id}>
//                   {sport.name}
//                 </option>
//               ))}
//             </select>
//             <Input
//               placeholder="Location"
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//             />
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//               />
//               <Input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <select
//                 name="eventType"
//                 value={formData.eventType}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-md border-input bg-background"
//               >
//                 {eventTypes.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 name="level"
//                 value={formData.level}
//                 onChange={handleInputChange}
//                 className="w-full px-3 py-2 border rounded-md border-input bg-background"
//               >
//                 {levels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <Input
//                 placeholder="Max Participants (optional)"
//                 name="maxParticipants"
//                 type="number"
//                 value={formData.maxParticipants}
//                 onChange={handleInputChange}
//               />
//               <Input
//                 placeholder="Entry Fee (optional)"
//                 name="entryFee"
//                 type="number"
//                 step="0.01"
//                 value={formData.entryFee}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="flex gap-2">
//               <Button
//                 onClick={handleAddEvent}
//                 disabled={isLoading}
//                 className="bg-primary text-primary-foreground"
//               >
//                 {isLoading ? "Creating..." : "Create Event"}
//               </Button>
//               <Button onClick={() => setShowForm(false)} variant="outline">
//                 Cancel
//               </Button>
//             </div>
//           </div>
//         )}

//         <div className="space-y-2">
//           {events.length === 0 ? (
//             <p className="text-sm text-muted-foreground">
//               No events created yet
//             </p>
//           ) : (
//             events.map((event) => (
//               <div
//                 key={event._id}
//                 className="flex items-center justify-between p-3 bg-muted rounded-lg"
//               >
//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-4 h-4 text-muted-foreground" />
//                   <div>
//                     <p className="font-medium">{event.name}</p>
//                     <p className="text-sm text-muted-foreground">
//                       {event.sportName} • {event.eventType}
//                     </p>
//                   </div>
//                 </div>
//                 <span
//                   className={`text-xs font-medium px-2 py-1 rounded ${
//                     event.status === "Upcoming"
//                       ? "bg-blue-100 text-blue-700"
//                       : event.status === "Ongoing"
//                         ? "bg-yellow-100 text-yellow-700"
//                         : "bg-gray-100 text-gray-700"
//                   }`}
//                 >
//                   {event.status}
//                 </span>
//               </div>
//             ))
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Sport {
  _id: string;
  name: string;
}

interface SportEvent {
  _id: string;
  name: string;
  sportName: string;
  eventType: string;
  standardDistance?: string;
  status: string;
}

export function EventsManagement() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSportId, setSelectedSportId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    eventType: "Track",
    standardDistance: "",
    description: "",
    rules: "",
    minParticipants: "",
    maxParticipants: "",
  });

  useEffect(() => {
    fetchSports();
  }, []);

  useEffect(() => {
    if (selectedSportId) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [selectedSportId]);

  const fetchSports = async () => {
    try {
      const response = await fetch("/api/sports");
      const data = await response.json();
      setSports(data.sports || []);
    } catch (error) {
      console.error("Error fetching sports:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/api/events?sportId=${selectedSportId}`);
      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSportId) {
      toast.error("Please select a sport");
      return;
    }

    if (!formData.name.trim()) {
      toast.error("Event name is required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sportId: selectedSportId,
          name: formData.name,
          eventType: formData.eventType,
          standardDistance: formData.standardDistance || undefined,
          description: formData.description || undefined,
          rules: formData.rules || undefined,
          minParticipants: formData.minParticipants
            ? parseInt(formData.minParticipants)
            : undefined,
          maxParticipants: formData.maxParticipants
            ? parseInt(formData.maxParticipants)
            : undefined,
        }),
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Sport event created successfully");
        setFormData({
          name: "",
          eventType: "Track",
          standardDistance: "",
          description: "",
          rules: "",
          minParticipants: "",
          maxParticipants: "",
        });
        fetchEvents();
      } else {
        const error = await response.json();
        toast.error(error.error || "Failed to create sport event");
      }
    } catch (error) {
      toast.error("Error creating sport event");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Event deleted successfully");
        fetchEvents();
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      toast.error("Error deleting event");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Manage Sport Events
        </CardTitle>
        <CardDescription>
          Create events like 100m, 200m, 400m for athletics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sport Selection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Select Sport</label>
          <select
            value={selectedSportId}
            onChange={(e) => setSelectedSportId(e.target.value)}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
          >
            <option value="">Choose a sport...</option>
            {sports.map((sport) => (
              <option key={sport._id} value={sport._id}>
                {sport.name}
              </option>
            ))}
          </select>
        </div>

        {selectedSportId && (
          <>
            {/* Add Event Form */}
            <form onSubmit={handleAddEvent} className="space-y-4 pt-4 border-t">
              <h4 className="font-medium text-sm">Add New Event</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  placeholder="Event name (e.g., 100m, 200m)"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />

                <select
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                >
                  <option value="Track">Track</option>
                  <option value="Field">Field</option>
                  <option value="Throwing">Throwing</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Combat">Combat</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Input
                placeholder="Standard distance (e.g., 100 meters)"
                value={formData.standardDistance}
                onChange={(e) =>
                  setFormData({ ...formData, standardDistance: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground text-sm"
                rows={2}
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min participants"
                  value={formData.minParticipants}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minParticipants: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max participants"
                  value={formData.maxParticipants}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      maxParticipants: e.target.value,
                    })
                  }
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Event"}
              </Button>
            </form>

            {/* Events List */}
            {events.length > 0 && (
              <div className="pt-4 border-t space-y-2">
                <h4 className="font-medium text-sm">
                  Events ({events.length})
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="flex items-center justify-between p-2 bg-muted rounded text-sm"
                    >
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {event.eventType}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="p-1 hover:bg-destructive/20 rounded transition-colors"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
