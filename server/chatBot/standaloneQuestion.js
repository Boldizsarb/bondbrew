import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import {createClient} from "@supabase/supabase-js"
import {SupabaseVectorStore} from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {PromptTemplate} from "@langchain/core/prompts"
import { OpenAI } from "@langchain/openai"; 
config();

// need to extract the semantic meaning of the user's input
    
const supabaseUrl = "https://kohefmrczpmtewsxuwue.supabase.co"
const supKey = process.env.SUPABASE_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

const model = new OpenAI({
    apiKey: openaiKey,
    temperature: 0.5
   });
 

const template = "Be very caring and loving answering the question\n: {question}";
// the template could includel multiple variables like {anotherquestion} etc

// const prompt = PromptTemplate.fromTemplate(template); // example
// const chatChain = prompt.pipe(model);
// const response = await chatChain.invoke({ question: "I am lonely"})
// console.log(response);

const standaloneQuestionTemplate = "Given a quesstion, convert it to a standalone question\n: {question}";

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

const standaloneQuestionChain = standaloneQuestionPrompt.pipe(model);

const response = await standaloneQuestionChain.invoke({
     question: "I am lonely and I need a friend, I often have a panic attacks, my anxiety is through the roof and I am feeling very depressed. I am not sure what to do. Can you help me?" 
    })

console.log(response);

