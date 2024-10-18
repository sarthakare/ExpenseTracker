import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Expenses = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
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
        setUsers(response.data);
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

    setSuccess("");
    setError("");

    if (!expenseName || !amount || !date) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/expenses", {
        project_id: selectedProjectId,
        member_id: selectedMemberId,
        expense_name: expenseName,
        amount: parseFloat(amount),
        expense_date: date || null,
      });

      setSuccess("Expense added successfully!");
      setExpenseName("");
      setAmount("");
      setDate("");
      setSelectedProjectId("");
      setSelectedMemberId("");
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
          <label>Project:</label>
          <select
            value={selectedProjectId}
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
          <label>Member:</label>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            required
          >
            <option value="">Select a member</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Expense Name:</label>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expenses;
