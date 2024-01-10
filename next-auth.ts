RoleEnumType
import NextAuth, { type DefaultSession } from "next-auth";
import { RoleEnumType } from "@/drizzle/schema";
type abc = typeof RoleEnumType

export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
