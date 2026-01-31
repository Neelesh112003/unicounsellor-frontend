import { CheckCircle, Circle } from "lucide-react";

interface Step {
  label: string;
  completed: boolean;
}

interface ProgressIndicatorProps {
  steps: Step[];
}

export default function ProgressIndicator({ steps }: ProgressIndicatorProps) {
  const completedCount = steps.filter(s => s.completed).length;
  const totalCount = steps.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
        <span className="text-sm font-medium text-teal-600">
          {completedCount} of {totalCount} completed
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-teal-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            {step.completed ? (
              <CheckCircle className="text-teal-600 shrink-0" size={20} />
            ) : (
              <Circle className="text-gray-300 shrink-0" size={20} />
            )}
            <span className={`text-sm ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}