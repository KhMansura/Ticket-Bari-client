const TicketSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-sm border border-base-200 h-full flex flex-col animate-pulse">
      {/* Image Skeleton */}
      <div className="h-52 w-full bg-base-300"></div>
      
      <div className="card-body p-5 space-y-4">
        {/* Title Skeleton */}
        <div className="h-6 bg-base-300 rounded w-3/4"></div>
        
        {/* Meta Info Skeleton */}
        <div className="flex gap-2">
          <div className="h-4 bg-base-300 rounded w-1/4"></div>
          <div className="h-4 bg-base-300 rounded w-1/4"></div>
        </div>
        
        <div className="h-px bg-base-200 my-2"></div>
        
        {/* Perks Skeleton */}
        <div className="flex gap-2">
          <div className="h-6 bg-base-200 rounded-full w-12"></div>
          <div className="h-6 bg-base-200 rounded-full w-12"></div>
        </div>
        
        {/* Button Skeleton */}
        <div className="mt-auto h-12 bg-base-300 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default TicketSkeleton;