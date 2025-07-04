"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseAuthStore } from "@/app/store/useAuthStore";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("user");
  const [password, setPassword] = useState("12312344");
  const [error, setError] = useState<string | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { login, loginWithGoogle, loading, loadingRedirect } = UseAuthStore();

  useEffect(() => {
    const validate = () => {
      const usernameRegex = /^[a-z0-9](?!.*[_.]{2})[a-z0-9._]{1,18}[a-z0-9]$/;

      if (!username.trim()) {
        setError("Username is required");
        return;
      }

      if (
        !usernameRegex.test(username) ||
        username.length < 3 ||
        username.length > 20
      ) {
        setError("Username must be 3–20 characters, lowercase, no spaces.");
        return;
      }

      if (!password.trim()) {
        setError("Password is required");
        return;
      }

      setError(null);
    };

    if (hasInteracted) {
      validate();
    }
  }, [username, password, hasInteracted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasInteracted(true);

    if (error) {
      toast.error(error);
      return;
    }

    const result = await login(username, password);
    if (result) {
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    const result = await loginWithGoogle();
    if (!result) {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-black text-white">
              <MessageSquare className="size-6" />
            </div>
            <h1 className="text-xl font-bold">Welcome to Confess Space</h1>
          </div>

          <div className="flex flex-col gap-6">
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
                className={error && hasInteracted ? "border-red-500" : ""}
                required
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
                className={error && hasInteracted ? "border-red-500" : ""}
                required
              />
            </div>
            {hasInteracted && error && (
              <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={loading || (hasInteracted && !!error)}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>

      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-background text-muted-foreground relative z-10 px-2">
          Or
        </span>
      </div>

      <Button
        variant="outline"
        type="button"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={loadingRedirect}
      >
        <svg
          className="mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        {loadingRedirect ? "Redirecting..." : "Continue with Google"}
      </Button>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a>Terms of Service</a> and{" "}
        <a>Privacy Policy</a>.
      </div>
    </div>
  );
}
