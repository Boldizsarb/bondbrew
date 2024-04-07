import React,  { useState } from 'react'
import BurgerMenu from '../../components/burgerMenu/burgerMenu';
import './feedback.css';
import emailjs from '@emailjs/browser';
import {useDispatch, useSelector } from "react-redux";


const Feedback = () => {

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { user } = useSelector((state) => state.authReducer.authData); // user data 
    const [message, setMessage] = useState(false); 
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [isVisible3, setIsVisible3] = useState(false);

    const submitFeedback = (e) => {
        e.preventDefault();

        const templateParams = {
            from_name: user.firstname,
            message: feedbackMessage,
        };
        const serviceId = "service_kxee12b"
        const templateId = "template_i86x8j5"
        const publicKey = "rWV4eQeStfJzDN0Ve"
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then((result) => {
               // console.log(result.text); 
                setMessage(true); 
            }, (error) => {
                console.log(error.text); // Handle error case
            });
    };

    const toggleDiv = () => {
        setIsVisible(!isVisible);
      };
    const toggleDiv2 = () => {
    setIsVisible2(!isVisible2);
    };
    const toggleDiv3 = () => {
    setIsVisible3(!isVisible3);
    };

    const handleswagger = () => {
        window.open('http://localhost:5000/api-docs/', '_blank');
    }

    console.log(user.isAdmin)


    return (
        <div>
           <div id='burger-menu-onpage' style={{paddingBottom:"1vh"}}>
            
                <BurgerMenu  />
            </div>

            <h1 className='h1-feedback'>Feedback / FAQ</h1>

            <div className={`toggle-div`}>

                <h3 className='h3-feedback-list' onClick={toggleDiv}>What is Bond Brew</h3>

                <div className={`div-content-p ${isVisible ? 'show' : ''}`}>
                    <p className='toggle-p-list'>Bond Brew is an experimental application designed to help users combat loneliness. This is a viable minimal product and not a production-ready application.</p>
                    <p className='toggle-p-list'>It contains familiar social media elements but omits features that often serve as catalysts for arguments or friction, such as comments.</p>
                    <p className='toggle-p-list'>The emphasis lies in the core functions, which altogether are absent in any existing application.</p>
                    

                </div> 

                <h3 className='h3-feedback-list' onClick={toggleDiv2}>GDPR</h3>

                <div className={`div-content-p ${isVisible2 ? 'show' : ''}`} style={{paddingBottom:"2vh"}}>
                    <h4>User Consent and Rights:</h4>
                    <lo>
                        <li className='toggle-p-list'>
                        User Consent: Straightforward mechanisms for obtaining user consent for data processing are implemented, ensuring users are fully informed in clear and accessible language.
                        </li>
                        <li className='toggle-p-list' > Access, Rectification, and Erasure: Users have the right to access, rectify, or erase their personal data at any time, allowing them to maintain control over their information.</li>
                        <li className='toggle-p-list'>Data Portability and Object: The platform facilitates the right to data portability, enabling users to obtain and reuse their personal data across different services. Additionally, users can object to processing based on legitimate interests or direct marketing.</li>
                    </lo>
                    <h4>Data Protection Measures:</h4>
                    <lo>
                        <li className='toggle-p-list'>Data Minimization: The principle of data minimization is adhered to, collecting only what is necessary for the intended purposes.</li>
                        <li className='toggle-p-list'>Security Measures: Sufficient pseudonymization and encryption technologies are employed to protect user data. </li>
                    </lo>
                    <h4>Transparency and Accountability:</h4>
                    <lo>
                        <li className='toggle-p-list'>Privacy Policy: A comprehensive privacy policy transparently outlines data collection, processing practices, and users' rights.</li>
                        <li className='toggle-p-list'>Processing Records: Detailed records of data processing activities are maintained, reflecting commitment to transparency and accountability.</li>
                    </lo>
                    <h4>Technical and Organizational Measures:</h4>
                    <lo>
                        <li className='toggle-p-list'>Access Controls: Access to personal data is strictly limited to authorized personnel, ensuring user information is protected from unauthorized access.</li>
                        <li className='toggle-p-list'>Privacy by Design: The platform is built to ensure privacy by design and by default, with high privacy settings automatically enabled for all users.</li>
                    </lo>
                    <h4>Awaraness:</h4>
                    <lo>
                        <li className='toggle-p-list'>Continuous Improvement: Regular training on data protection and privacy is provided, ensuring practices remain at the forefront of regulatory compliance and user safety.</li>
                    </lo>


                </div>

                <h3 className='h3-feedback-list' onClick={toggleDiv3}>Development</h3>

                <div className={`div-content-p ${isVisible3 ? 'show' : ''}`} style={{paddingBottom:"2vh"}}>
                    <h4>Testing: </h4>
                    {user.isAdmin ? (
                        <lo>
                            <li  className='toggle-p-list'> API Endpoint testing and documentation
                            <span onClick={handleswagger} style={{cursor:"pointer"}}> CLICK ME!</span></li>
                        </lo>
                    ) : (
                        <p>This section is for Admins only</p>
                    )}
                    <h4>Security:</h4>


                </div>

            </div>

           
 
            <div className='feedback-form'>
            {message ? ( // Check if feedbackMessage is not empty
                <h3 style={{textAlign:"center"}}>Thank you for your Feedback!</h3>
            ) : (

                <form className='infoForm authForm' >
                    <h3>Please Send your Feedback</h3>
                    <label >Dear {user.firstname} provide as many information as you can!We are committed to continuously improving our services. For that, your opinion matters!</label>
                    <textarea type="text"  className="infoInput feedbackInput" 
                    required placeholder='Enter your feedback here'   rows="2" 
                    value={feedbackMessage} onChange={(e)=> setFeedbackMessage(e.target.value)}/>

                    <button type='submit' className='button infoButton' onClick={submitFeedback}>Send</button>
                </form>

            )}
            </div>
        </div>
    )
}

export default Feedback

