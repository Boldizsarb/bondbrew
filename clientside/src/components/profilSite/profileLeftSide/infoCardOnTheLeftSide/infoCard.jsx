import React, { useEffect, useState } from "react";
import "./infoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { Modal } from "@mantine/core";
//import ProfileModal from "../../../profilSite/profileLeftSide/infoCardOnTheLeftSide/infoCard.jsx";
import ProfileModal from "../../../profileModal/profileModal"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../../../api/userRequest";
import { logout } from "../../../../actions/signupAction";
import { followUser, unfollowUser } from "../../../../actions/userAction";

/// will need to make the data dynamic here as well 

const InfoCard = ({location,person}) => {

  const [modalOpened, setModalOpened] = useState(false); // this is for the modal of the info card, it is false by default it is closed 
  const dispatch = useDispatch()
  const params = useParams();
  const currentUserId = params.id; // since the id of the user is in the params 
  const [profileUser, setprofileUser] = useState({}); 
  const {user} = useSelector((state) => state.authReducer.authData); // current user from the store 

  // const storeUser = useSelector((state) => state.authReducer.authData.user);
  // const user = location === "clickedProfile" ? (person || storeUser) : storeUser; // this is the reason why the pen is in there 


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (currentUserId === user._id) {
        setprofileUser(user);
       // console.log(profileUser)
      } else {
        //console.log("loading")
        const profileUser = await UserApi.getUser(currentUserId);
        
        setprofileUser(profileUser);
        //console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]); // to prevent the infinite loop 

  const handleLogOut = ()=> {
    dispatch(logout())
  }

  console.log(person)
  // follow button: 
  // const [following, setFollowing] = useState(   // this brakes because the person is not defined here, need a dummy user, 
  //   person.followers.includes(user._id)
    
  // );



            //////////////////////////////// will have to add more data here, the input is in the modal and jin the profilemodal(server)
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        {user._id === currentUserId?  (<div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data = {user} //sending the user data to the modal
          />
        </div>): ""}
        
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>City </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      

      <button className="button logout-button" onClick={handleLogOut}>Logout</button>
    </div>
  );
};

export default InfoCard;

