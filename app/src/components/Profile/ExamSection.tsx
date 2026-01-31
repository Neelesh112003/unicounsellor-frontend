import { FileText } from "lucide-react";

interface ExamsSectionProps {
  data: {
    IELTS?: string;
    TOEFL?: string;
    GRE?: string;
    GMAT?: string;
    SOP?: "NOT_STARTED" | "DRAFT" | "READY";  // ✅ Fixed: underscore
  };
}

export default function ExamsSection({ data }: ExamsSectionProps) {
  // ✅ Fixed: Match interface exactly (underscore, no spaces)
  const sopLabels = {
    NOT_STARTED: "Not Started",
    DRAFT: "Draft",
    READY: "Ready"
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
          <FileText className="text-green-600" size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Exams & Documents</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">IELTS Score</label>
          <p className="text-gray-900 font-medium">{data.IELTS || "Not taken"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">TOEFL Score</label>
          <p className="text-gray-900 font-medium">{data.TOEFL || "Not taken"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">GRE Score</label>
          <p className="text-gray-900 font-medium">{data.GRE || "Not taken"}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">GMAT Score</label>
          <p className="text-gray-900 font-medium">{data.GMAT || "Not taken"}</p>
        </div>
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-500 mb-1 block">Statement of Purpose</label>
          {/* ✅ Safe access with fallback */}
          <p className="text-gray-900 font-medium">
            {data.SOP && sopLabels[data.SOP as keyof typeof sopLabels] || "Not started"}
          </p>
        </div>
      </div>
    </div>
  );
}
