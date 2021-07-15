import { useEffect, useState } from "react";
import actions from "../../actions";
import { useDispatch } from "react-redux";
import firebase from "../../backend";
const useUserFetch = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(actions.setUser(authUser));
        setLoading(false);
      } else {
        dispatch(actions.setUser(null));
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return { loading };
};

export default useUserFetch;
