// Toast.tsx
import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface ToastProps {
  show: boolean;
  success: boolean;
  msg: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ show, success, msg, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 flex items-start gap-3 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in">
      {success ? (
        <CheckCircle2 className="text-green-400" />
      ) : (
        <XCircle className="text-red-400" />
      )}
      <span className="text-sm">{msg}</span>
      <button onClick={onClose} className="ml-2 text-white/70 hover:text-white">
        ✕
      </button>
    </div>
  );
};

export default Toast;
