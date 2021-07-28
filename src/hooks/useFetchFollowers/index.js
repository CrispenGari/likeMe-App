import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";

import actions from "../../actions";
const useFollowers = ({ userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.db
      .collection("users")
      .doc(userId)
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
  }, [dispatch]);

  return;
};
export default useFollowers;
