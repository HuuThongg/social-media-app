import React from 'react'
import { PaperPlaneIcon } from '@radix-ui/react-icons'
export default function MessagesPage () {
  return (
    <div className='max-w-full flex flex-col shrink  grow min-w-0 items-center justify-center'>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <div>
          <PaperPlaneIcon className='w-10 h-10 stroke-white '/>
        </div>
        <span className='text-primary-text text-xl font-medium font-sans'>No chats selected</span>        
      </div>
    </div>
  )
}

