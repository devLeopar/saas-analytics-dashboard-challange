import { Skeleton } from '@/components/ui/skeleton'

export const ChartSkeleton = () => (
  <div className="bg-card flex h-[300px] w-full items-end gap-2 rounded-md border p-4 sm:gap-4">
    <Skeleton className="h-1/2 w-full" />
    <Skeleton className="h-3/4 w-full" />
    <Skeleton className="h-1/3 w-full" />
    <Skeleton className="h-5/6 w-full" />
    <Skeleton className="h-1/2 w-full" />
    <Skeleton className="h-2/3 w-full" />
    <Skeleton className="h-5/6 w-full" />
    <Skeleton className="h-full w-full" />
  </div>
)
