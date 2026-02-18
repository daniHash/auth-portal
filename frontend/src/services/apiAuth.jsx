import apiRequests from "./config/axiosConfig";
import toast from "react-hot-toast";

export const register = async (body) => {
  const loadingToastId = toast.loading("Submitting...");

  try {
    const response = await apiRequests.post("/auth/register", body);
    toast.success("Welcome", {
      id: loadingToastId,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error("User already exists", {
        id: loadingToastId,
      });
    } else {
      toast.error("Something went wrong", {
        id: loadingToastId,
      });
    }
    throw error;
  }
};
export const login = async (body) => {
  const loadingToastId = toast.loading("Submitting...");

  try {
    const response = await apiRequests.post("auth/login", body);
    toast.success("User created. please login", {
      id: loadingToastId,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error("Username or Password is inval", {
        id: loadingToastId,
      });
    } else {
      toast.error("Something went wrong", {
        id: loadingToastId,
      });
    }
    throw error;
  }
};
