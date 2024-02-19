import React, { useState, useEffect } from 'react';
import Logo from "../../img/logo2.png"
import "./personSearch.css";
import {UilSearch} from '@iconscout/react-unicons';
import SearchModal from './personSearchModal';
import User from '../user/user';
import { useSelector } from "react-redux";

const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;


const PersonSearch = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [search, setSearch] = useState(''); // input value
    const [people, setPeople] = useState([]); // response from the server
    const { user } = useSelector((state) => state.authReducer.authData);
    //console.log(search);

    const openModal = () => {
        setModalOpened(true);
    };

    const getUser = async (search) => {
        try {
          const res = await fetch(`${getUserUrl}userser/name/${search}`);
          const data = await res.json();
          //console.log(data);
          return data;
        } catch (error) {
          console.log(error.message);
        }
    };

    const handleSearch = async () => {
    //console.log(search);
    const data = await getUser(search);
    if (data) {
        setPeople(data); // Update the state with fetched data
        openModal(); // Optionally open the modal after search
    }
    };


    return (
        <div className="personSearch">
                <img id="logo" src={Logo} alt="The custom logo"/>
                <div className="Search">
                    <input type="text" placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                    <div className="searchIcon" onClick={handleSearch} >
                        <UilSearch  />

                    </div>
                   
                    
                </div>
                <SearchModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                people={people} // passing people to the modal
        />
        </div>
    );
};

export default PersonSearch;


