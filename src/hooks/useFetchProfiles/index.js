import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";
import actions from "../../actions";
const useProfiles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.db
      .collection("profiles")
      .get()
      .then((profiles) => {
        dispatch(
          actions.setProfiles(
            profiles.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      });
  }, [dispatch]);
  return;
};
export default useProfiles;
