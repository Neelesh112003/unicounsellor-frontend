import { MessageSquare } from "lucide-react";

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
  disabled: boolean;
}

const suggestedQuestions = [
  "What universities do you recommend for me?",
  "Suggest me university.",
  "What are my strengths in my profile?",
  "Where is my profile weak?",
  "What should I focus on improving?",
];

export default function SuggestedQuestions({
  onSelectQuestion,
  disabled,
}: SuggestedQuestionsProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="text-teal-600" size={18} />
        <p className="text-sm font-medium text-gray-700">Suggested Questions</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectQuestion(question)}
            disabled={disabled}
            className="px-4 py-2 bg-teal-50 text-teal-700 rounded-xl text-sm font-medium hover:bg-teal-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-teal-200"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}