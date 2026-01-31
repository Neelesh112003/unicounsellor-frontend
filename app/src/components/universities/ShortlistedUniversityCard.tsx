'use client';

import { Lock, MapPin, DollarSign, TrendingUp, X } from "lucide-react";

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

interface ShortlistedUniversityCardProps {
  university: University;
  onLock: (universityId: string) => void;
  onRemove: (universityId: string) => void;
  isLocked: boolean;
}

const categoryConfig = {
  DREAM: {
    label: "Dream",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  TARGET: {
    label: "Target", 
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  SAFE: {
    label: "Safe",
    color: "bg-green-100 text-green-700 border-green-200",
  },
};

const costLevelConfig = {
  LOW: { label: "Low Cost", color: "text-green-600" },
  MEDIUM: { label: "Medium Cost", color: "text-yellow-600" },
  HIGH: { label: "High Cost", color: "text-red-600" },
};

const acceptanceChanceConfig = {
  LOW: { label: "Low", color: "text-red-600" },
  MEDIUM: { label: "Medium", color: "text-yellow-600" },
  HIGH: { label: "High", color: "text-green-600" },
};

export default function ShortlistedUniversityCard({ 
  university, 
  onLock, 
  onRemove,
  isLocked 
}: ShortlistedUniversityCardProps) {
  const categoryStyle = categoryConfig[university.category];
  const costStyle = costLevelConfig[university.costLevel];
  const acceptanceStyle = acceptanceChanceConfig[university.acceptanceChance];

  return (
    <div className={`bg-white border rounded-2xl p-6 hover:shadow-lg transition-all duration-200 h-full flex flex-col ${
      isLocked ? "border-teal-300 shadow-lg" : "border-gray-200"
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
            {university.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
            <MapPin size={16} />
            <span>{university.country}</span>
          </div>
          <span className={`inline-block px-3 py-1 rounded-lg text-sm font-semibold border ${categoryStyle.color}`}>
            {categoryStyle.label}
          </span>
        </div>

        {/* Remove Button */}
        {!isLocked && (
          <button
            onClick={() => onRemove(university.universityId)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1 -m-1"
            title="Remove from shortlist"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between mb-4 space-y-3">
        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign size={18} />
              <span className="text-sm font-medium">Cost Level</span>
            </div>
            <span className={`text-sm font-bold ${costStyle.color}`}>
              {costStyle.label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp size={18} />
              <span className="text-sm font-medium">Acceptance</span>
            </div>
            <span className={`text-sm font-bold ${acceptanceStyle.color}`}>
              {acceptanceStyle.label}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">GPA Match</span>
            <span className={`text-sm font-bold ${
              university.gpaMatch === "Good fit" ? "text-green-600" : "text-yellow-600"
            }`}>
              {university.gpaMatch}
            </span>
          </div>
        </div>

        {/* Fit Reason */}
        <div className="bg-teal-50 border border-teal-100 rounded-xl p-3">
          <p className="text-sm text-teal-800">
            <strong>Why this fits:</strong> {university.fitReason}
          </p>
        </div>

        {/* Risk */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3">
          <p className="text-sm text-gray-700">
            <strong>Risk:</strong> {university.risk}
          </p>
        </div>
      </div>

      {/* Button - ALWAYS BOTTOM */}
      <div className="mt-auto shrink-0">
        {isLocked ? (
          <div className="w-full flex items-center justify-center gap-2 bg-teal-100 text-teal-700 py-3 rounded-xl font-semibold border-2 border-teal-600">
            <Lock size={18} />
            University Locked ✓
          </div>
        ) : (
          <button
            onClick={() => onLock(university.universityId)}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Lock size={18} />
            Lock This University
          </button>
        )}
      </div>
    </div>
  );
}
