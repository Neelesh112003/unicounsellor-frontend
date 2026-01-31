import { Bot, School, Target } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Guidance",
    description: "Get personalized recommendations based on your academic profile and goals",
  },
  {
    icon: School,
    title: "University Matching",
    description: "Discover universities that align with your aspirations and budget",
  },
  {
    icon: Target,
    title: "Smart Decision Making",
    description: "Make confident choices with AI-driven insights and risk analysis",
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="text-teal-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}