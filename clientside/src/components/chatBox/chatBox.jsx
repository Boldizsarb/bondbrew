import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { getUser } from "../../api/userRequest";
 import "./chatBox.css";
import { getMessages } from "../../api/messageRequest";
import {format} from "timeago.js";
import InputEmoji from "react-input-emoji";



const ChatBox = ({chat,currentUser}) => {

    const [userData, setUserData] = useState(null);


    // fetching data for header
  useEffect(() => {

    const userId = chat?.members?.find((id) => id !== currentUser); // need to identify the id of the other user here as well 
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        //console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]); // if these change then the useEffect will run again
  ///////// fetching data for header
  ////////////////// fetching messages 
    const [messages, setMessages] = useState([]); // an empty array
    useEffect(() => {
        const fetchMessages = async ()=> {
            try {
                const {data} = await getMessages(chat._id); // the chat id is being sent from chat.jsx as chat._id
                setMessages(data);
              // console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        if(chat !== null) fetchMessages(); // will only run if chat is not null
    }, [chat])

    const [newMessage, setNewMessage] = useState("");

    const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }



  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            {/* chat-header */}
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.9rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr
                style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}
              />
            </div>
            {/* chat-body */}
            <div className="chat-body" >
              {messages.map((message) => (
                <>
                  <div 
                    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>{" "}
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            {/* chat-sender */}
            <div className="chat-sender">
              
              <InputEmoji
                value={newMessage}
                onChange={handleChange}
              />
              <div className="send-button button" >Send</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
              
              />
            </div>{" "}
          </>
        ) : (
          <span className="chatbox-empty-message">
            Click on a chat to start conversation...
          </span>
        )}
      </div>
    </>
  );
};

export default ChatBox;

// <div onClick={() => imageRef.current.click()}>+</div>