
import { generateResponse } from "../chatBot/mainChat.js";
// import bodyParser from "body-parser";


export const chatBot = async (req, res) => {
  try {
    const { question, conversationHistory } = req.body;
    
    const response = await generateResponse(question, conversationHistory);
    console.log(conversationHistory)

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
}