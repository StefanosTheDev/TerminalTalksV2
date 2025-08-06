'use client';

import { useState, useEffect } from 'react';

interface TypingMessageProps {
  content: string;
  onComplete?: () => void;
  speed?: number;
}

export function TypingMessage({
  content,
  onComplete,
  speed = 20,
}: TypingMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, content, speed, onComplete]);

  return <>{displayedContent}</>;
}
