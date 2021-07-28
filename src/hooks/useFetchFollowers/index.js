import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";

import actions from "../../actions";
const useFollowers = (uid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (uid) {
      firebase.db
        .collection("users")
        .doc(uid)
        .collection("followers")
        .orderBy("timestamp", "desc")
        .onSnapshot((followers) => {
          dispatch(
            actions.setFollowers(
              followers.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            )
          );
        });
    }
  }, [dispatch, uid]);

  return;
};
export default useFollowers;
