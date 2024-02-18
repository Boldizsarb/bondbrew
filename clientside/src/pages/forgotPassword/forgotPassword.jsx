
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';



const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;


const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [linkToBeSent, setLinkToBeSent] = useState('');
    const [firstName, setFirstName] = useState(''); 


    const handleSubmit = async (e) => {
        e.preventDefault(); 
   
        try{
            const responseExist = await fetch(`${getUserUrl}userser/username/${email}`);
            //console.log(responseExist);
            if (!responseExist.ok) {
                setMessage('Email not found');
                return;
            }
            const responseBody = await responseExist.json();
            const firstName = responseBody.firstname;
           // console.log(firstName);
            setFirstName(firstName);
            //setMessage('Verrification email sent to your email address. Please check your email!');
            //const link = await fetch(`${getUserUrl}userser/username/${email}`)
            const link = await fetch(`${getUserUrl}userser/username/${email}`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' // Set content type
                },
                body: JSON.stringify({ email }) // Send email data in the request body
            }).then(response => {
                if (!response.ok) {
                    setMessage('Email not found');
                }
                setMessage(`Dear ${firstName} the Verrification email sent to your email address. Please check your email!`);
                return response.json();
            }).then(data => {
                //console.log(data.link);
                setLinkToBeSent(data.link);
                
            }).catch(error => {
                console.log(error);
            });
           
        }catch(error){
            console.log(error);
        }
     
    }


    useEffect(() => { // if there is a link then it will be sent to the user

        if(linkToBeSent){
            //console.log(linkToBeSent);
           // console.log(email);

            const templateParams = { // email form
                to_name: firstName,
                user_email: email,
                message: linkToBeSent,
            }
            // emmail.js variables
            const serviceId = "service_kxee12b"
            const templateId = "template_752db1n"
            const publicKey = "rWV4eQeStfJzDN0Ve"
            emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((result) => {
               // console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });         
        }   
        
    }, [linkToBeSent]);


    return (
         <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        required
                         type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                    />
                </div>
                <p style={{color:"red"}}>{message}</p>
               
                {linkToBeSent === '' && <button className= "button" type="submit">Submit</button>} {/**becomes invisible once the email is sent */}
            </form>
        </div>
    )
}

export default ForgotPassword;