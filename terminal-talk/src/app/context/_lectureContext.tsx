// app/_components/LectureIndexContext.tsx
'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type LectureIndexContextType = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
};

const LectureIndexContext = createContext<LectureIndexContextType | null>(null);

export function LectureIndexProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  return (
    <LectureIndexContext.Provider value={{ index, setIndex }}>
      {children}
    </LectureIndexContext.Provider>
  );
}

export function useLectureIndex() {
  const ctx = useContext(LectureIndexContext);
  if (!ctx) {
    throw new Error(
      'useLectureIndex must be used within a LectureIndexProvider'
    );
  }
  return ctx;
}
