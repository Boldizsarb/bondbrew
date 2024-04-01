import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Auth from "./pages/signup/signup";
import "./style/App.css";
import {Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/chat/chat";
import ForgotPassword from "./pages/forgotPassword/forgotPassword";
import ResetPassword from "./pages/resetPassword/resetPassword";
import ClickedUserProfile from "./pages/clickedUserProfile/clickedUserProfile";
import Plan from "./pages/plan/plan";
import Matching from "./pages/matching/matching";
import React, {  useEffect } from "react";
import ChatBot from "./pages/chatBot/chatBot";
import Feedback from "./pages/feedback/feedback";

//////  this file enables the routing of the app
function App() {

  const user = useSelector((state) => state.authReducer.authData); // user state from the redux store

  useEffect(() => { // coror scheme /// /////// color scheme ////  /////// color scheme ////  /////// color scheme ////

    const getCookie = (name) => {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    const applyColorScheme = (color) => {
      const changeColorScheme = (color, buttonBg, buttonHover) => {
        document.documentElement.style.setProperty('--blur-color-default', color);
        document.documentElement.style.setProperty('--buttonBg', buttonBg);
        document.documentElement.style.setProperty('--buttonHover', buttonHover);
      };

      switch (color) {
        case 'blue':
          changeColorScheme('blue', 'linear-gradient(120deg, #2ed3f0 0%, #8fd3f4 100%)', '#2ed3f0');
          break;
        case 'green':
          changeColorScheme('green', 'linear-gradient(120deg, #67e25f 0%, #07a81c 100%)', '#67e25f');
          break;
        case '#e317e3':
          changeColorScheme('#e317e3', 'linear-gradient(120deg, #ef8ae0 0%, #e14ae4 100%)', '#ed74db');
          break;
        default:
          changeColorScheme('#bf862b', 'linear-gradient(98.63deg, #e7ab58 0%, #b06219 100%)', '#fca61f');
      }
    };

    const savedScheme = getCookie('colorScheme');
    if (savedScheme) {
      applyColorScheme(savedScheme);
    }
  }, []);
  //// color scheme ////  /////// color scheme ////  /////// color scheme ////  /////// color scheme ////

  return (
    
    <div className="App"> 
      <div className="blur" style={{top:'-18%',right:'0'}}></div>
      <div className="blur" style={{top: '36%',left:'-6rem'}}></div>
      <div className="blur" style={{top: '-20%',left:'20rem'}}></div>
      <div className="blur" id="moreblur" style={{top: '40%',left:'40rem'}}></div>

    
      
     <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
         <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
         <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
         <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
        <Route
          path="/forgotPassword"
          element={!user ? <ForgotPassword /> : <Navigate to="../auth" />}
        />
        <Route
          path="/resetpassword/:id/:token" // coming from the signuprequest.js/ api
          element={!user ? <ResetPassword /> : <Navigate to="../auth" />}
        />
        <Route
          path="/clickProfile/:id"
          element={user ? <ClickedUserProfile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/plan"
          element={user ? <Plan /> : <Navigate to="../auth" />}
        />
         <Route
          path="/matching"
          element={user ? <Matching /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chatBot"
          element={user ? <ChatBot /> : <Navigate to="../auth" />}
        />
        <Route
          path="/feedback"
          element={user ? <Feedback /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;


// the home will be called with router 