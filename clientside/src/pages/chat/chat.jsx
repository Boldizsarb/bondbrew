import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import LogoSearch from "../../components/personSearch/personSearch";
import { useDispatch, useSelector } from "react-redux";
import { userChats } from "../../api/chatRequest";// importing the chatrequest
import Conversation from "../../components/conversation/conversation"; // importing the conversation component
import ChatBox from "../../components/chatBox/chatBox";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/chat.png";
import { Link } from "react-router-dom";
import {io} from "socket.io-client";


const Chat = () => {
 
    ////////////////////////// getting both users
    const [chats, setChats] = useState([]); // chats will be an array of objects
    const {user} = useSelector((state) => state.authReducer.authData); // this is the user state from the redux store
    const [currentChat, setCurrentChat] = useState(null); // the current chatq*
    const [onlineUsers, setOnlineUsers] = useState([]); // the online users
    const [sendMessage, setSendMessage] = useState(null)
    const [receivedMessage, setReceivedMessage] = useState(null);

    const socket = useRef();
        /// getting the chats
    useEffect(() => {
        const getChats = async () => {
          try {
            const { data } = await userChats(user._id); // chatrequest -> that interracts wit the backend
            setChats(data);
            //console.log(data);
          } catch (error) {
            console.log(error);
          }
        };
        getChats(); // gets called when the page is loaded
    }, [user._id]);
      //////////////////////////////////////////////////////
      //////////////////// Chat ////// SOCKET IO ///////
      

        // Connect to Socket.io
    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

        //send message to the socket server
    useEffect(() => {
        if (sendMessage!==null) {
            socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);

    //receive message from the socket server
    useEffect(() => {
        socket.current.on("recieve-message", (data) => {
          console.log(data)
          setReceivedMessage(data);
        }
    
        );
      }, []);

      ///// checking if the user is online
      const isUserOnline = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
      };


    return (
        <div className="Chat">
            {/** LEFT SIDE  */}
            <div className="Left-side-chat">
                <LogoSearch />
                <div className="Chat-container">    
                <h2>Chats</h2>
                <div className="Chat-list">
                   {chats.map((chat) => (
                    <div onClick={()=> setCurrentChat(chat)} >
                        <Conversation data = {chat} currentUserId = {user._id} online={isUserOnline(chat)} /> {/**Conversation component */}
                    </div>
                     ))}
                </div>
            </div>

            </div>
            {/** RIGHT SIDE  */}
            <div className="Right-side-chat">
                <div style={{width: "20rem", alignSelf: "flex-end"}}>
                    <div className="navIcons">
                        <Link to={"../home"}>
                            <img src={Home} alt="" />
                        </Link>
                            <img src={Noti} alt="" />
                            <img src={Noti} alt="" />
                        <Link to={"../chat"}> {/* takes you to the chat page */}
                            <img src={Comment} alt="" />
                        </Link>
                    </div>
                </div>
                    {/**Chat body */}
                    <ChatBox  chat={currentChat} currentUser = {user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage}/>
                
            </div>
        </div>
    )
}

export default Chat;