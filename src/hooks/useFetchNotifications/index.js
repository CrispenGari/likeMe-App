import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";
import actions from "../../actions";
const useFetchNotifications = (uid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (uid) {
      firebase.db
        .collection("users")
        .doc(uid)
        .collection("notifications")
        .orderBy("timestamp", "desc")
        .onSnapshot((notifications) => {
          dispatch(
            actions.setNotifications(
              notifications.docs.map((doc) => ({
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
export default useFetchNotifications;
