import apiRequests from "./axiosConfig";
import toast from "react-hot-toast";

export const register = async (body) => {
  const loadingToastId = toast.loading("Submitting...");

  try {
    const response = await apiRequests.post("/visitors", body);
    toast.success("Welcome", {
      id: loadingToastId,
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Something was wrong", {
      id: loadingToastId,
    });
    throw error;
  }
};
export const login = async (body) => {
  const loadingToastId = toast.loading("Submitting...");

  try {
    const response = await apiRequests.post("/visitors", body);
    toast.success("Welcome", {
      id: loadingToastId,
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error("Something was wrong", {
      id: loadingToastId,
    });
    throw error;
  }
};
