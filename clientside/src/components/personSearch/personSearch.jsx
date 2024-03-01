import React, { useState, useEffect } from 'react';
import Logo from "../../img/logo2.png"
import "./personSearch.css";
import {UilSearch} from '@iconscout/react-unicons';
import SearchModal from './personSearchModal';
import User from '../user/user';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import PlanSearchModal from '../planComponents/planSearchModal';


const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;


const PersonSearch = ({location,onPlanSelect}) => {


    const [modalOpened, setModalOpened] = useState(false);
    const [search, setSearch] = useState(''); // input value
    const [people, setPeople] = useState([]); // response from the server
    const { user } = useSelector((state) => state.authReducer.authData);
    const [plans, setPlans] = useState([]); // array of all plans

    const [modalOpened2, setModalOpened2] = useState(false); // paln search modal
    //console.log(search);

    const openModal = () => {
        setModalOpened(true);
    };

    const getUser = async (search) => {
        try {
          const res = await fetch(`${getUserUrl}userser/name/${search}`);
          if(!res.ok){
                //console.log("No user found");
                //return null;
                return [];
            }
          const data = await res.json();
          //console.log(data);
          return data;
        } catch (error) {
          console.log(error.message);
        }
    };

    const getPlans = async (search) => {
        try {
            const response = await fetch(`${getUserUrl}plan/title/${search}`);
            if (!response.ok) {
                return [];
            }
            const data = await response.json();
            //console.log(data);
            return data;
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSearch = async () => {
        if(location === "plans"){
            const data1 = await getPlans(search);
            if(data1){
                setPlans(data1);
                //console.log('About to open modal with plans:',plans);
                setModalOpened2(true);
                
            }
        }else{
             //console.log(search);
        const data = await getUser(search);
            if (data) {
                //console.log(data);
                setPeople(data); // Update the state with fetched data
                openModal(); // Optionally open the modal after search
            }
        }
       
    };


    const [selectedPlan, setSelectedPlan] = useState(null); // passing the selected plan to from the modal
    
    const onPlanSelected = (plan) => {
        onPlanSelect(plan); //  callback passed from Plan
        //setSelectedPlan(plan);
       // console.log('Plan selected:', plan);
        
    };


    


    return (
        <div className="personSearch">
                <Link to={"../home"}>
                <img id="logo" src={Logo} alt="The custom logo"/>
                </Link>
                <div className="Search">
                    <input type="text" placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                    <div className="searchIcon button" onClick={handleSearch} >
                        <UilSearch  />

                    </div>
                   

                    
                </div>
                <SearchModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                people={people} // passing people to the modal
                />
                <PlanSearchModal 
                modalOpened2={modalOpened2}
                setModalOpened2={setModalOpened2}
                plans={plans} onPlanSelected={onPlanSelected}
                />
                
                
               
        </div>
    );
};

export default PersonSearch;


