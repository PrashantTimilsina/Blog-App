import { toast } from "react-toastify";

export const successMsg = (msg, delay) => {
  return toast.success(msg, { autoClose: delay });
};
export const errorMsg = (msg, delay) => {
  return toast.error(msg, { autoClose: delay });
};
