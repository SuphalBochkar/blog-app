export function AuthorSkeleton() {
  return (
    <div className="p-4">
      <div className="mb-3 animate-pulse">
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </div>
      <div className="flex gap-3 w-full animate-pulse">
        <div className="flex gap-2 mb-3">
          <div className="flex">
            <div className="bg-gray-300 w-12 h-12 rounded-full"></div>
          </div>
        </div>
        <div>
          <div className="flex mb-1 items-center">
            <div className="h-6 w-48 bg-gray-300 rounded mb-2"></div>
          </div>
          <div className="flex flex-col w-full gap-1">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
