import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";

import actions from "../../actions";
const useFollowings = (uid) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid) {
      firebase.db
        .collection("users")
        .doc(uid)
        .collection("followings")
        .orderBy("timestamp", "desc")
        .get()
        .then((followings) => {
          dispatch(
            actions.setFollowings(
              followings.docs.map((doc) => ({
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
export default useFollowings;
