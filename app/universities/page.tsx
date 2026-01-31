"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../src/hooks/useAuth"; 
import AuthGuard from "../src/components/layout/AuthGaurd";
import api from "../src/lib/api";
import UniversityCard from "../src/components/universities/UniversityCard";
import { Search, Loader2, ArrowLeft, Lock } from "lucide-react";

interface University {
  _id: string;
  universityId: string;
  name: string;
  country: string;
  availableDegrees: string[];
  fields: string[];
  costLevel: "LOW" | "MEDIUM" | "HIGH";
  competitionLevel: "MEDIUM" | "HIGH" | "LOW";
  avgGPARequirement: string;
  intake: string[];
  category?: "DREAM" | "TARGET" | "SAFE";
  acceptanceChance?: "HIGH" | "MEDIUM" | "LOW";
  fitReason?: string;
  risk?: string;
  gpaMatch?: string;
  isShortlisted?: boolean;
}

export default function UniversitiesPage() {
  useEffect(() => {
    document.title = "Universities";
  }, []);
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [universities, setUniversities] = useState<University[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<University[]>([]);
  const [shortlistedIds, setShortlistedIds] = useState<string[]>([]);
  const [shortlistLoading, setShortlistLoading] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [lockedUniversityId, setLockedUniversityId] = useState<string | null>(null); 

    const stats = useMemo(() => ({
    total: universities.length,
    shortlisted: shortlistedIds.length,
  }), [universities.length, shortlistedIds.length]);


  const fetchUniversities = useCallback(async () => {
    if (!isAuthenticated || authLoading) return; 

    setLoading(true);
    setError("");

    try {
      console.log("🔄 Fetching shortlist + universities + locked status...");
      
      const [shortlistRes, uniRes, lockedRes] = await Promise.all([
        api.get("/shortlist").catch(() => ({ data: { shortlist: [] } })),
        api.get("/universities"),
        api.get("/locked").catch(() => ({ data: { success: false } })) 
      ]);

      const currentShortlist = shortlistRes.data.shortlist.map((uni: any) => uni.universityId);
      const isLocked = lockedRes.data.success && lockedRes.data.lockedUniversity;
      const lockedId = isLocked ? (lockedRes.data.lockedUniversity.universityId || lockedRes.data.lockedUniversity._id) : null;
      
      setShortlistedIds(currentShortlist);
      setLockedUniversityId(lockedId);
      
      console.log("✅ Shortlist:", currentShortlist);
      console.log("🔒 Locked:", lockedId);
      
      const unis = uniRes.data.universities || [];
      
      const universitiesWithShortlistStatus: University[] = unis.map((uni: any) => {
        const id = uni.universityId || uni._id?.toString();
        return {
          _id: id,
          universityId: id,
          name: uni.name || "Unknown University",
          country: uni.country || "Unknown",
          availableDegrees: uni.availableDegrees || [],
          fields: uni.fields || [],
          costLevel: uni.costLevel || "MEDIUM",
          competitionLevel: uni.competitionLevel || "MEDIUM",
          avgGPARequirement: uni.avgGPARequirement || "3.0+",
          intake: uni.intake || [],
          category: uni.category,
          acceptanceChance: uni.acceptanceChance,
          fitReason: uni.fitReason,
          risk: uni.risk,
          gpaMatch: uni.gpaMatch,
          isShortlisted: currentShortlist.includes(id)
        };
      });
      
      setUniversities(universitiesWithShortlistStatus);
      setFilteredUniversities(universitiesWithShortlistStatus);
      
    } catch (err: any) {
      console.error("❌ Fetch error:", err);
      setError(err?.response?.data?.message || "Failed to fetch universities");
      setShortlistedIds([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  useEffect(() => {
    fetchUniversities();
  }, [fetchUniversities]);

  
  useEffect(() => {
    let filtered = universities;
    if (searchQuery.trim()) {
      filtered = filtered.filter((uni) =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    }
    setFilteredUniversities(filtered);
  }, [searchQuery, universities]);


  const handleShortlist = async (universityId: string) => {
    if (lockedUniversityId) {
      console.log("🚫 Cannot shortlist - university locked");
      return;
    }
    
    if (!universityId || shortlistedIds.includes(universityId)) return;

    setShortlistLoading(prev => ({ ...prev, [universityId]: true }));

    try {
      await api.post("/shortlist", { universityId });
      const newShortlisted = [...shortlistedIds, universityId];
      setShortlistedIds(newShortlisted);
      
      setUniversities(prev => 
        prev.map(uni => uni.universityId === universityId ? { ...uni, isShortlisted: true } : uni)
      );
      setFilteredUniversities(prev => 
        prev.map(uni => uni.universityId === universityId ? { ...uni, isShortlisted: true } : uni)
      );
    } catch (error: any) {
      console.error("❌ Shortlist failed:", error.response?.data?.message);
    } finally {
      setShortlistLoading(prev => ({ ...prev, [universityId]: false }));
    }
  };

  const handleRemoveShortlist = async (universityId: string) => {
    if (lockedUniversityId) {
      console.log("🚫 Cannot remove - university locked");
      return;
    }
    
    if (!universityId || !shortlistedIds.includes(universityId)) return;

    setShortlistLoading(prev => ({ ...prev, [universityId]: true }));

    try {
      await api.delete(`/shortlist/${universityId}`);
      const newShortlisted = shortlistedIds.filter(id => id !== universityId);
      setShortlistedIds(newShortlisted);
      
      setUniversities(prev => 
        prev.map(uni => uni.universityId === universityId ? { ...uni, isShortlisted: false } : uni)
      );
      setFilteredUniversities(prev => 
        prev.map(uni => uni.universityId === universityId ? { ...uni, isShortlisted: false } : uni)
      );
    } catch (error) {
      console.error("❌ Remove failed:", error);
    } finally {
      setShortlistLoading(prev => ({ ...prev, [universityId]: false }));
    }
  };

  const mainContent = (
    <>
  
      <div className="text-center mb-12">
        {lockedUniversityId ? (

          <div className="bg-linear-to-r from-teal-100 to-emerald-100 border-2 border-teal-300 rounded-3xl p-8 mb-8">
            <Lock className="w-16 h-16 text-teal-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-4">
              You Have Locked a University
            </h1>
            <p className="text-xl text-teal-800 max-w-2xl mx-auto">
              Browse top universities for reference. Shortlisting is disabled after locking.
            </p>
          </div>
        ) : (
        
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-gray-900 to-teal-700 bg-clip-text text-transparent mb-4">
            Top Universities
          </h1>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
          <p className="text-gray-600 font-medium">Total Universities</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className={`border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${lockedUniversityId ? 'bg-gray-50 border-gray-200' : 'bg-emerald-50 border-emerald-200'}`}>
          <p className={lockedUniversityId ? 'text-gray-600 font-medium' : 'text-emerald-700 font-medium'}>Shortlisted</p>
          <p className={`text-3xl font-bold mt-1 ${lockedUniversityId ? 'text-gray-500' : 'text-emerald-800'}`}>
            {lockedUniversityId ? 'Locked' : stats.shortlisted}
          </p>
        </div>
      </div>

      
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
        <div className="flex items-center">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search universities by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none focus:outline-none focus:ring-0 text-lg placeholder-gray-500"
            disabled={loading}
          />
        </div>
      </div>

   
      {!lockedUniversityId && stats.shortlisted > 0 && (
        <div className="mb-8 text-center">
          <button
            onClick={() => router.push("/shortlisted-universities")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-teal-600 to-teal-700 text-white font-bold text-lg rounded-2xl hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
          >
            View Shortlist ({stats.shortlisted})
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      )}


      {loading && (
        <div className="min-h-[50vh] flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-teal-600 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-700">Loading universities...</p>
          </div>
        </div>
      )}

      {error && universities.length === 0 && !loading && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-red-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <span className="text-3xl text-red-600">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Universities</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">{error}</p>
          <button
            onClick={fetchUniversities}
            className="px-8 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && universities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((university) => (
              <UniversityCard
                  key={university.universityId}
                  university={university}
                  onShortlist={handleShortlist}
                  onRemove={handleRemoveShortlist}
                  loading={shortlistLoading[university.universityId] || false}
                />

            ))
          ) : (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50">
              <Search className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No universities found</h3>
              <p className="text-lg text-gray-600 mb-8">Try searching for a university name</p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      )}

      
      {filteredUniversities.length !== universities.length && filteredUniversities.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-lg text-gray-600 bg-gray-50 px-6 py-3 rounded-xl">
            Showing {filteredUniversities.length} of {universities.length} universities
          </p>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-teal-50"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AuthGuard>{mainContent}</AuthGuard>
      </div>
    </div>
  );
}
