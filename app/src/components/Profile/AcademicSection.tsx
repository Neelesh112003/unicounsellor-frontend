import { GraduationCap } from "lucide-react";

interface AcademicSectionProps {
  data: {
    educationLevel?: string;
    degree?: string;
    graduationYear?: number;
    gpa?: number;
  };
}

export default function AcademicSection({ data }: AcademicSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
          <GraduationCap className="text-teal-600" size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Academic Background</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Education Level</label>
          <p className="text-gray-900 font-medium">{data.educationLevel || "Not specified"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Degree/Field</label>
          <p className="text-gray-900 font-medium">{data.degree || "Not specified"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Graduation Year</label>
          <p className="text-gray-900 font-medium">{data.graduationYear || "Not specified"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">GPA</label>
          <p className="text-gray-900 font-medium">{data.gpa || "Not specified"}</p>
        </div>
      </div>
    </div>
  );
}
