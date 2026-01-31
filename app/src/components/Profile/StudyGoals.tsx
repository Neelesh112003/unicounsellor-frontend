import { Target } from "lucide-react";

interface StudyGoalsSectionProps {
  data: {
    degreeType?: string;
    fieldOfStudy?: string;
    targetIntake?: string;
    preferredCountries?: string[];
  };
}

export default function StudyGoalsSection({ data }: StudyGoalsSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
          <Target className="text-purple-600" size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Study Goals</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Degree Type</label>
          <p className="text-gray-900 font-medium">{data.degreeType || "Not specified"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Field of Study</label>
          <p className="text-gray-900 font-medium">{data.fieldOfStudy || "Not specified"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Target Intake</label>
          <p className="text-gray-900 font-medium">{data.targetIntake || "Not specified"}</p>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-500 mb-2 block">Preferred Countries</label>
          <div className="flex flex-wrap gap-2">
            {/* ✅ FIXED: Safe array check */}
            {data.preferredCountries && data.preferredCountries.length > 0 ? (
              data.preferredCountries.map((country) => (
                <span key={country} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-lg text-sm font-medium">
                  {country}
                </span>
              ))
            ) : (
              <p className="text-gray-900 font-medium">Not specified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
