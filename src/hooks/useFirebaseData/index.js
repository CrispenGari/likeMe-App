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
      .onSnapshot((posts) => {
        dispatch(
          actions.setPosts(
            posts.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        );
      });
  }, [dispatch]);
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
  return;
};

export default useFirebaseData;
