import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
import "./user.css";
import { useNavigate } from 'react-router-dom'; 
import { incrementRefreshTrigger } from "../../reducers/refreshReducer";



const User = ({ person, location }) => {

  const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
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
    // post refresh
    dispatch(incrementRefreshTrigger());
  
  };

  const handleFirstNameClick = () => {
    //console.log(person._id);
    navigate(`/clickProfile/${person._id}`);
  };
 // console.log(person);

  if (!person) {
    return <div>No user to display</div>;
  }

  const handlelikeclick = async () => { // message button in the matched page 
    const receiverId = person._id;
    const senderId = user._id;
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

  }

  return (
    <div>
    <div className="follower">
      <div>
      <img src={person.profilePicture? serverPubicFolder + person.profilePicture : serverPubicFolder + "defaultProfile.png"}  alt="profile"
          className="followerImage" />
        <div className="name">
        <span onClick={handleFirstNameClick} style={{cursor:"pointer"}}>
          {person.firstname.charAt(0).toUpperCase() + person.firstname.slice(1)}
          </span>
          <span>{person.lastname.charAt(0).toUpperCase() + person.lastname.slice(1)}</span>
        </div>
      </div>
      {location !== "plan" && location !== "matching" && location !== "matched" && (
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
       )}
       {location === "matched" && (
        <button className="button" onClick={handlelikeclick}>Message</button>
        )}
      
    </div>
    <hr
                style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}
              />
    </div>
    
  );
};

export default User;