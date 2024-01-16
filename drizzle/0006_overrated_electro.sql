ALTER TABLE "conversation" DROP CONSTRAINT "conversation_userOne_user_id_fk";
--> statement-breakpoint
ALTER TABLE "message" DROP CONSTRAINT "message_senderId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "postLike" DROP CONSTRAINT "postLike_id_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post_to_img" DROP CONSTRAINT "post_to_img_id_post_id_fk";
--> statement-breakpoint
ALTER TABLE "message" ALTER COLUMN "deleted" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userOne_user_id_fk" FOREIGN KEY ("userOne") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_conversationId_conversation_id_fk" FOREIGN KEY ("conversationId") REFERENCES "public"."conversation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "message" ADD CONSTRAINT "message_senderId_user_id_fk" FOREIGN KEY ("senderId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postLike" ADD CONSTRAINT "postLike_id_post_id_fk" FOREIGN KEY ("id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_to_img" ADD CONSTRAINT "post_to_img_id_post_id_fk" FOREIGN KEY ("id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
