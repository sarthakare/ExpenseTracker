import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import RegisterUser from './components/register'; // Adjust the import as necessary
import LoginUser from "./components/login"; // Assuming you have a LoginUser component
import Projects from "./components/projects"; 
import Members from './components/members';
import Expenses from './components/expenses';

function App() {
  return (
    <div>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginUser />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/members" element={<Members />} />
            <Route path="/expenses" element={<Expenses />} />
            {/* Other routes can be added here */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
