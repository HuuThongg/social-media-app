'use server';
import TypeComment from './TypeComment';
import Comment from './Comment';
import { Comments, commentLikes } from '@/drizzle/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';

interface CommentSectionProps {
  comments: Comments[];
  postId: number;
}

export default async function CommentSection({
  comments,
  postId,
}: CommentSectionProps) {
  return (
    <div>
      <div className="mx-4 border-t border-solid border-third-clr pt-1"></div>
      {/* write comment here */}
      <TypeComment postId={postId} />
      {/* comments */}
      {comments.map((comment, index) => (
        <Comment comment={comment} key={comment.id} />
      ))}
      {/* view more answers */}
    </div>
  );
}
