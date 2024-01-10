import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import { verificationTokens } from "@/drizzle/schema";
import {eq} from "drizzle-orm"
import { getVerificationTokenByEmail } from "./verification-token";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.delete(verificationTokens).where(eq(verificationTokens.id,existingToken.id))
  }

  const verficationToken = await db.insert(verificationTokens).values({
    email,
    token,
    expires,
  })

  return verficationToken;
};
