import React, { useEffect, useState } from "react";
import "./planBox.css";
import { getUser } from "../../api/userRequest";
import { useDispatch } from "react-redux";
import User from "../user/user";


const PlanBox = ({data}) => {
    console.log(data);

    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch()
    const [interestedUsers, setInterestedUsers] = useState([]);

    useEffect(() => {

        setUserData(null);
        setInterestedUsers([]);
        // Define an async function inside the useEffect hook
        const fetchData = async () => {
            if (!data || !data.userId) {
                console.log("Data or userId is not available");
                return; // Exit if data or userId is not available
            }

            try {
                const { data: userData } = await getUser(data.userId);
                setUserData(userData);
                dispatch({ type: "SAVE_USER", data: userData });
                console.log(userData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchInterestedUsers = async () => {
            if (!data || !data.peopleinterested || data.peopleinterested.length === 0) {
                console.log("No interested users or data is not available");
                return; // Exit if no interested users or data is not available
            }

            try {
                const usersData = await Promise.all(data.peopleinterested.map(userId => getUser(userId).then(res => res.data)));
                setInterestedUsers(usersData);
                // Optionally dispatch an action for each user
                usersData.forEach(userData => {
                    dispatch({ type: "SAVE_USER", data: userData });
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        fetchInterestedUsers();
    }, [data, dispatch]); // Depend on the entire data object

   // console.log(userData)



    return (
        <>
        <div className="ChatBox-container">
        {data ? (    
                <>
                <div className="chat-header"  >
                    <div  className="follower">
                        <div className="name-container" style={{ textAlign: "center" }} >
                            <h3>{data.title}</h3>

                        </div>
                    </div>
                    <hr style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}/>

                </div>

                <p>From: {data.from}</p>
                <p>To: {data.to}</p>
                <h3> Place: {data.city}</h3>
                <p>{data.desc}</p>
                <p>Created by: 
                {userData && Object.keys(userData).length > 0 && (
                    <User person={userData} location={"plan"} />
                )}
                </p>
                {interestedUsers.length > 0 && (
                    <div>
                        <h4>People Interested:</h4>
                        {interestedUsers.map((user, index) => (
                            <User key={index} person={user} location={"plan"} />
                        ))}
                    </div>
                )}


                
                </>
                ) : (
                    // If chat is not provided or is empty, display "No plans"
                    <div>No plans</div>
                )}

            
        </div>
        </>
    )
}


export default PlanBox