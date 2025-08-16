import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../shared/AuthContext.jsx";
import Navbar from "../shared/Navbar.jsx";
import FeedPage from "../pages/FeedPage.jsx";
import Login from "../shared/Login.jsx";
import Register from "../shared/Register.jsx";
import Profile from "../shared/Profile.jsx";
import JobForm from "../shared/JobForm.jsx";

export default function App(){
  return (
    <AuthProvider>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-job" element={<JobForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </AuthProvider>
  );
}
