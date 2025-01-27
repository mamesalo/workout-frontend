import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { RiDeleteBin5Line } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import "../App.css";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const navigate = useNavigate();
  const usernameLocal = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/"); // Redirect if not authenticated
  }

  const { enqueueSnackbar } = useSnackbar();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    axios
      .get("https://backend-workout-6pmr.onrender.com/activities", {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token with the request
        },
      })
      .then((res) => {
        setActivities(res.data.data);
        console.log("data", res);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Failed to fetch activities", { variant: "error" });
      });
  }, [token]);

  // Handle creating a new activity
  const handleSaveActivitie = async () => {
    if (!title || !load || !reps) {
      enqueueSnackbar("Please fill in all fields", {
        variant: "error",
      });
      return;
    }

    const data = {
      title,
      load,
      reps,
    };

    try {
      const response = await axios.post(
        "https://backend-workout-6pmr.onrender.com/activities",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token with the request
          },
        }
      );
      console.log("Workout added:", response.data);

      enqueueSnackbar("Workout added successfully!", { variant: "success" });

      setActivities((prevActivities) => [...prevActivities, response.data]); // Add the new activity to the state
      setTitle("");
      setLoad("");
      setReps("");
    } catch (error) {
      console.error("Error creating workout:", error);
      if (error.response?.status === 401) {
        enqueueSnackbar("Unauthorized: Please log in again.", {
          variant: "error",
        });
        handleLogOut(); // Log the user out if unauthorized
      } else {
        enqueueSnackbar("An error occurred while adding the workout.", {
          variant: "error",
        });
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between bg-white p-4">
        <div>
          <h1 className="fw-bolder">MY WORKOUT GYM</h1>
        </div>

        <div className="d-flex gap-3 align-items-center">
          <span className="text-decoration-none text-black fs-5">
            {usernameLocal}
          </span>

          <button
            className="btn btn-outline-primary fs-5 mx-2"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>

      <div className=" d-flex justify-content-between p-4">
        <div className="w-50 ">
          {activities.map((activity) => (
            <div
              key={activity._id}
              className="mb-4 p-3  shadow-lg bg-white d-flex justify-content-between"
            >
              <div className="d-flex flex-column">
                <h4 className="text-primary fw-bolder mb-4">
                  {activity.title}
                </h4>

                <div className="d-flex justify-content-start ">
                  <p className=" fs-5 fw-bolder">Load(kg):</p>
                  <p className="fs-5">{activity.load}</p>
                </div>

                <div className="d-flex justify-content-start ">
                  <p className="fs-5 fw-bolder">Reps: </p>
                  <p className="fs-5">{activity.reps}</p>
                </div>

                <div className="d-flex justify-content-start mt-2">
                  <p className="fs-6 text-muted">
                    {formatDistanceToNow(new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              <div>
                <Link to={`/activities/delete/${activity._id}`} className="">
                  <RiDeleteBin5Line className="text-black delete  p-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="w-25">
          <h2>Add a New Workout</h2>
          <div>
            <label className="mb-2 fs-5">Exercise Title:</label> <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control mb-4"
            />
          </div>
          <div className="">
            <label className="mb-2 fs-5">Load (in Kg):</label> <br />
            <input
              type="text"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              className="form-control mb-4"
            />
          </div>
          <div className="">
            <label className="mb-2 fs-5">Reps:</label> <br />
            <input
              type="text"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="form-control mb-4"
            />
          </div>

          <button className="btn btn-primary" onClick={handleSaveActivitie}>
            Add Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
