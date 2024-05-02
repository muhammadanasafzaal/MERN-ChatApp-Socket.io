import Conversation from "../../models/conversation.js"

const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const senderId = req.user._id

        let conversations = await Conversation.findOne({
            participants: { $all: [senderId,userToChatId] }, //get all conversation between these two ids
        }).populate("messages")

        if(!conversations) return res.status(200).json([]);

        res.status(200).json(conversations.messages);
    } catch (error) { 
        res.status(500).json({error: error.message});
    }
}

export default getMessages