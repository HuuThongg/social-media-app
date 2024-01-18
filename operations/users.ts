'use server';
import { db } from '@/db';
import { currentUser } from '@/lib/auth';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
    return user;
  } catch {
    return null;
  }
};

export const allUsersExceptYou = async () => {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return null;
    }

    const users = await db.query.users.findMany({
      where: (user1, { ne }) => ne(user1.id, user.id),
    });
    return users;
  } catch {
    return null;
  }
};
