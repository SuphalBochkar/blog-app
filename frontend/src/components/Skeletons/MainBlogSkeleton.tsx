const MainBlogSkeleton = () => {
  return (
    <div className="flex flex-col w-full items-start p-6 mx-auto">
      {/* Title Skeleton */}
      <div className="h-8 bg-gray-200 rounded mb-4 animate-pulse w-5/6"></div>

      {/* Author and Date Skeleton */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="flex flex-col">
          <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-full"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-4/6"></div>
    </div>
  );
};

export default MainBlogSkeleton;
