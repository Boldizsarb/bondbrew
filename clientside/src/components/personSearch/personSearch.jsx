import React from "react";
import Logo from "../../img/logo2.png"
import "./personSearch.css";
import {UilSearch} from '@iconscout/react-unicons';


const PersonSearch = () => {
    return (
        <div className="personSearch">
                <img id="logo" src={Logo} alt="The custom logo"/>
                <div className="Search">
                    <input type="text" placeholder="Search" />
                    <div className="searchIcon">
                        <UilSearch />

                    </div>
                    
                </div>
        </div>
    );
};

export default PersonSearch;