import "./App.css";
import CreateUser from "./pages/CreateUser";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/create">
            <CreateUser />
          </Route>
          <Route exact path="/users/:id">
            <SingleUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
