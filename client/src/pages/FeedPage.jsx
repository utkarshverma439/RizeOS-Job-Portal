import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../shared/AuthContext.jsx";
import { API, authHeader } from "../shared/api.js";

function JobCard({ job, onApply }){
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <div className="text-xs text-slate-500">{job.location} • {job.budget}</div>
        </div>
        <div className="flex gap-2">
          {job.skills.map(s=> <div key={s} className="tag">{s}</div>)}
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-700">{job.description}</p>
      <div className="mt-3">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={()=>onApply(job)}>Apply</button>
      </div>
    </div>
  );
}

export default function FeedPage(){
  const { token, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');
  const [skill, setSkill] = useState('');

  async function load(){
    const p = await axios.get(`${API}/api/posts`); setPosts(p.data.posts);
    const j = await axios.get(`${API}/api/jobs`, { params: { q, skill } }); setJobs(j.data.jobs);
  }
  useEffect(()=>{ load(); }, []);
  useEffect(()=>{ const t=setTimeout(()=>load(),300); return ()=>clearTimeout(t); }, [q, skill]);

  function handleApply(job){
    if(!token){
      window.location.href = '/login';
      return;
    }
    alert('Application flow not implemented in demo. Show modal or send message.');
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="header-hero card mb-4">
          <h1 className="text-2xl font-bold">Find talent. Get hired. On-chain.</h1>
          <p className="text-sm text-slate-600">AI-matched jobs + Web3 payments. Demo build for RizeOS.</p>
        </div>

        <div className="card mb-4">
          <div className="flex gap-2">
            <input className="input" placeholder="Search jobs..." value={q} onChange={e=>setQ(e.target.value)} />
            <input className="input" placeholder="Filter skill" value={skill} onChange={e=>setSkill(e.target.value)} />
          </div>
        </div>

        {jobs.map(j=> <JobCard key={j._id} job={j} onApply={handleApply} />)}
      </div>

      <div>
        <div className="card mb-4">
          <h3 className="font-semibold">Social Feed</h3>
          <div className="mt-3 space-y-3">
            {posts.map(p=> <div key={p._id} className="border rounded-lg p-3">{p.text}</div>)}
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold">How it works</h3>
          <ol className="text-sm mt-2 space-y-1 text-slate-600">
            <li>1. Sign up and connect wallet</li>
            <li>2. Pay small fee to post a job</li>
            <li>3. Apply to jobs and get matched via AI</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
