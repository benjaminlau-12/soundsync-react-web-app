import React, { useEffect, useState } from "react";
import "./profile.css"
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { getUser, findUserById, findUserByUsername } from "../Login/client";

function Profile() {
    const URL = "http://localhost:4000";
    let { userid } = useParams();
    const [username, setUsername] = useState("Anonymous")
    // const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [likedArtists, setLikedArtists] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [numFollowers, setNumFollowers] = useState(0);
    const [numFollowing, setNumFollowing] = useState(0);
    const [isProfileOwner, setIsProfileOwner] = useState(false);
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
        var account = null;
        if (!userid) {
            account = await getUser();
        } else {
            account = await findUserByUsername(userid);
        }
        try {
            setUsername(account.username);
            setNumFollowers(account.followers.length);
            setNumFollowing(account.following.length);
            setLikedArtists(account.likedArtists);
            console.log(account.followers);
            setFollowers(account.followers);
            setFollowing(account.following);
        } catch {
            console.log("Error in fetchUser!")
        }
        

        console.log(account);

    }
    const navigateToProfileEdit = () => {
        navigate(`/SoundSync/EditProfile`)
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
        // setUsername(name);
        navigate(`/SoundSync/Profile/${name}`);
    }
    useEffect(() => {
        fetchUser();
    },[goToUserProfile]);
    return (
        <div className="mint-green-bg col">
            <div className="user-section row">
                <div className="col user-info">
                    <div className="user-titles">
                        <h1 className="user-name">{username}</h1>
                        <div className="d-flex">
                            <a className="white text-decoration-none"> {numFollowers} Followers</a>
                            <a onClick={testing} className="margin-left-40px"> {numFollowing} Following</a>
                            {(!userid) && (
                                <a onClick={navigateToProfileEdit} className="margin-left-300px"><h4>Change Profile Settings</h4></a>
                            )}

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