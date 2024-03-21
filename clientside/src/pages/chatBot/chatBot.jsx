import React,  {useEffect, useState } from 'react'
import BurgerMenu from '../../components/burgerMenu/burgerMenu';
import {useDispatch, useSelector } from "react-redux";
import {chat} from "./configureMassages";


//import { OpenAI } from 'openai';



const ChatBot = () => {

    const chat_bot_api = process.env.REACT_APP_CHAT_BOT;
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    // const openai = new OpenAI({ // connecting to the LLM modell
    //     apiKey: chat_bot_api,
    //     dangerouslyAllowBrowser: true // overriding the user agent
    // });


    // const chatbot = async () => {
    //     const response = await openai.chat({
    //         messages: [
    //             // { role: 'system', content: 'You are a helpful assistant.' },
    //             { role: 'user', content: input }
    //         ]
    //     });

    //     console.log(response.data);
    // }

    const handlechat = async () => {
        try {
            const chatResponse = await chat(input);
            setResponse(chatResponse);
          } catch (error) {
            console.error('Chat error:', error);
            setResponse('Sorry, there was an error processing your request.');
          }
        };






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