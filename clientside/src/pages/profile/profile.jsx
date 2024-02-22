import React from 'react'
import "./profile.css"
import ProfileLeftSide from '../../components/profilSite/profileLeftSide/profileLeftSide'
import ProfileCard from '../../components/profilecard/profilecard'
import PostSides from '../../components/posts/postSides'
import RightSide from '../../components/rightSide/rideSide'



const Profile = () => {
  return (
    <div className="Profile">
        <ProfileLeftSide />

        <div className="Profile-center"> {/* the middle of the page */}
                {/**providing the location for the profile card */}
            <ProfileCard location = "profilePage" /> 
            <PostSides  />
           
        </div>

        <RightSide />    {/* right side!, could be different here! */}
    </div>
  )
}

export default Profile 