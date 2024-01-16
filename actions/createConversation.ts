"use server";
import { db } from "@/db";
import { conversations, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
export async function createConversation(
  userOne: string = "4b918bd3-f7ab-4dd3-9af9-1626041260e7",
  userTwo: string = "	2a99daa9-342f-4ad3-8750-b5ec0fe2abbe"
) {
  const userOneExists = await db.query.users.findMany({
    where: eq(users.id, userOne),
  });
  const userTwoExists = await db.query.users.findMany({
    where: eq(users.id, userTwo),
  });

  if (!userOneExists || !userTwoExists) {
    console.log("===================");
    throw new Error("One or both users do not exist");
  }
  console.log("sucess");
  const data = await db
    .insert(conversations)
    .values({
      userOne,
      userTwo,
    })
    .returning();
  return data[0].id;
}

