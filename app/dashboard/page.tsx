"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../src/lib/api";
import { useAuth } from "../src/hooks/useAuth";
import AuthGuard from "../src/components/layout/AuthGaurd";

import Header from "../src/components/dashboard/Header";
import ProgressCard from "../src/components/dashboard/ProgressCard";
import QuickActions from "../src/components/dashboard/QuickActions";
import ProgressIndicator from "../src/components/dashboard/ProgressIndicator";

export default function DashboardPage() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const router = useRouter();
  const { loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [currentStage, setCurrentStage] = useState<"PROFILE_COMPLETE" | "SHORTLISTING" | "UNIVERSITY_LOCKED">("PROFILE_COMPLETE");
  const [userName, setUserName] = useState("Student");


  useEffect(() => {
    const fetchDashboardData = async () => {
      if (authLoading) return;
      
      try {
        console.log("🔄 Fetching dashboard data...");
     
        const [profileRes, lockedRes, shortlistRes] = await Promise.all([
          api.get("/profile/me").catch(() => ({ data: null })),
          api.get("/locked").catch(() => ({ data: { success: false } })),
          api.get("/shortlist").catch(() => ({ data: { shortlist: [] } }))
        ]);

        console.log('✅ Profile:', profileRes?.data);
        console.log('✅ Locked:', lockedRes?.data);
        console.log('✅ Shortlist:', shortlistRes?.data);

        setProfile(profileRes?.data || null);
        setUserName(profileRes?.data?.name || "Student");

        if (lockedRes?.data?.success && lockedRes?.data?.lockedUniversity) {
       
          setCurrentStage("UNIVERSITY_LOCKED");
          console.log("🎉 Stage: UNIVERSITY_LOCKED ✅");
        } else if (profileRes?.data && shortlistRes?.data?.shortlist?.length > 0) {
          
          setCurrentStage("SHORTLISTING");
          console.log("🎉 Stage: SHORTLISTING (has shortlist) ✅");
        } else if (profileRes?.data) {
         
          setCurrentStage("SHORTLISTING");
          console.log("🎉 Stage: SHORTLISTING (profile ready) ✅");
        } else {
  
          setCurrentStage("PROFILE_COMPLETE");
          console.log("🎉 Stage: PROFILE_COMPLETE ✅");
        }
        
      } catch (err: any) {
        console.error('❌ Dashboard fetch failed:', err);
        setCurrentStage("PROFILE_COMPLETE");
   
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [authLoading]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-teal-50">
        <div className="text-center p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }


  const progressSteps = [
    { label: "Complete your profile", completed: !!profile },
    { label: "Get AI recommendations", completed: currentStage === "SHORTLISTING" || currentStage === "UNIVERSITY_LOCKED" },
    { label: "Shortlist universities", completed: currentStage === "SHORTLISTING" || currentStage === "UNIVERSITY_LOCKED" },
    { label: "Lock final university", completed: currentStage === "UNIVERSITY_LOCKED" },
  ];

  
  const handleStageAction = () => {
    switch (currentStage) {
      case "PROFILE_COMPLETE":
        router.push("/counsellor");
        break;
      case "SHORTLISTING":
        router.push("/universities");
        break;
      case "UNIVERSITY_LOCKED":
        router.push("/shortlisted-universities");
        break;
      default:
        router.push("/universities");
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Header userName={userName} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ProgressCard stage={currentStage} onAction={handleStageAction} />
              <QuickActions />
            </div>
            
            <div className="lg:col-span-1">
              <ProgressIndicator steps={progressSteps} />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
