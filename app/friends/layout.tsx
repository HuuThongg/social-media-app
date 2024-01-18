import IconC from "@/components/ui/IconC";
import { cn } from "@/lib/utils";
import { UserIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, GearIcon, PersonIcon } from "@radix-ui/react-icons";
import clsx from "clsx";

const menu = [
  { icon: <GearIcon className="w-5 h-5 text-primary-icon  "  />, value: "Home" },
  { icon: <UserPlusIcon className="w-5 h-5 text-primary-icon" />, value: "Friend Requests" },
  { icon: <PersonIcon className="w-5 h-5 text-primary-icon" />, value: "Suggestions" },
  { icon: <UserIcon className="w-5 h-5 text-primary-icon" />, value: "All Friends" },
];

export default async function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="  relative z-0 flex min-h-[calc(100vh-58px)] shrink-0 grow flex-nowrap justify-start bg-secondary-clr ">
      <div className="relative  z-[1] flex   grow w-[360px]" >
        <div className="relative flex flex-col w-[360px]  overflow-hidden h-full  ">
          {/* border border-r-[1px] border-b-green-600 border-solid  */}
            <div className="py-2 px-4 flex justify-between items-center">
              <div className="text-primary-text">
                <span className="text-xl font-bold font-sans">Friends</span>
              </div>
              <IconC icon={<GearIcon className="h-5 w-5 text-white" />}/>
            </div>
          {menu.map((item,index) => (
              <div key={index} className="flex flex-col px-2 mx-2 py-2 rounded-md cursor-pointer select-none hover:bg-primary-icon-clr-hover">
                <div className="flex justify-between items-center">
                  <div className=" flex items-center space-x-3">
                  <IconC className={clsx(` hover:bg-transparent`, {
                    'bg-blue-600': item.value==="Home",
                  })}
                  icon={item.icon} />
                    {/* icon and name */}
                    <div className="">
                      <span className="text-primary-text">{item.value}</span>
                    </div>
                  </div>
                  {/* chervon right icon */}
                  {item.value !== "Home" ? (
                    <div>
                      <ChevronRightIcon className="w-6 h-6 text-primary-icon"/>
                    </div>
                  ): null}
                </div>
              </div>
            ))}
        </div>
      </div>
      {children}
    </div>
  );
}
