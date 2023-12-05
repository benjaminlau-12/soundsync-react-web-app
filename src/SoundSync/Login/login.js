import React, { useState } from "react";
import "./login.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchLoading } from "../../redux/loading";
import LoadingScreen from "../LoadingScreen/loading";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSigningUp) {
      // post login data to server db
      const newUser = {
        username: event.target.name.value,
        email: event.target.username.value,
        password: event.target.password.value,
        passwordConfirm: event.target.password.value,
        emailVisibility: true
      };

      dispatch(switchLoading());
      // Replace Promise.resolve with backend call using newUser
      Promise.resolve(true).then((res) => {
        dispatch(switchLoading());
      }).catch(err => {
        dispatch(switchLoading());
        console.error(err);
        alert("Error signing up, password must be at least 8 characters long");
      });

      setIsSigningUp(false);
    } else {
      try {
        dispatch(switchLoading());
        // replace with backend call
        Promise.resolve(true).then((res) => {
            // handle login
            dispatch(switchLoading());
            navigate("/SoundSync/home");
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
                  required={isSigningUp}
                />
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  className="form-control input-field rounded"
                  id="username"
                  name="username"
                  required
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control input-field"
                  id="password"
                  name="password"
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