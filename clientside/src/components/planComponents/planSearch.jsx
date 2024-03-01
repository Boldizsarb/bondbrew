import React, { useState } from "react";
import {  useMantineTheme } from "@mantine/core";
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from "react-router-dom";
import "./planSearch.css";

const PlanSearch = ({plan, onPlanSelect, location}) => {

    const navigate = useNavigate();

   // console.log(location)

    const handleCurrentPlan = () => {
        if (location === "trend") {
            navigate(`/plan`, { state: { plan: plan } }); // Sending plan data to /plan route
        } else {
            onPlanSelect(plan); // Notify the parent component about the selection
        }
    };

    return (
        <div>
            <div className="trendPlanContaiener">
                <span className="trendTitle" onClick={handleCurrentPlan} >{plan.title}</span><br />                <span className="trendCity">{plan.city}</span>
                <hr
                    style={{ width: "95%",border: "0.1px solid #ececec", marginTop: "20px",}}
                />
          </div>
           
        </div>
    )
}


export default PlanSearch

