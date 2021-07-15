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
  Landing,
} from "./Views";
import { useSelector } from "react-redux";
import { useUserFetch, useFirebaseData } from "./hooks";
import Settings from "./Views/Settings/Settings";
const App = () => {
  // USE THE HOOK useFirebaseData
  useFirebaseData();
  useUserFetch();
  const [welcome, setWelcome] = useState(true);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    //  Wait for some seconds for the user session to load.
    const intervalId = setInterval(() => {
      setLoading(false);
    }, 1000);
    if (user) {
      setWelcome(false);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [user]);
  if (loading) {
    return (
      <div className="app">
        <Landing />
      </div>
    );
  }
  if (welcome) {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/terms">
              <Terms />
            </Route>
            <Welcome path="/" setWelcome={setWelcome} />
          </Switch>
        </Router>
      </div>
    );
  }
  if (user) {
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
            <Route path="/setttings">
              <Settings />
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
