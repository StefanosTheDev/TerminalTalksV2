import Link from 'next/link';
export default function NotFound() {
  return (
    <>
      <h1 className="text-4xl lg:text-4xl font-bold mb-6">
        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
          404 Not Found
        </span>
      </h1>

      <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
        This Route Does Not Exist
      </p>
      <p className="text-gray-300 mb-6">
        <Link
          href="/docs"
          className="text-blue-400 hover:text-blue-300 underline"
        >
          Click Here To Go Back
        </Link>
      </p>
    </>
  );
}
