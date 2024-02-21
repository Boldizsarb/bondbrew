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
import dummyUser from "./dummyUser.json"; // this is the dummy user, it is used to prevent the app from crashing when the person is not defined


const InfoCard = ({location,person}) => {

  //console.log(location)
  if (!person) {
    person = dummyUser;
  }

  const [modalOpened, setModalOpened] = useState(false); // this is for the modal of the info card, it is false by default it is closed 
  const dispatch = useDispatch()
  const params = useParams();
  const currentUserId = params.id; // since the id of the user is in the params 
  const [profileUser, setprofileUser] = useState({}); 
  const {user} = useSelector((state) => state.authReducer.authData); // current user from the store 

  
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (currentUserId === user._id) {
        setprofileUser(user);
       // console.log(profileUser)
      } else {
        //console.log("loading")
        if (location === "clickedProfile") { // if the request is coming from the clicked user, then the person is defined hence the person's data is used
          setprofileUser(person);
          return;
        }else{
        const profileUser = await UserApi.getUser(currentUserId);
        
        setprofileUser(profileUser);
        }
        //console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [currentUserId, user, person, location]); // to prevent the infinite loop  

  const handleLogOut = ()=> {
    dispatch(logout())
  }

  //console.log(person)

  //follow button: 
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(person.followers?.includes(user._id));
  }, [person, user._id]);

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  



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
      {location === "clickedProfile" ? (
        <button
          className={
            following ? "button fc-button UnfollowButton" : "button fc-button"
          }
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      ) : (
        <button className="button logout-button" onClick={handleLogOut}>
          Logout
        </button>
      )}
    </div>
  );
};

export default InfoCard;

