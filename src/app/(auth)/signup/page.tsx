import { SignupForm } from "./components/SignupForm";

export default function SignupPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
      <SignupForm />
    </div>
  );
}
