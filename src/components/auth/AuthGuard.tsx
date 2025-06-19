"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "@/app/store/useAuthStore";

const GUEST_PATHS = ["/login", "/sign-up", "/callback"];

interface JwtPayload {
  exp?: number;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const token = localStorage.getItem("token");
  const { refresh } = useAuthStore();

  useEffect(() => {
    if (typeof window === "undefined") return;

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
        if (token && isValidToken(token)) {
          router.replace("/");
        } else {
          setIsReady(true);
        }
        return;
      }

      if (!token || !isValidToken(token)) {
        const result = await refresh();
        if (result) {
          setIsReady(true);
          return;
        }
        router.replace("/login");
      } else {
        setIsReady(true);
      }
    };

    proceed();
  }, [pathname, router, token, refresh]);

  if (!isReady) return null;

  return <>{children}</>;
}
