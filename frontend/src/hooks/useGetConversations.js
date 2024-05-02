import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState(null)

    const getConversations = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/user/')

            const data = await res.json()
            if(data.error) throw new Error(data.error)
            console.log(data)

            setConversations(data)
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getConversations()    
    }, [])
    
    return { loading, conversations }
}

export default useGetConversations
