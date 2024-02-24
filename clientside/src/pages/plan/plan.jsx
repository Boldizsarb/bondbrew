import React, { useEffect, useRef, useState } from "react";
import NavIcons from '../../components/rightSide/navicons'
import "./plan.css"
import PersonSearch from '../../components/personSearch/personSearch'
import {  useSelector } from "react-redux";
import AllPlans from "../../components/planComponents/allPlans";
import PlanBox from "../../components/planComponents/planBox";





const Plan = () => {

    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const {user} = useSelector((state) => state.authReducer.authData);
    const [Plans, setPlans] = useState([]) // array of all plans
    const [currentPlan, setCurrentPlan] = useState(null) // the current plan

    const getPlans = useEffect(() => {
        const getPlans = async () => {
            try {
                const response = await fetch(`${getUserUrl}plan/`);
                if (!response.ok) {
                    throw new Error("Error getting plans");
                }
                const data = await response.json();
                setPlans(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getPlans(); // gets called when the page is loaded
    }, []);

    //console.log(Plans);

  








    return (
        <div className="Chat">
        {/** LEFT SIDE  */}
        <div className="Left-side-chat">
                <PersonSearch />
            <div className="Chat-container">    
                <h2>Plans</h2>
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
            <PlanBox data={currentPlan} currentUserId = {user._id} />    
            
        </div>
    </div>
    )
}


export default Plan

