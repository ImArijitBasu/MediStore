export function MedicineCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border overflow-hidden animate-pulse flex flex-col h-full">
      <div className="px-4 pt-4 pb-2 flex justify-between">
        <div className="h-6 w-20 bg-muted rounded-full" />
        <div className="h-6 w-12 bg-muted rounded-full" />
      </div>
      <div className="h-48 bg-muted" />
      <div className="p-5 flex flex-col flex-1 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 w-4 bg-muted rounded" />
          ))}
        </div>
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="h-7 w-24 bg-muted rounded" />
            <div className="h-9 w-10 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function MedicineGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MedicineCardSkeleton key={i} />
      ))}
    </div>
  );
}
