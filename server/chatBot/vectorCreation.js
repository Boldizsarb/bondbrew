import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import {createClient} from "@supabase/supabase-js"
import {SupabaseVectorStore} from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { config } from "dotenv";
config();


/// splitting the text to chunks and storing in vector store (supabase)
try{

    const loader = new TextLoader("data.txt");

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({ 
        chunkSize: 500,
        separators: ["\n\n", "\n","." ],
        chunkOverlap: 50, // 10% overlap 
    });

    const output = await splitter.splitDocuments(docs);
    console.log(output);

    //const supabaseUrl = process.env.SUPABASE_URL;
    
    const supabaseUrl = "https://kohefmrczpmtewsxuwue.supabase.co"
    const supKey = process.env.SUPABASE_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const client = createClient(supabaseUrl, supKey);  // supabase url and key
    //await SupabaseVectorStore.fromDocuments(client, output, new OpenAIEmbeddings(openaiKey), "vectorstore");
    await SupabaseVectorStore.fromDocuments( output,
         new OpenAIEmbeddings({openaiKey}), {
            client,
            tableName: "documents",
         })
   


}catch(error){
    console.error(error);
}

///// IMPORTANT!!  just run the file and it populates the vector database 

