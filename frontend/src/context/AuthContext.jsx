import { createContext, useEffect, useState } from "react";

import http from "../util/HttpHelper";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const nonAuthRoutes = ["/sign-in", "/sign-up"];

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const signout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Successfully Signed Out");
    navigate("sign-in");
  };

  console.log("Auth Context:", user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(true);
    if (token) {
      http
        .get("emp/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.data);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } else {
      setIsLoading(false);
      if (!nonAuthRoutes.includes(location.pathname)) {
        navigate("/sign-in");
      }
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <AuthContext.Provider
          value={{ isAuthenticated, user, setUser, signout }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};

export { AuthProvider };
