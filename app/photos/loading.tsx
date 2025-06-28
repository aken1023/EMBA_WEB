export default function PhotosLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Skeleton with Literary Style */}
        <div className="mb-12 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent h-px top-1/2 transform -translate-y-1/2"></div>
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-8 py-4 inline-block">
            <div className="flex items-center justify-center mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="h-5 w-5 bg-amber-200 rounded mx-3 animate-pulse"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
            <div className="h-10 bg-amber-200 rounded-lg mb-3 animate-pulse"></div>
            <div className="h-6 bg-amber-100 rounded-lg animate-pulse"></div>
            <div className="flex items-center justify-center mt-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-amber-400"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full mx-3 animate-bounce"></div>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-amber-400"></div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-8">
          <div className="grid grid-cols-3 gap-2 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-lg p-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 bg-amber-100 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Search and Filters Skeleton */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 h-12 bg-white/80 rounded-lg border border-amber-200/50 animate-pulse"></div>
          <div className="w-full md:w-48 h-12 bg-white/80 rounded-lg border border-amber-200/50 animate-pulse"></div>
          <div className="w-full md:w-48 h-12 bg-white/80 rounded-lg border border-amber-200/50 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="w-12 h-12 bg-white/80 rounded-lg border border-amber-200/50 animate-pulse"></div>
            <div className="w-12 h-12 bg-white/80 rounded-lg border border-amber-200/50 animate-pulse"></div>
          </div>
          <div className="w-32 h-12 bg-gradient-to-r from-amber-200 to-orange-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Albums Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-lg overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Image Skeleton */}
              <div className="aspect-video bg-gradient-to-br from-amber-200 to-orange-200 relative">
                <div className="absolute top-3 right-3 flex gap-2">
                  <div className="w-12 h-6 bg-amber-300 rounded"></div>
                  <div className="w-16 h-6 bg-amber-300 rounded"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-6 bg-white/80 rounded mb-2"></div>
                  <div className="h-4 bg-white/60 rounded w-3/4"></div>
                </div>
              </div>

              {/* Content Skeleton */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-amber-200 rounded"></div>
                  <div className="h-4 bg-amber-200 rounded w-4/5"></div>
                </div>

                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-amber-100 rounded-full"></div>
                  <div className="h-6 w-20 bg-amber-100 rounded-full"></div>
                  <div className="h-6 w-14 bg-amber-100 rounded-full"></div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="h-4 w-8 bg-amber-200 rounded"></div>
                    <div className="h-4 w-12 bg-amber-200 rounded"></div>
                  </div>
                  <div className="h-4 w-20 bg-amber-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Cards Skeleton for My Photos Tab */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-lg p-6 text-center animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-8 h-8 bg-amber-200 rounded mx-auto mb-3"></div>
              <div className="h-8 bg-amber-200 rounded mb-2"></div>
              <div className="h-4 bg-amber-100 rounded"></div>
            </div>
          ))}
        </div>

        {/* Recent Photos Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-lg overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-200"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
