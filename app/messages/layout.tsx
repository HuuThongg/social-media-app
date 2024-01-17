import MessageBox from "../_components/navBar/MessageBox"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex grow shrink-0 relative justify-start z-0 flex-nowrap bg-secondary-clr">
      <div className="max-w-full  flex flex-col min-w-0 relative z-[1] w-[360px] ">
        <div className="bg-secondary-clr border border-r-[1px] border-b-green-600 overflow-hidden border-solid w-full relative ">
          <MessageBox/>
        </div>
      </div>
      {children}
    </div>
  )
}