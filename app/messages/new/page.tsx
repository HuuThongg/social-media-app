'use client'
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  }, {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
export default function NewMessagePage(){
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  return (
    <div className=' flex flex-col shrink grow max-w-full min-w-0  relative z-0 basis-0 max-h-[calc(100vh-58px)] '>
      <div className="flex w-full p-3  space-x-3">
        <ScrollArea className="h-[400px] w-[350px] rounded-md border drop-shadow-2xl border-wash">
          <Command >
            <CommandInput placeholder="To:" className="h-9" />
            <CommandEmpty>No potential user matched.</CommandEmpty>
            <CommandGroup>
              {onlineContactsData.map((framework) => (
                <CommandItem
                  key={framework.name}
                  value={framework.name}
                  onSelect={(currentValue:any) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                  className="text-primary-text"
                >
                  <div className="flex shrink-0 select-none flex-col p-[6px]">
                    <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full">
                      <Image src={framework.img} alt="avatar" width={40} height={40} />
                    </div>
                  </div>
                  <div className="flex min-w-0 max-w-full shrink grow basis-0   flex-col p-[6px] ">
                    <div className="my-[5px]">
                      <span>{framework.name}</span>
                    </div>
                  </div>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === framework.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </ScrollArea>
          
      </div>
    </div>
  )
}

type OnlineContact = {
  name: string;
  url: string;
  img: string;
};

const onlineContactsData: OnlineContact[] = [
  {
    name: 'Kim Chi',
    url: '#',
    img: '/images/contact/kimchi.jpg',
  },
  {
    name: 'Tran Thanh Nha',
    url: '#',
    img: '/images/contact/tranthanhnha.jpg',
  },
  {
    name: 'Trang Duong',
    url: '#',
    img: '/images/contact/trangduong.jpg',
  },
  {
    name: 'Duc ri',
    url: '#',
    img: '/images/contact/ducri.jpg',
  },
  {
    name: 'Diem Quynh',
    url: '#',
    img: '/images/contact/diemquynh.jpg',
  },
  {
    name: 'Duyen',
    url: '#',
    img: '/images/contact/duyen.jpg',
  },
  {
    name: 'Trang La',
    url: '#',
    img: '/images/contact/trangla.png',
  },
  {
    name: 'Duy Hung',
    url: '##',
    img: '/images/contact/duyhuynh.png',
  },
  // {
  //   name: 'An Khuong',
  //   href: '##',
  //   url: '/images/contact/ankhuong.jpg',
  // },
  // {
  //   name: 'Kieu Trinh',
  //   href: '##',
  //   url: '/images/contact/kieutrinh.jpg',
  // },
  // {
  //   name: 'Hoai Bao',
  //   href: '##',
  //   url: '/images/contact/hoaibao.jpg',
  // },
  // {
  //   name: 'My lan',
  //   href: '##',
  //   url: '/images/contact/mylan.jpg',
  // },
  // {
  //   name: 'Hung Duong',
  //   href: '##',
  //   url: '/images/contact/hungduong.jpg',
  // },
];