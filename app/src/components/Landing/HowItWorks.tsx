import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Complete Your Profile",
    description: "Share your academic background, study goals, and preferences",
  },
  {
    number: "02",
    title: "Get AI Recommendations",
    description: "Receive personalized university matches tailored to your profile",
  },
  {
    number: "03",
    title: "Lock Your Choice",
    description: "Review options and confidently lock your dream university",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-linear-to-br from-teal-50 via-white to-blue-50 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600">
            Three simple steps to your study-abroad journey
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-6">
                <div className="shrink-0">
                  <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {step.description}
                  </p>
                </div>
                <div className="shrink-0 hidden md:block">
                  <CheckCircle className="text-teal-600" size={32} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}