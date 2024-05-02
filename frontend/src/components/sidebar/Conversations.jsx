import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'
import { getRandomEmoji } from '../../utils/emojis'

const Conversations = () => {
    const { loading, conversations } = useGetConversations()

  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {
            (conversations && conversations.length) ? conversations.map((item, idx) => {
                return <Conversation conversation={item} key={item._id} emoji={getRandomEmoji()} lastIdx={idx == conversations.length-1} />
            })
            :""
        }

        { loading ? <span className='loading loading-spinner'></span> : "" }
    </div>
  )
}

export default Conversations