"use server";
import { db } from "@/db";
import {  messages } from "@/drizzle/schema";
export async function sendMessage(
  conversationId: number,
  content: string,
  senderId: string,
  receivedId:string
) {
  await db.insert(messages).values({
    content,
    conversationId,
    senderId,
    receivedId,
  });
}
