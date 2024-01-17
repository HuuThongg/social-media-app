import React from 'react'
import Messages from './Messages'
import Link from 'next/link'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

const MessageBox = () => {
  return (
    <div className="flex flex-col ">
      <div className="relative flex grow-0 flex-col justify-start overflow-hidden ">
        <div className="relative flex shrink grow flex-col overflow-hidden ">
          <div>
            <header className="z-0 flex items-center justify-between bg-transparent px-4 py-3  pb-1">
              <div className="flex shrink-0  flex-nowrap items-stretch">
                <div className="flex min-w-0 shrink-0 flex-col self-center px-1  py-[6px]">
                  <h1 className=" mx-0 break-words  p-0 text-2xl font-bold leading-5 text-primary-text  outline-none ">
                    <span>Chats</span>
                  </h1>
                </div>
              </div>
              <div className="flex items-stretch">
                {Array.from(Array(4).keys()).map(
                  (item, index) => (
                    <div
                      key={index}
                      className="max-w-full px-1 py-[6px]"
                    >
                      <div className="flex cursor-pointer flex-row items-center justify-center overflow-hidden rounded-full bg-gray-700  p-[6px] hover:bg-hover-overlay  active:bg-secondary-clr">
                        <EllipsisHorizontalIcon className="h-5 w-5 text-primary-icon" />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </header>
            <div className="text-primary-text">
              <div className=" px-4 ">
                <label
                  htmlFor=""
                  className="flex w-full min-w-[40px] rounded-2xl  bg-third-clr align-baseline text-sm font-semibold outline-none"
                >
                  <span className="my-auto pl-[10px]">
                    <MagnifyingGlassIcon className="h-4 w-4 text-primary-text" />
                  </span>
                  {/* input */}
                  <input
                    type="text"
                    className="h-[36px] min-h-0 w-full min-w-0 shrink grow basis-auto cursor-text rounded-full bg-transparent px-[6px] pb-[9px] pt-[7px] text-sm font-semibold text-primary-text outline-none  "
                    placeholder="Search Messenger"
                  />
                </label>
              </div>
              <div className="mt-1 px-4 py-2">
                <div className=" box-border flex h-[36px] ">
                  <div className="relative   h-full">
                    <div className="flex h-full w-full items-center justify-start">
                      <div className="flex h-full w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[18px] bg-primary-deemphasized-bt-bg px-3  font-semibold leading-5 hover:bg-primary-deemphasized-bt-hover">
                        <span className="text-[15px]relative overflow-hidden text-ellipsis break-words text-primary-deemphasized-bt-text ">
                          Inbox
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative  h-full px-1">
                    <div className="flex h-full w-full items-center justify-start">
                      <div className="flex h-full w-fit cursor-pointer items-center justify-center overflow-hidden rounded-[18px] bg-transparent px-3  font-semibold leading-5 hover:bg-third-clr ">
                        <span className="text-[15px]relative overflow-hidden text-ellipsis break-words text-primary-text ">
                          Communities
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* each person  */}
          <Messages />
        </div>
      </div>
      <div className="pointer-auto  w-full justify-end  border-t border-slate-700  bg-transparent py-[16px] shrink-0">
        <span className="mx-auto block w-full text-center text-xs">
          <Link
            href="/"
            className="inline   w-fit  cursor-pointer text-base font-semibold leading-6 text-blue-link hover:underline"
          >
            See all In Messenger
          </Link>
        </span>
      </div>
    </div>
  )
}

export default MessageBox