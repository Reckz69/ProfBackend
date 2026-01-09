import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  // 🔥 THIS FIXES REFRESH ISSUE
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
  
        console.log("ME API FULL RESPONSE 👉", res.data);
  
        const userData =
          res.data?.data?.user ||
          res.data?.user ||
          res.data?.data;
  
        setUser(userData);
      } catch (err) {
        console.log("Auth fetch failed", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
  

 
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
