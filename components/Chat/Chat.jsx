import React from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'

const Chat = (props) => {

  return (props.self == "true") ? (
    <div className='flex justify-between gap-2 text-sm items-center '>
      <div></div>
      <div className='flex gap-1 items-center bg-blue-400 ps-3 rounded-b-full rounded-l-full'>
        <div className='py-1 max-w-60'>{props.message}</div>
        <Avatar className="scale-50">
          <AvatarFallback>{props.firstLetters.slice(0,2)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  ) : (
    <div className='flex justify-start gap-2 text-sm items-center '>
      <div className='flex gap-1 items-center bg-green-400 pe-3 rounded-b-full rounded-r-full'>
        <Avatar className="scale-50">
          <AvatarFallback>{props.firstLetters.slice(0,2)}</AvatarFallback>
        </Avatar>
        <div className='py-1 max-w-60'>{props.message}</div>
      </div>
      <div></div>
    </div>
  )
}

export default Chat