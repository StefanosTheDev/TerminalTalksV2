'use  client';
'use client';

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-8 py-20">
      <h3 className="text-2xl md:text-3xl font-bold">
        Personalized AI Audio Lectures For Engineers
      </h3>
      <p className="mt-4 max-w-xl text-gray-600">
        Listen on the go and learn faster. TerminalTalk delivers bite-sized
        technical lectures tailored for developers, engineers, and IT
        professionals.
      </p>
      {/* Feature tags */}
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {[
          'React',
          'Anguilar',
          'Typescript',
          'NextJS',
          'Supabase',
          'Firebase',
        ].map((feature) => (
          <span
            key={feature}
            className="px-3 py-1 rounded-full bg-gray-100 text-sm font-medium text-gray-700 shadow-sm"
          >
            {feature}
          </span>
        ))}
      </div>
      {/* Transcript preview box */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-6 text-left mt-8">
        <p className="text-gray-800 mb-4">
          In a world where microservices and monoliths collide, understanding
          software architecture is no longer optional — it's essential. Let’s
          explore the building blocks of scalable systems...
        </p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">ENGLISH ▼</div>
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900 text-sm">
            ▶️ Play
          </button>
        </div>
      </div>
      <p className="text-gray-800 mb-4 mt-12">
        Experience the full Audio AI platform
      </p>
    </section>
  );
}
