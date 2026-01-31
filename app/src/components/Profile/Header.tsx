import { User, Mail, Calendar } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  memberSince: string;
}

export default function ProfileHeader({ name, email, memberSince }: ProfileHeaderProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6">
      <div className="flex items-start">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 bg-linear-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <User className="text-white" size={40} />
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Member since {memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
