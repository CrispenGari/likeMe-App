import React, { useState, useEffect } from "react";

import "./Fleets.css";
import { Fleet } from "../../Components";
import { Avatar, IconButton, CircularProgress } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";
import { useSelector } from "react-redux";
import firebase from "../../backend";
import fb from "firebase";
import { FcPrevious, FcNext } from "react-icons/fc";
const Fleets = ({ setDeleteNotification }) => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [myFleets, setMyFleets] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const fleets = useSelector((state) => state.fleets);
  const [viewFleets, setViewFleets] = useState(false);
  const [fleetIndex, setFleetIndex] = useState(0);
  const [currentFleets, setCurrentFleets] = useState([]);
  const [fleetProgress, setFleetProgress] = useState(0);

  // DELETE ALL EXPIRED FLEETS 24 HOURS

  useEffect(() => {
    fleets.forEach((fleet) => {
      if (
        Number.parseInt(
          (new Date().getTime() -
            new Date(fleet?.data?.timestamp?.seconds * 1000).getTime()) /
            (1000 * 24 * 3600)
        ) >= 1
      ) {
        // old fleet delete it
        firebase.db
          .collection("fleets")
          .doc(fleet?.id)
          .delete()
          .then(() => {
            // Remove from the firebase storage if exists
            if (fleet?.data?.fleetURL) {
              firebase.storage
                .ref()
                .child(
                  `fleets/${
                    fleet?.data?.fleetURL.split("%2F")[1]?.split("?")[0]
                  }`
                )
                .delete();
            }
          });
      }
    });
  }, [fleets]);

  // -------------- END DELETE

  const openOthersFleets = () => {
    setFleetIndex(0);
    setFleetProgress(0);
    setViewFleets(true);
  };

  const openMyFleets = () => {
    setFleetIndex(0);
    setFleetProgress(0);
    setCurrentFleets(
      fleets
        ?.filter((fleet) => {
          return fleet?.data?.userId === user?.uid;
        })
        .sort((a, b) => {
          const date1 = new Date(a?.data?.timestamp?.toDate());
          const date2 = new Date(b?.data?.timestamp?.toDate());
          return date1 - date2;
        })
    );
    setViewFleets(true);
  };
  const post = () => {
    if (image || caption) {
      const uploadTask = firebase.storage
        .ref(`fleets/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase.storage
            .ref("fleets")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // Post a fleet
              firebase.db.collection("fleets").add({
                username: user?.displayName,
                userAvatar: user?.photoURL,
                userEmail: user?.email,
                userId: user?.uid,
                fleetURL: url,
                caption: caption,
                timestamp: fb.firestore.FieldValue.serverTimestamp(),
              });
            })
            .finally(() => {
              removeFleet();
            });
        }
      );
    }
  };
  const removeFleet = () => {
    setCaption("");
    setImage(null);
    setProgress(0);
  };
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      setImage(null);
    }
  };
  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (fleetIndex === currentFleets.length - 1) {
        setViewFleets(false);
        setFleetProgress(0);
      } else {
        setFleetIndex(fleetIndex + 1);
      }
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentFleets.length, fleetIndex]);

  useEffect(() => {
    if (viewFleets) {
      const intervalId = setInterval(() => {
        if (fleetProgress === 9) {
          setFleetProgress(0);
        } else {
          setFleetProgress(fleetProgress + 1);
        }
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [viewFleets, fleetProgress]);

  useEffect(() => {
    setMyFleets(
      fleets
        ?.filter((fleet) => {
          return user?.uid === fleet?.data?.userId;
        })
        .sort((a, b) => {
          const date1 = new Date(a?.data?.timestamp?.toDate());
          const date2 = new Date(b?.data?.timestamp?.toDate());
          return date1 - date2;
        })
    );
  }, [user, fleets]);

  const deleteFleet = () => {
    firebase.db
      .collection("fleets")
      .doc(currentFleets[fleetIndex]?.id)
      .delete()
      .then(() => {
        // Remove from the firebase storage if exists
        if (currentFleets[fleetIndex]?.data?.fleetURL) {
          firebase.storage
            .ref()
            .child(
              `fleets/${
                currentFleets[fleetIndex]?.data?.fleetURL
                  .split("%2F")[1]
                  ?.split("?")[0]
              }`
            )
            .delete();
        }
      });
    setViewFleets(false);
    setDeleteNotification(true);
  };
  const next = () => {
    setFleetIndex(fleetIndex + 1);
    setFleetProgress(0);
  };
  const prev = () => {
    setFleetIndex(fleetIndex - 1);
    setFleetProgress(0);
  };
  return (
    <div className="fleets">
      <div className="fleets__container">
        <div className="fleets__left">
          {myFleets?.length > 0 ? (
            <Avatar
              className="fleets__left__avatar"
              src={myFleets[myFleets?.length - 1]?.data?.fleetURL}
              alt={user?.displayName}
              onClick={openMyFleets}
            />
          ) : (
            <Avatar
              className="fleets__left__avatar--nofleets"
              src={user?.photoURL}
              alt={user?.displayName}
            />
          )}
          <label htmlFor="fleet__input">
            <input
              type="file"
              accept="image/*"
              id="fleet__input"
              className="fleet__input--hidden"
              onChange={handleChange}
              multiple={false}
            />
            <IconButton className="fleets__left__add__button" component="span">
              <Add className="fleets__left__add__icon" />
            </IconButton>
          </label>
        </div>
        <div className="fleets__right">
          {users
            ?.filter((u) => u?.data?.uid !== user?.uid)
            .map((user_, i) => {
              return (
                <Fleet
                  key={i}
                  user={user_}
                  setCurrentFleets={setCurrentFleets}
                  openOthersFleets={openOthersFleets}
                />
              );
            })}
        </div>
      </div>
      {(image || (viewFleets && currentFleets.length > 0)) && (
        <div className="fleets__preview">
          {viewFleets && (
            <IconButton
              className="fleets__preview__navigate__button__prev"
              onClick={prev}
              disabled={fleetIndex === 0}
            >
              <FcPrevious className="fleets__preview__navigate__button__icon" />
            </IconButton>
          )}
          {viewFleets && (
            <IconButton
              className="fleets__preview__navigate__button__next"
              disabled={fleetIndex === currentFleets.length - 1}
              onClick={next}
            >
              <FcNext className="fleets__preview__navigate__button__icon" />
            </IconButton>
          )}
          {viewFleets && user?.uid === currentFleets[fleetIndex]?.data?.userId && (
            <IconButton
              className="fleets__preview__delete__button"
              title="delete fleet"
              onClick={deleteFleet}
            >
              <Delete className="fleets__image__delete__icon" />
            </IconButton>
          )}
          {viewFleets && (
            <div className="fleets__count">
              {currentFleets?.map((_, index) => (
                <div
                  key={index}
                  className={`fleets__progress ${
                    index === fleetIndex && "fleet__progress--active"
                  }`}
                >
                  <p
                    style={{ width: `${((fleetProgress + 1) / 10) * 100}%` }}
                  ></p>
                </div>
              ))}
            </div>
          )}
          <div className="fleets__preview__center">
            {!progress ? (
              <>
                {!viewFleets && (
                  <IconButton
                    className="fleets__image__delete__button"
                    title="delete"
                    onClick={removeFleet}
                  >
                    <Delete className="fleets__image__delete__icon" />
                  </IconButton>
                )}
              </>
            ) : (
              <>
                {!viewFleets && (
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    className="fleets__preview__circular__progress"
                    size={35}
                  />
                )}
              </>
            )}
            {(image || (viewFleets && currentFleets.length > 0)) && (
              <div className="fleets__image__container">
                {image ? (
                  <img
                    src={preview}
                    alt="fleet-preview"
                    className="fleet__preview__image"
                  />
                ) : (
                  <img
                    src={currentFleets[fleetIndex]?.data?.fleetURL}
                    alt="fleet-preview"
                    className="fleet__preview__image"
                  />
                )}
              </div>
            )}
            {!viewFleets ? (
              <input
                type="text"
                placeholder="type caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            ) : (
              <>
                <p>{currentFleets[fleetIndex]?.data?.caption}</p>
                <small>
                  {new Date(
                    currentFleets[fleetIndex]?.data?.timestamp?.toDate()
                  ).toLocaleTimeString()}
                </small>
              </>
            )}
            {!viewFleets && <button onClick={post}>Post Fleet</button>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Fleets;
