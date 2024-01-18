'use client';
import Link from 'next/link';
import Image from 'next/image';
import {
  PhoneIcon,
  XMarkIcon,
  VideoCameraIcon,
  MinusIcon,
} from '@heroicons/react/24/outline';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUpIcon, MagnifyingGlassIcon, ChevronDownIcon, DividerVerticalIcon, ThickArrowLeftIcon, ThickArrowRightIcon } from '@radix-ui/react-icons';
import { useAtom } from 'jotai';
import { expandChatAtom } from '@/jotai';



export const ChatHeader = () =>{
  const [search, setSearch] = useState('');
  const [isExpandChat, setIsExpandChat] = useAtom(expandChatAtom)

  return (
    <div className='flex flex-col shrink-0'>
      <div className="relative z-[2] box-content flex h-8 shrink-0 select-none  items-center justify-between  overflow-hidden rounded-t-lg p-2 shadow-md">
        <div className="relative z-0  -ml-[6px] box-border flex   shrink grow  basis-0 flex-nowrap items-center">
          <div className="flex">
            <button className="group/head relative m-0  mr-2 inline-flex  min-w-0 basis-auto rounded-md   p-0 transition-colors delay-75 hover:bg-third-clr ">
              <div className="flex min-w-0 max-w-full shrink-0 flex-col rounded-md  p-[6px]">
                <div className="-my-[6px] flex shrink-0 flex-nowrap items-center justify-between ">
                  <div className="flex items-center py-[6px]">
                    <div className="item-center relative -m-[6px] flex shrink grow justify-between  ">
                      <Link
                        href={'#'}
                        tabIndex={-1}
                        className="m-0 flex rounded-md  border-0 border-none p-0
                                        hover:bg-fourth-clr
                                        "
                      >
                        <div className="w- relative box-border flex  min-w-0 shrink-0 items-center justify-center p-[6px]">
                          <div className="flex aspect-square h-8 overflow-hidden rounded-full">
                            <Image
                              className=" h-full w-full object-cover"
                              src={""}
                              alt="avatar"
                              width={32}
                              height={32}
                            />
                          </div>
                        </div>
                      </Link>
                      <div className="relative flex min-w-0 max-w-full shrink  grow px-[2px] py-[6px]">
                        <div className="flex min-h-[26px]  max-w-full grow  flex-col items-start justify-center">
                          <h1 className="flex min-w-0 max-w-full  outline-none">
                            <span className="min-w-0 max-w-full break-words text-center font-bold text-primary-text">
                              {/* {item.name} */}
                              item name
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>

                    <ChevronDownIcon className="h-[15px] w-[15px] fill-disabled-icon  pl-2" />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        <ul className="-mr-1 flex items-center bg-transparent">
          <li className="p-[1px]">
            <div className="pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-[3px] hover:bg-third-clr ">
              <PhoneIcon className=" w- h-5 text-disabled-icon" />
            </div>
          </li>
          <li className="p-[1px]">
            <div className="pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-[3px] hover:bg-third-clr ">
              <VideoCameraIcon className=" w- h-5 text-disabled-icon" />
            </div>
          </li>
          {/* <li className="p-[1px]">
            <div
              className="pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-[3px] hover:bg-third-clr  "
              onClick={() => handleMinimizeMessageBox(item.id)}
            >
              <MinusIcon className=" w- h-5 text-disabled-icon" />
            </div>
          </li> */}
          <li className="p-[1px]">
            <div
              className="pointer-events-auto box-border flex cursor-pointer items-center overflow-hidden rounded-full p-[3px] hover:bg-third-clr "
              onClick={() => {
                setIsExpandChat(!isExpandChat);
              }}
            >
              {isExpandChat ? (
                <ThickArrowRightIcon className=" w-5 h-5 text-disabled-icon" />
              ): (
                  <ThickArrowLeftIcon className=" w-5 h-5 text-disabled-icon" />
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className="relative z-[2] box-content flex h-8 shrink-0 select-none min-w-0  items-center justify-between  overflow-hidden rounded-t-lg p-2 shadow-md">
        {/* search */}
        <div className='flex max-w-full shrink flex-col grow p-[6px] relative'>
          <label htmlFor="" className={cn(
            'relative flex min-h-[40px] w-full min-w-[40px] items-stretch rounded-[50px] bg-third-clr align-middle text-xs font-semibold outline-none hover:bg-fourth-clr',
          )}
            aria-label="choose a search"
            aria-describedby="search input label">
            <span className="pointer-events-none flex items-center whitespace-nowrap pl-3 ease-linear">
              <MagnifyingGlassIcon className="h-4 w-4 text-primary-text" />
            </span>
            <input
              type="text"
              className={cn(
                `h-[40px] w-full shrink grow basis-auto cursor-text rounded-[50px]  bg-transparent px-2 pb-[9px] pt-[7px] text-left text-[15px]  font-normal text-primary-text placeholder:text-secondary-text`,
                
              )}
              placeholder="Search"
              value={search}
              onChange={(e)=>{setSearch(e.currentTarget.value)}}
            />
          </label>
        </div>
        {/* down up  */}
        <div className='p-[6px] flex flex-col justify-center items-center'>
          <span className='aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  hover:bg-third-clr p-2'>
            <ChevronUpIcon className="text-white w-4 h-4" />
          </span>
        </div>
        <div className='p-[6px] flex flex-col justify-center items-center'>
          <span className='aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  hover:bg-third-clr p-2'>
            <ChevronDownIcon className="text-white w-4 h-4" />
          </span>
        </div>
        {/* close */}
        <div className='p-[6px] flex flex-col justify-center items-center'>
          <span className='aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  hover:bg-third-clr p-2'
          >
            <DividerVerticalIcon className="text-white w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  )
}                   
