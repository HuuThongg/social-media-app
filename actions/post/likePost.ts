"use server";

import { db } from "@/db";
import { postLikes, users } from "@/drizzle/schema";
import { currentUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function likePost({
  postId,
  isLiked,
}: {
  postId: number;
  isLiked: boolean;
}) {
  const user = await currentUser();
  
  if (!user) {
    redirect('/auth/login');
  }
  try {
    if (!isLiked) {
      await db.insert(postLikes).values({
        userId: user.id,
        postId,
      });
    } else {
      await db.delete(postLikes).where(and(eq(postLikes.postId, postId), eq(users.id, user.id)));
    }
    revalidatePath("/");
    console.log("Database insertion like successful");
  } catch (error) {
    console.error("Error inserting like into the database:", error);
  }
}