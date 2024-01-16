"use server"
import { db } from "@/db";
import { friends } from "@/drizzle/schema";
export async function addFriend(user1Id: string, user2Id: string) {
  await db.insert(friends).values({
    user1Id,
    user2Id,
  });
}
