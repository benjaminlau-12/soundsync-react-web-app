import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { getUser, updateUser } from "../../Login/client";
import { useNavigate } from "react-router";
import "./edit.css"

function Edit() {
    const [user, setUser] = useState(null)
    const fetchUser = async () => {
        const account = await getUser();
        setUser(account);
    }
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        // const userData = {
        //     username: event.target.name.value,
        //     email: event.target.username.value,
        //     password: event.target.password.value,
        // };
        // updateUser(userData).then((res) => {
        //     console.log("SUCCESSFUL CHANGE");
        // });
        console.log("handlingSubmit in Edit Profile");
    }

    const handleCancel = () => {
        navigate(`/SoundSync/Profile`)
    }


    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className="col all-content" >
            {user && (
                <div className="row user-icon-section">
                    <div className="col user-icon">
                        <FaUser size="100px" />
                        <h3>{user.username}</h3>
                    </div>
                    <div className="col text-fields">
                        <form onSubmit={handleSubmit}>
                            <label>New Username</label>
                            <input id="username" name="username" type="text" className="form-control text-field"></input>
                            <label>New Password</label>
                            <input id="password" name="password" type="text" className="form-control text-field"></input>
                            <label>New Email</label>
                            <input id="email" name="email" type="text" className="form-control text-field"></input>
                            <div className="row btn-container">
                                <button onClick={handleCancel} className="btn btn-danger btn-size">Cancel</button>
                                <button type="submit" className="btn btn-warning btn-size margin-left-10px">Submit</button>
                            </div>
                        </form>

                    </div>

                </div>

            )}
        </div>
    )
}
export default Edit;