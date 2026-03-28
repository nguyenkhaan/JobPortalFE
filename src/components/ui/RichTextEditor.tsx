import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  List,
  ListOrdered,
} from "lucide-react";
import { useRef, useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      if (document.activeElement !== editorRef.current) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value]);
  const handleFormat = (command: string, valueStr?: string) => {
    document.execCommand(command, false, valueStr);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    editorRef.current?.focus();
  };
  const handleAddLink = () => {
    const url = prompt("Enter link URL:", "https://");
    if (url) {
      handleFormat("createLink", url);
    }
  };

  return (
    <div className="w-full rounded-md border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-500 transition-all bg-white flex flex-col">
      <div
        ref={editorRef}
        contentEditable
        className="w-full px-4 py-3 text-sm text-gray-900 focus:outline-none min-h-30 cursor-text empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 [&_ul]:list-disc [&_ul]:ml-5 [&_ol]:list-decimal [&_ol]:ml-5"
        data-placeholder={placeholder}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
      />
      <div className="flex items-center gap-1 px-3 py-2 border-t border-gray-100 bg-white text-gray-500">
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("italic")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("underline")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("strikeThrough")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>

        <div className="w-px h-4 bg-gray-200 mx-1"></div>

        <button
          type="button"
          onClick={handleAddLink}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </button>

        <div className="w-px h-4 bg-gray-200 mx-1"></div>

        <button
          type="button"
          onClick={() => handleFormat("insertUnorderedList")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("insertOrderedList")}
          className="p-1.5 hover:bg-gray-100 rounded text-gray-500 transition-colors"
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>
      </div>
    </div>
  );
}
