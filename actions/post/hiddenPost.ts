"use server";

import { db } from "@/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function hiddenPost({ postId }: { postId: number }) {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }
  try {
    // save post to database
    return { success: "Unfollowed this user" };
  } catch (error) {
    return { error: "Error Unfollow" };
  }
}
