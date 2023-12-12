import React, { useEffect, useState } from "react";
import "./profile.css"
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import { getUser, findUserById } from "../Login/client";

function Profile() {
    const URL = "http://localhost:4000";
    const [username, setUsername] = useState("Anonymous")
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [likedArtists, setLikedArtists] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [currentProfileID, setCurrentProfileID] = useState([]);

    function getArtistInitials(artistName) {
        return artistName
            .split(' ')
            .map(word => word.charAt(0))
            .join('');
    }
    async function getUsernameByID(_id) {
        // const user = await findUserById(_id);
        // return user.username;
    }
    const testing = () => {
        console.log("Testing!!")
    }
    var isLoggedIn = false;
    const fetchUser = async () => {
        const account = await getUser();
        if (account) {
            isLoggedIn = true;
            setUsername(account.username);
            setCurrentProfileID(account._id);
            // setUser(account);
        }
    }
    const getLikedArtists = async () => {
        const account = await getUser();
        if (account) {
            setLikedArtists(account.likedArtists);
            console.log(account.likedArtists);
        }
    }
    const getFollowers = async () => {
        const account = await getUser();
        if (account) {
            // setFollowers(account.followers);
            console.log(account.followers);
        }
    }
    const getFollowing = async () => {
        const account = await getUser();
        if (account) {
            // setFollowing(account.following);
            console.log(account.following);
        }
    }
    const goToUserProfile = (name) => {
        setUsername(name);
        navigate(`/SoundSync/Profile/${name}`)
    }
    useEffect(() => {
        // testing();
        fetchUser();
        getLikedArtists();
        getFollowers();
        getFollowing();
    }, []);
    return (
        <div className="mint-green-bg col">
            <div className="user-section row">
                <div className="col user-info">
                    <div className="user-titles">
                        <h1 className="user-name">{username}</h1>
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
                    {followers.slice(0, 7).map((id, index) => (
                        <div onClick={() => goToUserProfile(getUsernameByID(id))} className="col text-center ">
                            <div class="user-bubble mx-auto">
                                {getUsernameByID(id)}
                            </div>
                            <div class="user-label mt-2">
                                <p>{getUsernameByID(id)}</p>
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
                                {/* {getArtistInitials(name)} */}
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