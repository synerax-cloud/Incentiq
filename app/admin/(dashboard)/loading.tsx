export default function DashboardLoading() {
  return (
    <div className="flex flex-col animate-pulse">
      {/* Header skeleton */}
      <div className="flex h-14 items-center border-b border-light-gray bg-white px-6">
        <div className="h-5 w-40 rounded-md bg-light-gray" />
      </div>

      <div className="p-6 space-y-5">
        {/* Toolbar skeleton */}
        <div className="flex gap-3">
          <div className="h-9 w-56 rounded-lg bg-light-gray" />
          <div className="h-9 w-32 rounded-lg bg-light-gray" />
          <div className="ml-auto h-9 w-28 rounded-lg bg-light-gray" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-xl border border-light-gray bg-white shadow-sm overflow-hidden">
          <div className="border-b border-light-gray bg-light-gray/30 px-5 py-3 flex gap-6">
            {["w-32", "w-20", "w-24", "w-20", "w-24", "w-16"].map((w, i) => (
              <div key={i} className={`h-4 ${w} rounded bg-light-gray`} />
            ))}
          </div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-5 py-4 border-b border-light-gray last:border-0">
              <div className="h-4 w-48 rounded bg-light-gray" />
              <div className="h-5 w-20 rounded-full bg-light-gray" />
              <div className="h-4 w-24 rounded bg-light-gray" />
              <div className="h-4 w-20 rounded bg-light-gray" />
              <div className="h-4 w-24 rounded bg-light-gray" />
              <div className="ml-auto flex gap-2">
                <div className="h-7 w-7 rounded-md bg-light-gray" />
                <div className="h-7 w-7 rounded-md bg-light-gray" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
