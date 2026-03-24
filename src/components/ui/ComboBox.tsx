import React, { useState, useRef, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";

const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      savedHandler.current();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
};

export interface OptionType {
  label: string;
  value: string | number;
}

interface ComboBoxProps {
  options?: OptionType[];
  placeholder?: string;
  onChange?: (option: OptionType) => void;
}

const ComboBox = ({
  options = [],
  placeholder = "",
  onChange,
}: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState<OptionType | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    setOpen(false);
  });

  const handleSelectOption = (option: OptionType) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  const handleToggleOpen = () => {
    if (!open) {
      if (selected) {
        const index = options.findIndex((opt) => opt.value === selected.value);
        setSelectedIndex(index >= 0 ? index : 0);
      } else {
        setSelectedIndex(0);
      }
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggleOpen();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (options[selectedIndex]) {
          handleSelectOption(options[selectedIndex]);
        }
        break;
      case "Escape":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative w-40">
      <div
        className="flex items-center gap-2 flex-1 border p-2 border-gray-200 rounded-md cursor-pointer outline-none focus:ring-2 focus:ring-primary-500"
        onClick={handleToggleOpen}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <label className="text-base text-gray-600 cursor-pointer select-none">
          {selected ? selected.label : placeholder}
        </label>
        <ChevronsUpDown size={16} className="text-gray-600 ml-auto" />
      </div>

      {open && (
        <div className="absolute inset-x-0 z-50 border border-primary-500 p-1 rounded-md flex flex-col items-start justify-start gap-1 max-h-64 overflow-y-auto shadow-sm mt-2 bg-bg-white">
          {options.length > 0 ? (
            options.map((option, index) => (
              <div
                key={`${index}-${option.value}`}
                className={`p-1.5 cursor-pointer text-base rounded-md w-full transition-colors ${
                  selectedIndex === index
                    ? "bg-gray-100"
                    : "bg-transparent hover:bg-neutral-100"
                }`}
                onClick={() => handleSelectOption(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center p-4 text-gray-500 text-sm">
              <p>No options found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;
