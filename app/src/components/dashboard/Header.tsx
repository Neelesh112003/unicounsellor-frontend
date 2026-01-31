interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Welcome back, {userName} 👋
      </h1>
      <p className="text-gray-500 text-lg">
        Your AI-powered university journey
      </p>
    </div>
  );
}