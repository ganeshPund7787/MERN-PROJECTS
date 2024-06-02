import { toast } from "react-hot-toast";

const useToast = () => {

  const showToast = (data) => {
    if (data.success === false) {
      return toast.error(data.message, {
        duration: 3000,
        style: {
          color: "#000",
          backgroundColor: "#fff",
        },
      });
    }
    if (data.success) {
      return toast.success(data.message, {
        duration: 3000,
        style: {
          color: "#000",
          backgroundColor: "#fff",
        },
      });
    }

    return toast.error(data.message, {
      duration: 3000,
      style: {
        color: "#000",
        backgroundColor: "#fff",
      },
    });
  };
  return { showToast };
};

export default useToast;
