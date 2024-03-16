import { Modal, useMantineTheme } from "@mantine/core";
import React, { useState, useEffect, useRef  } from "react";
import interests from "../../data/interests.json";
import "./interestModal.css";
import {useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/userAction.js";


function InterestModal({ interestsModal, setInterestsModal,userid, setCharacterRefresh }) {

    const theme = useMantineTheme();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const { hobbies } = interests;
    const [ message, setMessage ] = useState(''); 
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const dispatch = useDispatch();

  // need to retrive the users interests from the database
  useEffect(() => {
    const getInterests = async () => {
      try {
        const response = await fetch(`${getUserUrl}userser/interests`, {
          method: 'POST', // or 'PUT' if that's what your backend expects for this operation
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: userid }),
        });
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json();
        setSelectedInterests(data.interests);
      } catch (error) {
        console.log(error.message);
      }
    }
    getInterests();
  }, [userid]);





    const toggleInterestSelection = (interest) => { // toggle th interest items
        setSelectedInterests((prevSelectedInterests) =>
          prevSelectedInterests.includes(interest)
            ? prevSelectedInterests.filter((i) => i !== interest)
            : [...prevSelectedInterests, interest]
        );
      };


      const removeInterest = (index) => { // removing the item from the list 
        setSelectedInterests((prevInterests) => {
            const updatedInterests = [...prevInterests];
            updatedInterests.splice(index, 1);
            return updatedInterests;
        });
    };

 

  const handleSubmittion = () => { // redux updating the interests
    if (selectedInterests.length < 2) {
        setMessage('You need to select at least two interests');
    } else if (selectedInterests.length > 5) {
        setMessage('You can only select a maximum of five interests');
    } else {
        setMessage('');
        // form data for the update including only the updated attributes
        const formData = {
            interests: selectedInterests,
        };
        dispatch(updateUser(userid, formData))
            .then(() => {
                alert('Interests updated successfully');
                setInterestsModal(false); 
                setCharacterRefresh((prev) => prev + 1) // callback to refresh the characters
            })
            .catch((error) => {
                console.error('Error updating interests:', error.message);
                setMessage('Failed to update interests. Please try again.');
            });
    }
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
          opened={interestsModal}
          onClose={() => setInterestsModal(false)}
        > 
        <div>
          <h3 style={{color:"red"}}>{message}</h3>
          <p>It is essential to select at least two and a maximum of five most common interests for the algorithm to function properly.</p>
            <h3>You picked:</h3>
            {selectedInterests.length === 0 ? (
                <p>Nothing So far!</p>
                ) : (
                selectedInterests.map((interest, index) => (
                <p key={index}> 
                {interest}
                 <button className="removeButton" onClick={() => removeInterest(index)}>x</button> 
                 </p>
            ))
            )}
        </div>
        <div>
            <button className="button infoButton" onClick={handleSubmittion} style={{marginTop: "20px"}}>Submit</button>
        </div>

        <hr style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}/>


         <div>
        <h3>Select Your Interests</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', overflow: 'visible' }}>

        {hobbies.map((interest, index) => (
            <button
            className={`interest-button ${selectedInterests.includes(interest) ? 'clicked' : ''}`}
              key={index}
              variant={selectedInterests.includes(interest) ? 'filled' : 'outline'}
              onClick={() => toggleInterestSelection(interest)}
              style={{
                flexGrow: 1,
                padding: '10px',
                margin: '5px',
                height: 'auto',
                overflow: 'hidden',
                whiteSpace: 'normal',
                alignItems: 'center',
                justifyContent: 'left',
                fontSize: '1rem',
                lineHeight: '1.5',
                color: selectedInterests.includes(interest) ? 'var(--buttonHover)' : 'white',
                border: selectedInterests.includes(interest) ? '2px solid var(--buttonHover)' : 'none',
                background: selectedInterests.includes(interest) ? 'transparent' : 'var(--buttonBg)',
              }}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>






        </Modal>

    )
}


export default InterestModal;



 //   const handleSubmittion = () => { // submit the interests with fetch


  //       if(selectedInterests.length < 2) {
  //           setMessage('You need to select at least two interests');
  //       } else if(selectedInterests.length > 5) {
  //           setMessage('You can only select a maximum of five interests');
  //       } else {
  //           setMessage('');
            
  //           const updateInterests = async () => {
  //             try {
  //               const response = await fetch(`${getUserUrl}userser/interestupdate`, {
  //                 method: 'PUT', 
  //                 headers: {
  //                   'Content-Type': 'application/json',
  //                 },
  //                 body: JSON.stringify({ _id: userid, interests: selectedInterests }),
  //               });
  
  //               if (!response.ok) {
  //                 throw new Error('Failed to update interests');
  //               }
                
  //               const data = await response.json();
  //               console.log(data);
  //               setMessage('Interests updated successfully');
  //               setInterestsModal(false);
  //             } catch (error) {
  //               console.error(error.message);
  //               setMessage('An error occurred');
  //             }
  //         };
  
  //          updateInterests();
  //     }
  // }