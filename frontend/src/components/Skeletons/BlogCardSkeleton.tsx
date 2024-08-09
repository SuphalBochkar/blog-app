import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const BlogCardSkeleton = () => {
  return (
    <div className="h-[500px]">
      <Skeleton height={300} className="mb-3 rounded-3xl" />
      <Skeleton />
      <Skeleton className="mb-3" />
      <Skeleton />
      <Skeleton />
      <Skeleton className="mb-3" />
      <div className="flex items-center justify-start gap-3">
        <Skeleton circle width={40} height={40} />
        <Skeleton width={120} />
        <Skeleton width={10} height={10} />
        <Skeleton width={90} />
      </div>
    </div>
  );
};
