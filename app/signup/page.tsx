"use client";

import { useEffect } from "react";
import RegisterForm from "../src/components/authentication/RegistrationForm";

export default function RegisterPage() {
  useEffect(() => {
      document.title = "Sign Up";
    }, []);
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <RegisterForm />
      </div>
    </div>
  );
}
