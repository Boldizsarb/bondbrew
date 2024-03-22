import { config } from "dotenv";
config();

import { StructuredOutputParser } from "langchain/output_parsers";
import {PromptTemplate} from "@langchain/core/prompts"
import { OpenAI } from "@langchain/openai"; 

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: "answer to the user's question",
});
const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template:
    "Be very funny when answering questions\n{format_instructions}\n Question: {question}",
  inputVariables: ["question"],
  partialVariables: { format_instructions: formatInstructions },
});

const model = new OpenAI({ temperature: 0 });

const input = await prompt.format({
  question: "What is the capital of France?",
});
console.log(input);

const response = await model.call(input);

console.log(response);

console.log(await parser.parse(response));