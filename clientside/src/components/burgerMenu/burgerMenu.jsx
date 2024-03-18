import React, { useEffect, useState,  useRef  } from "react";
import "./burgerMenu.css";
import { Link } from "react-router-dom";
import Home from "../../img/home.png";
import Matching from "../../img/matching.png";
import Comment from "../../img/chat.png";
import Plan from "../../img/plan.png";
import InterestModal from "../interestsModal/interestsModal";
import SetLocation from "../setLocation/setLocationModal";
import SetRadius from "../interestsModal/radiousModal";





const BurgerMenu = ({location,userid,setCharacterRefresh,setRadiusModal}) => {


    const [isOpen, setIsOpen] = useState(false); // menu options visible
    const [matchingStuff, setMatchingStuff] = useState(false);  // matching stuff visible
    const checkboxRef = useRef(null);
    const [interestsModal, setInterestsModal] = useState(false); // modal for interests
    const [locationModal, setLocationModal] = useState(false); // modal for location
    //const [radiusModal, setRadiusModal] = useState(false); // modal for radius
    

    const handleCheckboxChange = () => { // menu options visible 
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    useEffect(() => { // checks the location
        if(location === "matching") {
            setMatchingStuff(true);
        } else {
            setMatchingStuff(false);
        }
    }, [location]);


   const handleInterestClick = () => {
        checkboxRef.current.checked = false; // closes the menu
        setIsOpen(false);
        setInterestsModal(true);
        // open modal
    }   
    const handleLocationClick = () => { // open location modal
        checkboxRef.current.checked = false; 
        setIsOpen(false);
        setLocationModal(true);
    }
    const handleRadiousClick = () => {
        checkboxRef.current.checked = false;
        setIsOpen(false);
        setRadiusModal(true);
    }



    return (
        <div className="menu-container">


            <label className="label1" for="check"  onChange={handleCheckboxChange} checked={isOpen}  >

                <input type="checkbox" id="check" ref={checkboxRef}/> 
                <span></span>
                <span></span>
                <span></span>
            </label>

            <div className={`menu-options ${isOpen ? 'open' : ''}`}> {/* menu options */ }
                
                <Link to={"../home"}>
                    <div className="link-container">
                        <h1 style={{textDecoration:"none"}} className="h1-link" >Home</h1>
                        <img className="img-link-burger" src={Home} alt="" />
                    </div>
                </Link>

                <Link to={"../plan"}>
                    <div className="link-container">
                        <h1 className="h1-link" >Plans</h1>
                        <img className="img-link-burger" src={Plan} alt="" />
                    </div>
                </Link>

                <Link to={"../matching"}>
                    <div className="link-container">
                        <h1 className="h1-link">Matching</h1>
                        <img className="img-link-burger" src={Matching} alt="" />
                    </div>
                </Link>

                <Link to={"../chat"}>
                    <div className="link-container">
                        <h1 className="h1-link">Chat</h1>
                        <img className="img-link-burger" src={Comment} alt="" />
                    </div>
                </Link>
                <hr style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}/>

                {matchingStuff && (
                <div className="matching-stuff">

                    
                    <h3 style={{cursor:"pointer"}} onClick={handleInterestClick}> Set Interests</h3>
                    <InterestModal interestsModal={interestsModal} setInterestsModal={setInterestsModal} userid={userid} setCharacterRefresh={setCharacterRefresh}/>

                    <h3 style={{cursor:"pointer"}} onClick={handleLocationClick}> Set Location</h3>
                    <SetLocation locationModal={locationModal} setLocationModal={setLocationModal} userid={userid} />

                    <h3 style={{cursor:"pointer"}} onClick={handleRadiousClick}>Set Radius</h3>
                   


                </div>
               )}
                

            </div>

        

        </div>
    )

}

export default BurgerMenu;

