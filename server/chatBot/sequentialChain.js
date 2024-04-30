import { config } from "dotenv";
config();

import {PromptTemplate} from "@langchain/core/prompts"
import {SimpleSequentialChain,LLMChain} from "langchain/chains"
import { OpenAI } from "@langchain/openai"; 

const llm = new OpenAI({ temperature: 0 });

const responseTemplate1 = `


text: {input}
`;

const responseTemplate2 = `


text: {input}
`;

const reviewPromptTemplate1 = new PromptTemplate({
  template: responseTemplate1,
  inputVariables: ["input"],
});

const reviewPromptTemplate2 = new PromptTemplate({
  template: responseTemplate2,
  inputVariables: ["input"],
});

const reviewChain1 = new LLMChain({ llm, prompt: reviewPromptTemplate1 });
const reviewChain2 = new LLMChain({ llm, prompt: reviewPromptTemplate2 });

const overallChain = new SimpleSequentialChain({
  chains: [reviewChain1, reviewChain2],
  verbose: true,
});

const result = await overallChain.run({
  input: "I ordered Pizza Salami and it was awful!",
});

console.log(result);