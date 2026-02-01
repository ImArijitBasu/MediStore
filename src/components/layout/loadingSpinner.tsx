// src/components/common/LoadingSpinner.tsx
import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "white" | "gray";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  color = "primary",
  text,
  fullScreen = false,
  className = "",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  const colorClasses = {
    primary: "text-blue-600",
    white: "text-white",
    gray: "text-gray-400",
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`animate-spin rounded-full border-2 border-solid border-current border-r-transparent ${
            sizeClasses[size]
          } ${colorClasses[color]}`}
          style={{ animationDuration: "0.8s" }}
          role="status"
        />
        {/* Inner dot for better visibility */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className={`w-1/3 h-1/3 rounded-full ${
              color === "white" ? "bg-white" : "bg-current"
            } opacity-30`}
          />
        </div>
      </div>
      {text && (
        <p
          className={`mt-4 text-sm font-medium ${
            color === "white" ? "text-white" : "text-gray-600"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
