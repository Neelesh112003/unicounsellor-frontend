"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';  
import { getToken } from '../../lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  allowOnboarding?: boolean;  
}

export default function AuthGuard({ children, allowOnboarding = false }: AuthGuardProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      
      const token = getToken();
      if (!token) {
        router.push('/auth/login');
        return;
      }

      setIsAuthenticated(true);

      
      try {
        const res = await api.get("/profile/me");
        console.log('✅ Profile check:', res.data);
        
        if (res.data) {
          setProfileComplete(true);
        } else {
          
          if (allowOnboarding) {
            setProfileComplete(false); 
          } else {
            router.push('/onboarding');
            return;
          }
        }
      } catch (err: any) {
        console.log('❌ No profile found, redirecting to onboarding');
        if (!allowOnboarding) {
          router.push('/onboarding');
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndProfile();
  }, [router, allowOnboarding]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Checking your profile...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated && !profileComplete && !allowOnboarding) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 to-blue-50">
        <div className="text-center max-w-md p-8">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl text-orange-600">👤</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Profile First</h2>
          <p className="text-lg text-gray-600 mb-8">
            Please complete your student profile to continue. This helps us give you personalized university recommendations.
          </p>
          <button
            onClick={() => router.push('/onboarding')}
            className="px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg"
          >
            Go to Onboarding
          </button>
        </div>
      </div>
    );
  }

 
  return <>{children}</>;
}
