import { GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-blue-50 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GraduationCap className="text-white" size={36} />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
            UniCounsellor AI
          </h1>
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Plan your study-abroad journey with a guided AI counsellor.
        </h2>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Get personalized university recommendations, expert guidance, and make confident decisions about your future—all powered by AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="group flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white rounded-xl font-semibold text-lg hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
          
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold text-lg hover:border-teal-600 hover:text-teal-600 transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}