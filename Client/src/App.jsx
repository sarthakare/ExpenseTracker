import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterUser from './components/register'; // Adjust the import as necessary
import LoginUser from "./components/login"; // Assuming you have a LoginUser component
import CreateProject from "./components/create_project"; // Assuming you have a LoginUser component

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/createproject" element={<CreateProject />} />
          {/* Other routes can be added here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
