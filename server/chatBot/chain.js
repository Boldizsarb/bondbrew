//import {Configuration, OpenAIApi} from "openai"; 
import {config} from "dotenv";
//import { OpenAI } from "langchain/llms/openai"; 
//import { OpenAI } from "@langchain/openai"
import { OpenAI } from "@langchain/openai"; 
//import {PromptTemplate} from "langchain/prompts"
import {PromptTemplate} from "@langchain/core/prompts"
import {LLMChain} from "langchain/chains"

config();

const apiKey = process.env.REACT_APP_CHAT_BOT;


 


//const model = new OpenAI({ temperature: 0.5 });
const model = new OpenAI({
    apiKey: apiKey
   });
 

const template = "Be very caring and loving answering the question\n: {question}";
const prompt = new PromptTemplate({template, inputVariables: ["question"]});

const chain = new LLMChain({llm:model, prompt});

// const result = await chain.call({question: "I am lonely"});
// console.log(result);

async function getResponse() {
    try {
        const result = await chain.call({ question: "I am lonely" });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getResponse(); // Call the function


// cmd command on server: 
// node chatBot/chain.js