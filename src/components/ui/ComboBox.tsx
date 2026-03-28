import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface OptionType {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface ComboBoxProps {
  options: OptionType[];
  placeholder?: string;
  onChange: (option: OptionType) => void;
  value?: OptionType | null;
}

export default function ComboBox({
  options,
  placeholder = "Select...",
  onChange,
  value,
}: ComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className="flex items-center justify-between w-full px-4 py-3 text-sm bg-white border border-gray-200 rounded-md cursor-pointer hover:border-primary-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`flex items-center gap-2 ${value ? "text-gray-900" : "text-gray-400"} `}
        >
          {value?.icon && (
            <span className="text-primary-500"> {value.icon} </span>
          )}
          {value ? value.label : placeholder}
        </span>
        <ChevronDown size={16} className="text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto animate-in fade-in zoom-in-95">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                value?.value === option.value
                  ? "bg-primary-50 text-primary-600 font-medium"
                  : "text-gray-900 hover:bg-gray-50"
              }`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option.icon && (
                <span
                  className={
                    value?.icon === option.icon
                      ? "text-primary-500"
                      : "text-gray-500"
                  }
                >
                  {" "}
                  {option.icon}{" "}
                </span>
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
