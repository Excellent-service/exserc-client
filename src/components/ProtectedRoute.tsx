import React, { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";


interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const { user, tempUser, authStep, firstLoad, code } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkUserSTatus = async () => {
      if (firstLoad) {
        if (user === null) {

          if (tempUser === null || authStep === null) {
            router.push(redirectTo);
            return
          }

          if (code !== "200") {
            router.push(`/signup/create-profile?role=${tempUser.role}`)
          }
        }
        // alert(JSON.stringify(user));
      }
    }

    checkUserSTatus();
      setLoading(false);
    // setTimeout(() => {
    // }, 400);
  }, [user, router, firstLoad]);

  if (!user && !firstLoad) return <Spinner />;

  if (loading) return <Spinner />;

  return <>{(user || tempUser) ? children : null}</>;
}