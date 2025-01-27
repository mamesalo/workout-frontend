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
      .post(`${import.meta.env.VITE_SERVER_URL}/user/login`, {
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
  return (
    <div
      className="min-vh-100 d-flex flex-column bg-light"
      style={{
        background: "linear-gradient(135deg, #f1f8e9, #e3f2fd)",
      }}
    >
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center bg-white shadow-sm py-3 px-4">
        <h1 className="fw-bold text-primary">MY WORKOUT GYM</h1>

        <div className="d-flex gap-4 ">
          <Link
            to="/"
            className="active c-btn text-decoration-none text-white fs-5"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-decoration-none c-btn text-secondary fs-5"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Main Section */}
      <div
        className="d-flex justify-content-center align-items-center flex-grow-1"
        style={{
          background: "linear-gradient(135deg, #e0f7fa, #f1f8e9)",
        }}
      >
        <div
          className="bg-white shadow rounded-4 p-5"
          style={{
            width: "400px",
          }}
        >
          <h1 className="mb-4 fw-bold text-center text-primary">Login</h1>

          {/* Email Input */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label fs-6 fw-semibold text-muted"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-pill px-3 py-2"
              placeholder="Enter your email"
              style={{ borderColor: "#ced4da" }}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label fs-6 fw-semibold text-muted"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-pill px-3 py-2"
              placeholder="Enter your password"
              style={{ borderColor: "#ced4da" }}
            />
          </div>

          {/* Login Button */}
          <button
            className="btn btn-primary rounded-pill w-100 py-2 fw-bold"
            onClick={handleLogin}
            disabled={loading}
            style={{
              transition: "0.3s ease",
              backgroundColor: "#007bff",
              border: "none",
            }}
          >
            {loading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
            ) : (
              "Login"
            )}
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <small className="text-muted">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary text-decoration-none fw-semibold"
              >
                Sign up
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
