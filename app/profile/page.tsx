"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../src/hooks/useAuth";
import api from "../src/lib/api";
import AuthGuard from "../src/components/layout/AuthGaurd";


import ProfileHeader from "../src/components/Profile/Header";
import AcademicSection from "../src/components/Profile/AcademicSection";
import StudyGoalsSection from "../src/components/Profile/StudyGoals";
import BudgetSection from "../src/components/Profile/BudgetSection";
import ExamsSection from "../src/components/Profile/ExamSection";

interface StudentProfile {
  _id?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  academics?: {
    educationLevel?: string;
    degree?: string;
    graduationYear?: number;
    gpa?: number;
  };
  studyGoal?: {
    degreeType?: string;
    fieldOfStudy?: string;
    targetIntake?: string;
    preferredCountries?: string[];
  };
  budget?: {
    yearlyBudget?: number;
    fundingPlan?: "SELF_FUNDED" | "SCHOLARSHIP" | "LOAN";
  };
  exams?: {
    IELTS?: string;
    TOEFL?: string;
    GRE?: string;
    GMAT?: string;
    SOP?: "NOT_STARTED" | "DRAFT" | "READY";
  };
}

export default function ProfilePage() {
  useEffect(() => {
    document.title = "Profile";
  }, []);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated || authLoading) return;

      try {
        const res = await api.get("/profile/me");
        // ✅ Safe defaults for missing sections
        const safeProfile: StudentProfile = {
          ...res.data,
          academics: res.data.academics || {},
          studyGoal: res.data.studyGoal || {},
          budget: res.data.budget || {},
          exams: res.data.exams || {},
        };
        setProfile(safeProfile);
      } catch (err) {
        router.push("/onboarding");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, authLoading, router]);

  if (loading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-teal-600 rounded-full" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto py-10 px-4">
          {/* Header */}
          <ProfileHeader
            name={profile.name || "Student"}
            email={profile.email || "email@example.com"}
            memberSince={
              profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "2026"
            }
          />

          <div className="space-y-6 mt-6">
            <AcademicSection data={profile.academics || {}} />
            <StudyGoalsSection data={profile.studyGoal || {}} />
            <BudgetSection data={profile.budget || {}} />
            <ExamsSection data={profile.exams || {}} />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
