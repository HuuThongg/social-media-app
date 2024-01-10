"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/operations/users";
import { generateVerificationToken } from "@/lib/tokens";
import { db } from "@/db";
import { users } from "@/drizzle/schema";
import { v4 as uuidv4 } from "uuid";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success){
    return { error: "Invalid fields"};
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password,10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
    id: uuidv4(),
  });

  const verificationToken = await generateVerificationToken(email);
  return { success: "Confirmation email sent!" };

  // send the verification token to email
};