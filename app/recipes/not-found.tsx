import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-5xl font-bold mb-4">404 – Not Found</h1>
      <p className="text-gray-600 mb-6">
        We couldn’t find the recipe you’re looking for.
      </p>
      <Link
        href="/recipes"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Recipes
      </Link>
    </div>
  );
}
