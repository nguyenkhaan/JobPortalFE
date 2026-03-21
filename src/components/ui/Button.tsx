import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "social";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "flex items-center justify-center gap-2 py-3 px-4 rounded-md font-medium transition-all duration-200";
  const variants = {
    primary: "bg-primary-500 text-bg-white hover:bg-primary-600",
    social: "border border-gray-100 text-gray-700 bg-bg-white hover:bg-gray-50",
  };

  const widthClass = fullWidth ? "w-full" : "w-auto";
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
