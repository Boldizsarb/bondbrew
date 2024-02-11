import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/userRequest";
import { useDispatch } from "react-redux";

// the paramaters are the being passed from the chat component
const Conversation =({data,currentUserId, online}) => {

    const [userData, setUserData] = useState(null); // the other user on the right side of the chat which is not the current user
    const dispatch = useDispatch()

    useEffect(() => {

        const userId = data.members.find((id)=> id !== currentUserId); // need to identify the id of the other user first
        //console.log(userId);
        const getUserData = async () => { // getting user data from back end OUTSIDE OF REDUX

            try {
                const {data} = await getUser(userId); // userrequest -> that interracts wit the backend
                setUserData(data);
                dispatch({type:"SAVE_USER", data:data})
                //console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getUserData();

    },[])





    return (
        <>
            <div className="follower conversation">
                <div >
                {online && <div className="online-dot"></div>}
                    
                    <img 
                        src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                        alt="Profile"
                        className="followerImage"
                        style={{ width: "50px", height: "50px" }}
                    />
                    <div className="name" style={{fontSize: '0.8rem'}}>
                        <span>{userData?.firstname} {userData?.lastname}</span>
                        <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"} </span>
                    </div>
                

                </div>
            </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }} /> {/**The line after each chat */}
        </>
    )
}


export default Conversation;

