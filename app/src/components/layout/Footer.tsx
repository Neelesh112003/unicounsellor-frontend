import { GraduationCap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold">UniCounsellor AI</span>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} UniCounsellor AI. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}