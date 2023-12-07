import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/home";
import Login from "./Login/login";
import "./index.css"
import TopBar from "./TopBar/topbar";
import Profile from "./Profile/profile";

function SoundSync() {
    return (
        <div className="flex-col-container">
            <TopBar />
            <Routes>
                <Route path="/" element={<Navigate to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </div>

    )
}
export default SoundSync;