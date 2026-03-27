import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  label: string;
  subLabel?: string;
  className?: string;
  onChange?: (file: File | null) => void;
}

export default function ImageUpload({
  label,
  subLabel,
  className,
  onChange,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // handle choose file to upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.message("Please upload an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.warning("File size must be less than 5MB");
        return;
      }

      const imgUrl = URL.createObjectURL(file);
      setPreviewUrl(imgUrl);

      onChange?.(file);
    }
  };
  // handle remove image
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.(null);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className={`relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer p-6 ${className}`}
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <div className="relative w-full h-full">
            <img
              src="{previewUrl}"
              alt="Preview"
              className="w-full h-full object-cover roudned-md"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-white/70 backdrop-blur-sm rounded-full text-gray-500 hover:bg-white hover:text-danger-500 transition-all opacity-0 group-hover:opacity-100"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <UploadCloud className="w-10 h-10 text-primary-500 mb-3" />
            <p className="text-sm text-gray-900 font-medium">
              <span className="text-gray-900">{label}</span> or drop here
            </p>
            {subLabel && (
              <p className="text-xs text-gray-500 mt-1 max-w-62.5">
                {subLabel}
              </p>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
