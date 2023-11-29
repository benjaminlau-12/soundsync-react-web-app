import "./topbar.css";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaHouse, FaUser } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";

function TopBar() {
    const [user, setUser] = useState("Login");
    const navigate = useNavigate();
    const handleClick = (link) => {
        console.log("handling Click")
        navigate(`/SoundSync/${link}`)
    };
    return (
        <div className="topbar row">
            <div className="home-margin col">
                <a
                    onClick={() => handleClick("Home")}><FaHouse /></a>
            </div>
            <div className="col d-flex search">
                <input className="text form-control" placeholder="Search artists, songs, or friends"></input>
                <BsSearch />
            </div>
            <div className="text-end col login">
                <a className="text-decoration-none"
                    onClick={() => handleClick("Login")}><FaUser />{user}</a>
            </div>

        </div>
    )
}
export default TopBar;