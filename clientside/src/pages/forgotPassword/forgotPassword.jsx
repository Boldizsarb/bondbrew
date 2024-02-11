import React, { useState } from 'react';





const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Here you can use the email and firstName values as needed
        console.log("Email:", email);
        console.log("First Name:", firstName);
     
    }




    return (
         <div>
            <h1>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
                    />
                </div>
                <div>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        placeholder="Enter your first name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)} // Update firstName state on input change
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword;