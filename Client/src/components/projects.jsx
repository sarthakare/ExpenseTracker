import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Projects() {
  const [projectName, setProjectName] = useState("");
  const [projectAdminId, setProjectAdminId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      project_name: projectName, // Backend expects snake_case keys
      project_admin_id: projectAdminId,
      start_date: startDate,
      end_date: endDate || null, // End date can be optional
    };

    try {
      await axios.post("http://localhost:8000/projects", projectData);
      toast.success("Project created successfully");
      // Reset form
      setProjectName("");
      setProjectAdminId("");
      setStartDate("");
      setEndDate("");
      navigate("/members")
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
            onChange={(e) => setProjectAdminId(e.target.value)}
            required
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
