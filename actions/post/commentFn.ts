"use server";
import { db } from "@/db";
import { currentUser } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
// import { comments, likes } from "@/db/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { comments } from "@/drizzle/schema";

const formSchema = z.object({
  comment: z.string().min(1),
  parentId: z.number().optional(),
  postId: z.number(),
});
export default async function commentFn(formData: FormData) {
  const user = await currentUser();
  if (!user) {
    redirect('/auth/login');
  }
  const data = formSchema.parse({
    comment: formData.get("comment"),
    postId: Number(formData.get("postId")),
    parentId: Number(formData.get("parentId")),
  });
  console.log("data: " + data.postId + "parentId" + data.postId);
  const postId = data.postId,
    parentId = data.parentId ? data.parentId : null;
  console.log("parent ID " + parentId);
  try {
    if(parentId){
      await db.insert(comments).values({
        authorId: user.id,
        postId: postId,
        content: data.comment,
        parentId: parentId 
      });
    } else {
      await db.insert(comments).values({
        authorId: user.id,
        postId: postId,
        content: data.comment,
      });
    }

    revalidatePath("/");
    console.log("Database insertion comment successful");
  } catch (error) {
    console.error("Error inserting comment into the database:", error);
  }
}

