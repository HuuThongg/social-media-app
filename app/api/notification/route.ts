import { db } from "@/db";
import { conversations } from "@/drizzle/schema";
import { currentUser } from "@/lib/auth";
import { desc, eq, or } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function GET() {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }

  //
  const conversationData = await db
    .select()
    .from(conversations)
    .where(
      or(eq(conversations.userOne, user.id), eq(conversations.userTwo, user.id))
    );

  return Response.json({ conversationData });
}
