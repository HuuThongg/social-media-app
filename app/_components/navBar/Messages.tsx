'use client';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { messages } from './constant';
import { useLocalStorage } from '@/components/hooks/useLocalStorage';
import type { Message, MessageBox } from '../windowChat/WindowChat';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Messages = () => {
  const { ref, inView } = useInView();
  const router = useRouter();
  const pathname = usePathname();
  const isHasMessagePath = pathname.includes('/messages');

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
    queryKey: ['projects'],
    queryFn: async ({ pageParam }) => {
      const res = await fetch('/api/message?cursor=' + pageParam);
      return res.json();
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    maxPages: 3,
  });

  const [messageIds, setMessageIds] = useLocalStorage<MessageBox[]>(
    'messageIds',
    [],
  );
  const addMessageId = (message: Message) => {
    // Check if the message already exists in the messageIds array
    const messageExists = messageIds.some((msg) => msg.id === message.id);
    if (!messageExists) {
      setMessageIds((prevMessageIds) => [
        ...prevMessageIds,
        { ...message, isOpen: true },
      ]);
    }
  };

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <div className="flex max-h-[calc(100vh-90px-152px)] flex-col overflow-x-hidden overflow-y-scroll   scrollbar scrollbar-track-transparent scrollbar-thumb-fifth-clr scrollbar-thumb-rounded-md   scrollbar-w-3 hover:scrollbar-track-[#2c2d2f]">
      {status === 'pending' ? (
        <SkeletonMessageChat length={4} />
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          {messages.map((message, index) => (
            <div className=" relative px-2" key={index}>
              <button
                className="group/item relative m-0 flex w-full flex-col rounded-lg p-2 group-hover/edit:bg-red-500 hover:bg-third-clr"
                onClick={() => {
                  if (isHasMessagePath) {
                    router.push(`/messages/${message.id}`);
                  } else {
                    addMessageId(message);
                  }
                }}
              >
                <div className="relative flex h-full w-full flex-nowrap items-center justify-between overflow-hidden">
                  {/* avatar */}
                  <div className="relative flex min-w-0 max-w-full shrink-0 flex-col">
                    <div className="flex select-none pr-3">
                      <div className="relative h-[56px] w-[56px]">
                        <div className="absolute inset-0 h-full w-full ">
                          <div className="z-0 block overflow-hidden rounded-full bg-primary-clr">
                            <div className="relative h-0 pt-[100%]">
                              <div className="absolute inset-0 m-0 h-full w-full p-0">
                                <Image
                                  src={message.url}
                                  width={56}
                                  height={56}
                                  alt="user acvatar"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* messages */}
                  <div className="flex min-w-0 max-w-full shrink grow basis-auto flex-col items-start">
                    <div className="relative flex w-full min-w-0 max-w-full shrink grow  basis-auto flex-col">
                      {/* name */}
                      <div className="min-w-0 max-w-full break-words text-left leading-[1.33rem] text-primary-text">
                        <span className="relative block overflow-hidden text-ellipsis whitespace-nowrap">
                          {message.name}
                        </span>
                      </div>
                      <div className="h-2 w-full"></div>
                      {/* last message */}
                      <div className="flex min-h-4 w-full items-center text-[12px] text-primary-text">
                        <span className="block pr-2">
                          <span className="block  max-w-[200px]  overflow-hidden truncate">
                            {' '}
                            {message.lastMessage}
                          </span>
                        </span>

                        <span>
                          <span aria-hidden="true"> · </span>
                        </span>
                        <span className="whitespace-nowrap pl-2">51m</span>
                      </div>
                    </div>
                  </div>
                  {/* fake */}
                  <div className="min-0 relative z-0 flex max-w-full  shrink-0 flex-col">
                    <div className="select-none pl-3">
                      <div className="flex cursor-pointer flex-nowrap items-center justify-center rounded-full">
                        {/* <svg className="fill-disabled-icon" height="12px" role="img" viewBox="2 2 20 20" width="12px" xmlns="http://www.w3.org/2000/svg"><title>Delivered</title><path d="m12 2a10 10 0 1 0 10 10 10.011 10.011 0 0 0 -10-10zm5.219 8-6.019 6.016a1 1 0 0 1 -1.414 0l-3.005-3.008a1 1 0 1 1 1.419-1.414l2.3 2.3 5.309-5.31a1 1 0 1 1 1.41 1.416z"></path></svg> */}
                        <div className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full">
                          <Image
                            src="/images/avatar.jpg"
                            alt="responder"
                            width={16}
                            height={16}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* tool */}

                <div
                  className={clsx(
                    'group/edit ease-fade-out invisible absolute  right-[30px]   top-1/2 h-[32px]  w-[32px] -translate-y-1/2 rounded-full border border-gray-700 bg-hover-overlay  opacity-0 transition-all duration-100 group-hover/item:visible group-hover/item:opacity-100 hover:bg-fifth-clr',
                  )}
                >
                  <div className="flex h-full items-center justify-center drop-shadow-xl ">
                    <EllipsisHorizontalIcon className="h-5 w-5 text-blue-500 " />
                  </div>
                </div>
              </button>
            </div>
          ))}
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage && hasNextPage ? (
              <SkeletonMessageChat length={2} />
            ) : null}
          </button>
        </>
      )}
    </div>
  );
};

export default Messages;

export const SkeletonMessageChat = ({ length }: { length: number }) => {
  const getRandomWidth = () => {
    return Math.floor(Math.random() * (250 - 150 + 1) + 150);
  };
  return (
    <div className="relative  space-y-2 p-3">
      {Array.from(Array(length).keys()).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton
              style={{ width: `${getRandomWidth()}px` }}
              className="h-4 "
            />
            <Skeleton
              style={{ width: `${getRandomWidth()}px` }}
              className="h-4 "
            />
          </div>
        </div>
      ))}
    </div>
  );
};
