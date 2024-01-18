import { cn } from '@/lib/utils'
import React from 'react'

const IconC = ({icon, className}:{icon:JSX.Element,className?:string}) => {
  console.log("className: " + className);
  return (
    <span className={cn("aspect-square cursor-pointer overflow-hidden rounded-full bg-third-clr  p-2 hover:bg-primary-icon-clr-hover",className)}>
      {icon}
    </span>
  )
}

export default IconC