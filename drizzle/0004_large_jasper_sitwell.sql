CREATE TABLE IF NOT EXISTS "postLike" (
	"id" integer,
	"user_id" text
);
--> statement-breakpoint
ALTER TABLE "post_to_img" DROP CONSTRAINT "post_to_img_id_post_id_fk";
--> statement-breakpoint
ALTER TABLE "commentLike" ADD COLUMN "commentId" serial NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_to_img" ADD CONSTRAINT "post_to_img_id_post_id_fk" FOREIGN KEY ("id") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "commentLike" DROP COLUMN IF EXISTS "comment";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postLike" ADD CONSTRAINT "postLike_id_post_id_fk" FOREIGN KEY ("id") REFERENCES "public"."post"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postLike" ADD CONSTRAINT "postLike_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
