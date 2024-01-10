import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum,
  serial,
  varchar,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);

export const users = pgTable("user", {
  // id: text("id").notNull().primaryKey().$defaultFn(()=>createdId()),
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  password: text("password"),
  role: roleEnum('role').default('USER'),
  createdAt: timestamp("createdAt", { mode: "date"})
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;


export const userInfo = pgTable("userInfo", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  birthday: date("birthday"),
  phone: varchar("phone", { length: 256 }),
});
export const usersRelations = relations(users, ({ many , one }) => ({
  accounts: many(accounts),
  userInfo: one(userInfo),
  messages: many(messages),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);
export const accountsRelations = relations(accounts, ({ one }) => ({
  account: one(users, {
    fields: [accounts.userId],
    references: [users.id]
  }),
}));

export const posts = pgTable("post", {
  id: serial("id").primaryKey(),
  authorId: text("author_id"),
  content: text("content"),
  createdAt: timestamp("createdAt", { mode: "date" }),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references:[users.id]
  }),
  comments: many(comments),
}));

export const postToImg = pgTable("post_to_img",{
  postId: integer("id").references(() => posts.id,{onDelete: "cascade"}),
  imgUrl: text("imgUrl"),
});

export const comments = pgTable("comment", {
  id: serial("id").primaryKey(),
  authorId: text("authorId"),
  postId: integer("postId"),
  parentId: integer("parentId").default(sql`NULL`),
  content: text("content"),
  createdAt: timestamp("createdAt", { mode: "date" }),
});

export const commentsRelations = relations(comments, ({one}) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  })
}));

export const commentLikes = pgTable("commentLike", {
  commentId: serial("comment").primaryKey(),
  useId: text("userId"),
});
export const commentLikesRelations = relations(commentLikes, ({one}) => ({
  comment: one(comments, {
    fields: [commentLikes.commentId],
    references: [comments.id],
  })
}));

export const conversations = pgTable("conversation", {
  id: serial("id").primaryKey(),
  userOne: text("userOne").references(()=> users.id),
  userTwo: text("userTwo").references(()=> users.id),
  createdAt: timestamp("createdAt" , { mode:"date" }),
});

export const conversationsRelations = relations(conversations, ({one,many}) => ({
  messages: many(messages)
}));

export const messages = pgTable("message", {
  id: serial("id").primaryKey(),
  content: text("content"),
  imgUrl: text("imgUrl"),
  conversationId: integer("conversationId"),
  senderId: text("senderId").references(()=> users.id),
  deleted: boolean("deleted").default(false),
});

export const messagesRelations = relations(messages, ({one,many})=> ({
  conversation: one(conversations, {
    fields : [messages.conversationId],
    references: [conversations.id],
  })
}));

// export const sessions = pgTable("session", {
//   sessionToken: text("sessionToken").notNull().primaryKey(),
//   userId: text("userId")
//     .notNull()
//     .references(() => users.id, { onDelete: "cascade" }),
//   expires: timestamp("expires", { mode: "date" }).notNull(),
// });

export const verificationTokens = pgTable(
  "verificationToken",
  {
    id: serial("id").notNull(),

    // identifier: text("identifier").notNull(),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.email, vt.token] }),
  })
);



