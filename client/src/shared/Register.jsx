import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";
import { API } from "./api.js";
import { useNavigate } from "react-router-dom";

export default function Register(){
  const { setToken } = useAuth();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault(); setErr('');
    try{
      const res = await axios.post(`${API}/api/auth/register`, { name, email, password });
      setToken(res.data.token);
      navigate('/');
    }catch(e){
      setErr(e?.response?.data?.error || 'Register failed');
    }
  }

  return (
    <div className="card">
      <h2 className="font-semibold text-xl mb-2">Register</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="input" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-sm text-red-600">{err}</div>}
        <button className="btn bg-indigo-600 text-white">Create Account</button>
      </form>
    </div>
  );
}
