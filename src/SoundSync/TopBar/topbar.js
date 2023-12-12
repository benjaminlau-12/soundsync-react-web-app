import "./topbar.css";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaHouse, FaUser } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { getUser } from "../Login/client";

function TopBar() {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState("Song");
    const [user, setUser] = useState(null);
    const loggedIn = true;
    const handleClick = (link) => {
        navigate(`/SoundSync/${link}`)
    };

    const fetchUser = async () => {
        const account = await getUser();
        setUser(account);
        console.log(account)
     };

     useEffect(() => {
        fetchUser();
    }, []);


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