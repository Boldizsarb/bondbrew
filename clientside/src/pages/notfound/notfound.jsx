// pages/notFound/NotFound.js
import React from 'react';
import Home from "../../img/home.png";
import { Link } from 'react-router-dom';



function NotFound() {

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 Page not found!</h1>
      <h3>Oops! Looks like this link is a loner. Don't worry, you're not. Let's find our way back together.</h3>

      <Link to="/home">
        <img src= {Home} alt="Home icon" />
      </Link>
    </div>
  );
}

export default NotFound;
