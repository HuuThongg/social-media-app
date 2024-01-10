import { unstable_cache as cache } from 'next/cache';
import { db } from '@/db';
import { User, users } from '@/db/schema';
import { sql } from 'drizzle-orm';
import Image from 'next/image';
import { allUsersExceptYou } from '@/operations/users';


export default async function Page() {
  const friends = await allUsersExceptYou();

  return (
    <div className="pl-[300px]">
      <ul>
        {friends?.map((friend) => (
          <li key={friend.id}>
            <Image
              src={friend.image!}
              width={50}
              height={50}
              alt="user Image"
            />
            <p>{friend.name}</p>
            <button>AddFriend</button>
          </li>
        ))}
      </ul>
      Friend
    </div>
  );
}
