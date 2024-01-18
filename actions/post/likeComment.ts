'use server';

import { db } from '@/db';
import { commentLikes, postLikes, users } from '@/drizzle/schema';
import { currentUser } from '@/lib/auth';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function likeComment({
  commentId,
  isLiked,
}: {
  commentId: number;
  isLiked: boolean;
}) {
  const user = await currentUser();

  if (!user) {
    redirect('/auth/login');
  }
  try {
    if (!isLiked) {
      await db.insert(commentLikes).values({
        commentId,
        useId: user.id,
      });
    } else {
      await db
        .delete(commentLikes)
        .where(
          and(
            eq(commentLikes.commentId, commentId),
            eq(commentLikes.useId, user.id),
          ),
        );
    }
    revalidatePath('/');
    console.log('Database insertion like successful');
  } catch (error) {
    console.error('Error inserting like into the database:', error);
  }
}
