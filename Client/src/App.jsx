import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUser from './components/register'; // Adjust the import as necessary
import LoginUser from "./components/login"; // Assuming you have a LoginUser component

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the User Registration System</h1>
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          {/* Other routes can be added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
