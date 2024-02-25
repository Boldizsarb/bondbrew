import React, { useEffect, useState } from "react";
import "./planBox.css";
import { getUser } from "../../api/userRequest";
import { useDispatch } from "react-redux";
import User from "../user/user";
import { format, render, cancel, register } from 'timeago.js';
import Bin from "../../img/bin.png";
import { UilPen } from "@iconscout/react-unicons";
import Bin2 from "../../img/bin2.png";
import ConfirmDeletePlan from "./confirmDeletePlan";





const PlanBox = ({data,currentUserId,  onbuttonclick, refreshingplan,resetCurrentPlan}) => {
    
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch()
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [interested, setInterested] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [message, setMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false); // hover for bin
    const [modalOpened, setModalOpened] = useState(false); // delete modal

    useEffect(() => {

        setUserData(null);
        setInterestedUsers([]);
        setMessage("");

        const fetchData = async () => {
            if (!data || !data.userId) {
               // console.log("Data or userId is not available"); // it is keep on printing
                return; // Exit if data or userId is not available
            }
            try {
                const { data: userData } = await getUser(data.userId);
                setUserData(userData);
                dispatch({ type: "SAVE_USER", data: userData });
                //console.log(userData);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchInterestedUsers = async () => {
            if (!data || !data.peopleinterested || data.peopleinterested.length === 0) {
                //console.log("No interested users or data is not available"); // it is keep on printing
                return; // Exit if no interested users or data is not available
            }
            try {
                const usersData = await Promise.all(data.peopleinterested.map(userId => getUser(userId).then(res => res.data)));
                setInterestedUsers(usersData);
                usersData.forEach(userData => {
                    dispatch({ type: "SAVE_USER", data: userData });
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
        fetchInterestedUsers();
    }, [data, dispatch,refreshTrigger]); // Depend on the entire data object

   // console.log(userData)


    const handleuninterest = () => {
      
        const response = fetch(`${getUserUrl}plan/uninterested/${data._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: currentUserId }),
        }).then((response) => {
            if (!response.ok) {
                console.log("Error");
            }
            
            onbuttonclick()
            refreshingplan()// plan
            setInterested("Creator");
            setMessage("Your name was removed from the list")

            //setRefreshTrigger(prev => prev + 1);
            return response.json();
            
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
        
    }
    //onbuttonclick();
    
    const handleinterest = () => {
        
        const response = fetch(`${getUserUrl}plan/interested/${data._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: currentUserId }),
        }).then((response) => {
            if (!response.ok) {
                console.log("Error");
            }
            
           
            onbuttonclick()
            refreshingplan()
            setInterested("Creator");
        setMessage(`Your interest was registered! You can even message ${userData.firstname} to make plans together!`)

            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
        
    }

    useEffect(() => { // interested button setting 
        if (data && data.peopleinterested) {
            if(data.userId === currentUserId){
                setInterested("Creator");
            }else{
                if(data.peopleinterested.includes(currentUserId)){
                    setInterested("Interested");
                }else{
                    setInterested("Uninterested");
                }
            }
        }
    }, [data,refreshTrigger]);


    //console.log(interested);
    const timeAgo = () => {
        const date1 = data.createdAt;
        const date = new Date(date1);
       
        return timeAgo;

    }
    //////// new plan //// new plan //// new plan //// new plan //// new plan 
    const [title , setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newPlan = {
            title,
            description,
            city,
            from,
            to,
            userId: currentUserId
        }
        //console.log(newPlan);
        try {
            const response = await fetch(`${getUserUrl}plan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlan)
            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            onbuttonclick()
            setTitle("");
            setDescription("");
            setCity("");
            setFrom("");
            setTo("");
            alert('Plan created successfully');
            //console.log(data);
        }catch(error){
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        const response = await fetch(`${getUserUrl}plan/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: currentUserId })
        });
        if (!response.ok) {
            console.log("Error");
        }
        onbuttonclick()
        refreshingplan()
        resetCurrentPlan()
        console.log("Plan deleted");
        return response.json();
    }

    const openDeleteModal = () => {
        setModalOpened(true);
    }   


    return ( // middle, print out 
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
                <div className="planBody">
                    {data.userId === currentUserId && (
                        <div className="tools" >
                            <UilPen width="2rem" height="1.2rem"  style={{cursor:"pointer"}}  />
                            <img style={{cursor:"pointer"}}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                src={isHovered ? Bin2 : Bin} alt="" 
                                onClick={openDeleteModal}
                            />
                        </div>
                    )}
                    

                    <h3> Place: {data.city}</h3>
                    <p>From: {data.from}</p>
                    <p>To: {data.to}</p>
                    
                    <p>{data.desc}</p>
                    {interested === "Uninterested" && interested !== "Creator" && (
                    <button className= "button infoButton" onClick={handleinterest}>I am interested</button>
                    )}
                    {interested === "Interested" && interested !== "Creator" && (
                        <button className= "button infoButton" onClick={handleuninterest} >Revoke my interest</button>
                    )}
                    <span style={{color:"var(--buttonHover)"}}>{message}</span>
                        <p>
                        Created by: 
                         {userData && Object.keys(userData).length > 0 && data.userId === currentUserId ? 
                            " Me" : 
                            (userData && Object.keys(userData).length > 0 && <User person={userData} location={"plan"} />)
                        }
                        </p>
                        <p>Posted: {format(data.createdAt)}</p>

                    {interestedUsers.length > 0 && (
                        <div>
                            <h4>People Interested:</h4>
                            {interestedUsers.map((user, index) => (
                                <User key={index} person={user} location={"plan"} />
                            ))}
                        </div>
                    )}
                <ConfirmDeletePlan modalOpened={modalOpened} setModalOpened={setModalOpened} handleDelete={handleDelete} id={data._id} />

                </div>
                
                </>
                ) : (
                    // if the current plan is empty the new plan form is available
                    
                    <>
        <div >
            <>
            <div className="chat-header">

                <div className="follower">
                    <div className="name-container">
                        <h3 id="brewingPlan">Brewing a new Plan</h3>
                    </div>
                </div>
                <hr style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}/>
            </div>
            <div className="planBody">
                <form onSubmit={handleSubmit}>
                    <h3>What are you planning to do? (briefly)</h3>
                    <div className="plan-inputdiv">
                        <input type="text" className="plan-input"  id="title" value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Title' required />
                    </div>
                    
                    <p>Location of the event?</p>

                    <div className="plan-inputdiv">
                        <input type="text" className="plan-input"  id="city" value={city} onChange={(event) => setCity(event.target.value)} required placeholder="Location"/>
                    </div>
                    
                    <p>Describe the plan:</p>
                    <div className="plan-inputdiv">
                        <textarea id="description" className="plan-input" cols="30" rows="8" value={description} placeholder='Describe your plan' onChange={(event) => setDescription(event.target.value)} required />
                    </div>
                    
                    <p>Is there a set time when does it take place?</p>
                    From:
                    <div className="plan-inputdiv">
                        <input type="date" className="plan-input" id="from" value={from} onChange={(event) => setFrom(event.target.value)} />
                    </div>
                    <br />
                    To:
                    <div className="plan-inputdiv">
                        <input type="date" className="plan-input" id="to" value={to} onChange={(event) => setTo(event.target.value)} />
                    </div>
                    <br /><br />
                    <button type="submit" className="button  infoButton ">Post</button>
                </form>
                
                </div>
            </>    
            </div>
            </>
                )}

            
        </div>
        </>
    )
}


export default PlanBox