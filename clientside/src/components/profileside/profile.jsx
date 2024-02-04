
import React from "react";
import PersonSearch from "../personSearch/personSearch";
import ProfileCard from "../profilecard/profilecard";
import "./profile.css";
import FollowersCard from "../followersCard/followersCard";


// left side of the page 


const ProfileSide = () => {
    return (
        <div className="profile">
            <PersonSearch />
            <ProfileCard />
            <FollowersCard />
        </div>
    );
};

export default ProfileSide;