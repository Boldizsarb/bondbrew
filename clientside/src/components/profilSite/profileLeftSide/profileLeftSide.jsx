import React from 'react'
import './profileLeftSide.css'
import PersonSearch from '../../personSearch/personSearch'
import InfoCard from './infoCardOnTheLeftSide/infoCard'
import FollowersCard from '../../followersCard/followersCard'


const ProfileLeftSide = () => {
  return (
   <div className="ProfileSide">
      <PersonSearch />
      < InfoCard />
      < FollowersCard />

   </div>
  )
}

export default ProfileLeftSide


