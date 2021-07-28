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
  AdditionalInfo,
} from "./Views";
import { useSelector } from "react-redux";
import { useUserFetch, useFirebaseData } from "./hooks";
import Settings from "./Views/Settings/Settings";
import useFetchUsers from "./hooks/useFetchUsers";
import { useFetchBanners, useFetchProfiles } from "./hooks";
import firebase from "./backend";

const App = () => {
  // USE THE HOOK useFirebaseData
  useFirebaseData();
  useFetchUsers();
  useFetchBanners();
  useFetchProfiles();
  const { loading } = useUserFetch();
  const [welcome, setWelcome] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      setWelcome(false);
    }
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
  // If the user is new then they should give us more info about themselves
  if (user) {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/profile/:uid/:randomId" exact>
              <Profile />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/people">
              <People />
            </Route>
            <Route path="/chat/:uid/:randomId" exact>
              <Chat />
            </Route>
            <Route path="/settings/:uid/:randomId">
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
