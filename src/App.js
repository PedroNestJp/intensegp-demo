import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './auth/login/login';
import Dashboard from './dashboard/dashboard';
import SignUp from './auth/register/signup';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={< SignUp/>} />
    </Routes>
  );
};
