import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
import "./user.css";
import { useNavigate } from 'react-router-dom'; 




const User = ({ person }) => {

  const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  const handleFirstNameClick = () => {
    //console.log(person._id);
    navigate(`/clickProfile/${person._id}`);
  };
 // console.log(person);

  if (!person) {
    return <div>No user to display</div>;
  }

  return (
    <div className="follower">
      <div>
      <img src={person.profilePicture? serverPubicFolder + person.profilePicture : serverPubicFolder + "defaultProfile.png"}  alt="profile"
          className="followerImage" />
        <div className="name">
          <span onClick={handleFirstNameClick} style={{cursor:"pointer"}}>{person.firstname}</span>
          <span>{person.lastname}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;