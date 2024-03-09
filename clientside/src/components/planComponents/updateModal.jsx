import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState, useEffect, useRef  } from "react";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function PlanUpdateModal({ modalOpened1, setModalOpened1, id, userId, refresh}) {
   
 const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
  const theme = useMantineTheme();

  // variables using state instead of formdata to make the warning appear
  const [title , setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [city, setCity] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState("");
  const [finalLat, setFinalLat] = useState(null); // not used
  const [finalLng, setFinalLng] = useState(null); // not used
  const [message, setMessage] = useState("");
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);



  useEffect(() => { // fetching the plan data 
    const fetchData = async () => {
      try {
        const response = await fetch(`${getUserUrl}plan/${id}`);
        const jsonData = await response.json();
        //console.log(jsonData);
        setData(jsonData);
        setTitle(jsonData.title);
        setDesc(jsonData.desc);
        setCity(jsonData.city);
        setFrom(jsonData.from);
        setTo(jsonData.to);
        setFinalLat(jsonData.lat); // to not be null
        setFinalLng(jsonData.lng);
        //console.log(title,desc,city,from,to);
      } catch (error) {
        console.error("Failed to fetch plan data:", error);
      }
    };
    fetchData();
  }, [id]); 




  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || title.length <= 3 || !desc || desc.length <= 3 || !city || city.length <= 3 ) {
        setMessage("Please fill in all the fields with more than 3 characters");
        return;
      }
    const updatedPlan = async () => {
        try {
          
            const response = await fetch(`${getUserUrl}plan/${id}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({userId, title, desc, city, from, to, lat: finalLat, lng: finalLng}),
            });
            if (!response.ok) {
                throw new Error("Failed to update the plan");
            }
            const data = await response.json();
            //console.log(data);
            setModalOpened1(false);
            refresh() // needs within try
            } catch (error) {
                console.error("Failed to update the plan:", error);
            }
    };
    updatedPlan();
  
    setModalOpened1(false);
  };

  ///// MAP   ///// MAP   ///// MAP   ///// MAP   ///// MAP   ///// MAP   ///// MAP  

  useEffect(() => {
    //console.log(data.lat)
    if (!modalOpened1 || !mapRef.current) return;


    const updateMapLocation =   () => {
      let map = mapRef.current.leafletMap;

      if (!map) {
        map = L.map(mapRef.current).setView([data.lat, data.lng], 13);
        mapRef.current.leafletMap = map;
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
      } else {
        map.setView([data.lat, data.lng], 13);
      }
      map.invalidateSize();

      let DefaultIcon = L.icon({
          iconUrl: icon,
          shadowUrl: iconShadow,
          iconAnchor: [12, 41]
      });

      if (!markerRef.current) { // initial marker of the location
        markerRef.current = L.marker([data.lat, data.lng], { icon: DefaultIcon }).addTo(map)
          .bindPopup('Initial location').openPopup();
      } else {
        // Update marker position if it already exists
        markerRef.current.setLatLng([data.lat, data.lng]).update();
      }

  
      map.off('click');
      map.on('click', function(mapEvent) {
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }
        markerRef.current = L.marker([mapEvent.latlng.lat, mapEvent.latlng.lng], {icon: DefaultIcon}).addTo(map)
            .bindPopup('New location').openPopup();
            setFinalLat(mapEvent.latlng.lat);
            setFinalLng(mapEvent.latlng.lng);
      });
    }

  updateMapLocation();
 
  },[ useCurrentLocation]);



 useEffect(() => { // reseting the map 
    if(modalOpened1 === false) {
      setUseCurrentLocation(false);
    }
 }, [modalOpened1]);

 //console.log(finalLat, finalLng)



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
      opened={modalOpened1}
      onClose={() => setModalOpened1(false)}
    >

    
      <form className="infoForm">
      <h2 id="updatingPlan">Updating the plan</h2>
        <div>
          <label htmlFor="title">Title</label>
          <input
          className="infoInput"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">Location</label>
          <input
          className="infoInput"
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
            <span>Would you like to specify location? </span>
            <label>
                <input type="radio" name="useCurrentLocation" value="yes" checked={useCurrentLocation === true} onChange={() => setUseCurrentLocation(true)} />
                Yes
            </label>
            <label>
                <input type="radio" name="useCurrentLocation" value="no" checked={useCurrentLocation === false} onChange={() => setUseCurrentLocation(false)} />
                No
            </label>
        </div>

        {useCurrentLocation && (
          <div id="map-updateplan" ref={mapRef} style={{ height: '30vh', visibility: useCurrentLocation ? 'visible' : 'hidden'  }}></div>
        )}
        <div>
          <label htmlFor="description">Description</label>
          <textarea
          className="infoInput"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="from">From</label>
          <input
          className="infoInput"
            type="date"
            name="from"
            value={from }
            onChange={(e) => setFrom(e.target.value)}
          />
          <label htmlFor="to">To</label>
          <input
          className="infoInput"
            type="date"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

        </div>
        <span style={{color:"red" }}>{message}</span>

        <button onClick={handleSubmit} className="button infoButton" type="submit">Update</button>
      </form>
    </Modal>
  );
}


export default PlanUpdateModal;