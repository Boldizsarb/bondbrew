import ChatModel from "../Models/chatModel.js";


export const createChat = async (req, res) => {
    const newChat = new ChatModel({

      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  export const userChats = async (req, res) => {
    try {
      const chat = await ChatModel.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  // export const findChat = async (req, res) => {
  //   try {
      
  //     const chat = await ChatModel.findOne({
  //       members: { $all: [req.params.firstId, req.params.secondId] },
  //     });
  //     res.status(200).json(chat)
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // };
  
  export const findChat = async (req, res) => {
    try {
      // Constructing a query that checks for an exact match of the members array
      const chat = await ChatModel.findOne({
        members: {
          $size: 2, // Ensures the array contains exactly 2 elements
          $all: [req.params.firstId, req.params.secondId], // Ensures all specified elements are in the array
        },
      });
  
      // If a chat is found with exactly these two members, return it
      if (chat) {
        res.status(200).json(chat);
      } else {
        // If no chat is found with exactly these two members, return an error
        res.status(404).json({ message: "Chat not found with the exact members." });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

  export const findChatById = async (req, res) => {
    try {
      const chat = await ChatModel.findById(req.params.id);
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  }; 


  export const deleteChat = async (req, res) => {

    const id = req.body.id; 

    try {
      const deletedChat = await ChatModel.findOneAndDelete({ _id: id });

      // If no document is found and deleted, send a 404 Not Found response
      if (!deletedChat) {
        return res.status(404).json({ message: "Chat is not found" }); // Corrected error message
      }
  
      // If a chat is successfully deleted, send a confirmation message
      res.status(200).json({ message: 'Chat deleted successfully' }); // Corrected success message
    } catch (error) {
      // Send the actual error message from the catch block
      res.status(500).json({ message: error.message });
    }
  };