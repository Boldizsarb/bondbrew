import React, { useState, useEffect, useRef  } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getUserLocation } from "../../middlewares/geoLocation.js";
import {useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction.js";







function SetLocation ({locationModal, setLocationModal,userid}){

    const theme = useMantineTheme();
    const mapRef = useRef(null);
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const [useCurrentLocation, setUseCurrentLocation] = useState(false); // permission
    const [finalLocation, setFinalLocation] = useState({ lat: 50.92608620744581, lng: -1.4339711201693437});
    const [city, setCity] = useState(''); // city name
    const [message, setMessage] = useState(''); // message

    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch();

    const handleCityChange = (event) => {
        setCity(event.target.value); // Update the city state with the new value
    };

    // const handlesubmission = async () => { // fetching but it is slow

    //     if(city === '') {
    //         setMessage('Please enter a city');
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${getUserUrl}userser/locationupdate`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ _id: userid, livesin: city }), 
    //         });
    //         if (!response.ok) {
    //             throw new Error(response.statusText)
    //         }
    //        alert('Location updated');
    //        setLocationModal(false);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }
    
    
    const handlesubmission = () => { // redux is instant 
        if (city === '') {
            setMessage('Please enter a city');
            return;
        }

        // Prepare the formData for location update
        const formData = {
            livesin: city
        };

        // Dispatch the updateUser action with the userid and formData
        dispatch(updateUser(userid, formData))
            .then(() => {
                alert('Location updated successfully');
                setLocationModal(false); // Close the modal after successful update
            })
            .catch((error) => {
                console.error('Error updating location:', error.message);
                setMessage('Failed to update location. Please try again.');
            });
    };






    return (

        <Modal
            overlayColor={
                theme.colorScheme === "dark"
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
                }
                overlayOpacity={0.55}
                overlayBlur={3}
                size="55%"
                opened={locationModal}
                onClose={() => setLocationModal(false)}
        > 
            <div>
                <h3 style={{color:"red"}}>{message}</h3>
                <h2>Your location</h2>
                <div >
                    <input style={{width:"80%"}} className="infoInput" type="text" placeholder={user.livesin} onChange={handleCityChange}/>
                    
                </div>
                <button className="button infoButton" onClick={handlesubmission}>Submit</button>
                
                
            </div>


        </Modal>
    
    )
}

export default SetLocation;