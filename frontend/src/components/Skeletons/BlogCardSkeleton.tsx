import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const BlogCardSkeleton = () => {
  return (
    <div className="h-[300px]">
      <Skeleton />
    </div>
  );
};
