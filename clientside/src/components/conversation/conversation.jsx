import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/userRequest";
import { useDispatch } from "react-redux";
import "./conversation.css";

// the paramaters are the being passed from the chat component
const Conversation =({data,currentUserId, online}) => {

    const [userData, setUserData] = useState(null); // the other user on the right side of the chat which is not the current user
    const dispatch = useDispatch()
    const[messageNotification, setMessageNotification] = useState([])
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
  
    const userId = data.members.find((id)=> id !== currentUserId);
    useEffect(() => {

        // need to identify the id of the other user first
        //console.log(userId);
        const getUserData = async () => { // getting user data from back end OUTSIDE OF REDUX

            try {
                const {data} = await getUser(userId); // userrequest -> that interracts wit the backend
                setUserData(data);
                dispatch({type:"SAVE_USER", data:data})
                //console.log(data);
                // NOTIFICATION //// NOTIFICATION //// NOTIFICATION
                const response = await fetch(`${getUserUrl}notification/getmessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userto: currentUserId }), // receiver should be the current user
                    });
                    const data1 = await response.json();
                    const usertoIds = data1.map(notification => notification.userfrom); // extracting all the userto attributes
                    setMessageNotification(usertoIds);

            } catch (error) {
                console.log(error);
            }
        }
        getUserData();

    },[])

console.log(messageNotification);

console.log(userData?._id)




    return (
        <>
            <div className="follower conversation">
                <div >
                {online && <div className="online-dot"></div>}

                {messageNotification.includes(userData?._id) && (
                    <div className="notification-badge">1</div> // Style this badge as needed
                )}
                    
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

