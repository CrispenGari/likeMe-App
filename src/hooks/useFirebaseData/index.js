import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";

import actions from "../../actions";
const useFirebaseData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          actions.setPosts(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
      });
    return () => {
      unsubscribe();
    };
  });
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
      .collection("hashtags")
      .onSnapshot((snapshot) => {
        dispatch(actions.setHashTags(snapshot.docs.map((doc) => doc.data())));
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
  return;
};

export default useFirebaseData;
