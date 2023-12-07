import "./topbar.css";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaHouse, FaUser } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { IoChevronDownSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";

function TopBar() {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState("Song");
    const [user, setUser] = useState("Login");
    const loggedIn = true;
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
                <div class="custom-select">
                    <select onChange={(e) => setSearchType(e.target.value)}
                        className="form-control dropdown-search" id="dropdown">
                        <option>Song</option>
                        <option>Album</option>
                        <option>Artist</option>
                        <option>Playlist</option>
                    </select>
                    <div class="select-icon">
                        <IoChevronDownSharp />
                    </div>
                </div>
                <input className="text form-control search-bar" placeholder="Search artists, songs, or friends"></input>
                <BsSearch />

            </div>
            <div className="text-end col login">
                {loggedIn && (
                    <div>
                        <a className="text-decoration-none"
                            onClick={() => handleClick("Profile")}><FaUser />{user}</a>
                    </div>
                )}
                {!loggedIn && (
                    <div>
                        <a className="text-decoration-none"
                            onClick={() => handleClick("Login")}><FaUser />{user}</a>
                    </div>
                )}

            </div>

        </div>
    )
}
export default TopBar;