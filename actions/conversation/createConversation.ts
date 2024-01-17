"use server";
import { db } from "@/db";
import { accounts, conversations, users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
export async function createConversation(
  userOne: string ,
  userTwo: string
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
  console.log("objecuserOneExistst, ", userOneExists);
  console.log("objecuserOneExistst, ", userTwoExists);
  console.log("userOne", userOne);
  console.log("userTwo", userOne);


  console.log("sucess");
  const data = await db
    .insert(conversations)
    .values({
      userOne,
      userTwo,
    })
    .returning();
  console.log("data: ", data);
  const cv = await db.select().from(conversations);
  console.log("cv-: ", cv);
  return data[0].id;
}

