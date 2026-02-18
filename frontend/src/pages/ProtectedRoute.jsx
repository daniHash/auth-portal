import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import apiRequests from "../services/config/axiosConfig";
import toast from "react-hot-toast";
import useAuth from "../context/useAuth";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const { setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiRequests.get("/auth/login/success", {
          withCredentials: true,
        });
        if (res.status === 200 && res.data.success) {
          setAuthorized(true);
        } else {
          navigate("/login");
        }
        setUser(res.data.user);
      } catch {
        navigate("/login");
        toast.error("Unauthorized. Please log in.");
      }
    };

    checkAuth();
  }, [navigate, setUser]);

  if (!authorized) return null;

  return <Outlet />;
};

export default ProtectedRoute;
