import { useEffect } from "react";
import Swal from "sweetalert2";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (type === "success") {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: message,
        timer: 5000,
        showConfirmButton: true,
        willClose: onClose,
      });
    } else if (type === "error") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
        timer: 5000,
        showConfirmButton: true,
        willClose: onClose,
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message, type, onClose]);

  return null;
};

export default Toast;
