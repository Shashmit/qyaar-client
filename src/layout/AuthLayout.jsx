import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";

const AuthLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios({
        method: "GET",
        url: import.meta.env.VITE_BASE_URL + "api/users/checkAuth",
      });
      if (res.data.isLoggedIn) {
        navigate("/");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  return loading ? (
    <Loading fullHeight />
  ) : (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
