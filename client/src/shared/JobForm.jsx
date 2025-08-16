import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";
import { API, authHeader } from "./api.js";
import { useNavigate } from "react-router-dom";

export default function JobForm(){
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form,setForm] = useState({ title:'', description:'', skills:'', location:'Remote', budget:'' });
  const [msg,setMsg] = useState('');

  useEffect(()=>{ if(!token) navigate('/login'); }, [token]);

  async function submit(e){
    e.preventDefault();
    setMsg('');
    try{
      const payload = {...form, skills: form.skills.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean)};
      await axios.post(`${API}/api/jobs`, payload, { headers: authHeader(token) });
      setMsg('Job posted');
      setForm({ title:'', description:'', skills:'', location:'Remote', budget:'' });
    }catch(e){
      setMsg(e?.response?.data?.error || 'Failed');
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl mb-2">Post a Job</h2>
      <form onSubmit={submit} className="space-y-2">
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <textarea className="input" rows="6" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input className="input" placeholder="Skills (comma-separated)" value={form.skills} onChange={e=>setForm({...form, skills:e.target.value})} />
        <input className="input" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        <input className="input" placeholder="Budget" value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} />
        <button className="btn bg-indigo-600 text-white">Create Job</button>
        {msg && <div className="text-sm text-green-600">{msg}</div>}
      </form>
    </div>
  );
}
