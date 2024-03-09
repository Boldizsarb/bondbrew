import React, { useEffect, useState,  useRef  } from "react";
import "./planBox.css";
import { getUser } from "../../api/userRequest";
import { useDispatch } from "react-redux";
import User from "../user/user";
import { format, render, cancel, register } from 'timeago.js';
import Bin from "../../img/bin.png";
import { UilPen } from "@iconscout/react-unicons";
import Bin2 from "../../img/bin2.png";
import ConfirmDeletePlan from "./confirmDeletePlan";
import PlanUpdateModal from "./updateModal";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getUserLocation } from "../../middlewares/geoLocation.js";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';






const PlanBox = ({data,currentUserId,  onbuttonclick, refreshingplan,resetCurrentPlan, mapInitiator}) => {
    
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch()
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [interested, setInterested] = useState("");
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [message, setMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false); // hover for bin
    const [modalOpened, setModalOpened] = useState(false); // delete modal
    const [modalOpened1, setModalOpened1] = useState(false); // update modal 
    //const [mapInitiater, setMapInitiater] = useState(0); // forces the map to re-render when the current plan changes
    //map stuff
    const [currentposition, setCurrentposition] = useState({});
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [finalLocation, setFinalLocation] = useState({ lat: 50.92608620744581, lng: -1.4339711201693437});
    const readOnlyMapRef = useRef(null);
   

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
                return; // exit if no interested users or data is not available
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
    const [desc, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const newPlan = {
            title,
            desc,
            city,
            from,
            to,
            lat: finalLocation.lat,
            lng: finalLocation.lng,
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
    const openUpdateModal = () => {
        setModalOpened1(true);
    }

    const refresh = () => {
        onbuttonclick()
        refreshingplan()
        setRefreshTrigger(prev => prev + 1)
        
        console.log("refreshed");
    }
    /////////// MAP ////////////// MAP ////////////// MAP ////////////// MAP ////////////// MAP ////////////// MAP
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    // getting the current position of the user: 
    

    useEffect(() => { // current location if the user wants to use it
        if (useCurrentLocation) { //  but only if yes clicked 

        getUserLocation()
          .then(({ latitude, longitude }) => {
            setCurrentposition({ latitude, longitude });
            setFinalLocation({ lat: latitude, lng: longitude });
          })
          .catch((error) => {
            console.error('Error getting location:', error);
          });
        }
        return
      }, [useCurrentLocation]);

      
      /// city to lat and long  /// city to lat and long  /// city to lat and long

      const [coordinates, setCoordinates] = useState({lat:0.00 , lng:0.00}); // search for city 
      const [cityrefreshtrigger , setCityrefreshtrigger] = useState(0);

      useEffect(() => {
        if (!city) return;
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&format=json&limit=1`);
                if (!response.ok) {
                    throw new Error('Failed to fetch coordinates');
                }
               const data = await response.json();
                // Process the data right after fetching, using the same async function
                if (data[0] && data[0].lat && data[0].lon) {
                    setCoordinates({ lat: data[0].lat, lng: data[0].lon });
                    setFinalLocation({ lat: data[0].lat, lng: data[0].lon });// setting the map 
                    setCityrefreshtrigger(prev => prev + 1);
                } else {
                    console.log("No coordinates found for the city");
                }
                } catch (error) {
                console.error("Error fetching coordinates:", error);
                }
            };

            fetchCoordinates();
            
        
    }, [city]);

  
    //console.log("final"+finalLocation.lat, finalLocation.lng)


      useEffect(() => {// atual map when creating a plan
       
        const updateMapLocation = (location) => {
            if (!mapRef.current) return; 
    
            if (!mapRef.current.leafletMap) {
                const map = L.map(mapRef.current).setView([location.lat, location.lng], 13);
                mapRef.current.leafletMap = map;
    
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
            } else {
                mapRef.current.leafletMap.setView([location.lat, location.lng], 13);
            }

            let DefaultIcon = L.icon({
                iconUrl: icon,
                shadowUrl: iconShadow,
                iconAnchor: [12, 41]
            });
    
            
            mapRef.current.leafletMap.on('click', function(mapEvent) {
                //console.log(mapEvent.latlng);
    
                setFinalLocation({ lat: mapEvent.latlng.lat, lng: mapEvent.latlng.lng }); // final with the clicked 
    
                // Optionally, remove the previous marker if you only want one marker on the map at a time
                if (markerRef.current) {
                    mapRef.current.leafletMap.removeLayer(markerRef.current);
                }
    
                // Add a new marker at the clicked location
                markerRef.current = L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng],{icon:DefaultIcon}).addTo(mapRef.current.leafletMap)
                    .bindPopup('Selected location').openPopup();
            });
        };
    
        // Determine initial location for the map based on user preference for current location
        let initialLocation = finalLocation;
        if (useCurrentLocation && currentposition.latitude && currentposition.longitude) {
            initialLocation = { lat: currentposition.latitude, lng: currentposition.longitude };
        }
    
        // Initialize or update the map location
        updateMapLocation(initialLocation);
    }, [mapInitiator, currentposition, useCurrentLocation,cityrefreshtrigger]); 

    //// read only map for the plan
    useEffect(() => {
        if (!data || !data.lat || !data.lng || !readOnlyMapRef.current) return;

     //  readOnlyMapRef.current.innerHTML = "";

        

        const map = L.map(readOnlyMapRef.current, {
            center: [data.lat, data.lng],
            zoom: 13,
            keyboard: false,
        });
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
    
        let DefaultIcon = L.icon({
            iconUrl: icon,
            shadowUrl: iconShadow,
            iconSize: [25, 41], // Size of the icon
            iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
            popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
        });
    
        L.marker([data.lat, data.lng], { icon: DefaultIcon }).addTo(map)
            .bindPopup(`${data.title}`).openPopup();

            readOnlyMapRef.current.leafletMap = map;

            
            return () => { // removing the initial map otherwise it will keep on adding the map and eror
                map.remove();
            };
    
    }, [data]); 


    ////// MAP END ////// MAP END ////// MAP END ////// MAP END ////// MAP END ////// MAP END ////// MAP END ////// MAP END
        //console.log(useCurrentLocation)

        const [isMapVisible, setIsMapVisible] = useState(true);

        useEffect(() => { // correcting overlaping problem of the map 
            if(modalOpened === true || modalOpened1 === true){
                setIsMapVisible(false);
            }else{
                setIsMapVisible(true);
            }
                
    },[modalOpened,modalOpened1])
    


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

                            <UilPen width="2rem" height="1.2rem"  style={{cursor:"pointer"}} onClick={openUpdateModal} />

                            <img style={{cursor:"pointer"}}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                src={isHovered ? Bin2 : Bin} alt="" 
                                onClick={openDeleteModal}
                            />
                        </div>
                    )}
                    

                    <h3> Location: {data.city}</h3>
                    <div className="readOnlyMapContainer" ref={readOnlyMapRef} style={{ height: '40vh', visibility: isMapVisible ? 'visible' : 'hidden'  }}></div>
                   
                    <p id="desc" >{data.desc}</p>
                    <p className="from-to">From: {data.from ? data.from : (data.to ? "Not specified" : "Not time sensitive")}</p>
                    <p className="from-to">To: {data.to ? data.to : (data.from ? "Not specified" : "Not time sensitive")}</p>
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
                <PlanUpdateModal modalOpened1={modalOpened1} setModalOpened1={setModalOpened1}  id={data._id} userId={currentUserId}  refresh={refresh}/>

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
                     <br />

                    <div>
                        <span>Want to use current location? </span>
                        <label>
                            <input type="radio" name="useCurrentLocation" value="yes" checked={useCurrentLocation === true} onChange={() => setUseCurrentLocation(true)} />
                            Yes
                        </label>
                        <label>
                            <input type="radio" name="useCurrentLocation" value="no" checked={useCurrentLocation === false} onChange={() => setUseCurrentLocation(false)} />
                            No
                        </label>
                    </div>

                    <br />
                    <div id="map-newplan" ref={mapRef} style={{ height: '40vh' }}></div>
                    
                    <p>Describe the plan:</p>
                    <div className="plan-inputdiv">
                        <textarea id="description" className="plan-input" cols="30" rows="8" value={desc} placeholder='Describe your plan' onChange={(event) => setDescription(event.target.value)} required />
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