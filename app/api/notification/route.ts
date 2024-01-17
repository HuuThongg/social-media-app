import { db } from "@/db";
import { conversations } from "@/drizzle/schema";
import { currentUser } from "@/lib/auth";
import { desc, eq, or } from "drizzle-orm";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";


export async function GET(request: NextRequest  ) {
  const user = await currentUser();
  if (!user) {
    redirect("/auth/login");
  }

  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  //
  const cursorString = cursor || "0";
  const cursorNumber = parseInt(cursorString);
  
  const pageSize = 4;

  const data = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      return {
        name: "Project " + (i + cursorNumber) + ` (server time: ${Date.now()})`,
        id: i + cursorNumber,
      };
    });

  const nextId = cursorNumber < 20 ? data[data.length - 1].id + 1 : null;
  const previousId = cursorNumber > -20 ? data[0].id - pageSize : null;
  
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Response.json({ data, nextId, previousId });
}
