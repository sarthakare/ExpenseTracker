import { useState } from "react";
import axios from "axios";

const Expenses = () => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!expenseName || !amount || !date) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/expenses/", {
        expense_name: expenseName,
        amount: parseFloat(amount),
        date,
        project_id: projectId,
        member_id: memberId,
      });

      if (response.status === 200) {
        setSuccess("Expense added successfully!");
        setError("");
        setExpenseName("");
        setAmount("");
        setDate("");
      }
    } catch (err) {
      setError("Failed to add expense. " + err);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
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
