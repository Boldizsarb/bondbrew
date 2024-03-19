import React, { useState, useEffect } from "react";
import "./rideSide.css";
import TrendCard from "../rightSideTrendCards/trendCards";
import ShareModal from "../shareModal/shareModal";
import dummyUser from "../profilSite/profileLeftSide/infoCardOnTheLeftSide/dummyUser.json"; // this is the dummy user, it is used to prevent the app from crashing when the person is not defined
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import NavIcons from "./navicons";


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

  /////// color scheme ////  /////// color scheme ////  /////// color scheme ////  /////// color scheme ////  /////// color scheme //// 
function setCookie(name, value, days) { // setting the cokies and in the app.js the color scheme is read from the cookies
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// function getCookie(name) {
//   const nameEQ = name + '=';
//   const ca = document.cookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

  //const [buttonBgClass, setButtonBgClass] = useState('button-bg-default');
  // useEffect(() => {
  //   const savedScheme = getCookie('colorScheme');
  //   if (savedScheme) {
  //     applyColorScheme(savedScheme);
  //   }
  // }, []);

  // const applyColorScheme = (color) => {
  //   switch (color) {
  //     case 'blue':
  //       changeColorToBlue();
  //       break;
  //     case 'green':
  //       changeColorToGreen();
  //       break;
  //     case '#e317e3':
  //       changeColorToPink();
  //       break;
  //     default:
  //       changeColorToDefault();
  //   }
  // };


  const changeColorScheme = (color, buttonBg, buttonHover) => {
    document.documentElement.style.setProperty('--blur-color-default', color);
    document.documentElement.style.setProperty('--buttonBg', buttonBg);
    document.documentElement.style.setProperty('--buttonHover', buttonHover);
    //localStorage.setItem('colorScheme', color);
    setCookie('colorScheme', color, 365); // Save the theme for 365 days
  };

  const changeColorToBlue = () => {
    changeColorScheme('blue', 'linear-gradient(120deg, #2ed3f0 0%, #8fd3f4 100%)', '#2ed3f0');
  };

  const changeColorToGreen = () => {
    changeColorScheme('green', 'linear-gradient(120deg, #67e25f 0%, #07a81c 100%)', '#67e25f');
  };

  const changeColorToPink = () => {
    changeColorScheme('#e317e3', 'linear-gradient(120deg, #ef8ae0 0%, #e14ae4 100%)', '#ed74db');
  };

  const changeColorToDefault = () => {
    changeColorScheme('#bf862b', 'linear-gradient(98.63deg, #e7ab58 0%, #b06219 100%)', '#fca61f');
  };
 /////// color scheme ////  /////// color scheme ////  /////// color scheme ////  /////// color scheme //// 


  return (
    <div className="RightSide">
      <NavIcons />
      
      <TrendCard />

      <button
  className="button r-button"
  onClick={() => {
    if (location === "clickedUser") {
      handleMessageClick();
      
    } else {
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



