// src/app/loading.tsx
"use client";
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo/App Name */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center animate-pulse">
              <span className="text-3xl font-bold text-white">💊</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">MediStore</h1>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Outer ring */}
            <div
              className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: "0.8s" }}
            />
            {/* Inner ring */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className="w-6 h-6 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"
                style={{
                  animationDuration: "0.6s",
                  animationDirection: "reverse",
                }}
              />
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-3 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 animate-pulse">
            Loading...
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare everything for you
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-slide"
              style={{
                width: "70%",
                animation: "slide 2s ease-in-out infinite",
              }}
            />
          </div>
        </div>

        {/* Loading Tips (Rotating) */}
        <div className="p-4 bg-white bg-opacity-50 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium text-blue-600">Tip:</span>{" "}
            <span
              className="animate-fade"
              style={{ animation: "fade 3s infinite" }}
            >
              {getRandomTip()}
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        @keyframes fade {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

// Helper function for random tips
function getRandomTip() {
  const tips = [
    "Check your internet connection for faster loading",
    "You can browse medicines by category",
    "Create an account to save your favorites",
    "All medicines are from verified sellers",
    "Use filters to find exactly what you need",
    "Free shipping on orders above $50",
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}
