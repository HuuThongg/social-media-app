import React from 'react';
import InteractionMetric from './InteractionMetric';
import CommentSection from './comment/CommentSection';
// import { Comment, Like, User, likes as likesDbSchema } from '@/db/schema';
// import { currentProfile } from '@/lib/query/db/current-profile';
import { sql, eq, and } from 'drizzle-orm';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Comments, PostLikes, User, postLikes as postLikesSchema } from '@/drizzle/schema';
import { db } from '@/db';
import { currentUser } from '@/lib/auth';
interface EngagementProps {
  comments: Comments[];
  postLikes: PostLikes[];
  author: User;
  postId: number;
}
export default async function Engagement({
  comments,
  postLikes,
  author,
  postId,
}: EngagementProps) {
  const likeAmount = postLikes.length;
  //
  const commentAmount = comments.length;
  const shareAmount = 0;
  const user = await currentUser();
  
  let isLiked = false;
  let likeData: PostLikes[] | undefined;
  if (user) {
    
    const likeData = await db.select().from(postLikesSchema).where(
      and(
        eq( postLikesSchema.postId, postId ),
        eq(postLikesSchema.userId, user.id)
      )
    )
    if (likeData[0]) {
      isLiked = !!likeData[0];
    }
  }
  return (
    <section className="relative overflow-hidden">
      <InteractionMetric
        likeAmount={likeAmount}
        commentAmount={commentAmount}
        shareAmount={shareAmount}
        postId={postId}
        isLiked={isLiked}
      />
      <CommentSection comments={comments} postId={postId} />
    </section>
  );
}
