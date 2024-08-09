const MainBlogSkeleton = () => {
  return (
    <div className="w-full p-4">
      {/* Title Skeleton */}
      <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse w-5/6"></div>
      {/* Date Skeleton */}
      <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse w-4/6"></div>
      {/* Content Skeleton */}
      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-full"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-4/6"></div>
    </div>
  );
};

export default MainBlogSkeleton;
