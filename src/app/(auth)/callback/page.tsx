"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { axiosAuthInstance } from "@/lib/axios";
import { toast } from "sonner";

export default function GoogleOAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCodeExchange = async () => {
      const code = new URLSearchParams(window.location.search).get("code");

      if (!code) {
        router.replace("/login?error=Missing+OAuth+code");
        toast.error("Missing OAuth code");
        return;
      }

      axiosAuthInstance.post("/exchange-code", { code }).then((res) => {
        const { accessToken, refreshToken, user } = res.data;

        if (accessToken && refreshToken && user) {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Login successful!");
          router.replace("/");
        } else {
          router.replace("/login?error=Invalid+token+response");
          toast.error("Invalid token response");
        }
      });
    };

    handleCodeExchange();
  }, [router]);

  return <p>{"Loading..."}</p>;
}
