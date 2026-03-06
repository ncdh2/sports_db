// "use client";

// import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/app/context/auth-context";
// import { UserRole } from "@/lib/types";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredRoles?: UserRole[];
// }

// export function ProtectedRoute({
//   children,
//   requiredRoles,
// }: ProtectedRouteProps) {
//   const router = useRouter();
//   const { user, loading, isAuthenticated } = useAuth();

//   useEffect(() => {
//     if (!loading) {
//       if (!isAuthenticated) {
//         router.push(`/auth/login?returnUrl=${window.location.pathname}`);
//       } else if (requiredRoles && !requiredRoles.includes(user?.role!)) {
//         router.push("/");
//       }
//     }
//   }, [loading, isAuthenticated, user, router, requiredRoles]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   if (requiredRoles && !requiredRoles.includes(user?.role!)) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <p className="text-destructive font-medium">Access Denied</p>
//           <p className="text-muted-foreground mt-2">
//             You don&apos;t have permission to access this page
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }

"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/auth-context";
import { UserRole } from "@/lib/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export function ProtectedRoute({
  children,
  requiredRoles,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(`/auth/login?returnUrl=${window.location.pathname}`);
      } else if (requiredRoles && user && !requiredRoles.includes(user.role)) {
        router.push("/");
      }
    }
  }, [loading, isAuthenticated, user, router, requiredRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-secondary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRoles && user && !requiredRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive font-medium">Access Denied</p>
          <p className="text-muted-foreground mt-2">
            You don&apos;t have permission to access this page
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
