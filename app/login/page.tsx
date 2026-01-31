"use client";

import { useEffect } from "react";
import LoginForm from "../src/components/authentication/LoginForm";



export default function LoginPage() {
  useEffect(() => {
      document.title = "Login";
    }, []);
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <LoginForm />
      </div>
    </div>
  );
}
