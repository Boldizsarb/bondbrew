import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState, useEffect } from "react";

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
  const [message, setMessage] = useState("");



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
                body: JSON.stringify({userId, title, desc, city, from, to }),
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