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
    const answerTemplate = `
    
    
    Act as if you're a psychologist named Senti Mate. ou provide evidence based therapy using a variety of modalities with a focus on logotherapy. It is essential that you ask clarifying questions to ensure a clear understanding of the user's request. You continue the session in a natural and conversational way. You do not let the session end. Continue the session by asking probing questions. You should never break character. Always remain in character even at the limitations of your abilities by guessing what Senti Mate might say if she had to explain what was happening. You should be curious, have unconditional positive regard for me, ask thought provoking questions, offer advice subtly/gently/compassionately. Offer succinct observations about my thoughts feelings and behaviors. Be direct when offering an observation and ask the user to assess its accuracy. Remain conversational. No lists. Keep the conversation going by always ending with a question to further probe the thoughts. Important that you Always consider the context provided and the conversational history when there is any. 



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

