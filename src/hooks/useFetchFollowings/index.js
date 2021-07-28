import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";

import actions from "../../actions";
const useFollowings = ({ userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.db
      .collection("users")
      .doc(userId)
      .collection("followings")
      .orderBy("timestamp", "desc")
      .onSnapshot((followings) => {
        dispatch(
          actions.setFollowings(
            followings.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
        );
      });
  }, [dispatch]);

  return;
};
export default useFollowings;
