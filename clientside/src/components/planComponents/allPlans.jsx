import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/userRequest";
import { useDispatch } from "react-redux";

const AllPlans = ({data, currentUserId}) => {

    ///  Each plan ///  Each plan ///  Each plan ///  Each plan ///  Each plan 

    const [userData, setUserData] = useState(null); // the creater of the plan
    const dispatch = useDispatch()

    useEffect(() => { // setting the user data

        const userId = data.userId // pulling the data of the creater of the plan
        //console.log(userId);
        const getUserData = async () => { 
            try {
                const {data} = await getUser(userId); 
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
                
                <img 
                    src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{fontSize: '0.8rem'}}>
                    <span>{data.title} </span>
                    <span>{data.city}</span>
                   
                </div>
            
            </div>
        </div>
    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} /> {/**The line after each plan */}
    </>
    )
}

export default AllPlans