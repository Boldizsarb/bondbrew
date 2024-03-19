import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { getUser } from "../../api/userRequest";
 import "./chatBox.css";
import { getMessages } from "../../api/messageRequest";
import {format} from "timeago.js";
import InputEmoji from "react-input-emoji";
import { addMessage } from "../../api/messageRequest";
import Bin from "../../img/bin3.png";
import Bin2 from "../../img/bin2.png";
import DeleteChat from "./deleteModal";



const ChatBox = ({chat,currentUser, setSendMessage, receivedMessage }) => {

    const [userData, setUserData] = useState(null);
    const scroll = useRef();
    const [messages, setMessages] = useState([]); // an empty array
    const [newMessage, setNewMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

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

    

    const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }
  
    //// sending message
   // Send Message
   const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}

  // receiving message
  useEffect(() => {   // the message box will re-render when the receiveMessage state changes
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  
  },[receivedMessage])
  

  // scroll to bottom
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // if messages change then the useEffect will run again

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleDelete = () => { 
    setDeleteModal(true);
    
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
                    <DeleteChat chatId={chat._id} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/>
                  </div>
                  <img src={isHovered ? Bin2 : Bin} alt="" className="bin-icon"
                   onMouseEnter={handleMouseEnter} 
                   onMouseLeave={handleMouseLeave} 
                   onClick={handleDelete} />
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
                  <div ref = {scroll}
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
              <div className="send-button button" onClick={handleSend}>Send</div>
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