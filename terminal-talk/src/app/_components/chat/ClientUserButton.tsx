'use client';

import { useState, useEffect } from 'react';
import { SignedIn, UserButton } from '@clerk/nextjs';

export default function ClientUserButton({
  isCollapsed,
}: {
  isCollapsed: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything on server
  if (!isMounted) {
    return (
      <div className="border-t border-gray-800/50 p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse" />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="h-4 w-24 bg-gray-600 rounded animate-pulse mb-1" />
              <div className="h-3 w-20 bg-gray-700 rounded animate-pulse" />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Only render the real component after mount
  return (
    <div className="border-t border-gray-800/50 p-3">
      <SignedIn>
        <div className="flex items-center gap-3">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
                userButtonPopoverRootBox: 'absolute',
                userButtonPopoverCard: `
                  ${isCollapsed ? 'left-16' : 'left-0'} 
                  bottom-full 
                  mb-2
                `,
                userButtonPopoverActionButton: 'hover:bg-gray-100',
                userButtonPopoverActionButtonIcon: 'text-gray-600',
                userButtonPopoverFooter: 'hidden',
              },
            }}
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Your Account
              </p>
              <p className="text-xs text-gray-400">Manage profile</p>
            </div>
          )}
        </div>
      </SignedIn>
    </div>
  );
}
