import React, { useEffect, useRef, useState } from "react";
import NavIcons from '../../components/rightSide/navicons'
import "./plan.css"
import PersonSearch from '../../components/personSearch/personSearch'
import {  useDispatch, useSelector } from "react-redux";
import AllPlans from "../../components/planComponents/allPlans";
import PlanBox from "../../components/planComponents/planBox";
import Plus from "../../img/plus.png";
import { useLocation } from "react-router-dom";






const Plan = () => {

    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const {user} = useSelector((state) => state.authReducer.authData);
    const [Plans, setPlans] = useState([]) // array of all plans
    const [currentPlan, setCurrentPlan] = useState(null) // the current plan
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [allPlans, setAllPlans] = useState([]); // filtered plans
    const [isSpinning, setIsSpinning] = useState(false); //  animation for the spinner

    const [isShowingMyPlans, setIsShowingMyPlans] = useState(false);
    const [currentPlanId, setCurrentPlanId] = useState("");
    const [selectedPlan, setSelectedPlan] = useState(null); // callback to update selectedPlan
    //console.log(currentPlanId);
    const location = useLocation();
    const { plan } = location.state || {}; // A

    useEffect(() => {
        if (plan) {
          setCurrentPlan(plan);
        }
      }, [plan])
   
    

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
 
    useEffect(() => { // updating the current plan

        if (currentPlanId) {
            const updatedPlan = Plans.find(plan => plan._id === currentPlanId);
            if (updatedPlan) {
                setCurrentPlan(updatedPlan);
            }
    }
}, [ Plans, refreshTrigger]);

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

    
    // Callback  to update selectedPlan
    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setCurrentPlan(plan);
        
    };



    return (
        <div className="Chat">
        {/** LEFT SIDE  */}
        <div className="Left-side-chat">
                <PersonSearch location={"plans"} onPlanSelect={handlePlanSelect} />
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
                      <div onClick={() => {setCurrentPlan(plan); setCurrentPlanId(plan._id);}}>
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
            // refreshingplan={updateCurrentPlan}
            resetCurrentPlan={resetCurrentPlan}
            />    
            
        </div>
    </div>
    )
}


export default Plan


{/* <div onClick={() => {setCurrentPlan(plan); setCurrentPlanId(plan._id);}}>
                        <AllPlans data={plan} currentUserId = {user._id} setCurrentPlan={setCurrentPlan} />
                    </div> */}