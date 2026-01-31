interface AcademicBackgroundProps {
  data: {
    educationLevel: string;
    degree: string;
    graduationYear: number;
    gpa: number;
  };
  onChange: (field: string, value: any) => void;
  disabled?: boolean;
}

export default function AcademicBackground({ data, onChange, disabled }: AcademicBackgroundProps) {
  const isFormValid = data.educationLevel && data.degree && data.graduationYear > 0 && data.gpa > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Academic Background</h2>
        <p className="text-gray-500 mt-2">Tell us about your education <span className="text-red-500">*</span></p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-1">
          Education Level <span className="text-red-500 text-xs">*</span>
        </label>
        <select
          required
          disabled={disabled}
          value={data.educationLevel}
          onChange={(e) => onChange("educationLevel", e.target.value)}
          className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            data.educationLevel 
              ? 'border-gray-200' 
              : 'border-red-300 bg-red-50'
          } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
        >
          <option value="">Select level *</option>
          <option value="HIGH_SCHOOL">High School</option>
          <option value="BACHELORS">Bachelor's</option>
          <option value="MASTERS">Master's</option>
          <option value="PHD">PhD</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-1">
          Degree/Field <span className="text-red-500 text-xs">*</span>
        </label>
        <input
          required
          disabled={disabled}
          type="text"
          placeholder="e.g., Computer Science *"
          value={data.degree}
          onChange={(e) => onChange("degree", e.target.value)}
          className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            data.degree 
              ? 'border-gray-200' 
              : 'border-red-300 bg-red-50'
          } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-1">
            Graduation Year <span className="text-red-500 text-xs">*</span>
          </label>
          <input
            required
            disabled={disabled}
            type="number"
            min="1900"
            max="2030"
            placeholder="2024 *"
            value={data.graduationYear || ""}
            onChange={(e) => onChange("graduationYear", parseInt(e.target.value) || 0)}
            className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
              data.graduationYear 
                ? 'border-gray-200' 
                : 'border-red-300 bg-red-50'
            } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-1">
            GPA (out of 10.0) <span className="text-red-500 text-xs">*</span>
          </label>
          <input
            required
            disabled={disabled}
            type="number"
            step="0.01"
            min="0"
            max="10"
            placeholder="3.5 *"
            value={data.gpa || ""}
            onChange={(e) => onChange("gpa", parseFloat(e.target.value) || 0)}
            className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
              data.gpa 
                ? 'border-gray-200' 
                : 'border-red-300 bg-red-50'
            } ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
    </div>
  );
}
