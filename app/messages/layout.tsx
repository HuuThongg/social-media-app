import MessageBox from '../_components/navBar/MessageBox';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="  relative z-0 flex min-h-[calc(100%-58px)] shrink-0 grow flex-nowrap justify-start bg-secondary-clr ">
      <div className="relative  z-[1] flex w-[360px] min-w-0 max-w-full flex-col ">
        <div className="relative  w-full  overflow-hidden bg-secondary-clr ">
          {/* border border-r-[1px] border-b-green-600 border-solid  */}
          <MessageBox messagePath={true} />
        </div>
      </div>
      {children}
    </div>
  );
}
