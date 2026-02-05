import { createContext, useContext, useState, useEffect } from "react";
import { fetchProfile } from "../api/services/profile";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const profile = await fetchProfile();
      if (profile) setUser(profile);
      setLoading(false);
    }
    checkAuth();
  }, []);

  const login = async ()=>{
    const profile = await fetchProfile();
    setUser(profile);
    return true;
  };


  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);