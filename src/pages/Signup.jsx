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
      .post("https://backend-workout-6pmr.onrender.com/user/signup", {
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
            Signup
          </Link>
        </div>
      </div>

      <div className="bg-white  mt-5 mx-auto w-50 p-5 rounded-2">
        <h1 className="mb-3 fw-bolder fs-3">Signup</h1>

        <div>
          <label className="mb-2 fs-5">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control mb-3"
          />
        </div>
        <div>
          <label className="mb-2 fs-5">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control mb-4"
          />
        </div>
        <button
          onClick={handleSignup}
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </div>
    </div>
  );
};

export default Signup;
