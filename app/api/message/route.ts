import { db } from "@/db";
import { conversations, messages,users } from "@/drizzle/schema";
import { currentUser } from "@/lib/auth";
import { desc, eq, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }

  const conversationData = await db
    .select()
    .from(conversations)
    .where(
      or(
        eq(conversations.userOne, user.id),
        eq(conversations.userTwo, user.id)
      )
    );

  const conversationIds = conversationData.map(
    (conversation) => conversation.id
  );

  const messagesData = await Promise.all(
    conversationIds.map((conversationId) =>
      db
        .select()
        .from(messages)
        .where(eq(messages.conversationId, conversationId))
        .orderBy(desc(messages.createdAt))
        .limit(1)
    )
  );

  // const lastMessages = messagesData.map((messages) => messages[0]);

  // const usersData = await Promise.all(
  //   messagesData.map((message) =>
  //     db
  //       .select()
  //       .from(users)
  //       .where(
  //         or(eq(users.id, message.senderId), eq(users.id, message.receiverId))
  //       )
  //   )
  // );

  // const users = usersData.map((users) => users[0]);

  return Response.json({ conversationData });
}
