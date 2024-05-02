import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useGetConversations from '../../hooks/useGetConversations';
import useConversation from '../../zustand/useConversation';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { conversations } = useGetConversations()
  const { setSelectedConversation } = useConversation()

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(search)
    if(!search) return
    if(search.length < 3) return toast.error("Search term must be at least 3 characters long");

    const conversation = conversations.filter(c => c.fullName.toLowerCase().includes(search.toLowerCase()))
    if(conversation.length) setSelectedConversation(conversation[0])
    else toast.error("No such found")
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder='search...' className='input input-bordered rounded-full' 
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
    </form>
  )
}

export default SearchInput