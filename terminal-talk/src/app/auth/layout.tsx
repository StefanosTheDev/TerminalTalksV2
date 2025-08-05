// app/auth/layout.tsx
import type { ReactNode } from 'react';
//
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section
      className="
        h-screen            /* fill the viewport height */
        px-4 lg:px-6 
        flex items-center justify-center  /* center contents, optional */
        bg-gradient-to-br from-gray-50 via-white to-gray-100 
        text-black 
        relative overflow-hidden
      "
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {children}
    </section>
  );
}
