import React, { useState, useEffect } from "react";
import { Header, Message } from "../../Components";
import { FiSend } from "react-icons/fi";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { MdArrowBack, MdCancel } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { useSelector } from "react-redux";
import firebase from "../../backend";

import fb from "firebase";
import "./Chat.css";
import { Avatar, IconButton, LinearProgress } from "@material-ui/core";
const Chat = () => {
  const [newFriend, setNewFriend] = useState(null);
  const [progress, setProgress] = useState(0);
  const history = useHistory();
  const { uid } = useParams();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const messages = useSelector((state) => state.messages);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const { pathname } = useLocation();
  document.title = `LikeMe • ${
    pathname.split(/\//)[1]
  }  • ${newFriend?.data?.displayName?.split(/\s/).join("_").toLowerCase()} `;

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
    const _newFriend = users?.filter((user) => uid === user?.data?.uid);
    setNewFriend(_newFriend[0]);
  }, [uid, users]);

  useEffect(() => {
    setChatId(`${uid}${user?.uid}`);
  }, [user, uid]);

  useEffect(() => {
    const _chatMessages = messages?.filter((message) => {
      return (
        String(message?.data?.chatId).indexOf(uid) !== -1 &&
        String(message?.data?.chatId).indexOf(user?.uid) !== -1
      );
    });
    setChatMessages(_chatMessages);
  }, [messages, uid, user?.uid]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (chatId && image) {
      const uploadTask = firebase.storage
        .ref(`messages/${image?.name}`)
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
            .ref("messages")
            .child(image?.name)
            .getDownloadURL()
            .then((url) => {
              firebase.db.collection("messages").add({
                chatId: chatId,
                message: message,
                sender: user?.uid,
                receiver: uid,
                timestamp: fb.firestore.FieldValue.serverTimestamp(),
                read: false,
                imageMessage: url,
              });
            })
            .finally(() => {
              setMessage("");
              setImage(null);
              setProgress(0);
            });
        }
      );
    } else if (chatId && message) {
      firebase.db
        .collection("messages")
        .add({
          chatId: chatId,
          message: message,
          sender: user?.uid,
          receiver: uid,
          timestamp: fb.firestore.FieldValue.serverTimestamp(),
          read: false,
          imageMessage: null,
        })
        .finally(() => {
          setMessage("");
          setImage(null);
          setProgress(0);
        });
    }
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Header />
      </div>
      <div className="chat__main">
        <div className="chat__container">
          <div className="chat__container__header">
            <div className="chat__container__header__left">
              <IconButton
                className="chat__header__icon__button"
                title="chats"
                onClick={() => history.push("/messages")}
              >
                <MdArrowBack className="chat__header__icon" />
              </IconButton>
              <Avatar
                src={newFriend?.data?.photoURL}
                alt={newFriend?.data?.displayName}
                className="chat__header__avatar"
              />
            </div>
            <div
              className="chat__container__header__right"
              title="profile"
              onClick={() => history.push(`/profile/${uid}`)}
            >
              <h1>{newFriend?.data?.displayName}</h1>
              <small>Private Chat</small>
            </div>
          </div>
          <div className="chat__chats">
            <div className="chat__messages">
              {chatMessages?.map((message, i) => (
                <Message newFriend={newFriend} key={i} message={message} />
              ))}
              {image && (
                <div className="chat__image__preview">
                  <LinearProgress variant="determinate" value={50} />
                  <img
                    src={preview}
                    alt="chat-preview"
                    className="chat__preview__image"
                  />
                  <p>
                    {
                      <LinearProgress
                        variant="determinate"
                        value={progress}
                        style={{ marginBottom: 4 }}
                      />
                    }
                    {message}
                    <IconButton
                      className="chat__preview__image__cancel__button"
                      title="remove image"
                      onClick={() => setImage(null)}
                    >
                      <MdCancel className="chat__preview__image__cancel__icon" />
                    </IconButton>
                  </p>
                </div>
              )}
            </div>
          </div>
          <form className="chat__input">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type a message..."
            ></textarea>
            <label htmlFor="chat__image">
              <input
                type="file"
                accept="image/*"
                id="chat__image"
                multiple={false}
                style={{ display: "none" }}
                onChange={handleChange}
              />
              {/* <button component="span" type="button"> */}
              <AiFillPicture className="chat__attach__picture__icon" />
              {/* </button> */}
            </label>
            <button onClick={sendMessage} type="submit">
              <FiSend className="chat__send__icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
