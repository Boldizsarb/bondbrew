import { Modal, useMantineTheme, Button } from "@mantine/core";
import React, { useState, useEffect, useRef  } from "react";
import interests from "../../data/interests.json";
import "./interestModal.css";


function InterestModal({ interestsModal, setInterestsModal,userid }) {

    const theme = useMantineTheme();
    const [selectedInterests, setSelectedInterests] = useState([]);
    const { hobbies } = interests;


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

    const handleSubmittion = () => { // submit the interests
        console.log(selectedInterests);

        //setInterestsModal(false);
    }
    

    



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
            <Button onClick={handleSubmittion} style={{marginTop: "20px"}}>Submit</Button>
        </div>

        <hr style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}/>


         <div>
        <h3>Select Your Interests</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', overflow: 'visible' }}>

        {hobbies.map((interest, index) => (
            <Button
            className={`interest-button ${selectedInterests.includes(interest) ? 'clicked' : ''}`}
              key={index}
              variant={selectedInterests.includes(interest) ? 'filled' : 'outline'}
              onClick={() => toggleInterestSelection(interest)}
              style={{
                flexGrow: 1,
                flexBasis: 'calc(50% - 10px)', // Adjust this to control initial size
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
            </Button>
          ))}
        </div>
      </div>






        </Modal>

    )
}


export default InterestModal;