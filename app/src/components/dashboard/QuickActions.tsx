import { Bot, School, User } from "lucide-react";
import Link from "next/link";

interface ActionCard {
  icon: any;
  title: string;
  description: string;
  href: string;
  iconColor: string;
  bgColor: string;
}

const actions: ActionCard[] = [
  {
    icon: Bot,
    title: "AI Counsellor",
    description: "Get personalized guidance for your university journey",
    href: "/counsellor",
    iconColor: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    icon: School,
    title: "Universities",
    description: "Explore and compare universities worldwide",
    href: "/universities",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: User,
    title: "Profile",
    description: "View and update your academic profile",
    href: "/profile",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
];

export default function QuickActions() {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 ${action.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className={action.iconColor} size={24} />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {action.title}
              </h4>
              <p className="text-sm text-gray-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}