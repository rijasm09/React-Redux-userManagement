import "./App.css";
import Login from "./Components/User/LoginPage/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/User/SignupPage/Signup";
import Home from "./Components/User/Home/Home";
import AdminLogin from "./Components/Admin/Login/AdminLogin";
import Adminhome from "./Components/Admin/Home/Adminhome";
import Profile from "./Components/User/Profile/Profile";
import Edit from "./Components/Admin/Edit/Edit";
import Add from "./Components/Admin/Add/Add"
import React, { Component }  from 'react';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin" element={<Adminhome  />} />
        <Route exact path="/admin/edit-user" element={<Edit  />} />
        <Route exact path="/admin/add-user" element={<Add  />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
