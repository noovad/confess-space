"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const GUEST_PATHS = ["/login", "/sign-up", "/auth/callback"];

interface JwtPayload {
  exp?: number;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("accessToken");
    if (pathname === "/callback") return setIsReady(true);

    const isValidToken = (token: string) => {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded.exp && Date.now() < decoded.exp * 1000;
      } catch {
        return false;
      }
    };

    if (GUEST_PATHS.includes(pathname)) {
      if (token && isValidToken(token)) {
        router.replace("/space");
      } else {
        setIsReady(true);
      }
      return;
    }

    if (!token || !isValidToken(token)) {
      localStorage.removeItem("accessToken");
      router.replace("/login");
    } else {
      setIsReady(true);
    }
  }, [pathname, router]);

  if (!isReady) return null;

  return <>{children}</>;
}
