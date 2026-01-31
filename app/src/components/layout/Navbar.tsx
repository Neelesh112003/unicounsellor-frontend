"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import { logout } from "../../lib/auth";
import { LogOut, GraduationCap, LayoutDashboard, MessageSquare, School } from "lucide-react";

const NavbarDesign = () => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link 
          href="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 bg-linear-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
            UniCounsellor AI
          </span>
        </Link>

        <div className="flex gap-2 items-center">
          {isAuthenticated ? (
            <>
              <Link 
                href="/dashboard"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/dashboard")
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-teal-50 hover:text-gray-900"
                }`}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              
              <Link 
                href="/counsellor"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/counsellor")
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-teal-50 hover:text-gray-900"
                }`}
              >
                <MessageSquare size={18} />
                AI Counsellor
              </Link>

              <Link 
                href="/universities"
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive("/universities")
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-teal-50 hover:text-gray-900"
                }`}
              >
                <School size={18} />
                Universities
              </Link>

              <div className="h-8 w-px bg-gray-300 mx-2"></div>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-white bg-red-500 hover:bg-red-600 shadow-lg transition-all duration-300"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/login"
                className="px-5 py-2 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2 rounded-xl font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-lg transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesign;