import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Expenses = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});
  const [selectedProjectId, setSelectedProjectId] = useState(""); // Initialize as empty string
  const [expenseName, setExpenseName] = useState(""); // Initialize as empty string
  const [amount, setAmount] = useState(""); // Initialize as empty string
  const [date, setDate] = useState(""); // Initialize as empty string
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");

    const fetchUserData = async () => {
      try {
        // Fetch user details by email
        const userResponse = await axios.get(
          `http://localhost:8000/users/email/${email}`
        );
        setUser(userResponse.data);

        // Fetch the projects assigned to this user
        const projectsResponse = await axios.get(
          `http://localhost:8000/users/${userResponse.data.id}/projects`
        );
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load user or project data.");
      }
    };

    if (email) {
      fetchUserData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!expenseName || !amount || !date || !user.id || !projects.length) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/expenses", {
        project_id: selectedProjectId, // Make sure selectedProjectId is controlled
        member_id: user.id, // Set the current logged-in user as the member
        expense_name: expenseName,
        amount: parseFloat(amount),
        expense_date: date || null,
      });

      setSuccess("Expense added successfully!");
      setExpenseName(""); // Reset field after submission
      setAmount(""); // Reset field after submission
      setDate(""); // Reset field after submission
      setSelectedProjectId(""); // Reset field after submission
    } catch (err) {
      setError(
        "Failed to add expense. " + (err.response?.data?.detail || err.message)
      );
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Member:</label>
          <input type="text" value={user.name || ""} disabled />{" "}
        </div>
        <div>
          <label>Project:</label>
          <select
            value={selectedProjectId || ""} // Ensure `value` is always defined
            onChange={(e) => setSelectedProjectId(e.target.value)}
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Expense Name:</label>
          <input
            type="text"
            value={expenseName} // Ensure `value` is always controlled
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount} // Ensure `value` is always controlled
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date} // Ensure `value` is always controlled
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expenses;
