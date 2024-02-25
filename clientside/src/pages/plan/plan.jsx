import React, { useEffect, useRef, useState } from "react";
import NavIcons from '../../components/rightSide/navicons'
import "./plan.css"
import PersonSearch from '../../components/personSearch/personSearch'
import {  useSelector } from "react-redux";
import AllPlans from "../../components/planComponents/allPlans";
import PlanBox from "../../components/planComponents/planBox";
import Plus from "../../img/plus.png";







const Plan = () => {

    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const {user} = useSelector((state) => state.authReducer.authData);
    const [Plans, setPlans] = useState([]) // array of all plans
    const [currentPlan, setCurrentPlan] = useState(null) // the current plan
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [allPlans, setAllPlans] = useState([]); // filtered plans
    const [isSpinning, setIsSpinning] = useState(false); //  animation for the spinner

    const [isShowingMyPlans, setIsShowingMyPlans] = useState(false);


    const getPlans = useEffect(() => {
        const getPlans = async () => {
            try {
                const response = await fetch(`${getUserUrl}plan/`);
                if (!response.ok) {
                    throw new Error("Error getting plans");
                }
                const data = await response.json();
                setAllPlans(data);
                setPlans(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getPlans(); // gets called when the page is loaded
    }, [refreshTrigger]);

    //console.log(currentPlan);
 

    const updateCurrentPlan = () => {
        if (!currentPlan) return; // Check if there's a current plan selected
        const updatedPlan = Plans.find(plan => plan._id === currentPlan._id);
        if (updatedPlan) {
          setCurrentPlan(updatedPlan);
        }
      };

    const handlemyplans = () => {
        const myPlans = allPlans.filter(plan => plan.userId === user._id);
        setPlans(myPlans);
        setIsShowingMyPlans(true);
     
    }

    const handleShowAllPlans = () => {
        setPlans(allPlans); // Reset the Plans state to show all plans
        setIsShowingMyPlans(false);
    };
    const handleaddnew = () => {
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1000); 
        setCurrentPlan(null);

    };

    const resetCurrentPlan = () => {
        setCurrentPlan(null);
    };



    return (
        <div className="Chat">
        {/** LEFT SIDE  */}
        <div className="Left-side-chat">
                <PersonSearch />
            <div className="Chat-container">    
                <div className="plus-icon-container">
                    <img src={Plus} style={{maxWidth:"4vh"}} alt="Plus icon" onClick={handleaddnew} className={isSpinning ? 'spin-animation' : ''}/>
                </div>

                    {/* <img src={Plus} style={{maxWidth:"2vh"}} alt="Plus icon"/> */}


                    <span onClick={isShowingMyPlans ? handleShowAllPlans : handlemyplans} className="plans-subtitle">
                        {isShowingMyPlans ? "All Plans" : "My Plans"}
                    </span>
                    <h2  className="plans-title">
                        {isShowingMyPlans ? "My Plans" : "Plans"}
                    </h2>
                {/* <span onClick={handlemyplans} className="plans-subtitle">My plans</span>
                <h2 onClick={handleShowAllPlans} className="plans-title">Plans</h2> */}

                <div className="Chat-list">
                {Plans.map((plan) => (
                    <div onClick={()=>setCurrentPlan(plan)}  >
                        <AllPlans data={plan} currentUserId = {user._id} setCurrentPlan={setCurrentPlan} />
                    </div>
                ))}
                    
                </div>
            </div>

        </div>
        {/** RIGHT SIDE  */}
        <div className="Right-side-chat">
            <div style={{width: "20rem", alignSelf: "flex-end"}}>
                <NavIcons />
            </div>
                {/**Chat body */}
            <PlanBox data={currentPlan} currentUserId = {user._id} 
            onbuttonclick={() => setRefreshTrigger(prev => prev + 1)}  
            refreshingplan={updateCurrentPlan}
            resetCurrentPlan={resetCurrentPlan}
            />    
            
        </div>
    </div>
    )
}


export default Plan

