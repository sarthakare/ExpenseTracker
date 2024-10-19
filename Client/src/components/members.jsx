import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Members() {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [projectAdminId, setProjectAdminId] = useState("");
  const [projectAdminName, setProjectAdminName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");

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
        const userName = response.data.name; // Assuming your backend returns {name: adminName}
        setProjectAdminName(userName); // Set the admin name
      } catch (error) {
        toast.error("Failed to fetch admin ID. " + error);
      }
    };

    if (email) {
      fetchAdminId();
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to load projects.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/users");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };

    fetchProjects();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/members", {
        project_id: selectedProjectId,
        member_id: selectedMemberId,
      });
      toast.success("Member added successfully!");
      setSelectedProjectId("");
      setSelectedMemberId("");
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Failed to add member.");
    }
  };

  // Filter the projects to only include the ones with the matching admin_id
  const filteredProjects = projects.filter(
    (project) => project.project_admin_id === projectAdminId
  );

  // Filter the members to exclude the current admin (admin should not be selectable as a member)
  const filteredMembers = members.filter(
    (member) => member.id !== projectAdminId // Assuming `id` is the correct property for members
  );

  return (
    <div>
      <h2>Add Members to Project</h2>
      <div>
        <label>Project Admin ID:</label>
        <input type="number" value={projectAdminId} disabled />
      </div>
      <div>
        <label>Project Admin Name:</label>
        <input type="text" value={projectAdminName} disabled />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Project:</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            required
          >
            <option value="">Select a project</option>
            {filteredProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Assign Member:</label>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            required
          >
            <option value="">Select a member</option>
            {filteredMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}{" "}
                {/* Assuming 'name' is the correct field for display */}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}

export default Members;
