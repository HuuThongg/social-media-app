import { db } from "@/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.verificationTokens.findFirst({
      where: (verificationToken, {eq}) => eq(verificationToken.email, email),
    });

    return verificationToken;
  } catch {
    return null;
  }
};

