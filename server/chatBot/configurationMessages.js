//import {Configuration, OpenAIApi} from "openai"; 
import {config} from "dotenv";
import OpenAI from "openai";

config();


const apiKey = process.env.REACT_APP_CHAT_BOT;

const openai = new OpenAI({
   apiKey: apiKey
  });

  async function chat(input) {
    const messages = [{ role: 'user', content: input }];
  
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0.5
      });
      return response.choices[0].message;
    } catch (error) {
      console.error('Chat error:', error);
      return "An error occurred while processing your request."; // A more graceful error message
    }
  }
  
  const question = "I am lonely";

  const template = `Be verry caring and loving answering the question: {question}`

  const prompt = template.replace("{question}", question);
  
  chat(question)
    .then((response) => console.log(response))
    .catch((error) => console.error('Chat error:', error));


