import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!email || !password) {
      enqueueSnackbar("Please fill in all fields.");
      return;
    }

    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/user/signup`, {
        email,
        password,
      })

      .then((res) => {
        const { token, email: userEmail } = res.data;

        // Store the token and email in localStorage

        localStorage.setItem("token", token);
        localStorage.setItem("user", userEmail);

        enqueueSnackbar("Signup Successfully", {
          variant: "success",
        });
        navigate("/home");
      })
      .catch((error) => {
        console.log("Error response:", error.response);
        if (error.response && error.response.data) {
          console.log("Error data:", error.response.data); // Log error data
          if (error.response.data.message) {
            enqueueSnackbar(error.response.data.message, {
              variant: "warning",
            });
          } else {
            enqueueSnackbar("An unknown error occurred.", {
              variant: "error",
            });
          }
        } else {
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
            className="c-btn text-decoration-none text-secondary fs-5"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-decoration-none active c-btn text-white fs-5"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Signup Form */}
      <div className="d-flex justify-content-center align-items-center flex-grow-1">
        <div
          className="bg-white shadow rounded-4 p-5"
          style={{
            width: "400px",
          }}
        >
          <h1 className="mb-4 fw-bold text-center text-primary">Signup</h1>

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

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="btn btn-primary rounded-pill w-100 py-2 fw-bold"
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
              "Signup"
            )}
          </button>

          {/* Footer */}
          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-primary text-decoration-none fw-semibold"
              >
                Login
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
