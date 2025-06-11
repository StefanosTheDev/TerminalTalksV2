'use client';

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 text-center">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-2">Meet TerminalTalk v1</h2>
      <p className="text-lg text-gray-600 mb-10">
        Technically Accurate, With Great Audio Quality
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-600 to-pink-500 text-white shadow-md flex flex-col justify-between">
          <p>
            “Understanding distributed systems is essential in today’s
            cloud-native world. <span className="font-semibold">SHARPLY</span>{' '}
            distinguishing between consistency and availability is the core of
            CAP theorem.”
          </p>
          <button className="mt-6 border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition">
            PLAY
          </button>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-green-700 to-green-400 text-white shadow-md flex flex-col justify-between">
          <p>
            <span className="uppercase font-semibold text-xs text-gray-200">
              ARCHITECT
            </span>{' '}
            Let's talk microservices. The benefit? Speed. The tradeoff?
            Complexity. <span className="font-semibold">CLEARLY</span> managing
            inter-service communication is key.
          </p>
          <button className="mt-6 border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition">
            PLAY
          </button>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-cyan-700 to-emerald-500 text-white shadow-md flex flex-col justify-between">
          <p>
            When debugging, it’s not always the code — it’s often the
            assumptions. <span className="font-semibold">REPEATEDLY</span> test
            and break things before they break you.
          </p>
          <button className="mt-6 border border-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-black transition">
            PLAY
          </button>
        </div>
      </div>
      <button> Get</button>
    </section>
  );
}
