import React from "react";
import "./profilecard.css";
import Cover from "../../img/logo1.png";
import Profile from "../../img/linkedin.JPG";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileCard = ({location}) => {
    const ProfilePage = true;

    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const posts = useSelector((state)=>state.postReducer.posts) // getting the posts from the store for the number of posts


    return (
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img src={user.coverPicture? serverPubicFolder + user.cover.coverPicture : serverPubicFolder + "defaultCover.png"} alt="" />
          <img src={user.profilePicture? serverPubicFolder + user.cover.coverPicture : serverPubicFolder + "defaultProfile.png"} alt="" />
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
         {location === "profilePage" ? (
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