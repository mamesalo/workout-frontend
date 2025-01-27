import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleLogin = () => {
    setLoading(true);
    axios
      .post("https://backend-workout-6pmr.onrender.com/user/login", {
        email,
        password,
      })
      .then((res) => {
        const { token, email } = res.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", email);

        setLoading(true);

        enqueueSnackbar("Login Successfully", {
          variant: "success",
        });
        navigate("/home", { state: { email } });
      })
      .catch((error) => {
        console.log("Error Response", error.res);
        if (error.response?.status === 403) {
          enqueueSnackbar(error.response.data.message, {
            variant: "warning",
          });
        } else if (error.response?.status === 401) {
          enqueueSnackbar("Invalid credentials. Please try again.", {
            variant: "error",
          });
        } else {
          // Notify user of unexpected errors
          enqueueSnackbar("An error occurred. Please try again later.", {
            variant: "error",
          });
        }
      });
  };

  if (loading) {
    return (
      <div
        className="p-4 d-flex align-items-center justify-content-center container"
        style={{ height: "100vh", flexDirection: "column" }}
      >
        <div className="loading-spinner"></div> {/* Spinner */}
        <div className="mt-3">Loading...</div> {/* Text below the spinner */}
      </div>
    );
  }

  return (
    <div className="">
      <div className="d-flex justify-content-between bg-white p-4">
        <div>
          <h1 className="fw-bolder">MY WORKOUT GYM</h1>
        </div>

        <div className="d-flex gap-4 ">
          <Link to="/" className="text-decoration-none text-black fs-5">
            Login
          </Link>

          <Link to="/signup" className="text-decoration-none text-black fs-5">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="bg-white  mt-5 mx-auto w-50 p-5 rounded-2">
        <h1 className="mb-3 fw-bolder fs-3">Login</h1>

        <div>
          <label className="mb-2 fs-5">Email address:</label>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
          />
        </div>

        <div>
          <label className="mb-2 fs-5">Password:</label>

          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-4"
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
