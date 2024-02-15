import { Skeleton } from "@nextui-org/react";

export default function Recipe() {
  return (
    <div className="h-[calc(100vh-5rem)] overflow-scroll max-w-[50rem] m-auto shadow-lg p-8">
      {/* Title */}
      <Skeleton className="w-3/5 rounded-lg mb-4">
        <div className="h-10 rounded-lg"></div>
      </Skeleton>
      {/* Image */}
      <Skeleton className="w-4/5 rounded-lg mb-6">
        <div className="h-72 rounded-lg"></div>
      </Skeleton>
      {/* Description */}
      <div className="space-y-3">
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-3 rounded-lg"></div>
        </Skeleton>
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 rounded-lg"></div>
        </Skeleton>
      </div>
      {/* Ingredients */}
      <div className="space-y-3 mt-10">
        <Skeleton className="w-1/5 rounded-lg">
          <div className="h-4 rounded-lg"></div>
        </Skeleton>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-2/5 rounded-lg">
            <div className="h-3 rounded-lg"></div>
          </Skeleton>
        ))}
      </div>
      {/* Instructions */}
      <div className="space-y-3 mt-8">
        <Skeleton className="w-1/5 rounded-lg">
          <div className="h-4 rounded-lg"></div>
        </Skeleton>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-5/5 rounded-lg">
            <div className="h-3 rounded-lg"></div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
