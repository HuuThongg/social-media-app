'use server'
import { currentUser } from '@/lib/auth';
import { allUsersExceptYou } from '@/operations/users';
import Image from 'next/image';
import { SubmitButton } from './SubmitButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import Conversation from './Conversation';

const initialState = {
  message : null,
}


export default async function Page() {
  const friends = await allUsersExceptYou();
  const me = await currentUser();
  if(!me) return null;
  if(!friends) return "loading...";
  return (
    <div className="pl-[300px]">
      {JSON.stringify(friends)}
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            
            <Avatar >
              <AvatarImage src={friend.image || ""} />
              <AvatarFallback className="bg-sky-500">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
            <p>{friend.name}</p>
            <SubmitButton userId1={me.id} userId2={friend.id}/>
          </li>
        ))}
      </ul>
      <Conversation/>
    </div>
  );
}
