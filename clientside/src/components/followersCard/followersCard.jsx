import React from "react";
import "./followersCard.css";

// under my profile, I want to see a list of people I can follow



import { friendsData } from "../../data/friendsData";

const FollowersCard = () => {
    return (
        <div className="FollowersCard">
        <h3>Who is your friend</h3>

        {friendsData. map((friend, id)=>{
            return(
                <div className="follower">
                    <div>
                        <img src={friend.img} alt="" className='followerImage' />
                        <div className="name">
                            <span>{friend.name}</span>
                            <span>@{friend.username}</span>
                        </div>
                    </div>
                    <button className='button fc-button'>
                        Follow
                    </button>
                </div>
            )
        })}
    </div>
  )
  }


export default FollowersCard;