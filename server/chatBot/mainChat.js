import { config } from "dotenv";
import {PromptTemplate} from "@langchain/core/prompts"
import { OpenAI } from "@langchain/openai"; 
import { StringOutputParser } from "@langchain/core/output_parsers";
import { retriever } from "./vectorRetrieval.js";
import { combineDocuments } from "./toString.js";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables"
import { formatConvHistory } from "./formatHistory.js";

config();


const openaiKey = process.env.OPENAI_API_KEY;

export async function generateResponse(question, conversationHistory){

    const model = new OpenAI({
        apiKey: openaiKey,
        temperature: 0.5
    });
    const standaloneQuestionTemplate = "Given some conversastion history (if any) and a quesstion, convert it to a standalone question. conversation history: {conv_history} question: {question} ";

    const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate)

    // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN //
    const answerTemplate = `You are a helpful psichologist with 20 years of experience who is speaking to a person
    who is probably lonely, You are very caring and loving. You are trying to help the person feel better. Try to answer based on the context provided and on the conversational history if possible.
    If you can not answer or help the person, you can refer them to a professional.
    conversation history:{conv_history}
    context:{context}
    question:{question}`;

    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate)

    // punctuation template for the text that is retrieved
    const punctuationTemplate = `Add punctuation to the text\n: {text}`;
    const punctuationPrompt = PromptTemplate.fromTemplate(punctuationTemplate);

    const grammarTemplate = `Correct the grammar of the text\n: {text}`;   
    const grammarPrompt = PromptTemplate.fromTemplate(grammarTemplate);


    const punctuationChain = RunnableSequence.from([punctuationPrompt, model, new StringOutputParser()])// storing sequence of operations in a chain
    const grammarChain = RunnableSequence.from([grammarPrompt, model, new StringOutputParser()])
    // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN // PUNCTUATION CHAIN //

    const standaloneQuestionChain = standaloneQuestionPrompt.pipe(model).pipe(new StringOutputParser())

    const retrieverChain = RunnableSequence.from([
        prevResult => prevResult. standalone_question, // retrieving the standalone question from the previous chain
        retriever,
        combineDocuments // joins it into a single string
    ])
    const answerChain = answerPrompt.pipe(model).pipe(new StringOutputParser())

    const chain = RunnableSequence.from([ // the chain of operations

        // { text: punctuationChain } , // punctuationChain,
        // grammarChain,
        {
            standalone_question: standaloneQuestionChain, // standalone question chain
            original_input: new RunnablePassthrough()
        },
        {
            context: retrieverChain,
            question: ({original_input}) => original_input.question,
            conv_history: ({original_input}) => original_input.conv_history
        },
    answerChain
    ])

   


    const response = await chain.invoke({ // question and the history coming from the converfsation
        question: question,
        //conversationHistory: formatConvHistory(conversationHistory) // formatted conversation histrory
        conv_history: conversationHistory

        })



    return response;

    console.log(response);

}


///prevResult => console.log(prevResult), // can print the result of the previous operation even withing the chain!!

