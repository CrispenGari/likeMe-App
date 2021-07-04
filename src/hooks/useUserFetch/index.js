import { useEffect } from "react";
import actions from "../../actions";
import { useDispatch } from "react-redux";
import firebase from "../../backend";
const useUserFetch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(actions.setUser(authUser));
      } else {
        dispatch(actions.setUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};

export default useUserFetch;
