import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, title, children, size = "md" }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={ref}
        className={`relative w-full ${sizes[size]} mx-4 rounded-2xl bg-gray-900 text-white shadow-2xl border border-gray-800`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="font-bold text-lg">{title}</div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            ✕
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}
