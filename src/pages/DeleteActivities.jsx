import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

const DeleteActivities = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = useParams();
  console.log("Activity ID:", id);
  console.log("Params:", params);

  const handleDeleteActivities = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found! Redirecting to login...");
      navigate("/"); // Redirect to login page if no token
      return;
    }
    setLoading(true);
    axios
      .delete(`https://backend-workout-6pmr.onrender.com/activities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
    <div className="d-flex justify-content-center align-items-center flex-column">
      <h5 className="display-5 my-5 text-center">
        Are You Sure You Want to delete this workout?
      </h5>

      <button onClick={handleDeleteActivities} className=" btn btn-danger">
        Delete
      </button>
    </div>
  );
};

export default DeleteActivities;
