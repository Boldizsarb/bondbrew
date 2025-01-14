import { config } from "dotenv";
config();

import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { RetrievalQAChain, loadQAStuffChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai"; 

const embeddings = new OpenAIEmbeddings();
const vectorStore = await FaissStore.load("./", embeddings);

const model = new OpenAI({ temperature: 0 });

const chain = new RetrievalQAChain({
  combineDocumentsChain: loadQAStuffChain(model),
  retriever: vectorStore.asRetriever(),
  returnSourceDocuments: true,
});

const res = await chain.call({
  query: "When does the restaurant open on friday?",
});
console.log(res.text);