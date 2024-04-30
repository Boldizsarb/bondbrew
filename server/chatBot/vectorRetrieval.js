import { config } from "dotenv";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {PromptTemplate} from "@langchain/core/prompts"
import { OpenAI } from "@langchain/openai"; 
import {SupabaseVectorStore} from "@langchain/community/vectorstores/supabase";
import {createClient} from "@supabase/supabase-js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { OpenAIEmbeddings } from "@langchain/openai";
//import { StructuredOutputParser } from "langchain/output_parsers";
config();

// Retrieve the most similar vector in the vector store!!!!!!!!!!!

const supabaseUrl = "https://kohefmrczpmtewsxuwue.supabase.co"
const supKey = process.env.SUPABASE_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;
const client = createClient(supabaseUrl, supKey);  // supabase url and key

const model = new OpenAI({
    apiKey: openaiKey,
    temperature: 0.5
});

const embeddings = new OpenAIEmbeddings({apiKey: openaiKey});

const vectorStore = new SupabaseVectorStore(embeddings, {
    client,
    tableName: "documents",
    queryName: "match_documents"
})

const retriever = vectorStore.asRetriever(); // goes to the vector store and retrieves the most similar document


export {retriever}; 