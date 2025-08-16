import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function Navbar(){
  const { token, setToken, user } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center gap-4 p-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-bold text-indigo-600">RizeOS</Link>
          <div className="hidden md:block">
            <input placeholder="Search jobs, skills..." className="input w-80" onKeyDown={(e)=>{ if(e.key==='Enter') navigate(`/?q=${e.target.value}`); }} />
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm">Feed</Link>
          <Link to="/post-job" className="text-sm">Post Job</Link>
          {token ? (
            <>
              <Link to="/profile"><img src="https://avatars.dicebear.com/api/initials/:seed.svg" alt="me" className="w-8 h-8 rounded-full" /></Link>
              <button className="btn" onClick={()=>setToken(null)}>Logout</button>
            </>
          ) : (
            <div className="flex gap-2 items-center"><Link to="/login" className="text-sm text-indigo-600">Login</Link><Link to="/register" className="text-sm">Register</Link></div>
          )}
        </div>
      </div>
    </nav>
  );
}
