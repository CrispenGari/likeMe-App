import { useEffect } from "react";
import firebase from "../../backend";
import { useDispatch } from "react-redux";
import actions from "../../actions";
const useFetchUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase.db
      .collection("banners")
      .get()
      .then((banners) => {
        dispatch(
          actions.setBanners(
            banners.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        );
      });
  }, [dispatch]);
  return;
};
export default useFetchUsers;
