import React, { useState } from "react";
import "./infoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { Modal } from "@mantine/core";
//import ProfileModal from "../../../profilSite/profileLeftSide/infoCardOnTheLeftSide/infoCard.jsx";
import ProfileModal from "../../../profileModal/profileModal"

/// will need to make the data dynamic here as well 

const InfoCard = () => {

  const [modalOpened, setModalOpened] = useState(false); // this is for the modal of the info card, it is false by default it is closed 

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
        
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>in Relationship</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Multan</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>Zainkeepscode inst</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  );
};

export default InfoCard;

