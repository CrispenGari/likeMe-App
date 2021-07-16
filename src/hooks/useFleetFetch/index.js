import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";
import actions from "../../actions";
import helperFunctions from "../../utils/helperfunctions";
const useFleetFetch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.db
      .collection("fleets")
      .get()
      .then((fleets) => {
        fleets.docs
          .map((fleet) => ({ ...fleet.data(), id: fleet?.id }))
          .forEach((fleet) => {
            const { days } = helperFunctions.timestampToTime(fleet?.timestamp);
            if (days >= 1) {
              helperFunctions.deletePost(fleet?.fleetURL, "fleets", fleet);
            }
          });
      });
  }, []);
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
