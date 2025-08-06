// app/_components/chat/GeneratePodcastButton.tsx
'use client';

interface GeneratePodcastButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export function GeneratePodcastButton({
  onClick,
  isLoading,
}: GeneratePodcastButtonProps) {
  return (
    <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
            <svg
              className="w-5 h-5 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              Ready to create your podcast!
            </p>
            <p className="text-xs text-gray-400">
              Click below to generate your episode
            </p>
          </div>
        </div>
        <button
          onClick={onClick}
          disabled={isLoading}
          className="px-4 py-2 bg-white text-[#0a0a0a] text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Podcast'}
        </button>
      </div>
    </div>
  );
}
