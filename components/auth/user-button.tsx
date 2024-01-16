"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { cn } from "@/lib/utils";

interface LoginUserButtons {
  mode?: "dropdownMenu" | "none",
  className? : string
};
export const UserButton = ({
  mode = "none",
  className
}: LoginUserButtons) => {
  const user = useCurrentUser();
  if(mode === "none"){
    return(
      <Avatar className={cn(className)}>
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback className="bg-sky-500">
          <FaUser className="text-white" />
        </AvatarFallback>
      </Avatar>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
