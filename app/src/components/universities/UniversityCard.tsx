'use client';

import { Star, MapPin, CheckCircle, GraduationCap } from "lucide-react";

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
  isShortlisted?: boolean;
}

interface UniversityCardProps {
  university: University;
  onShortlist: (universityId: string) => Promise<void>;
  onRemove?: (universityId: string) => Promise<void>;
  loading?:boolean;
}

export default function UniversityCard({ 
  university, 
  onShortlist, 
  onRemove ,
  loading=false
}: UniversityCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {university.name}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{university.country}</span>
          </div>
        </div>
        <GraduationCap className="w-10 h-10 text-teal-500 mt-0.5 shrink-0" />
      </div>

      {/* Content - Takes available space */}
      <div className="flex-1 flex flex-col justify-between mb-5">
        {/* Degrees + Fields */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Degrees</p>
            <p className="text-sm font-semibold text-gray-900">
              {(university.availableDegrees || []).join(', ')}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Fields</p>
            <p className="text-sm font-semibold text-gray-900 wrap-break-word">
              {(university.fields || []).join(', ')}
            </p>
          </div>
        </div>

        {/* Cost + GPA + Intake */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Cost Level </p>
            <p className="text-xs font-semibold text-gray-900 capitalize">{university.costLevel?.toLowerCase() || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">GPA</p>
            <p className="text-sm font-bold text-green-700">{university.avgGPARequirement || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Intake</p>
            <p className="text-xs font-semibold text-gray-900 max-h-10 overflow-y-auto">
              {(university.intake || []).join(' • ')}
            </p>
          </div>
        </div>
      </div>

      {/* Button - ALWAYS BOTTOM */}
      <div className="mt-auto shrink-0">
        {university.isShortlisted ? (
          <button
            onClick={() => onRemove?.(university.universityId)}
            className="w-full flex items-center justify-center gap-2 bg-green-50 text-green-700 py-3 px-4 rounded-xl font-semibold text-sm border hover:bg-green-100 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Shortlisted
          </button>
        ) : (
          <button
            onClick={async () => {
              try {
                await onShortlist(university.universityId);
              } catch (error) {
                console.error('Shortlist failed:', error);
              }
            }}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md transition-all"
          >
            <Star className="w-4 h-4" />
            Shortlist
          </button>
        )}
      </div>
    </div>
  );
}
