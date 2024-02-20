import React from "react";
import "./profilecard.css";
import Cover from "../../img/logo1.png";
import Profile from "../../img/linkedin.JPG";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({location, person}) => {
    const ProfilePage = true;
    //console.log(person);

    // the person is being passed from the clickedUserProfile page and the user is converrted to the person
    const storeUser = useSelector((state) => state.authReducer.authData.user);
    //const user = location === "clickedProfilePage" ? person : storeUser;
    const user = location === "clickedProfilePage" ? (person || storeUser) : storeUser;
    
    //const { user } = useSelector((state) => state.authReducer.authData);
    //console.log(user) 

    const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    

    const posts = useSelector((state)=>state.postReducer.posts) // getting the posts from the store for the number of posts


    return (
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img src={user.coverPicture? serverPubicFolder + user.coverPicture : serverPubicFolder + "defaultCover.png"} alt="" />
          <img src={user.profilePicture? serverPubicFolder + user.profilePicture : serverPubicFolder + "defaultProfile.png"} alt="" />
        </div>
  
        <div className="ProfileName">
          <span>{user.firstname} {user.lastname}</span>
          <span> {user.worksAt? user.worksAt : "About me"}</span>
        </div>
  
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>{user.following.length}</span>
              <span>Friends</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>{user.followers.length}</span>
              <span>Followers</span>
            </div>
  
            {ProfilePage && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>{posts.filter((post)=> post.userId === user._id).length}</span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>{/*do not show the my profile on the profile page */}
         {location === "profilePage" || location === "clickedProfilePage"? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
      </div>
    );
  };

export default ProfileCard;

// {ProfilePage ? "" : <span>My Profile</span>}