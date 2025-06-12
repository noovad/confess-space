import { SignupForm } from "./components/SignupForm";

export default function SignupPage() {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
      <SignupForm />
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline">
            <span> Log in here.</span>
          </a>
        </span>
      </div>
    </div>
  );
}
