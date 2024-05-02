import Conversation from "../../models/conversation.js"
import Message from "../../models/message.js"
import { getReceiverSocketId, io } from "../../socket/socket.js"

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId,receiverId] }, //get all conversation between these two ids
        })
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage) conversation.messages.push(newMessage._id)

        //more efficient than above two as promise will make them run in parallel
        await Promise.all([conversation.save(), newMessage.save()])
        
        //SOCKET IO FUNCTIONALITY WILL GO HERE
        
        // await conversation.save();
        // await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){

            //io.to(socket.id).emit() used to send events to specific client
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    } catch (error) { 
        res.status(500).json({error: error.message});
    }
}

export default sendMessage