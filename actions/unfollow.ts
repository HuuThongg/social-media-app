'use server';

import { db } from '@/db';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function unfollow({ postId }: { postId: number }) {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }
  try {
    // unfollow post to database
    return { success: 'Unfollow This user' };
  } catch (error) {
    return { error: 'Error unfollowing this user' };
  }
}
