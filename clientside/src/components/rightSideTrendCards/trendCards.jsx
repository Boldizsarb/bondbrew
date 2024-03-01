import React,  {useEffect, useState } from 'react'
import './trendCard.css'
import PlanSearch from '../planComponents/planSearch'




const TrendCard = () => {

  const [plans, setPlans] = useState([]) // array of all plans
  const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;

  const getPlans = useEffect(() => {
    const getPlans = async () => {
      try {
        const response = await fetch(`${getUserUrl}plan/limited/`);
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getPlans(); // gets called when the page is loaded
}, []);



  return (
    <div className="TrendCard">
            <h3>Plans you might like:</h3>
            {plans.map((plan, index)=>{
                return(
                    <div className="trend">
                        <PlanSearch key={index} plan={plan} location={"trend"}  />

                    </div>
                )
            })}

    </div>
  )
}

export default TrendCard