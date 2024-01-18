import MessageBox from "../_components/navBar/MessageBox"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="  flex grow shrink-0 relative justify-start z-0 flex-nowrap bg-secondary-clr min-h-[calc(100%-58px)] ">
      <div className="max-w-full  flex flex-col min-w-0 relative z-[1] w-[360px] ">
        <div className="bg-secondary-clr  overflow-hidden  w-full relative ">
          {/* border border-r-[1px] border-b-green-600 border-solid  */}
          <MessageBox messagePath={true} />
        </div>
      </div>
      {children}
    </div>
  )
}