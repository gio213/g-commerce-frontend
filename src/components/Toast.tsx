import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    let toastId: string | null = null;

    if (type === "success") {
      toastId = toast.success(message, { duration: 5000 });
    } else if (type === "error") {
      toastId = toast.error(message, { duration: 5000 });
    }

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
      clearTimeout(timer);
    };
  }, [message, type, onClose]);

  return <Toaster />;
};

export default Toast;
