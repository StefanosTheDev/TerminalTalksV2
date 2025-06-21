export default function MainContent() {
  return (
    <main className="flex-1 ml-64">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Next.js Introduction
        </h1>
        <p className="text-gray-600 mb-8">
          Next.js is a React framework that enables you to build full-stack web
          applications by extending the latest React features.
        </p>

        {/* Content Sections */}
        <div className="space-y-6">
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-3">Quick Start</h2>
            <p className="text-gray-600">
              Get up and running quickly with our step-by-step guide.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Server-side rendering</li>
              <li>Static site generation</li>
              <li>API routes</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-3">Resources</h2>
            <p className="text-gray-600">
              Find additional learning materials and documentation.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
