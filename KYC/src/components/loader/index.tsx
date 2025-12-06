export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-purple-50">
      {/* Bouncing Dots */}
      <div className="flex space-x-3 mb-8">
        <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-5 h-5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-5 h-5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Spinning Circle */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
      </div>

      {/* Progress Bar Animation */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}