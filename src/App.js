import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Profile, Welcome, Auth, Messages, Chat } from "./Views";
import firebase from "./backend";
import { useSelector, useDispatch } from "react-redux";

import actions from "./actions";
const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(actions.setUser(authUser));
      } else {
        dispatch(actions.setUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("hashtags")
      .onSnapshot((snapshot) => {
        dispatch(actions.setHashTags(snapshot.docs.map((doc) => doc.data())));
      });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

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
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/chat/:uid">
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
        <Auth />
      </div>
    );
  }
};

export default App;
