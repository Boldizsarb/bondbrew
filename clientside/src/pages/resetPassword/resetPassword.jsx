import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Logo from "../../img/logo1.png";
import "./resetPassword.css";


const resetUrl = process.env.REACT_APP_AXIOS_BASE_URL;



const ResetPassword = () => {

    const { id, token } = useParams();
    //console.log(id);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [validPassword, setValidPassword] = useState(true); // last version of the password
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/; // Password must contain at least one uppercase letter, one lowercase letter, and one number, with minimum length of 6 characters
        return regex.test(password);
    };
    

    useEffect(() => { 
        fetch(`${resetUrl}userser/resetpassword/${id}/${token}`) // verify the url with token
            .then(response => {
                //console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to reset password');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
                setMessage("Verrification succesful!");
            })
            .catch(error => {
                setMessage("Error resetting password: " + error.message);
            });
    }, [id, token]);

    useEffect(() => { // Check if passwords match and are valid
        setPasswordMatch(newPassword === confirmPassword);
        setValidPassword(validatePassword(newPassword));
    }, [newPassword, confirmPassword]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMatch && validPassword) {
            try {
                const response = await fetch(`${resetUrl}userser/updatepassword/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: id, password: newPassword })
                });
                if (!response.ok) {
                    throw new Error('Failed to update password');
                }
                setMessage('Password updated successfully');
                setNewPassword(''); 
                setConfirmPassword('');
                alert('Password updated successfully. You will be redirected to the login page');
                navigate('/auth');
                
            } catch (error) {
                setMessage('Error updating password: ' + error.message);
            }
        }
    }



    


    return (
         
        <div  className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" id="welcomeLogo" />
                <div className="Webname">
                    <h1>Bond Brew</h1>
                    <h6>Blend In, Bond Out, Brewing Friendships, One Click at a Time </h6>
                </div>
            </div>
            <div className="a-right">




                <form   className="authForm infoForm1">
                    <h3>Reset Password</h3>
                    <span>{message}</span>
                    {userData && (
                        
                    <div className='stach-up'>
                        
                        <p>Dear {userData.firstname} Please create your new passphrase. </p>
                        
                        <input  className="infoInput infoInput1" placeholder='Insert new Passphrase' name='password'  value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}/>
                        
                        <input  className="infoInput infoInput1" placeholder='Confirm new Passphrase'name='password' value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}/>
                        
                            {!passwordMatch && <span style={{color:"red"}}>Passwords do not match!</span>}
                            {!validPassword && 
                            <p style={{color:"red"}}>Password must contain at least one uppercase letter,<br/> 
                            one lowercase letter, and one number</p>}
                        
                        {passwordMatch && validPassword && <button className='button infoButton' onClick={handleSubmit}>Update</button>}
                        {/* Display other user details as needed */}
                        
                    </div>
                )}
                </form>
            </div>
           
        </div>
    )

}

export default ResetPassword;