import React from 'react'
import './clickedProfileLeft.css'
import PersonSearch from '../../../components/personSearch/personSearch'
import InfoCard from '../../../components/profilSite/profileLeftSide/infoCardOnTheLeftSide/infoCard'
import FollowersCard from '../../../components/followersCard/followersCard'



const ClickedProfileLeft = ({person}) => {
    return (
        <div className="ProfileSide">
            <PersonSearch />
            <InfoCard location={"clickedProfile"} person ={person}/> {/**needs to be customized  */}
            <FollowersCard />

        </div>
    )
}

export default ClickedProfileLeft
