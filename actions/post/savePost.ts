'use server';

import { db } from '@/db';
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function savePost({ postId }: { postId: number }) {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }
  try {
    // save post to database
    return { success: 'Saved post successfully' };
  } catch (error) {
    console.error('Error saving post ', error);
    return { error: 'Error saving post' };
  }
}
