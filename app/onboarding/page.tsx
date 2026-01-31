"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../src/hooks/useAuth";
import api from "../src/lib/api";
import { 
  GraduationCap, 
  Target, 
  DollarSign, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle
} from "lucide-react";

import ProgressIndicator from "../src/components/onboarding/ProgressIndicator";
import AcademicBackground from "../src/components/onboarding/AcademicBackground";
import StudyGoals from "../src/components/onboarding/StudyGoals";
import Budget from "../src/components/onboarding/Budget";
import ExamsDocuments from "../src/components/onboarding/ExamsDocuments";

interface StudentProfile {
  academics: {
    educationLevel: string;
    degree: string;
    graduationYear: number;
    gpa: number;
  };
  studyGoal: {
    degreeType: string;
    fieldOfStudy: string;
    targetIntake: string;
    preferredCountries: string[];
  };
  budget: {
    yearlyBudget: number;
    fundingPlan: 'SELF_FUNDED' | 'SCHOLARSHIP' | 'LOAN';
  };
  exams: {
    IELTS: string;
    TOEFL: string;
    GRE: string;
    GMAT: string;
    SOP: 'NOT_STARTED' | 'DRAFT' | 'READY';
  };
}

export default function OnboardingPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<StudentProfile>({
    academics: {
      educationLevel: "",
      degree: "",
      graduationYear: 0,
      gpa: 0,
    },
    studyGoal: {
      degreeType: "",
      fieldOfStudy: "",
      targetIntake: "",
      preferredCountries: [],
    },
    budget: {
      yearlyBudget: 0,
      fundingPlan: "SELF_FUNDED",
    },
    exams: {
      IELTS: "",
      TOEFL: "",
      GRE: "",
      GMAT: "",
      SOP: "NOT_STARTED",
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-teal-50">
        <div className="text-center p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Verifying your session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/auth/login");
    return null;
  }

  const handleChange = (section: keyof StudentProfile, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const toggleCountry = (country: string) => {
    setForm((prev) => ({
      ...prev,
      studyGoal: {
        ...prev.studyGoal,
        preferredCountries: prev.studyGoal.preferredCountries.includes(country)
          ? prev.studyGoal.preferredCountries.filter((c) => c !== country)
          : [...prev.studyGoal.preferredCountries, country],
      },
    }));
  };

  const handleSubmit = async () => {
    setError("");
    setSubmitLoading(true);

    try {
      await api.post("/profile/onboarding", form);
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to complete onboarding");
    } finally {
      setSubmitLoading(false);
    }
  };

  const steps = [
    { title: "Academic Background", icon: GraduationCap },
    { title: "Study Goals", icon: Target },
    { title: "Budget", icon: DollarSign },
    { title: "Exams & Documents", icon: FileText },
  ];

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return form.academics.educationLevel && form.academics.degree && form.academics.graduationYear > 0 && form.academics.gpa > 0;
      case 1:
        return form.studyGoal.degreeType && form.studyGoal.fieldOfStudy && form.studyGoal.targetIntake && form.studyGoal.preferredCountries.length > 0;
      case 2:
        return form.budget.yearlyBudget > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <ProgressIndicator steps={steps} currentStep={currentStep} />

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {currentStep === 0 && (
            <AcademicBackground
              data={form.academics}
              onChange={(field, value) => handleChange("academics", field, value)}
            />
          )}

          {currentStep === 1 && (
            <StudyGoals
              data={form.studyGoal}
              onChange={(field, value) => handleChange("studyGoal", field, value)}
              toggleCountry={toggleCountry}
            />
          )}

          {currentStep === 2 && (
            <Budget
              data={form.budget}
              onChange={(field, value) => handleChange("budget", field, value)}
            />
          )}

          {currentStep === 3 && (
            <ExamsDocuments
              data={form.exams}
              onChange={(field, value) => handleChange("exams", field, value)}
            />
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={isFirstStep}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isFirstStep
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ArrowLeft size={18} />
              Previous
            </button>

            {!isLastStep ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
                  isStepValid()
                    ? "bg-teal-600 text-white hover:bg-teal-700 shadow-teal-500/20 hover:shadow-xl cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitLoading}
                className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 shadow-lg shadow-teal-500/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
              >
                {submitLoading ? "Submitting..." : "Complete Onboarding"}
                <CheckCircle size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
