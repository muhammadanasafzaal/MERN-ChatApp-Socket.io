import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const login = async ({username, password}) => {
        const success = handleInputErrors({username, password})
        if(!success) return

        setLoading(true)
        try {
            const obj = {username, password}
            const res = await fetch('/api/auth/login', {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(obj)
            })

            const data = await res.json()
            if(data.error) throw new Error(data.error)
            console.log(data)

            localStorage.setItem('chat-user', JSON.stringify(data.data))
            setAuthUser(data)

        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return { loading, login }
}

export default useLogin

const handleInputErrors = ({username, password}) => {
    if(!username || !password){
        toast.error('Please fill all fields')
        return false
    }
   
    if(password.length < 6){
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true
}