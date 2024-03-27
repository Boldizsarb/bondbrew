import React,  {useEffect, useState } from 'react'
import BurgerMenu from '../../components/burgerMenu/burgerMenu';
import {useDispatch, useSelector } from "react-redux";




//import { OpenAI } from 'openai';



const ChatBot = () => {

    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);

 
   
    const handlechat = async () => {

        //input.push(conversationHistory)
        const newMessage = `Human: ${input}`;
        const updatedConversationHistory = [...conversationHistory, newMessage];
        

        try {

            const response = await fetch(`${getUserUrl}chatbot`, {
                method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ question: input, conversationHistory: conversationHistory}),
            });
            
            const responseData = await response.json();

             const aiResponse = responseData

            console.log(aiResponse);
            setConversationHistory([...updatedConversationHistory, `AI: ${aiResponse}`]);
               //console.log(responseData);

            setResponse(responseData);

          } catch (error) {
            console.error('Chat error:', error);
            setResponse('Sorry, there was an error processing your request.');
          }
        };

console.log(conversationHistory);





    return (
        <div>
            <div id='burger-menu-onpage'>
                <BurgerMenu  />
            </div>


            <h1>ChatBot</h1>
            <input type="text" onChange={(e) => setInput(e.target.value)} />
            <button onClick={handlechat}>Send</button>

            {response && <p>Response: {response}</p>}
        </div>
    )
}



export default ChatBot;