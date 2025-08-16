import React, { createContext, useContext, useEffect, useState } from "react";
const Ctx = createContext();
export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!token) { setUser(null); localStorage.removeItem("token"); return; }
    localStorage.setItem("token", token);
    // fetch user
    (async()=>{
      try{
        const res = await fetch(`${import.meta.env.VITE_API || 'http://localhost:4000'}/api/profile/me`, { headers: { Authorization:`Bearer ${token}` } });
        if(res.ok){ const j = await res.json(); setUser(j.user); }
      }catch(e){ setUser(null); }
    })();
  }, [token]);
  return <Ctx.Provider value={{ token, setToken, user, setUser }}>{children}</Ctx.Provider>;
}
export function useAuth(){ return useContext(Ctx); }
