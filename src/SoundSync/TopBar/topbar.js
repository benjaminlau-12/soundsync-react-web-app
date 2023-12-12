import "./topbar.css";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaHouse, FaUser } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { getUser, signout} from "../Login/client";
import { SlLogout } from "react-icons/sl";

function TopBar() {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState("Song");
    const [user, setUser] = useState({"username": "Log In"});
    const handleClick = (link) => {
        navigate(`/SoundSync/${link}`)
    };

    const fetchUser = async () => {
        const account = await getUser();
        setUser(account);
     };

     useEffect(() => {
        fetchUser();
    });


    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        const searchValue = event.target.elements.searchInput.value;
        navigate(`/SoundSync/search?q=${encodeURIComponent(searchValue)}`);
      };
    
    return (
        <div className="topbar row">
            <div className="home-margin col">
                <a
                    onClick={() => handleClick("Home")}><FaHouse /></a>
            </div>
            <div className="col d-flex search">
                <form id="search-bar" className="search-bar" onSubmit={handleSubmit}>
                    <input
                    name="searchInput"
                    className="form-control text"
                    type="text"
                    placeholder="Search artists, songs, or friends"
                    />
                </form>
                <div className="btn text-white" form="search-bar" type="submit"><BsSearch /></div>
            </div>
            <div className="text-end col login">
                {user._id && (
                    <div>
                        <a className="text-decoration-none mx-3"
                            onClick={async () => {
                                await signout();
                                setUser({"username": "Log In"});
                                handleClick("Login")}
                                }><SlLogout /></a>
                        <a className="text-decoration-none"
                            onClick={() => handleClick("Profile")}><FaUser />{user.username}</a>
                    </div>
                )}
                {!user._id && (
                    <div>
                        <a className="text-decoration-none"
                            onClick={() => handleClick("Login")}><FaUser />Log In</a>
                    </div>
                )}

            </div>

        </div>
    )
}
export default TopBar;