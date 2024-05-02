import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from '../skeletons/MessageSkeletons'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {
  const { messages, loading } = useGetMessages()
  useListenMessages()
  const lastMessageRef = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior:"smooth" })
    }, 100);
  }, [messages])
  
  return (
    <div className='px-4 flex-1 overflow-auto'>
      { 
        (!loading && messages.length) ? messages.map(item => {
          return <div ref={lastMessageRef} key={item._id}>
            <Message message={item} />
          </div> 
        }) 
        : 
        ""
      }

      { (loading && messages.length) && [...Array(3)].map((item,idx) => <MessageSkeleton key={idx}/> ) }
      { (!loading && !messages.length) && <span className='text-white'>Send a message to start conversation</span> }
    </div>
  )
}

export default Messages