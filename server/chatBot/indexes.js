import { TextLoader } from "langchain/document_loaders/fs/text";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { config } from "dotenv";
config();

const loader = new TextLoader("data.txt");

const docs = await loader.load();

const splitter = new CharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 50,
});

const documents = await splitter.splitDocuments(docs);
console.log(documents);

const embeddings = new OpenAIEmbeddings();

const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
await vectorstore.save("./");