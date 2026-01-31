"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../src/hooks/useAuth";
import api from "../src/lib/api";
import ShortlistedUniversityCard from "../src/components/universities/ShortlistedUniversityCard";
import LockConfirmationModal from "../src/components/universities/LockConfirmationModal";
import { ArrowLeft, Star, Lock } from "lucide-react";

interface University {
  universityId: string;
  name: string;
  country: string;
  category: "DREAM" | "TARGET" | "SAFE";
  costLevel: "LOW" | "MEDIUM" | "HIGH";
  acceptanceChance: "LOW" | "MEDIUM" | "HIGH";
  fitReason: string;
  risk: string;
  gpaMatch: string;
}

export default function ShortlistedUniversitiesPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [shortlistedUniversities, setShortlistedUniversities] = useState<University[]>([]);
  const [lockedUniversityId, setLockedUniversityId] = useState<string | null>(null);
  const [hasLocked, setHasLocked] = useState(false);
  const [lockedUniversity, setLockedUniversity] = useState<University | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [lockLoading, setLockLoading] = useState(false);

  const loadShortlistedUniversities = async () => {
    setLoading(true);
    setError("");

    try {
      console.log("🔄 Loading shortlist from backend...");
      
      const shortlistRes = await api.get("/shortlist");
      const shortlistIds = shortlistRes.data.shortlist.map((uni: any) => uni.universityId);
      console.log("✅ Shortlist IDs:", shortlistIds);

      if (shortlistIds.length === 0) {
        setShortlistedUniversities([]);
        setLoading(false);
        return;
      }

      const uniRes = await api.get("/universities");
      const allUnis = uniRes.data.universities || [];
      console.log("📚 All universities:", allUnis.length);

      const shortlisted = allUnis.filter((uni: any) => 
        shortlistIds.includes(uni.universityId || uni._id)
      );

      console.log("🎯 Shortlisted universities:", shortlisted.length);
      setShortlistedUniversities(shortlisted as University[]);
      
    } catch (err: any) {
      console.error("❌ Load error:", err);
      setError(err?.response?.data?.message || "Failed to load shortlist");
      setShortlistedUniversities([]);
    } finally {
      setLoading(false);
    }
  };

  const checkLockedUniversity = async () => {
    try {
      const response = await api.get("/locked");
      if (response.data.success && response.data.lockedUniversity) {
        const lockedId = response.data.lockedUniversity.universityId || response.data.lockedUniversity._id;
        setLockedUniversityId(lockedId);
        setHasLocked(true);
        console.log("🔒 Locked university found:", lockedId);
        
        
        const uniRes = await api.get("/universities");
        const allUnis = uniRes.data.universities || [];
        const lockedUni = allUnis.find((uni: any) => 
          (uni.universityId || uni._id) === lockedId
        ) as University;
        setLockedUniversity(lockedUni);
      }
    } catch (err) {
      console.log("ℹ️ No locked university");
    }
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      checkLockedUniversity();
      if (!hasLocked) {
        loadShortlistedUniversities();
      }
    }
  }, [authLoading, isAuthenticated]);

  const handleLockClick = (universityId: string) => {
    if (lockedUniversityId || hasLocked) {
      setError("You have already locked a university");
      return;
    }

    const university = shortlistedUniversities.find((u) => u.universityId === universityId);
    if (university) {
      setSelectedUniversity(university);
      setIsModalOpen(true);
    }
  };

  const handleConfirmLock = async () => {
    if (!selectedUniversity) return;

    setLockLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/lock", {
        universityId: selectedUniversity.universityId,
      });

      if (response.data.success) {
        const lockedId = selectedUniversity.universityId;
        setLockedUniversityId(lockedId);
        setHasLocked(true);
        setLockedUniversity(selectedUniversity);
        setSuccess(`${selectedUniversity.name} has been locked successfully!`);
        setIsModalOpen(false);
        setSelectedUniversity(null);

        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to lock university");
    } finally {
      setLockLoading(false);
    }
  };

  const handleCancelLock = () => {
    setIsModalOpen(false);
    setSelectedUniversity(null);
  };

  const handleRemoveFromShortlist = async (universityId: string) => {
    if (lockedUniversityId || hasLocked) {
      setError("Cannot modify shortlist after locking a university");
      return;
    }

    try {
      await api.delete(`/shortlist/${universityId}`);
      
      setShortlistedUniversities(prev => 
        prev.filter(uni => uni.universityId !== universityId)
      );
      
      setSuccess("University removed from shortlist");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to remove university");
    }
  };

 
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-50 via-white to-teal-50">
        <div className="text-center p-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Loading shortlisted universities...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/auth/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push("/universities")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to All Universities
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Star className={hasLocked ? "text-gray-400" : "text-teal-600"} size={32} />
            {hasLocked && <Lock className="text-teal-600" size={32} />}
            <h1 className="text-3xl font-bold text-gray-900">
              {hasLocked ? "Locked University" : "Shortlisted Universities"}
            </h1>
          </div>
          <p className="text-gray-600">
            {hasLocked 
              ? "Your final university selection" 
              : `${shortlistedUniversities.length} universities in your shortlist`
            }
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-xl">
            <p className="text-sm text-teal-700 font-medium">{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {/* ✅ LOCKED STATE: Show ONLY locked university */}
        {hasLocked && lockedUniversity && (
          <>
            <div className="bg-linear-to-br from-teal-50 to-teal-100 border-2 border-teal-600 rounded-2xl p-8 mb-8 text-center">
              <Lock className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-teal-900 mb-2">🎉 University Locked!</h3>
              <p className="text-teal-700 text-lg mb-6">
                Your university is locked and ready for application guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ShortlistedUniversityCard
                key={lockedUniversity.universityId}
                university={lockedUniversity}
                onLock={() => setError("Cannot lock - university already selected")}
                onRemove={() => setError("Cannot remove - university is locked")}
                isLocked={true}
              />
            </div>
          </>
        )}

        {/* ✅ UNLOCKED STATE: Show shortlisted universities */}
        {!hasLocked && (
          <>
            {/* Info Banner */}
            {shortlistedUniversities.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Ready to Lock?</h3>
                <p className="text-blue-700">
                  Review your shortlisted universities and lock the one you want to proceed with. 
                  Remember, you can only lock <strong>one university</strong> and this decision is permanent.
                </p>
              </div>
            )}

            {/* Shortlisted Universities Grid */}
            {shortlistedUniversities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shortlistedUniversities.map((university) => (
                  <ShortlistedUniversityCard
                    key={university.universityId}
                    university={university}
                    onLock={handleLockClick}
                    onRemove={handleRemoveFromShortlist}
                    isLocked={lockedUniversityId === university.universityId}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                <Star className="text-gray-300 mx-auto mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Universities Shortlisted</h3>
                <p className="text-gray-600 mb-6">
                  Start exploring universities and add them to your shortlist.
                </p>
                <button
                  onClick={() => router.push("/universities")}
                  className="px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all duration-200"
                >
                  Browse Universities
                </button>
              </div>
            )}
          </>
        )}

        {/* Lock Confirmation Modal */}
        <LockConfirmationModal
          isOpen={isModalOpen}
          universityName={selectedUniversity?.name || ""}
          onConfirm={handleConfirmLock}
          onCancel={handleCancelLock}
          loading={lockLoading}
        />
      </div>
    </div>
  );
}
