// app/chat/_components/ChatNavbar.tsx
import { ThemeToggle } from './ThemeToggle';
export function ChatNavbar() {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        Terminal Talks
      </h1>
      <ThemeToggle />
    </div>
  );
}
