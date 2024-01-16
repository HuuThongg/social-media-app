import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginButton } from "@/components/auth/login-button"
import SideBar from "./_components/sideBar"
import RightSideBar from "./_components/rightSideBar"
import Story from "./_components/story"
import { CreatePost } from "./_components/createPost"
import { db } from "@/db"
import Post from "@/components/post"
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default async function Home() {
  const posts = await db.query.posts.findMany({
    with:{
      author: true,
      comments: true,
      postLikes: true,
      postToImg:true
    }
  })
  
  console.log(posts);
  return (
    <>
      <SideBar/>
      <div className=" relative left-[60px] mr-[60px]   flex    origin-top-left  flex-col lg:left-[300px] lg:mr-[300px] bg-primary-clr min-h-screen ">
        {/* sign in sign out */}
        <div className="space-y-6 text-center">
          <h1 className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className,
          )}>
            🔐 Auth
          </h1>
          <p className="text-white text-lg">
            A simple authentication service
          </p>
          <div>
            <LoginButton asChild>
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
        

        <div className="relative flex h-full min-h-[56px] w-full overflow-visible ">
          <div className="relative z-0 flex min-w-0 max-w-none shrink grow basis-0 flex-nowrap items-start justify-between 2xl:max-w-[1464px] ">
            {/*  main */}

            <main
              role="main"
              className=" relative flex w-[744] min-w-0 shrink grow  basis-[744px] flex-nowrap justify-center  bg-primary-clr md:px-8 "
            >
              <div className="relative z-0 flex min-w-0 max-w-full shrink-0 flex-col">
                <div className="mt-4  w-full ">
                  {/* story */}
                  <Story />
                  {/* posts */}
                  <div className="flex justify-center bg-primary-clr">
                    <div className="w-[500px] max-w-full 2sm:w-[680px] ">
                      {/* create post */}
                      <CreatePost />
                      <div className="opacity-100 transition-all duration-300 ">
                        {/* feed */}

                        {/* {
                        Array.from(Array(1).keys()).map((item, index) => {
                          return <Post  comments={commentsData[index]} key={index} />
                        })
                      } */}
                        {posts?.map((post) => {
                          return <Post post={post} key={post.id} />;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  )
}
