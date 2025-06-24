import Link from 'next/link';

export function GettingStarted() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4">Getting started</h2>
      <p className="text-gray-300 mb-6">
        To get started, create a new application on the{' '}
        <Link href="#" className="text-blue-400 hover:text-blue-300 underline">
          Terminal Talks Dashboard ↗
        </Link>{' '}
        and grab an API key from the API Keys tab. Then select your framework to
        learn how to integrate Terminal Talks in your application in minutes.
      </p>
    </section>
  );
}
