"use client";

import { UseAuthStore } from "@/app/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function SignupFormContent() {
  const router = useRouter();
  const { signup, loading } = UseAuthStore();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    const validate = () => {
      const usernameRegex = /^[a-z0-9](?!.*[_.]{2})[a-z0-9._]{1,18}[a-z0-9]$/;

      if (
        !usernameRegex.test(username) ||
        username.length < 3 ||
        username.length > 20
      ) {
        setError("Username must be 3–20 characters, lowercase, no spaces.");
        return;
      }

      if (
        !username.trim() ||
        !name.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        setError("Please fill in all fields");
        return;
      }

      if (name.trim().length === 0) {
        setError("Display name cannot be empty.");
        return;
      }

      if (password.length !== 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setError(null);
    };

    validate();
  }, [username, name, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);
    if (error) return;

    const result = await signup(username, name, password, email!);
    if (result) {
      router.push("/");
    } else {
      router.push("/login");
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
            type="text"
            placeholder="your_username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setHasInteracted(true);
            }}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="name">Display Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setHasInteracted(true);
            }}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setHasInteracted(true);
            }}
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setHasInteracted(true);
            }}
          />
        </div>

        {hasInteracted && error && (
          <p className="text-red-500 text-xs mt-2">{error}</p>
        )}

        <Button
          type="submit"
          disabled={loading || !!error}
          className="w-full mt-2"
        >
          {loading ? "Signing up..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
}

export function SignupForm() {
  return (
    <Suspense fallback={<div className="text-center py-6">Loading...</div>}>
      <SignupFormContent />
    </Suspense>
  );
}
