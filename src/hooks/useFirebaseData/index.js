import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";

import actions from "../../actions";
const useFirebaseData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .get()
      .then((posts) => {
        dispatch(
          actions.setPosts(
            posts.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      });
  }, [dispatch]);
  // useEffect(() => {
  //   const unsubscribe = firebase.db
  //     .collection("messages")
  //     .orderBy("timestamp", "asc")
  //     .onSnapshot((snapshot) => {
  //       dispatch(
  //         actions.setMessages(
  //           snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
  //         )
  //       );
  //     });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [dispatch]);
  useEffect(() => {
    firebase.db
      .collection("hashtags")
      .get()
      .then((hashtags) => {
        dispatch(
          actions.setHashTags(
            hashtags.docs.map((doc) => ({ id: doc?.id, ...doc.data() }))
          )
        );
      });
  }, [dispatch]);
  useEffect(() => {
    firebase.db
      .collection("users")
      .orderBy("timestamp", "desc")
      .get()
      .then((users) => {
        dispatch(
          actions.setUsers(
            users.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      });
  }, [dispatch]);

  // useEffect(() => {
  //   const unsubscribe = firebase.db
  //     .collection("fleets")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) => {
  //       dispatch(
  //         actions.setFleets(
  //           snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
  //         )
  //       );
  //     });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [dispatch]);
  return;
};

export default useFirebaseData;
