import { CheckCircle, Sparkles, Lock } from "lucide-react";

type StageType = "PROFILE_COMPLETE" | "SHORTLISTING" | "UNIVERSITY_LOCKED";

interface ProgressCardProps {
  stage: StageType;
  onAction: () => void;
  // ✅ NO profile prop - matches your Dashboard call
}

const stageConfig: Record<StageType, any> = {
  PROFILE_COMPLETE: {
    icon: CheckCircle,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    badge: "Profile Complete",
    badgeColor: "bg-teal-100 text-teal-700",
    title: "Your profile is all set! 🎉",
    description: "Start exploring universities with AI-powered recommendations tailored to your profile.",
    ctaText: "Talk to AI Counsellor",
    ctaColor: "bg-teal-600 hover:bg-teal-700",
  },
  SHORTLISTING: {
    icon: Sparkles,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    badge: "Shortlisting",
    badgeColor: "bg-purple-100 text-purple-700",
    title: "AI Recommendations Ready",
    description: "We've analyzed your profile and found universities that match your goals and preferences.",
    ctaText: "View Recommendations",
    ctaColor: "bg-purple-600 hover:bg-purple-700",
  },
  UNIVERSITY_LOCKED: {
    icon: Lock,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    badge: "University Locked",
    badgeColor: "bg-blue-100 text-blue-700",
    title: "Final University Selected",
    description: "You've locked in your university choice. Review your application details and next steps.",
    ctaText: "View Locked University",
    ctaColor: "bg-blue-600 hover:bg-blue-700",
  },
};

export default function ProgressCard({ stage, onAction }: ProgressCardProps) {
  const config = stageConfig[stage];
  const Icon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} rounded-2xl p-6 mb-8`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center border ${config.borderColor}`}>
            <Icon className={config.iconColor} size={24} />
          </div>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.badgeColor}`}>
            {config.badge}
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">{config.title}</h2>
      <p className="text-gray-600 mb-6">{config.description}</p>

      <button
        onClick={onAction}
        className={`${config.ctaColor} text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl`}
      >
        {config.ctaText}
      </button>
    </div>
  );
}
