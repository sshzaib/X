import { useAutosizeTextArea } from "@/hooks";
import { useRef } from "react";

interface TextAreaProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export function Textarea({
  placeholder = "",
  value = "",
  onChange,
}: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      <textarea
        ref={textAreaRef}
        id="textarea-id"
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent overflow-y-hidden resize-none text-xl focus:outline-none p-2"
        value={value}
        rows={1}
      />
    </>
  );
}
