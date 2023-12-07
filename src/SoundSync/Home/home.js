import "./home.css";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { findPlaylistByGenre, findPlaylistBySearch, getApiToken } from "../Search/client";

function Home() {
    var picture = null;
    const URL = "http://localhost:4000/songs";
    const genres = ["Pop", "Country", "Latin", "Hip-Hop", "Rap", "Rock", "Dance", "R&B",
        "Electronic", "Indie", "Salsa", "Merengue", "Testing"];
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate();
    const handleClick = (link) => {
        console.log("handling Click")
        navigate(`/SoundSync/${link}`)
    };
    const navigateToGenre = (genre) => {
        navigate(`/SoundSync/${genre.link}`)
        console.log(genre.link);
    }
    // Function to shuffle an array randomly. It is used to display random songs to the user.
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    var shuffledSongs = shuffleArray(songs);
    const shuffleSongs = () => {
        shuffledSongs = shuffleArray(shuffledSongs);
        console.log("shuffling...");
        setSongs([...shuffledSongs]);
    }
    const findAllSongs = async () => {
        const response = await axios.get(URL);
        // console.log(await findPlaylistBySearch("workout music"))
        setSongs(response.data);
    };
  
    useEffect(() => {
        findAllSongs();
    }, []);


    return (
        <div className="col">
            <div className="center row">
                <h1 className="mint-green-bg no-bot-margin">Welcome to SoundSync</h1>
            </div>
            <div className="row black-bg main-content show-bot-border">
                <div className="col center show-right-border show-left-border border-radius-120px">
                    <h4 className="white padding-top-10px">Explore What Other Users Like!</h4>
                </div>
                <div className="col center show-right-border">
                    <div className="explore-section-title">
                        <h4 className="white padding-top-10px">Explore New Songs!
                            <IoMdRefresh onClick={shuffleSongs} /></h4>
                    </div>
                    {songs.slice(0, 6).map((link, index) => (

                        <li className="song-options form-control mint-green-bg">
                            <div
                                className={""}>
                                <h5>{link.name}</h5>
                                <h6>By {link.artist}</h6>
                            </div>

                        </li>
                    ))}
                </div>
            </div>
            <div className="row mint-green-bg bottom-section">
                <div className="left-margin-10px margin-bottom-px">
                    <h4 className="black">Browse by Genre</h4>
                </div>


                <div className="row">
                    {genres.slice(0, 6).map((link, index) => (
                        <div className="col left-margin-10px">
                            <a className="text-decoration-none white" onClick={() => navigateToGenre({ link })}>
                                <h3>{link}</h3>
                            </a>
                        </div>

                    ))}
                </div>
                <div className="row">
                    {genres.slice(6, 12).map((link, index) => (
                        <div className="col left-margin-80px">
                            <a className="text-decoration-none white" onClick={() => navigateToGenre({ link })}>
                                <h3>{link}</h3>
                            </a>
                        </div>

                    ))}
                </div>

            </div>
        </div>

    )
}
export default Home;