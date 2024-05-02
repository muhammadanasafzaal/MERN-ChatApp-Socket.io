import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);

    const { messages, setMessages, selectedConversation } = useConversation()

    const getMessages = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/messages/'+selectedConversation._id)

            const data = await res.json()
            if(data.error) throw new Error(data.error)
            console.log(data)

            setMessages(null)
            setMessages(data)
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(selectedConversation?._id) getMessages()    
    }, [selectedConversation?._id, setMessages]) 
    
    return { loading, messages }
}

export default useGetMessages
