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
  role: roleEnum("role").default("USER"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const userInfo = pgTable("userInfo", {
  id: serial("id").primaryKey(),
  userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
  birthday: date("birthday"),
  phone: varchar("phone", { length: 256 }),
});
export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts, { relationName: "account" }),
  userInfo: one(userInfo),
  conversations: many(conversations, { relationName: "conversation" }),
  messages: many(messages, { relationName: "message" }),
}));
export const userInfoRelations = relations(userInfo, ({ one }) => ({
  users: one(users, {
    fields:[userInfo.userId],
    references:[users.id]
  } ),
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
    references: [users.id],
  }),
}));

export const posts = pgTable("post", {
  id: serial("id").primaryKey(),
  authorId: text("author_id"),
  content: text("content"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
  postLikes: many(postLikes),
  postToImg: many(postToImg),
}));

export const postLikes = pgTable("postLike", {
  postId: integer("id").references(() => posts.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
});

export const postLikeRelations = relations(postLikes, ({ one }) => ({
  post: one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
  }),
}));

export const postToImg = pgTable("post_to_img", {
  postId: integer("id").references(() => posts.id, { onDelete: "cascade" }),
  imgUrl: text("imgUrl"),
});
export const postToImgRelations = relations(postToImg, ({ one }) => ({
  post: one(posts, {
    fields: [postToImg.postId],
    references: [posts.id],
  }),
}));

export const comments = pgTable("comment", {
  id: serial("id").primaryKey(),
  authorId: text("authorId").notNull(),
  postId: integer("postId"),
  parentId: integer("parentId").default(sql`NULL`),
  content: text("content"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const commentsRelations = relations(comments, ({ one, many }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  commentLikes: many(commentLikes)
}));

export const commentLikes = pgTable("commentLike", {
  commentId: serial("commentId").primaryKey(),
  useId: text("userId"),
});
export const commentLikesRelations = relations(commentLikes, ({ one }) => ({
  comment: one(comments, {
    fields: [commentLikes.commentId],
    references: [comments.id],
  }),
}));

export const conversations = pgTable("conversation", {
  id: serial("id").primaryKey(),
  userOne: text("userOne").references(() => users.id, { onDelete: "cascade" }),
  userTwo: text("userTwo").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const conversationsRelations = relations(conversations, ({ many, one }) => ({
  messages: many(messages),
  // userOne: one(users, {
  //   fields: [conversations.userOne],
  //   references: [users.id],
  //   relationName: "userOne",
  // }),
  // userTwo: one(users, {
  //   fields: [conversations.userTwo],
  //   references: [users.id],
  //   relationName: "userTwo",
  // }),
}));

export const messages = pgTable("message", {
  id: serial("id").primaryKey(),
  content: text("content"),
  imgUrl: text("imgUrl"),
  conversationId: integer("conversationId").references(()=> conversations.id, {onDelete: "cascade"}),
  senderId: text("senderId").references(() => users.id, {
    onDelete: "cascade",
  }),
  deleted: boolean("deleted").default(false).notNull(),
});

export const messagesRelations = relations(messages, ({ one, many }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],

  }),
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


export const friends = pgTable("friends", {
  user1Id: text("user1Id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  user2Id: text("user2Id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const friendsRelations = relations(friends, ({ one }) => ({
  user1: one(users, {
    fields: [friends.user1Id],
    references: [users.id],
  }),
  user2: one(users, {
    fields: [friends.user2Id],
    references: [users.id],
  }),
}));