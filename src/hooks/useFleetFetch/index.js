import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";
import actions from "../../actions";
const useFleetFetch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase.db
      .collection("fleets")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        dispatch(
          actions.setFleets(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  return;
};

export default useFleetFetch;
