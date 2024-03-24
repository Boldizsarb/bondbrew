import {Configuration, OpenAIApi} from "openai"; 
import OpenAI from 'openai';


// import {config} from "dotenv";

// config();

   

// const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_CHAT_BOT,
// });

// const openai = new OpenAIApi(configuration);



 // const openai = new OpenAI({ // connecting to the LLM modell
    //     apiKey: chat_bot_api,
    //     dangerouslyAllowBrowser: true // overriding the user agent
    // });


const openai = new OpenAI({
    apiKey: process.env.REACT_APP_CHAT_BOT,
    dangerouslyAllowBrowser: true
  });

export async function chat(input) {
    const messages = [
        { role: 'user', content: input }];
        
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
        tempreture: 0.5
    });

    return response.data.choices[0].message.content;
}






// const question = "What is the capital of Germany?"

// chat(question).then((response) => {
//     console.log(response);
// });








