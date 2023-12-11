import React, { useEffect, useState } from "react";
import "./profile.css"
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";

function Profile() {
    const URL = "http://localhost:4000";
    var { currentUser } = useSelector((state) => state.loginUser);
    const [userTo, setUserTo] = useState("Benjamin Lau")
    const navigate = useNavigate();
    const likedArtists = ["Eminem", "Mac Miller", "Rihanna", "Bad Bunny", "Drake", "Danny Ocean", "Kanye West"];
    const followers = ["Jake Writer", "Benjamin Lau", "Zoe Langelaan", "John Smith", "Lionel Messi", "Cristiano Ronaldo", "Elon Musk"];
    const following = ["Jake Writer", "Benjamin Lau", "Zoe Langelaan", "John Smith", "Lionel Messi", "Cristiano Ronaldo", "Elon Musk"];
    const getLikedArtists = () => {
        currentUser = axios.get(`${URL}/api/users/username/user123`);
        console.log("PRINTING!!")
        console.log(currentUser);
    }
    function getArtistInitials(artistName) {
        return artistName
            .split(' ')
            .map(word => word.charAt(0))
            .join('');
    }
    const testing = () => {
        console.log("Testing!!")
        console.log(currentUser);
    }
    const goToUserProfile = (name) => {
        setUserTo(name);
        console.log(name);
        navigate(`/SoundSync/Profile/${name}`)
    }
    useEffect(() => {
        // testing();
        getLikedArtists();
    }, []);
    return (
        <div className="mint-green-bg col">
            <div className="user-section row">
                <div className="col user-info">
                    <div className="user-titles">
                        <h1 className="user-name">{userTo}</h1>
                        <div className="d-flex">
                            <a className="white text-decoration-none"> 100 Followers</a>
                            <a onClick={testing} className="margin-left-40px"> 1 Following</a>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="bubble bubble-color row">
                    <div className="d-flex">
                        <h3 className="white">Liked Artists</h3>
                        <h6 className="showall"><a onClick={testing}>Show All</a></h6>
                    </div>

                    {likedArtists.slice(0, 7).map((name, index) => (
                        <div onClick={() => goToUserProfile(name)} className="col text-center ">
                            <div class="user-bubble mx-auto">
                                {getArtistInitials(name)}
                            </div>
                            <div class="user-label mt-2">
                                <p>{name}</p>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="bubble followers-section row ">
                <div className="d-flex">
                        <h3 className="white">Followers</h3>
                        <h6 className="show-all-follow"><a onClick={testing}>Show All</a></h6>
                    </div>
                    {followers.slice(0, 7).map((name, index) => (
                        <div onClick={() => goToUserProfile(name)} className="col text-center ">
                            <div class="user-bubble mx-auto">
                                {getArtistInitials(name)}
                            </div>
                            <div class="user-label mt-2">
                                <p>{name}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="following-section bubble bubble-color row">
                <div className="d-flex">
                        <h3 className="white">Following</h3>
                        <h6 className="show-all-follow"><a onClick={testing}>Show All</a></h6>
                    </div>
                    {following.slice(0, 7).map((name, index) => (
                        <div onClick={() => goToUserProfile(name)} className="col text-center ">
                            <div class="user-bubble mx-auto">
                                {getArtistInitials(name)}
                            </div>
                            <div class="user-label mt-2">
                                <p>{name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    )
}
export default Profile;