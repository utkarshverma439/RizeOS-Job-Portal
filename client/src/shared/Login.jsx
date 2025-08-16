import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";
import { API } from "./api.js";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const { setToken } = useAuth();
  const [email,setEmail]=useState('demo@rizeos.dev');
  const [password,setPassword]=useState('demo1234');
  const [err,setErr]=useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    setErr('');
    try{
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
      setToken(res.data.token);
      navigate('/');
    }catch(e){
      setErr(e?.response?.data?.error || 'Login failed');
    }
  }

  return (
    <div className="card">
      <h2 className="font-semibold text-xl mb-2">Login</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <div className="flex gap-2">
          <button className="btn bg-indigo-600 text-white">Login</button>
          <button type="button" className="btn" onClick={()=>{ setEmail('demo@rizeos.dev'); setPassword('demo1234'); }}>Fill Demo</button>
        </div>
      </form>
    </div>
  );
}
