import React, { useState, useRef, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import useSound from "use-sound";
import { AiFillCamera } from "react-icons/ai";
import { MdDelete, MdLocationOn, MdLocationOff } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { ActivityIndicator } from "../Common";
import "./Form.css";
import firebase from "../../backend";
import helperFunctions from "../../utils/helperfunctions";
import { v4 as uuid_v4 } from "uuid";
import actions from "../../actions";
const Form = ({ setShowForm }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  /* LOCAL STATE AND REFS */
  const [caption, setCaption] = useState("");
  const imageInputRef = useRef(null);
  const [category, setCategory] = useState("single");
  const [progress, setProgress] = useState(0);
  const [detectLocation, setDetectLocation] = useState(false);
  const [posting, setPosting] = useState(false);
  const textInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const [hashTag, setHashTag] = useState([]);
  const [mentions, setMentions] = useState([]);

  // FUNCTIONS
  const removePhoto = () => {
    setImage(null);
  };
  const closeForm = () => {
    setPosting(false);
    setImage(null);
    setShowForm(false);
    setCaption("");
    setProgress(0);
    setCategory("single");
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (event) => {
      setImage(event.target.result);
    };
  };
  const post = (event) => {
    event.preventDefault();
    if (image) {
      setPosting(true);
      const hashTags = helperFunctions.findHashTags(caption);
      const mentions = helperFunctions.findMentions(caption);
      helperFunctions.addHashTag(hashTags);
      const postImageName = `${uuid_v4(10)}_${user?.uid}`;
      const task = firebase.storage
        .ref("posts/" + postImageName)
        .putString(image, "data_url");
      task.on(
        "state_changed",
        (observer) => {
          setProgress((observer.bytesTransferred / observer.totalBytes) * 100);
        },
        (error) => {
          console.error(error);
        },
        () => {
          firebase.storage
            .ref("posts")
            .child(postImageName)
            .getDownloadURL()
            .then((url) => {
              firebase.db
                .collection("posts")
                .doc(postImageName)
                .set({
                  imageURL: url,
                  caption: caption,
                  displayName: user?.displayName,
                  photoURL: user?.photoURL,
                  email: user?.email,
                  phoneNumber: user?.phoneNumber,
                  timestamp: firebase.timestamp,
                  category: category,
                })
                .finally(() => {
                  // Do the refetch post
                  const [posts, hashtags] =
                    helperFunctions.refetchPostsHashtags();

                  console.log(posts, hashtags);
                  // dispatch(actions.setHashTags(hashTags));
                  // dispatch(actions.setPosts(posts));
                  closeForm();
                  return;
                });
            });
        }
      );
    }
  };

  return (
    <form className="form">
      <div className="form__top">
        <Avatar
          className="form__avatar"
          src={user?.photoURL}
          alt={user.displayName}
          title={user.displayName}
        />
        <div className="form__input">
          <textarea
            maxLength="150"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            ref={textInputRef}
            placeholder={`Write something about your self ${user.displayName}...`}
          ></textarea>
          <p className="form__words__limit">{caption?.length}/150 characters</p>
        </div>
        <IconButton
          title="close"
          className="form__close__button"
          onClick={closeForm}
        >
          <AiFillCloseCircle className="form__close__button__icon" />
        </IconButton>
      </div>
      {image && (
        <div className="form__post__preview">
          {progress ? (
            <div className="form__posting">
              <ActivityIndicator size={25} />
            </div>
          ) : null}
          <div className="form__image__container">
            <IconButton
              className="form__image__delete__button"
              title="remove"
              onClick={removePhoto}
            >
              <MdDelete className="form__image__delete__icon" />
            </IconButton>
            <IconButton
              onClick={() => setDetectLocation((prev) => !prev)}
              className="form__image__location__button"
              title={detectLocation ? "location on" : "location off"}
            >
              {detectLocation ? <MdLocationOn /> : <MdLocationOff />}
            </IconButton>
            <img
              src={image}
              alt="post-preview"
              className="form__post__preview__image"
            />
          </div>
        </div>
      )}
      <div className="form__controls">
        <select
          className="form__select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          title="status"
        >
          {["single", "dating", "complicated", "searching"].map(
            (status, index) => {
              return (
                <option value={status.toLocaleLowerCase()} key={index}>
                  {status}
                </option>
              );
            }
          )}
        </select>
        <label htmlFor="post__picture">
          <IconButton
            onClick={() => imageInputRef.current.click()}
            className="post__iconButton"
            title="pictures"
          >
            <AiFillCamera className="post__icon" />
          </IconButton>
          <input
            type="file"
            id="post__picture"
            accept="image/*"
            multiple={false}
            ref={imageInputRef}
            hidden
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={post} title="post">
          Post {posting ? <ActivityIndicator size={15} /> : null}
        </button>
      </div>
    </form>
  );
};

export default Form;
