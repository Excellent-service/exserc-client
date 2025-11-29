"use client"

export default function BuildingPlaceholder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <div
          className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-emerald-500 rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-2 h-2 bg-green-600 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3.5s" }}
        ></div>
        <div
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-emerald-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Construction crane animation */}
        <div className="mb-8 relative">
          <div className="inline-block relative">
            {/* Crane base */}
            <div className="w-4 h-20 bg-gradient-to-t from-green-800 to-green-600 mx-auto mb-2 rounded-t-sm"></div>

            {/* Crane arm */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 origin-bottom animate-pulse">
              <div className="w-24 h-2 bg-green-700 rounded-full transform rotate-12"></div>

              {/* Hanging hook with block */}
              <div className="absolute right-2 top-2 transform origin-top animate-swing">
                <div className="w-0.5 h-8 bg-green-800 mx-auto"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded shadow-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main heading with typewriter effect */}
        <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4 animate-pulse">Under Construction</h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-green-700 mb-8 font-medium">{"We're building something amazing!"}</p>

        {/* Building blocks animation */}
        <div className="flex justify-center items-end space-x-2 mb-8">
          <div className="w-8 h-8 bg-green-500 rounded animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-8 h-12 bg-emerald-500 rounded animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-8 h-16 bg-green-600 rounded animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          <div className="w-8 h-20 bg-emerald-600 rounded animate-bounce" style={{ animationDelay: "0.6s" }}></div>
          <div className="w-8 h-12 bg-green-500 rounded animate-bounce" style={{ animationDelay: "0.8s" }}></div>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <p className="text-green-700 mb-2 font-medium">Construction Progress</p>
          <div className="w-full bg-green-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"
              style={{ width: "67%" }}
            ></div>
          </div>
          <p className="text-green-600 mt-2 text-sm">67% Complete</p>
        </div>

        {/* Tools animation */}
        <div className="flex justify-center space-x-6 mb-8">
          {/* Hammer */}
          <div className="transform rotate-12 animate-bounce" style={{ animationDelay: "0s", animationDuration: "2s" }}>
            <div className="w-2 h-8 bg-amber-600 rounded-full"></div>
            <div className="w-6 h-4 bg-gray-600 rounded-t-lg -mt-1 ml-1"></div>
          </div>

          {/* Wrench */}
          <div
            className="transform -rotate-12 animate-bounce"
            style={{ animationDelay: "0.5s", animationDuration: "2s" }}
          >
            <div className="w-1 h-8 bg-gray-500 rounded-full mx-auto"></div>
            <div className="w-4 h-3 bg-gray-600 rounded-full -mt-1"></div>
          </div>

          {/* Screwdriver */}
          <div className="transform rotate-45 animate-bounce" style={{ animationDelay: "1s", animationDuration: "2s" }}>
            <div className="w-1 h-6 bg-amber-700 rounded-full mx-auto"></div>
            <div className="w-3 h-4 bg-gray-700 rounded -mt-1"></div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200">
          <p className="text-green-800 text-lg mb-4">
            {"Our team is hard at work crafting an exceptional experience for you."}
          </p>
          <p className="text-green-600">{"Check back soon to see what we've built!"}</p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      {/* Custom CSS for swing animation */}
      <style jsx>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}