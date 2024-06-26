import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"

export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        if(authUser) {
            const socket = io("http://localhost:5000",{
                query:{
                    userId: authUser._id,
                    username: authUser.username
                }
            })
            setSocket(socket)
            
            //socket.on is used to listen to events. can be used both on client and server side
            socket.on("getOnlineUsers", (users)=> {
                console.log(users)
                setOnlineUsers(users)
            })
            return () => socket.close() //for better performance it closes socket connection when component is unmounted
        }
        else {
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])
    
    return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider> 
}