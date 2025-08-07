// Feature Card Component
export default function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className={`p-6 bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl hover:border-gray-700/50 transition-all animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-white font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
