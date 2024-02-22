import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import './clickedUserProfile.css';
import ClickedProfileLeft from './clickedLeftSide/clickedProfileLeft';
import ProfileCard from '../../components/profilecard/profilecard';
import PostSides from '../../components/posts/postSides';
import RightSide from '../../components/rightSide/rideSide';





const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;



const ClickedUserProfile = () => {

    const { id } = useParams(); // the clicked user's id
    //console.log(id);
    const { user } = useSelector((state) => state.authReducer.authData); // current user's data
    const [clickedUser, setClickedUser] = useState(null); // the clicked user's data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${getUserUrl}userser/${id}`);
                const data = await res.json();
                setClickedUser(data);
                //console.log(data);
                //console.log(clickedUser);
            } catch (error) {
                console.log(error.message);
            }
        };
    
        fetchData();
    
    }, [id]);

 


    return (
        <div className="Profile">
            <ClickedProfileLeft person={clickedUser} />
            <div className="Profile-center">
                <ProfileCard location = "clickedProfilePage" person ={clickedUser}/>
                <PostSides location={"clickedProfilePage"}/>

            </div>
           
            <RightSide location={"clickedUser"} person={clickedUser}/>
            
        </div>
    )
}

export default ClickedUserProfile

