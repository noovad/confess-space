"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// Separate component that uses useSearchParams
function SignupFormContent() {
  const router = useRouter();
  const { signup, loading } = useAuthStore();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Move useSearchParams inside this component
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !username.trim() ||
      !name.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const result = await signup(username, name, password, email || "");
    if (result) {
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-lg font-medium">Complete Your Profile</h2>
        <p className="text-muted-foreground text-sm mt-1">Using {email}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="your_username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-muted-foreground text-xs">
            This will be your public @username
          </p>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full mt-2">
          Create Account
        </Button>
      </form>
    </div>
  );
}

// Main component that wraps the content with Suspense
export function SignupForm() {
  return (
    <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}
