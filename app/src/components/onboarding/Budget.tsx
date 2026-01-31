interface BudgetProps {
  data: {
    yearlyBudget: number;
    fundingPlan: 'SELF_FUNDED' | 'SCHOLARSHIP' | 'LOAN';
  };
  onChange: (field: string, value: any) => void;
}

export default function Budget({ data, onChange }: BudgetProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Budget Planning</h2>
        <p className="text-gray-500 mt-2">Share your financial plans</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Yearly Budget (USD)
        </label>
        <input
          type="number"
          placeholder="e.g., 50000"
          required
          value={data.yearlyBudget || ""}
          onChange={(e) => onChange("yearlyBudget", parseInt(e.target.value) || 0)}
          className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Funding Plan
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: "SELF_FUNDED", label: "Self Funded" },
            { value: "SCHOLARSHIP", label: "Scholarship" },
            { value: "LOAN", label: "Loan" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange("fundingPlan", option.value)}
              className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                data.fundingPlan === option.value
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