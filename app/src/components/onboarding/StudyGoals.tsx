interface StudyGoalsProps {
  data: {
    degreeType: string;
    fieldOfStudy: string;
    targetIntake: string;
    preferredCountries: string[];
  };
  onChange: (field: string, value: any) => void;
  toggleCountry: (country: string) => void;
}

export default function StudyGoals({ data, onChange, toggleCountry }: StudyGoalsProps) {
  const isFormValid = data.degreeType && data.fieldOfStudy && data.targetIntake && data.preferredCountries.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Study Goals</h2>
        <p className="text-gray-500 mt-2">What are you planning to study? <span className="text-red-500">*</span></p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-1">
          Degree Type <span className="text-red-500 text-xs">*</span>
        </label>
        <select
          required
          value={data.degreeType}
          onChange={(e) => onChange("degreeType", e.target.value)}
          className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            data.degreeType 
              ? 'border-gray-200' 
              : 'border-red-300 bg-red-50'
          }`}
        >
          <option value="">Select degree type *</option>
          <option value="BACHELORS">Bachelor's</option>
          <option value="MASTERS">Master's</option>
          <option value="PHD">PhD</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-1">
          Field of Study <span className="text-red-500 text-xs">*</span>
        </label>
        <input
          required
          type="text"
          placeholder="e.g., Data Science *"
          value={data.fieldOfStudy}
          onChange={(e) => onChange("fieldOfStudy", e.target.value)}
          className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            data.fieldOfStudy 
              ? 'border-gray-200' 
              : 'border-red-300 bg-red-50'
          }`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-1">
          Target Intake <span className="text-red-500 text-xs">*</span>
        </label>
        <select
          required
          value={data.targetIntake}
          onChange={(e) => onChange("targetIntake", e.target.value)}
          className={`w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
            data.targetIntake 
              ? 'border-gray-200' 
              : 'border-red-300 bg-red-50'
          }`}
        >
          <option value="">Select intake *</option>
          <option value="FALL">Fall</option>
          <option value="SPRING">Spring</option>
          <option value="WINTER">Winter</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3 items-center gap-1">
          Preferred Countries <span className="text-red-500 text-xs">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["USA", "UK", "Canada", "Australia", "Germany", "France"].map((country) => (
            <button
              key={country}
              type="button"
              onClick={() => toggleCountry(country)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                data.preferredCountries.includes(country)
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {country}
            </button>
          ))}
        </div>
        <p className={`text-xs mt-2 ${
          data.preferredCountries.length > 0 
            ? 'text-green-600' 
            : 'text-red-500'
        }`}>
          {data.preferredCountries.length > 0 
            ? `Selected: ${data.preferredCountries.join(', ')}`
            : 'Select at least 1 country *'
          }
        </p>
      </div>
    </div>
  );
}
