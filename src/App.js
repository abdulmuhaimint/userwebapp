import "./App.css";
import CreateUser from "./pages/CreateUser";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";

import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id" element={<SingleUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
