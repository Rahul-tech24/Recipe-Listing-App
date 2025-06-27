export default function Loading() {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-6">
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
            />
          ))}
        </div>
      </div>
    );
  }
  