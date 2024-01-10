CREATE TABLE IF NOT EXISTS "commentLike" (
	"comment" serial PRIMARY KEY NOT NULL,
	"userId" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comment" (
	"id" serial PRIMARY KEY NOT NULL,
	"authorId" text,
	"postId" integer,
	"parentId" integer DEFAULT NULL,
	"content" text,
	"createdAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversation" (
	"id" serial PRIMARY KEY NOT NULL,
	"userOne" text,
	"userTwo" text,
	"createdAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"imgUrl" text,
	"conversationId" integer,
	"senderId" text,
	"deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post_to_img" (
	"id" integer,
	"imgUrl" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "post" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" text,
	"content" text,
	"createdAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userInfo" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text,
	"birthday" date,
	"phone" varchar(256)
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userOne_user_id_fk" FOREIGN KEY ("userOne") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userTwo_user_id_fk" FOREIGN KEY ("userTwo") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_to_img" ADD CONSTRAINT "post_to_img_id_post_id_fk" FOREIGN KEY ("id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userInfo" ADD CONSTRAINT "userInfo_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
