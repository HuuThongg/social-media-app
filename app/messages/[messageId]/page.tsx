'use client'
import { Chat } from '@/components/chat'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BellIcon, CameraIcon, ColorWheelIcon, FileTextIcon, LetterCaseCapitalizeIcon,  Link2Icon, MagnifyingGlassIcon, MaskOffIcon } from '@radix-ui/react-icons'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CaretSortIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { expandChatAtom } from '@/jotai'
import { useAtom } from 'jotai'



export default function MessagePage({ params }: { params: {messageId: string } }) {
  const [isExpandChat, _] = useAtom(expandChatAtom)
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMeidaFileOpen, setIsMeidaFileOpen] = React.useState(false)
  const imageUrl = "/images/contact/anhkhuong.jpg"
  return (
    // <div className='max-w-full flex flex-col shrink  grow min-w-0 items-center justify-center text-white'>
    //   Hello
    //   { params.messageId}
    // </div>
    <div className=' flex flex-col shrink grow max-w-full min-w-0  relative z-0 basis-0 max-h-[calc(100vh-58px)]'>
      <div className='flex shrink min-w-0 justify-between items-stretch basis-0 flex-nowrap  grow '>
        <div className='overflow-hidden max-w-full shrink grow  flex flex-col min-w-0 basis-0  '>
          <Chat />
        </div>
        {isExpandChat ? (
          <div className='bg-secondary-clr border border-l-2 border-l-media-outer-border border-solid min-w-[250px] max-w-[380px] basis-[33.33%]' >
            <div className='flex flex-col relative grow'>
              <div className='flex flex-col'>
                {/* top */}
                <div className='flex flex-col'>
                  <div className='pt-4 pb-3 flex justify-center'>
                    <Avatar className='w-[80px] h-[80px]'>
                      <AvatarImage src={imageUrl || ""} />
                      <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white w-7 h-7" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className='px-3 flex justify-center'>
                    <span className='text-primary-text'>User name</span>
                  </div>
                  <div className='px-3 pt-4 flex justify-center m-0  gap-x-5'>
                    
                    <div className='flex flex-col items-center justify-center '>
                      <span className='aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  hover:bg-third-clr p-2'>
                        <FaUser className="text-white w-6 h-6" />
                      </span>
                      
                      <div>
                        <span className='text-primary-text text-[14px]  font-sans'>
                          Profile
                        </span>
                      </div>
                    </div>
                    {/* notification */}
                    <Dialog >
                      <div className='flex flex-col items-center justify-center  '>
                        <DialogTrigger asChild>
                          <span className='aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  hover:bg-third-clr p-2'>
                            <BellIcon className="text-white w-6 h-6" />
                          </span>
                        </DialogTrigger>
                        <DialogContent className='bg-secondary-clr text-primary-text'>
                          <DialogHeader>
                            <DialogTitle className='text-2xl flex justify-center pb-2'>Mute conversation
                            </DialogTitle>
                            <RadioGroup defaultValue="comfortable" className='flex flex-col  space-y-5'>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                              <Label htmlFor="r1" className='text-base'>Mute message notifications</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label className='text-base' htmlFor="r2">Mute call notifications</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="compact" id="r3" />
                              <Label className='text-base' htmlFor="r3">Mute message and call notifications</Label>
                              </div>
                            </RadioGroup>
                            <DialogDescription className='text-secondary-text pt-2'>
                              Chat windows will stayed closed, when you won&apos;t get push notifications on your devices
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                        <div>
                          <span className='text-primary-text text-[14px]  font-sans'>
                            mute
                          </span>
                        </div>
                      </div>
                    </Dialog>
                    <div className='flex flex-col items-center justify-center '>
                      <span className='aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  hover:bg-third-clr p-2'>
                        <MagnifyingGlassIcon className="text-white w-6 h-6" />
                      </span>

                      <div>
                        <span className='text-primary-text text-[14px]  font-sans'>
                          Search
                        </span>
                      </div>
                    </div>
                    
                  </div>
                </div>
                {/* bottom */}
                <div className='flex flex-col px-2 pt-2 text-primary-text font-sans  space-y-2'>
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-2"
                  >
                    <div className="flex items-center justify-between space-x-4 ">
                      <CollapsibleTrigger asChild>
                        <div className='flex justify-between grow px-2 py-2 font-sans hover:bg-hover-overlay rounded-sm cursor-pointer select-none'>
                          <h4 className="text-base font-semibold ">
                            Customize chat
                          </h4>
                          <Button variant="ghost" size="sm" className='p-0 m-0'>
                            <CaretSortIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className='flex  items-center space-x-2'>
                          <ColorWheelIcon className='w-4 h-4'/> 
                          <span>
                            Change chat name
                          </span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className='flex  items-center space-x-2'>
                          <MaskOffIcon className='w-4 h-4' />
                          <span>
                            Change photo
                          </span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className='flex  items-center space-x-2'>
                          <LetterCaseCapitalizeIcon className='w-4 h-4' />
                          <span>
                            Edit nicknames
                          </span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible
                    open={isMeidaFileOpen}
                    onOpenChange={setIsMeidaFileOpen}
                    className="w-full space-y-2"
                  >
                    <div className="flex items-center justify-between space-x-4 ">
                      <CollapsibleTrigger asChild>
                        <div className='flex justify-between grow px-2 py-2 font-sans hover:bg-hover-overlay rounded-sm cursor-pointer select-none'>
                          <h4 className="text-base font-semibold ">
                            Media, files and links
                          </h4>
                          <Button variant="ghost" size="sm" className='p-0 m-0'>
                            <CaretSortIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className='flex  items-center space-x-2'>
                          <CameraIcon className='w-4 h-4' />
                          <span>
                            Media
                          </span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className='flex  items-center space-x-2'>
                          <FileTextIcon className='w-4 h-4' />
                          <span>
                            Files
                          </span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className='flex  items-center space-x-2'>
                          <Link2Icon className='w-4 h-4' />
                          <span>
                            Links
                          </span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>
        ): null}
      </div>
    </div>
  )
}


