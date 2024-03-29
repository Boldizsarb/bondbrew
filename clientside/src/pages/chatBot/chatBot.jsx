import React,  {useEffect, useState } from 'react'
import BurgerMenu from '../../components/burgerMenu/burgerMenu';
import {useDispatch, useSelector } from "react-redux";
import  './chatBot.css';






//import { OpenAI } from 'openai';



const ChatBot = () => {

    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [conversationHistory, setConversationHistory] = useState([]);
    //const [conversationHistory, setConversationHistory] = useState('');
    const [aiResponse, setAiResponse] = useState([]);
    const [humanMessage, setHumanMessage] = useState([]);

   const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
   
  };
 
   
    const handlechat = async () => {

      //setConversationHistory((currentHistory) => [...currentHistory, `Human:${input}`]); // this was working just slow

      // const updatedConversationHistory = [...conversationHistory, `Human: ${input}`];
      // setConversationHistory(updatedConversationHistory);
      //const updatedConversationHistory = [...conversationHistory, `Human: ${input}`];
      const newHumanMessage = `Human: ${input}`;
      let updatedConversationHistory = [...conversationHistory, newHumanMessage];

      setHumanMessage(newHumanMessage);
        // const newMessage = `Human: ${input}`;
        // const updatedConversationHistory = [...conversationHistory, newMessage];


         //let updatedConversationHistory = conversationHistory + newMessage;
        

        try {
          const conversationHistoryList = updatedConversationHistory.join("\n"); // need to turn into a string othervise the bot wont be able to read it 

            const response = await fetch(`${getUserUrl}chatbot`, {
                method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ question: input, conversationHistory: conversationHistoryList}),
            });
            
            const responseData = await response.json()

             const aiResponse = responseData

            //console.log(aiResponse);

           // updatedConversationHistory += aiResponse;

            // setConversationHistory(updatedConversationHistory);
            //  setConversationHistory([...updatedConversationHistory, `AI: ${aiResponse}`]);


               //console.log(responseData);
               console.log(conversationHistory)

              setAiResponse(aiResponse);
               updatedConversationHistory = [...updatedConversationHistory, `AI: ${aiResponse}`];

               // Update the conversation history state
               setConversationHistory(updatedConversationHistory);
               //setConversationHistory(currentHistory => [...currentHistory, `Human: ${input};\n`, `AI: ${aiResponse};\n`]);

            setResponse(responseData);
            setInput('');

          } catch (error) {
            console.error('Chat error:', error);
            setResponse('Sorry, there was an error processing your request.');
          }
        };


console.log(conversationHistory);





    return (
        <div>
            <div id='burger-menu-onpage'style={{paddingBottom:"1vh"}}>
                <BurgerMenu  />
            </div>


            <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '20px' }}>SentiMate</h1>
          

            {/* {response && <p>Response: {response}</p>} */}


            <div className="conversation12">
              {conversationHistory.map((msg, index) => (
                  <div key={index} className={`chat-bubble ${msg.startsWith('Human:') ? 'human' : 'ai'}`}>
                      <p>{msg.substring(msg.indexOf(':') + 2)}</p>
                  </div>
              ))}
          </div>

          <div className="input-container">
            <input type="text" onChange={handleInput}  value={input}/>
            <button className='button ' onClick={handlechat}>Send</button>
          </div>

        </div>
    )
}



export default ChatBot;