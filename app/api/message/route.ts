import { db } from "@/db";
import { conversations, messages,users } from "@/drizzle/schema";
import { currentUser } from "@/lib/auth";
import { desc, eq, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  //
  const cursorString = cursor || "0";
  const cursorNumber = parseInt(cursorString);

  const data = await db
    .select()
    .from(conversations)
    .where(
      or(
        eq(conversations.userOne, user.id),
        eq(conversations.userTwo, user.id)
      )
    );

  const conversationIds = data.map((conversation) => conversation.id);

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

  const nextId = 8;
  const previousId = 2;
  await new Promise((resolve) => setTimeout(resolve,500));


  
  return Response.json({ data, nextId, previousId});
}
