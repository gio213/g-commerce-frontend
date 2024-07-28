import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    let toastId: React.ReactText | null = null;

    if (type === "success") {
      toastId = toast.success(message, { autoClose: 5000 });
    } else if (type === "error") {
      toastId = toast.error(message, { autoClose: 5000 });
    }

    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      if (toastId !== null) {
        toast.dismiss(toastId);
      }
      clearTimeout(timer);
    };
  }, [message, type, onClose]);

  return <ToastContainer position="bottom-right" />;
};

export default Toast;
