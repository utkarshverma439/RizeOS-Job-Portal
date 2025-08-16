import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext.jsx";
import { API, authHeader } from "../shared/api.js";
import { useNavigate } from "react-router-dom";

export default function Profile(){
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', bio:'', linkedin:'', walletAddress:'', skills:[], autoExtract:true });
  const [resume, setResume] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    if(!token){ navigate('/login'); return; }
    (async()=>{
      const res = await axios.get(`${API}/api/profile/me`, { headers: authHeader(token) });
      const u = res.data.user;
      setForm({ name: u.name||'', bio: u.bio||'', linkedin: u.linkedin||'', walletAddress: u.walletAddress||'', skills: u.skills||[], autoExtract:true });
    })();
  }, [token]);

  async function parseResume(){
    const fd = new FormData();
    if(resume) fd.append('file', resume);
    else fd.append('text', form.bio);
    const res = await axios.post(`${API}/api/ai/parse-resume`, fd, { headers: authHeader(token) });
    setForm(f=>({...f, bio: res.data.text, skills: Array.from(new Set([...(f.skills||[]), ...(res.data.skills||[])])) }));
  }

  async function save(e){
    e.preventDefault();
    const res = await axios.put(`${API}/api/profile/me`, form, { headers: authHeader(token) });
    setMsg('Saved');
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="font-semibold text-xl mb-2">Your Profile</h2>
      <form onSubmit={save} className="space-y-2">
        <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="input" placeholder="LinkedIn" value={form.linkedin} onChange={e=>setForm({...form, linkedin:e.target.value})} />
        <textarea className="input" rows="4" placeholder="Bio" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} />
        <input className="input" placeholder="Wallet" value={form.walletAddress} onChange={e=>setForm({...form, walletAddress:e.target.value})} />
        <div className="flex gap-2 items-center">
          <input type="file" onChange={e=>setResume(e.target.files[0])} />
          <button type="button" className="btn" onClick={parseResume}>Parse CV</button>
        </div>
        <div>Skills: {form.skills.join(', ')}</div>
        <button className="btn bg-indigo-600 text-white">Save</button>
        {msg && <div className="text-sm text-green-600">{msg}</div>}
      </form>
    </div>
  );
}
