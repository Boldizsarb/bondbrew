import React from "react";
import "./profilecard.css";
import Cover from "../../img/logo1.png";
import Profile from "../../img/linkedin.JPG";


const ProfileCard = () => {
    const ProfilePage = true;
    return (
      <div className="ProfileCard">
        <div className="ProfileImages">
          <img src={Cover} alt="" />
          <img src={Profile} alt="" />
        </div>
  
        <div className="ProfileName">
          <span>Boldizsar Banfia</span>
          <span> Boyszy</span>
        </div>
  
        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>6,890</span>
              <span>Friends</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>1</span>
              <span>Followers</span>
            </div>
  
            {ProfilePage && (
              <>
                <div className="vl"></div>
                <div className="follow">
                  <span>3</span>
                  <span>Posts</span>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>
        <span>
            My Profile
        </span>
      </div>
    );
  };

export default ProfileCard;

// {ProfilePage ? "" : <span>My Profile</span>}