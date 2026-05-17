import { createContext, useEffect, useState, useContext } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  //register
  const register = async (data) => {
    setError(null);
    try {
      const res = await API.post("/auth/register", data);
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      setUser(null);
      throw message;
    }
  };

  //login
  const login = async (data) => {
    setError(null);
    try {
      const res = await API.post("/auth/login", data);
      await checkAuth();
      return res;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      setUser(null);
      throw message;
    }
  };

  //logout
  const logout = async () => {
    setError(null);
    try {
      await API.post("/auth/logout");
      setUser(null);
    } catch (error) {}
  };

  const value = {
    user,
    isLoggedIn: !!user,
    error,
    loading,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Hook
export const useAuth = () => useContext(AuthContext);
