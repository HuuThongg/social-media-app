'use client';
import { Chat } from '@/components/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BellIcon,
  CameraIcon,
  ColorWheelIcon,
  FileTextIcon,
  LetterCaseCapitalizeIcon,
  Link2Icon,
  MagnifyingGlassIcon,
  MaskOffIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { expandChatAtom } from '@/jotai';
import { useAtom } from 'jotai';

export default function MessagePage({
  params,
}: {
  params: { messageId: string };
}) {
  const [isExpandChat, _] = useAtom(expandChatAtom);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMeidaFileOpen, setIsMeidaFileOpen] = React.useState(false);
  const imageUrl = '/images/contact/anhkhuong.jpg';
  return (
    // <div className='max-w-full flex flex-col shrink  grow min-w-0 items-center justify-center text-white'>
    //   Hello
    //   { params.messageId}
    // </div>
    <div className=" relative z-0 flex max-h-[calc(100vh-58px)] min-w-0 max-w-full  shrink grow basis-0 flex-col">
      <div className="flex min-w-0 shrink grow basis-0 flex-nowrap items-stretch  justify-between ">
        <div className="flex min-w-0 max-w-full shrink  grow basis-0 flex-col overflow-hidden  ">
          <Chat />
        </div>
        {isExpandChat ? (
          <div className="min-w-[250px] max-w-[380px] basis-[33.33%] border border-l-2 border-solid border-l-media-outer-border bg-secondary-clr">
            <div className="relative flex grow flex-col">
              <div className="flex flex-col">
                {/* top */}
                <div className="flex flex-col">
                  <div className="flex justify-center pb-3 pt-4">
                    <Avatar className="h-[80px] w-[80px]">
                      <AvatarImage src={imageUrl || ''} />
                      <AvatarFallback className="bg-sky-500">
                        <FaUser className="h-7 w-7 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex justify-center px-3">
                    <span className="text-primary-text">User name</span>
                  </div>
                  <div className="m-0 flex justify-center gap-x-5 px-3  pt-4">
                    <div className="flex flex-col items-center justify-center ">
                      <span className="aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  p-2 hover:bg-third-clr">
                        <FaUser className="h-6 w-6 text-white" />
                      </span>

                      <div>
                        <span className="font-sans text-[14px]  text-primary-text">
                          Profile
                        </span>
                      </div>
                    </div>
                    {/* notification */}
                    <Dialog>
                      <div className="flex flex-col items-center justify-center  ">
                        <DialogTrigger asChild>
                          <span className="aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  p-2 hover:bg-third-clr">
                            <BellIcon className="h-6 w-6 text-white" />
                          </span>
                        </DialogTrigger>
                        <DialogContent className="bg-secondary-clr text-primary-text">
                          <DialogHeader>
                            <DialogTitle className="flex justify-center pb-2 text-2xl">
                              Mute conversation
                            </DialogTitle>
                            <RadioGroup
                              defaultValue="comfortable"
                              className="flex flex-col  space-y-5"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1" className="text-base">
                                  Mute message notifications
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label className="text-base" htmlFor="r2">
                                  Mute call notifications
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="compact" id="r3" />
                                <Label className="text-base" htmlFor="r3">
                                  Mute message and call notifications
                                </Label>
                              </div>
                            </RadioGroup>
                            <DialogDescription className="pt-2 text-secondary-text">
                              Chat windows will stayed closed, when you
                              won&apos;t get push notifications on your devices
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                        <div>
                          <span className="font-sans text-[14px]  text-primary-text">
                            mute
                          </span>
                        </div>
                      </div>
                    </Dialog>
                    <div className="flex flex-col items-center justify-center ">
                      <span className="aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  p-2 hover:bg-third-clr">
                        <MagnifyingGlassIcon className="h-6 w-6 text-white" />
                      </span>

                      <div>
                        <span className="font-sans text-[14px]  text-primary-text">
                          Search
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* bottom */}
                <div className="flex flex-col space-y-2 px-2 pt-2 font-sans  text-primary-text">
                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className="w-full space-y-2"
                  >
                    <div className="flex items-center justify-between space-x-4 ">
                      <CollapsibleTrigger asChild>
                        <div className="flex grow cursor-pointer select-none justify-between rounded-sm px-2 py-2 font-sans hover:bg-hover-overlay">
                          <h4 className="text-base font-semibold ">
                            Customize chat
                          </h4>
                          <Button variant="ghost" size="sm" className="m-0 p-0">
                            <CaretSortIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className="flex  items-center space-x-2">
                          <ColorWheelIcon className="h-4 w-4" />
                          <span>Change chat name</span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className="flex  items-center space-x-2">
                          <MaskOffIcon className="h-4 w-4" />
                          <span>Change photo</span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className="flex  items-center space-x-2">
                          <LetterCaseCapitalizeIcon className="h-4 w-4" />
                          <span>Edit nicknames</span>
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
                        <div className="flex grow cursor-pointer select-none justify-between rounded-sm px-2 py-2 font-sans hover:bg-hover-overlay">
                          <h4 className="text-base font-semibold ">
                            Media, files and links
                          </h4>
                          <Button variant="ghost" size="sm" className="m-0 p-0">
                            <CaretSortIcon className="h-4 w-4" />
                            <span className="sr-only">Toggle</span>
                          </Button>
                        </div>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className="flex  items-center space-x-2">
                          <CameraIcon className="h-4 w-4" />
                          <span>Media</span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className="flex  items-center space-x-2">
                          <FileTextIcon className="h-4 w-4" />
                          <span>Files</span>
                        </div>
                      </div>
                      <div className="rounded-md border px-4 py-2 text-base font-semibold shadow-sm">
                        <div className="flex  items-center space-x-2">
                          <Link2Icon className="h-4 w-4" />
                          <span>Links</span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
