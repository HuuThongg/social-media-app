'use client';
import Image from 'next/image';
import { useInfiniteQuery, } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import {
  FaceSmileIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useWindowSize } from '@/components/hooks/useWindowSize';
import { ReplyIcon } from '@/components/icons';
import React, { useRef } from 'react';

const ChatMessages = () => {

  const { ref, inView } = useInView()
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch('/api/message?cursor=' + pageParam)
      return res.json();
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    maxPages: 3,
  })

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])


  React.useEffect(() => {
    if (messageBoxRef.current && data) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [data]);

  const size = useWindowSize();
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const onChangeInputText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setIsTyping(inputValue.length > 0);
    setText(inputValue);
  };
  const shouldconsider = 'flex-row-reverse';
  const a = "blue-600"
  console.log("get rerendered text");
  return (
    <div className="relative flex max-h-full flex-1 flex-col overflow-hidden ">
      <div className="relative flex max-h-full flex-1 flex-col overflow-hidden border-l-2 border-r-2 border-messenger-card-bg">
        <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-fifth-clr    scrollbar-thumb-rounded-md scrollbar-w-2 hover:scrollbar-track-[#2c2d2f]"
          ref={messageBoxRef}
        >

          {status === 'pending' ? (
            <div>Loading...</div>
          ) : status === 'error' ? (
            <span>Error: {error.message}</span>
          ) : (
            <>
              <button
                ref={ref}
                onClick={() => fetchPreviousPage()}
                disabled={!hasPreviousPage || isFetchingPreviousPage}
              >
                {isFetchingPreviousPage && hasPreviousPage
                  ? (
                    <div>load older</div>
                  )
                  : null}
              </button>
              {/* each message */}
              {Array.from(Array(10).keys()).map((item, index) => (
                <div key={index} className="relative">
                  <div className="relative flex flex-col">
                    {/* for Assistive Techonology  clip-path:inset(50%) */}
                    <h3 className="outline-none">
                      <span
                        className="absolute h-[1px] w-[1px] overflow-hidden "
                        style={{ clipPath: 'inset(50%)' }}
                      >
                        Kiet
                      </span>
                    </h3>
                    {/* perhaps do a height:2px here */}
                    <div className="group/message flex ">
                      {/* avatar */}
                      <div className="flex grow-0 flex-col justify-end bg-transparent pl-[6px] pr-2 ">
                        <div className="flex aspect-square w-[28px] items-end">
                          <div className="relative flex h-full w-full overflow-hidden rounded-full">
                            <Image
                              className="h-full w-full object-cover"
                              src="/images/avatar.jpg"
                              alt="avatar"
                              width={28}
                              height={28}
                            />
                          </div>
                        </div>
                        {/* if the message has interaction icon */}
                        <div className=""></div>
                      </div>
                      {/* message */}
                      <div className="flex min-w-0 shrink  grow ">
                        <div className="flex flex-col justify-start bg-transparent ">
                          <div className="flex w-full flex-col">
                            {/* like padding */}
                            <div className="h-[2px] w-full bg-messenger-card-bg "></div>
                            <div className="relative flex  max-w-full flex-col items-start">
                              <div className="relative z-[1] overflow-hidden rounded-2xl bg-wash px-3 py-2 text-white">
                                <div className="whitespace-pre-wrap text-left text-[0.9375rem] leading-[1.3333]  text-primary-text">
                                  How are you?
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* if the message has interaction icon */}
                          <div className="w-full max-w-full grow-0 items-stretch justify-end bg-transparent"></div>
                        </div>
                        {/* drop icons, reply to specific message and edit */}
                        {/* if the message has interaction icon
                                    do: pb-[18px] */}
                        <div
                          className="delay-70 invisible  relative flex shrink-0 grow justify-center pl-[5px] opacity-0 transition-all group-hover/message:visible group-hover/message:opacity-100"
                          aria-hidden="true"
                        >
                          <div className="flex items-center justify-center">
                            <div className="pointer-events-auto box-border flex h-6 w-6 cursor-pointer  items-center justify-center overflow-hidden  rounded-full hover:bg-third-clr  ">
                              <FaceSmileIcon className=" h-[20px] w-[20px] text-disabled-icon" />
                            </div>
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="pointer-events-auto box-border flex h-6 w-6 cursor-pointer  items-center justify-center overflow-hidden  rounded-full hover:bg-third-clr  ">
                              <ReplyIcon className=" h-[20px] w-[20px] fill-disabled-icon " />
                            </div>
                          </div>

                          <div className="flex items-center justify-center">
                            <div className="pointer-events-auto box-border flex h-6 w-6 cursor-pointer  items-center justify-center overflow-hidden  rounded-full hover:bg-third-clr  ">
                              <EllipsisVerticalIcon className=" stroke-3 h-[20px] w-[20px]  text-disabled-icon" />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* sigal message seen */}
                      <div className="flex max-w-full grow-0 flex-col justify-end self-stretch bg-transparent">
                        <div className="flex w-5 items-end overflow-hidden">
                          <div className="flex aspect-square w-[14px] items-end">
                            <div className="relative flex h-full w-full overflow-hidden rounded-full">
                              <Image
                                className="h-full w-full object-cover"
                                src="/images/avatar.jpg"
                                alt="avatar"
                                width={14}
                                height={14}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-[7px] w-full bg-messenger-card-bg "></div>
                  </div>
                </div>
              ))}
              <div className="relative">
                <div className="relative flex flex-col">
                  {/* for Assistive Techonology  clip-path:inset(50%) */}
                  <h3 className="outline-none">
                    <span
                      className="absolute h-[1px] w-[1px] overflow-hidden "
                      style={{ clipPath: 'inset(50%)' }}
                    >
                      Kiet
                    </span>
                  </h3>
                  {/* perhaps do a height:2px here */}
                  <div className="group/message flex ">
                    {/* avatar */}
                    <div className="flex grow-0 flex-col justify-end bg-transparent pl-[6px] pr-2 ">
                      {/* if the message has interaction icon */}
                      <div className=""></div>
                    </div>
                    {/* message */}
                    <div className="flex min-w-0 shrink grow  flex-row-reverse ">
                      <div className="flex flex-col justify-start bg-transparent ">
                        <div className="flex w-full flex-col">
                          {/* like padding */}
                          <div className="h-[2px] w-full bg-messenger-card-bg "></div>
                          <div className="relative flex  max-w-full flex-col items-start">
                            <div className="relative z-[1] overflow-hidden rounded-2xl bg-blue-600 px-3 py-2 text-white ">
                              <div className="whitespace-pre-wrap text-left text-[0.9375rem] leading-[1.3333]  text-white">
                                Nay tr di nhan bang ra truong ne
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* if the message has interaction icon */}
                        <div className="w-full max-w-full grow-0 items-stretch justify-end bg-transparent"></div>
                      </div>
                      {/* drop icons, reply to specific message and edit */}
                      {/* if the message has interaction icon
                                    do: pb-[18px] */}
                      <div
                        className="delay-70 invisible  relative flex shrink-0 grow justify-center pl-[5px] opacity-0 transition-all group-hover/message:visible group-hover/message:opacity-100"
                        aria-hidden="true"
                      >
                        <div className="flex items-center justify-center">
                          <div className="pointer-events-auto box-border flex h-6 w-6 cursor-pointer  items-center justify-center overflow-hidden  rounded-full hover:bg-third-clr  ">
                            <FaceSmileIcon className=" h-[20px] w-[20px] text-disabled-icon" />
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="pointer-events-auto box-border flex h-6 w-6 cursor-pointer  items-center justify-center overflow-hidden  rounded-full hover:bg-third-clr  ">
                            <ReplyIcon className=" h-[20px] w-[20px] fill-disabled-icon " />
                          </div>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="pointer-events-auto box-border flex h-6 w-6 cursor-pointer  items-center justify-center overflow-hidden  rounded-full hover:bg-third-clr  ">
                            <EllipsisVerticalIcon className=" stroke-3 h-[20px] w-[20px]  text-disabled-icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* sigal message seen */}
                    <div className="flex max-w-full grow-0 flex-col justify-end self-stretch bg-transparent">
                      <div className="flex w-5 items-end overflow-hidden">
                        <div className="flex aspect-square w-[14px] items-end">
                          <div className="relative flex h-full w-full overflow-hidden rounded-full">
                            <Image
                              className="h-full w-full object-cover"
                              src="/images/avatar.jpg"
                              alt="avatar"
                              width={14}
                              height={14}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[7px] w-full bg-messenger-card-bg "></div>
                </div>
              </div>

            </>
          )}


        </div>
      </div>
    </div>
  )
}

export default ChatMessages