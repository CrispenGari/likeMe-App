import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Home,
  Profile,
  Welcome,
  Auth,
  Messages,
  Chat,
  Terms,
  People,
} from "./Views";
import { useSelector } from "react-redux";
import { useFirebaseData } from "./hooks";
const App = () => {
  // USE THE HOOK useFirebaseData

  useFirebaseData();
  const user = useSelector((state) => state.user);
  const [welcome, setWelcome] = useState(true);
  console.log("Mounted");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setWelcome(false);
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (welcome) {
    return (
      <div className="app">
        <Welcome />
      </div>
    );
  } else if (user) {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/profile/:uid" exact>
              <Profile />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/people">
              <People />
            </Route>
            <Route path="/chat/:uid" exact>
              <Chat />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  } else {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/terms">
              <Terms />
            </Route>
            <Route path="/">
              <Auth />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
};

export default App;
