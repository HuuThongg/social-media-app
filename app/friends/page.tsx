'use server';
import { currentUser } from '@/lib/auth';
import { allUsersExceptYou } from '@/operations/users';
import { SubmitButton } from './SubmitButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import Conversation from './Conversation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const initialState = {
  message: null,
};

export default async function Page() {
  const friends = await allUsersExceptYou();
  const me = await currentUser();
  if (!me) return null;
  if (!friends) return 'loading...';
  return (
    <div className="relative flex flex-col grow bg-primary-clr w-full min-h-[calc(100vh-58px)]" >
      
      <div className='flex flex-col pt-5 px-5 text-primary-text'>
        <div className='px-5 pt-5 flex justify-between'>
          <h2 className='text-lg font-medium'>Friend Requests</h2>
          <Button variant="link" size="default"  className='bg-transparent text-blue-link hover:bg-primary-icon-clr-hover'> 
          See All
          </Button>
        </div>
        <div className='px-3 pt-0 pb-4'>
          <div className='flex justify-start flex-wrap content-start '>
            {Array.from({length:21}).map((_,i)=> (
              <div key={i} className='p-2 max-w-[250px] min-w-[200px] flex flex-col shrink grow basis-0'>
                <div className='flex flex-col w-full h-full rounded-md border overflow-hidden border-solid border-divider bg-secondary-clr'>
                  <div className=''>
                    
                    <div className='relative w-full pb-[100%]'>
                      <Link href={"/"} className='absolute inset-0'>
                        <Avatar className="w-full h-full rounded-none flex justify-center items-center">
                          <AvatarImage src={''} />
                          <AvatarFallback className="bg-sky-500  w-20 h-20">
                            <FaUser className="text-white" />
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    </div>
                  </div>
                  <div className='flex flex-col px-2 pb-1 pt-2'>
                    <div><span className='text-primary-text'>User Name</span></div>
                  </div>
                  <div className='px-2 pb-1'><span className='text-secondary-text text-sm'>34 mutual friends</span></div>
                  <div className='flex flex-col space-y-1 px-2 mb-2'>
                    <Button variant="blue" size="default" className=''>
                      Confirm
                    </Button>
                    <Button  variant="gray" size="default" >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='w-full px-2'>
            <Button variant="link" size="lg" className='bg-transparent text-blue-link hover:bg-primary-icon-clr-hover w-full text-base'>
              See More
            </Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className='flex flex-col pt-5 px-5 text-primary-text'>
        <div className='px-5 pt-5 flex justify-between'>
          <h2 className='text-lg font-medium'>Friend Requests</h2>
          <Button variant="link" size="default" className='bg-transparent text-blue-link hover:bg-primary-icon-clr-hover'>
            See All
          </Button>
        </div>
        <div className='px-3 pt-0 pb-4'>
          <div className='flex justify-start flex-wrap content-start '>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className='p-2 max-w-[250px] min-w-[200px] flex flex-col shrink grow basis-0'>
                <div className='flex flex-col w-full h-full rounded-md border overflow-hidden border-solid border-divider bg-secondary-clr'>
                  <div className=''>

                    <div className='relative w-full pb-[100%]'>
                      <Link href={"/"} className='absolute inset-0'>
                        <Avatar className="w-full h-full rounded-none flex justify-center items-center">
                          <AvatarImage src={''} />
                          <AvatarFallback className="bg-sky-500  w-20 h-20">
                            <FaUser className="text-white" />
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                    </div>
                  </div>
                  <div className='flex flex-col px-2 pb-1 pt-2'>
                    <div><span className='text-primary-text'>User Name</span></div>
                  </div>
                  <div className='px-2 pb-1'><span className='text-secondary-text text-sm'>34 mutual friends</span></div>
                  <div className='flex flex-col space-y-1 px-2 mb-2'>
                    <Button variant="blue" size="default" className=''>
                      Confirm
                    </Button>
                    <Button variant="gray" size="default" >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='w-full px-2'>
            <Button variant="link" size="lg" className='bg-transparent text-blue-link hover:bg-primary-icon-clr-hover w-full text-base'>
              See More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* {JSON.stringify(friends)}
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <Avatar>
              <AvatarImage src={friend.image || ''} />
              <AvatarFallback className="bg-sky-500">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
            <p>{friend.name}</p>
            <SubmitButton userId1={me.id} userId2={friend.id} />
          </li>
        ))}
      </ul>
      <Conversation /> */}