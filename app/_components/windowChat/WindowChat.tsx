'use client';
import clsx from 'clsx';
import {

  PencilSquareIcon,
  XMarkIcon,
  MinusIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';

import Image from 'next/image';
import React, { useEffect, useId, useState } from 'react';
import { useLocalStorage } from '@/components/hooks/useLocalStorage';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import BoxMessage from './BoxMessage';

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
const WindowChat = () => {
  const [messageField, setMessageField] = useLocalStorage<MessageBox[]>(
    'messageIds',
    [],
  );
  const size = useWindowSize();
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isShownChatBoxOptions, setIsShownChatBoxOptions] = useState(false);
  const onChangeInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setIsTyping(inputValue.length > 0);
    setText(inputValue);
  };

  let activeMessageField = messageField
    .filter((message) => message.isOpen === true)
    .reverse();
  const nonActiveMessageField = messageField
    .filter((message) => message.isOpen === false)
    .reverse();
  let activeMessageFieldLength = activeMessageField.length;

  // let shouldAdjustMessageBoxLength = size?.width < stackSize
  let maxMessages = 0;
  if (size.width) {
    maxMessages = size.width < 1100 ? 1 : size.width < 1530 ? 2 : 3; // set the maximum number of messages based on the condition
  }
  useEffect(() => {
    if (activeMessageFieldLength > maxMessages) {
      // check if the number of messages exceeds the maximum
      const updatedMessageField = [...messageField];
      const lastActiveMessageIndex = updatedMessageField.findIndex(
        (message) => message.isOpen === true,
      );
      if (lastActiveMessageIndex !== -1) {
        updatedMessageField[lastActiveMessageIndex].isOpen = false;
        setMessageField(updatedMessageField);
      }
    }
  }, [messageField, maxMessages, setMessageField, activeMessageFieldLength]);

  const handleMinimizeMessageBox = (id: number) => {
    const updatedMessageField = messageField.map((message) => {
      if (message.id === id) {
        return { ...message, isOpen: false };
      }
      return message;
    });
    setMessageField(updatedMessageField);
  };
  const handleCloseMessageBox = (id: number) => {
    const updatedMessageField = messageField.filter(
      (message) => message.id !== id,
    );
    setMessageField(updatedMessageField);
  };
  const handleOpenMessageBox = (id: number) => {
    const updatedMessageField = messageField.map((message) => {
      if (message.id === id) {
        return { ...message, isOpen: true };
      }
      return message;
    });
    setMessageField(updatedMessageField);
  };
  const closeAllChats = () => {
    setMessageField([]);
  };
  const minimizeAllChats = () => {
    const updatedMessageField = messageField.map((message) => {
      return { ...message, isOpen: false };
    });
    setMessageField(updatedMessageField);
  };
  
  return (
    <div className="fixed bottom-0 right-0  z-[49] ">
      <div className="isolate flex items-end">
        {/* chat boxes container */}
        
        <ul className="fixed bottom-0 right-[80px] z-[1] flex ">
          {activeMessageField.map((item, index) => (
            <BoxMessage handleCloseMessageBox={handleCloseMessageBox} handleMinimizeMessageBox={handleMinimizeMessageBox}  key={item.id} item={item} />
          ))}
        </ul>
        {/* util for chat  */}
        <div className="absolute bottom-[16px]  right-[16px] w-[48px] ">
          <div className="flex flex-col items-center justify-center">
            <div
              className="peer/options pointer-events-auto order-last box-border flex h-[48px] w-[48px]  cursor-pointer items-center justify-center overflow-hidden rounded-full bg-sec-btn-bg shadow-xl hover:bg-sec-btn-bg-hover "
              onMouseEnter={() => setIsShownChatBoxOptions(true)}
              onMouseLeave={() => setIsShownChatBoxOptions(false)}
            >
              <PencilSquareIcon className=" h-5 w-5 text-white" />
            </div>
            {nonActiveMessageField.map((message, index) => (
              <div
                key={index}
                className="group  relative order-2 mb-[10px] flex h-[48px] w-[48px] items-center justify-center"
              >
                <div className="flex h-[48px] w-[48px] items-center justify-center ">
                  <button
                    aria-label="Open chat"
                    className=" m-0 flex h-full w-full select-none items-center justify-center rounded-full border-0 border-none p-0 ring-blue-500 ring-offset-2 ring-offset-white focus:outline-none  focus-visible:ring "
                    onMouseEnter={() => setIsShownChatBoxOptions(true)}
                    onMouseLeave={() => setIsShownChatBoxOptions(false)}
                    onClick={() => handleOpenMessageBox(message.id)}
                  >
                    <div className="h-full w-full overflow-hidden rounded-full bg-messenger-card-bg shadow-xl">
                      <Image
                        className=" h-full w-full object-cover"
                        src={message.url}
                        alt="avatar"
                        width={48}
                        height={48}
                      />
                    </div>
                  </button>
                </div>
                {/* close chat */}
                <div className="group/close invisible  absolute -right-1 -top-1 flex  h-5 w-5 flex-auto shrink-0 grow-0 scale-0 cursor-pointer items-center justify-center rounded-full bg-messenger-card-bg group-hover:visible group-hover:scale-100 hover:bg-fourth-clr"
                  onClick={() => handleCloseMessageBox(message.id)}
                >
                  <XMarkIcon className="h-4 w-4 text-disabled-icon" />
                </div>
              </div>
            ))}
            <div
              className={clsx(
                `box-border flex h-[48px]   w-[48px] items-center justify-center `,
              )}
            >
              <div
                className={clsx(
                  `flex h-[48px] w-[48px] items-center justify-center transition-all delay-75`,
                  {
                    'scale-0': !isShownChatBoxOptions,
                    'scale-100': isShownChatBoxOptions,
                  },
                )}
                onMouseEnter={() => setIsShownChatBoxOptions(true)}
                onMouseLeave={() => setIsShownChatBoxOptions(false)}
              >
                <Popover>
                  <PopoverTrigger>
                    <div
                      className={clsx(
                        `pointer-events-auto box-border flex h-[36px] w-[36px]  cursor-pointer items-center justify-center overflow-hidden rounded-full bg-sec-btn-bg shadow-xl transition-[scale]  delay-500 hover:bg-sec-btn-bg-hover`,
                      )}
                    >
                      <EllipsisHorizontalIcon className=" h-5 w-5 text-white" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    align="start"
                    sideOffset={-120}
                    className="text-white "
                  >
                    <PopoverClose
                      className="mb-2 flex "
                      onClick={() => closeAllChats()}
                    >
                      <div>
                        <XMarkIcon className=" h-5 w-5 rounded-full border border-white text-white" />
                      </div>
                      <div className="pl-3">Close all chats</div>
                    </PopoverClose>
                    <PopoverClose
                      className="flex justify-center"
                      onClick={() => minimizeAllChats()}
                    >
                      <div>
                        <MinusIcon className=" h-5 w-5 rounded-full border border-white text-white" />
                      </div>
                      <div className="pl-3">Minimize open chats</div>
                    </PopoverClose>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowChat;
