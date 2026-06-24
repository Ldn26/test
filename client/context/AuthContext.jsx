import { createContext, useContext, useState, useEffect } from "react";
import api, { setAccessToken } from "../src/api/axiosIntercepter"; // our Axios instance
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Wrapper to update token both in state and axios shared var
  const updateAccessToken = (token) => {
    setAccessTokenState(token);
    setAccessToken(token); // updates the shared variable used by axios
  };



  
  // const login = async (email, password) => {
  //   const res = await api.post("/auth/login", { email, password });
  //   updateAccessToken(res.data.accessToken);
  //   setUser(res.data.user);
  // };

  // const logout = async () => {
  //   await api.post("/auth/logout");
  //   updateAccessToken(null);
  //   setUser(null);
  // };

  useEffect(() => {
    // const tryRefresh = async () => {
    //   try {
    //     const res = await api.post(
    //       "/auth/refresh-token",
    //       {},
    //       { withCredentials: true }
    //     );
    //     updateAccessToken(res.data.accessToken);
    //     setUser(res.data.user || null); // optional if backend sends user
    //   } catch {
    //     console.log("User not logged in or refresh token invalid");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // tryRefresh();
  }, []);




  return (
    <AuthContext.Provider
    //  value={{ accessToken, user, login, logout, loading }}
     >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
