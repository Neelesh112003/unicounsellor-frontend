import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className="bg-linear-to-br from-teal-600 to-blue-200 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to start your journey?
        </h2>
        <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">
          Join thousands of students who found their perfect university with AI-powered guidance
        </p>
        
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
        >
          Get Started for Free
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </Link>
      </div>
    </div>
  );
}