'use client';
import { useLocalStorage } from '@/components/hooks/useLocalStorage';
import { useState } from 'react';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import React from 'react';
import { ChatHeader } from './chat-header';
import ChatMessages from './chat-message';
import ChatTypeBox from './chat-typebox';


export interface Message {
  id: number;
  name: string;
  url: string;
  seen: boolean;
  lastMessage: string;
}
export interface MessageBox extends Message {
  isOpen: boolean;
}


export const Chat = ( ) =>{

  return(
    <div className='w-full h-full '>
      <div className="relative h-full">
        <div className=" h-full " tabIndex={-1}>
          <div className="flex h-full  w-full  flex-col rounded-t-lg bg-messenger-card-bg text-[0.9375rem] leading-[1.3333] shadow-lg">
            {/* info recieved person */}
            <ChatHeader  />

            {/* chat container  */}
            <div className="relative flex min-h-0 max-w-full grow flex-col ">
              {/* messages */}
              <ChatMessages />
              {/* type message */}
              <ChatTypeBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

