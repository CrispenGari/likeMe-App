import React, { useState, useRef, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { Delete, PhotoCamera } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Form.css";
import firebase from "../../backend";
import fb from "firebase";

const Form = ({ setShowForm }) => {
  const user = useSelector((state) => state.user);
  const hashTags = useSelector((state) => state.hashTags);
  const [caption, setCaption] = useState("");
  const [suggestionsResults, setSuggestionsResults] = useState([]);
  const [category, setCategory] = useState("single");
  const [progress, setProgress] = useState(0);
  const [posting, setPosting] = useState(false);
  const [image, setImage] = useState(null);
  const textInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  useEffect(() => {
    if (progress === 100) {
      setPosting(false);
      setImage(null);
      setPreview(null);
      setShowForm(false);
    }
  }, [progress, setShowForm]);

  const removePhoto = () => {
    setPreview(null);
    setImage(null);
  };
  const closeForm = () => {
    setPosting(false);
    setImage(null);
    setPreview(null);
    setShowForm(false);
    setCaption("");
    setProgress(0);
    setCategory("single");
    setSuggestionsResults([]);
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

  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    } else {
      setImage(null);
    }
  };
  const select = (suggestion) => {
    let wordBins = caption.split(" ");
    wordBins.pop();
    wordBins.push(`${suggestion.name}`);

    const finalCaption = wordBins.join(" ");
    setCaption(finalCaption);
    setSuggestionsResults([]);
    textInputRef.current.focus();
  };
  const suggest = () => {
    if (caption.split(" ").pop().length === 0) {
      setSuggestionsResults([]);
    }
    if (caption.split(" ").pop().startsWith("#")) {
      textInputRef.current.style.color = "lightseagreen";
      textInputRef.current.style.fontWeight = "bold";
    } else {
      textInputRef.current.style.color = "black";
      textInputRef.current.style.fontWeight = "normal";
    }
    search(caption.split(" ").pop());
  };
  const search = (query) => {
    if (query.length > 0) {
      const res = hashTags
        .filter((___hashTag) => {
          const exp = new RegExp(`^${query}`, "gi");
          return ___hashTag.name.match(exp);
        })
        .splice(0, 3);
      setSuggestionsResults(res);
      if (res.length === 0) {
        setSuggestionsResults(
          hashTags
            .filter((___hashTag) => ___hashTag.name.indexOf(query) !== -1)
            .splice(0, 3)
        );
      }
    }
  };

  const post = (event) => {
    event.preventDefault();

    if (image) {
      const uploadTask = firebase.storage
        .ref(`images/${image.name}`)
        .put(image);

      let wordBins = caption.split(" ");
      let __hashTags = [];
      wordBins.forEach((tag) => {
        if (tag.startsWith("#")) {
          __hashTags.push(tag);
        }
      });
      __hashTags.forEach((tag) => {
        if (hashTags.indexOf(tag) === -1) {
          firebase.db.collection("hashtags").add({
            name: tag,
            tag: "trending",
          });
        }
      });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          setPosting(true);
        },
        (error) => {
          console.log(error);
        },
        () => {
          firebase.storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              // Post an image
              firebase.db.collection("posts").add({
                username: user?.displayName,
                userAvatar: user?.photoURL,
                userEmail: user?.email,
                phoneNumber: user?.phoneNumber,
                userId: user?.uid,
                category: category,
                imageURL: url,
                caption: caption,
                timestamp: fb.firestore.FieldValue.serverTimestamp(),
              });
            });
        }
      );
    }
    setCaption("");
    setProgress(0);
    setCategory("single");
  };

  return (
    <form className="form">
      <div className="form__top">
        <Avatar
          className="form__avatar"
          src={user?.photoURL}
          alt={user.displayName}
        />
        <div className="form__input">
          <textarea
            onKeyUp={suggest}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            ref={textInputRef}
            placeholder={`Write something about your self ${
              user.displayName.split(" ")[0]
            }...`}
          ></textarea>
          <div className="form__input__suggestions">
            {suggestionsResults.map((suggestion, i) => (
              <div
                key={i}
                className="form__hash__tag"
                onClick={() => select(suggestion)}
              >
                <h1>{suggestion.name}</h1>
                <small>{suggestion.tag}</small>
              </div>
            ))}
          </div>
        </div>
        <IconButton className="form__close__button" onClick={closeForm}>
          <AiFillCloseCircle className="form__close__button__icon" />
        </IconButton>
      </div>
      {image && (
        <div className="form__post__preview">
          {posting && (
            <div className="form__posting">
              <h1>{`Posting... ${progress} %`}</h1>
              <div className="form__posting__loading">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <h1>Post Preview</h1>
          <div className="form__image__container">
            <IconButton
              className="form__image__delete__button"
              title="delete"
              onClick={removePhoto}
            >
              <Delete className="form__image__delete__icon" />
            </IconButton>
            <img
              src={preview}
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
        >
          {["Single", "In Relationship", "Complicated", "Searching"].map(
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
          <IconButton component="span" className="post__iconButton">
            <PhotoCamera className="post__icon" />
          </IconButton>
          <input
            type="file"
            id="post__picture"
            accept="image/*"
            multiple={false}
            className="post__input--hidden"
            onChange={handleChange}
          />
        </label>
        <button type="submit" onClick={post}>
          Post
        </button>
      </div>
    </form>
  );
};

export default Form;
