import { LoginForm } from "@/app/(auth)/login/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
      <LoginForm />
    </div>
  );
}
