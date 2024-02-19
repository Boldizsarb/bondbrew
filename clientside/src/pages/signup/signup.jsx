import React, { useState, useEffect } from "react";
import "./signup.css";
import Logo from "../../img/logo1.png";
import { useDispatch, useSelector } from "react-redux"; // instance of the hook 
import { Provider } from 'react-redux';
import { signUp, logIn, resetAuthError } from "../../actions/signupAction"; // importing the action
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Auth = () => {

  const [isSignup, setIsSignup] = useState(false); // if this is false the login page gets rendered

   //////////////////// redux part ///////////////////////
  const dispatch = useDispatch(); // dispatching the action// hook

  //const loading = useSelector((state) => state.authReducer.loading); // getting the loading state from the store, turning the button to loading state
  const { loading, error } = useSelector((state) => state.authReducer);
  //console.log(loading);
  //////////////////// redux part ///////////////////////

  const [data, setData] = useState({username:"", firstname: "", lastname: "", password:"", confirmpass:""}); // initial state of the data

  const handleChange = (e) => { // pupulating the data with the new value
    setData({...data, [e.target.name]: e.target.value}); // set the data to the new value
    
  }

  const [ confirmPass,setConfirmPass] = useState(true); // by default we dont want to see errors
  const [loginError, setLoginError] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);

  // password: 
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // Password must contain at least one uppercase letter, one lowercase letter, and one number, with minimum length of 6 characters
    return regex.test(password);
  }


  useEffect(() => { // error handling
    // Reset login error when switching between login and signup
    setLoginError('');
  }, [isSignup]);

  useEffect(() => {// error handling
    // Listen to error state changes to set a custom login error message
    if (error && !isSignup) {
      setLoginError(error);
    }
  }, [error, isSignup]);

  useEffect(() => { // when changing from login to signup we want to reset the error
    dispatch(resetAuthError());
}, [isSignup, dispatch]);



  /////////////////// redux part ///////////////////////
   // Form Submission
   const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      const isPasswordValid = validatePassword(data.password);
      setPasswordValid(isPasswordValid);
      if (data.password === data.confirmpass && isPasswordValid) {
        dispatch(signUp(data));
        setConfirmPass(true);
      } else {
        setConfirmPass(data.password === data.confirmpass);
        setConfirmPass(false);
        // Reset login error when handling signup
        setLoginError('');
      }
    } else {
      dispatch(logIn(data));
    }
  };
  /////////////////// redux part ///////////////////////


  const resetForm = () => {  // upon login it wont give the do not mathc password error
    setConfirmPass(true);
    setPasswordValid(true);
    setData({username:"", firstname: "", lastname: "", password:"", confirmpass:""});
  }
 

  return (
    <div className="Auth">
      {/*this is the left side of the login / signup page*/ }
      <div className="a-left">
        <img src={Logo} alt="" id="welcomeLogo" />
        <div className="Webname">
          <h1>Bond Brew</h1>
          <h6>Blend In, Bond Out, Brewing Friendships, One Click at a Time </h6>
        </div>
      </div>
      {/*this is the right side of the login / signup page*/}
      <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{isSignup ? "Brew an Account" : "Login"}</h3>

        {/* Only display that at signup not at login */}
        {isSignup && (  
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange = {handleChange}
                value={data.firstname}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange = {handleChange}
                value={data.lastname}
              />
            </div>
          )}

        <div>
          <input
            type="text" // email type will need to be
            className="infoInput"
            name="username"
            placeholder="Email Address"
            onChange = {handleChange}
            value={data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange = {handleChange}
          />
          
          {/*only  show it at signup */}
          {isSignup && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange = {handleChange}
              />
            )}
        </div> {/**if pasword do not match */}
        <span style={{display: confirmPass? "none":"block", color: "red", alignself: "flex-end", marginRight:"5px"}}>
          * The password do not match
        </span>
        <span style={{display: passwordValid ? "none" : "block", color: "red"}}>
            * Password must contain at least one uppercase letter, <br/> one lowercase letter, and one number, with a minimum length of 6 characters
          </span>
        {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
        <div>  {/* onclick the previous value will be set*/}
            <span className="instruction" style={{fontSize: '15px',cursor:"pointer"}} onClick={()=>{setIsSignup((prev)=>!prev); resetForm()}}  >
              {isSignup ? "Already have an account? Blend in!": "Do not have an account yet? Brew one!"}</span>
              
        </div >   
        {error && isSignup && <div style={{ color: 'red' }}>{error}</div>}
          <div style={{maxHeight: "0.3vh"}}>
              <Link to="/forgotPassword" style={{textDecoration:"none"}}>
                {!isSignup && 
                <span className="forgotP" style={{marginRight: '10vh',fontSize: '12px',cursor:"pointer"}}>Forgot Password</span>}
              </Link>

          </div>                       {/*if loading is true the button wont be clickable */}
        <button className="button infoButton" type="submit" disabled={loading} >
            {loading? "Loading..." : isSignup ? "Sginup" : "Login"}
          </button>
      </form>
    </div>

      
    </div>
  );
};




export default Auth;