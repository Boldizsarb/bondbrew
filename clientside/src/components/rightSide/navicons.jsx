import React from 'react'
import "./rideSide.css";
import Home from "../../img/home.png";
import Matching from "../../img/matching.png";
import Comment from "../../img/chat.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Plan from "../../img/plan.png";





const NavIcons = () => {    
    return (
        
      <div className="navIcons">

        <Link to={"../home"}>
          <img src={Home} alt="" />
        </Link>

        <Link to={"../plan"}>
          <img src={Plan} alt="" />
        </Link>

        <Link to={"../matching"}>
          <img src={Matching} alt="" />
        </Link>

        <Link to={"../chat"}> {/* takes you to the chat page */}
          <img src={Comment} alt="" />
        </Link>
        
    </div>
    )
}


export default NavIcons;
