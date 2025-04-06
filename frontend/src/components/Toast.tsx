import { useEffect } from "react";

type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR" | "LOADING" ;
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {

      const timer = setTimeout(() => {
        onClose();
      }, 3000);
  
      return () => {
        clearTimeout(timer);
      };

  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-[999] p-4 rounded-md bg-green-600 text-white max-w-md w-[150px] lg:w-[200px]"
      : type === "LOADING" 
        ? "fixed top-4 right-4 z-[999] p-4 rounded-md bg-yellow-500 text-white max-w-md w-[150px] lg:w-[200px]"
        : "fixed top-4 right-4 z-[999] p-4 rounded-md bg-red-600 text-white max-w-md w-[150px] lg:w-[200px]"


  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="font-semibold lg:text-lg">{message}</span>
      </div>
    </div>
  );
};

export default Toast;