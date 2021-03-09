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
import firebase from "./backend";
import { useSelector, useDispatch } from "react-redux";

import actions from "./actions";
const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [welcome, setWelcome] = useState(true);
  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        dispatch(
          actions.setMessages(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
      });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          actions.setUsers(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
      });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
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
