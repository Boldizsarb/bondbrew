import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";

/// splitting the text to chunks 
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
   


}catch(error){
    console.error(error);
}


