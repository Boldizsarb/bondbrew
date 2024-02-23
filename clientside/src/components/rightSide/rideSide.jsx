import React, { useState } from "react";
import "./rideSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/chat.png";
import TrendCard from "../rightSideTrendCards/trendCards";
import ShareModal from "../shareModal/shareModal";
import { Link } from "react-router-dom";
import dummyUser from "../profilSite/profileLeftSide/infoCardOnTheLeftSide/dummyUser.json"; // this is the dummy user, it is used to prevent the app from crashing when the person is not defined
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


// home page icons on the right hand side of the page 

const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;

const RightSide = ({location,person}) => {

  if (!person) { // fallback data
    person = dummyUser;
  }

  const { user } = useSelector((state) => state.authReducer.authData);
  const [modalOpened, setModalOpened] = useState(false);
  const navigate = useNavigate();


  const handleMessageClick = async () => {
 
    //console.log("message clicked with person id: ", person._id, "and ther user id: ", user._id);
    const receiverId = person._id;
    const senderId = user._id;
    console.log(senderId, receiverId);

    try
  {   // cheking if the chat exists first then creating a new chat if it does not
      const chatExist = await fetch(`${getUserUrl}chat/find/${senderId}/${receiverId}`)
      if (!chatExist.ok) {
        //console.log("chat does not exist");
        const responseCreatechat = await fetch(`${getUserUrl}chat`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderId, receiverId }),

          });

          if (!responseCreatechat.ok) {
            console.log("error creating chat");
          }else{
            console.log("chat created");
            navigate('/chat');
          }

      }else{
       // console.log("chat exists");
        navigate('/chat');
      }

    }catch(error){
      console.log(error.message);
    }

  };

  //const [buttonBgClass, setButtonBgClass] = useState('button-bg-default');

  const changeColorToBlue = (color) => {
    document.documentElement.style.setProperty('--blur-color-default', color);
    document.documentElement.style.setProperty('--buttonBg', 'linear-gradient(120deg, #2ed3f0 0%, #8fd3f4 100%)');
    document.documentElement.style.setProperty('--buttonHover',  '#2ed3f0');
  };
  const changeColorToGreen = (color) => {
    document.documentElement.style.setProperty('--blur-color-default', color);
    document.documentElement.style.setProperty('--buttonBg', 'linear-gradient(120deg, #67e25f 0%, #07a81c 100%)');
    document.documentElement.style.setProperty('--buttonHover',  ' #67e25f');
  }
  const changeColorToPink = (color) => {
    document.documentElement.style.setProperty('--blur-color-default', color);
    document.documentElement.style.setProperty('--buttonBg', 'linear-gradient(120deg, #ef8ae0 0%, #e14ae4 100%)');
    document.documentElement.style.setProperty('--buttonHover',  ' #ed74db');
  }
  const changeColorToDefault = () => {
    document.documentElement.style.setProperty('--blur-color-default', ' #bf862b');
    document.documentElement.style.setProperty('--buttonBg', 'linear-gradient(98.63deg, #e7ab58 0%, #b06219 100%)');
    document.documentElement.style.setProperty('--buttonHover',  ' #fca61f');
  }




  return (
    <div className="RightSide">
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

      <TrendCard />

      <button
  className="button r-button"
  onClick={() => {
    if (location === "clickedUser") {
      // Handle click action for location equal to clickedUser (e.g., send message)
      handleMessageClick();
      
    } else {
      // Handle click action for location not equal to clickedUser (e.g., open modal)
      setModalOpened(true);
    }
  }}
>
  {location === "clickedUser" ? `Message ${person.firstname}` : "Share"}
</button>
<ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

<div className="color-circles">
<span className="color-palet">Palette:</span>
<div className="small-default-circle" onClick={() => changeColorToDefault("#bf862b")}></div>
  <div className="small-blue-circle" onClick={() => changeColorToBlue("blue")}></div>
  <div className="small-green-circle" onClick={() => changeColorToGreen("green")}></div>
  <div className="small-pink-circle" onClick={() => changeColorToPink("#e317e3")}></div>
</div>

    </div>
  );
};


export default RightSide; 


{/* <button onClick={() => changeColorToBlue("blue")}>blue</button> */}