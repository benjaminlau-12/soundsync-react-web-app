import "./home.css";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Home() {
    const URL = "http://localhost:4000/songs";
    const [songs, setSongs] = useState([]);
    const handleClick = (link) => {
        console.log("handling Click")
    }
    const findAllSongs = async () => {
        const response = await axios.get(URL);
        setSongs(response.data);
      };
      console.log(songs);
      useEffect(() => {
        findAllSongs();
      }, []);
    

    return (
        <div className="col">
            <div className="center row">
                <h1 className="mint-green-bg no-bot-margin">Welcome to SoundSync</h1>
            </div>
            <div className="row black-bg main-content">
                <div className="col center show-right-border">
                    <h4 className="white padding-top-10px">Explore What Other Users Like!</h4>
                </div>
                <div className="col center">
                    <h2 className="white padding-top-10px">Explore New Songs!</h2>
                    {songs.map((link, index) => (
                    <li className={"mint-green-bg form-control"}>
                        <div onClick={() => handleClick(link)}
                            className={`row ${link === "Account" ?
                                "account-icon" : "menu-icon"}`}>
                            <h3>
                                {link.name}
                            </h3>
                        </div>

                    </li>

                ))}
                </div>
            </div>
        </div>

    )
}
export default Home;