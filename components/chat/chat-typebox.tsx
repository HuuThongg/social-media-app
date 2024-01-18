'use client';
import clsx from 'clsx';
import { PhotoIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useState } from 'react';

const ChatTypeBox = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const onChangeInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setIsTyping(inputValue.length > 0);
    setText(inputValue);
  };
  const sendMessage = () => {
    console.log('send message');
  };
  const sendMessageHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Add your submit logic here
      sendMessage();
      console.log('Submit text:', text);
      setText('');
    }
  };
  const sendMessageWithButton = () => {
    sendMessage();
    setText('');
  };
  return (
    <div className="flex items-end py-3 leading-4 text-[0.9375] shadow-md">
      {/* more */}
      <div className=" m-1  min-w-0 shrink-0 grow-0 basis-auto overflow-hidden rounded-full p-1 hover:bg-third-clr">
        <div className="pointer-events-auto box-border    flex cursor-pointer items-center ">
          <PlusCircleIcon className=" h-5 w-5 text-disabled-icon" />
        </div>
      </div>
      {/* input message */}
      <div className="relative -ml-1 min-w-0 grow basis-0  overflow-x-hidden  ">
        <div
          className={clsx(
            `absolute bottom-0 left-0 z-[1] mb-1 mr-1 flex items-center justify-center transition-transform delay-100  `,
            {
              'scale-0': isTyping,
              'scale-100': !isTyping,
            },
          )}
        >
          <input type="file" multiple className="hidden" />
          <div className="min-w-0 shrink-0 grow-0 basis-auto overflow-hidden   rounded-full p-1 hover:bg-third-clr">
            <div className="pointer-events-auto box-border    flex cursor-pointer items-center  ">
              <PhotoIcon className=" h-5 w-5 text-disabled-icon" />
            </div>
          </div>
        </div>
        <div
          className={clsx(`flex   transition-[margin]`, {
            'ml-[36px]': !isTyping,
            'ml-0': isTyping,
          })}
        >
          <div className="box-border min-w-0 grow rounded-[20px] bg-comment-bg">
            <div className="flex w-full flex-col flex-wrap justify-start">
              <div className="relative m-2  mr-3 flex min-w-0">
                <TextareaAutosize
                  minRows={1}
                  maxRows={6}
                  placeholder="Aa"
                  value={text}
                  style={{ height: 17 }}
                  className="grow     resize-none overflow-x-hidden bg-transparent text-primary-text "
                  onChange={onChangeInputText}
                  onKeyDown={(e) => sendMessageHandler(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* send message */}
      <div className="inline-flex grow-0">
        <button
          title="send message"
          className=" mx-1  min-w-0 shrink-0 grow-0 basis-auto cursor-pointer overflow-hidden rounded-full p-2 hover:bg-third-clr"
          type="submit"
          onClick={sendMessageWithButton}
        >
          <PaperAirplaneIcon className="h-5 w-5 fill-disabled-icon stroke-transparent" />
        </button>
      </div>
    </div>
  );
};

export default ChatTypeBox;
