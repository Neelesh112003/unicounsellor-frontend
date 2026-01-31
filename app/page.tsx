"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./src/hooks/useAuth";

import Hero from "./src/components/Landing/Hero";
import Features from "./src/components/Landing/Features";
import HowItWorks from "./src/components/Landing/HowItWorks";
import CallToAction from "./src/components/Landing/CTA";
import Footer from "./src/components/layout/Footer";


export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, loading, router]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Hero />

     
      <Features />

      
      <HowItWorks />

      
      <CallToAction />

     
      <Footer />
    </div>
  );
}