'use server';
import { db } from '@/db';
import { messages } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';
export async function fetchMessages(conversationId: number) {
  // const messagess = await db.query.messages.findMany({
  //   where: (message, { eq }) => eq(message.conversationId, conversationId),
  // });

  const mess = await db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, conversationId));
  return mess;
}
