'use client';

export default function CourseCompletionModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl text-center max-w-xs mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Congratulations!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          You’ve completed the course.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
