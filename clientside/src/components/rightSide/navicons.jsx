import React, { useEffect, useState } from "react";
import "./rideSide.css";
import Home from "../../img/home.png";
import Matching from "../../img/matching.png";
import Comment from "../../img/chat.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Plan from "../../img/plan.png";
import Bot from "../../img/bot.png";
import Feedback from "../../img/feedback.png";

// css is in rideside.css



const NavIcons = () => {    

  const {user} = useSelector((state) => state.authReducer.authData);
  const[messageNotification, setMessageNotification] = useState(0);
  const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;

  useEffect(() => {
    const notifications = async () => {
      try {
        const response = await fetch(`${getUserUrl}notification/getmessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userto: user._id }), // receiver should be the current user
        });
        const data = await response.json();
        setMessageNotification(data.length);
      } catch (error) {
        console.log(error);
      }
    };
    notifications();

  }, []);

//console.log(messageNotification);





    return (
        
      <div className="navIcons">

        <Link to={"../home"}>
          <img src={Home} alt="" />
        </Link>

        <Link to={"../plan"}>
          <img src={Plan} alt="" />
        </Link>

        <div className="iconWithBadge"> {/* This is the relative container for the chat icon and badge */}
          <Link to={"../chat"}> {/* Link to the chat page */}
            <img src={Comment} alt="" className="navIcon"/>
          </Link>
          {messageNotification > 0 && (
            <span className="notificationBadge">{messageNotification}</span> // Notification badge
          )}
        </div>




        <Link to={"../matching"}> 
          <img src={Matching} alt="" />
        </Link>

        <Link to={"../chatBot"}> 
          <img src={Bot} alt="" />
        </Link>

        <Link to={"../feedback"}> 
          <img src={Feedback} alt="" />
        </Link>
    </div>
    )
}


export default NavIcons;
