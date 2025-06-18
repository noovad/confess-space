"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/app/store/useAuthStore";

const GUEST_PATHS = ["/login", "/sign-up", "/callback"];
const PUBLIC_PATHS = ["/callback"];

interface JwtPayload {
  exp?: number;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const { refresh } = useAuthStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (PUBLIC_PATHS.includes(pathname)) {
      setIsReady(true);
      return;
    }

    const isValidToken = (token: string | null) => {
      if (!token) return false;
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp && Date.now() < decoded.exp * 1000;
      } catch {
        return false;
      }
    };

    const proceed = async () => {
      if (GUEST_PATHS.includes(pathname)) {
        if (accessToken && isValidToken(accessToken)) {
          router.replace("/");
        } else {
          setIsReady(true);
        }
        return;
      }

      if (!accessToken || !isValidToken(accessToken)) {
        if (refreshToken && isValidToken(refreshToken)) {
          const success = await refresh();
          if (success) {
            setIsReady(true);
            return;
          }
        }

        localStorage.removeItem("accessToken");
        router.replace("/login");
      } else {
        setIsReady(true);
      }
    };

    proceed();
  }, [pathname, refresh, router]);

  if (!isReady) return null;

  return <>{children}</>;
}
