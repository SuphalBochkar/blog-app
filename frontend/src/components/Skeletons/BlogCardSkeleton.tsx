export const BlogCardSkeleton = () => {
  return (
    <div className="border-b border-slate-500 p-3 pb-2 animate-pulse">
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div className="w-20 h-4 bg-gray-300 rounded ml-2"></div>
        <div className="w-3 h-3 bg-gray-300 rounded-full ml-2"></div>
        <div className="w-20 h-4 bg-gray-300 rounded ml-2"></div>
      </div>
      <div className="w-full h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
      <div className="w-20 h-4 bg-gray-300 rounded mt-3"></div>
    </div>
  );
};
