import React, { useState } from "react";
import "./login.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchLoading } from "../../redux/loading";
import LoadingScreen from "../LoadingScreen/loading";
import { signin, signup } from "./client";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (isSigningUp) {

        const userData = {
            username: event.target.name.value,
            email: event.target.username.value,
            password: event.target.password.value,
        };

      dispatch(switchLoading());
      signup(userData).then((res) => {
        dispatch(switchLoading());
      }).catch(err => {
        dispatch(switchLoading());
        console.error(err);
        alert("Error signing up, password must be at least 8 characters long");
      });

      setIsSigningUp(false);
    } else {
        const userData = {
            email: event.target.username.value,
            password: event.target.password.value,
          };
      try {
        dispatch(switchLoading());
        signin(userData).then((res) => {
          console.log(res);
            if (res && res._id !== undefined) {
              dispatch(switchLoading());
              navigate("/SoundSync/home");
            } else {
              dispatch(switchLoading());
              alert("Invalid Credentials, try again")
            }
          }).catch(err => {
            dispatch(switchLoading());
            alert("Invalid Credentials, try again")
          });

      } catch (error) {
        console.log(error);
        console.log("Login Failed");
      }
    }
  };

  return (
    <div>
      <LoadingScreen />
      <div className="login-container">
        <div className="card m-5 py-5 login-box bg-light">
          <div className="card-header bg-light">
            <h1>{isSigningUp ? "Sign Up" : "Login"}</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label
                  htmlFor="name"
                  className={`${isSigningUp ? "" : "hidden"}`}
                >
                  Username
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    isSigningUp ? "" : "hidden"
                  } input-field rounded`}
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required={isSigningUp}
                />
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  className="form-control input-field rounded"
                  id="username"
                  name="username"
                  placeholder="jdoe@gmail.com"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control input-field"
                  id="password"
                  name="password"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className={`link-button`}
                  onClick={() => {
                    setIsSigningUp(!isSigningUp);
                  }}
                >
                  {isSigningUp ? "Log in" : "Sign up"}
                </button>
              </div>
              <button type="submit" className="mt-3 btn-success btn btn-rounded">
                {isSigningUp ? "Sign Up" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;