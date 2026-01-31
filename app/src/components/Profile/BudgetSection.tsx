import { DollarSign } from "lucide-react";

interface BudgetSectionProps {
  data: {
    yearlyBudget?: number;
    fundingPlan?: "SELF_FUNDED" | "SCHOLARSHIP" | "LOAN";  // ✅ Fixed: underscores
  };
}

export default function BudgetSection({ data }: BudgetSectionProps) {
  // ✅ Fixed: Keys match interface exactly
  const fundingLabels = {
    SELF_FUNDED: "Self Funded",
    SCHOLARSHIP: "Scholarship",
    LOAN: "Loan"
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <DollarSign className="text-blue-600" size={20} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Budget</h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Yearly Budget (USD)</label>
          <p className="text-gray-900 font-medium">
            {data.yearlyBudget ? `$${data.yearlyBudget.toLocaleString()}` : "Not specified"}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-500 mb-1 block">Funding Plan</label>
          <p className="text-gray-900 font-medium">
            {/* ✅ Safe access with type assertion */}
            {data.fundingPlan && fundingLabels[data.fundingPlan as keyof typeof fundingLabels] || "Not specified"}
          </p>
        </div>
      </div>
    </div>
  );
}
