import React, { useState, useEffect } from "react";
import { Header, Message } from "../../Components";
import { FiSend } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { useSelector } from "react-redux";
import firebase from "../../backend";
import Marquee from "react-smooth-marquee";
import fb from "firebase";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
const Chat = () => {
  const [newFriend, setNewFriend] = useState(null);
  const history = useHistory();
  const { uid } = useParams();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const messages = useSelector((state) => state.messages);

  const [chatMessages, setChatMessages] = useState([]);
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
    if (chatId && message) {
      firebase.db
        .collection("messages")
        .add({
          chatId: chatId,
          message: message,
          sender: user?.uid,
          receiver: uid,
          timestamp: fb.firestore.FieldValue.serverTimestamp(),
          read: false,
        })
        .finally(() => {
          setMessage("");
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
            <div className="chat__container__header__right">
              <h1>{newFriend?.data?.displayName}</h1>
              <small>Private Chat</small>
            </div>
          </div>
          <div className="chat__chats">
            <marquee loop direction="right" className="chat__main__marquee">
              {newFriend?.data?.bio || "No bio Provided"}
            </marquee>
            <div className="chat__messages">
              {chatMessages?.map((message, i) => (
                <Message newFriend={newFriend} key={i} message={message} />
              ))}
            </div>
            <form className="chat__input">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="type a message..."
              ></textarea>
              <button onClick={sendMessage} type="submit">
                <FiSend className="chat__send__icon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
