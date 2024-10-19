import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projectName, setProjectName] = useState("");
  const [projectAdminId, setProjectAdminId] = useState(""); // Admin ID will be set from database
  const [projectAdminName, setProjectAdminName] = useState(""); // Admin ID will be set from database
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  // Retrieve admin email from local storage and fetch the admin ID
  useEffect(() => {
    const email = localStorage.getItem("email");
  
    // Fetch the user ID based on the admin email
    const fetchAdminId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/email/${email}`
        );
        const userId = response.data.id; // Assuming your backend returns {id: adminId}
        setProjectAdminId(userId); // Set the admin ID
        const userName = response.data.name; // Assuming your backend returns {id: adminId}
        setProjectAdminName(userName); // Set the admin ID
      } catch (error) {
        toast.error("Failed to fetch admin ID. "+ error);
      }
    };

    if (email) {
      fetchAdminId();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      project_name: projectName, // Backend expects snake_case keys
      project_admin_id: projectAdminId, // Filled automatically
      start_date: startDate,
      end_date: endDate || null, // End date can be optional
    };

    try {
      await axios.post("http://localhost:8000/projects", projectData);
      toast.success("Project created successfully");
      // Reset form
      setProjectName("");
      setStartDate("");
      setEndDate("");
      navigate("/members");
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.detail + " Project creation failed!");
      } else {
        toast.error("Project creation failed! Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Project Admin ID:</label>
          <input
            type="number"
            value={projectAdminId}
            disabled // Make this field disabled since it's fetched automatically
          />
        </div>
        <div>
          <label>Project Admin Name:</label>
          <input
            type="text"
            value={projectAdminName}
            disabled 
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default Projects;
