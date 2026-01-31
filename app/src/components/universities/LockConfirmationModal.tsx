import { AlertTriangle, X } from "lucide-react";

interface LockConfirmationModalProps {
  isOpen: boolean;
  universityName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function LockConfirmationModal({
  isOpen,
  universityName,
  onConfirm,
  onCancel,
  loading,
}: LockConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        {/* Close Button */}
        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:cursor-not-allowed"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-yellow-600" size={32} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
          Lock University?
        </h3>

        {/* University Name */}
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4">
          <p className="text-center text-lg font-bold text-teal-600">
            {universityName}
          </p>
        </div>

        {/* Warning Message */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-yellow-800 text-center leading-relaxed">
            ⚠️ You can lock <strong>only ONE university</strong>. This decision is <strong>permanent</strong> and cannot be changed later.
          </p>
        </div>

        <p className="text-gray-600 text-center mb-6">
          Are you absolutely sure you want to lock this university?
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {loading ? "Locking..." : "Yes, Lock It"}
          </button>
        </div>
      </div>
    </div>
  );
}