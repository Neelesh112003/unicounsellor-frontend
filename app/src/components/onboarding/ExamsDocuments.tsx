interface ExamsDocumentsProps {
  data: {
    IELTS: string;
    TOEFL: string;
    GRE: string;
    GMAT: string;
    SOP: 'NOT_STARTED' | 'DRAFT' | 'READY';
  };
  onChange: (field: string, value: any) => void;
}

export default function ExamsDocuments({ data, onChange }: ExamsDocumentsProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Exams & Documents</h2>
        <p className="text-gray-500 mt-2">Add your test scores (optional)</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IELTS Score
          </label>
          <input
            type="text"
            placeholder="e.g., 7.5"
            value={data.IELTS}
            onChange={(e) => onChange("IELTS", e.target.value)}
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            TOEFL Score
          </label>
          <input
            type="text"
            placeholder="e.g., 100"
            value={data.TOEFL}
            onChange={(e) => onChange("TOEFL", e.target.value)}
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GRE Score
          </label>
          <input
            type="text"
            placeholder="e.g., 320"
            value={data.GRE}
            onChange={(e) => onChange("GRE", e.target.value)}
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GMAT Score
          </label>
          <input
            type="text"
            placeholder="e.g., 700"
            value={data.GMAT}
            onChange={(e) => onChange("GMAT", e.target.value)}
            className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Statement of Purpose (SOP)
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "NOT STARTED", label: "Not Started" },
            { value: "DRAFT", label: "Draft" },
            { value: "READY", label: "Ready" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("SOP", option.value)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                data.SOP === option.value
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}