"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-lg font-medium">Complete Your Profile</h2>
        <p className="text-muted-foreground text-sm mt-1">Using example@gmail.com</p>
      </div>

      <form className="flex flex-col gap-4">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="your_username"
            required
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
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Create Account
        </Button>
      </form>
    </div>
  );
}
