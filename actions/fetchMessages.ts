"use server";
import { db } from "@/db";
export async function fetchMessages(
  conversationId: number,
) {
  const messages = await db.query.messages.findMany({
    where:(message, {eq}) => eq(message.conversationId,conversationId)
  })
  return messages;

}