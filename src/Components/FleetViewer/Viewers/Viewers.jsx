import "./Viewers.css";
import React from "react";
import Viewer from "../Viewer/Viewer";
import firebase from "../../../backend";
const Viewers = ({ currentFleetIndex, fleets }) => {
  const [viewers, setViewers] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      firebase.db
        .collection("fleets")
        .doc(fleets[currentFleetIndex]?.id)
        .collection("viewers")
        .orderBy("timestamp", "desc")
        .onSnapshot((viewers) => {
          setViewers(
            viewers.docs.map((doc) => ({
              id: doc?.id,
              ...doc?.data(),
            }))
          );
        });
    }
    return () => {
      mounted = false;
    };
  }, [currentFleetIndex, fleets]);

  return (
    <div className="viewers">
      <h1>
        {Boolean(viewers?.length)
          ? `${viewers?.length} ${viewers?.length === 1 ? "viewer" : "viewers"}`
          : "no views yet"}
      </h1>
      <div className="viewers__container">
        {viewers?.map((viewer, index) => (
          <Viewer viewer={viewer} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Viewers;
