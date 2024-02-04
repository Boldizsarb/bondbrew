import React, { useState } from "react";
import "./rideSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/chat.png";
import TrendCard from "../rightSideTrendCards/trendCards";
import ShareModal from "../shareModal/shareModal";
import { Link } from "react-router-dom";


// home page icons on the right hand side of the page 


const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
      <Link to={"../home"}>
        <img src={Home} alt="" />
      </Link>
        <img src={Noti} alt="" />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div>

      <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} /> {/* pups up when clicked */}
      
    </div>
  );
};

export default RightSide; 