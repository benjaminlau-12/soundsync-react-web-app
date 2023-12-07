import React, { useEffect } from "react";
import "./profile.css"
import { useSelector } from "react-redux";
import axios from "axios";

function Profile() {
    const URL = "http://localhost:4000";
    var {currentUser} = useSelector((state) => state.loginUser);
    const getLikedArtists = () => {
        currentUser = axios.get(`${URL}/api/users/username/CaptainMarvel23`);
        console.log("PRINTING!!")
        console.log(currentUser);
    }

    const testing = () => {
        console.log("Testing!!")
        console.log(currentUser);
    }
    useEffect(() => {
        testing();
        getLikedArtists();
    }, []);
    return (
        <div className="mint-green-bg col">
            <div className="user-section row">
                <div className="col user-info">
                    <div className="user-titles">
                        <h1 className="user-name">Benjamin Lau</h1>
                        <div className="d-flex">
                            <a className="white text-decoration-none"> 100 Followers</a>
                            <a onClick={testing} className="margin-left-40px"> 1 Following</a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="bubble bubble-color row">
                    <h3 className="white">Liked Artists</h3>
                </div>
                <div className="bubble followers-section row ">
                    <h3 className="white">Followers</h3>
                </div>
                <div className="following-section bubble bubble-color row">
                    <h3 className="white">Following</h3>
                </div>
            </div>



        </div>
    )
}
export default Profile;