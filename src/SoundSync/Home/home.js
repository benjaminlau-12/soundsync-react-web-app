import "./home.css";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdRefresh } from "react-icons/io";
import { getUser } from "../Login/client";
import { searchByGenre } from "../Search/client";

function Home() {
    var picture = null;
    const URL = "http://localhost:4000/songs";
    const genres = ["Pop", "Country", "Latin", "Hip-Hop", "Rap", "Rock", "Dance", "R&B",
        "Electronic", "Indie", "Salsa", "Merengue", "Testing"];
    const [songs, setSongs] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        const account = await getUser();
        if(account) {
            setUser(account);
            setIsLoggedIn(true);
        }   
     };


    const navigate = useNavigate();

    const handleGenreNav = (genre) => {
        navigate(`/SoundSync/search?q=${encodeURIComponent(`genre:${genre}`)}`);
    };

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
        setSongs(response.data);
    };

    useEffect(() => {
        findAllSongs();
        fetchUser();
    }, []);


    return (
        <div className="col-md-12 col-sm-6 bt-container">
            <div className="center row">
                <h1 className="mint-green-bg no-bot-margin">Welcome to SoundSync</h1>
            </div>
            <div className="row black-bg main-content show-bot-border">
                {isLoggedIn && (
                    <div className="col center show-right-border show-left-border border-radius-120px">
                    <h4 className="white padding-top-10px">Explore What Your Followers Like!</h4>
                    <li className="explore-options form-control mint-green-bg">
                        <div
                            className={""}>
                            <h5>Sad by XXXTentacion</h5>
                            <h6>Liked by user123</h6>
                        </div>

                    </li>
                </div>
                )}
                
                <div className="col center show-right-border">
                    <div className="explore-section-title">
                        <h4 className="white padding-top-10px">Try Searching These Songs!
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
                    {genres.slice(0, 6).map((genre, index) => (
                        <div className="col left-margin-10px">
                            <a className="text-decoration-none white" onClick={() => handleGenreNav(genre)}>
                                <h3>{genre}</h3>
                            </a>
                        </div>

                    ))}
                </div>
                <div className="row">
                    {genres.slice(6, 12).map((genre, index) => (
                        <div className="col left-margin-80px">
                            <a className="text-decoration-none white" onClick={() => handleGenreNav(genre)}>
                                <h3>{genre}</h3>
                            </a>
                        </div>

                    ))}
                </div>

            </div>
        </div>

    )
}
export default Home;